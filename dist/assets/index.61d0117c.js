import{S as e,P as n,W as a,T as o,M as s,a as t,A as i,b as w,G as r,O as d,c,d as l,e as p,f as m}from"./vendor.e935f5e2.js";const f=new e,h=new n(75,window.innerWidth/window.innerHeight,.1,1e3),g=new a({canvas:document.querySelector("#bg")});g.setPixelRatio(window.devicePixelRatio),g.setSize(window.innerWidth,window.innerHeight),h.position.setZ(30),g.render(f,h),new o(10,3,16,100),new s({color:16737095});const u=new t(16777215);u.position.set(0,0,0);const M=new i(16777215);f.add(u,M),new w(u),new r(200,50);const j=new d(h,g.domElement);Array(200).fill().forEach((function(){const e=new p(.25,24,24),n=new s({color:16777215}),a=new l(e,n);for(var[o,t,i]=[0,0,0];o*o+t*t+i*i<2500;)[o,t,i]=Array(3).fill().map((()=>m.randFloatSpread(250)));a.position.set(o,t,i),f.add(a)})),(new c).load("./assets/space.jpg");const v=(new c).load("./assets/earthmap1k.jpg"),y=(new c).load("./assets/normal.jpg"),A=new l(new p(3,32,32),new s({map:v,normalMap:y})),P=new l(new p(10,24,24),new s({color:16760576}));f.add(A,P);let S=0;!function e(){requestAnimationFrame(e),S=(S+.01)%(2*Math.PI),A.rotation.y+=.01,A.position.x=50*Math.sin(S),A.position.z=50*Math.cos(S),j.update(),g.render(f,h)}();
