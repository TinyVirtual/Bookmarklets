function parse_idx(idx){
  let lines = idx.split("\n")
  lines.forEach((a,i)=>{lines[i]=a.trim()});

  let variables = [];
  let entries = {};
  let attributes = {
    custom: {}
  };

  let lookup = {
    "false":!1,
    "true":!0,
    "null":null,
    "[]":[]
  }

  lines.forEach((a,i)=>{
    if(a.startsWith("$+")){
      attributes.sufix = a.replace(/^\$\+|\"/g,"")
    }
    if(a.startsWith("$-")){
      attributes.prefix = a.replace(/^\$-|\"/g,"")
    }
    if((/^\$<.+>=/).test(a)){
      let n = a.replace(/^\$<|>=.*$/gm,"");
      let v = a.replace(/^\$<.+>=/g,"");
      attributes.custom[n] = v
    }
    if((/^\$\[[^$@\{\}]+\]=.+/gm).test(a)){
      variables.push({
        symbol: a.replace(/^\$\[|\]=\w+$/g,""),
        name: a.replace(/^\$\[.+\]=/gm,"")
      })
    }
  })

  let current_id = "";
  
  for(let i = 0; i < lines.length; i++){
    if(current_id && lines[i].length){
      let v = variables.find(l => l.symbol == lines[i][0])
      if(v){
        entries[current_id][v.name] = lines[i].slice(2)
        if(!isNaN(Number(lines[i].slice(2)))){
          entries[current_id][v.name] = Number(lines[i].slice(2))
        }
        if(Object.keys(lookup).includes(lines[i].slice(2))){
          entries[current_id][v.name] = lookup[lines[i].slice(2)]
        }
        if((/^\[.+(?<![\\,])\]/).test(lines[i].slice(2))){
          entries[current_id][v.name] = lines[i].slice(2).trim().replace(/^\[|\]$/gm,"").split(/(?<![\\]),/g)
          entries[current_id][v.name].forEach((q,w)=>{
            entries[current_id][v.name][w] = q.replaceAll(/\\./gm,x=>x[1])
            
            if(!isNaN(Number(q)) ){
              entries[current_id][v.name][w] = Number(q)
            }
            if(Object.keys(lookup).includes(q)){
              entries[current_id][v.name][w] = lookup[q]
            }
          })
        }

      }
      if(lines[i].startsWith("}")){
        current_id = ""
      }
    } else {
      if( (/^\s*@/).test(lines[i]) ){
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
      if(typeof entries[k][v.name] === "undefined"){
        entries[k][v.name] = "";
      }
    }
  }
  return { entries, attributes, variables }
}
