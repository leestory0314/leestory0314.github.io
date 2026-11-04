# 검색 등록 런북 — Google Search Console · Naver Search Advisor

사이트 변경 없이 콘솔 두 곳에 `https://leestory.com/` 을 등록하고, 소유 확인 메타 태그 두 줄을 `index.html` 에 넣는다.
`robots.txt` · `sitemap.xml` 은 루트에 있다(ADR-0008). 검증은 **메타 태그 방식**으로 통일한다 — 파일 방식은 루트에 파일을 더 만들고, DNS 방식은 등록 기관 설정이 필요하다.

## 준비 상태(저장소)
| 파일 | 역할 |
|---|---|
| `robots.txt` | 전체 허용, `docs/`·`mockups/`·`tools/` 수집 제외, 사이트맵 위치 |
| `sitemap.xml` | `/` 한 줄. 사이트를 바꾼 커밋 날짜로 `lastmod` 손 갱신 |
| `index.html` `<link rel="canonical">` | 정규 URL `https://leestory.com/` |
| `index.html` `<meta name="google-site-verification">` | **아직 없음** — 콘솔이 주는 값을 받아 넣는다 |
| `index.html` `<meta name="naver-site-verification">` | **아직 없음** — 위와 같음 |

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
   curl -s https://leestory.com/ | grep -c site-verification     # 2
   curl -sI https://leestory.com/robots.txt | head -1              # 200
   curl -sI https://leestory.com/sitemap.xml | head -1             # 200
   ```

## 3. 콘솔에서 확인·사이트맵 제출 (🌐 브라우저, 주인님)
1. Google: 속성에서 **확인** 클릭 → 통과 뒤 **Sitemaps** 메뉴에 `sitemap.xml` 입력 → 제출. **URL 검사**에 `https://leestory.com/` 넣고 **색인 생성 요청**.
2. Naver: **소유 확인** 클릭 → 통과 뒤 **요청 → 사이트맵 제출** `https://leestory.com/sitemap.xml` · **요청 → 웹 페이지 수집** `https://leestory.com/` · **검증 → robots.txt** 에서 수집 허용 확인.
3. 완료 판정: Google "소유권 확인됨" + 사이트맵 상태 "성공", Naver "사이트 소유 확인 완료" + 사이트맵 "정상". 색인 반영은 며칠 걸린다 — 콘솔 "색인 생성 적용 범위"·"사이트 현황" 에서 확인.

## 유지
- 페이지를 바꿔 push 할 때 `sitemap.xml` `lastmod` 를 같은 커밋에서 갱신한다.
- 프로젝트 서브도메인(`am`·`omni`·`archlens`)은 각자 자기 콘솔 속성이다. 이 사이트맵에 넣지 않는다.
- 검증 메타 태그·`robots.txt`·`sitemap.xml` 을 지우면 소유 확인·수집이 끊긴다. `CNAME`·`ads.txt` 와 같은 급으로 다룬다.

## 하지 않을 것
- 파일 방식 소유 확인(`googleXXXX.html`·`naverXXXX.html`) — 루트 파일 추가.
- 구글 **도메인 속성**(DNS TXT) — 서브도메인까지 한 속성에 섞인다.
- `docs/`·`mockups/` 가 색인되게 두는 것 — `robots.txt` 로 제외했다.
