import crypto from "node:crypto";

/** Uniformly random 6-digit code, zero-padded ("004219"). */
export function generateCode(): string {
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");
}

/** 256-bit random token, URL-safe. Used for magic links and session ids. */
export function generateToken(): string {
  return crypto.randomBytes(32).toString("base64url");
}

/** HMAC-SHA256 as hex. The purpose prefix keeps hashes for different uses unrelated. */
export function hmac(secret: string, purpose: string, value: string): string {
  return crypto.createHmac("sha256", secret).update(`${purpose}:${value}`).digest("hex");
}

export function sha256(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

/** Constant-time comparison of two hex digests. */
export function safeEqualHex(a: string, b: string): boolean {
  const ab = Buffer.from(a, "hex");
  const bb = Buffer.from(b, "hex");
  if (ab.length === 0 || ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}
