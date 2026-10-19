import dotenv from "dotenv";
import { createApp } from "./app.js";
import { systemClock } from "./clock.js";
import { ConfigError, loadConfig, type Config } from "./config.js";
import { openDatabase, pruneExpired } from "./db.js";
import { createMailtrapMailer } from "./email/mailtrap.js";
import { createLogger } from "./logger.js";

dotenv.config({ quiet: true });

let config: Config;
try {
  config = loadConfig(process.env);
} catch (err) {
  if (err instanceof ConfigError) {
    console.error(err.message);
    process.exit(1);
  }
  throw err;
}

const logger = createLogger();
const db = openDatabase(config.databasePath);
const mailer = createMailtrapMailer({
  token: config.mailtrapToken,
  fromEmail: config.mailFromEmail,
  fromName: config.mailFromName,
});

const app = createApp({ config, db, mailer, clock: systemClock, logger });

pruneExpired(db, systemClock.now());
setInterval(() => pruneExpired(db, systemClock.now()), 60 * 60 * 1000).unref();

const server = app.listen(config.port, () => {
  logger.info("server started", { appUrl: config.appUrl, port: config.port, autoSignup: config.autoSignup });
});

const shutdown = () => {
  server.close(() => {
    db.close();
    process.exit(0);
  });
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
