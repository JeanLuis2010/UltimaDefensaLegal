/* UDL global language toggle */
(function(){
  const KEY = "udl_lang";
  function applyLang(l){
    const lang = (l||"es").toLowerCase().startsWith("es")?"es":"en";
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll('.lang-switch button')
      .forEach(b=>b.classList.toggle('active',(b.dataset.setlang||'').toLowerCase()===lang));
  }
  window.setLang=function(l){localStorage.setItem(KEY,l);applyLang(l)};
  document.addEventListener('DOMContentLoaded',()=>{
    const url = new URLSearchParams(location.search);
    const lang = url.get('lang') || localStorage.getItem(KEY) || 'es';
    applyLang(lang);
    document.querySelectorAll('.lang-switch button[type="button"]').forEach(btn=>btn.addEventListener('click',e=>e.currentTarget.blur()));
  });
})();
