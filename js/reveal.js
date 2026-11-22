import {RM} from './util.js';

/* ---------- reveal on scroll ---------- */
(function(){
  var els=[].slice.call(document.querySelectorAll('.rv'));
  if(!('IntersectionObserver' in window)||RM){els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){ if(x.isIntersecting){ x.target.style.transitionDelay=(x.target.dataset.d||0)+'ms'; x.target.classList.add('in'); io.unobserve(x.target);} })},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
  els.forEach(function(e,i){ e.dataset.d=(i%4)*70; io.observe(e); });
})();
