const DATA=__JUDO_DATA_JSON__;
(()=>{
'use strict';const $=id=>document.getElementById(id);const ns='http://www.w3.org/2000/svg';const N=Object.fromEntries(DATA.nodes.map(n=>[n.id,n]));const S=(tag,at={},parent)=>{const e=document.createElementNS(ns,tag);for(const [k,v]of Object.entries(at))e.setAttribute(k,String(v));if(parent)parent.append(e);return e};const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cols={start:190,hold:655,lever:1130,choke:1600};const palette={start:'#147d6e',hold:'#2563eb',lever:'#b45309',choke:'#7c3aed'};const backgrounds={start:'#e5f7f1',hold:'#ebf3ff',lever:'#fff2df',choke:'#f3eaff'};const typeNames={start:'Einstieg',hold:'Osaekomi-waza',lever:'Kansetsu-waza',choke:'Shime-waza'};
for(const cat of Object.keys(cols)){const arr=DATA.nodes.filter(n=>n.group===cat);arr.forEach((n,i)=>{n.x=cols[cat];n.y=cat==='start'?116+i*140:cat==='choke'?115+i*93:155+i*106;n.w=cat==='start'?360:340;n.h=50;})}
const view={x:-50,y:-32,w:1980,h:1260};let focus='',start='',cycleIdx=-1,chainIdx=-1,showCross=true,showMaybe=true,customView=null;const svg=$('graph');const cycles=[['k1','w10','k1'],['k0','k2','k0'],['h0','h6','h7','h0'],['h4','h5','h6','h4'],['w4','w3','w8','w1','k1','w10','w4']];
function setView(){svg.setAttribute('viewBox',[view.x,view.y,view.w,view.h].join(' '))}function fit(){view.x=-50;view.y=-32;view.w=1980;view.h=1260;setView()}function zoom(f,p){const px=p?p.x:view.x+view.w/2,py=p?p.y:view.y+view.h/2,old=view.w,nw=Math.min(3700,Math.max(380,old*f));view.x=px-(px-view.x)*(nw/old);view.y=py-(py-view.y)*(nw/old);view.h*=nw/old;view.w=nw;setView()}function coord(e){let r=svg.getBoundingClientRect();return{x:view.x+(e.clientX-r.left)*view.w/r.width,y:view.y+(e.clientY-r.top)*view.h/r.height}}
const valid=()=>DATA.edges.filter(e=>(showMaybe||!e.uncertain)&&(showCross||e.a[0]==='s'||N[e.a].group!==N[e.b].group));
function reachable(s,es){const done=new Set([s]),queue=[s];while(queue.length){let a=queue.shift();for(const e of es)if(e.a===a&&!done.has(e.b)){done.add(e.b);queue.push(e.b)}}return done}
function curve(a,b,ei){const same=a.group===b.group,side=b.x>a.x?1:-1;if(same){const dx=87+(ei%5)*21;return `M${a.x+a.w/2},${a.y} C${a.x+a.w/2+dx},${a.y} ${b.x+b.w/2+dx},${b.y} ${b.x+b.w/2},${b.y}`;}const x0=a.x+side*a.w/2,x1=b.x-side*b.w/2,spread=(x1-x0)*.45;return `M${x0},${a.y} C${x0+spread},${a.y} ${x1-spread},${b.y} ${x1},${b.y}`;}
function activePath(){if(cycleIdx>=0)return null;if(customView)return customView;if(builderPreview&&builder.tech.length&&builder.start)return builder;return chainIdx>=0?DATA.chains[chainIdx]:null}
function paint(){svg.replaceChildren();const defs=S('defs',{},svg);for(const [key,color]of [['normal','#8ca1b7'],['active','#e38416']]){let m=S('marker',{id:key,markerWidth:9,markerHeight:9,refX:7.3,refY:4.5,orient:'auto',markerUnits:'userSpaceOnUse'},defs);S('path',{d:'M0,1 L8,4.5 L0,8 Z',fill:color},m)}const lines=S('g',{},svg),boxes=S('g',{},svg);const es=valid(),reach=start?reachable(start,es):null,c=activePath(),highlightPath=new Set(c?c.tech.slice(1).map((x,i)=>c.tech[i]+'>'+x):[]),selectedNodes=new Set(c?[c.start,...c.tech]:[]);const cyc=cycleIdx>=0?cycles[cycleIdx]:null;const cycEdges=new Set(cyc?cyc.slice(1).map((x,i)=>cyc[i]+'>'+x):[]);if(cyc)cyc.forEach(x=>selectedNodes.add(x));
for(const [cat,title]of [['start','STARTPUNKTE'],['hold','HALTEGRIFFE'],['lever','HEBEL'],['choke','WÜRGER']]){S('text',{x:cols[cat],y:45,'text-anchor':'middle','font-size':21,'font-weight':750,fill:palette[cat]},boxes).textContent=title;S('line',{x1:cols[cat]-170,x2:cols[cat]+170,y1:63,y2:63,stroke:palette[cat],'stroke-width':2,'stroke-opacity':.5},boxes)}
for(const [idx,e]of es.entries()){const a=N[e.a],b=N[e.b];let op=e.uncertain?.22:.31,stroke='#879ab0',width=1.6;if(reach&&(!reach.has(e.a)||!reach.has(e.b)))op=.035;if(start&&a.group==='start'&&a.id!==start)op=.035;if(focus){let rel=e.a===focus||e.b===focus;op=rel?1:.025;if(rel){stroke=e.a===focus?'#147d6e':'#2563eb';width=3.4}}if(c){let active=highlightPath.has(e.a+'>'+e.b)||(e.a===c.start&&e.b===c.tech[0]);op=active?1:.015;if(active){stroke='#e38416';width=3.8}}if(cyc){let active=cycEdges.has(e.a+'>'+e.b);op=active?1:.015;if(active){stroke='#e38416';width=3.8}}const p=S('path',{d:curve(a,b,idx),fill:'none',stroke,'stroke-opacity':op,'stroke-width':width,'stroke-dasharray':e.uncertain?'6 6':'none','marker-end':op>=.8?'url(#active)':'url(#normal)'},lines);S('title',{},p).textContent=a.name+' → '+b.name+(e.note?'\n'+e.note:'')+(e.uncertain?'\nBedingter Übergang / unsichere Klassifikation':'');}
for(const n of DATA.nodes){let op=1;if(reach&&!reach.has(n.id))op=.17;if(start&&n.group==='start'&&n.id!==start)op=.17;if(focus&&n.id!==focus&&!es.some(e=>e.a===focus&&e.b===n.id||e.b===focus&&e.a===n.id))op=.24;if(c||cyc){op=selectedNodes.has(n.id)?1:.20}const group=S('g',{opacity:op,style:'cursor:pointer'},boxes),sel=n.id===focus||selectedNodes.has(n.id);S('rect',{x:n.x-n.w/2,y:n.y-n.h/2,width:n.w,height:n.h,rx:10,fill:backgrounds[n.group],stroke:sel?'#16243c':palette[n.group],'stroke-width':sel?3.5:1.7},group);if(n.group==='start')S('circle',{cx:n.x-n.w/2+15,cy:n.y,r:6.7,fill:palette.start},group);const max=n.group==='start'?46:37;S('text',{x:n.x+(n.group==='start'?6:0),y:n.y,'text-anchor':'middle','dominant-baseline':'middle','font-size':n.group==='start'?14:15,'font-weight':650,fill:'#172b47'},group).textContent=(n.id==='h7'?n.name+' (Mount)':n.name).length>max?(n.id==='h7'?n.name+' (Mount)':n.name).slice(0,max-1)+'…':(n.id==='h7'?n.name+' (Mount)':n.name);S('title',{},group).textContent=n.name;group.addEventListener('pointerdown',e=>e.stopPropagation());group.addEventListener('click',()=>{if($('builderClickMode').checked){if(n.group==='start'){setBuilderStart(n.id);return}appendBuilder(n.id);return}focus=n.id;customView=null;cycleIdx=-1;chainIdx=-1;paint();details()})}const ne=es.length;$('stats').textContent=DATA.nodes.length+' Knoten · '+ne+' sichtbare Verbindungen · '+es.filter(e=>e.uncertain).length+' bedingt';}
function nodeButton(container,label,id){let b=document.createElement('button');b.textContent=label;b.onclick=()=>{focus=id;customView=null;cycleIdx=-1;chainIdx=-1;paint();details()};container.append(b)}
function details(){const d=$('detail');d.replaceChildren();let n=N[focus];if(!n){d.innerHTML='<h2>Techniknetz</h2><p class="muted">Wähle einen Startpunkt oder klicke auf eine Technik. Die Pfeile zeigen die Angriffsrichtung. Suche findet auch BJJ-Namen und benannte Bank-/Bauch-Umdreher.</p><p class="note">Für alle Verbindungen gibt es jetzt eine kurze Einstiegs- oder Wechselbeschreibung: bei den Pfeilen (Mouseover), in den Technikdetails, im Ketteneditor und in der durchsuchbaren Gesamttabelle. Bei unsicheren Wechseln ist das ausdrücklich gekennzeichnet.</p><h3>Bedienung</h3><p class="muted">Mit dem Mausrad zoomen, mit gedrückter Maus ziehen. Mit dem Ketten-Editor kannst du eigene Folgen speichern, importieren und die vollständige HTML-Datei samt Ketten erneut exportieren. Der SVG-Export speichert die aktuell hervorgehobene Ansicht.</p>';return}let ty=typeNames[n.group];const title=document.createElement('h2');title.textContent=n.name;d.append(title);let sub=document.createElement('p');sub.className='muted';sub.textContent=ty;d.append(sub);let outgoing=DATA.edges.filter(e=>e.a===focus&&(showMaybe||!e.uncertain)),incoming=DATA.edges.filter(e=>e.b===focus&&(showMaybe||!e.uncertain));for(const [name,list,isOut]of [['Mögliche Folgetechniken',outgoing,true],['Mögliche Vorgänger',incoming,false]]){let h=document.createElement('h3');h.textContent=name+' ('+list.length+')';d.append(h);if(!list.length){let m=document.createElement('p');m.className='empty';m.textContent='Kein erfasster Übergang';d.append(m)}for(const e of list){const id=isOut?e.b:e.a;nodeButton(d,(isOut?'→ ':'← ')+N[id].name+(e.uncertain?' (?)':''),id);if(e.note){let p=document.createElement('div');p.className='muted';p.textContent=e.note;d.append(p)}}}if(n.aliases.length){let h=document.createElement('h3');h.textContent='Varianten / BJJ-Namen';d.append(h);let m=document.createElement('p');m.className='muted';m.textContent=n.aliases.join(' · ');d.append(m)}}
function displayChains(){}
DATA.nodes.filter(x=>x.group==='start').forEach(n=>{let o=document.createElement('option');o.value=n.id;o.textContent=n.name;$('start').append(o)});
DATA.nodes.filter(n=>n.group!=='start').forEach(n=>{let c=document.createElement('div');c.style.cssText='border:1px solid #e1e8f2;border-radius:8px;padding:10px';c.innerHTML='<strong>'+esc(n.name)+'</strong><div class="muted">'+esc(n.aliases.join(' · '))+'</div>';$('aliasList').append(c)});
for(const rootId of ['s7','s8']){
 const head=document.createElement('h3');head.textContent=N[rootId].name;$('namedAttacksList').append(head);
 const table=document.createElement('table');table.className='methodtable';const header=document.createElement('tr');
 for(const label of ['Benannter Judo-Angriff / Umdreher','Zieltechnik','Quelle']){let th=document.createElement('th');th.textContent=label;header.append(th)}table.append(header);
 for(const a of DATA.methods.filter(x=>x.start===rootId)){
  let tr=document.createElement('tr'),name=document.createElement('td');const b=document.createElement('strong');b.textContent=a.name+(a.uncertain?' (?)':'');name.append(b);
  const desc=document.createElement('div');desc.className='muted';desc.textContent=a.description;name.append(desc);tr.append(name);
  let target=document.createElement('td');if(a.target){let btn=document.createElement('button');btn.type='button';btn.textContent=N[a.target].name;btn.onclick=()=>{focus=a.target;start='';cycleIdx=-1;chainIdx=-1;customView=null;$('start').value='';paint();details();window.scrollTo({top:0,behavior:'smooth'})};target.append(btn)}else target.textContent='Ziel offen';tr.append(target);
  let td=document.createElement('td');const u=DATA.sources[a.source];if(u){let link=document.createElement('a');link.href=u;link.target='_blank';link.rel='noopener noreferrer';link.textContent=a.source;td.append(link)}else td.textContent=a.source;tr.append(td);table.append(tr)
 }$('namedAttacksList').append(table);
}
for(const [name,url]of Object.entries(DATA.sources)){let li=document.createElement('li'),a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=name;li.append(a);$('sources').append(li)}
$('start').addEventListener('change',e=>{start=e.target.value;customView=null;focus='';cycleIdx=-1;chainIdx=-1;paint();details();displayChains()});$('showCross').addEventListener('change',e=>{showCross=e.target.checked;paint()});$('showMaybe').addEventListener('change',e=>{showMaybe=e.target.checked;paint();details()});$('circles').addEventListener('click',()=>{cycleIdx=(cycleIdx+1)%cycles.length;start='';focus='';chainIdx=-1;$('start').value='';paint();details();displayChains();const x=cycles[cycleIdx];const d=$('detail');const p=document.createElement('p');p.className='note';p.textContent='Kreis '+(cycleIdx+1)+'/'+cycles.length+': '+x.map(id=>N[id].name).join(' → ');d.prepend(p)});
$('search').addEventListener('input',e=>{let q=e.target.value.trim().toLowerCase();if(!q)return;let n=DATA.nodes.find(n=>n.name.toLowerCase().includes(q)||n.aliases.some(a=>a.toLowerCase().includes(q)));if(!n){const method=DATA.methods.find(x=>x.name.toLowerCase().includes(q));if(method)n=N[method.start]}if(n){focus=n.id;cycleIdx=-1;chainIdx=-1;paint();details();displayChains()}});
$('reset').addEventListener('click',()=>{customView=null;builderPreview=false;focus='';start='';cycleIdx=-1;chainIdx=-1;showCross=true;showMaybe=true;$('start').value='';$('search').value='';$('showCross').checked=true;$('showMaybe').checked=true;fit();paint();details();displayChains()});$('plus').onclick=()=>zoom(.73);$('minus').onclick=()=>zoom(1.35);$('fit').onclick=fit;svg.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?.83:1.2,coord(e))},{passive:false});let drag=null;svg.addEventListener('pointerdown',e=>{drag={cx:e.clientX,cy:e.clientY,vx:view.x,vy:view.y};svg.setPointerCapture(e.pointerId)});svg.addEventListener('pointermove',e=>{if(!drag)return;const r=svg.getBoundingClientRect();view.x=drag.vx-(e.clientX-drag.cx)*view.w/r.width;view.y=drag.vy-(e.clientY-drag.cy)*view.h/r.height;setView()});svg.addEventListener('pointerup',()=>drag=null);svg.addEventListener('pointercancel',()=>drag=null);
$('svgSave').addEventListener('click',()=>{const clone=svg.cloneNode(true);clone.setAttribute('xmlns',ns);clone.setAttribute('width','1920');clone.setAttribute('height','1250');const style=S('style',{},clone);style.textContent='text{font-family:Arial,sans-serif}';const xml='<?xml version="1.0" encoding="UTF-8"?>\n'+new XMLSerializer().serializeToString(clone);const blob=new Blob([xml],{type:'image/svg+xml;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='Judo-Techniknetz-Ansicht.svg';a.click();setTimeout(()=>URL.revokeObjectURL(url),1500)});

/* Ketteneditor: ausschließlich vorhandene gerichtete Pfeilverbindungen */
const STORE='judo_offline_saved_chains_v2';
let builder={start:'',tech:[],name:'',note:''},editingId='',builderPreview=false;
let savedChains=[];
function edgeBetween(a,b){return DATA.edges.find(e=>e.a===a&&e.b===b)||null}
function normalizeChain(c){
 if(!c||typeof c!=='object'||!N[c.start]||N[c.start].group!=='start'||!Array.isArray(c.tech))return null;
 const tech=c.tech.filter(x=>typeof x==='string'&&N[x]&&N[x].group!=='start');
 if(tech.length!==c.tech.length||tech.length<3||tech.length>100||new Set(tech).size!==tech.length)return null;
 let prev=c.start;for(const t of tech){if(!edgeBetween(prev,t))return null;prev=t}
 return {id:String(c.id||('import-'+Date.now()+'-'+Math.random())).slice(0,100),start:c.start,tech,
 name:String(c.name||'Unbenannte Kette').slice(0,100),note:String(c.note||'').slice(0,2000),savedAt:String(c.savedAt||'')};
}
function readStored(){
 let embedded=[];try{embedded=JSON.parse($('embeddedCustomData').textContent||'[]')}catch(e){}
 const result=Array.isArray(embedded)?embedded.map(normalizeChain).filter(Boolean):[];
 try{const r=JSON.parse(localStorage.getItem(STORE)||'[]');if(Array.isArray(r))for(const c of r.map(normalizeChain).filter(Boolean)){
 const i=result.findIndex(x=>x.id===c.id);if(i>=0)result[i]=c;else result.push(c);
 }}catch(e){}
 return result;
}
function writeStored(){try{localStorage.setItem(STORE,JSON.stringify(savedChains));return true}catch(e){return false}}
function builderStatus(t){$('builderStatus').textContent=t}
function cleanPreview(){chainIdx=-1;customView=null;focus='';cycleIdx=-1;start='';$('start').value=''}
function setBuilderStart(id){
 if(!N[id]||N[id].group!=='start')return;
 builder.start=id;builder.tech=[];editingId='';builderPreview=true;cleanPreview();renderBuilder();paint();details();
 builderStatus('Einstieg gewählt: '+N[id].name+'. Füge nun eine passende erste Technik hinzu.');
}
function availableNext(){if(!builder.start)return[];
 const last=builder.tech.length?builder.tech[builder.tech.length-1]:builder.start;
 return DATA.edges.filter(e=>e.a===last&&N[e.b].group!=='start');
}
function appendBuilder(id){
 if(!builder.start){builderStatus('Wähle zuerst im Ketten-Editor eine Einstiegssituation.');return false}
 if(!N[id]||N[id].group==='start'){builderStatus('Bitte eine Bodentechnik auswählen.');return false}
 if(builder.tech.includes(id)){
 builderStatus('↻ Kreis erkannt: '+N[id].name+' wurde in dieser Kette bereits benutzt. Hier endet die Kette; ein wiederholter Knoten wird nicht eingefügt.');return false;
 }
 const previous=builder.tech.length?builder.tech[builder.tech.length-1]:builder.start,edge=edgeBetween(previous,id);
 if(!edge){builderStatus('Kein erfasster direkter Übergang: '+N[previous].name+' → '+N[id].name+'. Bitte eine der verfügbaren Folgetechniken wählen.');return false}
 builder.tech.push(id);builderPreview=true;cleanPreview();renderBuilder();paint();details();
 builderStatus('Ergänzt: '+N[previous].name+' → '+N[id].name+(edge.uncertain?' (positionsabhängig)':'')+'. '+(edge.note||''));return true;
}
function showNextDescription(){
 const next=$('builderNext'),target=$('builderNextDescription');
 if(!builder.start){target.textContent='Wähle zuerst eine Einstiegssituation.';return}
 if(!next.value){target.textContent='Keine weitere, noch nicht genutzte Folgetechnik verfügbar.';return}
 const previous=builder.tech.length?builder.tech[builder.tech.length-1]:builder.start;
 const edge=edgeBetween(previous,next.value);
 target.textContent=edge?(N[previous].name+' → '+N[next.value].name+(edge.uncertain?' (?) · ':' · ')+(edge.note||'Keine Beschreibung hinterlegt.')):'Bitte eine Folgetechnik auswählen.';
}
function renderBuilderStepNotes(){
 const area=$('builderStepNotes');area.replaceChildren();
 if(!builder.start||!builder.tech.length){let p=document.createElement('p');p.textContent='Noch keine Technikfolge vorhanden.';area.append(p);return}
 let previous=builder.start;
 for(const [i,id] of builder.tech.entries()){
  const e=edgeBetween(previous,id),p=document.createElement('p');
  const label=document.createElement('strong');label.textContent=(i+1)+'. '+N[previous].name+' → '+N[id].name+(e&&e.uncertain?' (?)':'');p.append(label);
  p.append(document.createTextNode(' — '+(e?.note||'Noch keine Beschreibung vorhanden.')));area.append(p);previous=id;
 }
}
function renderTransitionRows(){
 const q=$('transitionSearch').value.trim().toLocaleLowerCase('de'),rows=$('transitionRows');rows.replaceChildren();
 const filtered=DATA.edges.filter(e=>[N[e.a].name,N[e.b].name,e.note||'',e.uncertain?'bedingt':''].join(' ').toLocaleLowerCase('de').includes(q));
 for(const e of filtered){
  const tr=document.createElement('tr');
  for(const id of [e.a,e.b]){const td=document.createElement('td'),button=document.createElement('button');button.type='button';button.textContent=N[id].name;button.addEventListener('click',()=>{focus=id;start='';chainIdx=-1;cycleIdx=-1;customView=null;$('start').value='';paint();details();document.getElementById('graph').scrollIntoView({behavior:'smooth',block:'center'})});td.append(button);tr.append(td)}
  const td=document.createElement('td');td.textContent=(e.uncertain?'(?) ':'')+(e.note||'Keine Beschreibung vorhanden.');if(e.uncertain)td.className='uncertain';tr.append(td);rows.append(tr);
 }
 $('transitionCount').textContent=filtered.length+' von '+DATA.edges.length+' Übergängen';
}
$('transitionSearch').addEventListener('input',renderTransitionRows);
$('builderNext').addEventListener('change',showNextDescription);
function renderBuilder(){
 const sel=$('builderStart');sel.value=builder.start;
 $('builderName').value=builder.name;$('builderNote').value=builder.note;
 const area=$('builderSequence');area.replaceChildren();
 if(!builder.start){const t=document.createElement('span');t.className='muted';t.textContent='Noch keine Einstiegssituation ausgewählt.';area.append(t)}
 else{for(const [idx,id] of [builder.start,...builder.tech].entries()){
 if(idx){const a=document.createElement('span');a.className='arrow';a.textContent='→';area.append(a)}
 const chip=document.createElement('span');chip.className='step'+(idx===0?' startchip':'');chip.textContent=N[id].name;area.append(chip);
 }}
 const next=$('builderNext');next.replaceChildren();const possibles=availableNext();const remaining=possibles.filter(e=>!builder.tech.includes(e.b));
 if(!remaining.length){let o=document.createElement('option');o.value='';o.textContent=builder.start?'Keine weitere neue Folgetechnik':'Zuerst Einstieg wählen';next.append(o)}
 else for(const e of remaining){const o=document.createElement('option');o.value=e.b;o.textContent=N[e.b].name+(e.uncertain?' · bedingt (?)':'');o.title=e.note||'';next.append(o)}
 next.disabled=!remaining.length;$('builderAppend').disabled=!remaining.length;
 $('builderUndo').disabled=!builder.tech.length;
 $('builderSave').disabled=builder.tech.length<3;
 $('copySelectedChain').disabled=!$('builderExample').value;
 showNextDescription();renderBuilderStepNotes();
 $('savedCount').textContent='('+savedChains.length+')';
}
function clearBuilder(){builder={start:'',tech:[],name:'',note:''};editingId='';builderPreview=false;cleanPreview();renderBuilder();paint();details();builderStatus('Neue Kette: Wähle eine Einstiegssituation.');}
function openChain(c,edit){
 builder={start:c.start,tech:[...c.tech],name:c.name||'',note:c.note||c.cue||''};editingId=edit?(c.id||''):'';
 builderPreview=true;cleanPreview();renderBuilder();paint();details();
 builderStatus(edit?'Gespeicherte Kette zum Bearbeiten geladen. Änderungen anschließend erneut speichern.':'Kette in den Editor übernommen. Namen anpassen und als eigene Kette speichern.');
}
function showSaved(c){
 customView={start:c.start,tech:[...c.tech],name:c.name};builderPreview=false;focus='';cycleIdx=-1;chainIdx=-1;start='';$('start').value='';paint();details();
 const d=$('detail');const p=document.createElement('p');p.className='note';p.textContent='Gespeicherte Kette: '+c.name+' · '+N[c.start].name+' → '+c.tech.map(id=>N[id].name).join(' → ');d.prepend(p);
 builderStatus('Kette „'+c.name+'“ im Diagramm hervorgehoben.');
}
function renderSaved(){const dest=$('savedChains');dest.replaceChildren();
 if(!savedChains.length){const p=document.createElement('p');p.className='muted';p.textContent='Noch keine eigenen Ketten gespeichert. Du kannst oben eine Beispielkette auswählen oder selbst eine Kette erstellen.';dest.append(p)}
 for(const c of savedChains){const card=document.createElement('div');card.className='saveditem';
 const title=document.createElement('strong');title.textContent=c.name;card.append(title);
 const route=document.createElement('p');route.textContent=N[c.start].name+' → '+c.tech.map(id=>N[id].name).join(' → ');card.append(route);
 if(c.note){const note=document.createElement('p');note.className='muted';note.textContent=c.note;card.append(note)}
 const actions=document.createElement('div');actions.className='actions';
 for(const [text,action] of [['Im Netz zeigen',()=>showSaved(c)],['Bearbeiten',()=>openChain(c,true)],['Löschen',()=>{
 if(!confirm('Kette „'+c.name+'“ wirklich löschen?'))return;
 savedChains=savedChains.filter(x=>x.id!==c.id);if(editingId===c.id)editingId='';writeStored();renderSaved();renderBuilder();builderStatus('Kette gelöscht.');
 }]]){const b=document.createElement('button');b.type='button';b.textContent=text;b.onclick=action;actions.append(b)}
 card.append(actions);dest.append(card);
 }
 $('savedCount').textContent='('+savedChains.length+')';
}
function downloadText(name,contents,type){
 const blob=new Blob([contents],{type:type||'application/json;charset=utf-8'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2500);
}
function portableBackup(){
 const doc=document.documentElement.cloneNode(true);
 const embedded=doc.querySelector('#embeddedCustomData');
 embedded.textContent=JSON.stringify(savedChains).replace(/<\//g,'<\\/');
 // Auf der kopierten Seite die nur zur Laufzeit erzeugten Bereiche zurücksetzen.
 for(const id of ['graph','detail','chains','aliasList','sources','savedChains','builderSequence','builderNext','namedAttacksList','transitionRows','builderStepNotes']){const x=doc.querySelector('#'+id);if(x)x.replaceChildren()}
 for(const id of ['start','builderStart','builderExample']){const x=doc.querySelector('#'+id);if(x)while(x.options.length>1)x.remove(x.options.length-1)}
 const status=doc.querySelector('#builderStatus');if(status)status.textContent='Ketten aus dieser Datei wurden geladen.';
 downloadText('Judo_Bodentechniknetz_mit_meinen_Ketten.html','<!doctype html>\n'+doc.outerHTML,'text/html;charset=utf-8');
}
$('openBuilder').addEventListener('click',()=>$('builder').scrollIntoView({behavior:'smooth',block:'start'}));
$('builderStart').addEventListener('change',e=>setBuilderStart(e.target.value));
$('builderName').addEventListener('input',e=>{builder.name=e.target.value});
$('builderNote').addEventListener('input',e=>{builder.note=e.target.value});
$('builderAppend').addEventListener('click',()=>appendBuilder($('builderNext').value));
$('builderUndo').addEventListener('click',()=>{if(!builder.tech.length)return;const last=builder.tech.pop();builderPreview=true;cleanPreview();renderBuilder();paint();details();builderStatus('Letzten Schritt entfernt: '+N[last].name)});
$('builderNew').addEventListener('click',clearBuilder);
$('builderExample').addEventListener('change',()=>renderBuilder());$('copySelectedChain').addEventListener('click',()=>{const c=DATA.chains[Number($('builderExample').value)];if(!$('builderExample').value||!c)return;openChain({...c,name:'Meine '+c.id+' · '+(N[c.start]?.name||'Startposition')},false)});
$('builderSave').addEventListener('click',()=>{
 builder.name=$('builderName').value.trim();builder.note=$('builderNote').value.trim();
 if(builder.tech.length<3){builderStatus('Zum Speichern mindestens drei unterschiedliche Bodentechniken auswählen.');return}
 let prev=builder.start;for(const id of builder.tech){if(!edgeBetween(prev,id)){builderStatus('Ungültige Verbindung: '+N[prev].name+' → '+N[id].name);return}prev=id}
 const id=editingId||('custom-'+Date.now()+'-'+Math.round(Math.random()*1000000));
 const chain=normalizeChain({id,start:builder.start,tech:builder.tech,name:builder.name||'Meine Kette '+(savedChains.length+1),note:builder.note,savedAt:new Date().toISOString()});if(!chain)return;
 const index=savedChains.findIndex(c=>c.id===id);if(index>=0)savedChains[index]=chain;else savedChains.push(chain);editingId=id;
 const ok=writeStored();renderBuilder();renderSaved();showSaved(chain);
 builderStatus('„'+chain.name+'“ gespeichert ('+chain.tech.length+' Techniken). '+(ok?'Für eine dauerhafte Sicherung JSON oder Offline-HTML exportieren.':'Der Browser blockiert die lokale Speicherung: Bitte unbedingt als JSON oder HTML exportieren.'));
});
$('chainsExport').addEventListener('click',()=>{if(!savedChains.length){builderStatus('Noch keine Ketten zum Sichern vorhanden.');return}downloadText('Judo_meine_Technikketten.json',JSON.stringify({format:'judo-technik-ketten',version:2,exportedAt:new Date().toISOString(),chains:savedChains},null,2),'application/json;charset=utf-8');builderStatus(savedChains.length+' Ketten als JSON-Sicherung exportiert.')});
$('chainsExportHtml').addEventListener('click',()=>{portableBackup();builderStatus('Vollständige Offline-HTML-Datei mit '+savedChains.length+' gespeicherten Ketten exportiert.')});
$('chainsImportButton').addEventListener('click',()=>$('chainsImportInput').click());
$('chainsImportInput').addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;
 try{if(file.size>5*1024*1024)throw new Error('Datei ist zu groß (max. 5 MB).');
 const raw=JSON.parse(await file.text());const arr=Array.isArray(raw)?raw:raw.chains;
 if(!Array.isArray(arr))throw new Error('Kein gültiges Kettenformat.');let count=0;
 const sig=c=>c.start+'|'+c.tech.join(',')+'|'+c.name;
 const existing=new Set(savedChains.map(sig));
 for(const item of arr.slice(0,1000)){const c=normalizeChain(item);if(c&&!existing.has(sig(c))){if(savedChains.some(x=>x.id===c.id))c.id='import-'+Date.now()+'-'+Math.round(Math.random()*100000);savedChains.push(c);existing.add(sig(c));count++}}
 writeStored();renderSaved();renderBuilder();builderStatus(count+' neue Ketten importiert. Bereits vorhandene oder ungültige Ketten wurden ausgelassen.');
 }catch(err){builderStatus('Import nicht möglich: '+(err.message||String(err)))}finally{e.target.value=''}
});
DATA.nodes.filter(n=>n.group==='start').forEach(n=>{const o=document.createElement('option');o.value=n.id;o.textContent=n.name;$('builderStart').append(o)});
DATA.chains.forEach((c,i)=>{const opt=document.createElement('option');opt.value=String(i);opt.textContent=c.id+' · '+(N[c.start]?.name||'Startposition')+' · '+c.tech.map(id=>N[id].name).join(' → ');$('builderExample').append(opt)});
savedChains=readStored();renderBuilder();renderSaved();

fit();paint();details();displayChains();renderTransitionRows();
})();
