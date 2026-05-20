javascript:(()=>{
document.documentElement.innerHTML = 
`<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" id="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body style="margin:0px; background:#f0e9e5;">
    <header style="padding: 00px 16px;background: linear-gradient(180deg, #48d, #5ae); display: flex; flex-direction: column; align-items: center; align-content: center;">
      <h1 style="color: white; font-size: 24px; font-family: sans-serif;">Access Denied.</h1>
    </header>
    <div style="display:flex; flex-direction: column; flex-wrap: wrap; overflow: hidden; max-width: 95%;font-family: sans-serif;">
      <h1 style="margin: 5px; padding-left:3px; border-left: 5px #48d solid; font-size: 20px;">The domain ${window.location.hostname} has been blocked by your institution.</h1>
      <p style="margin: 0px 5px;">Accessing the domain ${window.location.hostname} and all related services has been restricted by your institution while within the campus perimeter.</p>
      <p style="margin: 0px 5px;"></p>
      <br>
      <p style="margin: 0px 5px;font-size: 12px; color: #444;">Block UID: 0007fa${ (Math.random() * 255).toString(16).padStart(2, "0")}</p>      
    </div>    
  </body>
</html>`
})();
/* klet.js$title=[Fake block] */
