import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

export type DB = Database.Database;

/** Ordered migrations; index + 1 is the schema version stored in PRAGMA user_version. */
const MIGRATIONS: string[] = [
  `
  CREATE TABLE users (
    id         INTEGER PRIMARY KEY,
    email      TEXT    NOT NULL UNIQUE,
    created_at INTEGER NOT NULL
  );

  -- Each challenge holds exactly one credential: a code or a magic-link token.
  -- Hashes are HMAC-SHA256(OTP_SECRET, ...). Plaintext is never stored.
  CREATE TABLE login_challenges (
    id             INTEGER PRIMARY KEY,
    email          TEXT    NOT NULL,
    method         TEXT    NOT NULL CHECK (method IN ('code', 'link')),
    code_hash      TEXT,
    token_hash     TEXT    UNIQUE,
    created_at     INTEGER NOT NULL,
    expires_at     INTEGER NOT NULL,
    attempts       INTEGER NOT NULL DEFAULT 0,
    used_at        INTEGER,
    invalidated_at INTEGER,
    CHECK (
      (method = 'code' AND code_hash IS NOT NULL AND token_hash IS NULL) OR
      (method = 'link' AND token_hash IS NOT NULL AND code_hash IS NULL)
    )
  );
  CREATE INDEX idx_login_challenges_email ON login_challenges (email, id);

  -- id_hash is SHA-256 of the cookie value. The raw session id only lives in the cookie.
  CREATE TABLE sessions (
    id_hash    TEXT    PRIMARY KEY,
    user_id    INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    created_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL
  );
  CREATE INDEX idx_sessions_expires_at ON sessions (expires_at);

  -- Fixed-window counters and cooldown timestamps. Keys contain HMACs, not raw emails/IPs.
  CREATE TABLE rate_limits (
    key          TEXT    PRIMARY KEY,
    window_start INTEGER NOT NULL,
    count        INTEGER NOT NULL
  );
  `,
];

export function openDatabase(file: string): DB {
  if (file !== ":memory:") {
    fs.mkdirSync(path.dirname(path.resolve(file)), { recursive: true });
  }
  const db = new Database(file);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.pragma("busy_timeout = 5000");
  migrate(db);
  return db;
}

function migrate(db: DB): void {
  const current = db.pragma("user_version", { simple: true }) as number;
  for (let v = current; v < MIGRATIONS.length; v++) {
    db.transaction(() => {
      db.exec(MIGRATIONS[v]!);
      db.pragma(`user_version = ${v + 1}`);
    })();
  }
}

/** Removes rows that can no longer affect anything. Safe to run periodically. */
export function pruneExpired(db: DB, now: number): void {
  const dayAgo = now - 24 * 60 * 60 * 1000;
  db.prepare("DELETE FROM login_challenges WHERE expires_at < ?").run(dayAgo);
  db.prepare("DELETE FROM sessions WHERE expires_at < ?").run(now);
  db.prepare("DELETE FROM rate_limits WHERE window_start < ?").run(dayAgo);
}
