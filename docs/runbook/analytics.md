# 방문 통계(GA4) 런북 — leestory.com

- 기준: base-env `30-표준/35-보안-자가점검.md` A-8(8항목) · `30-개발-베이스라인.md` F-4. 2026-11-07 도입(REQ-026 · ADR-0009).
- 속성: GA4 측정 ID `G-TX4SCQ4QYE`, 스트림 "Leestory.com Web". 태그는 **`index.html` 한 장에만** 있고 2차 도메인(`am` · `omni` · `archlens` · `academyfit`)에는 없다.

## 1. 어떻게 동작하나 (`assets/js/site.js` §0)

| 조건 | 동작 |
|---|---|
| `ANALYTICS.enabled === false` (기본) | gtag.js 를 **요청하지 않는다**. 외부 요청 0. 푸터에는 "모든 방문자에게 꺼져 있습니다" 만 보인다 |
| `location.hostname !== 'leestory.com'` | 요청하지 않는다. 로컬 미리보기(`127.0.0.1`)·2차 도메인은 켜져 있어도 0 (`www.` 는 GitHub Pages 가 301 로 apex 로 보낸다) |
| `localStorage.ga_optout === '1'` (푸터 끄기 버튼) | 요청하지 않고 `window['ga-disable-G-TX4SCQ4QYE'] = true` |
| 셋 다 통과 | `gtag('set')` 으로 정리한 값(경로만 · 제목=경로 · 참조=외부는 출처만 · 광고 신호 false · 쿠키 host-only 60일) → `gtag('config')` → gtag.js 1회 로드 → `page_view` 1건 |

- 🔴 **쿠키 설정(`cookie_domain` · `cookie_expires` · `cookie_update` · `cookie_flags`)은 `gtag('set', …)` 으로만 먹는다.** `gtag('config', ID, {…})` 에 넣으면 이 Google 태그는 무시한다(2026-11-07 실측: config 는 `.leestory.com` 400일, set 은 `leestory.com` host-only 60일). 옮기지 않는다.
- 처리 고지(행태정보 수집·거부 방법·국외 이전 표)는 푸터 `<details id="privacy">` 안에 EN/KO 로 있다. 루트에 새 파일을 만들지 않는 규칙(ADR-0005) 때문에 별도 `privacy.html` 을 두지 않았다.
- CSP 는 `<meta http-equiv="Content-Security-Policy">` 한 줄(GitHub Pages 는 응답 헤더를 못 바꾼다). 허용 출처는 자체 + Google Fonts + `www.googletagmanager.com` + `*.google-analytics.com` + `*.analytics.google.com` 뿐. 인라인 스크립트는 기존 1개(`classList.add('js')`)를 sha256 해시로 허용했고 **늘리지 않는다** — 그 한 줄을 바꾸면 해시도 다시 계산한다(`printf '%s' "<스크립트 본문>" | openssl dgst -sha256 -binary | openssl base64`).

## 2. 켜기 (운영 변경 — `[승인 대기]` 뒤 push)

1. 관리 화면 조건(§4)이 모두 끔인지 **실 원문으로** 확인: `node tools/ga4-check.mjs <puppeteer-core 디렉터리>` 의 `8-3` 이 ✅ (관리 화면을 바꿨으면 **15분** 뒤 — `Cache-Control: max-age=900`).
2. `assets/js/site.js` 의 `enabled: false` → `enabled: true` 한 줄.
3. 같은 도구를 다시 돌려 13항목 전부 ✅ 인 결과를 `docs/qa/runs/<YYYYMMDD>-ga4/ga4-check.json` 으로 남긴다.
4. 커밋 `feat(site): 방문 통계 켬 — A-8 13항목 실측 ✅` → `[승인 대기]` → push → 10분 뒤 운영에서 `curl -s https://leestory.com/assets/js/site.js | grep -c "enabled: true"` 가 1.
5. 운영 반영 뒤 GA4 실시간 보고서에 1건 보이는지 주인님이 확인.

끄기는 2번을 거꾸로. 급하면 GA 관리 화면에서 스트림을 지우는 게 아니라 **코드 스위치를 끄고 push** 한다(스트림 삭제는 보고서 이력을 잃는다).

## 3. 실측 도구 `tools/ga4-check.mjs`

- 실제 gtag.js 를 붙이고 수집 요청을 가로채 **204 로 막아** 기록한다(Google 에 데이터가 가지 않는다). `https://leestory.com/` 요청은 저장소 파일로 대신 응답하므로 호스트 조건이 운영과 같다.
- 준비(1회): 저장소 밖 빈 디렉터리에서 `npm i puppeteer-core` (이 PC 의 Chrome 을 쓴다. 저장소에는 설치하지 않는다).
- 실행: `node tools/ga4-check.mjs <그 디렉터리> --out docs/qa/runs/<YYYYMMDD>-ga4 [--shots mockups/decided/privacy]`
- 시나리오: 스위치 꺼짐 · 켜짐(검색 참조 + `?utm&q` + `#ko` 로 진입 → 해시 이동 · 언어 전환 · pushState) · 끄기 저장됨 · 토글 클릭 · 2차 도메인 호스트 · 실 원문 `vtp_*:true` grep.
- 판정 13항목: 표준 8-3 · 8-5 · 8-6(5) · 8-7(3) · 8-8 + 호스트 조건 + 쿠키 host-only. 하나라도 ❌ 면 켜지 않는다.

## 4. 관리 화면 (주인님만 — 🌐 analytics.google.com)

| # | 위치 | 값 | 왜 |
|---|---|---|---|
| 8-2 | 관리 → 데이터 수집 및 수정 → 데이터 수집 | Google 신호 **끔** · 광고 개인화(모든 지역) **끔** · 사용자 제공 데이터 수집 **끔** | 켜져 있으면 코드와 무관하게 수집 |
| 8-3 | 관리 → 데이터 스트림 → 스트림 → **Google 태그 → 태그 설정 구성** | 사용자 제공 데이터 기능 허용 **끔**(이메일·전화·이름·주소 자동 감지 전부 해제) · **자동 이벤트 감지 관리** 6개 전부 **끔** | 코드와 별개 스위치. 태그가 화면의 값을 스스로 찾아 보낸다 |
| 8-3 | 같은 스트림 → **향상된 측정** | 톱니 → 스크롤 · 이탈 클릭 · 사이트 검색 · 양식 상호작용 · 동영상 · 파일 다운로드 **끔**, 페이지 조회수 → 고급 → "브라우저 기록 이벤트 기반 페이지 변경" **해제** | 실 원문에 `vtp_enableScroll`·`vtp_enableOutboundClick` 로 남는다(2026-11-07 ❌ 였던 2개) |
| 8-4 | 관리 → 데이터 설정 → 데이터 보관 | 이벤트 데이터 **2개월**, "새 활동 시 재설정" **끔** | 푸터에 적은 보유 기간과 같게 |
| 8-4 | 관리 → 계정 → 계정 세부정보 → 데이터 공유 설정 | **모두 끔** | 최소 |
| 8-4 | 관리 → 계정 → 데이터 처리 약관 | **수락** | 위탁 전제 |
| 8-4 | 관리 → 제품 링크 | Ads · AdSense · Ad Manager 등 **0** | 광고와 묶지 않는다 |
| 8-4 | 스트림 → 도메인 구성(교차 도메인) | 비워 둔다. "제안 수락" **안 함** | 2차 도메인과 방문자가 합쳐진다 |
| 8-4 | 데이터 필터 | §5 | |
| 정보 | 스트림 URL | `https://leestory.com` 으로 고친다(지금 `https://www.leestory.com`) | canonical 과 같게. 수집에는 영향 없음 |

## 5. 데이터 필터는 어디까지 필요한가

GA4 데이터 필터는 **두 종류뿐**이다 — `내부 트래픽`(IP 규칙으로 `traffic_type=internal` 을 붙인 것 제외)과 `개발자 트래픽`(`debug_mode` 가 붙은 것 제외). **호스트 이름으로 거르는 필터는 없다.** 2차 도메인 제외는 필터가 아니라 ① 태그를 그 페이지에 안 넣는 것 ② 코드의 호스트 조건 ③ host-only 쿠키, 이 셋으로 이미 끝난다(§1, 실측 `otherHost` 0).

- `Internal Traffic`(기본 생성, 상태 "테스트"): 주인님 자신의 방문을 빼고 싶을 때만 의미가 있다. 스트림 → Google 태그 → 태그 설정 구성 → **내부 트래픽 정의** 에 집·사무실 IP 를 넣고 필터를 **활성**으로 바꾼다. IP 가 자주 바뀌면 대신 **푸터 끄기 버튼**을 자기 브라우저마다 한 번 누르는 쪽이 확실하다(저장되고, 그 브라우저는 요청 자체가 안 나간다).
- `개발자 트래픽` 필터: 이 사이트는 `debug_mode` 를 보내지 않고 로컬 미리보기는 호스트 조건으로 0 이라 **만들 필요 없다**.
- 필터는 "활성" 으로 바꾼 뒤의 데이터에만 적용되고 과거는 못 거른다. "테스트" 상태는 보고서에서 `테스트 데이터 필터 이름` 측정기준으로만 구분된다.

## 6. 분기 점검

- 매 분기 + 관리 화면을 만질 때마다: §3 도구 → `8-3` ✅ 유지 확인. 결과는 `docs/qa/runs/` 에 쌓고 오래된 것은 지운다(최근 2개만).
- 처리 고지 문구(푸터)와 실제 보내는 값이 어긋나면 **문구가 아니라 코드를 고친다**. 보유 기간을 바꾸면 GA 보관 설정·`cookieSeconds`·푸터 `pv_r6v` 세 곳을 같이 바꾼다.
- 광고 스크립트(AdSense 등)를 붙이게 되면 **별도 개정**이다 — 이 문서와 푸터 고지를 광고 항목으로 다시 쓰고 A-8 을 처음부터 다시 돈다. `ads.txt` 는 소유 확인 파일일 뿐 스크립트가 아니다.
