/* leestory.com
   1. Language: English by default, Korean on demand (header button, #ko, remembered in localStorage)
   2. Reveal: sections rise into view once as they scroll in
   3. Hero mesh: a drifting node network that connects toward the pointer */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Language ---------- */

  var COPY = {
    en: {
      title: 'Cloud Native Architect · AI Technologist · Builder',
      desc: 'The tool keeps changing; the goal doesn’t. Cloud architecture, AI systems, strategy, and the products in development.',
      nav_fields: 'Fields', nav_dev: 'In development', nav_contact: 'Contact',
      eyebrow: 'Cloud Native Architect · AI Technologist · Builder',
      h1a: 'The tool keeps changing.', h1b: 'The goal doesn’t.',
      lead: 'So I keep studying what changes and building what holds up: cloud platforms, AI systems, and products that put both to work for the people who need them.',
      m_focus: 'Focus', m_focus_v: 'Cloud platforms · Applied AI · Security',
      m_dev: 'In development', m_dev_v: 'Products in operation',
      m_contact: 'Contact',
      f_h2: 'What defines the work', f_sub: 'Technology, architecture, strategy, and execution.',
      c1: 'Architecture', c1p: 'Designing scalable, resilient cloud foundations for what’s next.',
      c2: 'AI & Technology', c2p: 'Exploring AI and emerging technology to solve real-world problems.',
      c3: 'Strategy', c3p: 'Connecting technology, people, and opportunity with practical direction.',
      c4: 'Build', c4p: 'Turning ideas into working products, platforms, and measurable progress.',
      creed_a: 'Technology is a tool.', creed_b: 'A better tomorrow is the goal.',
      creed_p: 'I believe in the power of technology to expand human potential, not replace it. I build thoughtful systems, explore bold ideas, and focus on solutions that create practical, lasting value.',
      d_h2: 'In development', d_sub: 'Products in operation. Each opens in a new tab.',
      p1: 'Meeting minutes from a recording, with decisions and action items.',
      p2: 'Web and AI security assessment mapped to public-sector standards.',
      p3: 'Monolith-to-Microservices design, verified against the build.',
      p4: 'Unsure about your child’s academy? A one-minute quiz finds the right one.',
      newtab: '(opens in a new tab)',
      foot: 'Updated October 2026',
      lang_btn: 'KO', lang_aria: '한국어로 보기'
    },
    ko: {
      title: '클라우드 네이티브 아키텍트 · AI 엔지니어 · 서비스 구축 전문가',
      desc: '도구는 계속 바뀌어도 목표는 변하지 않습니다. 클라우드 아키텍처와 AI 시스템, 전략, 그리고 그것들을 실현한 프로젝트를 소개합니다.',
      nav_fields: '전문 분야', nav_dev: '프로젝트', nav_contact: '연락처',
      eyebrow: '클라우드 네이티브 아키텍트 · AI 엔지니어 · 서비스 구축 전문가',
      h1a: '도구들은 끊임없이 변합니다.', h1b: '목표는 변하지 않습니다.',
      lead: '저는 끊임없이 변화를 탐구하고, 변화 속에서도 견고하게 작동하는 것을 만듭니다. 클라우드 플랫폼과 AI 시스템을 설계하고, 두 기술을 결합해 실제 사용자가 필요로 하는 제품으로 구현합니다.',
      m_focus: '전문 분야', m_focus_v: '클라우드 플랫폼 · 응용 AI · 보안',
      m_dev: '프로젝트', m_dev_v: '운영 중인 제품',
      m_contact: '연락처',
      f_h2: '나의 일을 정의하는 네 가지 축', f_sub: '기술, 아키텍처, 전략, 그리고 실행.',
      c1: '아키텍처', c1p: '다가올 변화를 뒷받침할 수 있도록 확장성과 복원력을 갖춘 클라우드 기반을 설계합니다.',
      c2: 'AI와 신기술', c2p: 'AI와 신기술을 탐구하고 적용하여 현실의 문제를 해결합니다.',
      c3: '전략', c3p: '기술과 사람, 기회를 연결하여 실행 가능한 방향을 제시합니다.',
      c4: '구현', c4p: '아이디어를 실제 작동하는 제품과 플랫폼으로 구현하고, 측정 가능한 성과로 연결합니다.',
      creed_a: '기술은 도구일 뿐입니다.', creed_b: '더 나은 내일이 목표입니다.',
      creed_p: '저는 기술이 인간을 대체하는 것이 아니라, 인간의 가능성을 확장하는 힘이라고 믿습니다. 깊이 고민해 시스템을 설계하고, 대담한 아이디어를 탐구하며, 실질적이고 지속적인 가치를 만드는 해결책에 집중합니다.',
      d_h2: '개발 중 프로젝트', d_sub: '현재 운영 중인 제품입니다. 각 링크는 새 탭에서 열립니다.',
      p1: '회의 녹음 하나로 결정 사항과 할 일까지 정리된 회의록을 만듭니다.',
      p2: '공공기관 보안 기준에 맞춰 웹과 AI 서비스를 진단합니다.',
      p3: '모놀리스를 마이크로서비스로 나누는 설계를 그리고, 코드가 설계대로인지 검증합니다.',
      p4: '우리 아이 학원 고민될 때, 1분 진단으로 아이에게 맞는 학원을 찾아주세요.',
      newtab: '(새 탭에서 열림)',
      foot: '최근 업데이트: 2026년 10월',
      lang_btn: 'EN', lang_aria: 'View in English'
    }
  };

  var lang = 'en';

  function setLanguage(code) {
    var copy = COPY[code] || COPY.en;
    lang = code;
    document.documentElement.lang = code;
    document.title = copy.title;

    var description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', copy.desc);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (copy[key] != null) el.textContent = copy[key];
    });

    var button = document.getElementById('lang');
    if (button) {
      button.textContent = copy.lang_btn;
      button.setAttribute('aria-label', copy.lang_aria);
    }

    try { localStorage.setItem('lang', code); } catch (e) { /* storage unavailable */ }
  }

  function initLanguage() {
    var saved = null;
    try { saved = localStorage.getItem('lang'); } catch (e) { /* storage unavailable */ }
    if (location.hash.indexOf('ko') > -1) saved = 'ko';
    else if (location.hash.indexOf('en') > -1) saved = 'en';
    if (saved === 'ko') setLanguage('ko');

    var button = document.getElementById('lang');
    if (button) {
      button.addEventListener('click', function () {
        setLanguage(lang === 'en' ? 'ko' : 'en');
      });
    }
  }

  /* ---------- 2. Reveal on scroll ---------- */

  function initReveal() {
    var items = document.querySelectorAll('.rv');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      observer.observe(el);
    });
  }

  /* ---------- 3. Hero mesh ---------- */

  // Six labelled hubs stay near their home positions; the rest drift and are drawn toward the pointer.
  var HUB_LABELS = [
    ['Cloud architecture', 'Scalable, resilient foundations'],
    ['AI systems', 'Models that run close to the data'],
    ['Security standards', 'Public-sector rules, mapped to checks'],
    ['Strategy', 'Technology, people, opportunity'],
    ['End-to-end build', 'Platform to product to operations'],
    ['Operations', 'The part that proves the design']
  ];
  var HUB_HOMES = [[330, 200], [560, 140], [720, 265], [300, 430], [520, 500], [700, 465]];

  function initMesh() {
    var canvas = document.getElementById('mesh');
    if (!canvas) return;

    var W = 880, H = 720;
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    var FONT = 'Inter, "Noto Sans KR", system-ui, sans-serif';
    var INK = '#1d1d1f', BLUE = '#0a58e0';

    // Deterministic pseudo-random so the first frame looks the same on every visit.
    var seed = 7;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }

    var nodes = [];
    HUB_HOMES.forEach(function (home, i) {
      nodes.push({ x: home[0], y: home[1], hx: home[0], hy: home[1], vx: (rnd() - .5) * .12, vy: (rnd() - .5) * .12, r: 4.5, hub: i });
    });
    for (var n = 0; n < 70; n++) {
      nodes.push({ x: 200 + rnd() * (W - 230), y: 60 + rnd() * (H - 120), vx: (rnd() - .5) * .3, vy: (rnd() - .5) * .3, r: rnd() < .15 ? 2.8 : 1.8, hub: -1 });
    }

    var pointer = null, nearHub = -1;
    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      pointer = { x: (e.clientX - rect.left) * W / rect.width, y: (e.clientY - rect.top) * H / rect.height };
      nearHub = -1;
      for (var k = 0; k < HUB_HOMES.length; k++) {
        if (Math.hypot(nodes[k].x - pointer.x, nodes[k].y - pointer.y) < 46) nearHub = k;
      }
    });
    canvas.addEventListener('mouseleave', function () { pointer = null; nearHub = -1; });

    function line(a, b, style, width) {
      ctx.strokeStyle = style;
      ctx.lineWidth = width || 1;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    function dot(p, r, style) {
      ctx.fillStyle = style;
      ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fill();
    }
    function label(node, active) {
      var text = HUB_LABELS[node.hub];
      var toRight = node.x < W * .6;
      var x = node.x + (toRight ? 13 : -13);
      ctx.textBaseline = 'middle';
      ctx.textAlign = toRight ? 'left' : 'right';
      ctx.font = (active ? '600 ' : '500 ') + '12.5px ' + FONT;
      ctx.fillStyle = active ? INK : 'rgba(29,29,31,.8)';
      ctx.fillText(text[0], x, node.y - (active ? 8 : 0));
      if (active) {
        ctx.font = '400 11.5px ' + FONT;
        ctx.fillStyle = BLUE;
        ctx.fillText(text[1], x, node.y + 9);
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      var i, j, a, b, d;

      // links between nodes within reach; hub-to-hub links a little stronger
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        for (j = i + 1; j < nodes.length; j++) {
          b = nodes[j];
          d = Math.hypot(a.x - b.x, a.y - b.y);
          var reach = (a.hub >= 0 || b.hub >= 0) ? 160 : 120;
          if (d >= reach) continue;
          var both = a.hub >= 0 && b.hub >= 0;
          line(a, b, 'rgba(10,88,224,' + ((both ? .45 : .28) * (1 - d / reach)).toFixed(3) + ')', both ? 1.2 : 1);
        }
      }

      // links from nearby nodes to the pointer
      if (pointer) {
        for (i = 0; i < nodes.length; i++) {
          a = nodes[i];
          d = Math.hypot(a.x - pointer.x, a.y - pointer.y);
          if (d < 180) line(a, pointer, 'rgba(29,29,31,' + (.45 * (1 - d / 180)).toFixed(3) + ')');
        }
        dot(pointer, 3, INK);
      }

      // nodes and hub labels
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        if (a.hub < 0) { dot(a, a.r, 'rgba(10,88,224,.6)'); continue; }
        dot(a, a.r, nearHub === a.hub ? INK : BLUE);
        ctx.strokeStyle = 'rgba(10,88,224,.35)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r + 7, 0, Math.PI * 2); ctx.stroke();
        label(a, nearHub === a.hub);
      }
    }

    function step() {
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (node.hub >= 0) {
          // hubs wander a little, then ease back home
          node.x += (node.hx - node.x) * .01 + node.vx;
          node.y += (node.hy - node.y) * .01 + node.vy;
          if (Math.abs(node.x - node.hx) > 18) node.vx *= -1;
          if (Math.abs(node.y - node.hy) > 14) node.vy *= -1;
          continue;
        }
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 190 || node.x > W - 20) node.vx *= -1;
        if (node.y < 40 || node.y > H - 40) node.vy *= -1;
        if (pointer) {
          var dx = pointer.x - node.x, dy = pointer.y - node.y, dist = Math.hypot(dx, dy);
          if (dist < 180 && dist > 1) { node.x += dx / dist * .18; node.y += dy / dist * .18; }
        }
      }
      draw();
      if (!reduceMotion) requestAnimationFrame(step);
    }

    draw();
    if (!reduceMotion) requestAnimationFrame(step);
  }

  initLanguage();
  initReveal();
  initMesh();
})();
