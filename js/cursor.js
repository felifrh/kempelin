import {doc,$,lerp} from './util.js';

/* ---------- cursor dot ---------- */
(function(){
  var fine=false; try{fine=matchMedia('(hover:hover) and (pointer:fine)').matches}catch(e){}
  var dot=$('#dot'); if(!fine||!dot) return;
  var x=-100,y=-100,dx=-100,dy=-100;
  doc.classList.add('has-dot');
  addEventListener('mousemove',function(e){x=e.clientX;y=e.clientY;dot.classList.add('on')});
  document.addEventListener('mouseover',function(e){ var h=e.target.closest&&e.target.closest('a,button,[data-hover],input'); dot.classList.toggle('big',!!h); });
  (function loop(){ dx=lerp(dx,x,.22); dy=lerp(dy,y,.22); dot.style.transform='translate('+dx+'px,'+dy+'px)'; requestAnimationFrame(loop); })();
})();
