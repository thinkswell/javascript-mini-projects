import { z } from "zod";
import type { LoginEmail, LoginMethod, Mailer } from "../email/mailer.js";
import { maskEmail, type Logger } from "../logger.js";
import { checkEmailPage, cooldownPage, loginPage, rateLimitedPage, sendFailedPage } from "../views/auth.js";
import type { ChallengeStore } from "./challenges.js";
import { generateCode, generateToken, hmac } from "./crypto.js";
import { RATE_LIMITS, type RateLimiter } from "./rateLimit.js";
import type { UserStore } from "./users.js";

export const EmailSchema = z.string().trim().toLowerCase().max(254).pipe(z.email());

/** Which credential to email. Anything missing or unexpected falls back to a code. */
export const MethodSchema = z.enum(["code", "link"]).catch("code");

export interface HtmlResult {
  status: number;
  html: string;
}

export interface RequestLoginDeps {
  appUrl: string;
  otpSecret: string;
  autoSignup: boolean;
  users: UserStore;
  challenges: ChallengeStore;
  limiter: RateLimiter;
  mailer: Mailer;
  logger: Logger;
}

/** Rate-limit keys are HMACs so the table never holds raw emails or IPs. */
export function ipKey(secret: string, scope: string, ip: string): string {
  return `${scope}:${hmac(secret, "rl-ip", ip)}`;
}

function emailKey(secret: string, scope: string, email: string): string {
  return `${scope}:${hmac(secret, "rl-email", email)}`;
}

const COOLDOWN_SECONDS = RATE_LIMITS.resendCooldownMs / 1000;

/** Seconds until this email may request another code/link (0 = now). */
export function resendWaitSeconds(deps: Pick<RequestLoginDeps, "otpSecret" | "limiter">, email: string): number {
  const ms = deps.limiter.cooldownRemaining(emailKey(deps.otpSecret, "cooldown", email), RATE_LIMITS.resendCooldownMs);
  return Math.ceil(ms / 1000);
}

/**
 * Shared by POST /login and POST /login/resend.
 * Known and unknown emails go through identical limit/cooldown bookkeeping and
 * get the identical "check your email" page; only known emails are mailed.
 */
export async function requestLogin(
  deps: RequestLoginDeps,
  input: { email: unknown; method: unknown; ip: string },
): Promise<HtmlResult> {
  const { otpSecret, limiter, logger } = deps;
  const method: LoginMethod = MethodSchema.parse(input.method);

  const ipHit = limiter.hit(ipKey(otpSecret, "request-ip", input.ip), RATE_LIMITS.requestPerIp);
  if (!ipHit.allowed) {
    logger.warn("login request rate limited", { scope: "ip" });
    return { status: 429, html: rateLimitedPage(ipHit.retryAfterMs) };
  }

  const parsed = EmailSchema.safeParse(input.email);
  if (!parsed.success) {
    const raw = typeof input.email === "string" ? input.email.slice(0, 254) : "";
    return { status: 400, html: loginPage({ email: raw, method, error: "Enter a valid email address, like name@example.com." }) };
  }
  const email = parsed.data;

  const cooldownKey = emailKey(otpSecret, "cooldown", email);
  const waitMs = limiter.cooldownRemaining(cooldownKey, RATE_LIMITS.resendCooldownMs);
  if (waitMs > 0) {
    const seconds = Math.ceil(waitMs / 1000);
    logger.info("login request blocked by resend cooldown", { email: maskEmail(email), method, waitSeconds: seconds });
    return {
      status: 429,
      html: cooldownPage({ email, method, waitSeconds: seconds }),
    };
  }

  const emailHit = limiter.hit(emailKey(otpSecret, "request-email", email), RATE_LIMITS.requestPerEmail);
  if (!emailHit.allowed) {
    logger.warn("login request rate limited", { scope: "email", email: maskEmail(email) });
    return { status: 429, html: rateLimitedPage(emailHit.retryAfterMs) };
  }

  limiter.startCooldown(cooldownKey);

  const user = deps.users.findByEmail(email);
  if (!user && !deps.autoSignup) {
    logger.info("login requested", { email: maskEmail(email), method });
    return { status: 200, html: checkEmailPage({ email, method, waitSeconds: COOLDOWN_SECONDS }) };
  }

  // Generate and send only the credential the user asked for.
  let secret: { code: string } | { token: string };
  let message: LoginEmail;
  if (method === "code") {
    const code = generateCode();
    secret = { code };
    message = { to: email, method, code };
  } else {
    const token = generateToken();
    secret = { token };
    message = { to: email, method, link: `${deps.appUrl}/login/link?token=${token}` };
  }

  try {
    await deps.mailer.sendLoginEmail(message);
  } catch (err) {
    // Let the user retry right away; the attempt still counts toward rate limits.
    limiter.clearCooldown(cooldownKey);
    logger.error("login email send failed", { email: maskEmail(email), error: err });
    return { status: 502, html: sendFailedPage(email, method) };
  }

  // Store only after the provider accepted the message.
  deps.challenges.create(email, secret);
  logger.info("login requested", { email: maskEmail(email), method });
  return { status: 200, html: checkEmailPage({ email, method, waitSeconds: COOLDOWN_SECONDS }) };
}
