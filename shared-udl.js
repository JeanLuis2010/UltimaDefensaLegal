<!-- Keep this file as pure JS; the tag here is just to mark the language -->
   (function () {
  // Utilities
  function filename(path){ return path.split('/').pop() || 'index.html'; }
  function swapName(name){
    // English <-> Spanish pairs
    if (name === 'index.html') return 'es-index.html';
    if (name === 'es-index.html') return 'index.html';
    if (name === 'cities.html') return 'ciudades.html';
    if (name === 'ciudades.html') return 'cities.html';

    // City patterns
    if (/-attorneys\.html$/i.test(name)) return name.replace(/-attorneys\.html$/i, '-abogados.html');
    if (/-abogados\.html$/i.test(name)) return name.replace(/-abogados\.html$/i, '-attorneys.html');

    // Fallback to home
    return (name.indexOf('es-') === 0 ? 'index.html' : 'es-index.html');
  }

  function go(to){
    // Navigate safely; if a bad link ever slips in, land on home in same locale
    var img = new Image();
    img.onload = function(){ location.href = to; };
    img.onerror = function(){
      // Decide locale by target
      if (/^es-/.test(to) || /abogados\.html$/.test(to)) location.href = '/es-index.html';
      else location.href = '/index.html';
    };
    // ping a lightweight resource on that path
    img.src = to + (to.indexOf('?')>-1 ? '&' : '?') + 'udl=1#';
  }

  function makeLangToggle(){
    var here = filename(location.pathname);
    var counterpart = swapName(here);

    // create container
    var box = document.createElement('div');
    box.className = 'udl-lang';

    var en = document.createElement('a');
    en.textContent = 'EN';
    en.href = (/-abogados\.html$|^es-/.test(here)) ? counterpart : here;
    en.addEventListener('click', function(e){ e.preventDefault(); go(en.href); });

    var es = document.createElement('a');
    es.textContent = 'ES';
    es.href = (/-attorneys\.html$|^index\.html$|cities\.html$/i.test(here)) ? counterpart : here;
    es.addEventListener('click', function(e){ e.preventDefault(); go(es.href); });

    // active state by dimming the current locale
    if (/^es-|abogados\.html$/i.test(here)) { es.style.opacity='0.6'; }
    else { en.style.opacity='0.6'; }

    box.appendChild(en); box.appendChild(es);
    document.body.appendChild(box);
  }

  // Run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', makeLangToggle);
  } else {
    makeLangToggle();
  }
})();
