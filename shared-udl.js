// shared-udl.js  — ONE FILE ONLY. Paste whole file.
// Purpose: Top-right EN/ES toggle across site + page pairing (EN<->ES)

(function () {
  // ---------- Styles: pin toggle at TOP RIGHT on all pages ----------
  var style = document.createElement('style');
  style.textContent = `
    #lang-toggle {
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 9999;
      background: #0f1a2b;
      color: #fff;
      padding: 8px 12px;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 700;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
      box-shadow: 0 2px 8px rgba(0,0,0,.15);
      letter-spacing:.2px;
    }
    #lang-toggle:hover { opacity: .92; }
  `;
  document.head.appendChild(style);

  // ---------- Helpers ----------
  function filename(path){ return (path.split('/').pop() || 'index.html'); }

  // Pair EN <-> ES for index/cities
  function swapStatic(name){
    if (name === 'index.html') return 'es-index.html';
    if (name === 'es-index.html') return 'index.html';
    if (name === 'cities.html') return 'ciudades.html';
    if (name === 'ciudades.html') return 'cities.html';
    return null;
  }

  // Pair EN <-> ES for city pages (…-attorneys.html <-> …-abogados.html)
  function swapCity(name){
    if (/-attorneys\.html$/i.test(name))  return name.replace('-attorneys.html', '-abogados.html');
    if (/-abogados\.html$/i.test(name))   return name.replace('-abogados.html',  '-attorneys.html');
    return null;
  }

  // ---------- Build toggle ----------
  var current = filename(location.pathname);
  var target  = swapStatic(current) || swapCity(current);

  var a = document.createElement('a');
  a.id = 'lang-toggle';
  if (/-abogados\.html$|^es-/.test(current)) {
    a.textContent = 'EN';
  } else {
    a.textContent = 'ES';
  }
  a.href = target || (/-abogados\.html$|^es-/.test(current) ? 'index.html' : 'es-index.html');
  document.body.appendChild(a);
})();
