javascript:(()=>{
  /* Vibrato Sound effect, by TinyVirtual */ 
  /* Sorry if junky code, i was lazy ;-; */
  let tg = [...document.querySelectorAll("video,audio")]
           .filter(r=>!r.paused)[0];
  if(!tg){
    alert("Couldn't find a playing video!");
    return -1;
  }; 
  (async(c)=>{
    window.meme = true; 
    (async(a)=>{ 
      if(c.s){
        a.currentTime=0
      };
      let but = document.createElement("button"); 
      document.body.appendChild(but); 
      but.innerText = "Stop vibrato"; 
      but.style = 'position:absolute;color:white;display:flex;top:10px;left:10px;padding:18px;z-index:2147483647;border:none;background:red;border-radius:15px;';
      but.addEventListener("click",()=>{
        window.meme=!1;
        a.preservesPitch=!0; 
        but.remove(); 
        a.playbackRate=1
      }); 
      a.preservesPitch=!1; 
      while(window.meme){ 
        a.playbackRate = (2**(Math.sin(Date.now()/c.d) * c.n)); 
        await new Promise(r=>setTimeout(r,c.w)); 
      } 
    })
    ()
  })
  (/* vibrato effect settings */
    {
      d:
        Math.abs(
          Number(
            prompt("Frequency (50: Fast; 80: Slow)")
          )
        )||80,
      n:
        Math.min(
          Math.abs(
            Number(
              prompt("Depth (0.3: Funny, 0.8: Noise)")
            )
          )
        ||0.3,1.4),
      w:
        Math.max(
          Math.abs(
            Number(
              prompt("Delay (in ms, recomended 10)")
            )
          )
        ||10,10),
      s:confirm("Restart video?")
    }
  )
})();
/* klet.js$title=[Vibrato Effect]$desc=[add a vibrato effect to currently playing video or audio] */
