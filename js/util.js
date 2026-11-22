/* Shared helpers */
export var RM=false; try{RM=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
export var doc=document.documentElement;
export var $=function(s,r){return (r||document).querySelector(s)};
export var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
export var clamp=function(v,a,b){return Math.max(a,Math.min(b,v))};
export var lerp=function(a,b,t){return a+(b-a)*t};
export var smooth=function(t){t=clamp(t,0,1);return t*t*(3-2*t)};
export function hexRGB(h){h=h.replace('#','');return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]}
