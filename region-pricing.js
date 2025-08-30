<script>
(function(){
  const CFG = window.UDL_CONFIG;

  // ===== Helpers =====
  const storage = window.localStorage;
  const $  = (s,root=document)=>root.querySelector(s);
  const $$ = (s,root=document)=>Array.from(root.querySelectorAll(s));

  function getLang() {
    return (storage.getItem("udl_lang") || document.documentElement.lang || "en").slice(0,2);
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
  // Expose UI controls
  window.UDL_UI = { setLang };

  function setText(sel, dict, lang){
    const el = $(sel); if (!el || !dict) return;
    el.textContent = dict[lang] || dict.en || el.textContent;
  }

  function render() {
    const lang = getLang();
    const locale = (lang === "es") ? "es-ES" : "en-US";

    // HERO
    setText("#hero-headline", CFG.hero?.headline, lang);
    setText("#hero-paragraph", CFG.hero?.paragraph, lang);
    setText("#hero-cta-primary", CFG.hero?.ctaPrimary, lang);
    setText("#hero-cta-secondary", CFG.hero?.ctaSecondary, lang);

    // Section headings / copy
    setText("#how-title", CFG.labels?.howTitle, lang);
    setText("#plans-title", CFG.labels?.plans, lang);
    setText("#plans-subtitle", CFG.labels?.plansSub, lang);
    setText("#guarantee-title", CFG.labels?.guaranteeTitle, lang);
    setText("#guarantee-copy", CFG.labels?.guaranteeCopy, lang);

    // HOW steps (ordered list)
    const stepsList = $("#how-steps");
    if (stepsList) {
      const steps = CFG.labels?.howSteps?.[lang] || CFG.labels?.howSteps?.en;
      if (steps && Array.isArray(steps)) {
        stepsList.innerHTML = "";
        steps.forEach(t => {
          const li = document.createElement("li");
          li.textContent = t;
          stepsList.appendChild(li);
        });
      }
    }

    // Plan cards
    $$("[data-plan]").forEach(card => {
      const planId = card.getAttribute("data-plan");
      const plan = CFG.display[planId];
      if (!plan) return;

      const nameEl  = card.querySelector("[data-plan-name]");
      const priceEl = card.querySelector("[data-plan-price]");
      const termEl  = card.querySelector("[data-plan-term]");
      const payBtn  = card.querySelector("[data-plan-select]");
      const btcBtn  = card.querySelector("[data-plan-crypto]");

      if (nameEl) nameEl.textContent = plan.name?.[lang] || plan.name?.[ "en" ] || nameEl.textContent;
      if (priceEl) priceEl.textContent = formatMoney(plan.price, "USD", locale);
      if (termEl)  termEl.textContent  = plan.term?.[lang] || plan.term?.[ "en" ] || termEl.textContent;

      // Primary payment (Square or preferred processor)
      const link = (CFG.checkoutLinks?.[planId]?.US) || "#";
      if (payBtn) {
        payBtn.setAttribute("href", link);
        payBtn.textContent = CFG.labels?.pay?.[lang] || CFG.labels?.pay?.en || "Pay";
      }

      // Optional crypto
      const cLink = (CFG.cryptoLinks?.[planId]?.US) || "";
      if (btcBtn) {
        if (cLink) {
          btcBtn.style.display = "inline-block";
          btcBtn.setAttribute("href", cLink);
          btcBtn.textContent = CFG.labels?.payBTC?.[lang] || CFG.labels?.payBTC?.en || "Pay with Bitcoin";
        } else {
          btcBtn.style.display = "none";
        }
      }

      // Notes under each card (copy.*)
      const noteSel = card.querySelector("[data-i18n='copy.individualNote'], [data-i18n='copy.familyNote'], [data-i18n='copy.extendNote']");
      if (noteSel) {
        const key = noteSel.getAttribute("data-i18n"); // e.g., copy.individualNote
        const parts = key.split(".");
        let ref = CFG.labels;
        for (const p of parts) ref = ref?.[p];
        if (typeof ref === "object") {
          noteSel.textContent = ref[lang] || ref.en || noteSel.textContent;
        }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", render);
})();
</script>
