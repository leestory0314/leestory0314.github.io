# 검색 등록 런북 — Google Search Console · Naver Search Advisor

사이트 변경 없이 콘솔 두 곳에 `https://leestory.com/` 을 등록하고, 소유 확인 메타 태그 두 줄을 `index.html` 에 넣는다.
`robots.txt` · `sitemap.xml` 은 루트에 있다(ADR-0008). 검증은 **메타 태그 방식**으로 통일한다 — 파일 방식은 루트에 파일을 더 만들고, DNS 방식은 등록 기관 설정이 필요하다.

## 준비 상태(저장소)
| 파일 | 역할 |
|---|---|
| `robots.txt` | 전체 허용, `docs/`·`mockups/`·`tools/` 수집 제외, 사이트맵 위치 |
| `sitemap.xml` | `/` 한 줄. 사이트를 바꾼 커밋 날짜로 `lastmod` 손 갱신 |
| `index.html` `<link rel="canonical">` | 정규 URL `https://leestory.com/` |
| `index.html` `<meta name="google-site-verification">` | 없음 — 2026-11-04 주인님 "완료"(기존 방식으로 소유 확인됨, 태그 불요). 콘솔이 태그를 요구하면 그때 추가 |
| `index.html` `<meta name="naver-site-verification">` | 반영(2026-11-04) |

## 1. 소유 확인 값 받기 (🌐 브라우저, 주인님)
1. Google: `https://search.google.com/search-console` → 속성 추가 → **URL 접두어** `https://leestory.com/` → 확인 방법 **HTML 태그** → `content="..."` 안의 값을 복사. (도메인 속성은 DNS TXT 가 필요하고 `am`·`omni`·`archlens` 까지 한 속성에 묶이므로 쓰지 않는다.)
2. Naver: `https://searchadvisor.naver.com` → 웹마스터 도구 → 사이트 등록 `https://leestory.com` → 소유 확인 **HTML 태그** → `content="..."` 값을 복사.
3. 두 값을 세션에 전달한다. 값 자체는 비밀이 아니다(공개 페이지에 들어가는 토큰) — 커밋해도 된다.

## 2. 태그 반영 → 승인 → push (🖥️ PC)
1. `index.html` `<link rel="canonical">` 바로 아래에 두 줄 추가:
   ```html
   <meta name="google-site-verification" content="<구글 값>" />
   <meta name="naver-site-verification" content="<네이버 값>" />
   ```
2. `node tools/serve.js` 로 띄워 페이지가 그대로인지 1280/390 확인. `node --check assets/js/site.js`.
3. 커밋 `feat(site): 검색 콘솔 소유 확인 메타 추가` → `[승인 대기]` → 승인 후 `git push origin main`.
4. 반영 확인(보통 1분, CDN 캐시 최대 10분):
   ```
   curl -s https://leestory.com/ | grep -c site-verification     # 1 (네이버만. 구글 태그를 넣었다면 2)
   curl -sI https://leestory.com/robots.txt | head -1              # 200
   curl -sI https://leestory.com/sitemap.xml | head -1             # 200
   ```

## 3. 콘솔에서 확인·사이트맵 제출 (🌐 브라우저, 주인님)
1. Google: 속성에서 **확인** 클릭 → 통과 뒤 **Sitemaps** 메뉴에 `sitemap.xml` 입력 → 제출. **URL 검사**에 `https://leestory.com/` 넣고 **색인 생성 요청**.
2. Naver: **소유 확인** 클릭 → 통과 뒤 **요청 → 사이트맵 제출** `https://leestory.com/sitemap.xml` · **요청 → 웹 페이지 수집** `https://leestory.com/` · **검증 → robots.txt** 에서 수집 허용 확인.
3. 완료 판정: Google "소유권 확인됨" + 사이트맵 상태 "성공", Naver "사이트 소유 확인 완료" + 사이트맵 "정상". 색인 반영은 며칠 걸린다 — 콘솔 "색인 생성 적용 범위"·"사이트 현황" 에서 확인.

**2026-11-04 완료**: 네이버 소유 확인·사이트맵 제출, 구글 사이트맵 제출(주인님). 이후는 "유지" 절만 해당.

## 유지
- 페이지를 바꿔 push 할 때 `sitemap.xml` `lastmod` 를 같은 커밋에서 갱신한다.
- 프로젝트 서브도메인(`am`·`omni`·`archlens`)은 각자 자기 콘솔 속성이다. 이 사이트맵에 넣지 않는다.
- 검증 메타 태그·`robots.txt`·`sitemap.xml` 을 지우면 소유 확인·수집이 끊긴다. `CNAME`·`ads.txt` 와 같은 급으로 다룬다.

## 하지 않을 것
- 파일 방식 소유 확인(`googleXXXX.html`·`naverXXXX.html`) — 루트 파일 추가.
- 구글 **도메인 속성**(DNS TXT) — 서브도메인까지 한 속성에 섞인다.
- `docs/`·`mockups/` 가 색인되게 두는 것 — `robots.txt` 로 제외했다.

## 2026-11-07 URL 진단 보완 (REQ-027)
- 네이버 URL 실시간 조회가 사이트 제목(40자)·사이트 설명(80자)·Open Graph 제목(40자) 초과를 지적했다. 정적 HTML 의 네 값을 국문으로 바꿨다: 제목·OG 제목 35자, 설명 74자, OG 설명 25자.
- 검색 로봇은 JS 를 돌리지 않으므로 **정적 HTML 값이 색인**된다. 화면의 탭 제목은 `site.js` 가 언어별로 바꾼다(EN 화면은 영문 49자 — 네이버 기준과 무관).
- 재진단: 서치어드바이저 → 검증 → URL 실시간 조회 → `https://leestory.com/` (www 는 301 이므로 apex 로). 반영은 push 후 10분 뒤.

## 2026-11-07 공유 미리보기·구조화 데이터 (REQ-029)
- `og:image`(`/assets/img/og.png` 1200×630) · `og:type` · `og:site_name` · `og:locale`(ko_KR, alternate en_US) · `twitter:card` 추가. JSON-LD `WebSite`+`Person` 추가(페이지에 있는 값만, 실명·메일 없음).
- `sitemap.xml` `lastmod` 를 사이트 변경 커밋 날짜로 갱신했다(10-31 → 11-07). 유지 절대로 **페이지를 바꾸는 커밋마다** 같이 올린다.
- 확인(🌐): 카카오톡 공유 미리보기는 `https://developers.kakao.com/tool/debugger/sharing` 에서 캐시 초기화 뒤 조회. 구글 구조화 데이터는 `https://search.google.com/test/rich-results` 에 URL 입력. 네이버는 URL 실시간 조회의 Open Graph 항목.
## 2026-11-08 PageSpeed Insights (REQ-030)
- 전(2026-11-07 22:57, 주인님 캡처): 모바일 성능 **82**(FCP 1.8 s · LCP 4.2 s · TBT 20 ms · CLS 0 · SI 4.3 s), 데스크톱 **94**(FCP 0.5 · LCP 0.5 · TBT 200 ms). 접근성·권장사항·SEO 모두 100. 지적: Google Fonts CSS 69.7 KiB 렌더링 차단 1,230 ms · 사용하지 않는 CSS 69 KiB(같은 파일) · gtag.js 157 KiB 중 68 KiB 미사용 · 캐시 10분.
- 조치: ① Noto Sans KR 을 KO 전환 때만 로드(`docs/design.md` 2026-11-08 절) ② gtag.js 를 `load` 이벤트 뒤에 로드. 로컬 재현(느린 4G·CPU 4배, 3회 중앙값) FCP 1,316→928 ms · LCP 1,784→1,428 ms.
- 수용(고치지 않음): 캐시 10분은 GitHub Pages 고정(ADR-0010 과 같은 호스팅 제약) · gtag.js 크기는 Google 파일 · `site.js` 축소 2 KiB 는 빌드 도구 없음 · 리빌 애니메이션은 실측 효과 0.
- 후(2026-11-08 01:09, 주인님 캡처, `f8e2fd2` 반영 뒤): 모바일 성능 **82**(FCP 1.5 s · LCP 4.3 s · TBT 140 ms · CLS 0 · SI 4.0 s). FCP 1.8→1.5, SI 4.3→4.0 은 줄었지만 **LCP 4.2→4.3 그대로**라 점수 변동 없음. LCP 요소 `<h2 data-i18n="f_h2">`, 요소 렌더링 지연 3,160 ms. 렌더링 차단: 글꼴 CSS 750 ms · `site.js` 560 ms · `site.css` 190 ms. TBT 20→140 ms 는 녹색 범위 안의 흔들림.
- 원인(2026-11-08 로컬 Lighthouse 12.8, 모바일 기본 설정으로 운영 URL 측정): LCP 요소는 실행마다 다르지만(`p.lead` · `h1 span` · `h2`) 지연 구조는 같다. 히어로 `.reveal` 의 `rise` 키프레임이 **`opacity: 0` 에서 시작**한다. Chrome 은 투명한 글자를 LCP 후보로 세지 않다가 보이기 시작한 순간(지연 0~0.24 s 뒤)에 후보로 잡고, Lighthouse 는 **그 순간 이전에 끝난 모든 요청·스크립트(`site.js` 로드·실행, 글꼴 파일)를 LCP 의 선행 조건으로 보고 느린 4G 로 다시 계산**한다. 그래서 FCP 는 1.5 s 인데 LCP 만 4.3 s 다. 11-08 조치 때 "리빌 애니메이션은 실측 효과 0" 이라 적은 것은 PerformanceObserver 로 잰 값이라 Lighthouse 의 이 계산 방식을 재현하지 못한 **오판**이었다 — 정정한다.
- 로컬 Lighthouse 비교(같은 설정, 로컬 서버, 5회 중앙값, ms): 현재 FCP 1,517 / LCP 2,741 → ① `rise` 에서 페이드 제거(위로 올라오는 이동만 유지) **1,526 / 1,526**(LCP = FCP) → ②+`site.js` `defer` 1,548 / 1,548(차이 없음, 렌더링 차단 지적만 사라짐) → ③+라틴 글꼴 CSS 도 `site.js` 에서 로드 **1,053 / 1,053**(첫 방문마다 대체 글꼴이 먼저 보이고 Manrope 로 바뀜 — 디자인 비용). 결정은 아래 줄에 적는다.
- 결정(2026-11-08 "추천안 승인"): ①+② 적용 — `rise` 키프레임 페이드 제거(`docs/design.md` 2026-11-08 히어로 절) + `site.js` `defer`. ③ 은 보류(첫 화면 글꼴 깜빡임 비용). 적용 후 로컬 Lighthouse(저장소 그대로 로컬 서버, 5회 중앙값): FCP 1,503 / **LCP 1,503 ms**(LCP 요소 `p.lead`, 전 2,741), 렌더링 차단은 글꼴 CSS·`site.css` 만 남음. KO 전환(해시 진입·해시 이동·버튼)은 전과 동일하게 동작 확인. 운영 PSI 는 push 10분 뒤 주인님이 1회.
- **결과(2026-11-08 10:57, 주인님 캡처, `ad50b70` 반영 뒤)**: 모바일 성능 **97**(FCP 1.5 s · **LCP 1.5 s** · TBT 20 ms · CLS 0 · SI 4.2 s). 접근성·권장사항·SEO 100. LCP 4.3→1.5 s 로 FCP 와 같아졌다. SI 만 주황(4.2 s) — 히어로 이동 0.9 s + 지연과 글꼴 교체로 첫 화면이 1초 남짓 계속 바뀌는 것이 원인으로 보이며 점수 비중 10%, 97 에서 더 쫓지 않는다. REQ-030 종료. 다음 측정은 사이트를 바꾼 뒤에만.
- **2026-11-07 22:45 결과(`96cbf37` 반영 뒤)**: ① 네이버 URL 실시간 조회 — 제목·설명·OG 제목 길이 지적 **해결**. ② 카카오 공유 디버거 — 미리보기 이미지 나옴. ③ 구글 리치 결과 테스트 — 크롤링 완료·색인 허용 "예", **"감지된 항목 없음"**. 이것은 정상이다: 리치 결과는 FAQ·리뷰·상품·빵부스러기처럼 검색 결과에 특수 표시가 붙는 유형만 세고, `WebSite`·`Person` 은 그 유형이 아니다(구글이 사이트 이름·인물 정보로 읽을 뿐 리치 표시가 없다). 마크업 문법은 `https://validator.schema.org` 로 확인 — 2026-11-07 결과 **오류 0 · 경고 0**(WebSite 1건, publisher 로 Person 중첩 인식). 이 페이지에 붙일 만한 리치 결과 유형은 없다 — 억지로 넣지 않는다.
