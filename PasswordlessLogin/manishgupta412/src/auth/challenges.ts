import type { Clock } from "../clock.js";
import type { DB } from "../db.js";
import { hmac, safeEqualHex } from "./crypto.js";

export const CHALLENGE_TTL_MS = 10 * 60_000;
export const MAX_ATTEMPTS = 5;

interface ChallengeRow {
  id: number;
  email: string;
  method: "code" | "link";
  code_hash: string | null;
  token_hash: string | null;
  expires_at: number;
  attempts: number;
  used_at: number | null;
  invalidated_at: number | null;
}

export type FailureReason =
  | "not_found" // no open challenge for this email / unknown link
  | "replaced" // a newer challenge was issued for this email
  | "used"
  | "expired"
  | "locked" // too many wrong codes
  | "incorrect"; // wrong code, attempts remain

export type VerifyResult =
  | { ok: true; email: string }
  | { ok: false; reason: FailureReason; email?: string; attemptsLeft?: number };

export class ChallengeStore {
  constructor(
    private readonly db: DB,
    private readonly clock: Clock,
    private readonly secret: string,
  ) {}

  private hashCode(email: string, code: string): string {
    return hmac(this.secret, `login-code:${email}`, code);
  }

  private hashToken(token: string): string {
    return hmac(this.secret, "login-link", token);
  }

  /**
   * Stores a new challenge holding exactly one credential (a code or a link token)
   * and invalidates any earlier open ones for the same email.
   */
  create(email: string, secret: { code: string } | { token: string }): void {
    const now = this.clock.now();
    const isCode = "code" in secret;
    this.db.transaction(() => {
      this.db
        .prepare(
          `UPDATE login_challenges SET invalidated_at = ?
           WHERE email = ? AND used_at IS NULL AND invalidated_at IS NULL`,
        )
        .run(now, email);
      this.db
        .prepare(
          `INSERT INTO login_challenges (email, method, code_hash, token_hash, created_at, expires_at)
           VALUES (?, ?, ?, ?, ?, ?)`,
        )
        .run(
          email,
          isCode ? "code" : "link",
          isCode ? this.hashCode(email, secret.code) : null,
          isCode ? null : this.hashToken(secret.token),
          now,
          now + CHALLENGE_TTL_MS,
        );
    })();
  }

  verifyCode(email: string, code: string): VerifyResult {
    const row = this.db
      .prepare(
        `SELECT * FROM login_challenges
         WHERE email = ? AND invalidated_at IS NULL
         ORDER BY id DESC LIMIT 1`,
      )
      .get(email) as ChallengeRow | undefined;
    // A link-only challenge has no code, so there is nothing to guess here.
    if (!row || row.code_hash === null) return { ok: false, reason: "not_found", email };

    const blocked = this.checkUsable(row);
    if (blocked) return blocked;

    if (!safeEqualHex(this.hashCode(email, code), row.code_hash)) {
      const updated = this.db
        .prepare(
          `UPDATE login_challenges SET attempts = attempts + 1
           WHERE id = ? AND attempts < ? RETURNING attempts`,
        )
        .get(row.id, MAX_ATTEMPTS) as { attempts: number } | undefined;
      const attempts = updated?.attempts ?? MAX_ATTEMPTS;
      if (attempts >= MAX_ATTEMPTS) return { ok: false, reason: "locked", email };
      return { ok: false, reason: "incorrect", email, attemptsLeft: MAX_ATTEMPTS - attempts };
    }

    return this.consume(row);
  }

  verifyToken(token: string): VerifyResult {
    const tokenHash = this.hashToken(token);
    const row = this.db
      .prepare("SELECT * FROM login_challenges WHERE token_hash = ?")
      .get(tokenHash) as ChallengeRow | undefined;
    if (!row?.token_hash || !safeEqualHex(tokenHash, row.token_hash)) {
      return { ok: false, reason: "not_found" };
    }
    if (row.invalidated_at !== null) return { ok: false, reason: "replaced", email: row.email };

    const blocked = this.checkUsable(row);
    if (blocked) return blocked;
    return this.consume(row);
  }

  private checkUsable(row: ChallengeRow): VerifyResult | null {
    const email = row.email;
    if (row.used_at !== null) return { ok: false, reason: "used", email };
    if (row.attempts >= MAX_ATTEMPTS) return { ok: false, reason: "locked", email };
    if (row.expires_at <= this.clock.now()) return { ok: false, reason: "expired", email };
    return null;
  }

  /** Single-use: only the request that flips used_at from NULL wins. */
  private consume(row: ChallengeRow): VerifyResult {
    const now = this.clock.now();
    const result = this.db
      .prepare(
        `UPDATE login_challenges SET used_at = ?
         WHERE id = ? AND used_at IS NULL AND invalidated_at IS NULL
           AND attempts < ? AND expires_at > ?`,
      )
      .run(now, row.id, MAX_ATTEMPTS, now);
    if (result.changes !== 1) return { ok: false, reason: "used", email: row.email };
    return { ok: true, email: row.email };
  }
}
