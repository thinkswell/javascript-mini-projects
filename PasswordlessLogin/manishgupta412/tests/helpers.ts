import request from "supertest";
import { createApp, type AppConfig } from "../src/app.js";
import type { Clock } from "../src/clock.js";
import { openDatabase, type DB } from "../src/db.js";
import type { LoginEmail, Mailer } from "../src/email/mailer.js";
import { renderLoginEmail, type RenderedEmail } from "../src/email/templates.js";
import { createLogger } from "../src/logger.js";

export class FakeClock implements Clock {
  constructor(public t = Date.UTC(2026, 0, 1, 12, 0, 0)) {}
  now(): number {
    return this.t;
  }
  advance(ms: number): void {
    this.t += ms;
  }
}

export type SentEmail = LoginEmail & RenderedEmail;

/** Captures the rendered payload instead of calling Mailtrap. */
export class FakeMailer implements Mailer {
  sent: SentEmail[] = [];
  fail = false;

  async sendLoginEmail(msg: LoginEmail): Promise<void> {
    if (this.fail) {
      const secret = msg.method === "code" ? msg.code : msg.link;
      throw new Error(`Mailtrap API error while sending ${secret}`);
    }
    this.sent.push({ ...msg, ...renderLoginEmail(msg) });
  }

  last(): SentEmail {
    const mail = this.sent.at(-1);
    if (!mail) throw new Error("no email sent");
    return mail;
  }
}

/** The code is the first line of the plain-text part of a code email. */
export function codeFrom(mail: SentEmail): string {
  if (mail.method !== "code") throw new Error("not a code email");
  const first = mail.text.split("\n")[0]!;
  if (!/^\d{6}$/.test(first)) throw new Error("code is not on the first line");
  return first;
}

/** Path + query of the magic link found in the plain-text part. */
export function linkFrom(mail: SentEmail): { path: string; token: string } {
  const match = mail.text.match(/https?:\/\/\S+\/login\/link\?token=([A-Za-z0-9_-]+)/);
  if (!match) throw new Error("no link in email");
  const url = new URL(match[0]);
  return { path: url.pathname + url.search, token: match[1]! };
}

export function wrongCode(code: string): string {
  return ((Number(code) + 1) % 1_000_000).toString().padStart(6, "0");
}

export const KNOWN = "alice@example.com";
export const UNKNOWN = "carol@example.com";

export function setup(opts: { autoSignup?: boolean; users?: string[]; minResponseMs?: number } = {}) {
  const db: DB = openDatabase(":memory:");
  const clock = new FakeClock();
  const mailer = new FakeMailer();
  const logs: string[] = [];
  const logger = createLogger((line) => logs.push(line));
  const config: AppConfig = {
    appUrl: "http://localhost:3000",
    otpSecret: "test-secret-test-secret-test-secret-1234",
    autoSignup: opts.autoSignup ?? false,
    trustProxy: false,
    secureCookies: false,
  };
  for (const email of opts.users ?? [KNOWN]) {
    db.prepare("INSERT INTO users (email, created_at) VALUES (?, ?)").run(email, clock.now());
  }
  const app = createApp({ config, db, mailer, clock, logger, minResponseMs: opts.minResponseMs ?? 0 });

  const requestCode = (email: string, agent = request(app)) =>
    agent.post("/login").type("form").send({ email, method: "code" });
  const requestLink = (email: string, agent = request(app)) =>
    agent.post("/login").type("form").send({ email, method: "link" });
  const postLink = (token: string, agent = request(app)) =>
    agent.post("/login/link").type("form").send({ token });
  const verify = (email: string, code: string, agent = request(app)) =>
    agent.post("/login/verify").type("form").send({ email, code });
  const count = (table: string) =>
    (db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get() as { n: number }).n;

  return { db, clock, mailer, logs, requestCode, requestLink, postLink, verify, count, agent: () => request.agent(app) };
}
