<script>
/* --- i18n dictionary (EN/ES) --- */
const UDL_I18N={en:{
  "nav.home":"Home","nav.clients":"For Clients","nav.attorneys":"For Attorneys","nav.contact":"Contact",
  "hero.title":"Real help, fast: We connect you with an attorney who understands your case.",
  "hero.sub":"Bilingual intake (EN/ES). We are not a law firm. Membership gives you access to quick, caring connection with independent attorneys.",
  "cta.clients":"I need legal help","cta.attorneys":"I’m an attorney",
  "banner.kind":"You’re not alone.","banner.copy":"If you’re worried about deportation or any legal problem, we’ll listen—without judgment—and connect you with a qualified attorney.",
  "block.clientsTitle":"For Individuals","block.clientsCopy":"Simple, affordable membership. Tell us your situation (EN/ES). We match you to a licensed attorney who offers a free or reduced consultation.","block.clientsBtn":"See how it works",
  "block.attorneysTitle":"For Attorneys","block.attorneysCopy":"Join our bilingual intake network. We deliver qualified leads and provide dashboard updates.","block.attorneysBtn":"Plans & details",
  "per.month":"/ month","per.quarter":"/ quarter","per.month3":"/ month (first 3 months)","per.monthAfter":"/ month thereafter",
  "disclaimer.title":"Important","disclaimer.copy":"Ultima Defensa Legal is not a law firm and does not provide legal advice. We connect members with independent, licensed attorneys. Membership fees are for access to our intake and connection services only. Any attorney–client relationship is solely between you and the attorney.",
  "footer.contact":"Contact",
  "cl.title":"Get connected to a licensed attorney — fast and respectfully.","cl.lead":"We listen in English or Spanish, gather your details, and connect you with an attorney who offers a free or reduced consultation. Cancel anytime.",
  "cl.monthly":"Monthly Membership","cl.monthlyCopy":"Best if you need help right now.","cl.quarter":"Quarterly Membership","cl.quarterCopy":"Save money while you get settled.","btn.pay":"Pay",
  "cl.how.title":"How it works","cl.how.1":"Join as a member and complete a short bilingual intake (EN/ES).","cl.how.2":"We match you with an independent, licensed attorney for your issue and location.","cl.how.3":"You receive a free or reduced consultation. If you hire the attorney, you pay them directly.","cl.note":"Many members leave after being connected—and that’s okay. We’re here to help you reach the right attorney.",
  "at.title":"Grow your practice with caring, bilingual intake and qualified leads.","at.lead":"We screen in English and Spanish, route by practice area and geography, and deliver details to your dashboard or preferred channel.",
  "at.intro":"Intro Rate","at.badge":"first 3 months","at.ongoing":"Ongoing Rate","feat.intake":"Bilingual intake (EN/ES)","feat.leads":"Qualified lead delivery","feat.dashboard":"Attorney dashboard & updates","feat.priority":"Priority lead routing","feat.featured":"Featured listing placement","btn.pay3":"Pay (3 months)"
},es:{
  "nav.home":"Inicio","nav.clients":"Para Clientes","nav.attorneys":"Para Abogados","nav.contact":"Contacto",
  "hero.title":"Ayuda real, rápida: te conectamos con un abogado que entiende tu caso.",
  "hero.sub":"Atención bilingüe (EN/ES). No somos un bufete de abogados. La membresía te da acceso a una conexión rápida y humana con abogados independientes.",
  "cta.clients":"Necesito ayuda legal","cta.attorneys":"Soy abogado",
  "banner.kind":"No estás solo(a).","banner.copy":"Si te preocupa la deportación u otro problema legal, te escuchamos —sin juzgar— y te conectamos con un abogado calificado.",
  "block.clientsTitle":"Para Clientes","block.clientsCopy":"Membresía simple y accesible. Cuéntanos tu situación (EN/ES). Te vinculamos con un abogado que ofrece consulta gratis o a precio reducido.","block.clientsBtn":"Cómo funciona",
  "block.attorneysTitle":"Para Abogados","block.attorneysCopy":"Únete a nuestra red bilingüe. Entregamos prospectos calificados y ofrecemos actualizaciones en tu panel.","block.attorneysBtn":"Planes y detalles",
  "per.month":"/ mes","per.quarter":"/ trimestre","per.month3":"/ mes (primeros 3 meses)","per.monthAfter":"/ mes después",
  "disclaimer.title":"Importante","disclaimer.copy":"Ultima Defensa Legal no es un bufete de abogados y no brinda asesoría legal. Conectamos a los miembros con abogados independientes autorizados. Las cuotas de membresía son por el acceso a nuestro servicio de admisión y conexión. Cualquier relación abogado–cliente es solo entre usted y el abogado.",
  "footer.contact":"Contacto",
  "cl.title":"Conéctate con un abogado autorizado — de forma rápida y respetuosa.","cl.lead":"Te escuchamos en inglés o español, tomamos tus datos y te conectamos con un abogado que ofrece consulta gratis o a precio reducido. Cancela cuando quieras.",
  "cl.monthly":"Membresía Mensual","cl.monthlyCopy":"Ideal si necesitas ayuda ahora.","cl.quarter":"Membresía Trimestral","cl.quarterCopy":"Ahorra mientras te estabilizas.","btn.pay":"Pagar",
  "cl.how.title":"Cómo funciona","cl.how.1":"Únete como miembro y completa una admisión bilingüe (EN/ES).","cl.how.2":"Te vinculamos con un abogado independiente y autorizado según tu tema y ubicación.","cl.how.3":"Recibes una consulta gratis o a precio reducido. Si contratas al abogado, le pagas directamente.","cl.note":"Muchos miembros se dan de baja después de la conexión—y está bien. Nuestra misión es acercarte al abogado correcto.",
  "at.title":"Haz crecer tu práctica con admisión bilingüe y prospectos calificados.","at.lead":"Atendemos en inglés y español, enroutamos por especialidad y ubicación, y enviamos los detalles a tu panel o canal preferido.",
  "at.intro":"Tarifa Inicial","at.badge":"primeros 3 meses","at.ongoing":"Tarifa Regular","feat.intake":"Admisión bilingüe (EN/ES)","feat.leads":"Entrega de prospectos calificados","feat.dashboard":"Panel del abogado y actualizaciones","feat.priority":"Enrutamiento prioritario","feat.featured":"Ubicación destacada en el listado","btn.pay3":"Pagar (3 meses)"
}};

/* Inject header (with EN/ES) if missing */
function udlHeaderHTML(){
  return `<header>
    <div class="wrap">
      <a class="brand" href="/index.html">UltimaDefensaLegal</a>
      <nav>
        <a href="/index.html" data-i18n="nav.home">Home</a>
        <a href="/for-clients.html" data-i18n="nav.clients">For Clients</a>
        <a href="/for-attorneys.html" data-i18n="nav.attorneys">For Attorneys</a>
        <a href="/contact.html" data-i18n="nav.contact">Contact</a>
        <div class="lang" aria-label="Language">
          <span class="chip" id="udlLangEN">EN</span>
          <span class="chip" id="udlLangES">ES</span>
        </div>
      </nav>
    </div>
  </header>`;
}
function udlFooterHTML(){
  return `<footer>
    <div class="wrap" style="display:flex;flex-wrap:wrap;gap:1rem;justify-content:space-between;align-items:center">
      <span>&copy; <span id="yr"></span> Ultima Defensa Legal</span>
      <a href="/contact.html" style="color:#e2e8f0" data-i18n="footer.contact">Contact</a>
    </div>
  </footer>`;
}

/* Utility */
const $$=k=>document.querySelectorAll(`[data-i18n="${k}"]`);
function udlApplyLang(lang){
  try{ localStorage.setItem('udl_lang',lang); }catch{}
  document.getElementById('udlLangEN')?.classList.toggle('active',lang==='en');
  document.getElementById('udlLangES')?.classList.toggle('active',lang==='es');
  const dict=UDL_I18N[lang]||UDL_I18N.en;
  for(const k in dict){ $$(k).forEach(el=>el.textContent=dict[k]); }
}

/* Keep content clear of header — measure real height */
function udlSetHeaderOffset(){
  const h=document.querySelector('header');
  if(!h) return;
  const px=h.getBoundingClientRect().height || 56;
  document.documentElement.style.setProperty('--udl-header-h', px+'px');
}

document.addEventListener('DOMContentLoaded',()=>{
  if(!document.querySelector('header')) document.body.insertAdjacentHTML('afterbegin',udlHeaderHTML());
  if(!document.querySelector('footer')) document.body.insertAdjacentHTML('beforeend',udlFooterHTML());

  // Toggle handlers
  document.getElementById('udlLangEN')?.addEventListener('click',()=>udlApplyLang('en'));
  document.getElementById('udlLangES')?.addEventListener('click',()=>udlApplyLang('es'));
  const lang=(()=>{try{return localStorage.getItem('udl_lang')||'en';}catch{return'en';}})();
  udlApplyLang(lang);

  // Header spacing
  udlSetHeaderOffset();
  window.addEventListener('resize',udlSetHeaderOffset,{passive:true});

  // Year
  const yr=document.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();
});
</script>
