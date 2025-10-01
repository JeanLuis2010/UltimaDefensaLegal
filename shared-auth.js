// shared-auth.js — simple membership/session helper
(function () {
  const CK = 'udl_member_token';
  const ID = 'udl_member_id';
  const DAYS = 400;

  function setCookie(n,v,days){const d=new Date();d.setTime(d.getTime()+days*864e5);document.cookie=`${n}=${encodeURIComponent(v)};expires=${d.toUTCString()};path=/;SameSite=Lax`}
  function getCookie(n){const m=document.cookie.match(new RegExp('(^| )'+n+'=([^;]+)'));return m?decodeURIComponent(m[2]):null;}

  window.UDLAUTH = {
    save(token, memberId){ try{localStorage.setItem(CK,token);localStorage.setItem(ID,memberId);}catch(_){}
      setCookie(CK,token,DAYS); setCookie(ID,memberId,DAYS); },
    token(){ try{const v=localStorage.getItem(CK); if(v) return v;}catch(_){}
      return getCookie(CK); },
    memberId(){ try{const v=localStorage.getItem(ID); if(v) return v;}catch(_){}
      return getCookie(ID); },
    clear(){ this.save('', ''); },
    requireToken(redirect='subscribe.html'){
      if(!this.token()){ const back=encodeURIComponent(location.pathname+location.search+location.hash);
        location.href = `${redirect}?back=${back}`; }
    }
  };
})();
