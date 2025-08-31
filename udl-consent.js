/* udl-consent.js — consent banner + analytics loader */
(function(){
  const KEY="udl_cookie_consent_v1";
  const store=window.localStorage;
  const read=()=>{ try{return JSON.parse(store.getItem(KEY)||"{}")}catch{return{}} };
  const write=o=>{ store.setItem(KEY, JSON.stringify(o||{})) };
  const dnt =()=> (navigator.doNotTrack==="1"||window.doNotTrack==="1");
  function loadGA(id){
    if(!id) return;
    const s1=document.createElement('script'); s1.async=true;
    s1.src=`https://www.googletagmanager.com/gtag/js?id=${id}`; document.head.appendChild(s1);
    const s2=document.createElement('script');
    s2.innerHTML=`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
      gtag('js', new Date()); gtag('config','${id}',{anonymize_ip:true});`;
    document.head.appendChild(s2);
  }
  function maybeLoad(){
    if(dnt()) return;
    const c=read();
    if(c.analytics){ loadGA('G-XXXXXXXXXX'); } // TODO: set your GA4 ID
  }
  function banner(){
    if(document.getElementById('udl-cookie-banner')) return;
    const wrap=document.createElement('div');
    wrap.id='udl-cookie-banner';
    wrap.style.cssText="position:fixed;bottom:0;left:0;right:0;background:#111;color:#fff;padding:.8rem;z-index:9999;box-shadow:0 -4px 12px rgba(0,0,0,.15)";
    wrap.innerHTML=`<div style="max-width:1100px;margin:0 auto;display:flex;gap:.75rem;align-items:center;justify-content:space-between;flex-wrap:wrap">
      <div style="max-width:70ch;font-size:.95rem">
        <span class="i18n-es">Usamos cookies para analítica y mejorar el servicio. Puedes aceptar o rechazar analítica.</span>
        <span class="i18n-en" style="display:none">We use cookies for analytics and service improvement. You can accept or decline analytics.</span>
      </div>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap">
        <button id="udl-dec" style="background:#fff;color:#111;border:1px solid #fff;border-radius:10px;padding:.5rem .8rem">Declinar</button>
        <button id="udl-acc" style="background:#00a55f;color:#fff;border:1px solid #00a55f;border-radius:10px;padding:.5rem .8rem">Aceptar</button>
      </div></div>`;
    document.body.appendChild(wrap);
    const lang=document.documentElement.getAttribute('lang')||'es';
    wrap.querySelectorAll('.i18n-en').forEach(el=>el.style.display=(lang==='en'?'inline':'none'));
    wrap.querySelectorAll('.i18n-es').forEach(el=>el.style.display=(lang==='en'?'none':'inline'));
    wrap.querySelector('#udl-dec').onclick=()=>{write({analytics:false});wrap.remove();};
    wrap.querySelector('#udl-acc').onclick=()=>{write({analytics:true});wrap.remove();maybeLoad();};
  }
  window.UDL_CONSENT={track:(n,p)=>{const c=read(); if(!c.analytics||typeof window.gtag!=='function')return; window.gtag('event',n,p||{});}};
  document.addEventListener('DOMContentLoaded',()=>{
    const c=read();
    if(c.analytics===true||c.analytics===false) maybeLoad(); else banner();
  });
})();
