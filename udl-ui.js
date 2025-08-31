/* udl-ui.js
   Global bilingual toggle for Ultima Defensa Legal (EN/ES)
   - Stores choice in localStorage
   - Spanish is the default if nothing is saved
   - Applies <html lang="..."> so your .i18n-en / .i18n-es CSS works
   - Emits a "udl:langchange" event for other scripts to react if needed
*/
(function () {
  const KEY = "udl_lang";
  const FALLBACK = "es"; // default to Spanish

  function getSaved() {
    try { return localStorage.getItem(KEY); } catch { return null; }
  }
  function save(lang) {
    try { localStorage.setItem(KEY, lang); } catch {}
  }
  function normalize(lang) {
    if (!lang) return FALLBACK;
    lang = String(lang).toLowerCase();
    if (lang.startsWith("en")) return "en";
    if (lang.startsWith("es")) return "es";
    return FALLBACK;
  }
  function apply(lang) {
    lang = normalize(lang);
    document.documentElement.setAttribute("lang", lang);
    // Fire a custom event in case other scripts or banners want to react
    try {
      document.dispatchEvent(new CustomEvent("udl:langchange", { detail: { lang } }));
    } catch {}
  }

  const API = {
    setLang(lang) { save(normalize(lang)); apply(lang); },
    getLang() { return normalize(getSaved() || document.documentElement.getAttribute("lang") || FALLBACK); },
    toggle() { API.setLang(API.getLang() === "en" ? "es" : "en"); },
    init() {
      // If nothing saved, default to Spanish (or use browser as a soft hint)
      let lang = getSaved();
      if (!lang) {
        const hint = (navigator.language || navigator.userLanguage || "").toLowerCase();
        lang = hint.startsWith("es") ? "es" : FALLBACK; // keep Spanish default
        save(lang);
      }
      apply(lang);
    }
  };

  // Expose and initialize
  window.UDL_UI = API;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", API.init);
  } else {
    API.init();
  }
})();
