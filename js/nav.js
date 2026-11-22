/* Native scroll, anchor links, section state and nav highlight */
import {RM,doc,clamp} from './util.js';

/* failsafe: never leave the page locked */
setTimeout(function(){ if(!doc.classList.contains('loading')){ document.body.style.overflow=''; } },4000);
export function scrollToEl(el){ el.scrollIntoView({behavior:RM?'auto':'smooth'}); }
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  var id=a.getAttribute('href').slice(1);
  if(/^(sim-|privacy$)/.test(id)||a.classList.contains('skip')) return;
  a.addEventListener('click',function(e){var el=document.getElementById(id); if(el){e.preventDefault();scrollToEl(el)}});
});

var order=['hero','idea','services','explore','work','contact'];
var secs=order.map(function(id){return document.getElementById(id)});
var navLinks=[].slice.call(document.querySelectorAll('#nav a'));

export function sectionState(){
  var vh=innerHeight, mid=vh*.5, idx=0, frac=0, rect;
  for(var i=0;i<secs.length;i++){ rect=secs[i].getBoundingClientRect(); if(rect.top<=mid && rect.bottom>mid){idx=i;} }
  rect=secs[idx].getBoundingClientRect();
  var h=Math.max(1,rect.height);
  frac=clamp((mid-rect.top)/h,0,1);
  if(idx===0){ /* sticky hero: use the next section's progress */
    var nr=secs[1].getBoundingClientRect(); frac=clamp((vh-nr.top)/mid,0,1);
  }
  return {idx:idx,frac:frac};
}
var activeNav=-1;
export function setNav(i){ if(i===activeNav)return; activeNav=i; navLinks.forEach(function(a,k){a.classList.toggle('on',k===i)}); }
