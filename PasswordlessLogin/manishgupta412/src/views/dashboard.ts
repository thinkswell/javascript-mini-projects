import { escapeHtml, icon, layout } from "./layout.js";

export function dashboardPage(email: string): string {
  return layout(
    "You're signed in",
    `${icon("check", "success")}
<h1>You're signed in</h1>
<p class="lead">Signed in as <strong>${escapeHtml(email)}</strong>.</p>
<form method="post" action="/logout">
  <button type="submit" class="btn btn-secondary" data-loading-label="Signing out…"><span class="label">Sign out</span></button>
</form>`,
  );
}
