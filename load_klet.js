function parse_idx(idx){
  let lines = idx.split("\n")
  lines.forEach((a,i)=>{lines[i]=a.trim()});

  let variables = [];
  let entries = {};
  let sufix = "";

  lines.forEach((a,i)=>{
    if(a.startsWith("$+")){
      sufix = a.replace(/^\$\+|\"/g,"")
    }
    if((/^\$\[.\]=.+/gm).test(a)){
      variables.push({
        symbol: a.replace(/^\$\[|\]=\w+$/g,""),
        name: a.replace(/^\$\[.\]=/gm,"")
      })
    }
  })

  let current_id = "";
  
  for(let i = 0; i < lines.length; i++){
    if(current_id){
      if(variables.map(l=>l.symbol).includes(lines[i].trim()[0])){
        let v = variables.filter(l=>l.symbol==lines[i].trim()[0])[0]
        entries[current_id][v.name] = lines[i].substring(2,0xFFFF)
      }
      if(lines[i][0]=="}"){
        current_id = ""
      }
    } else {
      if( (/^\s*@/gm).test(lines[i]) ){
        let name = lines[i].replace(/^@|=\{$/gm,"")
        entries[name]={
          __filename:name
        };
        current_id=name
      }
    }
  }

  let entries_keys = Object.keys(entries)
  for(let k of entries_keys){
    for(let v of variables){
      if(!entries[k][v.name]){
        entries[k][v.name] = "";
      }
    }
  }
  return { entries, sufix, variables }
}
