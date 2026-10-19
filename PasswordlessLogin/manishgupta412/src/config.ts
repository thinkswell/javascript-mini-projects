import { z } from "zod";

const boolString = z
  .enum(["true", "false"], { error: 'must be "true" or "false"' })
  .default("false")
  .transform((v) => v === "true");

const EnvSchema = z.object({
  MAILTRAP_TOKEN: z.string().min(1),
  MAIL_FROM_EMAIL: z.email(),
  MAIL_FROM_NAME: z.string().min(1).default("Login"),
  APP_URL: z.url({ protocol: /^https?$/, error: "must be an http(s) URL" }),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  OTP_SECRET: z.string().min(32, "must be at least 32 characters"),
  AUTO_SIGNUP: boolString,
  DATABASE_PATH: z.string().min(1).default("./data/app.db"),
  TRUST_PROXY: boolString,
});

export interface Config {
  mailtrapToken: string;
  mailFromEmail: string;
  mailFromName: string;
  appUrl: string;
  port: number;
  otpSecret: string;
  autoSignup: boolean;
  databasePath: string;
  trustProxy: boolean;
  /** Derived: cookies get the Secure flag when the app is served over https. */
  secureCookies: boolean;
}

export class ConfigError extends Error {
  override name = "ConfigError";
}

/**
 * Validates environment variables. Throws ConfigError listing every problem.
 * Error messages name the variable and the rule only, never the value.
 */
export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  // Treat empty strings as unset so `FOO=` in .env reports "missing".
  const input = Object.fromEntries(
    Object.keys(EnvSchema.shape).map((key) => {
      const value = env[key]?.trim();
      return [key, value === "" ? undefined : value];
    }),
  );

  const result = EnvSchema.safeParse(input);
  if (!result.success) {
    const lines = result.error.issues.map((issue) => {
      const key = String(issue.path[0] ?? "env");
      const reason = input[key] === undefined ? "is missing" : issue.message;
      return `  - ${key}: ${reason}`;
    });
    throw new ConfigError(
      `Invalid environment configuration:\n${lines.join("\n")}\n` +
        "Copy .env.example to .env and fill in the values.",
    );
  }

  const e = result.data;
  const appUrl = e.APP_URL.replace(/\/+$/, "");
  return {
    mailtrapToken: e.MAILTRAP_TOKEN,
    mailFromEmail: e.MAIL_FROM_EMAIL,
    mailFromName: e.MAIL_FROM_NAME,
    appUrl,
    port: e.PORT,
    otpSecret: e.OTP_SECRET,
    autoSignup: e.AUTO_SIGNUP,
    databasePath: e.DATABASE_PATH,
    trustProxy: e.TRUST_PROXY,
    secureCookies: appUrl.startsWith("https://"),
  };
}
