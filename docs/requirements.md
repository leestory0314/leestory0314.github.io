# requirements — leestory.com

- 서식 원본: `!base-environment/60-공통자산/templates/requirements.md`. 식별자 규약(31 §6): 요건 `REQ-NNN` · 결정 `ADR-NNNN` · 결함 `BUG-NNN`.
- 소급: 2022-02-05 최초 페이지와 2026-09-15 브랜딩 페이지의 요건 원문은 없다 — "원문 없음, 재구성"으로 적었다.

## 요건

| ID | 날짜 | 요건 (주인님 말 그대로) | 출처 | 상태 |
|---|---|---|---|---|
| REQ-001 | 2022-02-05 | 원문 없음, 재구성: `leestory.com` 도메인에 소개 페이지를 둔다 (CNAME · ads.txt) | git 이력 | 완료 |
| REQ-002 | 2026-09-15 | 원문 없음, 재구성: 영문 개인 브랜딩 페이지로 교체 (Cloud Architect · AI Technologist · Builder) | git 이력 | 완료, REQ-003 으로 대체 |
| REQ-003 | 2026-10-10 | "내 개인 프로필 페이지와, 내가 서브도메인으로 지정하는 프로젝트를 소개하는 페이지로 만들고 싶어" | 세션 지시 | 완료 (f633665) |
| REQ-004 | 2026-10-10 | "am, omni, runon.life만 등록, 나머지는 내가 추후 지시" | 세션 답변 | 완료 (f633665) |
| REQ-005 | 2026-10-10 | 디자인은 새로 설계, 프로필 문구는 현재 영문 문구를 바탕으로 초안 | 세션 답변 | 폐기 — REQ-008 로 대체 (목업 확인 후 반려) |
| REQ-006 | 2026-10-10 | "상위 base-environment 폴더 확인해서 규칙 준수" | 세션 지시 | 완료 (docs/) |
| REQ-007 | 2026-10-10 | "스크린샷은 지금 프로젝트 폴더 아래로 폴더 만들어서 옮겨" · "소스와 문서 목업등은 다 디렉토리로 나누어서 저장해" | 세션 지시 | 완료 |
| REQ-008 | 2026-10-10 | "기본 랜딩은 그냥 기존처럼 내 프로필만 표시하고, 진행중인 프로젝트는 별도로 작은 영역에 표기만 해야해" | 세션 지시 | 완료 |
| REQ-009 | 2026-10-10 | "기존 랜딩페이지를 좀더 고급스럽게 고도화해서 시안 3가지 보고해. 그리고 LS라고 적힌 부분은 빼" | 세션 지시 | LS 제거 완료(e33bcff). 1차 시안 3종은 "기존 틀의 변형"으로 반려 → REQ-011 |
| REQ-010 | 2026-10-10 | "빌드중인 프로젝트는 4가지로, auto-minutes, omnisecure, archlens, runon 한다" · "프로젝트 거는 링크는 blank로 해 새창또는 새탭으로 뜨게" | 세션 지시 | 완료 (index.html 반영, 시안에도 적용) |
| REQ-011 | 2026-10-10 | "각각 다른 목표와 관점으로 3가지를 만들어서 보고" · "leestory 라는 키워드 자체를 강조할 필요 없다" · "유명한 개인홈페이지 레퍼런스들을 우선 조사" | 세션 지시 | 완료 — `docs/references.md`, `mockups/old/concept-{dossier,essay,index}.html`(삭제됨), 비평 반영. 채택 대기 |
| REQ-012 | 2026-10-10 | "프로젝트 4개중 runon은 빼자" · "at home 이라는건 중요하지 않아. 기술적인 것들을 계속 연구하고 개발해 나간다는게 중요" · 톤별 시안 3가지, 첫 화면은 추상 그래픽 · "프로젝트는 계속 추가될 수 있으니 그점도 고려해" | 세션 지시 | 시안 3종(`mockups/old/concept-{signal,clear,journal}.html`) 보고, 채택 대기 |
| REQ-013 | 2026-10-10 | "B 레이아웃으로 C스타일로 하고 인터랙티브한 요소를 좀더 강조" · "원으로 표현한 이 부분을 IT engineer를 연상되는 추상적인요소로" · "in development는 A 레이아웃으로" · "hero영역의 문구 … 후보 3가지" | 세션 지시 | `mockups/old/concept-blueprint.html` 보고, 카피 후보 3안 제시. 채택 대기 |
| REQ-014 | 2026-10-10 | "카피는 3번으로 하고... 인터랙티브한 요소는 다른걸로 시안을 5개 정도 만들어서 보고해" | 세션 지시 | 카피 3안 반영. `mockups/interact-{1..5}-*.html` 보고, 채택 대기 |
| REQ-015 | 2026-10-10 | "in development만 리스트형" · "인터랙티브 1번과 5번에 내 강점에 대한 텍스트를 넣어서" · "5번은 좀더 원구형체처럼" · "둘다 배경도 어울리게" | 세션 지시 | 완료 — 기준 시안·변형 재생성, 채택 대기 |
| REQ-016 | 2026-10-10 | "레이아웃은 concept-signal.html 스타일은 concept-clear.html 였다" | 세션 지시 | `mockups/decided/final-mesh.html` · `final-globe.html` 보고, 채택 대기 |
| REQ-017 | 2026-10-10 | "In development는 목록화 되어 있던 시안 journal 처럼 해봐 그리고 mesh에만 적용해" · "한글버전과 영문 버전을 두고 기본을 영문으로" · "전체 사이트를 영문과 국문으로" | 세션 지시 | 완료 — `final-mesh.html` 행 목록, 두 시안 모두 EN 기본 + KO 전환. 채택 대기 |
| REQ-018 | 2026-10-10 | "한글 표기 … asis tobe 변경 사항을 보고후 변경" · "hero 영역의 mesh영역은 영문 그대로" · (확정 표 전달) "수정사항 반영해" | 세션 지시 | 완료 — `docs/copy-ko.md`, `tools/gen-final.js` T.ko 확정본, 그래픽 라벨 영문 유지 |
| REQ-019 | 2026-10-10 | "1. 히어로그래픽은 Mesh로 / 2. 실명은 안 넣는다. leestory.com … 디자인 한번 해봐" · "A로 결정 / 푸시 승인" · "목업 폴더도 결정된것은 … old로" | 세션 지시 | 완료 — index.html 반영, push 승인 획득 |
| REQ-020 | 2026-10-10 | "Technology is a tool. <줄바꿈> A better…" · "Archlens 설명에 Monolith-to-Microservices … 로 변경" · "Cloud Architect -> Cloud Native Architect 로 변경" | 세션 지시 | 완료 — `a442516` · `0748318` · `34a46a6`, push 승인 획득 |
| REQ-021 | 2026-10-10 | "Hero title … 강조점이 뭐가 있을까 … The goal doesn’t. 가 더 상징적" → "C 시안으로 하고 The tool keeps changing.의 사이즈를 약간 작게(B보다는 크지만 줄바꿈은 안되게)" | 세션 지시 | 완료 — `d1cdeed`, 첫 줄 .72em·회색, 둘째 줄 파랑. `mockups/decided/hero-emphasis*` |
| REQ-022 | 2026-10-10 | "L자를 모티브로 … favicon … 시안 5개(3개는 L, 2개는 자유)" → "파비콘은 1로 하자" | 세션 지시 | 완료 — `d1cdeed`, `assets/img/favicon.svg`·`favicon-32.png`·`apple-touch-icon.png`. 비교 시트 `mockups/decided/favicon/sheet.png` |
| REQ-023 | 2026-11-04 | "구글 서치와 네이버서치를 셋팅할거야. 준비해" | 세션 지시 | 완료 — `robots.txt` · `sitemap.xml` · canonical · 네이버 검증 메타(`2b45a29`). 2026-11-04 네이버 소유 확인·사이트맵 제출, 구글 사이트맵 제출 완료(주인님) |
| REQ-024 | 2026-11-04 | "아래 레퍼런스에 academyfit.leestory.com 도 넣어야 하는데, 어떻게 넣을건지 정리해서 보고해" | 세션 지시 | 완료 — `#development` 행 추가(`p4`), 표기 `AcademyFit`, 카피는 주인님 지시 문장("우리 아이 학원 고민될 때, 1분 진단으로…")과 같은 맥락의 영문 |
| REQ-027 | 2026-11-07 | 네이버 서치어드바이저 URL 진단 캡처(사이트 제목·설명·OG 제목 ! — 40자·80자·40자 초과) "이런 지적에 대해서도 보완하자. 일단 제목과 설명을 한글로 적어야 할듯하다" | 세션 지시 | 완료(커밋 대기) — 정적 `<title>`·`og:title` = "leestory \| 클라우드 네이티브 아키텍트 · AI 엔지니어"(35자), `description` = 기존 국문 설명(74자), `og:description` = "도구는 계속 바뀌어도 목표는 변하지 않습니다."(25자). 화면 언어별 탭 제목은 JS 가 계속 바꾼다(EN 화면 = 영문 제목) |
| REQ-026 | 2026-11-07 | "GA4 점검하고 설정해" + "내 2차 도메인들의 트래픽은 제외하고 오로지 www.leestory.com, leestory.com 으로만 들어오는 트래픽을 재려면" + "데이터 필터 … 이쪽 설정은 필요 없나?" | 세션 지시(화면 캡처: Google 태그 `GTM-TPNTDVR2`, 측정 ID `G-TX4SCQ4QYE`, 스트림 `Leestory.com Web`) | 완료 — 1차 `62aa205`(스위치 꺼짐) push, 주인님 관리 화면 조치 뒤 2차 실측 13항목 ✅(`docs/qa/runs/20261107-ga4-2`) → `enabled: true` 2차 커밋. 2차 도메인 제외는 태그 미설치 + 호스트 조건 + host-only 쿠키로, 데이터 필터는 내부 IP 용으로만(`docs/runbook/analytics.md` §5) |
| REQ-025 | 2026-11-04 | "개발중인 부분에 대해서 정렬은 서비스명칭으로 오름차순으로 정리해" | 세션 지시 | 완료 — AcademyFit · ArchLens · Auto-Minutes · OmniSecure 순. 규칙은 `docs/design.md` 항목 추가 절 |

## 결정

| ID | 날짜 | 결정 | 근거 |
|---|---|---|---|
| ADR-0001 | 2026-10-10 | 빌드 도구 없음. (개정 2026-10-10) CSS 는 `assets/css/site.css` 로 분리, HTML 은 `index.html` 하나 | GitHub Pages 에 그대로 올라가고, 의존성 고정 문제가 없다. 분리는 REQ-007 디렉토리 배치 때문이며 여전히 빌드 없음 |
| ADR-0002 | 2026-10-10 | 홈랩 인프라 호스트 이름은 페이지에도 이 저장소 문서에도 싣지 않는다 | base-env 35 보안 자가점검 — 공개 저장소에서 인증 뒤 서비스 존재를 광고하지 않는다. (개정 2026-10-10: 문서에 적혀 있던 이름도 제거) |
| ADR-0003 | 2026-10-10 | 프로젝트 데이터를 JSON 으로 분리하지 않고 HTML 에 직접 둔다 | 항목이 3개이고 추가는 주인님 지시로만 일어난다. JS 없이도 보이는 쪽이 낫다 |
| ADR-0004 | 2026-10-10 | ~~사용하지 않게 된 `assets/hero.jpg` 는 삭제~~ → ADR-0006 으로 취소, 복원 | 새 디자인이 반려됐다 |
| ADR-0005 | 2026-10-10 | 디렉토리 배치: 루트 = Pages 필수 파일만(`index.html` · `CNAME` · `ads.txt`), `assets/` 스타일·이미지, `docs/` 문서, `mockups/` 스크린샷·목업, `tools/` 로컬 도구 | REQ-007. GitHub Pages 는 소스를 루트 또는 `/docs` 로만 잡을 수 있어 `index.html` 은 루트를 떠날 수 없다(Pages 설정 변경은 주인님 권한이고 `docs/` 는 문서용으로 쓴다) |
| ADR-0006 | 2026-10-10 | 2026-09-15 브랜딩 페이지를 그대로 되살리고(`assets/hero.jpg` 복원), 프로젝트는 철학 영역과 푸터 사이 `#projects` 띠에 칩 3개로만 표기. 다크 모드·새 글꼴은 도입하지 않는다 | REQ-008. 주인님이 목업을 보고 "기존처럼 프로필만, 프로젝트는 작은 영역에 표기만" 으로 정했다 |
| ADR-0007 | 2026-10-10 | 최종 디자인 채택: Signal 레이아웃 + Clear 스타일 + Mesh 히어로 + 카피 3안 + 행 목록 + EN 기본/KO 전환 + 노드 글리프 헤더. 소스는 `index.html` · `assets/css/site.css` · `assets/js/site.js`. 외부 글꼴은 Google Fonts(Manrope · Inter · Noto Sans KR), 스크립트는 자체 파일만 | REQ-012~019. ADR-0001(빌드 없음)·ADR-0005(디렉토리) 유지. 2026-09-15 페이지 복원 경로는 `git checkout 83e6f39 -- index.html` + `image/hero.jpg` 복원 |
| ADR-0009 | 2026-11-07 | GA4 도입 방식: ① 런타임 스위치 `ANALYTICS.enabled` 기본 **꺼짐**, 꺼지면 gtag.js 를 요청하지 않는다 ② `location.hostname === 'leestory.com'` 일 때만 로드(2차 도메인·로컬 0) ③ `gtag('set')` 으로 경로만·제목=경로·참조=출처·광고 신호 false·**쿠키 host-only 60일**(config 에 넣으면 무시됨 — 실측) ④ 처리 고지·국외 이전 표·끄기 토글은 푸터 `<details id="privacy">` 안에 EN/KO(루트 파일 금지 유지) ⑤ CSP 는 `<meta>` 한 줄, 인라인 스크립트 해시 허용 1개 ⑥ 검증은 `tools/ga4-check.mjs` 실측만, 단위 테스트 없음 | REQ-026. base-env 35 A-8 · 30 F-4(2026-11-07 신설). 법적 근거는 "공개된 개인 홈페이지, 입력 칸 없음" 이며 법률 검토는 하지 않았다 — 위험으로 기록(8-1). 광고 스크립트는 없고 `ads.txt` 는 소유 확인 파일이라 광고 개정은 하지 않았다 |
| ADR-0008 | 2026-11-04 | 루트 예외 2개 추가: `robots.txt` · `sitemap.xml`. 검색 엔진은 두 파일을 루트에서만 찾으므로 ADR-0005(루트 = Pages 필수 파일만)의 예외로 둔다. 그 외 루트 추가 금지는 유지. 사이트맵은 `/` 한 줄, `lastmod` 는 사이트 변경 커밋 날짜로 손 갱신 | REQ-023. 검색 소유 확인은 `<meta>` 태그 방식(파일 방식은 루트에 또 파일을 만든다) |

## 추적표 (요건 → 결정 → 산출물)

| 요건 | 결정 | 산출물 |
|---|---|---|
| REQ-003 | ADR-0001 · ADR-0003 | `index.html` · `docs/design.md` |
| REQ-004 | ADR-0002 | `index.html` 프로젝트 영역 · `docs/runbook/incident.md` 점검 목록 |
| REQ-005 | — | 폐기 |
| REQ-006 | — | `docs/**` · `README.md` |
| REQ-007 | ADR-0005 · ADR-0001 개정 | `assets/css/site.css` · `mockups/` · `tools/serve.js` · `README.md` 디렉토리 표 |
| REQ-008 | ADR-0006 | `index.html` `#projects` · `assets/css/site.css` 마지막 절 · `docs/design.md` |
| REQ-009 | — | 반려(파일 삭제) |
| REQ-011 | — (채택 후 ADR) | `docs/references.md` · `mockups/old/concept-*.html` + 1280/390 스크린샷 · `docs/design.md` 콘셉트 표 |
| REQ-012 | — (채택 후 ADR) | `mockups/old/concept-signal.html` · `concept-clear.html` · `concept-journal.html` + 1280/390 스크린샷 · `docs/design.md` 3차 표 |
| REQ-013 | — (채택 후 ADR) | `mockups/old/concept-blueprint.html` + 1280/390/copy1~3 스크린샷 · `docs/design.md` 4차 절 |
| REQ-014 | — (채택 후 ADR) | `mockups/old/interact-*.html` + 스크린샷 · `tools/old/gen-interact.js` · `docs/design.md` 인터랙션 표 |
| REQ-020 | — | `index.html` 신조 `span` 2개 · `assets/js/site.js` `creed_a`/`creed_b`·`p3`·`title`/`eyebrow` |
| REQ-021 | ADR-0007 보완 | `assets/css/site.css` `h1 span` 규칙 · `mockups/decided/DECISIONS.md` · `docs/design.md` 2026-10-11 절 |
| REQ-022 | ADR-0005 유지(루트에 두지 않음) | `assets/img/` 3파일 · `index.html` `<link rel="icon">` 3줄 |
| REQ-023 | ADR-0008 | `robots.txt` · `sitemap.xml` · `index.html` canonical/검증 메타 · `docs/runbook/search-console.md` |
| REQ-027 | — | `index.html` `<title>`·`description`·`og:*` · `assets/js/site.js` `COPY.ko.title`·`initLanguage` · `docs/runbook/search-console.md` |
| REQ-026 | ADR-0009 | `index.html` CSP meta·푸터 `#privacy` · `assets/js/site.js` §0·`pv_*` 키 · `assets/css/site.css` `.privacy` · `tools/ga4-check.mjs` · `docs/runbook/analytics.md` · `docs/qa/runs/20261107-ga4/` · `mockups/decided/privacy/` |
| REQ-024 · REQ-025 | — | `index.html` `#development` · `assets/js/site.js` `p4` · `docs/runbook/incident.md` 점검 목록 · `docs/copy-ko.md` 9-4 · `docs/design.md` 항목 추가 절 |
