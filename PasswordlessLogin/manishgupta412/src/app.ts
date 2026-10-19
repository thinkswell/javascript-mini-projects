import express, { type ErrorRequestHandler, type Express } from "express";
import { ChallengeStore } from "./auth/challenges.js";
import { RateLimiter } from "./auth/rateLimit.js";
import { SessionStore } from "./auth/sessions.js";
import { UserStore } from "./auth/users.js";
import { systemClock, type Clock } from "./clock.js";
import type { Config } from "./config.js";
import type { DB } from "./db.js";
import type { Mailer } from "./email/mailer.js";
import { createLogger, type Logger } from "./logger.js";
import { dashboardRouter } from "./routes/dashboard.js";
import { loginRouter } from "./routes/login.js";
import { errorPage } from "./views/auth.js";
import { CLIENT_JS } from "./views/client.js";

export type AppConfig = Pick<Config, "appUrl" | "otpSecret" | "autoSignup" | "trustProxy" | "secureCookies">;

export interface AppDeps {
  config: AppConfig;
  db: DB;
  mailer: Mailer;
  clock?: Clock;
  logger?: Logger;
  /** Constant minimum duration for POST /login and /login/resend. Default 800ms. */
  minResponseMs?: number;
}

export function createApp(deps: AppDeps): Express {
  const { config, db, mailer } = deps;
  const clock = deps.clock ?? systemClock;
  const logger = deps.logger ?? createLogger();

  const users = new UserStore(db, clock);
  const challenges = new ChallengeStore(db, clock, config.otpSecret);
  const sessions = new SessionStore(db, clock);
  const limiter = new RateLimiter(db, clock);

  const app = express();
  app.disable("x-powered-by");
  app.set("trust proxy", config.trustProxy);

  app.use((req, res, next) => {
    res.set({
      "Content-Security-Policy":
        "default-src 'none'; script-src 'self'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      // Magic-link URLs carry a token; never leak them via Referer.
      "Referrer-Policy": "no-referrer",
      "Cache-Control": "no-store",
    });
    const started = Date.now();
    res.on("finish", () => {
      // req.path excludes the query string, so ?token=... is never logged.
      logger.info("request", { method: req.method, path: req.path, status: res.statusCode, ms: Date.now() - started });
    });
    next();
  });

  // Reject cross-site form posts when the browser tells us the origin.
  const appOrigin = new URL(config.appUrl).origin;
  app.use((req, res, next) => {
    const origin = req.get("origin");
    if (req.method === "POST" && origin && origin !== "null" && origin !== appOrigin) {
      res.status(403).type("html").send(errorPage("Request blocked", "This form was submitted from another site, so it was blocked. Go back to sign in and try again."));
      return;
    }
    next();
  });

  app.use(express.urlencoded({ extended: false, limit: "10kb" }));

  app.get("/", (_req, res) => res.redirect(302, "/dashboard"));
  app.get("/assets/app.js", (_req, res) => {
    res.set("Cache-Control", "public, max-age=3600").type("application/javascript").send(CLIENT_JS);
  });
  app.use(
    loginRouter({
      appUrl: config.appUrl,
      otpSecret: config.otpSecret,
      autoSignup: config.autoSignup,
      secureCookies: config.secureCookies,
      minResponseMs: deps.minResponseMs ?? 800,
      users,
      challenges,
      sessions,
      limiter,
      mailer,
      logger,
    }),
  );
  app.use(dashboardRouter({ sessions, secureCookies: config.secureCookies }));

  app.use((_req, res) => {
    res.status(404).type("html").send(errorPage("Page not found", "The page you were looking for doesn't exist."));
  });

  const onError: ErrorRequestHandler = (err, _req, res, _next) => {
    const status = typeof err?.status === "number" && err.status < 500 ? err.status : 500;
    if (status >= 500) logger.error("unhandled error", { error: err });
    res.status(status).type("html").send(status >= 500
        ? errorPage("Something went wrong", "An unexpected error occurred. Please try again.")
        : errorPage("Request not valid", "The request couldn't be processed. Please try again."));
  };
  app.use(onError);

  return app;
}
