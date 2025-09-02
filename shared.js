/*** UDL Shared (EN/ES toggle, consent, brand guard) ***/
const BRAND = "Ultima Defensa Legal";
const DOMAIN = "ultimadefensalegal.com";
const PRELAUNCH = true; // flip to false when payments go live
const CONTACT_EMAIL = "hello@ultimadefensalegal.com";

/* i18n */
const T = {
  en:{nav_home:"Home",nav_pay:"Pay",nav_contact:"Contact",
      hero_h1:"Legal defense starts with knowing your options.",
      hero_p:"We connect you with licensed attorneys. Clear prices. Bilingual support.",
      cta_learn:"How it works",cta_pay:"Pay",
      edu_note:"We are not a law firm. We connect you with licensed attorneys.",
      footer_privacy:"Privacy",footer_terms:"Terms",footer_refunds:"Refunds",footer_cookie:"Cookie Policy",footer_prefs:"Cookie Settings",
      footer_dns:"Do-Not-Sell/Share",footer_a11y:"Accessibility",footer_sec:"Security",
      wl_banner:"Payments resume soon — join the list", wl_join:"Join Waitlist", wl_close:"Close",
      wl_title:"Get notified when checkout opens", wl_desc:"Leave your email and we’ll notify you. No spam.",
      wl_name:"Your name", wl_email:"Email", wl_submit:"Notify me", wl_thanks:"Thanks — you’re on the list!",
      cc_title:"Your Privacy Choices", cc_desc:"Choose how we may use cookies.",
      cc_ess:"Essential (required)", cc_ana:"Analytics", cc_ads:"Advertising (not used)", cc_save:"Save", cc_cancel:"Cancel", cc_more:"Learn more"},
  es:{nav_home:"Inicio",nav_pay:"Pagar",nav_contact:"Contacto",
      hero_h1:"La defensa legal comienza con conocer sus opciones.",
      hero_p:"Le conectamos con abogados con licencia. Precios claros. Soporte bilingüe.",
      cta_learn:"Cómo funciona",cta_pay:"Pagar",
      edu_note:"No somos un despacho jurídico. Le conectamos con abogados con licencia.",
      footer_privacy:"Privacidad",footer_terms:"Términos",footer_refunds:"Reembolsos",footer_cookie:"Política de cookies",footer_prefs:"Preferencias de cookies",
      footer_dns:"No vender/compartir",footer_a11y:"Accesibilidad",footer_sec:"Seguridad",
      wl_banner:"Los pagos vuelven pronto — únase a la lista", wl_join:"Unirme a la lista", wl_close:"Cerrar",
      wl_title:"Le avisamos cuando el pago esté activo", wl_desc:"Deje su correo y le notificaremos. Sin spam.",
      wl_name:"Su nombre", wl_email:"Correo", wl_submit:"Avisarme", wl_thanks:"¡Gracias! Ya está en la lista!",
      cc_title:"Sus opciones de privacidad", cc_desc:"Elija cómo podemos usar cookies.",
      cc_ess:"Esencial (requerido)", cc_ana:"Analítica", cc_ads:"Publicidad (no usamos)", cc_save:"Guardar", cc_cancel:"Cancelar", cc_more:"Saber más"}
};
const getLang=()=>localStorage.getItem("lang")||"en";
const setLang=(l)=>{localStorage.setItem("lang",l);applyI18n();};
function t(k){const L=T[getLang()]||T.en; return L[k]||k;}
function applyI18n(){document.documentElement.lang=getLang(); document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.getAttribute("data-i18n"); if(T[getLang()][k]) el.textContent=T[getLang()][k];});}

/* Consent + Analytics (placeholder for privacy-friendly analytics if added later) */
function consentGet(){return localStorage.getItem("udl-consent")||"unset";}
function consentSet(v){localStorage.setItem("udl-consent",v);}
function loadAnalyticsIfConsented(){ /* hook for future analytics */ }
function buildConsentUI(){
  if(consentGet()==="unset"){
    const bar=document.createElement("div");
    bar.style.cssText="position:sticky;bottom:0;z-index:9998;background:#0b2a4a;color:#fff;padding:10px 14px;display:flex;gap:8px;justify-content:center;align-items:center;flex-wrap:wrap";
    bar.innerHTML=`<span>${t('cc_desc')} <a href="cookie-policy.html" style="color:#fff;text-decoration:underline">${t('cc_more')}</a></span>
    <div style="display:flex;gap:8px">
      <button id="cc-accept" style="background:#2da44e;color:#fff;font-weight:800;border:0;border-radius:10px;padding:6px 12px">OK</button>
      <button id="cc-open" style="background:#fff;color:#0b2a4a;font-weight:800;border:0;border-radius:10px;padding:6px 12px">${t('footer_prefs')}</button>
    </div>`;
    document.body.appendChild(bar);
    document.getElementById("cc-accept").onclick=()=>{consentSet("yes"); bar.remove(); loadAnalyticsIfConsented();};
    document.getElementById("cc-open").onclick=()=>{openPrefs();};
  }
  const wrap=document.createElement("div"); wrap.id="cc-modal"; wrap.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.45);display:none;z-index:10000";
  wrap.innerHTML=`<div style="max-width:520px;margin:12vh auto;background:#fff;border-radius:14px;padding:18px">
    <h3 style="margin-top:0">${t('cc_title')}</h3>
    <p>${t('cc_desc')}</p>
    <form id="cc-form" style="display:grid;gap:8px">
      <label><input type="checkbox" checked disabled> ${t('cc_ess')}</label>
      <label><input id="cc-ana" type="checkbox"> ${t('cc_ana')}</label>
      <label><input type="checkbox" disabled> ${t('cc_ads')}</label>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button type="button" id="cc-cancel">${t('cc_cancel')}</button>
        <button type="submit" id="cc-save" style="background:#0b2a4a;color:#fff;border:0;border-radius:10px;padding:6px 12px;font-weight:800">${t('cc_save')}</button>
      </div>
    </form>
  </div>`;
  document.body.appendChild(wrap);
  document.getElementById("cc-cancel").onclick=()=>{wrap.style.display="none";}
  document.getElementById("cc-form").onsubmit=(e)=>{e.preventDefault(); const ana=document.getElementById("cc-ana").checked; consentSet(ana?"yes":"no"); wrap.style.display="none"; if(ana) loadAnalyticsIfConsented(); else location.reload();};
  const openPrefs=()=>{wrap.style.display="block"; document.getElementById("cc-ana").checked = (consentGet()==="yes");};
  document.getElementById("openPrefs") && (document.getElementById("openPrefs").onclick=()=>openPrefs());
  window.openPrefs=openPrefs;
}

/* Waitlist (if PRELAUNCH true) */
function openWL(){const m=document.getElementById("wl-modal"); if(m) m.style.display="block";}
function closeWL(){const m=document.getElementById("wl-modal"); if(m) m.style.display="none";}
function buildWaitlist(){
  if(!PRELAUNCH) return;
  const bar=document.createElement("div");
  bar.style.cssText="position:sticky;top:0;z-index:9997;background:#0b2a4a;color:#fff;padding:8px 12px;display:flex;gap:8px;justify-content:center;align-items:center;text-align:center";
  bar.innerHTML=`<span style="font-weight:800">${t('wl_banner')}</span>
  <button onclick="openWL()" style="margin-left:8px;background:#e01e24;color:#fff;border:0;border-radius:10px;padding:6px 10px;font-weight:800;cursor:pointer">${t('wl_join')}</button>`;
  document.body.prepend(bar);
  const wrap=document.createElement("div"); wrap.id="wl-modal"; wrap.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.45);display:none;z-index:10000";
  wrap.innerHTML=`<div style="max-width:520px;margin:12vh auto;background:#fff;border-radius:14px;padding:18px">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
      <h3 style="margin:0">${t('wl_title')}</h3>
      <button onclick="closeWL()" style="background:#fff;border:1px solid #e6e9ef;border-radius:10px;padding:6px 10px;cursor:pointer">${t('wl_close')}</button>
    </div>
    <p style="margin:.5rem 0 1rem 0;color:#444">${t('wl_desc')}</p>
    <form name="udl-waitlist" method="POST" data-netlify="true" style="display:grid;gap:10px">
      <input type="hidden" name="form-name" value="udl-waitlist">
      <label>${t('wl_name')}<input name="name" required style="width:100%;padding:12px;border:1px solid #e6e9ef;border-radius:12px"></label>
      <label>${t('wl_email')}<input name="email" type="email" required style="width:100%;padding:12px;border:1px solid #e6e9ef;border-radius:12px"></label>
      <button type="submit" style="padding:.8rem 1rem;border-radius:12px;border:0;font-weight:800;background:#e01e24;color:#fff;cursor:pointer">${t('wl_submit')}</button>
    </form>
    <p id="wl-thx" style="display:none;margin-top:10px;color:#0b7a2a;font-weight:700">${t('wl_thanks')}</p>
  </div>`;
  document.body.appendChild(wrap);
  wrap.querySelector("form").addEventListener("submit",()=>{setTimeout(()=>{document.getElementById("wl-thx").style.display="block";},300);setTimeout(closeWL,1800);});
  const ghost=document.createElement("form"); ghost.setAttribute("name","udl-waitlist"); ghost.setAttribute("netlify",""); ghost.hidden=true; document.body.appendChild(ghost);
}

/* Brand guard: kill any stray "edunancial" text */
function brandGuard(){
  const bad = /edunancial/i;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n; while(n = walker.nextNode()){
    if(bad.test(n.nodeValue)){ n.nodeValue = n.nodeValue.replace(bad,""); }
  }
}

document.addEventListener("DOMContentLoaded",()=>{
  // language toggle
  document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll("[data-lang]").forEach(x=>x.removeAttribute("aria-current")); b.setAttribute("aria-current","true"); setLang(b.getAttribute("data-lang"));}));
  applyI18n();
  buildConsentUI();
  loadAnalyticsIfConsented();
  buildWaitlist();
  brandGuard();
});
