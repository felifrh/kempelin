import {doc,$,clamp,lerp} from './util.js';
import {gl,pose,INTRO,getBase} from './bird.js';

/* ---------- intro: the swift flies in from the right (head down-left), opens the wordmark, which then settles top left ---------- */
(function(){
  if(!doc.classList.contains('loading')){ return; }
  var wm=$('#wm'), dur=2700, started=false, done=false;
  try{scrollTo(0,0)}catch(e){}
  document.body.style.overflow='hidden';
  function end(){ if(done) return; done=true; INTRO.on=false; wm.style.opacity=0; setTimeout(function(){wm.style.display='none'},600); doc.classList.add('landing'); doc.classList.remove('loading'); document.body.style.overflow=''; pose.intro=1; }
  function run(){
    if(started) return; started=true;
    var vw=innerWidth, vh=innerHeight, w=wm.offsetWidth, h=wm.offsetHeight, x0=(vw-w)/2, y0=(vh-h)/2, cy=y0+h*.52;
    wm.style.transform='translate('+x0+'px,'+y0+'px)';
    var F=parseFloat(getComputedStyle(wm).fontSize)||100, m=getBase();
    INTRO.s=Math.min(.5,F*1.25/m); INTRO.roll=102; INTRO.yaw=12;
    var bpx=INTRO.s*m*(vw/vh<1.05?1:1.05), sx=vw+bpx*.7, ex=-bpx*.8, y1=cy-h*.03, start=performance.now();
    function px2p(px){ return (px/(vw/2)-1)/.92 }
    function py2p(py){ return (1-2*py/vh)/.9 }
    INTRO.on=true;
    function tick(now){
      if(done) return;
      var t=clamp((now-start)/dur,0,1), e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
      var bx=lerp(sx,ex,e), by=y1+Math.sin(t*5.5)*h*.07+(t-.5)*h*.25;
      INTRO.x=px2p(bx); INTRO.y=py2p(by);
      var shown=clamp((bx-x0)/w,0,1);                         /* the word is revealed behind the bird, from right to left */
      wm.style.clipPath='inset(-20% -2% -20% '+(shown*100)+'%)';
      if(t<1){ requestAnimationFrame(tick); return; }
      wm.style.clipPath='none'; fly2();
    }
    function fly2(){ /* second lap: the bird comes round and enters again from the right, settling into its hero pose */
      var s2=performance.now(), d2=1900, gr=gl.ok?1:-1, tg={x:pose.x,y:pose.y,s:pose.s,roll:gr*pose.roll,yaw:pose.yaw,pitch:pose.pitch},
          fx=px2p(vw+bpx*.8), fy=py2p(cy), f0={s:INTRO.s,roll:INTRO.roll,yaw:INTRO.yaw};
      INTRO.x=fx; INTRO.y=fy;
      var xp=px2p(x0+w+bpx*.75), yp=py2p(cy-h*.12), dA=1000, dB=1700;
      setTimeout(function(){ /* the bird brushes past the word's end and softly pushes it up into the corner */
        var tr=document.querySelector('#hero .logo span').getBoundingClientRect(), sc=tr.width/w;
        wm.style.transition='transform 2.3s cubic-bezier(.45,0,.15,1),opacity .5s ease';
        wm.style.transform='translate('+tr.left+'px,'+(tr.top-(h*sc-tr.height)/2)+'px) scale('+sc+')';
        setTimeout(function(){doc.classList.add('landing')},1300);
        setTimeout(end,2300);
      },dA-500);
      (function t2(now){
        if(done) return;
        var el=now-s2, tx,ty,rl,ys,sz;
        if(el<dA){ var u=el/dA, e=1-Math.pow(1-u,2.2); tx=lerp(fx,xp,e); ty=lerp(fy,yp,e); rl=f0.roll; ys=f0.yaw; sz=f0.s; INTRO.pitch=0; }
        else { var u2=clamp((el-dA)/dB,0,1), e2=u2<.5?2*u2*u2:1-Math.pow(-2*u2+2,2)/2;
          tx=lerp(xp,tg.x,e2); ty=lerp(yp,tg.y,e2)+Math.sin(u2*Math.PI)*.12; rl=lerp(f0.roll,tg.roll,e2); ys=lerp(f0.yaw,tg.yaw,e2); sz=lerp(f0.s,tg.s,e2); INTRO.pitch=lerp(0,tg.pitch,e2); }
        INTRO.x=tx; INTRO.y=ty; INTRO.s=sz; INTRO.roll=rl; INTRO.yaw=ys;
        if(el<dA+dB){ requestAnimationFrame(t2); return; }
        INTRO.on=false; pose.intro=1;
      })(performance.now());
    }
    requestAnimationFrame(tick);
  }
  try{ document.fonts.ready.then(function(){ setTimeout(run,250) }); }catch(e){}
  setTimeout(run,1600);
  setTimeout(end,10000);
})();
