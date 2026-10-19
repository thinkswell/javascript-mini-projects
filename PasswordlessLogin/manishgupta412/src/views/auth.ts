import type { LoginMethod } from "../email/mailer.js";
import { alert, escapeHtml, icon, layout } from "./layout.js";

const METHOD_NOUN: Record<LoginMethod, string> = { code: "code", link: "magic link" };
const SEND_LABEL: Record<LoginMethod, string> = { code: "Send code", link: "Send link" };
const RESEND_LABEL: Record<LoginMethod, string> = { code: "Resend code", link: "Resend link" };
const NEW_LABEL: Record<LoginMethod, string> = { code: "Send a new code", link: "Send a new link" };
const SWITCH_LABEL: Record<LoginMethod, string> = {
  code: "Email me a code instead",
  link: "Email me a magic link instead",
};
const OTHER: Record<LoginMethod, LoginMethod> = { code: "link", link: "code" };

function submitButton(label: string, loadingLabel: string, cls = "btn-primary", extra = ""): string {
  return `<button type="submit" class="btn ${cls}" data-loading-label="${escapeHtml(loadingLabel)}"${extra}><span class="label">${escapeHtml(label)}</span></button>`;
}

/** Hidden-field form that asks for another email; `waitSeconds` > 0 shows a live timer. */
export function resendForm(
  email: string,
  method: LoginMethod,
  label: string,
  cls = "btn-secondary",
  waitSeconds = 0,
): string {
  const wait = waitSeconds > 0 ? ` data-wait="${Math.ceil(waitSeconds)}"` : "";
  return `<form method="post" action="/login/resend">
  <input type="hidden" name="email" value="${escapeHtml(email)}">
  <input type="hidden" name="method" value="${method}">
  <button type="submit" class="btn ${cls}" data-loading-label="Sending…"${wait}><span class="label">${escapeHtml(label)}</span><span class="timer" aria-hidden="true"></span></button>
</form>`;
}

function codeForm(email: string, opts: { error?: boolean; autofocus?: boolean }): string {
  const err = opts.error ? " has-error" : "";
  return `<form method="post" action="/login/verify">
  <input type="hidden" name="email" value="${escapeHtml(email)}">
  <label for="code" class="sr-only">6-digit code</label>
  <input id="code" name="code" type="text" class="code${err}" data-otp inputmode="numeric" autocomplete="one-time-code" pattern="[0-9 ]{6,7}" maxlength="7" required${opts.autofocus ? " autofocus" : ""}${opts.error ? ' aria-invalid="true"' : ""}>
  <p class="hint">The code expires 10 minutes after it was sent.</p>
  ${submitButton("Sign in", "Signing in…")}
</form>`;
}

const changeEmail = `<p class="links">Wrong email? <a href="/login">Use a different one</a></p>`;

export function loginPage(opts: { email?: string; method?: LoginMethod; error?: string } = {}): string {
  const method = opts.method ?? "code";
  const choice = (value: LoginMethod, title: string, desc: string) => `
    <label class="choice">
      <input type="radio" name="method" value="${value}"${method === value ? " checked" : ""}>
      <span class="dot" aria-hidden="true"></span>
      <span class="choice-title">${title}</span>
      <span class="choice-desc">${desc}</span>
    </label>`;

  return layout(
    "Sign in",
    `<h1>Welcome back</h1>
<p class="lead">Enter your email and we'll send you a way in.</p>
${alert("error", opts.error)}
<form method="post" action="/login" data-method-form>
  <div class="field">
    <label for="email">Email address</label>
    <input id="email" name="email" type="email" autocomplete="email" placeholder="name@example.com" required autofocus value="${escapeHtml(opts.email ?? "")}"${opts.error ? ' aria-invalid="true"' : ""}>
  </div>
  <fieldset>
    <legend>Sign in with</legend>
    <div class="choices">
      ${choice("code", "A 6-digit code", "Type it on the next screen")}
      ${choice("link", "A magic link", "Click it in your inbox")}
    </div>
  </fieldset>
  ${submitButton("Continue", "Sending…", "btn-primary", ` data-label-code="${SEND_LABEL.code}" data-label-link="${SEND_LABEL.link}"`)}
</form>`,
  );
}

/**
 * After a request. Identical for known and unknown addresses, so it never reveals
 * whether an account exists.
 */
export function checkEmailPage(opts: {
  email: string;
  method: LoginMethod;
  /** Seconds left on the resend cooldown; resend buttons show a live timer until then. */
  waitSeconds: number;
  error?: string;
  notice?: string;
}): string {
  const email = escapeHtml(opts.email);
  const { method } = opts;
  const main =
    method === "code"
      ? `<p class="lead">If an account exists for <strong>${email}</strong>, we've sent it a 6-digit code. Enter it below to sign in.</p>
${alert("notice", opts.notice)}
${alert("error", opts.error)}
${codeForm(opts.email, { error: Boolean(opts.error), autofocus: true })}`
      : `<p class="lead">If an account exists for <strong>${email}</strong>, we've sent it a magic link. Open the email and click <strong>Sign in</strong>.</p>
${alert("notice", opts.notice)}
${alert("error", opts.error)}`;

  return layout(
    "Check your email",
    `${icon("mail")}
<h1>Check your email</h1>
${main}
<hr class="rule">
<p class="small center">Didn't get it? Check your spam folder, or request another.</p>
<div class="actions">
${resendForm(opts.email, method, RESEND_LABEL[method], "btn-secondary", opts.waitSeconds)}
${resendForm(opts.email, OTHER[method], SWITCH_LABEL[OTHER[method]], "btn-quiet", opts.waitSeconds)}
</div>
${changeEmail}`,
  );
}

/**
 * A request that hit the resend cooldown: nothing was sent this time.
 * Identical for known and unknown addresses (the cooldown is tracked for both).
 */
export function cooldownPage(opts: { email: string; method: LoginMethod; waitSeconds: number }): string {
  const email = escapeHtml(opts.email);
  const { method } = opts;
  const haveCode =
    method === "code"
      ? `<p class="small" style="margin-bottom:10px">Already have a code from that email? Enter it here.</p>
${codeForm(opts.email, {})}
<hr class="rule">`
      : "";
  return layout(
    "One moment",
    `${icon("clock")}
<h1>One moment</h1>
<p class="lead">We emailed <strong>${email}</strong> less than a minute ago.</p>
${alert("notice", `You can request a new ${METHOD_NOUN[method]} when the timer runs out.`)}
${haveCode}
${resendForm(opts.email, method, method === "code" ? "Send me a code" : "Send me a magic link", method === "code" ? "btn-secondary" : "btn-primary", opts.waitSeconds)}
${changeEmail}`,
  );
}

/** Terminal verification failures (expired, used, locked…): say what happened and offer a fresh one. */
export function verifyFailedPage(opts: {
  title: string;
  message: string;
  method: LoginMethod;
  email?: string;
}): string {
  const action = opts.email
    ? resendForm(opts.email, opts.method, NEW_LABEL[opts.method], "btn-primary")
    : `<a class="btn btn-primary" href="/login">Back to sign in</a>`;
  return layout(
    opts.title,
    `${icon("alert", "danger")}
<h1>${escapeHtml(opts.title)}</h1>
<p class="lead">${escapeHtml(opts.message)}</p>
${action}
${opts.email ? changeEmail : ""}`,
  );
}

export function sendFailedPage(email: string, method: LoginMethod): string {
  return layout(
    "Email not sent",
    `${icon("alert", "danger")}
<h1>Email not sent</h1>
<p class="lead">${escapeHtml("We couldn't send the email, try again. If it keeps failing, wait a few minutes and retry.")}</p>
${resendForm(email, method, "Try again", "btn-primary")}
${changeEmail}`,
  );
}

export function rateLimitedPage(retryAfterMs: number): string {
  const minutes = Math.max(1, Math.ceil(retryAfterMs / 60_000));
  return layout(
    "Too many attempts",
    `${icon("clock")}
<h1>Too many attempts</h1>
<p class="lead">Too many sign-in attempts. To protect your account, please try again in ${minutes} minute${minutes === 1 ? "" : "s"}.</p>
<a class="btn btn-secondary" href="/login">Back to sign in</a>`,
  );
}

/** Magic link landing page. GET never consumes the token (email scanners prefetch links). */
export function magicLinkPage(token: string): string {
  return layout(
    "Finish signing in",
    `${icon("lock")}
<h1>Finish signing in</h1>
<p class="lead">Click the button below to sign in on this device.</p>
<form method="post" action="/login/link">
  <input type="hidden" name="token" value="${escapeHtml(token)}">
  ${submitButton("Continue signing in", "Signing in…")}
</form>`,
  );
}

export function errorPage(title: string, message: string): string {
  return layout(
    title,
    `${icon("alert", "danger")}
<h1>${escapeHtml(title)}</h1>
<p class="lead">${escapeHtml(message)}</p>
<a class="btn btn-secondary" href="/login">Back to sign in</a>`,
  );
}
