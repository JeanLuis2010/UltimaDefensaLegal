/* UDL language toggle — no 404s if files exist as named below */
(function () {
  function file(path){ return (path.split('/').pop() || 'index.html') || 'index.html'; }

  function pair(name){
    if (name === 'index.html') return 'es-index.html';
    if (name === 'es-index.html') return 'index.html';
    if (name === 'cities.html') return 'ciudades.html';
    if (name === 'ciudades.html') return 'cities.html';
    if (/-attorneys\.html$/i.test(name)) return name.replace(/-attorneys\.html$/i,'-abogados.html');
    if (/-abogados\.html$/i.test(name)) return name.replace(/-abogados\.html$/i,'-attorneys.html');
    // fallback to homes
    return name.startsWith('es-') ? 'index.html' : 'es-index.html';
  }

  function nav(to){
    // Soft-check: try navigating; if missing, fall back to the right home page
    var target = to;
    var img = new Image();
    img.onload = function(){ location.href = '/' + target; };
    img.onerror = function(){
      if (/^es-|abogados\.html$|^ciudades\.html$/.test(target)) location.href = '/es-index.html';
      else location.href = '/index.html';
    };
    img.src = '/' + target + (target.includes('?') ? '&' : '?') + 'udl=1#';
  }

  function mountToggle(){
    var here = file(location.pathname);
    var twin = pair(here);
    var box = document.createElement('div'); box.className = 'udl-lang';
    var en = document.createElement('a'); en.textContent='EN';
    var es = document.createElement('a'); es.textContent='ES';
    // clicking chooses the counterpart directly
    en.href = '/' + (/-abogados\.html$|^es-|^ciudades\.html$/.test(here) ? twin : here);
    es.href = '/' + (/-attorneys\.html$|^index\.html$|^cities\.html$/.test(here) ? twin : here);
    en.addEventListener('click', function(e){ e.preventDefault(); nav(this.pathname.replace(/^\//,'')); });
    es.addEventListener('click', function(e){ e.preventDefault(); nav(this.pathname.replace(/^\//,'')); });
    // visual hint of active language
    if (/^es-|abogados\.html$|^ciudades\.html$/.test(here)) es.style.opacity = '0.6'; else en.style.opacity = '0.6';
    box.appendChild(en); box.appendChild(es); document.body.appendChild(box);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountToggle);
  else mountToggle();
})();
