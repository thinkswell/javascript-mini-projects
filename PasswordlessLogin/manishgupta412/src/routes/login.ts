import { performance } from "node:perf_hooks";
import { setTimeout as sleep } from "node:timers/promises";
import { Router, type Request, type RequestHandler, type Response } from "express";
import { z } from "zod";
import type { VerifyResult } from "../auth/challenges.js";
import { RATE_LIMITS } from "../auth/rateLimit.js";
import { EmailSchema, ipKey, requestLogin, resendWaitSeconds, type HtmlResult, type RequestLoginDeps } from "../auth/requestLogin.js";
import { readSessionId, setSessionCookie, type SessionStore } from "../auth/sessions.js";
import { maskEmail, type Logger } from "../logger.js";
import {
  checkEmailPage,
  errorPage,
  loginPage,
  magicLinkPage,
  rateLimitedPage,
  verifyFailedPage,
} from "../views/auth.js";

export interface LoginRouterDeps extends RequestLoginDeps {
  sessions: SessionStore;
  secureCookies: boolean;
  /** Every POST /login and /login/resend takes at least this long (anti-enumeration). */
  minResponseMs: number;
}

const CodeSchema = z
  .string()
  .transform((s) => s.replace(/\s+/g, ""))
  .pipe(z.string().regex(/^\d{6}$/));

const TokenSchema = z.string().regex(/^[A-Za-z0-9_-]{43}$/);

const MESSAGES = {
  code: {
    not_found: { title: "No active code", text: "There's no active code for this email. Request a new one to continue." },
    replaced: { title: "Code replaced", text: "A newer code was sent. Use the code from the most recent email." },
    used: { title: "Code already used", text: "This code has already been used. Each code works only once." },
    expired: { title: "Code expired", text: "This code has expired. Codes are valid for 10 minutes." },
    locked: {
      title: "Code locked",
      text: "Too many incorrect attempts. For your security, this code no longer works. Request a new one to continue.",
    },
  },
  link: {
    not_found: {
      title: "Link not valid",
      text: "This magic link isn't valid. Make sure you opened the whole link from the email, or request a new one.",
    },
    replaced: { title: "Link replaced", text: "This link was replaced by a newer one. Use the link in the most recent email." },
    used: { title: "Link already used", text: "This magic link has already been used. Each link works only once." },
    expired: { title: "Link expired", text: "This magic link has expired. Links are valid for 10 minutes." },
    locked: { title: "Link locked", text: "Too many incorrect attempts. For your security, this sign-in request was locked." },
  },
} as const;

function sendHtml(res: Response, result: HtmlResult): void {
  res.status(result.status).type("html").send(result.html);
}

export function loginRouter(deps: LoginRouterDeps): Router {
  const router = Router();
  const { limiter, logger } = deps;

  /** Pads the response so known/unknown/rate-limited paths take the same minimum time. */
  const padded = (fn: (req: Request) => Promise<HtmlResult>): RequestHandler =>
    async (req, res) => {
      const started = performance.now();
      let result: HtmlResult;
      try {
        result = await fn(req);
      } catch (err) {
        logger.error("login request failed", { error: err });
        result = { status: 500, html: errorPage("Something went wrong", "An unexpected error occurred. Please try again.") };
      }
      const remaining = deps.minResponseMs - (performance.now() - started);
      if (remaining > 0) await sleep(remaining);
      sendHtml(res, result);
    };

  const handleRequest = padded((req) =>
    requestLogin(deps, { email: req.body?.email, method: req.body?.method, ip: req.ip ?? "unknown" }),
  );

  router.get("/login", (_req, res) => sendHtml(res, { status: 200, html: loginPage() }));
  router.post("/login", handleRequest);
  router.post("/login/resend", handleRequest);

  const verifyLimited = (req: Request, res: Response): boolean => {
    const hit = limiter.hit(ipKey(deps.otpSecret, "verify-ip", req.ip ?? "unknown"), RATE_LIMITS.verifyPerIp);
    if (hit.allowed) return false;
    logger.warn("verify rate limited", { scope: "ip" });
    sendHtml(res, { status: 429, html: rateLimitedPage(hit.retryAfterMs) });
    return true;
  };

  const signIn = (req: Request, res: Response, email: string, method: string): void => {
    const user = deps.autoSignup ? deps.users.findOrCreate(email) : deps.users.findByEmail(email);
    if (!user) {
      sendHtml(res, { status: 400, html: verifyFailedPage({ title: MESSAGES.code.not_found.title, message: MESSAGES.code.not_found.text, method: "code", email }) });
      return;
    }
    // Rotate: drop any session the browser already had (prevents session fixation).
    const previous = readSessionId(req.headers.cookie);
    if (previous) deps.sessions.destroy(previous);

    const session = deps.sessions.create(user.id);
    setSessionCookie(res, session.id, { secure: deps.secureCookies });
    logger.info("signed in", { email: maskEmail(email), method });
    res.redirect(303, "/dashboard");
  };

  const failure = (res: Response, result: Exclude<VerifyResult, { ok: true }>, kind: "code" | "link") => {
    if (result.reason === "incorrect") {
      const left = result.attemptsLeft ?? 0;
      sendHtml(res, {
        status: 401,
        html: checkEmailPage({
          email: result.email ?? "",
          method: "code",
          waitSeconds: resendWaitSeconds(deps, result.email ?? ""),
          error: `That code isn't correct. You have ${left} attempt${left === 1 ? "" : "s"} left.`,
        }),
      });
      return;
    }
    sendHtml(res, {
      status: 400,
      html: verifyFailedPage({ title: MESSAGES[kind][result.reason].title, message: MESSAGES[kind][result.reason].text, method: kind, email: result.email }),
    });
  };

  router.post("/login/verify", (req, res) => {
    if (verifyLimited(req, res)) return;

    const email = EmailSchema.safeParse(req.body?.email);
    if (!email.success) {
      sendHtml(res, { status: 400, html: loginPage({ error: "Enter a valid email address, like name@example.com." }) });
      return;
    }
    const code = CodeSchema.safeParse(req.body?.code);
    if (!code.success) {
      sendHtml(res, {
        status: 400,
        html: checkEmailPage({ email: email.data, method: "code", waitSeconds: resendWaitSeconds(deps, email.data), error: "Enter the 6-digit code from the email." }),
      });
      return;
    }

    const result = deps.challenges.verifyCode(email.data, code.data);
    if (!result.ok) {
      logger.info("code verification failed", { email: maskEmail(email.data), reason: result.reason });
      failure(res, result, "code");
      return;
    }
    signIn(req, res, result.email, "code");
  });

  router.get("/login/link", (req, res) => {
    const token = TokenSchema.safeParse(req.query.token);
    if (!token.success) {
      sendHtml(res, { status: 400, html: verifyFailedPage({ title: MESSAGES.link.not_found.title, message: MESSAGES.link.not_found.text, method: "link" }) });
      return;
    }
    sendHtml(res, { status: 200, html: magicLinkPage(token.data) });
  });

  router.post("/login/link", (req, res) => {
    if (verifyLimited(req, res)) return;

    const token = TokenSchema.safeParse(req.body?.token);
    const result = token.success
      ? deps.challenges.verifyToken(token.data)
      : ({ ok: false, reason: "not_found" } as const);
    if (!result.ok) {
      logger.info("link verification failed", { reason: result.reason });
      failure(res, result, "link");
      return;
    }
    signIn(req, res, result.email, "link");
  });

  return router;
}

