<script>
/* ---------- Self-injected CSS so no style.css edits required ---------- */
(function injectCSS(){
  const css = `
  :root{--header-h:56px}
  .udl-chip{display:inline-block;padding:.28rem .65rem;border:1px solid rgba(255,255,255,.45);
            border-radius:999px;color:#fff;cursor:pointer;font-size:.8rem;user-select:none}
  .udl-chip.active{background:#fff;color:#0b2239}
  .udl-lang{display:flex;gap:.35rem;margin-left:.5rem}
  .udl-fab{position:fixed;right:12px;bottom:14px;z-index:9999;background:rgba(11,34,57,.95);
           border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:.25rem;display:flex;gap:.25rem;
           box-shadow:0 6px 18px rgba(0,0,0,.22)}
  .udl-fab .udl-chip{border-color:rgba(255,255,255,.4)}
  header.udl-built{position:sticky;top:0;z-index:50;background:#0b2239;padding-top:max(.5rem, env(safe-area-inset-top))}
  header.udl-built .udl-wrap{display:flex;align-items:center;justify-content:space-between;min-height:56px}
  header.udl-built a{color:#fff;text-decoration:none}
  header.udl-built nav{display:flex;align-items:center;gap:.4rem;flex-wrap:wrap}
  header.udl-built nav a{padding:.55rem .8rem;border-radius:.5rem}
  header.udl-built nav a:hover{background:rgba(255,255,255,.10)}
  `;
  const s=document.createElement('style'); s.textContent=css; document.head.appendChild(s);
})();

/* ---------- Copy dictionary (EN/ES) ---------- */
const T={en:{
  "nav.home":"Home","nav.clients":"For Clients","nav.attorneys":"For Attorneys","nav.contact":"Contact",
  "hero.title":"Real help, fast: We connect you with an attorney who understands your case.",
  "hero.sub":"Bilingual intake (EN/ES). We are not a law firm. Membership gives you access to quick, caring connection with independent attorneys.",
  "cta.clients":"I need legal help","cta.attorneys":"I’m an attorney",
  "banner.kind":"You’re not alone.","banner.copy":"If you’re worried about deportation or any legal problem, we’ll listen—without judgment—and connect you with a qualified attorney.",
  "block.clientsTitle":"For Individuals","block.clientsCopy":"Simple, affordable membership. Tell us your situation (EN/ES). We match you to a licensed attorney who offers a free or reduced consultation.",
  "block.clientsBtn":"See how it works",
  "block.attorneysTitle":"For Attorneys","block.attorneysCopy":"Join our bilingual intake network. We deliver qualified leads and provide dashboard updates.","block.attorneysBtn":"Plans & details",
  "per.month":"/ month","per.quarter":"/ quarter","per.month3":"/ month (first 3 months)","per.monthAfter":"/ month thereafter",
  "disclaimer.title":"Important","disclaimer.copy":"Ultima Defensa Legal is not a law firm and does not provide legal advice. We connect members with independent, licensed attorneys. Membership fees are for access to our intake and connection services only. Any attorney–client relationship is solely between you and the attorney.",
  "footer.contact":"Contact",
  "cl.title":"Get connected to a licensed attorney — fast and respectfully.","cl.lead":"We listen in English or Spanish, gather your details, and connect you with an attorney who offers a free or reduced consultation. Cancel anytime.",
  "cl.monthly":"Monthly Membership","cl.monthlyCopy":"Best if you need help right now.",
  "cl.quarter":"Quarterly Membership","cl.quarterCopy":"Save money while you get settled.","btn.pay":"Pay",
  "cl.how.title":"How it works","cl.how.1":"Join as a member and complete a short bilingual intake (EN/ES).","cl.how.2":"We match you with an independent, licensed attorney for your issue and location.","cl.how.3":"You receive a free or reduced consultation. If you hire the attorney, you pay them directly.","cl.note":"Many members leave after being connected—and that’s okay. We’re here to help you reach the right attorney.",
  "at.title":"Grow your practice with caring, bilingual intake and qualified leads.",
  "at.lead":"We screen in English and Spanish, route by practice area and geography, and deliver details to your dashboard or preferred channel.",
  "at.intro":"Intro Rate","at.badge":"first 3 months","at.ongoing":"Ongoing Rate",
  "feat.intake":"Bilingual intake (EN/ES)","feat.leads":"Qualified lead delivery","feat.dashboard":"Attorney dashboard & updates","feat.priority":"Priority lead routing","feat.featured":"Featured listing placement",
  "btn.pay3":"Pay (3 months)","co.title":"Contact us","co.lead":"Send a secure message. We’ll respond promptly in English or Spanish.",
  "f.name":"Name","f.email":"Email","f.message":"Message","btn.send":"Send"
},es:{
  "nav.home":"Inicio","nav.clients":"Para Clientes","nav.attorneys":"Para Abogados","nav.contact":"Contacto",
  "hero.title":"Ayuda real, rápida: te conectamos con un abogado que entiende tu caso.",
  "hero.sub":"Atención bilingüe (EN/ES). No somos un bufete de abogados. La membresía te da acceso a una conexión rápida y humana con abogados independientes.",
  "cta.clients":"Necesito ayuda legal","cta.attorneys":"Soy abogado",
  "banner.kind":"No estás solo(a).","banner.copy":"Si te preocupa la deportación u otro problema legal, te escuchamos —sin juzgar— y te conectamos con un abogado calificado.",
  "block.clientsTitle":"Para Clientes","block.clientsCopy":"Membresía simple y accesible. Cuéntanos tu situación (EN/ES). Te vinculamos con un abogado que ofrece consulta gratis o a precio reducido.",
  "block.clientsBtn":"Cómo funciona",
  "block.attorneysTitle":"Para Abogados","block.attorneysCopy":"Únete a nuestra red bilingüe. Entregamos prospectos calificados y ofrecemos actualizaciones en tu panel.","block.attorneysBtn":"Planes y detalles",
  "per.month":"/ mes","per.quarter":"/ trimestre","per.month3":"/ mes (primeros 3 meses)","per.monthAfter":"/ mes después",
  "disclaimer.title":"Importante","disclaimer.copy":"Ultima Defensa Legal no es un bufete de abogados y no brinda asesoría legal. Conectamos a los miembros con abogados independientes autorizados. Las cuotas de membresía son por el acceso a nuestro servicio de admisión y conexión. Cualquier relación abogado–cliente es solo entre usted y el abogado.",
  "footer.contact":"Contacto",
  "cl.title":"Conéctate con un abogado autorizado — de forma rápida y respetuosa.","cl.lead":"Te escuchamos en inglés o español, tomamos tus datos y te conectamos con un abogado que ofrece consulta gratis o a precio reducido. Cancela cuando quieras.",
  "cl.monthly":"Membresía Mensual","cl.monthlyCopy":"Ideal si necesitas ayuda ahora.",
  "cl.quarter":"Membresía Trimestral","cl.quarterCopy":"Ahorra mientras te estabilizas.","btn.pay":"Pagar",
  "cl.how.title":"Cómo funciona","cl.how.1":"Únete como miembro y completa una admisión bilingüe (EN/ES).","cl.how.2":"Te vinculamos con un abogado independiente y autorizado según tu tema y ubicación.","cl.how.3":"Recibes una consulta gratis o a precio reducido. Si contratas al abogado, le pagas directamente.","cl.note":"Muchos miembros se dan de baja después de la conexión—y está bien. Nuestra misión es acercarte al abogado correcto.",
  "at.title":"Haz crecer tu práctica con admisión bilingüe y prospectos calificados.",
  "at.lead":"Atendemos en inglés y español, enroutamos por especialidad y ubicación, y enviamos los detalles a tu panel o canal preferido.",
  "at.intro":"Tarifa Inicial","at.badge":"primeros 3 meses","at.ongoing":"Tarifa Regular",
  "feat.intake":"Admisión bilingüe (EN/ES)","feat.leads":"Entrega de prospectos calificados","feat.dashboard":"Panel del abogado y actualizaciones","feat.priority":"Enrutamiento prioritario","feat.featured":"Ubicación destacada en el listado",
  "btn.pay3":"Pagar (3 meses)","co.title":"Contáctanos","co.lead":"Envíanos un mensaje seguro. Respondemos con prontitud en inglés o español.",
  "f.name":"Nombre","f.email":"Correo electrónico","f.message":"Mensaje","btn.send":"Enviar"
}};

/* ---------- Helpers ---------- */
const $$ = k => document.querySelectorAll(`[data-i18n="${k}"]`);
function applyLang(lang){
  try{ localStorage.setItem('udl_lang',lang); }catch{}
  const dict=T[lang]||T.en;
  for(const k in dict){ $$(k).forEach(el=>el.textContent=dict[k]); }
  document.getElementById('udlEN')?.classList.toggle('active',lang==='en');
  document.getElementById('udlES')?.classList.toggle('active',lang==='es');
}
function setHeaderPadding(){
  const h=document.querySelector('header'); if(!h) return;
  const px=Math.max(56, Math.round(h.getBoundingClientRect().height));
  document.documentElement.style.setProperty('--header-h', px+'px');
  const main=document.querySelector('main'); if(main) main.style.paddingTop=`calc(${px}px + .5rem)`;
}

/* ---------- Ensure visible toggle no matter your existing header ---------- */
function addToggleToExistingHeader(){
  const header=document.querySelector('header');
  if(!header) return false;
  // Find a nav; if none, create one.
  let nav = header.querySelector('nav');
  if(!nav){ nav=document.createElement('nav'); header.appendChild(nav); }
  // If chips already exist, stop.
  if(header.querySelector('#udlEN') || header.querySelector('#udlES')) return true;
  const wrap=document.createElement('div'); wrap.className='udl-lang';
  wrap.innerHTML=`<span id="udlEN" class="udl-chip">EN</span><span id="udlES" class="udl-chip">ES</span>`;
  nav.appendChild(wrap);
  return true;
}

/* ---------- Build a minimal header if there is none ---------- */
function buildHeaderIfMissing(){
  if(document.querySelector('header')) return;
  const html=`
  <header class="udl-built">
    <div class="udl-wrap wrap">
      <a class="brand" href="/index.html" style="color:#fff;font-weight:800">UltimaDefensaLegal</a>
      <nav>
        <a href="/index.html" data-i18n="nav.home">Home</a>
        <a href="/for-clients.html" data-i18n="nav.clients">For Clients</a>
        <a href="/for-attorneys.html" data-i18n="nav.attorneys">For Attorneys</a>
        <a href="/contact.html" data-i18n="nav.contact">Contact</a>
        <div class="udl-lang"><span id="udlEN" class="udl-chip">EN</span><span id="udlES" class="udl-chip">ES</span></div>
      </nav>
    </div>
  </header>`;
  document.body.insertAdjacentHTML('afterbegin', html);
}

/* ---------- Floating fallback toggle ---------- */
function ensureFab(){
  if(document.querySelector('.udl-fab')) return;
  const fab=document.createElement('div');
  fab.className='udl-fab';
  fab.innerHTML=`<span class="udl-chip" id="udlFabEN">EN</span><span class="udl-chip" id="udlFabES">ES</span>`;
  document.body.appendChild(fab);
  fab.querySelector('#udlFabEN').addEventListener('click',()=>applyLang('en'));
  fab.querySelector('#udlFabES').addEventListener('click',()=>applyLang('es'));
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded',()=>{
  // 1) Guarantee there is a header AND add pills into it
  buildHeaderIfMissing();
  addToggleToExistingHeader();

  // 2) Wire header pills
  document.getElementById('udlEN')?.addEventListener('click',()=>applyLang('en'));
  document.getElementById('udlES')?.addEventListener('click',()=>applyLang('es'));

  // 3) Floating toggle as safety net
  ensureFab();

  // 4) Apply saved language + fix top spacing
  const lang = (()=>{ try{return localStorage.getItem('udl_lang')||'en';}catch{return 'en';} })();
  applyLang(lang);
  setHeaderPadding(); window.addEventListener('resize',setHeaderPadding,{passive:true});

  // 5) Footer year (if present)
  const yr=document.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();
});
</script>
