/* ===== UDL Shared Script ===== */
const SITE = { domain: "ultimadefensalegal.com", email: "support@ultimadefensalegal.com" };
const PRELAUNCH = true; // flip to false when payments are live

/* --- i18n dictionary (EN/ES) --- */
const T = {
  en:{
    nav_home:"Home",nav_pricing:"Pricing",nav_pay:"Pay",nav_contact:"Contact",
    hero_h1:"Legal defense access—fast, clear, and affordable",
    hero_p:"Connect with licensed attorneys. Transparent 3-month plans. Bilingual support.",
    cta_pricing:"View pricing", cta_contact:"Contact us",
    edu_note:"We connect you with licensed attorneys. We do not provide legal advice.",
    wl_banner:"Payments open soon — join the waitlist",
    wl_join:"Join Waitlist", wl_close:"Close",
    wl_title:"Get notified when checkout opens",
    wl_desc:"Leave your email and we’ll notify you. No spam.",
    wl_name:"Your name", wl_email:"Email", wl_submit:"Notify me", wl_thanks:"Thanks — you’re on the list!",
    cc_title:"Your Privacy Choices", cc_desc:"Choose which cookies we may use.",
    cc_ess:"Essential (required)", cc_ana:"Analytics", cc_save:"Save", cc_cancel:"Cancel", cc_more:"Learn more"
  },
  es:{
    nav_home:"Inicio",nav_pricing:"Precios",nav_pay:"Pagar",nav_contact:"Contacto",
    hero_h1:"Acceso a defensa legal — rápido, claro y accesible",
    hero_p:"Conéctate con abogados con licencia. Planes de 3 meses. Soporte bilingüe.",
    cta_pricing:"Ver precios", cta_contact:"Contáctanos",
    edu_note:"Te conectamos con abogados con licencia. No ofrecemos asesoría legal.",
    wl_banner:"Los pagos abren pronto — únete a la lista",
    wl_join:"Unirme", wl_close:"Cerrar",
    wl_title:"Te avisamos cuando abra el pago",
    wl_desc:"Deja tu correo y te notificamos. Sin spam.",
    wl_name:"Tu nombre", wl_email:"Correo", wl_submit:"Avisarme", wl_thanks:"¡Gracias! Ya estás en la lista.",
    cc_title:"Tus opciones de privacidad", cc_desc:"Elige qué cookies podemos usar.",
    cc_ess:"Esenciales (requeridas)", cc_ana:"Analítica", cc_save:"Guardar", cc_cancel:"Cancelar", cc_more:"Saber más"
  }
};
const getLang=()=>localStorage.getItem("udl-lang")||"en";
const setLang=(l)=>{localStorage.setItem("udl-lang",l);applyI18n();};
function t(k){const L=T[getLang()]||T.en; return L[k]||k;}
function applyI18n(){document.documentElement.lang=getLang(); document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.getAttribute("data-i18n"); if(T[getLang()][k]) el.textContent=T[getLang()][k];});}

/* --- Consent + analytics (Plausible) --- */
function consentGet(){return localStorage.getItem("udl-consent")||"unset";}
function consentSet(v){localStorage.setItem("udl-consent",v);}
function loadAnalyticsIfConsented(){
  if(consentGet()!=="yes") return;
  try{var s=document.createElement("script"); s.defer=true; s.setAttribute("data-domain",SITE.domain); s.src="https://plausible.io/js/plausible.js"; document.head.appendChild(s);}catch(e){}
}
function buildConsentUI(){
  if(consentGet()==="unset"){
    const bar=document.createElement("div");
    bar.style.cssText="position:sticky;bottom:0;z-index:9998;background:#0e1b16;color:#fff;padding:10px 14px;display:flex;gap:8px;justify-content:center;align-items:center;flex-wrap:wrap";
    bar.innerHTML=`<span>${t('cc_desc')} <a href="cookie-policy.html" style="color:#fff;text-decoration:underline">${t('cc_more')}</a></span>
    <div style="display:flex;gap:8px">
      <button id="cc-accept" style="background:#1f8a5b;color:#fff;font-weight:800;border:0;border-radius:10px;padding:6px 12px">OK</button>
      <button id="cc-open" style="background:#fff;color:#0e1b16;font-weight:800;border:0;border-radius:10px;padding:6px 12px">Cookie Settings</button>
    </div>`;
    document.body.appendChild(bar);
    document.getElementById("cc-accept").onclick=()=>{consentSet("yes"); bar.remove(); loadAnalyticsIfConsented();};
    document.getElementById("cc-open").onclick=openPrefs;
  }
  const wrap=document.createElement("div"); wrap.id="cc-modal"; wrap.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.45);display:none;z-index:10000";
  wrap.innerHTML=`<div style="max-width:520px;margin:12vh auto;background:#fff;border-radius:14px;padding:18px">
    <h3 style="margin-top:0">${t('cc_title')}</h3><p>${t('cc_desc')}</p>
    <form id="cc-form" style="display:grid;gap:8px">
      <label><input type="checkbox" checked disabled> ${t('cc_ess')}</label>
      <label><input id="cc-ana" type="checkbox"> ${t('cc_ana')}</label>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button type="button" id="cc-cancel">${t('cc_cancel')}</button>
        <button type="submit" id="cc-save" style="background:#0e1b16;color:#fff;border:0;border-radius:10px;padding:6px 12px;font-weight:800">${t('cc_save')}</button>
      </div>
    </form></div>`;
  document.body.appendChild(wrap);
  document.getElementById("cc-cancel").onclick=()=>{wrap.style.display="none";}
  document.getElementById("cc-form").onsubmit=(e)=>{e.preventDefault(); const ana=document.getElementById("cc-ana").checked; consentSet(ana?"yes":"no"); wrap.style.display="none"; if(ana) loadAnalyticsIfConsented(); else location.reload();};
  const link=document.getElementById("openPrefs"); if(link) link.onclick=openPrefs;
  function openPrefs(){wrap.style.display="block"; document.getElementById("cc-ana").checked=(consentGet()==="yes");}
  window.openPrefs=openPrefs;
}

/* --- Prelaunch Waitlist --- */
function buildWaitlist(){
  if(!PRELAUNCH) return;
  const bar=document.createElement("div");
  bar.style.cssText="position:sticky;top:0;z-index:9997;background:#0e1b16;color:#fff;padding:8px 12px;display:flex;gap:8px;justify-content:center;align-items:center;text-align:center";
  bar.innerHTML=`<span style="font-weight:800">${t('wl_banner')}</span>
  <button onclick="(document.getElementById('wl-modal').style.display='block')" style="margin-left:8px;background:#1f8a5b;color:#fff;border:0;border-radius:10px;padding:6px 10px;font-weight:800;cursor:pointer">${t('wl_join')}</button>`;
  document.body.prepend(bar);
  const wrap=document.createElement("div"); wrap.id="wl-modal"; wrap.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.45);display:none;z-index:10000";
  wrap.innerHTML=`<div style="max-width:520px;margin:12vh auto;background:#fff;border-radius:14px;padding:18px">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
      <h3 style="margin:0">${t('wl_title')}</h3>
      <button onclick="(document.getElementById('wl-modal').style.display='none')" style="background:#fff;border:1px solid #e6e9ef;border-radius:10px;padding:6px 10px;cursor:pointer">${t('wl_close')}</button>
    </div>
    <p style="margin:.5rem 0 1rem 0;color:#444">${t('wl_desc')}</p>
    <form name="udl-waitlist" method="POST" data-netlify="true" style="display:grid;gap:10px">
      <input type="hidden" name="form-name" value="udl-waitlist">
      <label>${t('wl_name')}<input name="name" required style="width:100%;padding:12px;border:1px solid #e6e9ef;border-radius:12px"></label>
      <label>${t('wl_email')}<input name="email" type="email" required style="width:100%;padding:12px;border:1px solid #e6e9ef;border-radius:12px"></label>
      <button type="submit" style="padding:.8rem 1rem;border-radius:12px;border:0;font-weight:800;background:#1f8a5b;color:#fff;cursor:pointer">${t('wl_submit')}</button>
    </form>
    <p id="wl-thx" style="display:none;margin-top:10px;color:#0b7a2a;font-weight:700">${t('wl_thanks')}</p>
  </div>`;
  document.body.appendChild(wrap);
  wrap.querySelector("form").addEventListener("submit",()=>{setTimeout(()=>{document.getElementById("wl-thx").style.display="block";},300);setTimeout(()=>{wrap.style.display="none"},1600);});
  const ghost=document.createElement("form"); ghost.setAttribute("name","udl-waitlist"); ghost.setAttribute("netlify",""); ghost.hidden=true; document.body.appendChild(ghost);
}

/* --- Init --- */
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll("[data-lang]").forEach(x=>x.removeAttribute("aria-current")); b.setAttribute("aria-current","true"); setLang(b.getAttribute("data-lang"));}));
  applyI18n(); buildConsentUI(); loadAnalyticsIfConsented(); buildWaitlist();
});
