import { describe, expect, it } from "vitest";
import { createLogger, maskEmail, redact } from "../src/logger.js";

describe("logger", () => {
  it("redacts sensitive fields at any depth", () => {
    const out = redact({
      code: "123456",
      nested: { token: "abc", link: "https://x/login/link?token=abc", list: [{ html: "<p>123456</p>" }] },
      text: "body",
      subject: "123456 is your login code",
      safe: "ok",
    });
    expect(out).toEqual({
      code: "[REDACTED]",
      nested: { token: "[REDACTED]", link: "[REDACTED]", list: [{ html: "[REDACTED]" }] },
      text: "[REDACTED]",
      subject: "[REDACTED]",
      safe: "ok",
    });
  });

  it("scrubs tokens and codes from free-form strings and errors", () => {
    const lines: string[] = [];
    const log = createLogger((l) => lines.push(l));
    log.error("send failed", { error: new Error("bad request for https://app/login/link?token=SECRET123 code 654321") });
    expect(lines[0]).not.toContain("SECRET123");
    expect(lines[0]).not.toContain("654321");
    expect(lines[0]).toContain("[REDACTED]");
  });

  it("masks emails", () => {
    expect(maskEmail("alice@example.com")).toBe("a***@example.com");
  });
});
