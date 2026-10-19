import type { Clock } from "../clock.js";
import type { DB } from "../db.js";

export interface WindowRule {
  max: number;
  windowMs: number;
}

const MINUTE = 60_000;

/** Tunable limits. Fixed windows, counted in SQLite so they survive restarts. */
export const RATE_LIMITS = {
  /** Code/link requests (POST /login and /login/resend) per email address. */
  requestPerEmail: { max: 5, windowMs: 15 * MINUTE },
  /** Code/link requests per client IP. */
  requestPerIp: { max: 20, windowMs: 15 * MINUTE },
  /** Code and magic-link verification attempts per client IP. */
  verifyPerIp: { max: 60, windowMs: 15 * MINUTE },
  /** Minimum gap between two emails to the same address. */
  resendCooldownMs: 60_000,
} as const satisfies Record<string, WindowRule | number>;

export interface HitResult {
  allowed: boolean;
  retryAfterMs: number;
}

interface Row {
  window_start: number;
  count: number;
}

export class RateLimiter {
  constructor(
    private readonly db: DB,
    private readonly clock: Clock,
  ) {}

  /** Counts one request against `key` and reports whether it is within the rule. */
  hit(key: string, rule: WindowRule): HitResult {
    const now = this.clock.now();
    return this.db.transaction((): HitResult => {
      const row = this.db
        .prepare("SELECT window_start, count FROM rate_limits WHERE key = ?")
        .get(key) as Row | undefined;

      if (!row || now - row.window_start >= rule.windowMs) {
        this.db
          .prepare(
            `INSERT INTO rate_limits (key, window_start, count) VALUES (?, ?, 1)
             ON CONFLICT (key) DO UPDATE SET window_start = excluded.window_start, count = 1`,
          )
          .run(key, now);
        return { allowed: true, retryAfterMs: 0 };
      }

      const count = row.count + 1;
      this.db.prepare("UPDATE rate_limits SET count = ? WHERE key = ?").run(count, key);
      return {
        allowed: count <= rule.max,
        retryAfterMs: count <= rule.max ? 0 : row.window_start + rule.windowMs - now,
      };
    })();
  }

  /** Milliseconds left on a cooldown started with startCooldown, or 0. */
  cooldownRemaining(key: string, cooldownMs: number): number {
    const row = this.db
      .prepare("SELECT window_start FROM rate_limits WHERE key = ?")
      .get(key) as Pick<Row, "window_start"> | undefined;
    if (!row) return 0;
    return Math.max(0, row.window_start + cooldownMs - this.clock.now());
  }

  startCooldown(key: string): void {
    this.db
      .prepare(
        `INSERT INTO rate_limits (key, window_start, count) VALUES (?, ?, 1)
         ON CONFLICT (key) DO UPDATE SET window_start = excluded.window_start`,
      )
      .run(key, this.clock.now());
  }

  clearCooldown(key: string): void {
    this.db.prepare("DELETE FROM rate_limits WHERE key = ?").run(key);
  }
}
