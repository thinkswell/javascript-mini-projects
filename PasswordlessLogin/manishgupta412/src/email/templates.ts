import { CHALLENGE_TTL_MS } from "../auth/challenges.js";
import { escapeHtml } from "../views/layout.js";
import type { LoginEmail } from "./mailer.js";

export interface RenderedEmail {
  subject: string;
  text: string;
  html: string;
}

const TTL_MINUTES = Math.round(CHALLENGE_TTL_MS / 60_000);
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

function footerText(to: string): string {
  return `Sent to ${to} because someone asked to sign in. If that wasn't you, you can safely ignore this email.`;
}

/**
 * Email-safe layout: tables and inline styles only. The header gradient falls back
 * to solid blue in clients without CSS gradients (e.g. Outlook).
 */
function htmlShell(opts: { title: string; preheader: string; heading: string; content: string; to: string }): string {
  const to = escapeHtml(opts.to);
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(opts.title)}</title></head>
<body style="margin:0;padding:0;background:#eef2f7">
<div style="display:none;max-height:0;overflow:hidden">${escapeHtml(opts.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7"><tr><td align="center" style="padding:32px 16px">
  <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="width:520px;max-width:100%;background:#ffffff;border-radius:18px;overflow:hidden">
    <tr><td style="padding:30px 36px;background:#2457c5;background-image:linear-gradient(135deg,#1d3fa3,#2457c5 50%,#4338ca)">
      <p style="margin:0 0 6px;font:600 13px/1 ${FONT};color:#c7d5ff">Sign-in request</p>
      <p style="margin:0;font:700 26px/1.25 ${FONT};color:#ffffff">${escapeHtml(opts.heading)}</p>
    </td></tr>
    <tr><td style="padding:32px 36px 30px">
      ${opts.content}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:26px"><tr>
        <td style="background:#eef3fd;border-radius:10px;padding:12px 16px;font:14px/1.5 ${FONT};color:#1f4c9e;text-align:center">Expires in <b>${TTL_MINUTES} minutes</b> and works <b>once</b>.</td>
      </tr></table>
    </td></tr>
  </table>
  <p style="margin:20px 0 0;font:13px/1.5 ${FONT};color:#8a93a3;text-align:center">Sent to ${to} because someone asked to sign in.<br>If that wasn't you, you can safely ignore this email.</p>
</td></tr></table>
</body>
</html>`;
}

/** One bordered box per digit, so the code reads like the boxes on the sign-in page. */
function codeBoxes(code: string): string {
  const cells = [...code]
    .map(
      (d) =>
        `<td style="padding:0 4px"><div style="width:46px;height:56px;line-height:56px;text-align:center;border:1.5px solid #2457c5;border-radius:10px;font:700 26px/56px ${FONT};color:#1a2230">${escapeHtml(d)}</div></td>`,
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto"><tr>${cells}</tr></table>`;
}

export function renderLoginEmail(email: LoginEmail): RenderedEmail {
  if (email.method === "code") {
    const subject = `${email.code} is your login code`;
    // The code goes on the first line so it shows up in notification previews.
    const text = [
      email.code,
      "",
      "Enter this code on the sign-in page.",
      `It expires in ${TTL_MINUTES} minutes and works once.`,
      "",
      footerText(email.to),
    ].join("\n");
    const c = escapeHtml(email.code);
    const html = htmlShell({
      title: subject,
      preheader: subject,
      heading: "Your login code",
      to: email.to,
      content: `<p style="margin:0 0 22px;font:16px/1.6 ${FONT};color:#3d4757">Enter this code on the sign-in page:</p>
      ${codeBoxes(email.code)}
      <p style="margin:22px 0 0;font:14px/1.6 ${FONT};color:#5d6878;text-align:center">You can also copy it: <b style="font-family:${MONO};color:#1a2230;letter-spacing:2px">${c}</b></p>`,
    });
    return { subject, text, html };
  }

  const subject = "Your magic link";
  const text = [
    "Click the link below to sign in:",
    email.link,
    "",
    `It expires in ${TTL_MINUTES} minutes and works once.`,
    "",
    footerText(email.to),
  ].join("\n");
  const l = escapeHtml(email.link);
  const html = htmlShell({
    title: subject,
    preheader: "Click to sign in",
    heading: "Sign in with one click",
    to: email.to,
    content: `<p style="margin:0 0 24px;font:16px/1.6 ${FONT};color:#3d4757">Click the button to finish signing in to your account.</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto"><tr><td style="background:#2457c5;border-radius:10px">
        <a href="${l}" style="display:inline-block;padding:14px 34px;font:700 16px/1 ${FONT};color:#ffffff;text-decoration:none">Sign in</a>
      </td></tr></table>
      <p style="margin:22px 0 0;font:12.5px/1.6 ${FONT};color:#8a93a3;text-align:center;word-break:break-all">Or paste this link into your browser:<br><a href="${l}" style="color:#2457c5">${l}</a></p>`,
  });
  return { subject, text, html };
}
