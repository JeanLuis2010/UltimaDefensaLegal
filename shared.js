/* UDL shared script: i18n, cookie consent, analytics, price variants */
const CONTACT_EMAIL="soporte@ultimadefensalegal.com"; const DOMAIN="ultimadefensalegal.com";
const PRELAUNCH=false; // flip true if payments paused
/* Hidden pricing variants (quiet regional strategy via query ?pv=A/B/C or localStorage) */
const PRICE_VARIANTS={
  base:{ind:79,fam:139},
  A:{ind:74,fam:129},
  B:{ind:84,fam:149}
};
function getPV(){return localStorage.getItem("udl-pv")||"base";}
(function initPV(){const url=new URL(location.href);const q=url.searchParams.get("pv");if(q&&PRICE_VARIANTS[q]){localStorage.setItem("udl-pv",q);url.searchParams.delete("pv");history.replaceState(null,"",url.toString());}})();

const T={
  en:{brand:"Ultima Defensa Legal",nav_home:"Home",nav_plans:"Plans",nav_intake:"Start",nav_contact:"Contact",
      hero_h1:"Legal defense access, fast.",hero_p:"We connect you to licensed attorneys. Transparent pricing. Bilingual help.",
      cta_start:"Start now",cta_plans:"View plans",
      val_title:"How we help",val_1:"Rapid intake in English or Spanish",val_2:"Attorney connection—no middleman after you’re matched",val_3:"Document & hearing prep guidance (no legal advice)",
      plans_title:"Plans (3 months)",ind_title:"Individual",fam_title:"Family (Husband & Wife)",ind_inc:"Message portal, scheduling help, emergency handoff",fam_inc:"Everything in Individual for both spouses",
      pay:"Pay", crypto:"Crypto (Bitcoin, others)", extend:"Option to extend 3 more months", note:"Prices shown at checkout.", prelaunch:"Payments temporarily offline—contact us.",
      contact_title:"Contact", contact_send:"Send", cookie_more:"Learn more", cookie_prefs:"Cookie Settings",
      edu:"We are not a law firm. We connect people with licensed, independent attorneys.",
      footer_privacy:"Privacy", footer_terms:"Terms", footer_refunds:"Refunds", footer_cookie:"Cookie Policy", footer_dns:"Do-Not-Sell/Share", footer_a11y:"Accessibility", footer_sec:"Security"},
  es:{brand:"Última Defensa Legal",nav_home:"Inicio",nav_plans:"Planes",nav_intake:"Comenzar",nav_contact:"Contacto",
      hero_h1:"Acceso a defensa legal, rápido.",hero_p:"Te conectamos con abogados con licencia. Precios claros. Ayuda bilingüe.",
      cta_start:"Comenzar ahora",cta_plans:"Ver planes",
      val_title:"Cómo ayudamos",val_1:"Registro rápido en español o inglés",val_2:"Conexión con abogado—sin intermediario después del enlace",val_3:"Guía para documentos y audiencias (no asesoría legal)",
      plans_title:"Planes (3 meses)",ind_title:"Individual",fam_title:"Familiar (Esposo y Esposa)",ind_inc:"Portal de mensajes, ayuda con citas, traslado urgente",fam_inc:"Todo del plan Individual para ambos cónyuges",
      pay:"Pagar", crypto:"Cripto (Bitcoin, y otras)", extend:"Opción de extender 3 meses más", note:"Precios mostrados al pagar.", prelaunch:"Pagos temporalmente inactivos—contáctanos.",
      contact_title:"Contacto", contact_send:"Enviar", cookie_more:"Saber más", cookie_prefs:"Preferencias de cookies",
      edu:"No somos un bufete. Conectamos personas con abogados independientes con licencia.",
      footer_privacy:"Privacidad", footer_terms:"Términos", footer_refunds:"Reembolsos", footer_cookie:"Política de cookies", footer_dns:"No vender/compartir", footer_a11y:"Accesibilidad", footer_sec:"Seguridad"}
};
function langGet(){return localStorage.getItem("udl-lang")||"es";}
function langSet(l){localStorage.setItem("udl-lang",l);applyI18n();}
function t(k){const L=T[langGet()]||T.es;return L[k]||k;}
function applyI18n(){document.documentElement.lang=langGet();document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.getAttribute("data-i18n");if(T[langGet()][k]) el.textContent=T[langGet()][k];});updatePrices();}
document.addEventListener("click",e=>{if(e.target.matches("[data-lang]")){document.querySelectorAll("[data-lang]").forEach(b=>b.removeAttribute("aria-current")); e.target.setAttribute("aria-current","true"); langSet(e.target.getAttribute("data-lang"));}});

/* Prices injection */
function formatUSD(x){return `$${x}`;}
function updatePrices(){
  const pv=getPV(); const P=PRICE_VARIANTS[pv]||PRICE_VARIANTS.base;
  const ind=document.querySelector("[data-price='ind']"); const fam=document.querySelector("[data-price='fam']");
  if(ind) ind.textContent=formatUSD(P.ind)+" / 3 mo";
  if(fam) fam.textContent=formatUSD(P.fam)+" / 3 mo";
}

/* Cookie consent + analytics */
function cGet(){return localStorage.getItem("udl-consent")||"unset";}
function cSet(v){localStorage.setItem("udl-consent",v);}
function loadAnalytics(){if(cGet()!=="yes")return; const s=document.createElement("script");s.defer=true;s.src="https://plausible.io/js/plausible.js";s.setAttribute("data-domain",DOMAIN);document.head.appendChild(s);}
function buildConsent(){
  if(cGet()==="unset"){
    const bar=document.createElement("div");
    bar.style="position:sticky;bottom:0;z-index:9999;background:#0b2a4a;color:#fff;padding:10px;display:flex;gap:8px;justify-content:center;align-items:center;flex-wrap:wrap";
    bar.innerHTML=`<span>${t('cookie_more')}:</span>
    <a href="cookie-policy.html" style="color:#fff;text-decoration:underline">${t('cookie_more')}</a>
    <button id="cc-yes" style="background:#2da44e;color:#fff;border:0;border-radius:10px;padding:6px 12px;font-weight:800">OK</button>
    <button id="cc-open" style="background:#fff;color:#0b2a4a;border:0;border-radius:10px;padding:6px 12px;font-weight:800">${t('cookie_prefs')}</button>`;
    document.body.appendChild(bar);
    document.getElementById("cc-yes").onclick=()=>{cSet("yes"); bar.remove(); loadAnalytics();};
    document.getElementById("cc-open").onclick=openPrefs;
  }
  const modal=document.createElement("div"); modal.id="cc-modal"; modal.style="position:fixed;inset:0;background:rgba(0,0,0,.45);display:none;z-index:10000";
  modal.innerHTML=`<div style="max-width:520px;margin:12vh auto;background:#fff;border-radius:14px;padding:18px">
    <h3>Cookies</h3><p>Enable privacy-friendly analytics?</p>
    <form id="cc-form" style="display:grid;gap:8px">
      <label><input id="cc-ana" type="checkbox"> Analytics</label>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button type="button" id="cc-cancel">Cancel</button>
        <button type="submit" style="background:#0b2a4a;color:#fff;border:0;border-radius:10px;padding:6px 12px;font-weight:800">Save</button>
      </div>
    </form></div>`;
  document.body.appendChild(modal);
  document.getElementById("cc-cancel").onclick=()=>modal.style.display="none";
  document.getElementById("cc-form").onsubmit=(e)=>{e.preventDefault(); cSet(document.getElementById("cc-ana").checked?"yes":"no"); modal.style.display="none"; if(cGet()==="yes") loadAnalytics(); else location.reload();};
  window.openPrefs=()=>{modal.style.display="block"; document.getElementById("cc-ana").checked=(cGet()==="yes");};
}

/* Prelaunch banner (if used) */
function buildPrelaunch(){
  if(!PRELAUNCH) return;
  const bar=document.createElement("div");
  bar.style="position:sticky;top:0;z-index:9998;background:#0b2a4a;color:#fff;padding:8px 12px;text-align:center";
  bar.innerHTML=`${t('prelaunch')} • ${CONTACT_EMAIL}`;
  document.body.prepend(bar);
}

document.addEventListener("DOMContentLoaded",()=>{applyI18n();buildConsent();loadAnalytics();buildPrelaunch();});
