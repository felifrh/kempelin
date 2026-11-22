import {$,doc} from './util.js';

/* Logo + language switch: always on the hero; further down it hides while scrolling down and returns on a solid bar when scrolling up. */
var bar=$('#top'), last=window.scrollY, ticking=false;
function update(){
  ticking=false;
  var y=window.scrollY, top=y<24, dy=y-last;
  if(doc.classList.contains('loading')){ last=y; return; }
  if(top){ bar.classList.remove('solid','hide'); }
  else if(dy<-4){ bar.classList.add('solid'); bar.classList.remove('hide'); }
  else if(dy>4){ bar.classList.add('hide'); }
  if(Math.abs(dy)>4) last=y;
}
addEventListener('scroll',function(){ if(!ticking){ ticking=true; requestAnimationFrame(update) } },{passive:true});
