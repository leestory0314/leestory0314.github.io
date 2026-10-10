// Generates five interaction variants from mockups/concept-blueprint.html (stage only differs).
// Usage: node tools/gen-interact.js <repo root>
const fs = require("fs"), path = require("path");
const root = process.argv[2] || path.resolve(__dirname, "..");
const base = fs.readFileSync(path.join(root, "mockups/concept-blueprint.html"), "utf8");
const figRe = /<figure class="stage" id="stage">[\s\S]*?<\/figure>/;
const baseSvg = base.match(figRe)[0].match(/<svg[\s\S]*?<\/svg>/)[0];

// Strengths shown inside the graphics (owner's fields, in his words where possible)
const STRENGTHS = [
  ["Cloud architecture", "Scalable, resilient foundations"],
  ["AI systems", "Models that run close to the data"],
  ["Security standards", "Public-sector rules, mapped to checks"],
  ["Strategy", "Technology, people, opportunity"],
  ["End-to-end build", "Platform to product to operations"],
  ["Operations", "The part that proves the design"]
];

const V = [];

/* 1 · Mesh — cursor-reactive node network with labelled strength hubs (canvas, paper grid background) */
V.push({
  name: "1-mesh", title: "Mesh",
  fig: `<figure class="stage stage-mesh" id="stage2">
        <canvas id="mesh" width="880" height="420" aria-label="A network of nodes; six larger nodes carry the fields of work and connect toward the pointer"></canvas>
        <figcaption><span><b>Six strengths, one network.</b> Move the pointer: nearby nodes connect to it; rest on a labelled node to read it.</span><span>Mesh · nodes drift, links form by distance</span></figcaption>
      </figure>`,
  css: `.stage-mesh{background:radial-gradient(80% 90% at 50% 40%,#fbfaf7 0%,#f3f0ea 70%,#ebe7df 100%)}
.stage canvas{width:100%;height:auto;display:block;aspect-ratio:880/420;cursor:crosshair}`,
  js: `(function(){var c=document.getElementById('mesh');if(!c)return;var ctx=c.getContext('2d');var W=880,H=420,dpr=Math.min(window.devicePixelRatio||1,2);c.width=W*dpr;c.height=H*dpr;ctx.scale(dpr,dpr);
var still=matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('static');
var S=${JSON.stringify(STRENGTHS)};
var seed=7;function rnd(){seed=(seed*9301+49297)%233280;return seed/233280}
var hubs=[[150,120],[400,80],[690,120],[200,320],[470,290],[730,320]];
var N=66,nodes=[],i,j;
for(i=0;i<hubs.length;i++)nodes.push({x:hubs[i][0],y:hubs[i][1],vx:(rnd()-.5)*.12,vy:(rnd()-.5)*.12,r:4.2,hub:i,hx:hubs[i][0],hy:hubs[i][1]});
for(i=0;i<N;i++)nodes.push({x:30+rnd()*(W-60),y:30+rnd()*(H-60),vx:(rnd()-.5)*.3,vy:(rnd()-.5)*.3,r:rnd()<.15?2.8:1.8,hub:-1});
var T=nodes.length,mouse=null,near=-1;
c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect();mouse={x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height};near=-1;for(var k=0;k<hubs.length;k++){if(Math.hypot(nodes[k].x-mouse.x,nodes[k].y-mouse.y)<44)near=k}});
c.addEventListener('mouseleave',function(){mouse=null;near=-1});
function grid(){ctx.fillStyle='rgba(138,106,59,.16)';for(var x=20;x<W;x+=20)for(var y=20;y<H;y+=20){ctx.fillRect(x,y,1,1)}}
function label(n,strong){var s=S[n.hub];ctx.font=(strong?'500 ':'400 ')+'12px Inter, system-ui, sans-serif';ctx.textBaseline='middle';var right=n.x<W/2;ctx.textAlign=right?'left':'right';var x=n.x+(right?12:-12);ctx.fillStyle=strong?'#1c1b19':'rgba(28,27,25,.78)';ctx.fillText(s[0],x,n.y-(strong?8:0));if(strong){ctx.font='400 11px Inter, system-ui, sans-serif';ctx.fillStyle='#8a6a3b';ctx.fillText(s[1],x,n.y+9)}}
function draw(){ctx.clearRect(0,0,W,H);grid();var a,b,d;
for(i=0;i<T;i++){a=nodes[i];for(j=i+1;j<T;j++){b=nodes[j];d=Math.hypot(a.x-b.x,a.y-b.y);var lim=(a.hub>=0||b.hub>=0)?150:115;if(d<lim){var al=(a.hub>=0&&b.hub>=0?0.5:0.38)*(1-d/lim);ctx.strokeStyle='rgba(138,106,59,'+al.toFixed(3)+')';ctx.lineWidth=(a.hub>=0&&b.hub>=0)?1.2:1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}}
if(mouse){for(i=0;i<T;i++){a=nodes[i];d=Math.hypot(a.x-mouse.x,a.y-mouse.y);if(d<170){ctx.strokeStyle='rgba(28,27,25,'+(0.5*(1-d/170)).toFixed(3)+')';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(mouse.x,mouse.y);ctx.stroke()}}ctx.fillStyle='#1c1b19';ctx.beginPath();ctx.arc(mouse.x,mouse.y,3,0,7);ctx.fill()}
for(i=0;i<T;i++){a=nodes[i];if(a.hub>=0){ctx.fillStyle=near===a.hub?'#1c1b19':'#8a6a3b';ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,7);ctx.fill();ctx.strokeStyle='rgba(138,106,59,.45)';ctx.beginPath();ctx.arc(a.x,a.y,a.r+6,0,7);ctx.stroke();label(a,near===a.hub)}else{ctx.fillStyle='rgba(138,106,59,.8)';ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,7);ctx.fill()}}}
function step(){for(i=0;i<T;i++){var n=nodes[i];if(n.hub>=0){n.x+=(n.hx-n.x)*.01+n.vx;n.y+=(n.hy-n.y)*.01+n.vy;if(Math.abs(n.x-n.hx)>18)n.vx*=-1;if(Math.abs(n.y-n.hy)>14)n.vy*=-1}else{n.x+=n.vx;n.y+=n.vy;if(n.x<20||n.x>W-20)n.vx*=-1;if(n.y<20||n.y>H-20)n.vy*=-1;if(mouse){var dx=mouse.x-n.x,dy=mouse.y-n.y,d=Math.hypot(dx,dy);if(d<170&&d>1){n.x+=dx/d*.18;n.y+=dy/d*.18}}}}draw();if(!still)requestAnimationFrame(step)}
draw();if(!still)requestAnimationFrame(step)})();`
});

/* 2 · Layers — isometric stack that separates on hover, selects on click */
V.push({
  name: "2-layers", title: "Layers",
  fig: `<figure class="stage" id="stage">
        <svg viewBox="0 -70 880 500" role="img" aria-label="Four stacked layers: platform, models, product, operations. Hover to separate, click to read."><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a6a3b" stop-opacity=".16"/><stop offset="1" stop-color="#8a6a3b" stop-opacity=".03"/></linearGradient></defs>
          <ellipse cx="440" cy="400" rx="290" ry="16" fill="#1c1b19" opacity=".05"/>
          <g class="layer" data-i="3" data-t="Platform" data-d="The foundation: compute, network, storage, identity. Designed to be rebuilt from code."><path d="M440 190 L680 310 L440 430 L200 310 Z"/><text x="700" y="316">Platform</text></g>
          <g class="layer" data-i="2" data-t="Models" data-d="Inference and pipelines that run close to the data, on infrastructure I control."><path d="M440 130 L680 250 L440 370 L200 250 Z"/><text x="700" y="256">Models</text></g>
          <g class="layer" data-i="1" data-t="Product" data-d="Interfaces and services people actually use. Each one shipped end to end."><path d="M440 70 L680 190 L440 310 L200 190 Z"/><text x="700" y="196">Product</text></g>
          <g class="layer" data-i="0" data-t="Operations" data-d="Delivery, observability, recovery. The part that proves the design."><path d="M440 10 L680 130 L440 250 L200 130 Z"/><text x="700" y="136">Operations</text></g>
        </svg>
        <figcaption><span id="lcap"><b>One system in four layers.</b> Hover to separate them; click a layer to read it.</span><span>Stack · platform to operations</span></figcaption>
      </figure>`,
  css: `.layer{transition:transform .55s cubic-bezier(.2,.7,.2,1);cursor:pointer}.layer path{fill:var(--paper);fill-opacity:.94;stroke:var(--bronze);stroke-width:1;transition:fill .3s,stroke .3s}.layer text{font-family:var(--sans);font-size:12px;fill:var(--muted);opacity:0;transition:opacity .35s}
.stage:hover .layer[data-i="0"],.static .layer[data-i="0"]{transform:translateY(-60px)}.stage:hover .layer[data-i="1"],.static .layer[data-i="1"]{transform:translateY(-40px)}.stage:hover .layer[data-i="2"],.static .layer[data-i="2"]{transform:translateY(-20px)}
.stage:hover .layer text,.static .layer text{opacity:1}.layer.on path{fill:url(#lg);stroke:var(--ink)}.layer.on text{fill:var(--ink)}.layer:hover path{stroke:var(--ink)}
@media(prefers-reduced-motion:reduce){.layer{transition:none}}`,
  js: `(function(){var cap=document.getElementById('lcap');document.querySelectorAll('.layer').forEach(function(l){l.addEventListener('click',function(){var on=l.classList.contains('on');document.querySelectorAll('.layer').forEach(function(x){x.classList.remove('on')});if(!on){l.classList.add('on');cap.innerHTML='<b>'+l.dataset.t+'.</b> '+l.dataset.d}else{cap.innerHTML='<b>One system in four layers.</b> Hover to separate them; click a layer to read it.'}})})})();`
});

/* 3 · Scroll-draw — the architecture drawing is drawn by scrolling */
let sd = baseSvg
  .replace(/class="frame draw d1"/g, 'class="frame sd" data-o="0"')
  .replace(/class="wire draw d2"/g, 'class="wire sd" data-o=".2"')
  .replace(/class="wire draw d3"/g, 'class="wire sd" data-o=".4"')
  .replace(/class="wire draw d4"/g, 'class="wire sd" data-o=".6"')
  .replace(/class="draw d1"/g, 'class="sd" data-o=".05"')
  .replace(/class="draw d2"/g, 'class="sd" data-o=".3"')
  .replace(/class="draw d3"/g, 'class="sd" data-o=".5"')
  .replace(/class="node fade"/g, 'class="node sf"')
  .replace(/class="fade"/g, 'class="sf"');
V.push({
  name: "3-scrolldraw", title: "Scroll-draw",
  fig: `<figure class="stage" id="stage">
        ${sd}
        <figcaption><span><b>Drafted as you read.</b> Scroll down and the drawing completes; scroll up and it recedes.</span><span id="sdp">0% drawn</span></figcaption>
      </figure>`,
  css: `.sd{stroke-dasharray:1;stroke-dashoffset:1}.sf{opacity:0;transition:opacity .4s}.sf.on{opacity:1}.static .sd{stroke-dashoffset:0!important}.static .sf{opacity:1}`,
  js: `(function(){var st=document.getElementById('stage');if(!st)return;var els=[].slice.call(st.querySelectorAll('.sd')),sf=[].slice.call(st.querySelectorAll('.sf')),pct=document.getElementById('sdp');var still=matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('static');
function upd(){var r=st.getBoundingClientRect(),vh=innerHeight;var p=(vh-r.top)/(r.height+vh*.35);p=Math.max(0,Math.min(1,p*1.15));els.forEach(function(e){var o=parseFloat(e.dataset.o)||0;var v=(p-o)/.45;v=Math.max(0,Math.min(1,v));e.style.strokeDashoffset=(1-v).toFixed(3)});sf.forEach(function(e){e.classList.toggle('on',p>.78)});if(pct)pct.textContent=Math.round(p*100)+'% drawn'}
if(still){els.forEach(function(e){e.style.strokeDashoffset=0});sf.forEach(function(e){e.classList.add('on')});if(pct)pct.textContent='100% drawn';return}
upd();addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd)})();`
});

/* 4 · Flow — streamlines of a vector field, disturbed by the pointer (canvas) */
V.push({
  name: "4-flow", title: "Flow",
  fig: `<figure class="stage" id="stage2">
        <canvas id="flow" width="880" height="420" aria-label="Flowing lines of traffic across a field; the pointer bends the flow"></canvas>
        <figcaption><span><b>Traffic, as weather.</b> Streams flow across the field; the pointer bends them.</span><span>Flow field · 260 tracers</span></figcaption>
      </figure>`,
  css: `.stage canvas{width:100%;height:auto;display:block;aspect-ratio:880/420;cursor:crosshair}`,
  js: `(function(){var c=document.getElementById('flow');if(!c)return;var ctx=c.getContext('2d');var W=880,H=420,dpr=Math.min(window.devicePixelRatio||1,2);c.width=W*dpr;c.height=H*dpr;ctx.scale(dpr,dpr);
var still=matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('static');
var seed=11;function rnd(){seed=(seed*9301+49297)%233280;return seed/233280}
var P=[];for(var i=0;i<260;i++)P.push({x:rnd()*W,y:rnd()*H,l:40+rnd()*120});
var mouse=null;c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect();mouse={x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height}});c.addEventListener('mouseleave',function(){mouse=null});
function ang(x,y,t){var a=Math.sin(x*.011+t*.5)*.9+Math.cos(y*.013-t*.4)*.9+Math.sin((x-y)*.005+t*.25)*.6;if(mouse){var dx=x-mouse.x,dy=y-mouse.y,d=Math.hypot(dx,dy);if(d<150){a+=(1-d/150)*2.2}}return a}
ctx.fillStyle='#faf9f6';ctx.fillRect(0,0,W,H);var t=0;
function frame(){t+=.012;ctx.fillStyle='rgba(250,249,246,.035)';ctx.fillRect(0,0,W,H);ctx.lineWidth=1;for(var i=0;i<P.length;i++){var p=P[i],a=ang(p.x,p.y,t);var nx=p.x+Math.cos(a)*1.7,ny=p.y+Math.sin(a)*1.7;ctx.strokeStyle='rgba(138,106,59,.5)';ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(nx,ny);ctx.stroke();p.x=nx;p.y=ny;p.l--;if(p.l<0||p.x<0||p.x>W||p.y<0||p.y>H){p.x=rnd()*W;p.y=rnd()*H;p.l=60+rnd()*120}}if(!still)requestAnimationFrame(frame)}
if(still){for(var k=0;k<140;k++)frame()}else frame()})();`
});

/* 5 · Globe — shaded sphere of nodes with graticule, labelled strengths and arcs; drag to rotate (canvas, dark stage) */
V.push({
  name: "5-globe", title: "Globe",
  fig: `<figure class="stage stage-globe" id="stage2">
        <canvas id="globe" width="880" height="420" aria-label="A shaded globe of points; six labelled strengths sit on its surface, linked by arcs; drag to rotate"></canvas>
        <figcaption><span><b>Six strengths on one sphere.</b> Drag to turn it; labels face you as they come round.</span><span>Globe · 600 nodes, graticule, 6 strengths</span></figcaption>
      </figure>`,
  css: `.stage-globe{background:radial-gradient(70% 90% at 50% 42%,#2a2724 0%,#1a1917 55%,#121110 100%);border-color:#2b2825}
.stage-globe figcaption{color:#9a9287}.stage-globe figcaption b{color:#e8e2d8}
.stage canvas{width:100%;height:auto;display:block;aspect-ratio:880/420;cursor:grab;touch-action:none}.stage canvas:active{cursor:grabbing}`,
  js: `(function(){var c=document.getElementById('globe');if(!c)return;var ctx=c.getContext('2d');var W=880,H=420,dpr=Math.min(window.devicePixelRatio||1,2);c.width=W*dpr;c.height=H*dpr;ctx.scale(dpr,dpr);
var still=matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('static');
var S=${JSON.stringify(STRENGTHS)};
var R=165,cx=440,cy=214,N=600,pts=[],i;for(i=0;i<N;i++){var y=1-(i/(N-1))*2,r=Math.sqrt(1-y*y),th=i*2.399963;pts.push([r*Math.cos(th),y,r*Math.sin(th)])}
function ll(la,lo){la*=Math.PI/180;lo*=Math.PI/180;return [Math.cos(la)*Math.cos(lo),Math.sin(la),Math.cos(la)*Math.sin(lo)]}
var marks=[ll(38,20),ll(-8,80),ll(30,-50),ll(-30,-120),ll(55,150),ll(-12,-20)];
var arcs=[[0,1],[0,2],[1,4],[2,3],[3,5],[5,0]];
var rotY=-.6,rotX=.42,drag=null,auto=true,timer;
function rot(p){var cy_=Math.cos(rotY),sy=Math.sin(rotY),x1=p[0]*cy_-p[2]*sy,z1=p[0]*sy+p[2]*cy_,cx_=Math.cos(rotX),sx=Math.sin(rotX);return [x1,p[1]*cx_-z1*sx,p[1]*sx+z1*cx_]}
function slerp(a,b,t){var o=Math.acos(Math.max(-1,Math.min(1,a[0]*b[0]+a[1]*b[1]+a[2]*b[2]))),s=Math.sin(o);if(s<1e-5)return a;var k1=Math.sin((1-t)*o)/s,k2=Math.sin(t*o)/s;return [a[0]*k1+b[0]*k2,a[1]*k1+b[1]*k2,a[2]*k1+b[2]*k2]}
function P(q){return [cx+q[0]*R,cy-q[1]*R]}
function graticule(){ctx.lineWidth=1;var k,t,q,prev;for(var la=-60;la<=60;la+=30){ctx.beginPath();prev=false;for(k=0;k<=72;k++){t=k/72*360;q=rot(ll(la,t));if(q[2]>0){var p=P(q);if(prev)ctx.lineTo(p[0],p[1]);else ctx.moveTo(p[0],p[1]);prev=true}else prev=false}ctx.strokeStyle='rgba(216,185,138,.16)';ctx.stroke()}
for(var lo=0;lo<180;lo+=30){ctx.beginPath();prev=false;for(k=0;k<=72;k++){t=-90+k/72*180;q=rot(ll(t,lo));if(q[2]>0){var p2=P(q);if(prev)ctx.lineTo(p2[0],p2[1]);else ctx.moveTo(p2[0],p2[1]);prev=true}else prev=false;}ctx.strokeStyle='rgba(216,185,138,.16)';ctx.stroke();ctx.beginPath();prev=false;for(k=0;k<=72;k++){t=-90+k/72*180;q=rot(ll(t,lo+180));if(q[2]>0){var p3=P(q);if(prev)ctx.lineTo(p3[0],p3[1]);else ctx.moveTo(p3[0],p3[1]);prev=true}else prev=false;}ctx.stroke()}}
function draw(){ctx.clearRect(0,0,W,H);
var halo=ctx.createRadialGradient(cx,cy,R*.9,cx,cy,R*1.35);halo.addColorStop(0,'rgba(216,185,138,.18)');halo.addColorStop(1,'rgba(216,185,138,0)');ctx.fillStyle=halo;ctx.beginPath();ctx.arc(cx,cy,R*1.35,0,7);ctx.fill();
var body=ctx.createRadialGradient(cx-R*.38,cy-R*.42,R*.1,cx,cy,R);body.addColorStop(0,'#3a342d');body.addColorStop(.6,'#232019');body.addColorStop(1,'#15130f');ctx.fillStyle=body;ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.fill();
graticule();
for(i=0;i<N;i++){var q=rot(pts[i]),f=q[2];if(f<=0)continue;var p=P(q);ctx.fillStyle='rgba(216,185,138,'+(0.18+0.72*f).toFixed(2)+')';ctx.beginPath();ctx.arc(p[0],p[1],0.9+1.3*f,0,7);ctx.fill()}
var rim=ctx.createRadialGradient(cx,cy,R*.78,cx,cy,R);rim.addColorStop(0,'rgba(18,17,16,0)');rim.addColorStop(1,'rgba(18,17,16,.75)');ctx.fillStyle=rim;ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.fill();
var spec=ctx.createRadialGradient(cx-R*.45,cy-R*.5,0,cx-R*.45,cy-R*.5,R*.6);spec.addColorStop(0,'rgba(255,246,230,.16)');spec.addColorStop(1,'rgba(255,246,230,0)');ctx.fillStyle=spec;ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.fill();
ctx.lineWidth=1;ctx.strokeStyle='rgba(216,185,138,.5)';ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.stroke();
for(i=0;i<arcs.length;i++){var A=marks[arcs[i][0]],B=marks[arcs[i][1]],qa=rot(A),qb=rot(B);if((qa[2]+qb[2])/2<-.1)continue;ctx.strokeStyle='rgba(232,226,216,'+(0.25+0.4*Math.max(0,(qa[2]+qb[2])/2)).toFixed(2)+')';ctx.beginPath();for(var k=0;k<=48;k++){var t=k/48,m=slerp(A,B,t),lift=1+0.14*Math.sin(t*Math.PI),q2=rot([m[0]*lift,m[1]*lift,m[2]*lift]),p4=P(q2);if(k===0)ctx.moveTo(p4[0],p4[1]);else ctx.lineTo(p4[0],p4[1])}ctx.stroke()}
ctx.textBaseline='middle';for(i=0;i<marks.length;i++){var q=rot(marks[i]);if(q[2]<=0.02)continue;var p=P(q),a=Math.min(1,q[2]*1.6);ctx.fillStyle='#f3ecdf';ctx.beginPath();ctx.arc(p[0],p[1],3,0,7);ctx.fill();ctx.strokeStyle='rgba(243,236,223,'+(0.5*a).toFixed(2)+')';ctx.beginPath();ctx.arc(p[0],p[1],8,0,7);ctx.stroke();
var right=p[0]<cx,lx=p[0]+(right?-1:1)*(R*.42+30),ly=p[1]-10;ctx.strokeStyle='rgba(216,185,138,'+(0.55*a).toFixed(2)+')';ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(p[0]+(right?-1:1)*18,p[1]-10);ctx.lineTo(lx+(right?8:-8),ly);ctx.stroke();
ctx.textAlign=right?'right':'left';ctx.font='500 12.5px Inter, system-ui, sans-serif';ctx.fillStyle='rgba(243,236,223,'+a.toFixed(2)+')';ctx.fillText(S[i][0],lx,ly-7);ctx.font='400 11px Inter, system-ui, sans-serif';ctx.fillStyle='rgba(216,185,138,'+(0.9*a).toFixed(2)+')';ctx.fillText(S[i][1],lx,ly+8)}}
c.addEventListener('pointerdown',function(e){drag={x:e.clientX,y:e.clientY,ry:rotY,rx:rotX};auto=false;clearTimeout(timer);c.setPointerCapture(e.pointerId)});
c.addEventListener('pointermove',function(e){if(!drag)return;rotY=drag.ry+(e.clientX-drag.x)*.008;rotX=Math.max(-1.2,Math.min(1.2,drag.rx+(e.clientY-drag.y)*.005));if(still)draw()});
c.addEventListener('pointerup',function(){drag=null;timer=setTimeout(function(){auto=true},1800)});
function loop(){if(auto)rotY+=.0018;draw();requestAnimationFrame(loop)}draw();if(!still)loop()})();`
});

for (const v of V) {
  let html = base.replace(figRe, v.fig)
    .replace("</style>", "    " + v.css + "\n  </style>")
    .replace("</body>", "  <script>\n    " + v.js + "\n  </script>\n</body>")
    .replace(/<title>[^<]*<\/title>/, `<title>Cloud Architect · AI Technologist · Builder — interaction ${v.title}</title>`);
  fs.writeFileSync(path.join(root, `mockups/interact-${v.name}.html`), html);
  console.log("wrote", `mockups/interact-${v.name}.html`, html.length);
}
