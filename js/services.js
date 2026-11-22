import {RM,doc,$,clamp,lerp,smooth} from './util.js';
import {SVC_AMAZON,SVC_FUNDING} from '../content/strings.en.js';

/* ---------- services: pinned, scroll-driven graphics ---------- */
export var SVC=(function(){
  var sec=$('#services'), cards=[].slice.call(sec.querySelectorAll('.svc')), steps=[].slice.call(sec.querySelectorAll('.steps li')), stepsEl=$('#steps');
  var ease=smooth, cl=clamp, fmt=function(v){return '$'+v.toFixed(2)};
  /* amazon */
  var A=SVC_AMAZON.items;
  var aBar=sec.querySelector('.a-bar'), aLeg=sec.querySelector('.a-leg'), aKeep=sec.querySelector('.a-keep');
  A.forEach(function(x){ var i=document.createElement('i'); i.style.background=x.c; aBar.appendChild(i); var li=document.createElement('li'); li.style.setProperty('--c',x.c); li.innerHTML='<span>'+x.n+'</span><b>'+fmt(x.v)+'</b>'; aLeg.appendChild(li); });
  var aSeg=[].slice.call(aBar.children), aLi=[].slice.call(aLeg.children);
  function gA(q){ A.forEach(function(x,k){ var t=ease(cl((q-k*.12)/.22,0,1)); aSeg[k].style.width=(x.v/29.9*100*t)+'%'; aLi[k].style.opacity=t; });
    var t=ease(cl((q-.78)/.22,0,1)); aKeep.style.opacity=t; aKeep.querySelector('b').textContent=fmt(6.53*t); }
  /* instagram */
  var iS=sec.querySelector('.i-sq'), iT=sec.querySelector('.i-st'), iM=sec.querySelector('.i-main'), iL=sec.querySelectorAll('.i-l');
  function gI(q){ var a=ease(cl((q-.1)/.4,0,1)), b=ease(cl((q-.3)/.4,0,1));
    iM.style.transform='scale('+lerp(.94,1,ease(cl(q/.3,0,1)))+')';
    iS.style.opacity=a; iS.style.transform='translateX('+lerp(24,0,a)+'cqw) scale('+lerp(.7,1,a)+')'; iL[0].style.opacity=a;
    iT.style.opacity=b; iT.style.transform='translateX('+lerp(-24,0,b)+'cqw) scale('+lerp(.7,1,b)+')'; iL[1].style.opacity=b; }
  /* tiktok */
  var tBar=sec.querySelector('.t-bar i'), tTime=sec.querySelector('.t-time'), tA=sec.querySelector('.t-tag.a'), tB=sec.querySelector('.t-tag.b');
  function gT(q){ tBar.style.width=(q*100)+'%'; var s=Math.round(q*15); tTime.textContent='0:'+(s<10?'0':'')+s;
    var a=cl((q-.04)/.12,0,1), b=cl((q-.3)/.12,0,1); tA.style.opacity=a; tB.style.opacity=b; tA.classList.toggle('on',q<.3&&q>.04); tB.classList.toggle('on',q>=.3); }
  /* funding */
  var fRows=[].slice.call(sec.querySelectorAll('.f-list li')), fSt=sec.querySelector('.f-stamp');
  function gF(q){ fRows.forEach(function(li,k){ var ok=q>(k+.5)/6; li.classList.toggle('ok',ok); li.querySelector('.s').textContent=ok?SVC_FUNDING.complete:SVC_FUNDING.missing; });
    var t=ease(cl((q-.88)/.12,0,1)); fSt.style.opacity=t; fSt.style.transform='rotate(-5deg) scale('+lerp(.8,1,t)+')'; }
  var G=[gA,gI,gT,gF], last=[-1,-1,-1,-1], on=-1;

  /* desktop graphics: bold flat shapes, driven by the same progress q */
  var XQ=[0,1,2,3].map(function(i){return document.getElementById('xg'+i)});
  var C0=628.32, FR=[6.5,4.31,6.2,5.17,1.2,6.53], FT=29.9, FS=[], acc=0; FR.forEach(function(v){FS.push(acc); acc+=v/FT*C0;});
  var x0s=[].slice.call(XQ[0].querySelectorAll('.s')), x0g=XQ[0].querySelector('.dn'), x0b=XQ[0].querySelector('.xb');
  function X0(q){ FR.forEach(function(v,k){ var t=ease(cl((q-k*.11)/.2,0,1)), len=Math.max(0,v/FT*C0*t-(t>0?3:0)); x0s[k].setAttribute('stroke-dasharray',len.toFixed(1)+' '+C0); x0s[k].setAttribute('stroke-dashoffset',(-FS[k]).toFixed(1)); });
    x0g.setAttribute('transform','translate(200 160) rotate('+(-90+q*40).toFixed(1)+')'); x0b.textContent='$'+(6.53*ease(cl((q-.7)/.3,0,1))).toFixed(2); }
  var x1=['f1','f2','f3'].map(function(c){return XQ[1].querySelector('.'+c)}), x1r=XQ[1].querySelector('.ring'), x1c=XQ[1].querySelector('.core');
  var P1=[[72,214,-7],[200,146,0],[330,158,6]];
  function X1(q){ x1.forEach(function(g,k){ var t=ease(cl((q-.08-k*.14)/.34,0,1)); g.setAttribute('transform','translate('+lerp(200,P1[k][0],t).toFixed(1)+' '+lerp(160,P1[k][1],t).toFixed(1)+') rotate('+(P1[k][2]*t).toFixed(1)+') scale('+lerp(.2,1.28,t).toFixed(3)+')'); g.style.opacity=t; });
    x1r.setAttribute('r',(34+14*((q*3)%1)).toFixed(1)); x1r.style.opacity=(1-((q*3)%1)).toFixed(2); x1c.setAttribute('r',(30-6*ease(cl(q/.5,0,1))).toFixed(1)); }
  var x2p=XQ[2].querySelector('.ph'), x2b=XQ[2].querySelector('.pb'), x2o=['o1','o2','o3'].map(function(c){return XQ[2].querySelector('.'+c)});
  function X2(q){ x2b.setAttribute('width',(80*q).toFixed(1)); x2p.setAttribute('transform','translate(200 160) rotate('+(-6+4*Math.sin(q*6.28)).toFixed(1)+')');
    x2o.forEach(function(g,k){ var t=ease(cl((q-.05-k*.12)/.25,0,1)), a=(k*2.094-1.2+q*2.4); g.setAttribute('transform','translate('+(200+Math.cos(a)*(140-14*k)).toFixed(1)+' '+(160+Math.sin(a)*(104-6*k)).toFixed(1)+') scale('+(.3+.7*t).toFixed(3)+')'); g.style.opacity=t; }); }
  var x3=['d1','d2','d3'].map(function(c){return XQ[3].querySelector('.'+c)}), x3k=XQ[3].querySelector('.ok');
  function X3(q){ var t=ease(cl(q/.55,0,1)); [[-1,-18],[0,0],[1,16]].forEach(function(p,k){ x3[k].setAttribute('transform','translate('+(190+p[0]*46*t).toFixed(1)+' '+(176-Math.abs(p[0])*-8*t).toFixed(1)+') rotate('+(p[1]*t).toFixed(1)+')'); });
    var u=ease(cl((q-.62)/.3,0,1)); x3k.setAttribute('transform','translate(286 92) scale('+(.2+.8*u).toFixed(3)+')'); x3k.style.opacity=u; }
  var X=[X0,X1,X2,X3];
  function set(i,q){ q=Math.round(q*200)/200; if(q===last[i])return; last[i]=q; G[i](q); X[i](q); }
  function pinOn(){ return doc.classList.contains('pin'); }
  function setPin(){ var want=!RM && innerHeight>=560; doc.classList.toggle('pin',want); if(!want){ cards.forEach(function(c){c.classList.remove('on'); c.style.width=''; c.style.removeProperty('--t'); c.querySelector('.body').style.opacity=''; var tx=c.querySelector('.tx'); if(tx)tx.style.opacity=''; var db=c.querySelector('.dB'); if(db)db.style.opacity=''}); steps.forEach(function(s){s.classList.remove('on')}); on=-1; for(var i=0;i<4;i++)set(i,1); } else { last=[-1,-1,-1,-1]; } }
  setPin(); addEventListener('resize',setPin);
  var right=sec.querySelector('.s-right'), bodies=cards.map(function(c){return c.querySelector('.body')}), txs=cards.map(function(c){return c.querySelector('.tx')}), RW=0, SMW=230, GAP=28;
  var dBs=cards.map(function(c){ var p=document.createElement('p'); p.className='dB'; p.textContent=c.querySelector('.tx .d').textContent; c.appendChild(p); return p; });
  var cns=[0,1,2].map(function(){ var d=document.createElement('i'); d.className='cn'; right.appendChild(d); return d; });
  var nms=cards.map(function(c){return c.querySelector('.nm')});
  function desk(){ return innerWidth>=900 }
  function measure(){ RW=right.clientWidth; }
  function clearDesk(){ cards.forEach(function(c,k){ c.style.width=''; c.style.removeProperty('--t'); bodies[k].style.opacity=''; txs[k].style.opacity=''; txs[k].style.pointerEvents=''; dBs[k].style.opacity=''; }); }
  addEventListener('resize',function(){ RW=0; clearDesk(); on=-1; last=[-1,-1,-1,-1]; });
  function update(){
    if(!pinOn()) return;
    var r=sec.getBoundingClientRect(), travel=Math.max(1,r.height-innerHeight), p=cl(-r.top/travel,0,1), g=p*4;
    var i0=Math.min(3,Math.floor(g)), fr=g-i0;
    if(desk()){
      if(!RW) measure();
      SMW=Math.max(190,Math.min(260,RW*.17));
      var tr=i0<3?ease(cl((fr-.62)/.38,0,1)):0, f=i0+tr, big=Math.max(SMW+200,RW-3*SMW-3*GAP), x=0;
      cards.forEach(function(c,k){
        var t=cl(1-Math.abs(f-k),0,1), w=SMW+(big-SMW)*t;
        c.style.setProperty('--t',t.toFixed(3));
        c.style.width=w.toFixed(1)+'px';
        bodies[k].style.opacity=cl((t-.55)/.35,0,1).toFixed(2);
        txs[k].style.opacity=cl((t-.5)/.4,0,1).toFixed(2);
        dBs[k].style.opacity=cl(1-t*2.2,0,1).toFixed(2);
        x+=w; if(k<3){ cns[k].style.left=(x+GAP/2-14)+'px'; x+=GAP; }
      });
      var idx=Math.round(f);
      if(idx!==on){ on=idx; steps.forEach(function(s,k){s.classList.toggle('on',k===idx)}); cards.forEach(function(c,k){c.classList.toggle('on',k===idx)}); }
      stepsEl.style.setProperty('--p',cl(f/3,0,1));
      for(var i=0;i<4;i++) set(i,cl((g-i)*1.25,0,1));
    } else {
      var idx2=Math.min(3,Math.floor(g));
      if(idx2!==on){ on=idx2; cards.forEach(function(c,k){c.classList.toggle('on',k===idx2)}); steps.forEach(function(s,k){s.classList.toggle('on',k===idx2)}); }
      stepsEl.style.setProperty('--p',cl((g-.5)/3,0,1));
      for(var j=0;j<4;j++) set(j,cl((g-j)*1.25,0,1));
    }
  }
  cards.forEach(function(c,i){ c.addEventListener('click',function(){ if(!desk()||!pinOn()) return; var r=sec.getBoundingClientRect(), travel=r.height-innerHeight; scrollTo({top:scrollY+r.top+((i+.35)/4)*travel,behavior:RM?'auto':'smooth'}); }); });
  steps.forEach(function(li,i){ li.querySelector('button').addEventListener('click',function(){
    var r=sec.getBoundingClientRect(), travel=r.height-innerHeight, y=scrollY+r.top+((i+.35)/4)*travel;
    scrollTo({top:y,behavior:RM?'auto':'smooth'}); }); });
  return {update:update};
})();
