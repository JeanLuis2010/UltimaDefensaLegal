/* =======================================================================
   UltimaDefensaLegal — site-wide EN/ES toggle (drop-in, no piecemeal)
   File: /shared-udl.js
   ======================================================================= */

/* ---------- Dictionary ---------- */
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
    "hero.sub": "Intake bilingüe (EN/ES). No somos un bufete de abogados. La membresía le da acceso a una conexión rápida y humana con abogados independientes.",
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
    "clients.sub": "Le escuchamos en inglés o español, tomamos sus datos y le conectamos con un abogado que ofrece consulta gratis o a precio reducido. Cancele cuando quiera.",
    "plan.monthly": "Membresía Mensual",
    "plan.monthlyCopy": "Ideal si necesita ayuda ahora.",
    "plan.quarterly": "Membresía Trimestral",
    "plan.quarterlyCopy": "Ahorre mientras se establece.",
    "how.title": "Cómo funciona",
    "how.step1": "Únase como miembro y complete una admisión bilingüe (EN/ES).",
    "how.step2": "Le vinculamos con un abogado independiente con licencia según su tema y ubicación.",
    "how.step3": "Recibe una consulta gratis o a precio reducido. Si contrata al abogado, le paga directamente.",

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

/* ---------- Minimal CSS for active pill (doesn't touch your stylesheet) ---------- */
(function injectCSS(){
  const css = `
    .lang-toggle [data-lang]{border:1px solid rgba(255,255,255,.35);background:transparent;color:#fff;
      padding:.25rem .5rem;border-radius:.6rem}
    .lang-toggle [data-lang].active{background:#fff;color:#0b2239}
  `;
  const s=document.createElement('style'); s.textContent=css; document.head.appendChild(s);
})();

/* ---------- Utilities ---------- */
const norm = s => (s||"").replace(/\s+/g,' ').trim();
const qs  = (sel,root=document)=>root.querySelector(sel);
const qsa = (sel,root=document)=>Array.from(root.querySelectorAll(sel));

/* Build an index of exact-English -> key so we can auto-label elements that
   don't have data-i18n (no piecemeal editing needed). */
const EN_INDEX = (()=> {
  const m = new Map();
  const en = T.en;
  Object.keys(en).forEach(k => {
    m.set(norm(en[k]), k);
  });
  return m;
})();

/* Find “leaf” text elements we can safely replace */
function leafElements(root=document){
  const candidates = qsa('h1,h2,h3,h4,p,li,button,a,span,small,strong,em,label,th,td');
  return candidates.filter(el => !qsa('*', el).length); // no child elements
}

/* Label elements by matching their English text to our dictionary */
function autolabelI18n(){
  leafElements().forEach(el=>{
    if(el.hasAttribute('data-i18n')) return;
    const k = EN_INDEX.get(norm(el.textContent));
    if(k){ el.setAttribute('data-i18n', k); }
  });
  // Handle inline units like "/ month" and "/ quarter"
  qsa('body *').forEach(el=>{
    if(el.hasAttribute('data-i18n')) return;
    const t = el.textContent;
    if(/\b\/\s*month\b/i.test(t)) el.setAttribute('data-i18n', 'per.month');
    else if(/\b\/\s*quarter\b/i.test(t)) el.setAttribute('data-i18n', 'per.quarter');
    else if(/\bPay\s*\(3 months\)/i.test(t)) el.setAttribute('data-i18n','btn.pay3');
    else if(/^Pay$/i.test(t.trim())) el.setAttribute('data-i18n','btn.pay');
  });
}

/* Apply language to all data-i18n elements + document title */
function applyLang(lang){
  const dict = T[lang] || T.en;
  try{ localStorage.setItem('udl_lang', lang); }catch{}
  // Title (if we have a page-specific i18n marker on <title>)
  const titleEl = qs('title[data-i18n]'); 
  if(titleEl){ titleEl.textContent = dict[ titleEl.getAttribute('data-i18n') ] || titleEl.textContent; }

  // Elements
  qsa('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const val = dict[key];
    if(typeof val === 'string') el.textContent = val;
  });

  // Toggle pill state (supports both data-lang buttons and older #udlEN/ES)
  qsa('[data-lang]').forEach(btn=>{
    btn.classList.toggle('active', btn.getAttribute('data-lang')===lang);
  });
  const enBtn = qs('#udlEN'); const esBtn = qs('#udlES');
  if(enBtn) enBtn.classList.toggle('active', lang==='en');
  if(esBtn) esBtn.classList.toggle('active', lang==='es');
}

/* Wire up all EN/ES controls (works with your header buttons & any injected pills) */
function bindControls(){
  document.addEventListener('click', e=>{
    const btn = e.target.closest('[data-lang]');
    if(btn){
      e.preventDefault();
      applyLang(btn.getAttribute('data-lang'));
    }
    if(e.target.id==='udlEN'){ e.preventDefault(); applyLang('en'); }
    if(e.target.id==='udlES'){ e.preventDefault(); applyLang('es'); }
  });
}

/* Keep top spacing tidy on mobile if the header is sticky */
function fixTopPadding(){
  const header = qs('header');
  if(!header) return;
  const h = Math.max(56, Math.round(header.getBoundingClientRect().height));
  const main = qs('main'); if(main) main.style.paddingTop = `calc(${h}px + .5rem)`;
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', ()=>{
  bindControls();
  autolabelI18n();          // add data-i18n automatically where possible
  const lang = (()=>{ try{return localStorage.getItem('udl_lang')||'en';}catch{return 'en';} })();
  applyLang(lang);
  fixTopPadding();
  window.addEventListener('resize', fixTopPadding, {passive:true});
});
