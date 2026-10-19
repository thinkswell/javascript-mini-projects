import type { Clock } from "../clock.js";
import type { DB } from "../db.js";

export interface User {
  id: number;
  email: string;
}

export class UserStore {
  constructor(
    private readonly db: DB,
    private readonly clock: Clock,
  ) {}

  findByEmail(email: string): User | undefined {
    return this.db.prepare("SELECT id, email FROM users WHERE email = ?").get(email) as
      | User
      | undefined;
  }

  /** Inserts the user if missing and returns it (idempotent). */
  findOrCreate(email: string): User {
    this.db
      .prepare("INSERT INTO users (email, created_at) VALUES (?, ?) ON CONFLICT (email) DO NOTHING")
      .run(email, this.clock.now());
    return this.findByEmail(email)!;
  }
}
