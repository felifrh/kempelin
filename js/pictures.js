import {RM} from './util.js';

/* ---------- pictures ---------- */
var IMG={};["amz","ig","tt"].forEach(function(k){ IMG[k]=new URL("../assets/img/sim-"+k+".jpg",import.meta.url).href });
document.querySelectorAll('img[data-k]').forEach(function(im){ if(IMG[im.dataset.k]) im.src=IMG[im.dataset.k]; });
(function(){
  var fine=false; try{fine=matchMedia('(hover:hover) and (pointer:fine)').matches}catch(e){}
  if(!fine||RM) return;
  document.querySelectorAll('.shot').forEach(function(f){
    var ph=f.querySelector('.ph');
    f.addEventListener('mousemove',function(e){ var r=f.getBoundingClientRect(), u=(e.clientX-r.left)/r.width-.5, v=(e.clientY-r.top)/r.height-.5; ph.style.transform='rotateY('+(u*10)+'deg) rotateX('+(-v*10)+'deg)'; });
    f.addEventListener('mouseleave',function(){ ph.style.transform=''; });
  });
})();
