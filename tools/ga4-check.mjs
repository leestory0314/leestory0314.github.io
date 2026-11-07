/* GA4 실측 도구 (35 A-8 8-3·8-5·8-7·8-8).
   실제 gtag.js 를 붙이고 수집 요청을 가로채 기록한다 — 수집 요청은 204 로 막아 Google 에 데이터가 가지 않는다.
   https://leestory.com/ 요청을 이 저장소 파일로 대신 응답하므로 호스트 조건(location.hostname)이 운영과 같다.

   사용: node tools/ga4-check.mjs <puppeteer-core 를 설치한 디렉터리> [--out <결과 디렉터리>] [--shots <스크린샷 디렉터리>]
   준비: 빈 디렉터리에서 `npm i puppeteer-core` (브라우저는 이 PC 의 Chrome 을 쓴다. 저장소에는 설치하지 않는다) */
import { createRequire } from 'node:module';
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const PPTR = argv[0];
const OUT = argv.includes('--out') ? resolve(argv[argv.indexOf('--out') + 1]) : null;
const SHOTS = argv.includes('--shots') ? resolve(argv[argv.indexOf('--shots') + 1]) : null;
if (!PPTR) { console.error('usage: node tools/ga4-check.mjs <puppeteer-core dir> [--out dir] [--shots dir]'); process.exit(2); }

const puppeteer = createRequire(join(resolve(PPTR), 'package.json'))('puppeteer-core');
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'].find(existsSync);
const SITE = 'https://leestory.com';
const GA_ID = 'G-TX4SCQ4QYE';
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.txt': 'text/plain', '.xml': 'application/xml' };
const ANALYTICS_HOST = /(^|\.)(google-analytics\.com|analytics\.google\.com|googletagmanager\.com|doubleclick\.net|google\.com|google\.co\.kr)$/;
const FLAG_RE = /"vtp_(historyEvents|enableHistoryEvents|enableScroll|enableOutboundClick|enableVideo|enableFormInteraction|enableFileDownload|autoEmailEnabled|autoPhoneEnabled|autoAddressEnabled)":true/g;

function localFile(pathname) {
  const rel = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
  const file = join(ROOT, rel);
  if (!file.startsWith(ROOT) || !existsSync(file)) return null;
  return { body: readFileSync(file), type: TYPES[extname(file)] || 'application/octet-stream' };
}

// 수집 요청 하나에 든 이벤트들(쿼리 + 본문 줄)을 평평하게 푼다
function parseHits(url, body) {
  const u = new URL(url);
  const base = Object.fromEntries(u.searchParams);
  const lines = (body || '').split('\n').filter(Boolean);
  const events = lines.length ? lines.map((l) => ({ ...base, ...Object.fromEntries(new URLSearchParams(l)) })) : [base];
  return events.map((e) => ({ en: e.en, dl: e.dl, dt: e.dt, dr: e.dr, npa: e.npa, em: e.em, uid: e.uid, tid: e.tid, extra: Object.keys(e).filter((k) => /^(em|uid|_fid|user_)/.test(k)) }));
}

async function run(browser, name, { enabled, optOut, host = 'leestory.com', path = '/', referer, actions, shot }) {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  const t0 = Date.now();
  const log = { name, hits: [], gtagLoaded: 0, thirdParty: new Set(), csp: [], errors: [], cookies: [], dataLayer: null, state: null };

  if (optOut) await page.evaluateOnNewDocument(() => { try { localStorage.setItem('ga_optout', '1'); } catch (e) { /* ignore */ } });
  page.on('console', (m) => { if (/Content Security Policy|Refused to/.test(m.text())) log.csp.push(m.text()); });
  page.on('pageerror', (e) => log.errors.push(String(e)));

  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const u = new URL(req.url());
    if (u.hostname === host) {
      const f = localFile(u.pathname);
      if (!f) return req.respond({ status: 404, body: '' });
      let body = f.body;
      // 저장소의 현재 값과 무관하게 시나리오가 요구하는 상태로 맞춘다(켜짐 커밋 뒤에도 8-5 를 잴 수 있게, 2026-11-08)
      if (u.pathname === '/assets/js/site.js') body = Buffer.from(f.body.toString('utf8').replace(/enabled: (true|false),/, 'enabled: ' + enabled + ','));
      return req.respond({ status: 200, contentType: f.type, body });
    }
    if (ANALYTICS_HOST.test(u.hostname)) {
      if (u.pathname.startsWith('/gtag/js')) { log.gtagLoaded++; return req.continue(); }
      log.hits.push({ t: Date.now() - t0, url: req.url(), events: parseHits(req.url(), req.postData()) });
      return req.respond({ status: 204, body: '' });
    }
    log.thirdParty.add(u.hostname);
    if (u.hostname === 'fonts.googleapis.com') return req.respond({ status: 200, contentType: 'text/css', body: '' });
    return req.respond({ status: 204, body: '' });
  });

  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(`https://${host}${path}`, { referer, waitUntil: 'load' });
  await new Promise((r) => setTimeout(r, 3000));
  if (actions) await actions(page);
  log.cookies = (await page.cookies()).filter((c) => c.name.startsWith('_ga')).map((c) => ({ name: c.name, domain: c.domain, expires: c.expires }));
  log.dataLayer = await page.evaluate(() => (window.dataLayer ? window.dataLayer.map((a) => Array.from(a).map((x) => (x instanceof Date ? 'Date' : x))) : null));
  log.state = await page.evaluate((id) => ({ optOut: localStorage.getItem('ga_optout'), disabled: window['ga-disable-' + id] === true, stateText: (document.getElementById('ga-state') || {}).textContent, buttonHidden: (document.getElementById('ga-toggle') || {}).hidden }), GA_ID);
  if (shot) await shot(page);
  await page.goto('about:blank');
  await new Promise((r) => setTimeout(r, 800));
  await context.close();
  log.thirdParty = [...log.thirdParty];
  return log;
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, userDataDir: join(tmpdir(), 'ga4-check-profile-' + Date.now()), args: ['--no-first-run', '--disable-extensions'] });
const results = {};
try {
  // 8-5: 스위치 꺼짐(저장소 그대로) — 외부 요청 0
  results.switchOff = await run(browser, 'switchOff', { enabled: false, referer: 'https://www.google.com/search?q=leestory' });
  // 8-6·8-8: 켜짐 — 검색 참조·쿼리·해시가 있는 주소로 들어와 해시 이동·언어 전환까지
  results.enabled = await run(browser, 'enabled', {
    enabled: true, path: '/?utm_source=test&q=secret#ko', referer: 'https://www.google.com/search?q=leestory+secret',
    actions: async (page) => {
      await page.click('nav a[href="#fields"]'); await new Promise((r) => setTimeout(r, 1500));
      await page.click('#lang'); await new Promise((r) => setTimeout(r, 1500));
      await page.evaluate(() => history.pushState({}, '', '/?after=push')); await new Promise((r) => setTimeout(r, 2500));
    }
  });
  // 8-7: 끄기 저장됨 — 외부 요청 0
  results.optOut = await run(browser, 'optOut', { enabled: true, optOut: true, referer: 'https://www.google.com/' });
  // 8-7: 화면 안 토글 — 누르면 저장 + ga-disable
  results.toggle = await run(browser, 'toggle', {
    enabled: true,
    actions: async (page) => {
      await page.evaluate(() => { document.getElementById('privacy').open = true; });
      await page.click('#ga-toggle'); await new Promise((r) => setTimeout(r, 500));
    }
  });
  // 호스트 조건: 2차 도메인에서는 켜져 있어도 부르지 않는다
  results.otherHost = await run(browser, 'otherHost', { enabled: true, host: 'academyfit.leestory.com' });
  // 8-3: 실 gtag.js 원문의 자동 감지 플래그
  const src = await (await fetch(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, { headers: { 'User-Agent': 'Mozilla/5.0' } })).text();
  results.gtagFlags = { bytes: src.length, trueFlags: [...src.matchAll(FLAG_RE)].map((m) => m[1]) };

  if (SHOTS) {
    mkdirSync(SHOTS, { recursive: true });
    for (const [w, h, tag] of [[1280, 900, '1280'], [390, 844, '390']]) {
      for (const lang of ['en', 'ko']) {
        await run(browser, `shot-${tag}-${lang}`, {
          enabled: true, path: `/#${lang}`,
          shot: async (page) => {
            await page.setViewport({ width: w, height: h });
            await page.evaluate(() => { document.getElementById('privacy').open = true; document.getElementById('privacy').scrollIntoView(); });
            await new Promise((r) => setTimeout(r, 800));
            const el = await page.$('footer');
            await el.screenshot({ path: join(SHOTS, `privacy-${tag}-${lang}.png`) });
          }
        });
      }
    }
  }
} finally {
  await browser.close();
}

// 판정
const en = results.enabled;
const hits = en.hits.flatMap((h) => h.events);
const pv = hits.filter((e) => e.en === 'page_view');
const bad = (s) => s == null || /[?#]/.test(s);
const verdict = {
  '8-3 gtag.js vtp_*:true 0줄': results.gtagFlags.trueFlags.length === 0 ? '✅' : `❌ ${results.gtagFlags.trueFlags.join(',')}`,
  '8-5 스위치 꺼짐 → 분석 요청 0': results.switchOff.gtagLoaded + results.switchOff.hits.length === 0 ? '✅' : '❌',
  '8-6 dl 에 ?·# 없음': pv.every((e) => !bad(e.dl)) ? '✅' : '❌',
  '8-6 dt = 경로(/)': pv.every((e) => e.dt === '/') ? '✅' : `❌ ${pv.map((e) => e.dt).join('|')}`,
  '8-6 dr = 외부는 출처만': pv.every((e) => e.dr === 'https://www.google.com') ? '✅' : `❌ ${pv.map((e) => e.dr).join('|')}`,
  '8-6 npa=1': hits.every((e) => e.npa === '1') ? '✅' : '❌',
  '8-6 em·uid 없음': hits.every((e) => !e.em && !e.uid && e.extra.length === 0) ? '✅' : '❌',
  '8-8 page_view 1건(해시 이동·언어 전환·pushState 포함)': pv.length === 1 ? '✅' : `❌ ${pv.length}건`,
  '8-7 끄기 저장 → 분석 요청 0': results.optOut.gtagLoaded + results.optOut.hits.length === 0 ? '✅' : '❌',
  '8-7 토글 → 저장 + ga-disable': results.toggle.state.optOut === '1' && results.toggle.state.disabled ? '✅' : '❌',
  '8-7 CSP 위반 0': Object.values(results).filter((r) => r.csp).every((r) => r.csp.length === 0) ? '✅' : '❌',
  '호스트 조건: 2차 도메인 요청 0': results.otherHost.gtagLoaded + results.otherHost.hits.length === 0 ? '✅' : '❌',
  '쿠키 host-only(leestory.com, 앞에 점 없음)': en.cookies.length > 0 && en.cookies.every((c) => c.domain === 'leestory.com') ? '✅' : `⬜ ${JSON.stringify(en.cookies)}`
};
const out = { at: new Date().toISOString(), gaId: GA_ID, verdict, results };
const text = JSON.stringify(out, null, 1);
if (OUT) { mkdirSync(OUT, { recursive: true }); writeFileSync(join(OUT, 'ga4-check.json'), text); }
console.log(JSON.stringify({ verdict, pageViews: pv, gtagLoaded: { switchOff: results.switchOff.gtagLoaded, enabled: en.gtagLoaded, optOut: results.optOut.gtagLoaded, otherHost: results.otherHost.gtagLoaded }, cookies: en.cookies, csp: en.csp, errors: en.errors, thirdParty: en.thirdParty, gtagFlags: results.gtagFlags }, null, 1));
