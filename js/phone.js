import {$} from './util.js';
import {TEL} from './contact.js';
import {HINT} from '../content/strings.en.js';

/* ---------- phone reveal ---------- */
(function(){
  var b=$('#phone'), num=$('#phoneNum'), lab=b.querySelector('.lab'), hint=$('#hint');
  function size(){ var w=Math.max(lab.offsetWidth,num.offsetWidth); b.style.minWidth=w+'px'; }
  size(); try{document.fonts.ready.then(size)}catch(e){}
  addEventListener('resize',size);
  var touch=false; try{touch=!matchMedia('(hover:hover)').matches}catch(e){}
  function set(v){ b.setAttribute('aria-expanded',v?'true':'false'); hint.textContent=v?HINT.open:(touch?HINT.tap:HINT.hover); }
  b.addEventListener('mouseenter',function(){ if(!touch) set(true) });
  b.addEventListener('mouseleave',function(){ if(!touch) set(false) });
  b.addEventListener('focus',function(){ var fv=false; try{fv=b.matches(':focus-visible')}catch(e){} if(!touch&&fv) set(true) });
  b.addEventListener('blur',function(){ if(!touch&&!b.matches(':hover')) set(false) });
  /* touch: first tap reveals, second tap calls (tel: link) */
  b.addEventListener('click',function(){ if(!touch){ set(true); return } if(b.getAttribute('aria-expanded')==='true'){ location.href=TEL } else set(true) });
  if(touch) hint.textContent=HINT.tap;
})();
