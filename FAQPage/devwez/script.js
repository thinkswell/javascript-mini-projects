const faqs = [
  {
    q: "How long does shipping take?",
    sub: "Delivery timelines & tracking",
    tag: "Shipping",
    a: `Domestic orders ship in 2–3 business days and arrive in 3–5 days. International is 7–14 days. You'll get a tracking link by email once it leaves the warehouse. If it's been 10 days with no update, ping support and we'll sort it.`
  },
  {
    q: "What’s your refund policy?",
    sub: "Returns, exchanges & refunds",
    tag: "Billing",
    a: `30-day money-back guarantee on unused items. Start a return from your <a href="#">order page</a> — we cover return shipping for defects, otherwise it's on you. Refunds hit your original payment method within 5–7 business days after we receive it.`
  },
  {
    q: "How do I reset my password?",
    sub: "Account access in 30 seconds",
    tag: "Account",
    a: `Go to login → “Forgot password” → enter your email. Check spam if you don't see it in 2 minutes. Link expires in 1 hour. Still stuck? Try an incognito window — extensions sometimes block the reset.`
  },
  {
    q: "Can I change my plan later?",
    sub: "Upgrade, downgrade, cancel anytime",
    tag: "Billing",
    a: `Yep. Upgrade is instant and prorated. Downgrade takes effect next cycle. Cancel anytime from Settings → Billing — no dark patterns, no “call us” hoop. Your data stays for 30 days in case you come back.`
  },
  {
    q: "Is my data secure?",
    sub: "Privacy, encryption & compliance",
    tag: "Security",
    a: `We use AES-256 at rest, TLS 1.3 in transit, and isolated VPCs. SOC 2 Type II audited this year. We never sell data. Export or delete everything from Settings → Privacy — it's your data.`
  },
  {
    q: "Do you offer student discounts?",
    sub: "Pricing for learners",
    tag: "Pricing",
    a: `Students and educators get 40% off with a .edu email or valid ID. Apply at checkout — discount auto-renews each year while you're eligible. Need an invoice for reimbursement? We generate one instantly.`
  },
];

const list = document.getElementById('faqList');
const search = document.getElementById('search');
const count = document.getElementById('count');
const expandBtn = document.getElementById('expandAll');

let expandedAll = false;

function render(filter = "") {
  const q = filter.toLowerCase().trim();
  const filtered = faqs.filter(f =>
    !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q) || f.tag.toLowerCase().includes(q) || f.sub.toLowerCase().includes(q)
  );

  count.textContent = `${filtered.length} question${filtered.length !== 1 ? 's' : ''}${q ? ` for “${filter}”` : ''}`;

  if (filtered.length === 0) {
    list.innerHTML = `<div class="no-result">No results for “${filter}”. Try “shipping” or “refund”.</div>`;
    return;
  }

  list.innerHTML = filtered.map((f, i) => {
    const idx = faqs.indexOf(f);
    return `
    <div class="item" data-idx="${idx}">
      <button class="q" aria-expanded="false">
        <div class="q-left">
          <h3>${f.q}</h3>
          <p>${f.sub}</p>
        </div>
        <span class="icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
        </span>
      </button>
      <div class="a">
        <div class="a-inner"><div><span class="tag">${f.tag}</span><br>${f.a}</div></div>
      </div>
    </div>`;
  }).join("");

  // wire up toggles - a bit verbose but keeps it readable
  list.querySelectorAll('.item').forEach(el => {
    const btn = el.querySelector('.q');
    btn.addEventListener('click', () => {
      const isOpen = el.classList.contains('open');
      // close others if you want single-open? we allow multiple
      el.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen);
    });
  });

  // if expandAll was on, reopen
  if (expandedAll) {
    list.querySelectorAll('.item').forEach(el => {
      el.classList.add('open');
      el.querySelector('.q').setAttribute('aria-expanded', 'true');
    });
  }
}

render();

// search with debounce - tiny helper
let t;
search.addEventListener('input', e => {
  clearTimeout(t);
  t = setTimeout(() => render(e.target.value), 120);
});

// keyboard shortcut: press "/" to focus
document.addEventListener('keydown', e => {
  if (e.key === '/' && document.activeElement !== search) {
    e.preventDefault();
    search.focus();
  }
  if (e.key === 'Escape') {
    search.value = '';
    render('');
    search.blur();
  }
});

expandBtn.addEventListener('click', () => {
  expandedAll = !expandedAll;
  list.querySelectorAll('.item').forEach(el => {
    el.classList.toggle('open', expandedAll);
    el.querySelector('.q').setAttribute('aria-expanded', expandedAll);
  });
  expandBtn.textContent = expandedAll ? 'Collapse all' : 'Expand all';
});

// open first by default - feels friendlier
setTimeout(() => {
  const first = list.querySelector('.item');
  if (first) {
    first.classList.add('open');
    first.querySelector('.q').setAttribute('aria-expanded', 'true');
  }
}, 80);
