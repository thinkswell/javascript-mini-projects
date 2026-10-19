import { Router } from "express";
import {
  clearSessionCookie,
  readSessionId,
  requireSession,
  type SessionStore,
} from "../auth/sessions.js";
import type { User } from "../auth/users.js";
import { dashboardPage } from "../views/dashboard.js";

export function dashboardRouter(deps: { sessions: SessionStore; secureCookies: boolean }): Router {
  const router = Router();

  router.get("/dashboard", requireSession(deps.sessions), (_req, res) => {
    const user = res.locals.user as User;
    res.type("html").send(dashboardPage(user.email));
  });

  router.post("/logout", (req, res) => {
    const id = readSessionId(req.headers.cookie);
    if (id) deps.sessions.destroy(id);
    clearSessionCookie(res, { secure: deps.secureCookies });
    res.redirect(303, "/login");
  });

  return router;
}
