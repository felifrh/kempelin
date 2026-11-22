import {$$} from './util.js';

/* Modal behaviour for overlays: background inert, Tab trapped inside, focus restored by the caller. */
var inerted=[], active=null;
var FOCUSABLE='a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';
function trap(e){
  if(e.key!=='Tab'||!active) return;
  var f=$$(FOCUSABLE,active).filter(function(el){return el.offsetParent!==null});
  if(!f.length) return;
  var first=f[0], last=f[f.length-1];
  if(e.shiftKey&&document.activeElement===first){ e.preventDefault(); last.focus() }
  else if(!e.shiftKey&&document.activeElement===last){ e.preventDefault(); first.focus() }
}
export function lock(dlg){
  active=dlg; inerted=[];
  Array.prototype.forEach.call(document.body.children,function(c){
    if(c===dlg||c.tagName==='SCRIPT'||c.hasAttribute('inert')) return;
    c.setAttribute('inert',''); inerted.push(c);
  });
  document.addEventListener('keydown',trap);
}
export function unlock(){
  inerted.forEach(function(c){c.removeAttribute('inert')}); inerted=[]; active=null;
  document.removeEventListener('keydown',trap);
}
