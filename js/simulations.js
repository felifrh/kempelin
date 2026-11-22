import {doc,$} from './util.js';
import {lock,unlock} from './dialog.js';
import {AMAZON_SIM,FUNDING} from '../content/strings.en.js';

/* ---------- amazon simulation ---------- */
(function(){
  var sim=$('#sim'), openB=$('#openSim'), closeB=$('#closeSim'), lastFocus=null;
  var F={price:1,cogs:1,ref:1,fba:1,inb:1,acos:1,ret:1,units:1};
  var cur=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'});
  var cur0=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
  var num0=new Intl.NumberFormat('en-US');
  function V(id){return parseFloat(document.getElementById(id).value)}
  function calc(){
    var price=V('price'),cogs=V('cogs'),ref=V('ref')/100,fba=V('fba'),inb=V('inb'),acos=V('acos')/100,ret=V('ret')/100,units=V('units');
    var net=price*(1-ret), refFee=net*ref, ads=net*acos, ship=fba+inb, retLoss=price*ret;
    var profit=net-refFee-ads-cogs-ship;
    var segs=[
      {n:AMAZON_SIM.cost,v:cogs,c:'#25281F'},
      {n:AMAZON_SIM.referral,v:refFee,c:'#5C6154'},
      {n:AMAZON_SIM.shipping,v:ship,c:'#ABB9BA'},
      {n:AMAZON_SIM.ads,v:ads,c:'#EDE9AF'},
      {n:AMAZON_SIM.returns,v:retLoss,c:'#FFFFFF'}
    ];
    var costs=segs.reduce(function(s,x){return s+x.v},0);
    var total=Math.max(price,costs);
    var bar=$('#bar'); bar.innerHTML='';
    segs.forEach(function(s){var i=document.createElement('i');i.style.width=(s.v/total*100)+'%';i.style.background=s.c;bar.appendChild(i)});
    if(profit>0){var p=document.createElement('i');p.style.width=(profit/total*100)+'%';p.style.background='#DAE666';bar.appendChild(p)}
    var mark=$('#mark'); mark.style.left=(price/total*100)+'%'; $('#markL').textContent='Price '+cur.format(price); $('#markL').style.cssText=(price/total>.62)?'left:auto;right:8px':'left:8px;right:auto';
    var lg=$('#legend'); lg.innerHTML='';
    segs.concat([{n:profit>=0?AMAZON_SIM.keep:AMAZON_SIM.lose,v:profit,c:profit>=0?'#DAE666':'transparent'}]).forEach(function(s){
      var li=document.createElement('li'), sw=document.createElement('i'); sw.style.background=s.c; li.appendChild(sw); li.insertAdjacentHTML('beforeend','<span>'+s.n+'</span><b>'+cur.format(s.v)+'</b>'); lg.appendChild(li);
    });
    var margin=profit/price*100, month=profit*units;
    $('#headline').innerHTML=(profit>=0
      ? 'You keep '+cur.format(profit)+' on every '+cur.format(price)+' unit.'
      : 'You lose '+cur.format(-profit)+' on every '+cur.format(price)+' unit.')
      +'<small>'+margin.toFixed(1)+'% margin. At '+num0.format(units)+' units a month that is '+(month>=0?cur0.format(month)+' kept.':cur0.format(-month)+' lost.')+'</small>';
    var den=(1-ret)*(1-ref-acos);
    $('#breakeven').textContent= den>0 ? 'Break-even price with these costs: '+cur.format((cogs+ship)/den) : 'Fees and advertising take more than every sale. No price breaks even.';
    document.getElementById('o_price').textContent=cur.format(price);
    document.getElementById('o_cogs').textContent=cur.format(cogs);
    document.getElementById('o_ref').textContent=(ref*100).toFixed(1)+'%';
    document.getElementById('o_fba').textContent=cur.format(fba);
    document.getElementById('o_inb').textContent=cur.format(inb);
    document.getElementById('o_acos').textContent=(acos*100).toFixed(0)+'%';
    document.getElementById('o_ret').textContent=(ret*100).toFixed(1)+'%';
    document.getElementById('o_units').textContent=num0.format(units);
  }
  Object.keys(F).forEach(function(k){document.getElementById(k).addEventListener('input',calc)});
  calc();
  function open(){
    if(sim.classList.contains('open'))return; lastFocus=document.activeElement; sim.classList.add('open'); doc.style.overflow='hidden'; lock(sim);
    setTimeout(function(){closeB.focus()},400);
  }
  function close(){
    if(!sim.classList.contains('open'))return; sim.classList.remove('open'); doc.style.overflow=''; unlock();
    if(lastFocus&&lastFocus.focus) lastFocus.focus();
  }
  openB.addEventListener('click',function(e){e.preventDefault(); location.hash='sim-amazon'});
  function leave(){ try{history.replaceState(null,'',location.href.split('#')[0])}catch(e){ if(location.hash)location.hash='explore' } close(); }
  closeB.addEventListener('click',leave);
  addEventListener('hashchange',function(){ if(location.hash==='#sim-amazon')open(); else close(); });
  addEventListener('keydown',function(e){ if(e.key==='Escape'&&sim.classList.contains('open')) leave(); });
  if(location.hash==='#sim-amazon') setTimeout(open,50);
})();

/* ---------- extra simulations ---------- */
(function(){
var doc=document.documentElement;
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
var RMX=matchMedia('(prefers-reduced-motion: reduce)').matches;
var ICON={
 heart:'<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.4-7 10-7 10z"/></svg>',
 chat:'<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg>',
 send:'<svg viewBox="0 0 24 24"><path d="M21 4 3 11l7 3 3 7z"/></svg>',
 save:'<svg viewBox="0 0 24 24"><path d="M6 4h12v16l-6-4-6 4z"/></svg>'};

/* --- instagram + tiktok: videos only --- */
var VIDS=['assets/video/video-1.mp4','assets/video/video-2.mp4','assets/video/video-3.mp4'];
function vplay(v){ try{var p=v.play(); if(p&&p.catch)p.catch(function(){})}catch(e){} }
function pauseBtn(v){
  var b=document.createElement('button'); b.type='button'; b.className='vpause'; b.textContent='Pause'; b.setAttribute('aria-pressed','false'); b.setAttribute('data-hover','');
  v.parentNode.classList.add('vwrap'); v.parentNode.appendChild(b);
  b.addEventListener('click',function(){ var on=b.getAttribute('aria-pressed')==='false'; b.setAttribute('aria-pressed',on?'true':'false'); b.textContent=on?'Play':'Pause'; if(on){try{v.pause()}catch(e){}} else vplay(v); });
  return b;
}
function lazyVideo(v,src){ if(!v.getAttribute('src')){ v.src=src; } }
function initIG(){ var v=$('#igVid'); pauseBtn(v); return {open:function(){ lazyVideo(v,VIDS[1]); if(!RMX) vplay(v) },close:function(){ try{v.pause()}catch(e){} }}; }
function initTT(){ var vs=$$('#sim-tt video'); vs.forEach(pauseBtn); return {open:function(){ vs.forEach(function(v,i){ lazyVideo(v,VIDS[i]) }); if(!RMX) vs.forEach(vplay) },close:function(){ vs.forEach(function(v){try{v.pause()}catch(e){}}) }}; }

/* --- funding --- */
function initFU(){
  var out=$('#fuOut'), docs=$$('#fuDocs li'), size='small', need='amz', timers=[];
  var P=FUNDING.programmes, RULE=FUNDING.rule, STEPS=FUNDING.steps;
  function card(id,best){
    var p=P[id];
    return '<div class="pl'+(best?' best':'')+'" role="group" aria-label="'+p.n+'"><div class="ph-top"><h4>'+p.n+'<small lang="ko">'+p.k+'</small></h4>'+(best?'<span class="mono">Best fit</span>':'')+'</div><dl><dt>Run by</dt><dd>'+p.by+'</dd><dt>Covers</dt><dd>'+p.cov+'</dd><dt>For</dt><dd>'+p.who+'</dd></dl></div>';
  }
  function render(){
    timers.forEach(clearTimeout); timers=[];
    var ids=RULE[need].filter(function(id){return P[id].sizes.indexOf(size)>-1});
    out.innerHTML=ids.map(function(id,n){return card(id,n===0)}).join('')+
      '<div class="pl pl-late"><div class="ph-top"><h4>The way to the application</h4></div><ol class="path" id="fuPath">'+STEPS.map(function(s){return '<li><span>'+s[0]+'</span>'+(s[1]?'<span class="w">'+s[1]+'</span>':'<span></span>')+'</li>'}).join('')+'</ol></div>';
    var li=$$('#fuPath li'), n=0;
    docs.forEach(function(d){d.classList.remove('ok')});
    function tick(){ if(n<li.length){ li[n].classList.add('on'); if(n===2) docs.forEach(function(d,j){ timers.push(setTimeout(function(){d.classList.add('ok')},j*160)) }); n++; timers.push(setTimeout(tick,RMX?0:420)) } }
    tick();
  }
  function bind(sel,set){ $$(sel+' button').forEach(function(b){ b.addEventListener('click',function(){ set(b.dataset.v); $$(sel+' button').forEach(function(x){x.setAttribute('aria-pressed',x===b)}); render() }) }) }
  bind('#fuSize',function(v){size=v}); bind('#fuNeed',function(v){need=v});
  render();
  return {open:function(){render()},close:function(){timers.forEach(clearTimeout)}};
}

/* --- overlay manager --- */
var SIMS=[{h:'sim-instagram',id:'sim-ig',f:initIG},{h:'sim-tiktok',id:'sim-tt',f:initTT},{h:'sim-funding',id:'sim-fund',f:initFU},{h:'privacy',id:'sim-privacy',f:function(){return {open:function(){},close:function(){}}}}];
var lastFocus=null;
SIMS.forEach(function(s){ s.el=document.getElementById(s.id); s.api=s.f(); });
function isOpen(s){return s.el.classList.contains('open')}
function open(s){
  if(isOpen(s)) return; lastFocus=document.activeElement; s.el.classList.add('open'); doc.style.overflow='hidden'; s.el.scrollTop=0; lock(s.el);
  s.api.open(); setTimeout(function(){ var c=$('[data-close]',s.el); if(c) c.focus() },400);
}
function close(s){
  if(!isOpen(s)) return; s.el.classList.remove('open'); s.api.close(); unlock();
  var am=document.getElementById('sim'); if(!(am&&am.classList.contains('open'))) doc.style.overflow='';
  if(lastFocus&&lastFocus.focus) lastFocus.focus();
}
function route(){ SIMS.forEach(function(s){ if(location.hash==='#'+s.h) open(s); else close(s) }) }
function leave(){ try{history.replaceState(null,'',location.href.split('#')[0])}catch(e){ if(location.hash)location.hash='explore' } SIMS.forEach(close) }
$$('[data-sim]').forEach(function(a){ a.addEventListener('click',function(e){ e.preventDefault(); location.hash=a.dataset.sim }) });
SIMS.forEach(function(s){ $('[data-close]',s.el).addEventListener('click',leave) });
addEventListener('hashchange',route);
addEventListener('keydown',function(e){ if(e.key==='Escape'&&SIMS.some(isOpen)) leave() });
if(SIMS.some(function(s){return location.hash==='#'+s.h})) setTimeout(route,50);
})();
