/* The swift: WebGL (Three.js global) with flat SVG fallback, driven by scroll position */
import {RM,doc,$,clamp,lerp,smooth,hexRGB} from './util.js';
import {sectionState,setNav} from './nav.js';
import {POSES} from './poses.js';
import {SVC} from './services.js';

var PTS=[[127.76,253.47],[127.64,253.49],[127.51,253.49],[127.38,253.45],[127.17,253.31],[127.01,253.16],[126.84,252.94],[126.64,252.59],[126.26,251.74],[126.01,251.04],[125.64,249.81],[124.1,244.18],[123.59,242.44],[123.13,240.94],[122.67,239.56],[122.21,238.31],[121.7,237.06],[121.14,235.78],[120.38,234.18],[119.55,232.56],[118.8,231.18],[118.14,230.09],[117.64,229.37],[117.14,228.79],[116.88,228.55],[116.64,228.35],[116.38,228.18],[116.14,228.04],[115.76,227.89],[115.38,227.81],[115.01,227.79],[114.64,227.83],[114.26,227.92],[113.88,228.07],[113.45,228.31],[113.01,228.62],[112.38,229.16],[111.73,229.81],[108.01,233.89],[106.26,235.77],[104.51,237.57],[103.14,238.9],[102.51,239.46],[101.88,239.98],[101.38,240.35],[101.01,240.58],[100.64,240.74],[100.38,240.77],[100.26,240.73],[100.21,240.68],[100.13,240.56],[100.11,240.44],[100.11,240.18],[100.17,239.81],[100.37,239.18],[100.61,238.56],[101.01,237.68],[101.38,236.91],[101.89,235.94],[102.64,234.58],[103.86,232.44],[105.51,229.68],[107.65,226.18],[112.07,219.06],[112.59,218.18],[113.01,217.44],[113.43,216.56],[113.63,216.06],[113.75,215.68],[113.93,214.94],[114.0,214.18],[114.0,213.56],[113.93,212.94],[113.81,212.31],[113.62,211.56],[113.15,210.06],[110.15,201.31],[109.46,199.18],[108.85,197.18],[107.72,193.31],[106.97,190.56],[106.33,187.94],[105.75,185.31],[105.27,182.81],[104.79,180.06],[104.45,177.81],[104.18,175.68],[103.91,172.94],[103.62,169.44],[103.5,167.44],[103.32,163.68],[103.23,162.31],[103.16,161.56],[103.07,160.94],[102.96,160.31],[102.84,159.81],[102.57,158.94],[102.23,158.06],[101.74,157.06],[101.11,155.94],[99.76,153.69],[97.04,149.31],[94.29,144.81],[87.85,134.18],[84.8,129.06],[81.59,123.56],[77.3,115.93],[76.07,113.68],[73.74,109.31],[71.8,105.56],[69.77,101.43],[67.51,96.68],[66.47,94.43],[64.14,89.15],[62.38,85.06],[60.81,81.31],[59.62,78.31],[58.09,74.18],[56.14,68.72],[55.36,66.43],[53.26,60.0],[52.14,56.31],[51.01,52.33],[50.14,48.96],[49.81,47.56],[49.57,46.43],[49.39,45.43],[49.28,44.56],[49.23,43.93],[49.23,43.31],[49.28,42.81],[49.39,42.45],[49.51,42.24],[49.64,42.14],[49.76,42.08],[49.89,42.07],[50.01,42.09],[50.26,42.18],[50.64,42.44],[51.01,42.79],[51.39,43.21],[51.76,43.68],[52.26,44.37],[52.76,45.11],[53.51,46.29],[54.26,47.54],[56.57,51.56],[62.86,62.31],[64.08,64.31],[66.81,68.68],[68.68,71.56],[74.09,79.68],[80.48,88.81],[86.01,96.43],[91.2,103.43],[99.3,114.06],[105.64,122.13],[107.99,125.06],[108.85,126.06],[109.51,126.77],[110.14,127.36],[110.76,127.85],[111.38,128.23],[111.76,128.42],[112.14,128.56],[112.51,128.68],[112.88,128.76],[113.26,128.82],[113.76,128.85],[114.38,128.85],[115.14,128.78],[117.76,128.37],[119.01,128.23],[120.14,128.19],[120.76,128.21],[121.26,128.26],[121.76,128.33],[122.26,128.43],[122.76,128.56],[123.26,128.73],[123.76,128.92],[124.14,129.1],[124.55,129.31],[125.01,129.59],[125.51,129.92],[125.88,130.21],[126.38,130.63],[126.84,131.06],[127.31,131.56],[127.73,132.06],[128.12,132.56],[128.51,133.11],[129.19,134.18],[129.88,135.44],[130.5,136.68],[131.73,139.31],[132.38,140.57],[132.76,141.2],[133.17,141.81],[133.54,142.31],[134.01,142.85],[134.61,143.44],[135.26,143.97],[136.01,144.5],[136.76,144.95],[137.76,145.49],[138.88,146.03],[140.26,146.64],[141.64,147.21],[143.64,147.98],[151.64,150.97],[158.14,153.31],[165.87,156.06],[181.51,161.71],[184.26,162.68],[186.26,163.37],[200.38,168.08],[205.01,169.55],[208.64,170.73],[210.76,171.4],[221.14,174.54],[226.01,175.92],[229.88,177.05],[237.01,179.09],[242.76,180.67],[244.51,181.18],[246.52,181.81],[248.36,182.44],[249.33,182.81],[249.89,183.06],[250.59,183.44],[250.96,183.68],[251.22,183.94],[251.31,184.06],[251.37,184.18],[251.4,184.31],[251.39,184.44],[251.34,184.56],[251.24,184.68],[251.14,184.77],[250.88,184.92],[250.56,185.06],[250.16,185.18],[249.62,185.31],[249.14,185.4],[247.76,185.56],[245.9,185.68],[244.01,185.73],[241.76,185.71],[237.88,185.59],[234.38,185.46],[227.01,185.04],[224.76,184.9],[220.51,184.57],[217.51,184.31],[207.64,183.27],[198.76,182.15],[194.51,181.54],[188.01,180.54],[183.26,179.79],[173.64,178.1],[170.38,177.47],[166.64,176.71],[153.51,173.87],[149.14,172.86],[143.38,171.42],[141.88,171.1],[141.38,171.03],[140.88,170.98],[140.51,170.97],[140.14,170.98],[139.76,171.02],[139.38,171.1],[139.01,171.23],[138.76,171.35],[138.51,171.5],[138.26,171.69],[138.01,171.92],[137.79,172.18],[137.62,172.44],[137.41,172.81],[137.24,173.18],[137.1,173.56],[136.91,174.18],[136.76,174.81],[135.75,179.68],[135.18,182.18],[134.7,184.18],[134.28,185.81],[133.83,187.44],[133.32,189.18],[132.73,191.06],[132.08,193.06],[131.52,194.68],[130.8,196.68],[129.96,198.94],[129.26,200.68],[128.53,202.44],[126.1,207.94],[125.91,208.44],[125.74,208.94],[125.61,209.44],[125.54,209.81],[125.5,210.44],[125.54,211.06],[125.62,211.44],[125.7,211.68],[125.79,211.94],[125.96,212.31],[126.18,212.68],[126.52,213.18],[126.92,213.68],[128.14,215.15],[128.54,215.68],[128.88,216.19],[129.27,216.81],[129.6,217.44],[129.89,218.06],[130.19,218.81],[130.44,219.56],[130.64,220.23],[130.83,221.06],[130.97,221.81],[131.1,222.68],[131.2,223.56],[131.28,224.56],[131.35,225.68],[131.42,227.56],[131.42,229.68],[131.37,232.31],[131.27,234.94],[131.15,236.68],[130.98,238.68],[130.67,241.68],[130.39,244.06],[130.11,246.06],[129.79,247.94],[129.47,249.56],[129.14,250.95],[128.82,251.94],[128.51,252.66],[128.35,252.94],[128.14,253.21],[128.01,253.33],[127.88,253.41],[127.76,253.47]];  /* swift outline, corners softened */
export var gl={ok:false};
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
  Object.assign(gl,{ok:true,T:T,renderer:renderer,scene:scene,camera:camera,mesh:mesh,holder:holder,mat:mat,bw:bw,
      });
  resize();
}
function resize(){
  if(!gl.ok)return;
  var w=innerWidth,h=innerHeight,dpr=Math.min(devicePixelRatio||1,2);
  gl.renderer.setPixelRatio(dpr); gl.renderer.setSize(w,h,false);
  gl.camera.aspect=w/h; gl.camera.updateProjectionMatrix();
}
var fb=$('#fallbackBird'), fbPath=fb?fb.querySelector('path'):null;
export var pose={x:.6,y:.2,s:.5,roll:-10,yaw:28,pitch:10,col:hexRGB('#DAE666'),calm:1,intro:RM?1:0};
export var INTRO={on:false,x:2,y:0,s:.3,roll:102,yaw:12,pitch:0};
export function getBase(){ var w=innerWidth,h=innerHeight; return (w/h<1.05)?w:Math.min(w,h*1.35); }
var t0=performance.now(), lastY=window.scrollY, vel=0;
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
requestAnimationFrame(frame);
