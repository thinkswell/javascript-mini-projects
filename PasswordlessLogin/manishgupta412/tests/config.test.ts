import { describe, expect, it } from "vitest";
import { ConfigError, loadConfig } from "../src/config.js";

const valid = {
  MAILTRAP_TOKEN: "tok_supersecretvalue",
  MAIL_FROM_EMAIL: "login@example.com",
  MAIL_FROM_NAME: "Example",
  APP_URL: "https://app.example.com/",
  PORT: "4000",
  OTP_SECRET: "x".repeat(48),
  AUTO_SIGNUP: "true",
};

describe("config", () => {
  it("parses a valid environment", () => {
    const c = loadConfig(valid);
    expect(c.appUrl).toBe("https://app.example.com");
    expect(c.secureCookies).toBe(true);
    expect(c.port).toBe(4000);
    expect(c.autoSignup).toBe(true);
    expect(c.databasePath).toBe("./data/app.db");
  });

  it("fails fast listing missing/invalid vars without echoing values", () => {
    const env = { ...valid, MAILTRAP_TOKEN: "", OTP_SECRET: "short-secret-value", APP_URL: "ftp://nope" };
    expect(() => loadConfig(env)).toThrow(ConfigError);
    try {
      loadConfig(env);
    } catch (err) {
      const msg = (err as Error).message;
      expect(msg).toContain("MAILTRAP_TOKEN: is missing");
      expect(msg).toContain("OTP_SECRET: must be at least 32 characters");
      expect(msg).toContain("APP_URL");
      expect(msg).not.toContain("short-secret-value");
      expect(msg).not.toContain("ftp://nope");
    }
  });
});
