(function(){
'use strict';
var RM=false; try{RM=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
var doc=document.documentElement;
var $=function(s){return document.querySelector(s)};
var clamp=function(v,a,b){return Math.max(a,Math.min(b,v))};
var lerp=function(a,b,t){return a+(b-a)*t};
var smooth=function(t){t=clamp(t,0,1);return t*t*(3-2*t)};

/* ---------- smooth scroll ---------- */
var lenis=null;
try{ if(false && window.Lenis && !RM){ lenis=new Lenis({duration:1.15,easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t))}}); } }catch(e){lenis=null}
var lastY=window.scrollY, vel=0;
function relen(){ if(lenis){ try{ lenis.resize() }catch(e){} } }
addEventListener('load',function(){ relen(); setTimeout(relen,600); });
try{ if('ResizeObserver' in window){ new ResizeObserver(relen).observe(document.body); } }catch(e){}
/* failsafe: never leave the page locked */
setTimeout(function(){ if(!doc.classList.contains('loading')){ document.body.style.overflow=''; var so=document.getElementById('sim'); if(lenis&&!(so&&so.classList.contains('open'))){ try{lenis.start()}catch(e){} } } },4000);
function scrollToEl(el){ if(lenis){lenis.scrollTo(el,{offset:0,duration:1.4})} else {el.scrollIntoView({behavior:RM?'auto':'smooth'})} }
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  var id=a.getAttribute('href').slice(1);
  if(/-simulation$/.test(id)) return;
  a.addEventListener('click',function(e){var el=document.getElementById(id); if(el){e.preventDefault();scrollToEl(el)}});
});

/* ---------- sections + nav ---------- */
var order=['hero','idea','services','explore','work','contact'];
var secs=order.map(function(id){return document.getElementById(id)});
var navLinks=[].slice.call(document.querySelectorAll('#nav a'));

/* poses: x,y in viewport fractions (-1..1), s = width relative to the smaller viewport side, degrees, colour.
   L = landscape, M = portrait. The bird keeps to a free lane so it never sits on running text. */
var POSES=[
 {c:'#DAE666',L:{x:.5,y:.16,s:.42,roll:-10,yaw:28,pitch:10},   M:{x:.38,y:.42,s:.78,roll:-10,yaw:28,pitch:10}},   /* hero: acid on grey */
 {c:'#25281F',L:{x:-.74,y:-.04,s:.36,roll:-18,yaw:-30,pitch:6},M:{x:.78,y:-.72,s:.36,roll:-18,yaw:-30,pitch:6}},  /* idea: left lane / bottom right */
 {c:'#DAE666',L:{x:0,y:0,s:.7,roll:8,yaw:20,pitch:0},         M:{x:0,y:0,s:.9,roll:8,yaw:20,pitch:0}},         /* services: hidden behind the olive field */
 {c:'#25281F',L:{x:.7,y:.08,s:.44,roll:14,yaw:36,pitch:-8},   M:{x:.82,y:.92,s:.38,roll:14,yaw:36,pitch:-8}},   /* explore: right lane / top right */
 {c:'#25281F',L:{x:.8,y:.52,s:.36,roll:-8,yaw:-28,pitch:8},  M:{x:.62,y:1.02,s:.38,roll:-8,yaw:-28,pitch:8}},    /* work: top right above the pictures */
 {c:'#25281F',L:{x:-.74,y:0,s:.4,roll:-6,yaw:-24,pitch:8},   M:{x:.34,y:.94,s:.68,roll:-30,yaw:-28,pitch:8}}    /* contact: left lane / beside the headline; phone: same scale as the hero, above the text */
];
function sectionState(){
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
function setNav(i){ if(i===activeNav)return; activeNav=i; navLinks.forEach(function(a,k){a.classList.toggle('on',k===i)}); }

/* ---------- WebGL swift ---------- */
var PTS=[[127.76,253.47],[127.64,253.49],[127.51,253.49],[127.38,253.45],[127.17,253.31],[127.01,253.16],[126.84,252.94],[126.64,252.59],[126.26,251.74],[126.01,251.04],[125.64,249.81],[124.1,244.18],[123.59,242.44],[123.13,240.94],[122.67,239.56],[122.21,238.31],[121.7,237.06],[121.14,235.78],[120.38,234.18],[119.55,232.56],[118.8,231.18],[118.14,230.09],[117.64,229.37],[117.14,228.79],[116.88,228.55],[116.64,228.35],[116.38,228.18],[116.14,228.04],[115.76,227.89],[115.38,227.81],[115.01,227.79],[114.64,227.83],[114.26,227.92],[113.88,228.07],[113.45,228.31],[113.01,228.62],[112.38,229.16],[111.73,229.81],[108.01,233.89],[106.26,235.77],[104.51,237.57],[103.14,238.9],[102.51,239.46],[101.88,239.98],[101.38,240.35],[101.01,240.58],[100.64,240.74],[100.38,240.77],[100.26,240.73],[100.21,240.68],[100.13,240.56],[100.11,240.44],[100.11,240.18],[100.17,239.81],[100.37,239.18],[100.61,238.56],[101.01,237.68],[101.38,236.91],[101.89,235.94],[102.64,234.58],[103.86,232.44],[105.51,229.68],[107.65,226.18],[112.07,219.06],[112.59,218.18],[113.01,217.44],[113.43,216.56],[113.63,216.06],[113.75,215.68],[113.93,214.94],[114.0,214.18],[114.0,213.56],[113.93,212.94],[113.81,212.31],[113.62,211.56],[113.15,210.06],[110.15,201.31],[109.46,199.18],[108.85,197.18],[107.72,193.31],[106.97,190.56],[106.33,187.94],[105.75,185.31],[105.27,182.81],[104.79,180.06],[104.45,177.81],[104.18,175.68],[103.91,172.94],[103.62,169.44],[103.5,167.44],[103.32,163.68],[103.23,162.31],[103.16,161.56],[103.07,160.94],[102.96,160.31],[102.84,159.81],[102.57,158.94],[102.23,158.06],[101.74,157.06],[101.11,155.94],[99.76,153.69],[97.04,149.31],[94.29,144.81],[87.85,134.18],[84.8,129.06],[81.59,123.56],[77.3,115.93],[76.07,113.68],[73.74,109.31],[71.8,105.56],[69.77,101.43],[67.51,96.68],[66.47,94.43],[64.14,89.15],[62.38,85.06],[60.81,81.31],[59.62,78.31],[58.09,74.18],[56.14,68.72],[55.36,66.43],[53.26,60.0],[52.14,56.31],[51.01,52.33],[50.14,48.96],[49.81,47.56],[49.57,46.43],[49.39,45.43],[49.28,44.56],[49.23,43.93],[49.23,43.31],[49.28,42.81],[49.39,42.45],[49.51,42.24],[49.64,42.14],[49.76,42.08],[49.89,42.07],[50.01,42.09],[50.26,42.18],[50.64,42.44],[51.01,42.79],[51.39,43.21],[51.76,43.68],[52.26,44.37],[52.76,45.11],[53.51,46.29],[54.26,47.54],[56.57,51.56],[62.86,62.31],[64.08,64.31],[66.81,68.68],[68.68,71.56],[74.09,79.68],[80.48,88.81],[86.01,96.43],[91.2,103.43],[99.3,114.06],[105.64,122.13],[107.99,125.06],[108.85,126.06],[109.51,126.77],[110.14,127.36],[110.76,127.85],[111.38,128.23],[111.76,128.42],[112.14,128.56],[112.51,128.68],[112.88,128.76],[113.26,128.82],[113.76,128.85],[114.38,128.85],[115.14,128.78],[117.76,128.37],[119.01,128.23],[120.14,128.19],[120.76,128.21],[121.26,128.26],[121.76,128.33],[122.26,128.43],[122.76,128.56],[123.26,128.73],[123.76,128.92],[124.14,129.1],[124.55,129.31],[125.01,129.59],[125.51,129.92],[125.88,130.21],[126.38,130.63],[126.84,131.06],[127.31,131.56],[127.73,132.06],[128.12,132.56],[128.51,133.11],[129.19,134.18],[129.88,135.44],[130.5,136.68],[131.73,139.31],[132.38,140.57],[132.76,141.2],[133.17,141.81],[133.54,142.31],[134.01,142.85],[134.61,143.44],[135.26,143.97],[136.01,144.5],[136.76,144.95],[137.76,145.49],[138.88,146.03],[140.26,146.64],[141.64,147.21],[143.64,147.98],[151.64,150.97],[158.14,153.31],[165.87,156.06],[181.51,161.71],[184.26,162.68],[186.26,163.37],[200.38,168.08],[205.01,169.55],[208.64,170.73],[210.76,171.4],[221.14,174.54],[226.01,175.92],[229.88,177.05],[237.01,179.09],[242.76,180.67],[244.51,181.18],[246.52,181.81],[248.36,182.44],[249.33,182.81],[249.89,183.06],[250.59,183.44],[250.96,183.68],[251.22,183.94],[251.31,184.06],[251.37,184.18],[251.4,184.31],[251.39,184.44],[251.34,184.56],[251.24,184.68],[251.14,184.77],[250.88,184.92],[250.56,185.06],[250.16,185.18],[249.62,185.31],[249.14,185.4],[247.76,185.56],[245.9,185.68],[244.01,185.73],[241.76,185.71],[237.88,185.59],[234.38,185.46],[227.01,185.04],[224.76,184.9],[220.51,184.57],[217.51,184.31],[207.64,183.27],[198.76,182.15],[194.51,181.54],[188.01,180.54],[183.26,179.79],[173.64,178.1],[170.38,177.47],[166.64,176.71],[153.51,173.87],[149.14,172.86],[143.38,171.42],[141.88,171.1],[141.38,171.03],[140.88,170.98],[140.51,170.97],[140.14,170.98],[139.76,171.02],[139.38,171.1],[139.01,171.23],[138.76,171.35],[138.51,171.5],[138.26,171.69],[138.01,171.92],[137.79,172.18],[137.62,172.44],[137.41,172.81],[137.24,173.18],[137.1,173.56],[136.91,174.18],[136.76,174.81],[135.75,179.68],[135.18,182.18],[134.7,184.18],[134.28,185.81],[133.83,187.44],[133.32,189.18],[132.73,191.06],[132.08,193.06],[131.52,194.68],[130.8,196.68],[129.96,198.94],[129.26,200.68],[128.53,202.44],[126.1,207.94],[125.91,208.44],[125.74,208.94],[125.61,209.44],[125.54,209.81],[125.5,210.44],[125.54,211.06],[125.62,211.44],[125.7,211.68],[125.79,211.94],[125.96,212.31],[126.18,212.68],[126.52,213.18],[126.92,213.68],[128.14,215.15],[128.54,215.68],[128.88,216.19],[129.27,216.81],[129.6,217.44],[129.89,218.06],[130.19,218.81],[130.44,219.56],[130.64,220.23],[130.83,221.06],[130.97,221.81],[131.1,222.68],[131.2,223.56],[131.28,224.56],[131.35,225.68],[131.42,227.56],[131.42,229.68],[131.37,232.31],[131.27,234.94],[131.15,236.68],[130.98,238.68],[130.67,241.68],[130.39,244.06],[130.11,246.06],[129.79,247.94],[129.47,249.56],[129.14,250.95],[128.82,251.94],[128.51,252.66],[128.35,252.94],[128.14,253.21],[128.01,253.33],[127.88,253.41],[127.76,253.47]];  /* swift outline, corners softened */
var gl={ok:false};
function initGL(){
  if(!window.THREE){throw new Error('three missing')}
  var T=THREE, canvas=$('#bird');
  var renderer=new T.WebGLRenderer({canvas:canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
  renderer.setClearColor(0x000000,0);
  var scene=new T.Scene();
  var camera=new T.PerspectiveCamera(30,1,.1,50); camera.position.set(0,0,1/Math.tan(15*Math.PI/180));
  scene.add(new T.AmbientLight(0xffffff,.62));
  var dl=new T.DirectionalLight(0xffffff,.55); dl.position.set(-1.2,2,3); scene.add(dl);
  var dl2=new T.DirectionalLight(0xffffff,.2); dl2.position.set(2,-1,1.5); scene.add(dl2);
  var shape=new T.Shape();
  PTS.forEach(function(p,i){ if(i===0) shape.moveTo(p[0],-p[1]); else shape.lineTo(p[0],-p[1]); });
  var geo=new T.ExtrudeGeometry(shape,{depth:4,bevelEnabled:true,bevelThickness:3,bevelSize:2,bevelSegments:6,curveSegments:8});
  try{ /* smooth shading of the thin slab */
    var ps=geo.attributes.position, nm=geo.attributes.normal, acc={}, kk=[], q;
    for(q=0;q<ps.count;q++){ var key=Math.round(ps.getX(q)*50)+'|'+Math.round(ps.getY(q)*50)+'|'+Math.round(ps.getZ(q)*50); kk.push(key); var o=acc[key]||(acc[key]=[0,0,0]); o[0]+=nm.getX(q);o[1]+=nm.getY(q);o[2]+=nm.getZ(q); }
    for(q=0;q<ps.count;q++){ var v=acc[kk[q]], l=Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2])||1; nm.setXYZ(q,v[0]/l,v[1]/l,v[2]/l); }
    nm.needsUpdate=true;
  }catch(e){}
  geo.computeBoundingBox();
  var b0=geo.boundingBox, cx=(b0.min.x+b0.max.x)/2, cy=(b0.min.y+b0.max.y)/2, cz=(b0.min.z+b0.max.z)/2, HS=(b0.max.z-b0.min.z)/2;
  geo.translate(-cx,-cy,-cz);
var bb=geo.boundingBox, bw=bb.max.x-bb.min.x;
  var mat=new T.MeshStandardMaterial({color:0xDAE666,roughness:.42,metalness:0,side:T.DoubleSide});
  var mesh=new T.Mesh(geo,mat); mesh.rotation.order='YXZ';
  try{ /* inflated body + head: a height field over the interior, thickness grows with distance from the outline; wings and tail stay thin */
    var N=PTS.length, X=[],Y=[],mnx=1e9,mxx=-1e9,mny=1e9,mxy=-1e9;
    PTS.forEach(function(p){X.push(p[0]);Y.push(-p[1]);mnx=Math.min(mnx,p[0]);mxx=Math.max(mxx,p[0]);mny=Math.min(mny,-p[1]);mxy=Math.max(mxy,-p[1])});
    var st=.8, nx=Math.ceil((mxx-mnx)/st)+1, ny=Math.ceil((mxy-mny)/st)+1, D=new Float32Array(nx*ny), dmax=0, gi,gj;
    for(gj=0;gj<ny;gj++)for(gi=0;gi<nx;gi++){
      var px=mnx+gi*st, py=mny+gj*st, ins=false, dm=1e9, a,b;
      for(a=0,b=N-1;a<N;b=a++){ var xi=X[a],yi=Y[a],xj=X[b],yj=Y[b];
        if(((yi>py)!==(yj>py))&&(px<(xj-xi)*(py-yi)/(yj-yi)+xi)) ins=!ins;
        var dx=xj-xi,dy=yj-yi,l=dx*dx+dy*dy,t=l?clamp(((px-xi)*dx+(py-yi)*dy)/l,0,1):0,ex=xi+t*dx-px,ey=yi+t*dy-py,dd=ex*ex+ey*ey; if(dd<dm)dm=dd; }
      var d=ins?Math.sqrt(dm):-1; D[gj*nx+gi]=d; if(d>dmax)dmax=d;
    }
    var D0=4, B=15, span=Math.max(8,dmax*.85)-D0, idx=new Int32Array(nx*ny).fill(-1), pos=[], n=0;
    for(gj=0;gj<ny;gj++)for(gi=0;gi<nx;gi++){ var dv=D[gj*nx+gi]; if(dv<D0)continue; var tt=clamp((dv-D0)/span,0,1), z=HS+B*tt*tt*(3-2*tt), x=mnx+gi*st-cx, y=mny+gj*st-cy;
      idx[gj*nx+gi]=n++; pos.push(x,y,z); }
    /* soften the height field: two blur passes so the surface has no visible steps */
    var BZ=new Float32Array(nx*ny), BT, pass, o2;
    for(q=0;q<nx*ny;q++){ if(idx[q]>=0) BZ[q]=pos[idx[q]*3+2]-HS; }
    for(pass=0;pass<3;pass++){ BT=new Float32Array(BZ);
      for(gj=1;gj<ny-1;gj++)for(gi=1;gi<nx-1;gi++){ o2=gj*nx+gi; if(idx[o2]<0)continue;
        BT[o2]=(BZ[o2]*4+BZ[o2-1]*2+BZ[o2+1]*2+BZ[o2-nx]*2+BZ[o2+nx]*2+BZ[o2-nx-1]+BZ[o2-nx+1]+BZ[o2+nx-1]+BZ[o2+nx+1])/16; }
      BZ=BT; }
    for(q=0;q<nx*ny;q++){ if(idx[q]>=0) pos[idx[q]*3+2]=HS+BZ[q]; }
    var cnt=n, tri=[];
    for(gj=0;gj<ny-1;gj++)for(gi=0;gi<nx-1;gi++){ var A=idx[gj*nx+gi],Bq=idx[gj*nx+gi+1],C=idx[(gj+1)*nx+gi+1],Dq=idx[(gj+1)*nx+gi];
      if(A>=0&&Bq>=0&&C>=0){tri.push(A,Bq,C,A+cnt,C+cnt,Bq+cnt)}
      if(A>=0&&C>=0&&Dq>=0){tri.push(A,C,Dq,A+cnt,Dq+cnt,C+cnt)} }
    for(q=0;q<cnt;q++){ pos.push(pos[q*3],pos[q*3+1],-pos[q*3+2]); }
    var g2=new T.BufferGeometry(); g2.setAttribute('position',new T.Float32BufferAttribute(pos,3)); g2.setIndex(tri); g2.computeVertexNormals();
    mesh.add(new T.Mesh(g2,mat));
  }catch(e){}
  var holder=new T.Group(); holder.add(mesh); scene.add(holder);
  gl={ok:true,T:T,renderer:renderer,scene:scene,camera:camera,mesh:mesh,holder:holder,mat:mat,bw:bw,
      };
  resize();
}
function resize(){
  if(!gl.ok)return;
  var w=innerWidth,h=innerHeight,dpr=Math.min(devicePixelRatio||1,2);
  gl.renderer.setPixelRatio(dpr); gl.renderer.setSize(w,h,false);
  gl.camera.aspect=w/h; gl.camera.updateProjectionMatrix();
}
function hexRGB(h){h=h.replace('#','');return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]}
var fb=$('#fallbackBird'), fbPath=fb?fb.querySelector('path'):null;
var pose={x:.6,y:.2,s:.5,roll:-10,yaw:28,pitch:10,col:hexRGB('#DAE666'),calm:1,intro:RM?1:0};
var INTRO={on:false,x:2,y:0,s:.3,roll:102,yaw:12,pitch:0};
function getBase(){ var w=innerWidth,h=innerHeight; return (w/h<1.05)?w:Math.min(w,h*1.35); }
var t0=performance.now();
function frame(now){
  requestAnimationFrame(frame);
  var y=window.scrollY; vel=lerp(vel,(y-lastY),.2); lastY=y;
  var st=sectionState(); setNav(st.idx); try{SVC.update()}catch(e){}
  var asp=innerWidth/innerHeight, pt=asp<1.05, BASE=getBase();
  function P(i){var o=POSES[i],q=pt?o.M:o.L, s=q.s, x=q.x;
    if(i===5){ var w=innerWidth;                          /* contact: bigger bird in small windows, phones unchanged */
      if(pt){ s=lerp(.68,.5,clamp((w-520)/160,0,1)); }
      else { var g=clamp((1400-w)/500,0,1); s*=1+.5*g; x+=.03*g; } }
    return {x:x,y:q.y,s:s,roll:q.roll,yaw:q.yaw,pitch:q.pitch,c:o.c}}
  var a=P(st.idx),b=P(Math.min(st.idx+1,POSES.length-1));
  var k=smooth((st.frac-.3)/.7), p=pose, f=RM?1:.075;
  p.x=lerp(p.x,lerp(a.x,b.x,k),f);p.y=lerp(p.y,lerp(a.y,b.y,k),f);p.s=lerp(p.s,lerp(a.s,b.s,k),f);
  p.roll=lerp(p.roll,lerp(a.roll,b.roll,k),f);p.yaw=lerp(p.yaw,lerp(a.yaw,b.yaw,k),f);p.pitch=lerp(p.pitch,lerp(a.pitch,b.pitch,k),f);
  var ca=hexRGB(a.c),cb=hexRGB(b.c);
  for(var i=0;i<3;i++) p.col[i]=lerp(p.col[i],lerp(ca[i],cb[i],k),RM?1:.08);
  var calm=1;                                               /* portrait: bird shrinks while text is on screen, grows between sections */
  if(pt&&st.idx>0&&st.idx<5) calm=lerp(.8,1,smooth(Math.abs(st.frac-.5)*2.6-.3));
  p.calm=lerp(p.calm,calm,.1);
  var intro=p.intro; if(intro<1&&!doc.classList.contains('loading')){p.intro=intro=Math.min(1,intro+.012)}
  var ie=1-Math.pow(1-intro,3), time=(now-t0)/1000, wob=RM?0:1, bank=clamp(vel*-.35,-18,18);
  var X=p.x,Y=p.y,S=p.s,R=p.roll,YW=p.yaw,PT=p.pitch,CL=p.col,CM=p.calm,IE=ie,BK=bank;
  if(INTRO.on){ X=INTRO.x;Y=INTRO.y;S=INTRO.s;R=INTRO.roll;YW=INTRO.yaw;PT=INTRO.pitch;CM=1;IE=1;BK=0;CL=[218,230,102]; }
  if(!gl.ok){
    if(!fb) return;
    var vw=innerWidth, vh=innerHeight, w=S*BASE*(pt?1:1.05)*IE*CM;
    fb.style.width=w+'px'; fb.style.left=((.5+X*.46)*vw-w/2)+'px'; fb.style.top=((.5-Y*.45)*vh-w*1.07/2)+'px'; fb.style.right='auto';
    fb.style.transform='rotate('+(INTRO.on?-R:(R+BK))+'deg)'; fbPath.setAttribute('fill','rgb('+CL.map(Math.round).join(',')+')');
    return;
  }
  gl.mat.color.setRGB(CL[0]/255,CL[1]/255,CL[2]/255);
  var unit=2*BASE/innerHeight;                               /* world units for 100% of the smaller side */
  gl.holder.position.set(X*asp*.92 + (1-IE)*-asp*1.2, Y*.9 + Math.sin(time*.9)*.018*wob, 0);
  var sc=(S*unit*IE*CM)/gl.bw; gl.mesh.scale.set(sc,sc,sc);
  var D=Math.PI/180;
  gl.mesh.rotation.set((PT+Math.sin(time*.7)*2.5*wob)*D,(YW+Math.sin(time*.5)*5*wob)*D,(R+BK+Math.sin(time*1.1)*2*wob)*D);
  gl.renderer.render(gl.scene,gl.camera);
}
try{ initGL(); }catch(e){ doc.classList.add('nowebgl'); var c=$('#bird'); if(c)c.style.display='none'; }
addEventListener('resize',resize);
function raf(now){ if(lenis) lenis.raf(now); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
requestAnimationFrame(frame);

/* ---------- intro: the swift flies in from the right (head down-left), opens the wordmark, which then settles top left ---------- */
(function(){
  if(!doc.classList.contains('loading')){ return; }
  var wm=$('#wm'), dur=2700, started=false, done=false;
  try{scrollTo(0,0)}catch(e){}
  if(lenis) lenis.stop();
  document.body.style.overflow='hidden';
  function end(){ if(done) return; done=true; INTRO.on=false; wm.style.opacity=0; setTimeout(function(){wm.style.display='none'},600); doc.classList.add('landing'); doc.classList.remove('loading'); document.body.style.overflow=''; if(lenis) lenis.start(); pose.intro=1; }
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

/* ---------- reveal on scroll ---------- */
(function(){
  var els=[].slice.call(document.querySelectorAll('.rv'));
  if(!('IntersectionObserver' in window)||RM){els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){ if(x.isIntersecting){ x.target.style.transitionDelay=(x.target.dataset.d||0)+'ms'; x.target.classList.add('in'); io.unobserve(x.target);} })},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
  els.forEach(function(e,i){ e.dataset.d=(i%4)*70; io.observe(e); });
})();

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

/* ---------- pictures ---------- */
var IMG={"amz":"assets/img/sim-amz.jpg","ig":"assets/img/sim-ig.jpg","tt":"assets/img/sim-tt.jpg"};
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

/* ---------- services: pinned, scroll-driven graphics ---------- */
var SVC=(function(){
  var sec=$('#services'), cards=[].slice.call(sec.querySelectorAll('.svc')), steps=[].slice.call(sec.querySelectorAll('.steps li')), stepsEl=$('#steps');
  var ease=smooth, cl=clamp, fmt=function(v){return '$'+v.toFixed(2)};
  /* amazon */
  var A=[{n:'Product cost',v:6.50,c:'#EDE9AF'},{n:'Amazon referral fee',v:4.31,c:'#ABB9BA'},{n:'FBA and shipping',v:6.20,c:'#FFFFFF'},{n:'Advertising',v:5.17,c:'#8E9A7A'},{n:'Returns',v:1.20,c:'#5F6A55'},{n:'You keep',v:6.53,c:'#DAE666'}];
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
  function gF(q){ fRows.forEach(function(li,k){ var ok=q>(k+.5)/6; li.classList.toggle('ok',ok); li.querySelector('.s').textContent=ok?'Complete':'Missing'; });
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
  setPin(); setTimeout(relen,50); addEventListener('resize',function(){ setPin(); setTimeout(relen,50); });
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
    if(lenis) lenis.scrollTo(y,{duration:1.3}); else scrollTo({top:y,behavior:RM?'auto':'smooth'}); }); });
  return {update:update};
})();
/* ---------- phone reveal ---------- */
(function(){
  var b=$('#phone'), num=$('#phoneNum'), lab=b.querySelector('.lab'), hint=$('#hint');
  function size(){ var w=Math.max(lab.offsetWidth,num.offsetWidth); b.style.minWidth=w+'px'; }
  size(); try{document.fonts.ready.then(size)}catch(e){}
  addEventListener('resize',size);
  var touch=false; try{touch=!matchMedia('(hover:hover)').matches}catch(e){}
  function set(v){ b.setAttribute('aria-expanded',v?'true':'false'); hint.textContent=v?'Select the number to copy it':(touch?'Tap to show the number':'Hover or tap to show the number'); }
  b.addEventListener('mouseenter',function(){ if(!touch) set(true) });
  b.addEventListener('mouseleave',function(){ if(!touch) set(false) });
  b.addEventListener('focus',function(){ var fv=false; try{fv=b.matches(':focus-visible')}catch(e){} if(!touch&&fv) set(true) });
  b.addEventListener('blur',function(){ if(!touch&&!b.matches(':hover')) set(false) });
  b.addEventListener('click',function(){ if(touch) set(b.getAttribute('aria-expanded')!=='true'); else set(true) });
  if(touch) hint.textContent='Tap to show the number';
})();

/* ---------- amazon simulation ---------- */
(function(){
  var sim=$('#sim'), openB=$('#openSim'), closeB=$('#closeSim'), lastFocus=null;
  var F={price:1,cogs:1,ref:1,fba:1,inb:1,acos:1,ret:1,units:1};
  var cur=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'});
  var cur0=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
  var num0=new Intl.NumberFormat('en-US');
  function V(id){return parseFloat(document.getElementById(id).value)}
  function calc(){
    var price=V('price'),cogs=V('cogs'),ref=V('ref')/100,fba=V('fba'),inb=V('inb'),acos=V('acos')/100,ret=V('ret')/100,units=V('units');
    var net=price*(1-ret), refFee=net*ref, ads=net*acos, ship=fba+inb, retLoss=price*ret;
    var profit=net-refFee-ads-cogs-ship;
    var segs=[
      {n:'Product cost',v:cogs,c:'#25281F'},
      {n:'Amazon referral fee',v:refFee,c:'#5C6154'},
      {n:'FBA and shipping to Amazon',v:ship,c:'#ABB9BA'},
      {n:'Advertising',v:ads,c:'#EDE9AF'},
      {n:'Returns',v:retLoss,c:'#FFFFFF'}
    ];
    var costs=segs.reduce(function(s,x){return s+x.v},0);
    var total=Math.max(price,costs);
    var bar=$('#bar'); bar.innerHTML='';
    segs.forEach(function(s){var i=document.createElement('i');i.style.width=(s.v/total*100)+'%';i.style.background=s.c;bar.appendChild(i)});
    if(profit>0){var p=document.createElement('i');p.style.width=(profit/total*100)+'%';p.style.background='#DAE666';bar.appendChild(p)}
    var mark=$('#mark'); mark.style.left=(price/total*100)+'%'; $('#markL').textContent='Price '+cur.format(price); $('#markL').style.cssText=(price/total>.62)?'left:auto;right:8px':'left:8px;right:auto';
    var lg=$('#legend'); lg.innerHTML='';
    segs.concat([{n:profit>=0?'You keep':'You lose',v:profit,c:profit>=0?'#DAE666':'transparent'}]).forEach(function(s){
      var li=document.createElement('li'); li.innerHTML='<i style="background:'+s.c+'"></i><span>'+s.n+'</span><b>'+cur.format(s.v)+'</b>'; lg.appendChild(li);
    });
    var margin=profit/price*100, month=profit*units;
    $('#headline').innerHTML=(profit>=0
      ? 'You keep '+cur.format(profit)+' on every '+cur.format(price)+' unit.'
      : 'You lose '+cur.format(-profit)+' on every '+cur.format(price)+' unit.')
      +'<small>'+margin.toFixed(1)+'% margin. At '+num0.format(units)+' units a month that is '+(month>=0?cur0.format(month)+' kept.':cur0.format(-month)+' lost.')+'</small>';
    var den=(1-ret)*(1-ref-acos);
    $('#breakeven').textContent= den>0 ? 'Break-even price with these costs: '+cur.format((cogs+ship)/den) : 'Fees and advertising take more than every sale. No price breaks even.';
    document.getElementById('o_price').textContent=cur.format(price);
    document.getElementById('o_cogs').textContent=cur.format(cogs);
    document.getElementById('o_ref').textContent=(ref*100).toFixed(1)+'%';
    document.getElementById('o_fba').textContent=cur.format(fba);
    document.getElementById('o_inb').textContent=cur.format(inb);
    document.getElementById('o_acos').textContent=(acos*100).toFixed(0)+'%';
    document.getElementById('o_ret').textContent=(ret*100).toFixed(1)+'%';
    document.getElementById('o_units').textContent=num0.format(units);
  }
  Object.keys(F).forEach(function(k){document.getElementById(k).addEventListener('input',calc)});
  calc();
  function open(){
    if(sim.classList.contains('open'))return; lastFocus=document.activeElement; sim.classList.add('open'); doc.style.overflow='hidden'; if(lenis)lenis.stop();
    setTimeout(function(){closeB.focus()},400);
  }
  function close(){
    if(!sim.classList.contains('open'))return; sim.classList.remove('open'); doc.style.overflow=''; if(lenis)lenis.start();
    if(lastFocus&&lastFocus.focus) lastFocus.focus();
  }
  openB.addEventListener('click',function(e){e.preventDefault(); location.hash='amazon-simulation'});
  function leave(){ try{history.replaceState(null,'',location.href.split('#')[0])}catch(e){ if(location.hash)location.hash='explore' } close(); }
  closeB.addEventListener('click',leave);
  addEventListener('hashchange',function(){ if(location.hash==='#amazon-simulation')open(); else close(); });
  addEventListener('keydown',function(e){ if(e.key==='Escape'&&sim.classList.contains('open')) leave(); });
  if(location.hash==='#amazon-simulation') setTimeout(open,50);
})();
})();


/* ---------- extra simulations ---------- */
(function(){
var doc=document.documentElement;
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
var RMX=matchMedia('(prefers-reduced-motion: reduce)').matches;
var ICON={
 heart:'<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.4-7 10-7 10z"/></svg>',
 chat:'<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg>',
 send:'<svg viewBox="0 0 24 24"><path d="M21 4 3 11l7 3 3 7z"/></svg>',
 save:'<svg viewBox="0 0 24 24"><path d="M6 4h12v16l-6-4-6 4z"/></svg>'};

/* --- instagram + tiktok: videos only --- */
var VIDS=['assets/video/video-1.mp4','assets/video/video-2.mp4','assets/video/video-3.mp4'];
function vplay(v){ try{var p=v.play(); if(p&&p.catch)p.catch(function(){})}catch(e){} }
function initIG(){ var v=$('#igVid'); v.src=VIDS[1]; return {open:function(){ if(!RMX) vplay(v) },close:function(){ try{v.pause()}catch(e){} }}; }
function initTT(){ var vs=$$('#sim-tt video'); vs.forEach(function(v,i){ v.src=VIDS[i] }); return {open:function(){ if(!RMX) vs.forEach(vplay) },close:function(){ vs.forEach(function(v){try{v.pause()}catch(e){}}) }}; }

/* --- funding --- */
function initFU(){
  var out=$('#fuOut'), docs=$$('#fuDocs li'), size='small', need='amz', timers=[];
  var P={
    kso:{n:'Global Small Business Programme',k:'글로벌 소상공인 (K-소상공인) 육성사업',by:'Small Enterprise and Market Service (SEMAS)',cov:'Support to list products on international e-commerce platforms and to join trade fairs, online and offline.',who:'Small businesses with export potential.',sizes:['small']},
    vou:{n:'Export Voucher',k:'수출바우처',by:'Ministry of SMEs and Startups (via KOSME). A second voucher runs under the Ministry of Trade, Industry and Energy (via KOTRA).',cov:'You choose services from a menu, for example platform listing, content, marketing and certification. Costs are settled through the voucher, up to about KRW 100 million depending on programme and round.',who:'SMEs and mid-sized companies. Affiliates of large conglomerates are usually excluded.',sizes:['small','sme','mid']},
    log:{n:'Overseas Joint Logistics Centres',k:'해외공동물류센터',by:'KOTRA',cov:'Fulfilment through KOTRA’s partner centres abroad. International freight and duties are not covered.',who:'SMEs and mid-sized companies.',sizes:['small','sme','mid']},
    bra:{n:'Overseas Branch Office Programme',k:'해외지사화사업',by:'KOTRA, KOSME or OKTA',cov:'A local team acts as your branch office abroad: buyers, market information, follow-up.',who:'SMEs and mid-sized companies without a local branch.',sizes:['small','sme','mid']}};
  var RULE={amz:['kso','vou'],ful:['log','vou'],rep:['bra','vou']};
  var STEPS=[['Find the current notice',''],['Check who can apply',''],['Prepare the documents','with Kempelin'],['Apply online','with Kempelin'],['Selection and agreement',''],['Use the funding and settle','with Kempelin']];
  function card(id,best){
    var p=P[id];
    return '<div class="pl'+(best?' best':'')+'" role="group" aria-label="'+p.n+'"><div class="ph-top"><h4>'+p.n+'<small>'+p.k+'</small></h4>'+(best?'<span class="mono">Best fit</span>':'')+'</div><dl><dt>Run by</dt><dd>'+p.by+'</dd><dt>Covers</dt><dd>'+p.cov+'</dd><dt>For</dt><dd>'+p.who+'</dd></dl></div>';
  }
  function render(){
    timers.forEach(clearTimeout); timers=[];
    var ids=RULE[need].filter(function(id){return P[id].sizes.indexOf(size)>-1});
    out.innerHTML=ids.map(function(id,n){return card(id,n===0)}).join('')+
      '<div class="pl" style="animation-delay:.12s"><div class="ph-top"><h4>The way to the application</h4></div><ol class="path" id="fuPath">'+STEPS.map(function(s){return '<li><span>'+s[0]+'</span>'+(s[1]?'<span class="w">'+s[1]+'</span>':'<span></span>')+'</li>'}).join('')+'</ol></div>';
    var li=$$('#fuPath li'), n=0;
    docs.forEach(function(d){d.classList.remove('ok')});
    function tick(){ if(n<li.length){ li[n].classList.add('on'); if(n===2) docs.forEach(function(d,j){ timers.push(setTimeout(function(){d.classList.add('ok')},j*160)) }); n++; timers.push(setTimeout(tick,RMX?0:420)) } }
    tick();
  }
  function bind(sel,set){ $$(sel+' button').forEach(function(b){ b.addEventListener('click',function(){ set(b.dataset.v); $$(sel+' button').forEach(function(x){x.setAttribute('aria-pressed',x===b)}); render() }) }) }
  bind('#fuSize',function(v){size=v}); bind('#fuNeed',function(v){need=v});
  render();
  return {open:function(){render()},close:function(){timers.forEach(clearTimeout)}};
}

/* --- overlay manager --- */
var SIMS=[{h:'instagram-simulation',id:'sim-ig',f:initIG},{h:'tiktok-simulation',id:'sim-tt',f:initTT},{h:'funding-simulation',id:'sim-fund',f:initFU}];
var lastFocus=null;
SIMS.forEach(function(s){ s.el=document.getElementById(s.id); s.api=s.f(); });
function isOpen(s){return s.el.classList.contains('open')}
function open(s){
  if(isOpen(s)) return; lastFocus=document.activeElement; s.el.classList.add('open'); doc.style.overflow='hidden'; s.el.scrollTop=0;
  s.api.open(); setTimeout(function(){ var c=$('[data-close]',s.el); if(c) c.focus() },400);
}
function close(s){
  if(!isOpen(s)) return; s.el.classList.remove('open'); s.api.close();
  var am=document.getElementById('sim'); if(!(am&&am.classList.contains('open'))) doc.style.overflow='';
  if(lastFocus&&lastFocus.focus) lastFocus.focus();
}
function route(){ SIMS.forEach(function(s){ if(location.hash==='#'+s.h) open(s); else close(s) }) }
function leave(){ try{history.replaceState(null,'',location.href.split('#')[0])}catch(e){ if(location.hash)location.hash='explore' } SIMS.forEach(close) }
$$('[data-sim]').forEach(function(a){ a.addEventListener('click',function(e){ e.preventDefault(); location.hash=a.dataset.sim }) });
SIMS.forEach(function(s){ $('[data-close]',s.el).addEventListener('click',leave) });
addEventListener('hashchange',route);
addEventListener('keydown',function(e){ if(e.key==='Escape'&&SIMS.some(isOpen)) leave() });
if(SIMS.some(function(s){return location.hash==='#'+s.h})) setTimeout(route,50);
})();
