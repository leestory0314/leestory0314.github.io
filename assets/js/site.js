// leestory.com — language toggle (EN default, KO), scroll reveal, hero mesh
var I18N = {"en":{"title":"Cloud Architect · AI Technologist · Builder","desc":"The tool keeps changing; the goal doesn’t. Cloud architecture, AI systems, strategy, and the products in development.","nav_fields":"Fields","nav_dev":"In development","nav_contact":"Contact","eyebrow":"Cloud Architect · AI Technologist · Builder","h1a":"The tool keeps changing.","h1b":"The goal doesn’t.","lead":"So I keep studying what changes and building what holds up: cloud platforms, AI systems, and products that put both to work for the people who need them.","m_focus":"Focus","m_focus_v":"Cloud platforms · Applied AI · Security","m_dev":"In development","m_dev_v":"Products in operation","m_contact":"Contact","f_h2":"What defines the work","f_sub":"Technology, architecture, strategy, and execution.","c1":"Architecture","c1p":"Designing scalable, resilient cloud foundations for what’s next.","c2":"AI & Technology","c2p":"Exploring AI and emerging technology to solve real-world problems.","c3":"Strategy","c3p":"Connecting technology, people, and opportunity with practical direction.","c4":"Build","c4p":"Turning ideas into working products, platforms, and measurable progress.","creed_h":"Technology is a tool. A better tomorrow is the goal.","creed_p":"I believe in the power of technology to expand human potential, not replace it. I build thoughtful systems, explore bold ideas, and focus on solutions that create practical, lasting value.","d_h2":"In development","d_sub":"Products in operation. Each opens in a new tab.","p1":"Meeting minutes from a recording, with decisions and action items.","p2":"Web and AI security assessment mapped to public-sector standards.","p3":"Monolith-to-services design, verified against the build.","newtab":"(opens in a new tab)","foot":"Updated October 2026","lang_btn":"KO","lang_aria":"한국어로 보기","S":[["Cloud architecture","Scalable, resilient foundations"],["AI systems","Models that run close to the data"],["Security standards","Public-sector rules, mapped to checks"],["Strategy","Technology, people, opportunity"],["End-to-end build","Platform to product to operations"],["Operations","The part that proves the design"]]},"ko":{"title":"클라우드 네이티브 아키텍트 · AI 엔지니어 · 서비스 구축 전문가","desc":"도구는 계속 바뀌어도 목표는 변하지 않습니다. 클라우드 아키텍처와 AI 시스템, 전략, 그리고 그것들을 실현한 프로젝트를 소개합니다.","nav_fields":"전문 분야","nav_dev":"프로젝트","nav_contact":"연락처","eyebrow":"클라우드 네이티브 아키텍트 · AI 엔지니어 · 서비스 구축 전문가","h1a":"도구들은 끊임없이 변합니다.","h1b":"목표는 변하지 않습니다.","lead":"저는 끊임없이 변화를 탐구하고, 변화 속에서도 견고하게 작동하는 것을 만듭니다. 클라우드 플랫폼과 AI 시스템을 설계하고, 두 기술을 결합해 실제 사용자가 필요로 하는 제품으로 구현합니다.","m_focus":"전문 분야","m_focus_v":"클라우드 플랫폼 · 응용 AI · 보안","m_dev":"프로젝트","m_dev_v":"운영 중인 제품","m_contact":"연락처","f_h2":"나의 일을 정의하는 네 가지 축","f_sub":"기술, 아키텍처, 전략, 그리고 실행.","c1":"아키텍처","c1p":"다가올 변화를 뒷받침할 수 있도록 확장성과 복원력을 갖춘 클라우드 기반을 설계합니다.","c2":"AI와 신기술","c2p":"AI와 신기술을 탐구하고 적용하여 현실의 문제를 해결합니다.","c3":"전략","c3p":"기술과 사람, 기회를 연결하여 실행 가능한 방향을 제시합니다.","c4":"구현","c4p":"아이디어를 실제 작동하는 제품과 플랫폼으로 구현하고, 측정 가능한 성과로 연결합니다.","creed_h":"기술은 도구일 뿐입니다. 더 나은 내일이 목표입니다.","creed_p":"저는 기술이 인간을 대체하는 것이 아니라, 인간의 가능성을 확장하는 힘이라고 믿습니다. 깊이 고민해 시스템을 설계하고, 대담한 아이디어를 탐구하며, 실질적이고 지속적인 가치를 만드는 해결책에 집중합니다.","d_h2":"개발 중 프로젝트","d_sub":"현재 운영 중인 제품입니다. 각 링크는 새 탭에서 열립니다.","p1":"회의 녹음 하나로 결정 사항과 할 일까지 정리된 회의록을 만듭니다.","p2":"공공기관 보안 기준에 맞춰 웹과 AI 서비스를 진단합니다.","p3":"모놀리스를 마이크로서비스로 나누는 설계를 그리고, 코드가 설계대로인지 검증합니다.","newtab":"(새 탭에서 열림)","foot":"최근 업데이트: 2026년 10월","lang_btn":"EN","lang_aria":"View in English","S":[["클라우드 아키텍처","확장 가능하고 회복력 있는 기반"],["AI 시스템","데이터 가까이에서 도는 모델"],["보안 기준","공공 규정을 점검 항목으로"],["전략","기술, 사람, 기회"],["끝까지 만들기","플랫폼에서 제품, 운영까지"],["운영","설계를 증명하는 단계"]]}};
var LANG = 'en';
(function(){
  var saved = null; try { saved = localStorage.getItem('lang'); } catch (e) {}
  if (location.hash.indexOf('ko') > -1) saved = 'ko'; else if (location.hash.indexOf('en') > -1) saved = 'en';
  function apply(l){
    var d = I18N[l] || I18N.en; LANG = l;
    document.documentElement.lang = l;
    document.title = d.title;
    var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute('content', d.desc);
    document.querySelectorAll('[data-i18n]').forEach(function(el){ var k = el.getAttribute('data-i18n'); if (d[k] != null) el.textContent = d[k]; });
    var b = document.getElementById('lang'); if (b) { b.textContent = d.lang_btn; b.setAttribute('aria-label', d.lang_aria); }
    try { localStorage.setItem('lang', l); } catch (e) {}
    if (window.__redraw) window.__redraw();
  }
  if (saved === 'ko') apply('ko');
  var btn = document.getElementById('lang');
  if (btn) btn.addEventListener('click', function(){ apply(LANG === 'en' ? 'ko' : 'en'); });
  window.__applyLang = apply;
})();
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.rv');
  if (reduce || !('IntersectionObserver' in window)) { items.forEach(function(el){ el.classList.add('in'); }); }
  else {
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .12 });
    items.forEach(function(el, i){ el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });
  }
})();
(function(){var c=document.getElementById('mesh');if(!c)return;var ctx=c.getContext('2d');var W=880,H=720,dpr=Math.min(window.devicePixelRatio||1,2);c.width=W*dpr;c.height=H*dpr;ctx.scale(dpr,dpr);
var still=matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('static');
function S(){return I18N.en.S}
var seed=7;function rnd(){seed=(seed*9301+49297)%233280;return seed/233280}
var hubs=[[330,200],[560,140],[720,265],[300,430],[520,500],[700,465]];
var N=70,nodes=[],i,j;
for(i=0;i<hubs.length;i++)nodes.push({x:hubs[i][0],y:hubs[i][1],vx:(rnd()-.5)*.12,vy:(rnd()-.5)*.12,r:4.5,hub:i,hx:hubs[i][0],hy:hubs[i][1]});
for(i=0;i<N;i++)nodes.push({x:200+rnd()*(W-230),y:60+rnd()*(H-120),vx:(rnd()-.5)*.3,vy:(rnd()-.5)*.3,r:rnd()<.15?2.8:1.8,hub:-1});
var T=nodes.length,mouse=null,near=-1;
c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect();mouse={x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height};near=-1;for(var k=0;k<hubs.length;k++){if(Math.hypot(nodes[k].x-mouse.x,nodes[k].y-mouse.y)<46)near=k}});
c.addEventListener('mouseleave',function(){mouse=null;near=-1});
var FONT='Inter, "Noto Sans KR", system-ui, sans-serif';
function label(n,strong){var s=S()[n.hub];ctx.font=(strong?'600 ':'500 ')+'12.5px '+FONT;ctx.textBaseline='middle';var right=n.x<W*.6;ctx.textAlign=right?'left':'right';var x=n.x+(right?13:-13);ctx.fillStyle=strong?'#1d1d1f':'rgba(29,29,31,.8)';ctx.fillText(s[0],x,n.y-(strong?8:0));if(strong){ctx.font='400 11.5px '+FONT;ctx.fillStyle='#0a58e0';ctx.fillText(s[1],x,n.y+9)}}
function draw(){ctx.clearRect(0,0,W,H);var a,b,d;
for(i=0;i<T;i++){a=nodes[i];for(j=i+1;j<T;j++){b=nodes[j];d=Math.hypot(a.x-b.x,a.y-b.y);var lim=(a.hub>=0||b.hub>=0)?160:120;if(d<lim){var al=(a.hub>=0&&b.hub>=0?0.45:0.28)*(1-d/lim);ctx.strokeStyle='rgba(10,88,224,'+al.toFixed(3)+')';ctx.lineWidth=(a.hub>=0&&b.hub>=0)?1.2:1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}}
if(mouse){for(i=0;i<T;i++){a=nodes[i];d=Math.hypot(a.x-mouse.x,a.y-mouse.y);if(d<180){ctx.strokeStyle='rgba(29,29,31,'+(0.45*(1-d/180)).toFixed(3)+')';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(mouse.x,mouse.y);ctx.stroke()}}ctx.fillStyle='#1d1d1f';ctx.beginPath();ctx.arc(mouse.x,mouse.y,3,0,7);ctx.fill()}
for(i=0;i<T;i++){a=nodes[i];if(a.hub>=0){ctx.fillStyle=near===a.hub?'#1d1d1f':'#0a58e0';ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,7);ctx.fill();ctx.strokeStyle='rgba(10,88,224,.35)';ctx.beginPath();ctx.arc(a.x,a.y,a.r+7,0,7);ctx.stroke();label(a,near===a.hub)}else{ctx.fillStyle='rgba(10,88,224,.6)';ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,7);ctx.fill()}}}
function step(){for(i=0;i<T;i++){var n=nodes[i];if(n.hub>=0){n.x+=(n.hx-n.x)*.01+n.vx;n.y+=(n.hy-n.y)*.01+n.vy;if(Math.abs(n.x-n.hx)>18)n.vx*=-1;if(Math.abs(n.y-n.hy)>14)n.vy*=-1}else{n.x+=n.vx;n.y+=n.vy;if(n.x<190||n.x>W-20)n.vx*=-1;if(n.y<40||n.y>H-40)n.vy*=-1;if(mouse){var dx=mouse.x-n.x,dy=mouse.y-n.y,d=Math.hypot(dx,dy);if(d<180&&d>1){n.x+=dx/d*.18;n.y+=dy/d*.18}}}}draw();if(!still)requestAnimationFrame(step)}
window.__redraw=draw;draw();if(!still)requestAnimationFrame(step)})();
