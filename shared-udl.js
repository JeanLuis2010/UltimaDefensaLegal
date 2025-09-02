/*!
 * UltimaDefensaLegal — Site-wide EN/ES toggle (no piecemeal)
 * File: /shared-udl.js
 * Safe, self-contained, and compatible with: index.html, for-clients.html,
 * for-attorneys.html, contact.html
 */
(() => {
  "use strict";

  /* ========================= DICTIONARY ========================= */
  const T = {
    en: {
      /* nav + common */
      "title": "Ultima Defensa Legal — Real help, fast",
      "nav.home": "Home",
      "nav.clients": "For Clients",
      "nav.attorneys": "For Attorneys",
      "nav.contact": "Contact",
      "per.month": "/ month",
      "per.quarter": "/ quarter",
      "per.month3": "/ month (first 3 months)",
      "per.monthAfter": "/ month thereafter",
      "btn.pay": "Pay",
      "btn.pay3": "Pay (3 months)",

      /* home */
      "hero.title": "Real help, fast: We connect you with an attorney who understands your case.",
      "hero.sub": "Bilingual intake (EN/ES). We are not a law firm. Membership gives you access to quick, caring connection with independent attorneys.",
      "cta.clients": "I need legal help",
      "cta.attorneys": "I’m an attorney",
      "clients.title": "For Individuals",
      "clients.copy": "Simple, affordable membership. Tell us your situation (EN/ES). We match you to a licensed attorney who offers a free or reduced consultation.",
      "clients.btn": "See how it works",
      "attorneys.title": "For Attorneys",
      "attorneys.copy": "Join our bilingual intake network. We deliver qualified leads and provide dashboard updates.",
      "attorneys.btn": "Plans & details",

      /* disclaimers */
      "disclaimer.title": "Important",
      "disclaimer.copy": "Ultima Defensa Legal is not a law firm and does not provide legal advice. We connect members with independent, licensed attorneys. Membership fees are for access to our intake and connection services only. Any attorney–client relationship is solely between you and the attorney.",

      /* for clients */
      "clients.titlePage": "For Clients — Ultima Defensa Legal",
      "clients.hero": "Get connected to a licensed attorney — fast and respectfully.",
      "clients.sub": "We listen in English or Spanish, gather your details, and connect you with an attorney who offers a free or reduced consultation. Cancel anytime.",
      "plan.monthly": "Monthly Membership",
      "plan.monthlyCopy": "Best if you need help right now.",
      "plan.quarterly": "Quarterly Membership",
      "plan.quarterlyCopy": "Save money while you get settled.",
      "how.title": "How it works",
      "how.step1": "Join as a member and complete a short bilingual intake (EN/ES).",
      "how.step2": "We match you with an independent, licensed attorney for your issue and location.",
      "how.step3": "You receive a free or reduced consultation. If you hire the attorney, you pay them directly.",

      /* for attorneys */
      "attorneys.titlePage": "For Attorneys — Ultima Defensa Legal",
      "attorneys.hero": "Grow your practice with caring, bilingual intake and qualified leads.",
      "attorneys.sub": "We screen in English and Spanish, route by practice area and geography, and deliver details to your dashboard or preferred channel.",
      "plan.intro": "Intro Rate (first 3 months)",
      "plan.ongoing": "Ongoing Rate",
      "attorneys.feature1": "Bilingual intake (EN/ES)",
      "attorneys.feature2": "Qualified lead delivery",
      "attorneys.feature3": "Attorney dashboard & updates",
      "attorneys.feature4": "Priority lead routing",
      "attorneys.feature5": "Featured listing placement",

      /* contact */
      "contact.titlePage": "Contact — Ultima Defensa Legal",
      "contact.hero": "Get in Touch",
      "contact.sub": "Have questions? Reach out and we’ll connect you with the right information.",
      "form.name": "Your Name",
      "form.email": "Your Email",
      "form.message": "Message",
      "form.submit": "Send"
    },
    es: {
      "title": "Ultima Defensa Legal — Ayuda real, rápida",
      "nav.home": "Inicio",
      "nav.clients": "Para Clientes",
      "nav.attorneys": "Para Abogados",
      "nav.contact": "Contacto",
      "per.month": "/ mes",
      "per.quarter": "/ trimestre",
      "per.month3": "/ mes (primeros 3 meses)",
      "per.monthAfter": "/ mes después",
      "btn.pay": "Pagar",
      "btn.pay3": "Pagar (3 meses)",

      "hero.title": "Ayuda real y rápida: Le conectamos con un abogado que entiende su caso.",
      "hero.sub": "Admisión bilingüe (EN/ES). No somos un bufete de abogados. La membresía le da acceso a una conexión rápida y humana con abogados independientes.",
      "cta.clients": "Necesito ayuda legal",
      "cta.attorneys": "Soy abogado",
      "clients.title": "Para Individuos",
      "clients.copy": "Membresía simple y accesible. Cuéntenos su situación (EN/ES). Le vinculamos con un abogado con licencia que ofrece consulta gratis o a precio reducido.",
      "clients.btn": "Cómo funciona",
      "attorneys.title": "Para Abogados",
      "attorneys.copy": "Únase a nuestra red bilingüe. Entregamos prospectos calificados y ofrecemos actualizaciones en su panel.",
      "attorneys.btn": "Planes y detalles",

      "disclaimer.title": "Importante",
      "disclaimer.copy": "Ultima Defensa Legal no es un bufete y no brinda asesoría legal. Conectamos a los miembros con abogados independientes con licencia. Las cuotas de membresía son por el acceso a nuestros servicios de admisión y conexión. Cualquier relación abogado–cliente es solo entre usted y el abogado.",

      "clients.titlePage": "Para Clientes — Ultima Defensa Legal",
      "clients.hero": "Conéctese con un abogado con licencia — rápido y con respeto.",
      "clients.sub": "Le escuchamos en inglés o español, tomamos sus datos y le conectamos con un abogado que ofrece consulta gratis o a precio reducido. Puede cancelar en cualquier momento.",
      "plan.monthly": "Membresía Mensual",
      "plan.monthlyCopy": "Ideal si necesita ayuda ahora.",
      "plan.quarterly": "Membresía Trimestral",
      "plan.quarterlyCopy": "Ahorre mientras se establece.",
      "how.title": "Cómo funciona",
      "how.step1": "Únase como miembro y complete una breve admisión bilingüe (EN/ES).",
      "how.step2": "Le vinculamos con un abogado independiente con licencia según su tema y ubicación.",
      "how.step3": "Recibe una consulta gratuita o a precio reducido. Si contrata al abogado, le paga directamente.",

      "attorneys.titlePage": "Para Abogados — Ultima Defensa Legal",
      "attorneys.hero": "Haga crecer su práctica con admisión bilingüe y prospectos calificados.",
      "attorneys.sub": "Atendemos en inglés y español, enroutamos por especialidad y ubicación, y enviamos los detalles a su panel o canal preferido.",
      "plan.intro": "Tarifa Inicial (primeros 3 meses)",
      "plan.ongoing": "Tarifa Regular",
      "attorneys.feature1": "Admisión bilingüe (EN/ES)",
      "attorneys.feature2": "Entrega de prospectos calificados",
      "attorneys.feature3": "Panel del abogado y actualizaciones",
      "attorneys.feature4": "Enrutamiento prioritario",
      "attorneys.feature5": "Ubicación destacada en el listado",

      "contact.titlePage": "Contacto — Ultima Defensa Legal",
      "contact.hero": "Contáctenos",
      "contact.sub": "¿Tiene preguntas? Escríbanos y le conectaremos con la información correcta.",
      "form.name": "Nombre",
      "form.email": "Correo electrónico",
      "form.message": "Mensaje",
      "form.submit": "Enviar"
    }
  };

  /* ========================= HELPERS ========================= */
  const UDL = {
    qs: (s, r = document) => r.querySelector(s),
    qsa: (s, r = document) => Array.from(r.querySelectorAll(s)),
    norm: s => (s || "").replace(/\s+/g, " ").trim(),
    getLang: () => {
      try { return localStorage.getItem("udl_lang") || "en"; } catch { return "en"; }
    },
    setLang: (lang) => {
      try { localStorage.setItem("udl_lang", lang); } catch {}
      document.documentElement.setAttribute("lang", lang);
    }
  };

  /* Build index of English strings so we can auto-label elements that
     don’t yet have data-i18n (so you didn’t have to tag everything). */
  const EN_INDEX = (() => {
    const m = new Map();
    Object.entries(T.en).forEach(([k, v]) => m.set(UDL.norm(v), k));
    return m;
  })();

  /* ========================= AUTOLABEL ========================= */
  function leafElements(root = document) {
    const tags = "h1,h2,h3,h4,p,li,button,a,span,small,strong,em,label,th,td";
    return UDL.qsa(tags, root).filter(el => !UDL.qsa("*", el).length);
  }

  function autolabel() {
    leafElements().forEach(el => {
      if (el.hasAttribute("data-i18n")) return;
      const k = EN_INDEX.get(UDL.norm(el.textContent));
      if (k) el.setAttribute("data-i18n", k);
    });

    // Common inline fragments
    UDL.qsa("body *").forEach(el => {
      if (el.hasAttribute("data-i18n")) return;
      const t = el.textContent || "";
      if (/\b\/\s*month\b/i.test(t)) el.setAttribute("data-i18n", "per.month");
      else if (/\b\/\s*quarter\b/i.test(t)) el.setAttribute("data-i18n", "per.quarter");
      else if (/^Pay$/i.test(t.trim())) el.setAttribute("data-i18n", "btn.pay");
      else if (/Pay\s*\(3\s*months\)/i.test(t)) el.setAttribute("data-i18n", "btn.pay3");
    });
  }

  /* ========================= APPLY LANGUAGE ========================= */
  function applyLang(lang) {
    const dict = T[lang] || T.en;

    // Title (if tagged)
    const titleEl = UDL.qs("title[data-i18n]");
    if (titleEl) {
      const key = titleEl.getAttribute("data-i18n");
      if (dict[key]) titleEl.textContent = dict[key];
    }

    // Elements
    UDL.qsa("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const val = dict[key];
      if (typeof val === "string") {
        // Keep child elements (icons, spans) intact:
        if (el.children.length) {
          // Replace only the text node content
          Array.from(el.childNodes).forEach(n => {
            if (n.nodeType === 3) n.nodeValue = val;
          });
        } else {
          el.textContent = val;
        }
      }
    });

    // Update toggle appearance
    UDL.qsa("[data-lang]").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
      btn.setAttribute("aria-pressed", btn.classList.contains("active") ? "true" : "false");
    });

    UDL.setLang(lang);
  }

  /* ========================= CONTROLS ========================= */
  function ensureToggle() {
    // If a toggle isn’t present, add it to header.navbar (non-destructive)
    const header = UDL.qs("header");
    if (!header) return;

    let wrap = UDL.qs(".lang-toggle", header);
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.className = "lang-toggle";
      wrap.innerHTML = `<button data-lang="en" type="button">EN</button> <button data-lang="es" type="button">ES</button>`;
      // Insert at end of header
      header.appendChild(wrap);
    }
  }

  function bindControls() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lang]");
      if (!btn) return;
      e.preventDefault();
      applyLang(btn.getAttribute("data-lang"));
    });
  }

  /* ========================= LAYOUT TWEAK ========================= */
  function fixTopPadding() {
    // If header is sticky or tall, make sure main content isn’t hidden.
    const header = UDL.qs("header");
    const main = UDL.qs("main");
    if (!header || !main) return;
    const h = Math.max(56, Math.round(header.getBoundingClientRect().height));
    main.style.scrollMarginTop = `${h + 8}px`;
  }

  /* ========================= INJECT MINIMAL CSS ========================= */
  (function injectCSS() {
    const css = `
      .lang-toggle [data-lang]{border:1px solid rgba(255,255,255,.35);background:transparent;color:inherit;
        padding:.25rem .5rem;border-radius:.6rem;line-height:1}
      .lang-toggle [data-lang].active{background:#fff;color:#0b2239}
      @media (prefers-color-scheme: light){
        .lang-toggle [data-lang]{border-color:rgba(0,0,0,.25)}
      }
    `;
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
  })();

  /* ========================= BOOT ========================= */
  document.addEventListener("DOMContentLoaded", () => {
    ensureToggle();      // Add toggle if not present
    bindControls();      // Wire up clicks
    autolabel();         // Tag elements automatically
    const lang = UDL.getLang();
    applyLang(lang);     // Render chosen language
    fixTopPadding();
    window.addEventListener("resize", fixTopPadding, { passive: true });
  });
})();
