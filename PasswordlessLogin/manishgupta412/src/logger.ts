type Level = "info" | "warn" | "error";
type Fields = Record<string, unknown>;

export interface Logger {
  info(msg: string, fields?: Fields): void;
  warn(msg: string, fields?: Fields): void;
  error(msg: string, fields?: Fields): void;
}

/** Field names whose values are never written to logs. */
const SENSITIVE_KEY =
  /^(code|otp|token|link|url|magiclink|subject|text|html|body|secret|password|cookie|set-cookie|authorization|mailtraptoken|otpsecret)$/i;

/** Defense in depth for free-form strings (e.g. error messages, URLs). */
const SENSITIVE_PATTERNS: [RegExp, string][] = [
  [/([?&]token=)[^&\s"'<>]+/gi, "$1[REDACTED]"],
  [/\b\d{6}\b/g, "[REDACTED]"],
];

const REDACTED = "[REDACTED]";

function scrubString(value: string): string {
  return SENSITIVE_PATTERNS.reduce((s, [re, rep]) => s.replace(re, rep), value);
}

export function redact(value: unknown, depth = 0): unknown {
  if (depth > 6) return "[Truncated]";
  if (typeof value === "string") return scrubString(value);
  if (value instanceof Error) {
    return { name: value.name, message: scrubString(value.message) };
  }
  if (Array.isArray(value)) return value.map((v) => redact(v, depth + 1));
  if (value && typeof value === "object") {
    const out: Fields = {};
    for (const [key, v] of Object.entries(value)) {
      out[key] = SENSITIVE_KEY.test(key) ? REDACTED : redact(v, depth + 1);
    }
    return out;
  }
  return value;
}

/** "alice@example.com" -> "a***@example.com" so logs don't collect full addresses. */
export function maskEmail(email: string): string {
  const at = email.lastIndexOf("@");
  if (at < 1) return "***";
  return `${email[0]}***${email.slice(at)}`;
}

export function createLogger(
  sink: (line: string) => void = (line) => process.stdout.write(line + "\n"),
): Logger {
  const write = (level: Level, msg: string, fields?: Fields) => {
    const entry = {
      time: new Date().toISOString(),
      level,
      msg: scrubString(msg),
      ...(fields ? (redact(fields) as Fields) : {}),
    };
    sink(JSON.stringify(entry));
  };
  return {
    info: (msg, fields) => write("info", msg, fields),
    warn: (msg, fields) => write("warn", msg, fields),
    error: (msg, fields) => write("error", msg, fields),
  };
}
