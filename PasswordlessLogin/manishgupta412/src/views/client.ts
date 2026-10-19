/**
 * Progressive enhancement, served at /assets/app.js (same origin, so the CSP can
 * stay `script-src 'self'`). Every page still works without it; the server
 * enforces all limits regardless of what this script does.
 */
export const CLIENT_JS = `(() => {
  "use strict";
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const setLabel = (button, text) => {
    const label = button.querySelector(".label");
    if (label) label.textContent = text;
  };

  // Sign-in method choice: the button says what will happen.
  for (const form of $$("form[data-method-form]")) {
    const button = form.querySelector("button[type=submit]");
    const update = () => {
      const picked = form.querySelector("input[name=method]:checked");
      const text = picked && { code: button.dataset.labelCode, link: button.dataset.labelLink }[picked.value];
      if (text) setLabel(button, text);
    };
    form.addEventListener("change", update);
    update();
  }

  // Six-box code entry. The original input becomes a hidden field the form submits.
  for (const input of $$("input[data-otp]")) {
    const form = input.form;
    const length = 6;
    const group = document.createElement("div");
    group.className = "otp";
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", "6-digit code");
    const boxes = [];
    for (let i = 0; i < length; i++) {
      const box = document.createElement("input");
      box.type = "text";
      box.inputMode = "numeric";
      box.autocomplete = i === 0 ? "one-time-code" : "off";
      box.setAttribute("aria-label", "Digit " + (i + 1) + " of " + length);
      boxes.push(box);
      group.appendChild(box);
    }
    const hadError = input.classList.contains("has-error");
    if (hadError) group.classList.add("has-error", "shake");
    const autofocus = input.hasAttribute("autofocus");
    input.removeAttribute("id");
    input.removeAttribute("required");
    input.removeAttribute("pattern");
    input.removeAttribute("autofocus");
    input.type = "hidden";
    boxes[0].id = "code";
    input.insertAdjacentElement("afterend", group);

    const sync = () => {
      input.value = boxes.map((b) => b.value).join("");
      group.classList.remove("has-error", "shake");
      if (/^\\d{6}$/.test(input.value)) form.requestSubmit();
    };
    const fill = (start, digits) => {
      let i = start;
      for (const d of digits) {
        if (i >= length) break;
        boxes[i++].value = d;
      }
      boxes[Math.min(i, length - 1)].focus();
      sync();
    };
    boxes.forEach((box, i) => {
      box.addEventListener("input", () => {
        const digits = box.value.replace(/\\D/g, "");
        if (digits.length > 1) {
          box.value = "";
          fill(i, digits);
          return;
        }
        box.value = digits;
        if (digits && i < length - 1) boxes[i + 1].focus();
        sync();
      });
      box.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !box.value && i > 0) {
          e.preventDefault();
          boxes[i - 1].value = "";
          boxes[i - 1].focus();
          sync();
        } else if (e.key === "ArrowLeft" && i > 0) {
          e.preventDefault();
          boxes[i - 1].focus();
        } else if (e.key === "ArrowRight" && i < length - 1) {
          e.preventDefault();
          boxes[i + 1].focus();
        }
      });
      box.addEventListener("paste", (e) => {
        const digits = (e.clipboardData ? e.clipboardData.getData("text") : "").replace(/\\D/g, "");
        if (!digits) return;
        e.preventDefault();
        boxes.forEach((b) => (b.value = ""));
        fill(0, digits);
      });
      box.addEventListener("focus", () => box.select());
    });
    form.addEventListener("submit", (e) => {
      if (/^\\d{6}$/.test(input.value)) return;
      e.preventDefault();
      group.classList.remove("shake");
      void group.offsetWidth;
      group.classList.add("has-error", "shake");
      (boxes.find((b) => !b.value) || boxes[0]).focus();
    });
    if (autofocus || hadError) boxes[0].focus();
  }

  // Loading state, and no double submits.
  document.addEventListener("submit", (e) => {
    const form = e.target;
    if (e.defaultPrevented) return;
    if (form.dataset.busy) {
      e.preventDefault();
      return;
    }
    form.dataset.busy = "1";
    const button = e.submitter || form.querySelector("button[type=submit]");
    if (button && button.dataset.loadingLabel) {
      button.classList.add("is-loading");
      button.setAttribute("aria-busy", "true");
      setLabel(button, button.dataset.loadingLabel);
    }
  });
  window.addEventListener("pageshow", (e) => {
    if (!e.persisted) return;
    for (const form of $$("form[data-busy]")) delete form.dataset.busy;
    for (const b of $$(".is-loading")) b.classList.remove("is-loading");
  });

  // Resend cooldown: disabled with a live timer until the server will accept it.
  const fmt = (s) => Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  for (const button of $$("button[data-wait]")) {
    const wait = Number(button.dataset.wait);
    if (!(wait > 0)) continue;
    const label = button.querySelector(".label");
    const timer = button.querySelector(".timer");
    const deadline = Date.now() + wait * 1000;
    button.disabled = true;
    let id = 0;
    const tick = () => {
      const left = Math.ceil((deadline - Date.now()) / 1000);
      if (left <= 0) {
        button.disabled = false;
        timer.textContent = "";
        button.removeAttribute("aria-label");
        clearInterval(id);
        return;
      }
      timer.textContent = fmt(left);
      button.setAttribute("aria-label", label.textContent + ", available in " + left + " seconds");
    };
    id = setInterval(tick, 250);
    tick();
  }
})();
`;
