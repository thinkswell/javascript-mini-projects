export type LoginMethod = "code" | "link";

/** One email carries exactly one credential: the one the user asked for. */
export type LoginEmail =
  | { to: string; method: "code"; code: string }
  | { to: string; method: "link"; link: string };

/** Email transport boundary. Production uses Mailtrap; tests inject a fake. */
export interface Mailer {
  /** Resolves when the provider accepted the message; rejects otherwise. */
  sendLoginEmail(email: LoginEmail): Promise<void>;
}
