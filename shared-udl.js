<!-- shared-udl.js (site-wide drop-in) -->
(function () {
  // ---------- helpers ----------
  function bySel(s, r) { return (r||document).querySelector(s); }
  function mk(tag, attrs){ const el=document.createElement(tag); if(attrs){for(const k in attrs){el.setAttribute(k, attrs[k]);}} return el; }

  // get filename like "newyork-attorneys.html"
  const file = (location.pathname.split("/").pop() || "").toLowerCase();

  // Extract city + type (attorneys | attorney | abogados)
  const m = file.match(/^([a-z-]+)-(attorneys|attorney|abogados)\.html$/i);
  if (!m) return; // not a city page → nothing to do
  const city = m[1];
  const type = m[2];

  // Cities where EN uses singular '...-attorney.html'
  const singularEN = new Set(["philadelphia"]); // extend here if you add more one-offs

  // Compute partner filename (the other language)
  function partnerOf(filename){
    const mm = filename.match(/^([a-z-]+)-(attorneys|attorney|abogados)\.html$/i);
    if(!mm) return null;
    const c = mm[1], t = mm[2];

    // ES → EN
    if (t === "abogados") {
      return singularEN.has(c) ? `${c}-attorney.html` : `${c}-attorneys.html`;
    }
    // EN plural → ES
    if (t === "attorneys") return `${c}-abogados.html`;
    // EN singular → ES
    if (t === "attorney") return `${c}-abogados.html`;
    return null;
  }

  const isES = (type === "abogados");
  const partner = partnerOf(file);
  if (!partner) return;

  // ---------- build toggle ----------
  const li = mk("li", { class: "lang-toggle" });
  const aEN = mk("a", { id: "toggle-en", href: isES ? partner : file });
  const aES = mk("a", { id: "toggle-es", href: isES ? file : partner });
  aEN.textContent = "EN"; aES.textContent = "ES";
  (isES ? aES : aEN).classList.add("active");

  // Try to append to first nav ul
  let container = bySel("nav ul") || bySel("header ul");
  if (container) {
    li.append(" ");
    li.appendChild(aEN);
    li.append(" | ");
    li.appendChild(aES);
    container.appendChild(li);
  } else {
    // Fallback: fixed small toggle bottom-right
    const box = mk("div", { class: "lang-toggle-fixed" });
    box.appendChild(aEN); box.append(" | "); box.appendChild(aES);
    document.body.appendChild(box);
    const style = document.createElement("style");
    style.textContent = `
      .lang-toggle-fixed{position:fixed;right:12px;bottom:12px;background:#1e293b;color:#fff;
        padding:6px 10px;border-radius:8px;font:14px/1.2 Arial,Helvetica,sans-serif;z-index:9999}
      .lang-toggle-fixed a{color:#fff;text-decoration:none;margin:0 2px}
      .lang-toggle-fixed a.active{text-decoration:underline;font-weight:700}
    `;
    document.head.appendChild(style);
  }

  // Minimal styling if added inside nav
  const style2 = document.createElement("style");
  style2.textContent = `
    .lang-toggle a{color:inherit;text-decoration:none}
    .lang-toggle a.active{font-weight:700;text-decoration:underline}
  `;
  document.head.appendChild(style2);
})();
