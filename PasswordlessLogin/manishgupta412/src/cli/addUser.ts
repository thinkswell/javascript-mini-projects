// Usage: npm run user:add -- you@example.com
import dotenv from "dotenv";
import { EmailSchema } from "../auth/requestLogin.js";
import { UserStore } from "../auth/users.js";
import { systemClock } from "../clock.js";
import { openDatabase } from "../db.js";

dotenv.config({ quiet: true });

const parsed = EmailSchema.safeParse(process.argv[2]);
if (!parsed.success) {
  console.error("Usage: npm run user:add -- you@example.com");
  process.exit(1);
}

const db = openDatabase(process.env.DATABASE_PATH?.trim() || "./data/app.db");
const user = new UserStore(db, systemClock).findOrCreate(parsed.data);
console.log(`User ready: ${user.email} (id ${user.id})`);
db.close();
