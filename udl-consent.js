<script>
// UDL_CONSENT: Cookie banner + analytics loader with consent
(function(){
  const KEY = "udl_cookie_consent_v1";
  const store = window.localStorage;

  function hasConsent(){ try { return JSON.parse(store.getItem(KEY) || "{}"); } catch { return {}; } }
  function saveConsent(obj){ store.setItem(KEY, JSON.stringify(obj||{})); }
  function dntOn(){ return (navigator.doNotTrack === "1" || window.doNotTrack === "1"); }

  function loadGA(measurementId){
    if (!measurementId) return;
    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(s1);

    const s2 = document.createElement('script');
    s2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', '${measurementId}', { anonymize_ip: true });
    `;
    document.head.appendChild(s2);
  }

  function ensureBanner(){
    if (document.getElementById('udl-cookie-banner')) return;
    const wrap = document.createElement('div');
    wrap.id = 'udl-cookie-banner';
    wrap.style.cssText = "position:fixed;bottom:0;left:0;right:0;background:#111;color:#fff;padding:.8rem;z-index:9999;box-shadow:0 -4px 12px rgba(0,0,0,.15)";
    wrap.innerHTML = `
      <div style="max-width:1100px;margin:0 auto;display:flex;gap:.75rem;align-items:center;justify-content:space-between;flex-wrap:wrap">
        <div style="max-width:70ch;font-size:.95rem;line-height:1.4">
          <span class="i18n-es">Usamos cookies para analítica y mejorar el servicio. Puedes aceptar o rechazar analítica.</span>
          <span class="i18n-en" style="display:none">We use cookies for analytics and service improvement. You can accept or decline analytics.</span>
        </div>
        <div style="display:flex;gap:.5rem;flex-wrap:wrap">
          <button id="udl-decline" style="background:#fff;color:#111;border:1px solid #fff;border-radius:10px;padding:.5rem .8rem">Declinar</button>
          <button id="udl-accept" style="background:#00a55f;color:#fff;border:1px solid #00a55f;border-radius:10px;padding:.5rem .8rem">Aceptar</button>
        </div>
      </div>`;
    document.body.appendChild(wrap);

    // Language reflect
    const lang = document.documentElement.getAttribute('lang') || 'es';
    wrap.querySelectorAll('.i18n-en').forEach(el=> el.style.display = (lang==='en'?'inline':'none'));
    wrap.querySelectorAll('.i18n-es').forEach(el=> el.style.display = (lang==='en'?'none':'inline'));

    wrap.querySelector('#udl-decline').onclick = () => { saveConsent({analytics:false}); wrap.remove(); };
    wrap.querySelector('#udl-accept').onclick  = () => { saveConsent({analytics:true}); wrap.remove(); maybeLoad(); };
  }

  function maybeLoad(){
    const c = hasConsent();
    if (dntOn()) return; // Respect Do Not Track
    if (c.analytics) {
      // TODO: replace with your GA4 Measurement ID
      loadGA('G-XXXXXXXXXX');
    }
  }

  // Public API for event tracking
  window.UDL_CONSENT = {
    track: (name, params) => {
      const c = hasConsent(); if (!c.analytics || typeof window.gtag !== 'function') return;
      window.gtag('event', name, params || {});
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    const saved = hasConsent();
    if (saved.analytics === true || saved.analytics === false){ maybeLoad(); }
    else { ensureBanner(); }
  });
})();
</script>
