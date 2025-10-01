// shared-auth.js — keep this in the site root and include on pages below.
(function () {
  const KEY = 'udl_member_v1';
  const DAYS = 400; // long-lived, you can shorten later

  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + d.toUTCString() + ";path=/;SameSite=Lax";
  }
  function getCookie(name) {
    const m = document.cookie.match(new RegExp('(^| )'+name+'=([^;]+)'));
    return m ? decodeURIComponent(m[2]) : null;
  }

  // Expose a tiny API
  window.UDLAUTH = {
    isMember() {
      try {
        const ls = localStorage.getItem(KEY);
        if (ls === 'true') return true;
      } catch (_) {}
      const ck = getCookie(KEY);
      return ck === 'true';
    },
    setMember(active) {
      const v = active ? 'true' : 'false';
      try { localStorage.setItem(KEY, v); } catch(_) {}
      setCookie(KEY, v, DAYS);
    },
    requireMember(redirectTo='subscribe.html') {
      if (!this.isMember()) {
        // Preserve where they tried to go
        const back = encodeURIComponent(location.pathname + location.search + location.hash);
        location.href = redirectTo + '?back=' + back;
      }
    },
    clear() { this.setMember(false); }
  };
})();
