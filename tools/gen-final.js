// Signal layout + Clear style, hero graphic as an interactive canvas (mesh | globe), EN default + KO toggle for the whole page.
// Usage: node tools/gen-final.js <repo root>  →  mockups/final-mesh.html (list), mockups/final-globe.html (cards)
const fs = require("fs"), path = require("path");
const root = process.argv[2] || path.resolve(__dirname, "..");

/* ---------- copy, both languages ---------- */
const T = {
  en: {
    title: "Cloud Architect · AI Technologist · Builder",
    desc: "The tool keeps changing; the goal doesn’t. Cloud architecture, AI systems, strategy, and the products in development.",
    nav_fields: "Fields", nav_dev: "In development", nav_contact: "Contact",
    eyebrow: "Cloud Architect · AI Technologist · Builder",
    h1a: "The tool keeps changing.", h1b: "The goal doesn’t.",
    lead: "So I keep studying what changes and building what holds up: cloud platforms, AI systems, and products that put both to work for the people who need them.",
    m_focus: "Focus", m_focus_v: "Cloud platforms · Applied AI · Security",
    m_dev: "In development", m_dev_v: "Products in operation",
    m_contact: "Contact",
    f_h2: "What defines the work", f_sub: "Technology, architecture, strategy, and execution.",
    c1: "Architecture", c1p: "Designing scalable, resilient cloud foundations for what’s next.",
    c2: "AI & Technology", c2p: "Exploring AI and emerging technology to solve real-world problems.",
    c3: "Strategy", c3p: "Connecting technology, people, and opportunity with practical direction.",
    c4: "Build", c4p: "Turning ideas into working products, platforms, and measurable progress.",
    creed_h: "Technology is a tool. A better tomorrow is the goal.",
    creed_p: "I believe in the power of technology to expand human potential, not replace it. I build thoughtful systems, explore bold ideas, and focus on solutions that create practical, lasting value.",
    d_h2: "In development", d_sub: "Products in operation. Each opens in a new tab.",
    p1: "Meeting minutes from a recording, with decisions and action items.",
    p2: "Web and AI security assessment mapped to public-sector standards.",
    p3: "Monolith-to-services design, verified against the build.",
    newtab: "(opens in a new tab)",
    foot: "Updated October 2026",
    lang_btn: "KO", lang_aria: "한국어로 보기",
    S: [["Cloud architecture","Scalable, resilient foundations"],["AI systems","Models that run close to the data"],["Security standards","Public-sector rules, mapped to checks"],["Strategy","Technology, people, opportunity"],["End-to-end build","Platform to product to operations"],["Operations","The part that proves the design"]]
  },
  ko: {
    title: "클라우드 네이티브 아키텍트 · AI 엔지니어 · 서비스 구축 전문가",
    desc: "도구는 계속 바뀌어도 목표는 변하지 않습니다. 클라우드 아키텍처와 AI 시스템, 전략, 그리고 그것들을 실현한 프로젝트를 소개합니다.",
    nav_fields: "전문 분야", nav_dev: "프로젝트", nav_contact: "연락처",
    eyebrow: "클라우드 네이티브 아키텍트 · AI 엔지니어 · 서비스 구축 전문가",
    h1a: "도구들은 끊임없이 변합니다.", h1b: "목표는 변하지 않습니다.",
    lead: "저는 끊임없이 변화를 탐구하고, 변화 속에서도 견고하게 작동하는 것을 만듭니다. 클라우드 플랫폼과 AI 시스템을 설계하고, 두 기술을 결합해 실제 사용자가 필요로 하는 제품으로 구현합니다.",
    m_focus: "전문 분야", m_focus_v: "클라우드 플랫폼 · 응용 AI · 보안",
    m_dev: "프로젝트", m_dev_v: "운영 중인 제품",
    m_contact: "연락처",
    f_h2: "나의 일을 정의하는 네 가지 축", f_sub: "기술, 아키텍처, 전략, 그리고 실행.",
    c1: "아키텍처", c1p: "다가올 변화를 뒷받침할 수 있도록 확장성과 복원력을 갖춘 클라우드 기반을 설계합니다.",
    c2: "AI와 신기술", c2p: "AI와 신기술을 탐구하고 적용하여 현실의 문제를 해결합니다.",
    c3: "전략", c3p: "기술과 사람, 기회를 연결하여 실행 가능한 방향을 제시합니다.",
    c4: "구현", c4p: "아이디어를 실제 작동하는 제품과 플랫폼으로 구현하고, 측정 가능한 성과로 연결합니다.",
    creed_h: "기술은 도구일 뿐입니다. 더 나은 내일이 목표입니다.",
    creed_p: "저는 기술이 인간을 대체하는 것이 아니라, 인간의 가능성을 확장하는 힘이라고 믿습니다. 깊이 고민해 시스템을 설계하고, 대담한 아이디어를 탐구하며, 실질적이고 지속적인 가치를 만드는 해결책에 집중합니다.",
    d_h2: "개발 중 프로젝트", d_sub: "현재 운영 중인 제품입니다. 각 링크는 새 탭에서 열립니다.",
    p1: "회의 녹음 하나로 결정 사항과 할 일까지 정리된 회의록을 만듭니다.",
    p2: "공공기관 보안 기준에 맞춰 웹과 AI 서비스를 진단합니다.",
    p3: "모놀리스를 마이크로서비스로 나누는 설계를 그리고, 코드가 설계대로인지 검증합니다.",
    newtab: "(새 탭에서 열림)",
    foot: "최근 업데이트: 2026년 10월",
    lang_btn: "EN", lang_aria: "View in English",
    S: [["클라우드 아키텍처","확장 가능하고 회복력 있는 기반"],["AI 시스템","데이터 가까이에서 도는 모델"],["보안 기준","공공 규정을 점검 항목으로"],["전략","기술, 사람, 기회"],["끝까지 만들기","플랫폼에서 제품, 운영까지"],["운영","설계를 증명하는 단계"]]
  }

};
const en = T.en;
const t = (k) => `data-i18n="${k}"`;

const CARDS_DEV = `<section class="dev shell" id="development">
      <div class="head rv"><h2 ${t("d_h2")}>${en.d_h2}</h2><span ${t("d_sub")}>${en.d_sub}</span></div>
      <ul>
        <li class="rv"><a href="https://am.leestory.com/" target="_blank" rel="noopener"><span class="name">Auto-Minutes<i aria-hidden="true">↗</i></span><span class="what" ${t("p1")}>${en.p1}</span><span class="host">am.leestory.com</span><span class="sr" ${t("newtab")}>${en.newtab}</span></a></li>
        <li class="rv"><a href="https://omni.leestory.com/" target="_blank" rel="noopener"><span class="name">OmniSecure<i aria-hidden="true">↗</i></span><span class="what" ${t("p2")}>${en.p2}</span><span class="host">omni.leestory.com</span><span class="sr" ${t("newtab")}>${en.newtab}</span></a></li>
        <li class="rv"><a href="https://archlens.leestory.com/" target="_blank" rel="noopener"><span class="name">ArchLens<i aria-hidden="true">↗</i></span><span class="what" ${t("p3")}>${en.p3}</span><span class="host">archlens.leestory.com</span><span class="sr" ${t("newtab")}>${en.newtab}</span></a></li>
      </ul>
    </section>`;

const LIST_DEV = `<section class="dev dev-list shell" id="development">
      <div class="head rv"><h2 ${t("d_h2")}>${en.d_h2}</h2><span ${t("d_sub")}>${en.d_sub}</span></div>
      <ul>
        <li class="rv"><a href="https://am.leestory.com/" target="_blank" rel="noopener"><span class="name">Auto-Minutes</span><span class="what" ${t("p1")}>${en.p1}</span><span class="host">am.leestory.com</span><span class="sr" ${t("newtab")}>${en.newtab}</span></a></li>
        <li class="rv"><a href="https://omni.leestory.com/" target="_blank" rel="noopener"><span class="name">OmniSecure</span><span class="what" ${t("p2")}>${en.p2}</span><span class="host">omni.leestory.com</span><span class="sr" ${t("newtab")}>${en.newtab}</span></a></li>
        <li class="rv"><a href="https://archlens.leestory.com/" target="_blank" rel="noopener"><span class="name">ArchLens</span><span class="what" ${t("p3")}>${en.p3}</span><span class="host">archlens.leestory.com</span><span class="sr" ${t("newtab")}>${en.newtab}</span></a></li>
      </ul>
    </section>`;

const LIST_CSS = `
    .dev-list ul{display:block;border-top:1px solid var(--ink)}
    .dev-list li{border-bottom:1px solid var(--line)}
    .dev-list a{position:relative;display:grid;grid-template-columns:240px 1fr auto;gap:28px;padding:22px 0;align-items:baseline;border:0;border-radius:0;background:transparent;box-shadow:none;transition:padding-left .35s cubic-bezier(.2,.7,.2,1)}
    .dev-list a::before{content:"";position:absolute;left:0;top:16px;bottom:16px;width:2px;background:var(--accent);transform:scaleY(0);transition:transform .35s cubic-bezier(.2,.7,.2,1)}
    .dev-list a:hover{padding-left:16px;transform:none;box-shadow:none;border-color:transparent}
    .dev-list a:hover::before{transform:scaleY(1)}
    .dev-list .name{display:block;font-family:var(--display);font-weight:700;font-size:22px;letter-spacing:-.02em;line-height:1.15;transition:color .2s}
    .dev-list a:hover .name{color:var(--accent)}
    .dev-list .what{display:block;margin:0;color:var(--ink-2);font-size:15px;line-height:1.5}
    .dev-list .host{display:block;margin:0;font-size:13px;color:var(--muted);white-space:nowrap}
    .dev-list .host::after{content:" ↗"}
    @media(max-width:900px){.dev-list a{grid-template-columns:200px 1fr;gap:8px 24px}.dev-list .host{grid-column:2}}
    @media(max-width:620px){.dev-list a{grid-template-columns:1fr;gap:4px;padding:16px 0}.dev-list .host{grid-column:1}}`;

const page = (art, extraCss, js, devHtml, devCss) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#ffffff" />
  <title>${en.title}</title>
  <meta name="description" content="${en.desc}" />
  <meta property="og:title" content="${en.title}" />
  <meta property="og:description" content="${en.h1a} ${en.h1b}" />
  <meta property="og:url" content="https://leestory.com/" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700&family=Inter:wght@400;500&family=Noto+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet" />
  <script>document.documentElement.classList.add('js');if(location.hash.indexOf('static')>-1)document.documentElement.classList.add('static')</script>
  <style>
    :root{--bg:#fff;--bg-2:#f5f5f7;--ink:#1d1d1f;--ink-2:#515154;--muted:#6e6e73;--line:#e5e5ea;--line-2:#d2d2d7;--accent:#0a58e0;--accent-2:#5b8cff;--max:1160px;--display:Manrope,"Noto Sans KR",Inter,sans-serif;--sans:Inter,"Noto Sans KR",-apple-system,"Segoe UI",sans-serif}
    *{box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
    html[lang="ko"] body{word-break:keep-all}
    a{color:inherit;text-decoration:none}
    a:focus-visible,button:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:6px}
    .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
    .shell{width:min(calc(100% - 48px),var(--max));margin:0 auto}

    header{position:absolute;top:0;left:0;right:0;z-index:5}
    .nav{height:84px;display:flex;align-items:center;justify-content:space-between;font-size:14px}
    .brand{display:inline-flex;align-items:center;gap:9px;color:var(--ink);font-size:14px}
    .brand .mark{width:18px;height:18px;flex:none}
    .brand b{font-family:var(--display);font-weight:700;letter-spacing:-.01em}
    .brand em{font-style:normal;color:var(--muted);font-weight:500}
    .brand:hover em{color:var(--ink-2)}
    nav{display:flex;align-items:center;gap:30px;color:var(--ink-2)}
    nav a:hover{color:var(--ink)}
    nav .cta{padding:8px 15px;border:1px solid var(--line-2);border-radius:999px;color:var(--ink);background:rgba(255,255,255,.7);backdrop-filter:blur(8px)}
    .lang{font:inherit;font-weight:500;letter-spacing:.04em;color:var(--ink-2);background:transparent;border:1px solid transparent;border-radius:999px;padding:7px 10px;cursor:pointer;transition:color .2s,border-color .2s}
    .lang:hover{color:var(--ink);border-color:var(--line-2)}

    .hero{position:relative;min-height:min(100vh,860px);display:grid;align-items:center;padding:120px 0 80px;overflow:hidden;background:radial-gradient(720px 520px at 78% 44%,rgba(10,88,224,.09),transparent 62%),radial-gradient(520px 420px at 86% 72%,rgba(91,140,255,.07),transparent 60%),linear-gradient(180deg,#fff 0%,#f7f8fb 100%)}
    .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(29,29,31,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(29,29,31,.055) 1px,transparent 1px);background-size:80px 80px;-webkit-mask-image:radial-gradient(60% 60% at 70% 50%,#000 10%,transparent 100%);mask-image:radial-gradient(60% 60% at 70% 50%,#000 10%,transparent 100%)}
    .art{position:absolute;right:-50px;top:50%;width:880px;height:720px;transform:translateY(-50%)}
    .art canvas{width:100%;height:100%;display:block}
    .hero .shell{position:relative;z-index:2;pointer-events:none}
    .hero .shell a{pointer-events:auto}
    .eyebrow{font-size:13.5px;color:var(--ink-2);display:flex;gap:12px;align-items:center;margin-bottom:30px}
    .eyebrow i{width:6px;height:6px;border-radius:50%;background:var(--accent);box-shadow:0 0 12px rgba(10,88,224,.55)}
    h1{margin:0;font-family:var(--display);font-weight:700;font-size:clamp(44px,6.2vw,84px);line-height:1.02;letter-spacing:-.04em;max-width:10.5em}
    html[lang="ko"] h1{letter-spacing:-.03em;line-height:1.12;font-size:clamp(38px,5.4vw,72px)}
    h1 span{display:block}
    h1 span + span{color:var(--ink-2);font-weight:500}
    .lead{margin:30px 0 0;font-size:clamp(17px,1.5vw,20px);line-height:1.6;color:var(--ink-2);max-width:30em}
    .meta{margin-top:48px;display:flex;gap:40px;font-size:13.5px;color:var(--muted)}
    .meta b{display:block;color:var(--ink);font-weight:600;margin-bottom:2px;font-family:var(--display)}
    .meta a{color:var(--accent)}
    .reveal{animation:rise .9s cubic-bezier(.2,.7,.2,1) both}
    .reveal:nth-child(2){animation-delay:.08s}.reveal:nth-child(3){animation-delay:.16s}.reveal:nth-child(4){animation-delay:.24s}
    @keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
    .static .reveal{animation:none}

    .rv{transition:opacity .8s ease,transform .8s cubic-bezier(.2,.7,.2,1)}
    .js .rv{opacity:0;transform:translateY(18px)}
    .js .rv.in,.static .rv{opacity:1;transform:none}

    .fields{padding:96px 0 40px}
    .head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:28px}
    .head h2{margin:0;font-family:var(--display);font-weight:700;font-size:30px;letter-spacing:-.03em}
    .head span{font-size:14px;color:var(--muted)}
    .cards{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
    .card{position:relative;padding:28px 26px;border-radius:22px;background:var(--bg-2);min-height:232px;display:flex;flex-direction:column;gap:0;transition:transform .3s cubic-bezier(.2,.7,.2,1),box-shadow .3s,background .3s}
    .card:hover{background:#fff;transform:translateY(-3px);box-shadow:0 30px 60px -36px rgba(29,29,31,.28),0 0 0 1px var(--line)}
    .card svg{width:28px;height:28px;stroke:var(--accent);fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
    .card svg{flex:none}
    .card h3{margin:40px 0 10px;font-family:var(--display);font-weight:700;font-size:21px;letter-spacing:-.02em;line-height:1.25;min-height:1.25em}
    .card p{margin:0;font-size:14.5px;color:var(--ink-2);line-height:1.55}

    .creed{padding:72px 0 88px}
    .creed .box{border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:64px 0;display:grid;grid-template-columns:1.1fr .9fr;gap:60px;align-items:center}
    .creed h2{margin:0;font-family:var(--display);font-weight:700;font-size:clamp(30px,3.6vw,48px);line-height:1.08;letter-spacing:-.035em}
    html[lang="ko"] .creed h2{letter-spacing:-.02em;line-height:1.2}
    .creed p{margin:0;color:var(--ink-2);font-size:16px;line-height:1.7;max-width:32em}

    .dev{padding:0 0 96px}
    .dev .head{margin-bottom:18px}
    .dev ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px}
    .dev a{display:block;padding:18px 20px;border:1px solid var(--line);border-radius:16px;background:#fff;transition:box-shadow .25s,transform .25s cubic-bezier(.2,.7,.2,1),border-color .25s}
    .dev a:hover{border-color:var(--line-2);box-shadow:0 20px 40px -28px rgba(29,29,31,.3);transform:translateY(-2px)}
    .dev .name{display:flex;justify-content:space-between;font-weight:700;font-family:var(--display);font-size:15.5px;letter-spacing:-.01em}
    .dev .name i{font-style:normal;color:var(--muted);font-family:var(--sans);font-weight:400;transition:transform .25s,color .25s}
    .dev a:hover .name i{transform:translate(2px,-2px);color:var(--accent)}
    .dev .what{display:block;margin-top:6px;font-size:13.5px;color:var(--ink-2);line-height:1.5}
    .dev .host{display:block;margin-top:10px;font-size:12.5px;color:var(--muted)}

    footer{border-top:1px solid var(--line);padding:28px 0 44px}
    .foot{display:flex;justify-content:space-between;font-size:13.5px;color:var(--muted)}
    .foot a{color:var(--ink-2)}

    @media(prefers-reduced-motion:reduce){.reveal{animation:none}.js .rv{opacity:1;transform:none}}
    @media(max-width:980px){.art{right:-300px;width:760px;height:620px;opacity:.6}.cards{grid-template-columns:1fr 1fr}.creed .box{grid-template-columns:1fr;gap:28px}.dev ul{grid-template-columns:1fr}}
    @media(max-width:620px){.shell{width:min(calc(100% - 32px),var(--max))}.nav{height:68px}nav{gap:12px}nav a:not(.cta){display:none}.hero{min-height:0;padding:112px 0 64px}.art{right:-280px;top:28%;width:600px;height:500px;opacity:.35;pointer-events:none}.meta{flex-direction:column;gap:14px;margin-top:36px}.head{flex-direction:column;align-items:flex-start;gap:6px}.cards{grid-template-columns:1fr}.card{min-height:0}.fields{padding:64px 0 24px}.creed .box{padding:44px 0}.foot{flex-direction:column;gap:6px}}
    ${extraCss}${devCss}
  </style>
</head>
<body>
  <header><div class="shell nav">
    <a class="brand" href="#top" aria-label="leestory.com"><svg class="mark" viewBox="0 0 18 18" aria-hidden="true"><path d="M3.5 13.5 9 4.5l5.5 9" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M3.5 13.5h11" stroke="currentColor" stroke-width="1.2" fill="none" opacity=".35"/><circle cx="9" cy="4.5" r="2.2" fill="#0a58e0"/><circle cx="3.5" cy="13.5" r="1.7" fill="currentColor"/><circle cx="14.5" cy="13.5" r="1.7" fill="currentColor"/></svg><span><b>leestory</b><em>.com</em></span></a>
    <nav><a href="#fields" ${t("nav_fields")}>${en.nav_fields}</a><a href="#development" ${t("nav_dev")}>${en.nav_dev}</a><a class="cta" href="mailto:leestory0314@gmail.com" ${t("nav_contact")}>${en.nav_contact}</a><button class="lang" id="lang" type="button" aria-label="${en.lang_aria}">${en.lang_btn}</button></nav>
  </div></header>

  <main>
    <section class="hero" id="top">
      <div class="grid" aria-hidden="true"></div>
      <div class="art">${art}</div>
      <div class="shell">
        <div class="eyebrow reveal"><i aria-hidden="true"></i><span ${t("eyebrow")}>${en.eyebrow}</span></div>
        <h1 class="reveal"><span ${t("h1a")}>${en.h1a}</span><span ${t("h1b")}>${en.h1b}</span></h1>
        <p class="lead reveal" ${t("lead")}>${en.lead}</p>
        <div class="meta reveal">
          <div><b ${t("m_focus")}>${en.m_focus}</b><span ${t("m_focus_v")}>${en.m_focus_v}</span></div>
          <div><b ${t("m_dev")}>${en.m_dev}</b><span ${t("m_dev_v")}>${en.m_dev_v}</span></div>
          <div><b ${t("m_contact")}>${en.m_contact}</b><a href="mailto:leestory0314@gmail.com">leestory0314@gmail.com</a></div>
        </div>
      </div>
    </section>

    <section class="fields shell" id="fields">
      <div class="head rv"><h2 ${t("f_h2")}>${en.f_h2}</h2><span ${t("f_sub")}>${en.f_sub}</span></div>
      <div class="cards">
        <article class="card rv"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8l9-4 9 4-9 4-9-4Z"/><path d="M3 12l9 4 9-4M3 16l9 4 9-4"/></svg><h3 ${t("c1")}>${en.c1}</h3><p ${t("c1p")}>${en.c1p}</p></article>
        <article class="card rv"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><circle cx="12" cy="12" r="2"/><path d="M7 12h3M14 11l3-4M14 13l3 4"/></svg><h3 ${t("c2")}>${en.c2}</h3><p ${t("c2p")}>${en.c2p}</p></article>
        <article class="card rv"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2Z"/></svg><h3 ${t("c3")}>${en.c3}</h3><p ${t("c3p")}>${en.c3p}</p></article>
        <article class="card rv"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/></svg><h3 ${t("c4")}>${en.c4}</h3><p ${t("c4p")}>${en.c4p}</p></article>
      </div>
    </section>

    <section class="creed shell">
      <div class="box rv">
        <h2 ${t("creed_h")}>${en.creed_h}</h2>
        <p ${t("creed_p")}>${en.creed_p}</p>
      </div>
    </section>

    ${devHtml}
  </main>

  <footer><div class="shell foot">
    <a href="mailto:leestory0314@gmail.com">leestory0314@gmail.com</a>
    <span ${t("foot")}>${en.foot}</span>
  </div></footer>

  <script>
    var I18N = ${JSON.stringify({ en: T.en, ko: T.ko })};
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
    ${js}
  </script>
</body>
</html>
`;

/* mesh (light) */
const meshArt = `<canvas id="mesh" width="880" height="720" aria-label="A network of nodes; six larger nodes carry the fields of work and connect toward the pointer"></canvas>`;
const meshCss = `.art canvas{cursor:crosshair}`;
const meshJs = `(function(){var c=document.getElementById('mesh');if(!c)return;var ctx=c.getContext('2d');var W=880,H=720,dpr=Math.min(window.devicePixelRatio||1,2);c.width=W*dpr;c.height=H*dpr;ctx.scale(dpr,dpr);
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
window.__redraw=draw;draw();if(!still)requestAnimationFrame(step)})();`;

/* globe (light) */
const globeArt = `<canvas id="globe" width="880" height="720" aria-label="A shaded globe of points; six labelled strengths sit on its surface, linked by arcs; drag to rotate"></canvas>`;
const globeCss = `.art canvas{cursor:grab;touch-action:none}.art canvas:active{cursor:grabbing}`;
const globeJs = `(function(){var c=document.getElementById('globe');if(!c)return;var ctx=c.getContext('2d');var W=880,H=720,dpr=Math.min(window.devicePixelRatio||1,2);c.width=W*dpr;c.height=H*dpr;ctx.scale(dpr,dpr);
var still=matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('static');
function S(){return I18N.en.S}
var FONT='Inter, "Noto Sans KR", system-ui, sans-serif';
var R=236,cx=450,cy=360,N=720,pts=[],i;for(i=0;i<N;i++){var y=1-(i/(N-1))*2,r=Math.sqrt(1-y*y),th=i*2.399963;pts.push([r*Math.cos(th),y,r*Math.sin(th)])}
function ll(la,lo){la*=Math.PI/180;lo*=Math.PI/180;return [Math.cos(la)*Math.cos(lo),Math.sin(la),Math.cos(la)*Math.sin(lo)]}
var marks=[ll(38,20),ll(-8,80),ll(30,-50),ll(-30,-120),ll(55,150),ll(-12,-20)];
var arcs=[[0,1],[0,2],[1,4],[2,3],[3,5],[5,0]];
var rotY=-.6,rotX=.42,drag=null,auto=true,timer;
function rot(p){var cy_=Math.cos(rotY),sy=Math.sin(rotY),x1=p[0]*cy_-p[2]*sy,z1=p[0]*sy+p[2]*cy_,cx_=Math.cos(rotX),sx=Math.sin(rotX);return [x1,p[1]*cx_-z1*sx,p[1]*sx+z1*cx_]}
function slerp(a,b,t){var o=Math.acos(Math.max(-1,Math.min(1,a[0]*b[0]+a[1]*b[1]+a[2]*b[2]))),s=Math.sin(o);if(s<1e-5)return a;var k1=Math.sin((1-t)*o)/s,k2=Math.sin(t*o)/s;return [a[0]*k1+b[0]*k2,a[1]*k1+b[1]*k2,a[2]*k1+b[2]*k2]}
function P(q){return [cx+q[0]*R,cy-q[1]*R]}
function arcLine(){ctx.lineWidth=1;var k,q,prev;for(var la=-60;la<=60;la+=30){ctx.beginPath();prev=false;for(k=0;k<=96;k++){q=rot(ll(la,k/96*360));if(q[2]>0){var p=P(q);if(prev)ctx.lineTo(p[0],p[1]);else ctx.moveTo(p[0],p[1]);prev=true}else prev=false}ctx.stroke()}
for(var lo=0;lo<360;lo+=30){ctx.beginPath();prev=false;for(k=0;k<=96;k++){q=rot(ll(-90+k/96*180,lo));if(q[2]>0){var p2=P(q);if(prev)ctx.lineTo(p2[0],p2[1]);else ctx.moveTo(p2[0],p2[1]);prev=true}else prev=false}ctx.stroke()}}
function draw(){ctx.clearRect(0,0,W,H);
var halo=ctx.createRadialGradient(cx,cy,R*.9,cx,cy,R*1.4);halo.addColorStop(0,'rgba(10,88,224,.10)');halo.addColorStop(1,'rgba(10,88,224,0)');ctx.fillStyle=halo;ctx.beginPath();ctx.arc(cx,cy,R*1.4,0,7);ctx.fill();
var body=ctx.createRadialGradient(cx-R*.4,cy-R*.45,R*.08,cx,cy,R);body.addColorStop(0,'#ffffff');body.addColorStop(.55,'#f1f4fb');body.addColorStop(1,'#dde4f3');ctx.fillStyle=body;ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.fill();
ctx.strokeStyle='rgba(10,88,224,.13)';arcLine();
for(i=0;i<N;i++){var q=rot(pts[i]),f=q[2];if(f<=0)continue;var p=P(q);ctx.fillStyle='rgba(10,88,224,'+(0.18+0.62*f).toFixed(2)+')';ctx.beginPath();ctx.arc(p[0],p[1],0.9+1.4*f,0,7);ctx.fill()}
var rim=ctx.createRadialGradient(cx,cy,R*.8,cx,cy,R);rim.addColorStop(0,'rgba(29,29,31,0)');rim.addColorStop(1,'rgba(29,29,31,.16)');ctx.fillStyle=rim;ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.fill();
var spec=ctx.createRadialGradient(cx-R*.45,cy-R*.5,0,cx-R*.45,cy-R*.5,R*.55);spec.addColorStop(0,'rgba(255,255,255,.9)');spec.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=spec;ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.fill();
ctx.lineWidth=1;ctx.strokeStyle='rgba(10,88,224,.35)';ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.stroke();
for(i=0;i<arcs.length;i++){var A=marks[arcs[i][0]],B=marks[arcs[i][1]],qa=rot(A),qb=rot(B);if((qa[2]+qb[2])/2<-.1)continue;ctx.strokeStyle='rgba(29,29,31,'+(0.18+0.35*Math.max(0,(qa[2]+qb[2])/2)).toFixed(2)+')';ctx.beginPath();for(var k=0;k<=48;k++){var t=k/48,m=slerp(A,B,t),lift=1+0.14*Math.sin(t*Math.PI),q2=rot([m[0]*lift,m[1]*lift,m[2]*lift]),p4=P(q2);if(k===0)ctx.moveTo(p4[0],p4[1]);else ctx.lineTo(p4[0],p4[1])}ctx.stroke()}
ctx.textBaseline='middle';var SS=S();for(i=0;i<marks.length;i++){var q=rot(marks[i]);if(q[2]<=0.02)continue;var p=P(q),a=Math.min(1,q[2]*1.6);ctx.fillStyle='#0a58e0';ctx.beginPath();ctx.arc(p[0],p[1],3.2,0,7);ctx.fill();ctx.strokeStyle='rgba(10,88,224,'+(0.5*a).toFixed(2)+')';ctx.beginPath();ctx.arc(p[0],p[1],9,0,7);ctx.stroke();
var right=p[0]<cx,lx=p[0]+(right?-1:1)*(R*.36+34),ly=p[1]-12;ctx.strokeStyle='rgba(29,29,31,'+(0.4*a).toFixed(2)+')';ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(p[0]+(right?-1:1)*20,p[1]-12);ctx.lineTo(lx+(right?8:-8),ly);ctx.stroke();
ctx.textAlign=right?'right':'left';ctx.font='600 12.5px '+FONT;ctx.fillStyle='rgba(29,29,31,'+a.toFixed(2)+')';ctx.fillText(SS[i][0],lx,ly-7);ctx.font='400 11.5px '+FONT;ctx.fillStyle='rgba(10,88,224,'+(0.95*a).toFixed(2)+')';ctx.fillText(SS[i][1],lx,ly+8)}}
c.addEventListener('pointerdown',function(e){drag={x:e.clientX,y:e.clientY,ry:rotY,rx:rotX};auto=false;clearTimeout(timer);c.setPointerCapture(e.pointerId)});
c.addEventListener('pointermove',function(e){if(!drag)return;rotY=drag.ry+(e.clientX-drag.x)*.008;rotX=Math.max(-1.2,Math.min(1.2,drag.rx+(e.clientY-drag.y)*.005));if(still)draw()});
c.addEventListener('pointerup',function(){drag=null;timer=setTimeout(function(){auto=true},1800)});
function loop(){if(auto)rotY+=.0018;draw();requestAnimationFrame(loop)}window.__redraw=draw;draw();if(!still)loop()})();`;

fs.writeFileSync(path.join(root, "mockups/final-mesh.html"), page(meshArt, meshCss, meshJs, LIST_DEV, LIST_CSS));
fs.writeFileSync(path.join(root, "mockups/final-globe.html"), page(globeArt, globeCss, globeJs, CARDS_DEV, ""));
console.log("wrote mockups/final-mesh.html (list, EN/KO), mockups/final-globe.html (cards, EN/KO)");
