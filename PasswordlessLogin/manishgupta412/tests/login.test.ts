import { describe, expect, it } from "vitest";
import { MAX_ATTEMPTS } from "../src/auth/challenges.js";
import { RATE_LIMITS } from "../src/auth/rateLimit.js";
import { codeFrom, KNOWN, linkFrom, setup, UNKNOWN, wrongCode } from "./helpers.js";

const MINUTE = 60_000;
const COOLDOWN = RATE_LIMITS.resendCooldownMs + 1000;

describe("choosing code or link", () => {
  it("offers both choices on the login page", async () => {
    const t = setup();
    const res = await t.agent().get("/login");
    expect(res.text).toContain('name="method" value="code"');
    expect(res.text).toContain('name="method" value="link"');
  });

  it("a code request emails only a code", async () => {
    const t = setup();
    const res = await t.requestCode(KNOWN);
    expect(res.text).toContain("a 6-digit code");
    expect(res.text).toContain('action="/login/verify"');
    const mail = t.mailer.last();
    expect(mail.method).toBe("code");
    expect(mail.text).not.toContain("/login/link");
    expect(mail.html).not.toContain("/login/link");
    expect(t.db.prepare("SELECT method, token_hash FROM login_challenges").get()).toEqual({
      method: "code",
      token_hash: null,
    });
  });

  it("a link request emails only a link, with no code form on the page", async () => {
    const t = setup();
    const res = await t.requestLink(KNOWN);
    expect(res.text).toContain("a magic link");
    expect(res.text).not.toContain('action="/login/verify"');
    const mail = t.mailer.last();
    expect(mail.method).toBe("link");
    expect(mail.subject).toBe("Your magic link");
    expect(mail.text).not.toMatch(/\b\d{6}\b/);
    expect(t.db.prepare("SELECT method, code_hash FROM login_challenges").get()).toEqual({
      method: "link",
      code_hash: null,
    });
  });

  it("defaults to a code when no method is given", async () => {
    const t = setup();
    await t.agent().post("/login").type("form").send({ email: KNOWN });
    expect(t.mailer.last().method).toBe("code");
  });

  it("a link-only challenge cannot be completed with a guessed code", async () => {
    const t = setup();
    await t.requestLink(KNOWN);
    const res = await t.verify(KNOWN, "123456");
    expect(res.status).toBe(400);
    expect(res.text).toContain("no active code");
    expect(t.db.prepare("SELECT attempts FROM login_challenges").get()).toEqual({ attempts: 0 });
  });

  it("lets the user switch method from the check-email page", async () => {
    const t = setup();
    const page = await t.requestCode(KNOWN);
    expect(page.text).toContain("Email me a magic link instead");
    t.clock.advance(COOLDOWN);
    const res = await t.agent().post("/login/resend").type("form").send({ email: KNOWN, method: "link" });
    expect(res.status).toBe(200);
    expect(t.mailer.last().method).toBe("link");
  });
});

describe("login via code", () => {
  it("emails a code and signs the user in", async () => {
    const t = setup();
    const agent = t.agent();

    const res = await t.requestCode("  Alice@Example.COM ", agent);
    expect(res.status).toBe(200);
    expect(res.text).toContain("Check your email");
    expect(res.text).toContain(`name="email" value="${KNOWN}"`);

    expect(t.mailer.sent).toHaveLength(1);
    const mail = t.mailer.last();
    const code = codeFrom(mail);
    expect(mail.to).toBe(KNOWN);
    expect(mail.subject).toBe(`${code} is your login code`);
    expect(mail.html).toContain(code);

    const verify = await t.verify(KNOWN, code, agent);
    expect(verify.status).toBe(303);
    expect(verify.headers.location).toBe("/dashboard");
    const cookie = String(verify.headers["set-cookie"]);
    expect(cookie).toMatch(/sid=[A-Za-z0-9_-]{43}/);
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("SameSite=Lax");
    expect(cookie).toContain("Path=/");
    expect(cookie).not.toContain("Secure");

    const dash = await agent.get("/dashboard");
    expect(dash.status).toBe(200);
    expect(dash.text).toContain(KNOWN);
  });

  it("accepts a code typed with spaces", async () => {
    const t = setup();
    await t.requestCode(KNOWN);
    const code = codeFrom(t.mailer.last());
    const res = await t.verify(KNOWN, ` ${code.slice(0, 3)} ${code.slice(3)} `);
    expect(res.status).toBe(303);
  });
});

describe("login via magic link", () => {
  it("does not consume the token on GET, signs in on POST", async () => {
    const t = setup();
    const agent = t.agent();
    await t.requestLink(KNOWN, agent);
    const { path, token } = linkFrom(t.mailer.last());

    const get = await agent.get(path);
    expect(get.status).toBe(200);
    expect(get.text).toContain("Continue signing in");
    expect(get.text).toContain('action="/login/link"');
    // A second GET (e.g. an email scanner prefetch) changes nothing.
    await agent.get(path);
    expect(t.db.prepare("SELECT used_at FROM login_challenges").get()).toEqual({ used_at: null });

    const post = await t.postLink(token, agent);
    expect(post.status).toBe(303);
    expect(post.headers.location).toBe("/dashboard");

    const dash = await agent.get("/dashboard");
    expect(dash.status).toBe(200);
    expect(dash.text).toContain(KNOWN);
  });

  it("rejects an invalid token", async () => {
    const t = setup();
    const res = await t.postLink("A".repeat(43));
    expect(res.status).toBe(400);
    expect(res.text).toContain("This magic link isn&#39;t valid.");
  });
});

describe("expiry and single use", () => {
  it("rejects an expired code and offers a new one", async () => {
    const t = setup();
    await t.requestCode(KNOWN);
    const code = codeFrom(t.mailer.last());
    t.clock.advance(10 * MINUTE + 1000);

    const res = await t.verify(KNOWN, code);
    expect(res.status).toBe(400);
    expect(res.text).toContain("This code has expired.");
    expect(res.text).toContain('action="/login/resend"');
    expect(res.text).toContain("Send a new code");
    expect(res.headers["set-cookie"]).toBeUndefined();
  });

  it("rejects an expired link and offers a new link", async () => {
    const t = setup();
    await t.requestLink(KNOWN);
    const { token } = linkFrom(t.mailer.last());
    t.clock.advance(11 * MINUTE);
    const res = await t.postLink(token);
    expect(res.text).toContain("This magic link has expired.");
    expect(res.text).toContain('name="method" value="link"');
    expect(res.text).toContain("Send a new link");
  });

  it("rejects a reused code", async () => {
    const t = setup();
    await t.requestCode(KNOWN);
    const code = codeFrom(t.mailer.last());
    expect((await t.verify(KNOWN, code)).status).toBe(303);

    const again = await t.verify(KNOWN, code);
    expect(again.status).toBe(400);
    expect(again.text).toContain("This code has already been used.");
    expect(again.text).toContain('action="/login/resend"');
  });

  it("rejects a reused link", async () => {
    const t = setup();
    await t.requestLink(KNOWN);
    const { token } = linkFrom(t.mailer.last());
    expect((await t.postLink(token)).status).toBe(303);

    const again = await t.postLink(token);
    expect(again.status).toBe(400);
    expect(again.text).toContain("This magic link has already been used.");
  });

  it("invalidates the previous code or link when a new one is requested", async () => {
    const t = setup();
    await t.requestLink(KNOWN);
    const oldLink = linkFrom(t.mailer.last()).token;
    t.clock.advance(COOLDOWN);
    await t.requestCode(KNOWN);
    const oldCode = codeFrom(t.mailer.last());
    t.clock.advance(COOLDOWN);
    await t.agent().post("/login/resend").type("form").send({ email: KNOWN, method: "code" });
    expect(t.mailer.sent).toHaveLength(3);

    expect((await t.postLink(oldLink)).text).toContain("replaced by a newer one");
    const stale = await t.verify(KNOWN, oldCode);
    expect(stale.status).toBe(401);

    const fresh = await t.verify(KNOWN, codeFrom(t.mailer.last()));
    expect(fresh.status).toBe(303);
  });
});

describe("attempt limits", () => {
  it(`locks after ${MAX_ATTEMPTS} wrong codes, even for the correct code`, async () => {
    const t = setup();
    await t.requestCode(KNOWN);
    const code = codeFrom(t.mailer.last());
    const bad = wrongCode(code);

    for (let i = 1; i < MAX_ATTEMPTS; i++) {
      const res = await t.verify(KNOWN, bad);
      expect(res.status).toBe(401);
      expect(res.text).toContain(`You have ${MAX_ATTEMPTS - i} attempt`);
    }
    const last = await t.verify(KNOWN, bad);
    expect(last.text).toContain("Too many incorrect attempts");

    const correct = await t.verify(KNOWN, code);
    expect(correct.status).toBe(400);
    expect(correct.text).toContain("Too many incorrect attempts");
    expect(correct.text).toContain('action="/login/resend"');
    expect(correct.headers["set-cookie"]).toBeUndefined();
    expect(t.count("sessions")).toBe(0);
  });

  it("does not count malformed codes as attempts", async () => {
    const t = setup();
    await t.requestCode(KNOWN);
    const res = await t.verify(KNOWN, "12ab");
    expect(res.status).toBe(400);
    expect(res.text).toContain("Enter the 6-digit code");
    expect(t.db.prepare("SELECT attempts FROM login_challenges").get()).toEqual({ attempts: 0 });
  });
});

describe("cooldown and rate limits", () => {
  it("enforces a 60 second resend cooldown, whichever method is chosen", async () => {
    const t = setup();
    expect((await t.requestCode(KNOWN)).status).toBe(200);

    const tooSoon = await t.agent().post("/login/resend").type("form").send({ email: KNOWN, method: "code" });
    expect(tooSoon.status).toBe(429);
    expect(tooSoon.text).toContain("when the timer runs out");
    // The cooldown page must not claim that anything was sent.
    expect(tooSoon.text).toContain("less than a minute ago.");
    expect(tooSoon.text).not.toContain("Check your email");
    expect(tooSoon.text).toContain('action="/login/verify"');
    const linkTooSoon = await t.requestLink(KNOWN);
    expect(linkTooSoon.text).toContain("request a new magic link when the timer runs out");
    expect(linkTooSoon.text).not.toContain('action="/login/verify"');
    expect((await t.requestLink(KNOWN)).status).toBe(429);
    expect(t.mailer.sent).toHaveLength(1);

    t.clock.advance(59_000);
    expect((await t.requestCode(KNOWN)).status).toBe(429);

    t.clock.advance(2_000);
    expect((await t.requestLink(KNOWN)).status).toBe(200);
    expect(t.mailer.sent).toHaveLength(2);
  });

  it("renders resend buttons with the remaining cooldown for the live timer", async () => {
    const t = setup();
    const first = await t.requestCode(KNOWN);
    expect(first.text).toContain('data-wait="60"');
    expect(first.text).toContain('<script src="/assets/app.js" defer></script>');
    // Both the resend and the switch-method button wait for the cooldown.
    expect(first.text.match(/data-wait="60"/g)).toHaveLength(2);

    t.clock.advance(20_000);
    const early = await t.requestLink(KNOWN);
    expect(early.status).toBe(429);
    expect(early.text).toContain('data-wait="40"');

    // A wrong code re-renders the page with the cooldown still counting down.
    t.clock.advance(5_000);
    const wrong = await t.verify(KNOWN, wrongCode(codeFrom(t.mailer.last())));
    expect(wrong.text).toContain('data-wait="35"');

    t.clock.advance(35_000);
    const wrongAgain = await t.verify(KNOWN, wrongCode(codeFrom(t.mailer.last())));
    expect(wrongAgain.text).not.toContain("data-wait");
  });

  it("does not show a timer after a failed send (retry is allowed at once)", async () => {
    const t = setup();
    t.mailer.fail = true;
    const res = await t.requestCode(KNOWN);
    expect(res.text).not.toContain("data-wait");
  });

  it("serves the countdown script from the same origin under the CSP", async () => {
    const t = setup();
    const res = await t.agent().get("/assets/app.js");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toContain("javascript");
    expect(() => new Function(res.text)).not.toThrow();
    const page = await t.agent().get("/login");
    expect(page.headers["content-security-policy"]).toContain("script-src 'self'");
  });

  it("limits requests per email", async () => {
    const t = setup();
    const { max, windowMs } = RATE_LIMITS.requestPerEmail;
    for (let i = 0; i < max; i++) {
      const res = i % 2 ? await t.requestLink(KNOWN) : await t.requestCode(KNOWN);
      expect(res.status).toBe(200);
      t.clock.advance(COOLDOWN);
    }
    const blocked = await t.requestCode(KNOWN);
    expect(blocked.status).toBe(429);
    expect(blocked.text).toContain("Too many sign-in attempts");
    expect(t.mailer.sent).toHaveLength(max);

    t.clock.advance(windowMs);
    expect((await t.requestCode(KNOWN)).status).toBe(200);
  });

  it("limits requests per IP", async () => {
    const users = Array.from({ length: 25 }, (_, i) => `user${i}@example.com`);
    const t = setup({ users });
    const { max } = RATE_LIMITS.requestPerIp;
    for (let i = 0; i < max; i++) {
      expect((await t.requestCode(users[i]!)).status).toBe(200);
    }
    const blocked = await t.requestLink(users[max]!);
    expect(blocked.status).toBe(429);
    expect(blocked.text).toContain("Too many sign-in attempts");
    expect(t.mailer.sent).toHaveLength(max);
  });
});

describe("send failure", () => {
  it.each(["code", "link"] as const)(
    "%s: shows an error, stores no challenge, and allows an immediate retry",
    async (method) => {
      const t = setup();
      t.mailer.fail = true;
      const res = method === "code" ? await t.requestCode(KNOWN) : await t.requestLink(KNOWN);
      expect(res.status).toBe(502);
      expect(res.text).toContain("We couldn&#39;t send the email, try again");
      expect(res.text).toContain(`name="method" value="${method}"`);
      expect(t.count("login_challenges")).toBe(0);

      t.mailer.fail = false;
      const retry = await t.agent().post("/login/resend").type("form").send({ email: KNOWN, method });
      expect(retry.status).toBe(200);
      expect(t.count("login_challenges")).toBe(1);
    },
  );
});

describe("no account enumeration", () => {
  const normalize = (body: string, email: string) => body.replaceAll(email, "EMAIL");

  it.each(["code", "link"] as const)("%s: known and unknown emails get identical responses", async (method) => {
    const t = setup({ minResponseMs: 150 });
    const send = (email: string) => (method === "code" ? t.requestCode(email) : t.requestLink(email));

    let started = Date.now();
    const known = await send(KNOWN);
    const knownMs = Date.now() - started;
    started = Date.now();
    const unknown = await send(UNKNOWN);
    const unknownMs = Date.now() - started;

    expect(unknown.status).toBe(known.status);
    expect(normalize(unknown.text, UNKNOWN)).toBe(normalize(known.text, KNOWN));
    expect(knownMs).toBeGreaterThanOrEqual(140);
    expect(unknownMs).toBeGreaterThanOrEqual(140);

    // Unknown: nothing sent, nothing stored.
    expect(t.mailer.sent.map((m) => m.to)).toEqual([KNOWN]);
    expect(t.db.prepare("SELECT COUNT(*) AS n FROM login_challenges WHERE email = ?").get(UNKNOWN)).toEqual({ n: 0 });
    expect(t.db.prepare("SELECT COUNT(*) AS n FROM users WHERE email = ?").get(UNKNOWN)).toEqual({ n: 0 });

    // Cooldown applies to unknown emails too, with the same response.
    const knownAgain = await send(KNOWN);
    const unknownAgain = await send(UNKNOWN);
    expect(unknownAgain.status).toBe(429);
    expect(knownAgain.status).toBe(429);
    expect(normalize(unknownAgain.text, UNKNOWN)).toBe(normalize(knownAgain.text, KNOWN));
  });

  it("rate limits unknown emails exactly like known ones", async () => {
    const t = setup();
    const { max } = RATE_LIMITS.requestPerEmail;
    for (let i = 0; i <= max; i++) {
      const k = await t.requestCode(KNOWN);
      const u = await t.requestCode(UNKNOWN);
      expect(u.status).toBe(k.status);
      t.clock.advance(COOLDOWN);
    }
    expect((await t.requestCode(UNKNOWN)).status).toBe(429);
  });

  it("gives unknown emails the same verify response as an email without a code", async () => {
    const t = setup({ users: [KNOWN, "bob@example.com"] });
    const unknown = await t.verify(UNKNOWN, "123456");
    const known = await t.verify("bob@example.com", "123456");
    expect(unknown.status).toBe(known.status);
  });
});

describe("AUTO_SIGNUP", () => {
  it("creates the user on first successful login only", async () => {
    const t = setup({ autoSignup: true, users: [] });
    await t.requestLink(UNKNOWN);
    expect(t.mailer.sent).toHaveLength(1);
    expect(t.count("users")).toBe(0);

    const res = await t.postLink(linkFrom(t.mailer.last()).token);
    expect(res.status).toBe(303);
    expect(t.db.prepare("SELECT email FROM users").all()).toEqual([{ email: UNKNOWN }]);
  });
});

describe("secrets never stored or logged in plaintext", () => {
  it("keeps codes, tokens, links and session ids out of the DB and logs", async () => {
    const t = setup();
    const agent = t.agent();

    await t.requestCode(KNOWN, agent);
    const code = codeFrom(t.mailer.last());
    await t.verify(KNOWN, wrongCode(code), agent);
    const viaCode = await t.verify(KNOWN, code, agent);
    const sid1 = String(viaCode.headers["set-cookie"]).match(/sid=([^;]+)/)![1]!;

    t.clock.advance(COOLDOWN);
    await t.requestLink(KNOWN, agent);
    const linkMail = t.mailer.last();
    if (linkMail.method !== "link") throw new Error("expected a link email");
    const { path, token } = linkFrom(linkMail);
    await agent.get(path);
    const viaLink = await t.postLink(token, agent);
    const sid2 = String(viaLink.headers["set-cookie"]).match(/sid=([^;]+)/)![1]!;

    // A failing send logs the provider error, which here includes the link.
    t.clock.advance(COOLDOWN);
    t.mailer.fail = true;
    await t.requestLink(KNOWN);
    t.clock.advance(COOLDOWN);
    await t.requestCode(KNOWN);

    const dump = JSON.stringify(
      ["users", "login_challenges", "sessions", "rate_limits"].map((table) =>
        t.db.prepare(`SELECT * FROM ${table}`).all(),
      ),
    );
    for (const secret of [code, token, linkMail.link, sid1, sid2]) {
      expect(dump).not.toContain(secret);
    }

    const logs = t.logs.join("\n");
    expect(logs).toContain("login email send failed");
    for (const secret of [code, token, linkMail.link, sid1, sid2, KNOWN]) {
      expect(logs).not.toContain(secret);
    }
  });
});

describe("sessions", () => {
  it("redirects /dashboard to /login without a session", async () => {
    const t = setup();
    const res = await t.agent().get("/dashboard");
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe("/login");

    const bogus = await t.agent().get("/dashboard").set("Cookie", "sid=not-a-real-session");
    expect(bogus.status).toBe(302);
  });

  it("logout destroys the session and clears the cookie", async () => {
    const t = setup();
    const agent = t.agent();
    await t.requestCode(KNOWN, agent);
    const login = await t.verify(KNOWN, codeFrom(t.mailer.last()), agent);
    const sid = String(login.headers["set-cookie"]).match(/sid=([^;]+)/)![1]!;
    expect(t.count("sessions")).toBe(1);

    const out = await agent.post("/logout");
    expect(out.status).toBe(303);
    expect(out.headers.location).toBe("/login");
    expect(String(out.headers["set-cookie"])).toContain("Max-Age=0");
    expect(t.count("sessions")).toBe(0);

    // Even replaying the old cookie no longer works.
    const replay = await t.agent().get("/dashboard").set("Cookie", `sid=${sid}`);
    expect(replay.status).toBe(302);
    expect(replay.headers.location).toBe("/login");
  });

  it("expires sessions after 7 days", async () => {
    const t = setup();
    const agent = t.agent();
    await t.requestCode(KNOWN, agent);
    await t.verify(KNOWN, codeFrom(t.mailer.last()), agent);
    t.clock.advance(7 * 24 * 60 * MINUTE + 1);
    expect((await agent.get("/dashboard")).status).toBe(302);
  });
});

describe("hardening", () => {
  it("escapes user input in HTML", async () => {
    const t = setup();
    const res = await t.requestCode('"><script>alert(1)</script>');
    expect(res.status).toBe(400);
    expect(res.text).not.toContain("<script>");
    expect(res.text).toContain("&lt;script&gt;");
  });

  it("blocks cross-origin form posts", async () => {
    const t = setup();
    const res = await t.agent().post("/logout").set("Origin", "https://evil.example");
    expect(res.status).toBe(403);
  });

  it("sends security headers", async () => {
    const t = setup();
    const res = await t.agent().get("/login");
    expect(res.headers["content-security-policy"]).toContain("default-src 'none'");
    expect(res.headers["referrer-policy"]).toBe("no-referrer");
    expect(res.headers["x-powered-by"]).toBeUndefined();
  });
});
