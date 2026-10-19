const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escape every user-controlled value before putting it in HTML. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => ESCAPES[ch]!);
}

const STYLES = `
:root{
  color-scheme:light;
  --bg:#f2f4f7;--surface:#fff;--hover:#f6f7f9;
  --ink:#1a2230;--muted:#5d6878;--placeholder:#98a2b3;
  --line:#e1e5eb;--line-strong:#c5ccd6;
  --primary:#2457c5;--primary-hover:#1c47a6;--primary-ink:#fff;--primary-soft:#edf2fc;
  --danger:#b42318;--danger-ink:#912018;--danger-soft:#fef3f2;--danger-line:#f5c6c0;
  --notice-ink:#1f4c9e;--notice-soft:#eff4fc;--notice-line:#cbdaf3;
  --success:#1d7445;--success-soft:#ebf6ef;
  --ring:0 0 0 3px rgba(36,87,197,.28);
  --shadow:0 1px 2px rgba(16,24,40,.04),0 12px 32px -16px rgba(16,24,40,.16);
}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--surface);color:var(--ink);
  font:400 16px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  -webkit-font-smoothing:antialiased}

/* Split layout: illustrated panel on the left, the page on the right */
.split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);min-height:100vh;min-height:100dvh}
.panel{position:relative;overflow:hidden;display:flex;flex-direction:column;gap:32px;padding:56px clamp(32px,5vw,64px);color:#fff;
  background:radial-gradient(42rem 30rem at 15% 0%,rgba(125,160,255,.45),transparent 60%),
    radial-gradient(36rem 28rem at 100% 100%,rgba(139,92,246,.55),transparent 60%),
    linear-gradient(155deg,#1d3fa3 0%,#2457c5 45%,#4338ca 100%)}
.panel h2{font-size:clamp(1.6rem,2.4vw,1.9rem);line-height:1.15;font-weight:700;letter-spacing:-.02em;margin:0 0 8px}
.panel-copy p{margin:0;color:#dbe4ff;font-size:.9375rem}
.flow{flex:1;display:flex;flex-direction:column;justify-content:center;gap:clamp(14px,2.4vh,28px);min-height:0}
.flow-card{position:relative;width:100%;max-width:330px;padding:16px 18px;background:#fff;color:var(--ink);border-radius:18px;
  box-shadow:0 30px 60px -20px rgba(10,20,60,.55),0 2px 6px rgba(10,20,60,.15)}
.flow-card:nth-child(1){transform:rotate(-3deg)}
.flow-card:nth-child(2){margin-left:clamp(40px,22%,160px);transform:rotate(2deg)}
.flow-card:nth-child(3){margin-left:clamp(12px,6%,48px);max-width:300px;transform:rotate(-1.5deg)}
.flow-step{position:absolute;right:-10px;top:-10px;display:grid;place-items:center;width:26px;height:26px;border-radius:50%;
  background:var(--ink);color:#fff;font-size:.8125rem;font-weight:700}
.flow-head{display:flex;align-items:center;gap:12px}
.flow-head b{display:block;font-size:.875rem;line-height:1.3}
.flow-head small{display:block;color:var(--muted);font-size:.75rem}
.flow-icon{display:grid;place-items:center;flex:none;width:34px;height:34px;border-radius:9px;background:linear-gradient(135deg,#3b6fe0,#4338ca)}
.flow-icon svg{width:18px;height:18px;stroke:#fff;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.flow-icon.ok{border-radius:50%;background:var(--success-soft)}
.flow-icon.ok svg{stroke:var(--success);stroke-width:2.6}
.flow-code{margin-top:12px;font:800 1.75rem/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.35em}
.flow-btn{display:inline-grid;place-items:center;margin-top:12px;height:32px;padding:0 22px;border-radius:8px;background:var(--primary);color:#fff;font-size:.8125rem;font-weight:600}
.panel-badges{display:flex;flex-wrap:wrap;gap:10px}
.panel-badges span{padding:6px 12px;font-size:.8125rem;color:#e6ecff;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);border-radius:999px}
.pane{display:flex;align-items:center;justify-content:center;padding:48px 32px}
.pane-inner{width:100%;max-width:400px;min-width:0}
@media (max-width:860px){
  .split{grid-template-columns:1fr;min-height:0}
  .panel{padding:28px 20px;gap:0}
  .panel h2{font-size:1.5rem;margin:0}
  .panel-copy p,.flow,.panel-badges{display:none}
  .pane{align-items:flex-start;padding:32px 20px 48px}
}

.badge{display:grid;place-items:center;width:44px;height:44px;border-radius:12px;margin-bottom:20px;
  background:var(--primary-soft);color:var(--primary)}
.badge svg{width:22px;height:22px}
.badge.danger{background:var(--danger-soft);color:var(--danger)}
.badge.success{background:var(--success-soft);color:var(--success)}

h1{font-size:1.85rem;line-height:1.2;font-weight:700;letter-spacing:-.02em;margin:0 0 8px}
p{margin:0 0 16px}
.lead{color:var(--muted);margin-bottom:24px}
.lead strong{color:var(--ink);font-weight:600;overflow-wrap:anywhere}
.small{font-size:.875rem;color:var(--muted)}
.center{text-align:center}
a{color:var(--primary);text-underline-offset:2px}
a:hover{color:var(--primary-hover)}
a:focus-visible{outline:none;box-shadow:var(--ring);border-radius:4px}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}

label,legend{display:block;font-size:.875rem;font-weight:600;margin-bottom:6px;padding:0}
.field{margin-bottom:20px}
input[type=email],input[type=text]{width:100%;height:50px;padding:0 14px;font:inherit;color:var(--ink);
  background:var(--surface);border:1.5px solid var(--line-strong);border-radius:10px;
  transition:border-color .15s,box-shadow .15s}
input::placeholder{color:var(--placeholder)}
input:focus{outline:none;border-color:var(--primary);box-shadow:var(--ring)}
fieldset{border:0;padding:0;margin:0 0 24px;min-width:0}

.choices{display:grid;gap:10px}
.choice{position:relative;display:block;margin:0;padding:14px 16px 14px 50px;border:1.5px solid var(--line);
  border-radius:12px;cursor:pointer;font-weight:400;transition:border-color .15s,background-color .15s}
.choice:hover{border-color:var(--primary)}
.choice input{position:absolute;opacity:0;pointer-events:none}
.choice-title{display:block;font-weight:600;font-size:.9375rem}
.choice-desc{display:block;font-size:.8125rem;color:var(--muted);margin-top:2px}
.choice .dot{position:absolute;top:50%;left:17px;margin-top:-9px;width:18px;height:18px;border-radius:50%;
  border:1.5px solid var(--line-strong);background:var(--surface);transition:all .15s}
.choice:has(input:checked){border-color:var(--primary);background:var(--primary-soft)}
.choice:has(input:checked) .dot{border-color:var(--primary);background:var(--primary);box-shadow:inset 0 0 0 4px var(--surface)}
.choice:has(input:focus-visible){box-shadow:inset 0 0 0 1px var(--primary),var(--ring)}

.btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:50px;padding:10px 16px;
  font:inherit;font-size:.9375rem;font-weight:600;line-height:1.3;text-align:center;text-decoration:none;
  border:1px solid transparent;border-radius:10px;cursor:pointer;
  transition:background-color .15s,border-color .15s,color .15s,opacity .15s}
.btn:focus-visible{outline:none;box-shadow:var(--ring)}
.btn-primary{background:var(--primary);color:var(--primary-ink)}
.btn-primary:hover{background:var(--primary-hover);color:var(--primary-ink)}
.btn-secondary{background:var(--surface);color:var(--ink);border-color:var(--line-strong)}
.btn-secondary:hover{background:var(--hover);color:var(--ink)}
.btn-quiet{background:none;color:var(--primary);min-height:40px;font-weight:500}
.btn-quiet:hover{text-decoration:underline;color:var(--primary-hover)}
.btn:disabled{cursor:not-allowed;opacity:.55}
.btn-quiet:disabled{color:var(--muted);opacity:1;text-decoration:none}
.btn .timer{font-variant-numeric:tabular-nums;font-weight:500;opacity:.85}
.btn .timer:empty{display:none}
.btn.is-loading{pointer-events:none;opacity:.85}
.btn.is-loading::before{content:"";width:16px;height:16px;flex:none;border-radius:50%;
  border:2px solid currentColor;border-right-color:transparent;animation:spin .7s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.actions>*+*{margin-top:10px}

.alert{padding:12px 14px;border:1px solid;border-radius:8px;font-size:.9375rem;line-height:1.45;margin:0 0 20px}
.alert.error{background:var(--danger-soft);border-color:var(--danger-line);color:var(--danger-ink)}
.alert.notice{background:var(--notice-soft);border-color:var(--notice-line);color:var(--notice-ink)}

input.code{height:56px;text-align:center;font-size:1.5rem;font-weight:600;letter-spacing:.35em;
  font-variant-numeric:tabular-nums;padding-left:.35em}
input.code.has-error{border-color:var(--danger)}
.otp{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px}
.otp input{height:56px;padding:0;text-align:center;font-size:1.375rem;font-weight:600;
  font-variant-numeric:tabular-nums;caret-color:var(--primary)}
.otp.has-error input{border-color:var(--danger)}
.otp.shake{animation:shake .32s ease-in-out}
@keyframes shake{20%,60%{transform:translateX(-5px)}40%,80%{transform:translateX(5px)}}
.hint{font-size:.8125rem;color:var(--muted);margin:8px 0 20px}

.rule{border:0;border-top:1px solid var(--line);margin:28px 0 20px}
.links{margin:20px 0 0;text-align:center;font-size:.875rem;color:var(--muted)}

@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
`;

const ICONS = {
  lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>',
  alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5"/><path d="M12 16.5v.01"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="m8.2 12.4 2.6 2.6 5-5.4"/>',
} as const;

export type Icon = keyof typeof ICONS;

export function icon(name: Icon, tone: "" | "danger" | "success" = ""): string {
  return `<div class="badge${tone ? ` ${tone}` : ""}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg></div>`;
}

export function layout(title: string, body: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="referrer" content="no-referrer">
<meta name="color-scheme" content="light">
<title>${escapeHtml(title)}</title>
<style>${STYLES}</style>
</head>
<body>
<div class="split">
<aside class="panel">
  <div class="panel-copy">
    <h2>Sign in without a password.</h2>
    <p>A code or a magic link, straight to your inbox.</p>
  </div>
  <div class="flow" aria-hidden="true">
    <div class="flow-card"><span class="flow-step">1</span>
      <div class="flow-head"><span class="flow-icon"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/></svg></span><div><b>482913 is your login code</b><small>Login to you@example.com</small></div></div>
      <div class="flow-code">482913</div>
    </div>
    <div class="flow-card"><span class="flow-step">2</span>
      <div class="flow-head"><span class="flow-icon"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/></svg></span><div><b>Your magic link</b><small>Login to you@example.com</small></div></div>
      <span class="flow-btn">Sign in</span>
    </div>
    <div class="flow-card"><span class="flow-step">3</span>
      <div class="flow-head"><span class="flow-icon ok"><svg viewBox="0 0 24 24"><path d="m6 12.5 4 4 8-9"/></svg></span><div><b>You're signed in</b><small>No password needed</small></div></div>
    </div>
  </div>
  <div class="panel-badges"><span>Expires in 10 minutes</span><span>Works once</span><span>No password to leak</span></div>
</aside>
<main class="pane"><div class="pane-inner">
${body}
</div></main>
</div>
<script src="/assets/app.js" defer></script>
</body>
</html>`;
}

/** `message` is plain text and is escaped here. */
export function alert(kind: "error" | "notice", message: string | undefined): string {
  if (!message) return "";
  const role = kind === "error" ? "alert" : "status";
  return `<p class="alert ${kind}" role="${role}">${escapeHtml(message)}</p>`;
}
