(function () {
  // Utilities
  function filename(path) {
    return path.split('/').pop() || 'index.html';
  }

  function swapName(name) {
    // English <-> Spanish pairs
    if (name === 'index.html') return 'es-index.html';
    if (name === 'es-index.html') return 'index.html';
    if (name === 'cities.html') return 'ciudades.html';
    if (name === 'ciudades.html') return 'cities.html';

    // City patterns
    if (/-attorneys\.html$/i.test(name))
      return name.replace('-attorneys.html', '-abogados.html');
    if (/-abogados\.html$/i.test(name))
      return name.replace('-abogados.html', '-attorneys.html');

    // Fallback to home
    return name.indexOf('es-') === 0 ? 'index.html' : 'es-index.html';
  }

  function go(to) {
    window.location.href = to;
  }

  function toggleLanguage() {
    var current = filename(window.location.pathname);
    var target = swapName(current);
    go(target);
  }

  // Create toggle buttons
  function createToggle() {
    var wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.top = '10px';
    wrapper.style.left = '10px';
    wrapper.style.zIndex = '9999';

    var enButton = document.createElement('button');
    enButton.textContent = 'EN';
    enButton.onclick = function () {
      var current = filename(window.location.pathname);
      if (current.startsWith('es-') || current === 'ciudades.html' || /-abogados\.html$/i.test(current)) {
        toggleLanguage();
      }
    };

    var esButton = document.createElement('button');
    esButton.textContent = 'ES';
    esButton.style.marginLeft = '5px';
    esButton.onclick = function () {
      var current = filename(window.location.pathname);
      if (!current.startsWith('es-') && current !== 'ciudades.html' && !/-abogados\.html$/i.test(current)) {
        toggleLanguage();
      }
    };

    wrapper.appendChild(enButton);
    wrapper.appendChild(esButton);
    document.body.appendChild(wrapper);
  }

  // Init on page load
  document.addEventListener('DOMContentLoaded', createToggle);
})();
