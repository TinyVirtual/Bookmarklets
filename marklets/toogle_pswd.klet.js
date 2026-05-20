javascript:(()=>{
  if(window.__psw_on){
    window.__psw_inputs.forEach((a)=>{
      window.__psw_on = !1;
      a.type = "password";
    });
  } else {
    window.__psw_inputs = document.querySelectorAll('input[type="password"]');
    window.__psw_on = !0;
    window.__psw_inputs.forEach((a)=>{
      a.type = "text";
    });
  }
  
  let notif = document.createElement("div");
  notif.style=`display:flex;width:100%;position:absolute;top:0px;left:0px;justify-content:center;align-items:center;align-content:center;flex-direction:column;opacity:1;`;
  document.body.appendChild(notif);
  notif.innerHTML = `<div style="min-width:50%;max-width:90%;word-break:break-all;background:#59B;border-radius:15px;color:#fff;padding:16px 24px;opacity:1;">Passwords are now ${window.__psw_on?"Shown":"Hidden"}</div>`;
  notif.addEventListener("click",()=>{
    notif.remove();
    notif = null;
  });
  (async()=>{
    await new Promise(r=>setTimeout(r,2000))
    while(notif&&Number(notif.style.opacity)>0){
      notif.style.opacity = Number(notif.style.opacity)-0.0125;
      await new Promise(r=>setTimeout(r,10));
    }
    if(notif){notif.remove()}
  })();
})()
