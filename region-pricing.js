<script>
(function(){
  const CFG = window.UDL_CONFIG;

  // ===== Helpers =====
  const storage = window.localStorage;
  const $  = (s,root=document)=>root.querySelector(s);
  const $$ = (s,root=document)=>Array.from(root.querySelectorAll(s));

  // Default Spanish for first-time visitors; remember choice
  function getLang() {
    const saved = storage.getItem("udl_lang");
    return (saved ? saved.slice(0,2) : "es");
  }
  function setLang(lang) {
    storage.setItem("udl_lang", lang);
    document.documentElement.setAttribute("lang", lang);
    render();
  }
  function formatMoney(amount, currency="USD", locale="en-US") {
    try { return new Intl.NumberFormat(locale, { style:"currency", currency }).format(amount); }
    catch { return `${currency} ${amount}`; }
  }
  function setText(sel, dict, lang){
    const el = $(sel); if (!el || !dict) return;
    el.textContent = dict[lang] || dict.en || el.textContent;
  }
  // Expose UI
  window.UDL_UI = { setLang };

  function getDeep(dict, keyPath, lang) {
    // keyPath like "copy.individualNote"
    const parts = (keyPath || "").split(".");
    let ref = dict;
    for (const p of parts) { if (!ref) break; ref = ref[p]; }
    if (!ref) return null;
    return (typeof ref === "object") ? (ref[lang] || ref.en || "") : ref;
  }

  function renderPopulations(lang){
    const root = $("#plans-root");
    if (!root) return;
    root.innerHTML = "";

    const locale = (lang === "es") ? "es-ES" : "en-US";

    // Collect active populations
    const pops = CFG.populations || {};
    Object.keys(pops).forEach(key => {
      const pop = pops[key];
      if (!pop?.active) return;

      // Population block
      const block = document.createElement("div");
      block.className = "population-block";

      // Title (e.g., Comunidad Latina) — only shown if >1 population is active
      const activeCount = Object.values(pops).filter(p => p.active).length;
      if (activeCount > 1) {
        const title = document.createElement("h3");
        title.className = "population-title";
        title.textContent = pop.displayName?.[lang] || pop.displayName?.en || "";
        block.appendChild(title);
      }

      const plansWrap = document.createElement("div");
      plansWrap.className = "plans";

      const plans = pop.plans || {};
      Object.keys(plans).forEach(planId => {
        const plan = plans[planId];

        const card = document.createElement("article");
        card.className = "plan-card";
        card.setAttribute("data-plan", planId);

        const h3 = document.createElement("h3");
        h3.setAttribute("data-plan-name", "");
        h3.textContent = plan.name?.[lang] || plan.name?.en || "";
        card.appendChild(h3);

        const priceDiv = document.createElement("div");
        priceDiv.className = "price";
        const priceSpan = document.createElement("span");
        priceSpan.setAttribute("data-plan-price", "");
        priceSpan.textContent = formatMoney(plan.price, "USD", locale);
        priceDiv.appendChild(priceSpan);
        card.appendChild(priceDiv);

        const term = document.createElement("small");
        term.className = "term";
        term.setAttribute("data-plan-term", "");
        term.textContent = plan.term?.[lang] || plan.term?.en || "";
        card.appendChild(term);

        const pay = document.createElement("a");
        pay.className = "btn-primary";
        pay.setAttribute("data-plan-select", "");
        pay.href = plan.checkoutLinks?.US || "#";
        pay.textContent = CFG.labels?.pay?.[lang] || CFG.labels?.pay?.en || "Pay";
        card.appendChild(pay);

        const btc = document.createElement("a");
        btc.className = "btn-crypto";
        btc.setAttribute("data-plan-crypto", "");
        const cLink = plan.cryptoLinks?.US || "";
        if (cLink) {
          btc.href = cLink;
          btc.textContent = CFG.labels?.payBTC?.[lang] || CFG.labels?.payBTC?.en || "Pay with Bitcoin";
          card.appendChild(btc);
        }

        const note = document.createElement("p");
        note.className = "muted";
        if (plan.noteKey) {
          note.textContent = getDeep(CFG.labels, plan.noteKey, lang) || "";
        }
        card.appendChild(note);

        plansWrap.appendChild(card);
      });

      block.appendChild(plansWrap);
      root.appendChild(block);
    });
  }

  function render() {
    const lang = getLang();
    document.documentElement.setAttribute("lang", lang);

    // HERO
    setText("#hero-headline",   CFG.hero?.headline,      lang);
    setText("#hero-paragraph",  CFG.hero?.paragraph,     lang);
    setText("#hero-cta-primary",CFG.hero?.ctaPrimary,    lang);
    setText("#hero-cta-secondary", CFG.hero?.ctaSecondary, lang);

    // Section headings / copy
    setText("#how-title",     CFG.labels?.howTitle,       lang);
    setText("#plans-title",   CFG.labels?.plans,          lang);
    setText("#plans-subtitle",CFG.labels?.plansSub,       lang);
    setText("#guarantee-title", CFG.labels?.guaranteeTitle, lang);
    setText("#guarantee-copy",  CFG.labels?.guaranteeCopy,  lang);

    // HOW steps list (use labels.howSteps if present; fallback to static HTML)
    const stepsList = $("#how-steps");
    if (stepsList && CFG.labels?.howSteps) {
      const steps = CFG.labels.howSteps?.[lang] || CFG.labels.howSteps?.en;
      if (steps && Array.isArray(steps)) {
        stepsList.innerHTML = "";
        steps.forEach(t => {
          const li = document.createElement("li");
          li.textContent = t;
          stepsList.appendChild(li);
        });
      }
    }

    // POPULATIONS + PLANS
    renderPopulations(lang);
  }

  document.addEventListener("DOMContentLoaded", render);
})();
</script>
