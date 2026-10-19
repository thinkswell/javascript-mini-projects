import type { RequestHandler, Response } from "express";
import type { Clock } from "../clock.js";
import type { DB } from "../db.js";
import { generateToken, sha256 } from "./crypto.js";
import type { User } from "./users.js";

export const SESSION_COOKIE = "sid";
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export class SessionStore {
  constructor(
    private readonly db: DB,
    private readonly clock: Clock,
  ) {}

  /** Returns the raw session id for the cookie; only its SHA-256 is stored. */
  create(userId: number): { id: string; expiresAt: number } {
    const id = generateToken();
    const now = this.clock.now();
    const expiresAt = now + SESSION_TTL_MS;
    this.db
      .prepare("INSERT INTO sessions (id_hash, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)")
      .run(sha256(id), userId, now, expiresAt);
    return { id, expiresAt };
  }

  findUser(id: string): User | undefined {
    return this.db
      .prepare(
        `SELECT users.id, users.email FROM sessions
         JOIN users ON users.id = sessions.user_id
         WHERE sessions.id_hash = ? AND sessions.expires_at > ?`,
      )
      .get(sha256(id), this.clock.now()) as User | undefined;
  }

  destroy(id: string): void {
    this.db.prepare("DELETE FROM sessions WHERE id_hash = ?").run(sha256(id));
  }
}

/** Minimal Cookie header parser (no cookie-parser dependency). */
export function parseCookies(header: string | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    const name = part.slice(0, eq).trim();
    if (!name || name in out) continue;
    let value = part.slice(eq + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    try {
      out[name] = decodeURIComponent(value);
    } catch {
      out[name] = value;
    }
  }
  return out;
}

export interface CookieOptions {
  secure: boolean;
}

export function setSessionCookie(res: Response, id: string, opts: CookieOptions): void {
  const parts = [
    `${SESSION_COOKIE}=${id}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}`,
  ];
  if (opts.secure) parts.push("Secure");
  res.append("Set-Cookie", parts.join("; "));
}

export function clearSessionCookie(res: Response, opts: CookieOptions): void {
  const parts = [`${SESSION_COOKIE}=`, "Path=/", "HttpOnly", "SameSite=Lax", "Max-Age=0"];
  if (opts.secure) parts.push("Secure");
  res.append("Set-Cookie", parts.join("; "));
}

export function readSessionId(cookieHeader: string | undefined): string | undefined {
  return parseCookies(cookieHeader)[SESSION_COOKIE] || undefined;
}

/** Puts the signed-in user on res.locals.user, or redirects to /login. */
export function requireSession(sessions: SessionStore): RequestHandler {
  return (req, res, next) => {
    const id = readSessionId(req.headers.cookie);
    const user = id ? sessions.findUser(id) : undefined;
    if (!user) {
      res.redirect(302, "/login");
      return;
    }
    res.locals.user = user;
    next();
  };
}
