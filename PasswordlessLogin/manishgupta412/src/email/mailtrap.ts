import { MailtrapClient } from "mailtrap";
import type { Mailer } from "./mailer.js";
import { renderLoginEmail } from "./templates.js";

export interface MailtrapMailerOptions {
  token: string;
  fromEmail: string;
  fromName: string;
}

/**
 * Sends through the Mailtrap Email API Transactional stream
 * (no `sandbox` / `bulk` flags => send.api.mailtrap.io).
 */
export function createMailtrapMailer(opts: MailtrapMailerOptions): Mailer {
  const client = new MailtrapClient({ token: opts.token });

  return {
    async sendLoginEmail(email) {
      const { subject, text, html } = renderLoginEmail(email);
      await client.send({
        from: { email: opts.fromEmail, name: opts.fromName },
        to: [{ email: email.to }],
        subject,
        text,
        html,
        category: email.method === "code" ? "login-code" : "login-link",
      });
    },
  };
}
