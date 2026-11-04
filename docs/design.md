# design — leestory.com (2026-10-10)

다음에 손댈 때 이 문서를 먼저 읽는다.

## 방침 (주인님 결정, REQ-008)
- **기본 랜딩은 프로필만.** 2026-09-15 브랜딩 페이지(히어로 · "What defines me" 카드 4장 · 철학 박스 · 푸터)를 그대로 유지한다. 구조·문구·색을 주인님 지시 없이 바꾸지 않는다.
- **진행 중 프로젝트는 작은 영역에 표기만.** 철학 박스와 푸터 사이 `#projects` 띠 하나. 칩(주소 + 한 줄 설명)으로만 보여 주고, 설명 문단·스크린샷·사실 표를 두지 않는다.
- 2026-10-10 에 제안했던 전면 재설계(청자빛 종이 · 도메인 트리 · 세리프 두 계열 · 다크 모드)는 목업 확인 후 **반려**됐다. 되살리지 않는다.

## 기존 페이지의 시각 언어 (유지)
| 이름 | 값 | 쓰임 |
|---|---|---|
| ink | `#0c1a3a` | 본문·제목 |
| ink-2 | `#294261` | 보조 글 |
| muted | `#6f86a0` | 설명 |
| blue → cyan | `#0c7cff` → `#42d8ff` | 강조 그라데이션, 밑줄, 규칙선 |
| bg | `#f5faff` + 방사 그라데이션 | 바탕 |

- 글꼴: 제목 Georgia(시스템 세리프), 본문 Inter/Segoe UI/Noto Sans KR 폴백. 외부 글꼴 로드 없음.
- 모서리 `--radius 24px`, 유리 느낌 배경 `rgba(255,255,255,.6~.78)`, 그림자 `--shadow`.
- 다크 모드 없음.

## 프로젝트 띠 (`#projects`)
```
┌ NOW BUILDING ──────────────────────────────────────────────┐
│ (am.leestory.com  Auto-Minutes — …) (omni.leestory.com  OmniSecure — …) │
│ (runon.life  RUNON — …)                                                  │
└───────────────────────────────────────────────────────────┘
```
- 라벨은 페이지의 기존 `.label` 양식. 칩은 네비의 `.pill` 과 같은 둥근 테두리라 새 요소처럼 보이지 않는다.
- 620px 아래에서는 칩이 세로로 쌓이고 주소와 설명이 두 줄이 된다.
- 네비에 `Projects` 링크 하나가 추가됐다(620px 아래에서는 기존 규칙대로 Contact 만 보인다).

## 항목 추가
- `index.html` `#development` 의 `<ul>` 에 `<li>` 하나를 복사해 이름(`.name`)·주소·호스트(`.host`)·설명(`.what`, `data-i18n="pN"`)을 바꾼다. `assets/js/site.js` `COPY.en`/`COPY.ko` 에 같은 `pN` 을 추가한다(영문은 `index.html` 과 `COPY.en` 두 곳).
- **정렬은 서비스 이름 오름차순**(대소문자 무시, 2026-11-04 지시). 새 행은 이 순서에 맞는 자리에 끼운다. `pN` 번호는 추가 순서라 화면 순서와 다르다.
- CSS 는 건드릴 필요 없다. 행 목록이라 행이 늘어도 레이아웃이 같다.
- 확인: `node tools/serve.js` → 1280·390 을 EN·KO 로 찍어 `mockups/decided/` 에 둔다. 호스트는 `curl -I` 로 200.

## 콘셉트 시안 (2026-10-10 3차, 채택 대기)
1차(기존 틀 변형)와 2차(레퍼런스식 미니멀)는 "전문가답지도 고급스럽지도 않다"로 반려됐다. 3차는 주인님이 고른 **세 톤에 하나씩**, 첫 화면은 **코드로 그린 추상 그래픽**, 메시지는 "집에서 운영"이 아니라 **기술을 계속 연구하고 개발해 나간다**로 잡았다.

공통: 프로필 우선, 프로젝트는 아래쪽 작은 영역에 링크만(새 탭, ↗, 스크린리더 문구), 목록은 `auto-fill` 격자나 행 목록이라 **항목이 늘어도 그대로 흐른다**(개수를 문구에 박지 않는다). `leestory` 는 작은 도메인 표기뿐, 사진 없음, `:focus-visible`, 메타 설명·og 태그, `prefers-reduced-motion` 존중.

| 콘셉트 | 파일 | 톤 | 첫 화면 | 글꼴 | 바탕·강조 |
|---|---|---|---|---|---|
| Signal | `mockups/old/concept-signal.html` | 다크 시네마틱 (Linear · Vercel 류) | "Researching what’s next. Building what works." + 천천히 도는 궤도 다이어그램, 은은한 격자와 필름 그레인 | Inter Tight + Inter | `#06080f`, 파랑→하늘 빛 |
| Clear | `mockups/old/concept-clear.html` | 라이트 프리미엄 (Apple · Stripe 류) | 가운데 정렬 "Always researching. Always building." + 흰 스테이지 위 등축 계층 다이어그램(Platform·Models·Product·Operations) | Manrope + Inter | 흰색/`#f5f5f7`, 파랑 `#0a58e0` |
| Journal | `mockups/old/concept-journal.html` | 에디토리얼 럭셔리 (매거진 류) | 가벼운 세리프 "The quiet work of researching, and building, what comes next." + 브론즈 선으로 그린 계기판 다이얼 | Cormorant Garamond + Inter | 본색 `#f4f2ee`, 브론즈 `#8a6a3b` |

채택되면 해당 HTML 의 `<style>` 을 `assets/css/site.css` 로, 본문을 `index.html` 로 옮기고 나머지 두 파일을 지운다. 프로젝트 추가는 `#development` 목록에 `<li>` 하나를 복사해 이름·한 줄·호스트를 바꾸는 것뿐이다.

## 채택 방향 (2026-10-10 4차) — `mockups/old/concept-blueprint.html`
주인님 지시: **B(Clear) 레이아웃 + C(Journal) 스타일**, 인터랙티브 요소 강조, 원형 다이얼 대신 **클라우드·아키텍트를 연상시키는 추상 요소**, "In development" 는 **A(Signal) 레이아웃**(촘촘한 카드), 히어로 카피는 후보 3안.

- 구조: 가운데 정렬 히어로(역할 줄 · 세리프 헤드라인 · 리드 · 버튼 둘) → 도면 스테이지 → 2×2 Fields 타일 → 가운데 정렬 신조 → 촘촘한 프로젝트 카드(auto-fill) → 푸터.
- 재료: Cormorant Garamond 300/이탤릭 + Inter. 본색 `#f4f2ee`, 종이 `#faf9f6`, 브론즈 `#8a6a3b`, 헤어라인 `#d9d4cb`.
- 스테이지 그래픽: SVG 시스템 도면. Edge → 버스 → Gateway · Services · Models · Pipelines → 버스 → Data · Events, 점선 피드백 루프. 도면 테두리의 눈금과 제목 블록.
- 인터랙션(전부 `prefers-reduced-motion` 에서 꺼짐, JS 없으면 정지 상태로 보임):
  1. 로드 시 도면이 **선부터 그려지며** 나타난다(`stroke-dashoffset`, 계층별 0.4초 간격).
  2. 선 위로 **신호 점이 흐른다**(SMIL `animateMotion`, 시작 전에는 숨김).
  3. **노드에 마우스를 올리면** 채워지고 한 줄 설명(hint)이 뜬다.
  4. 스테이지가 **마우스 위치로 살짝 기운다**(최대 3°, 호버 가능한 기기만).
  5. 섹션·타일·카드가 **스크롤에 맞춰 한 번 떠오른다**(IntersectionObserver).
  6. 타일 호버 시 브론즈 밑줄이 왼쪽에서 그어지고, 프로젝트 카드 호버 시 왼쪽 브론즈 막대와 ↗ 이동.
- 시안 전용 장치: `#static` 해시 = 애니메이션 완료 상태(스크린샷용). 오른쪽 아래 "Copy 1·2·3" 버튼과 `#copy1~3` 해시 = 히어로 카피 후보 전환. **채택 시 둘 다 제거**한다.
- 히어로 카피 후보(영문):
  1. 방법 — "Research it, build it, run it." / "I design cloud platforms and AI systems, then build on them end to end: platform, models, product, operations. The research never stops, and neither does the building." (추천)
  2. 결과 — "Complex ideas, running in production." / "I design systems, explore technology, and turn complex ideas into working realities: a production-grade cloud platform of my own, and the products that run on it today."
  3. 관점 — "The tool keeps changing. The goal doesn’t." / "So I keep studying what changes and building what holds up: cloud platforms, AI systems, and products that put both to work for the people who need them."
  - 1안의 보수적 변형: "From research to running systems." / "I design cloud platforms and AI systems and build on them end to end, from platform and models to product and operations. The study of technology is continuous; so is the building."

### 히어로 카피 확정 (2026-10-10)
주인님이 **3안(관점)** 을 택했다. 헤드라인 "The tool keeps changing. The goal doesn’t." / 리드 "So I keep studying what changes and building what holds up: cloud platforms, AI systems, and products that put both to work for the people who need them." `concept-blueprint.html` 에 반영했고 카피 전환 버튼은 제거했다.

### 스테이지 인터랙션 후보 5안 (2026-10-10, 채택 대기) — `mockups/old/interact-*.html`
`tools/old/gen-interact.js` 가 `concept-blueprint.html` 을 바탕으로 스테이지만 바꿔 생성한다(`node tools/gen-interact.js .`). 모두 `prefers-reduced-motion` 에서 정지하고, `#static` 해시로 완료 상태를 찍는다.

| # | 파일 | 그래픽 | 사용자가 하는 것 | 기술 | 연상 |
|---|---|---|---|---|---|
| 1 | `interact-1-mesh.html` | 떠다니는 72개 노드와 거리별 연결선 | 포인터를 움직이면 근처 노드가 포인터로 연결되고 끌려온다 | canvas | 분산 시스템, 노드 네트워크 |
| 2 | `interact-2-layers.html` | 등축 4층 스택(Platform · Models · Product · Operations) | 올리면 층이 벌어지며 라벨이 보이고, 클릭하면 그 층의 설명이 캡션에 뜬다 | SVG + CSS | 계층 아키텍처 |
| 3 | `interact-3-scrolldraw.html` | 현재의 시스템 도면 | 스크롤에 맞춰 도면이 그려지고 되감긴다("n% drawn") | SVG + 스크롤 연동 | 설계 도면 |
| 4 | `interact-4-flow.html` | 벡터장을 따라 흐르는 260개 추적선 | 포인터가 흐름을 휘게 한다 | canvas | 트래픽, 데이터 흐름 |
| 5 | `interact-5-globe.html` | 520개 점으로 된 구와 6개 거점 사이의 호 | 드래그로 돌리고, 놓으면 다시 천천히 자전 | canvas | 클라우드, 분산 거점 |

기준 시안(`concept-blueprint.html`)의 인터랙션은 "로드 시 선 그리기 + 신호 점 + 노드 호버 + 기울기"다. 채택되면 그 변형의 스테이지를 기준 시안으로 합치고 나머지 파일과 생성기를 지운다.

### 2026-10-10 보정 (주인님 지적)
- "B 레이아웃 + C 스타일, In development 만 리스트형" — 프로젝트 영역을 카드에서 **행 목록**(이름 · 한 줄 · 호스트 ↗, 헤어라인 구분, 호버 시 왼쪽 브론즈 막대)으로 바꿨다. 기준 시안과 5개 변형 모두에 적용.
- 인터랙션 1(Mesh)·5(Globe)에 **강점 텍스트**를 그래픽 안에 넣었다. 여섯 항목: Cloud architecture · AI systems · Security standards · Strategy · End-to-end build · Operations(각각 보조 한 줄). Mesh 는 허브 노드 6개에 라벨, 포인터를 올리면 보조 설명이 뜬다. Globe 는 구 표면의 점 6개에 지시선과 라벨, 앞면으로 돌아올 때 선명해진다.
- Globe 구체감: 몸체 방사 음영, 가장자리 어두움(limb), 좌상단 광택, 경위선(30° 간격, 앞면만), 깊이에 따른 점 크기, 바깥 후광. 스테이지 배경을 **짙은 먹색**으로 바꿔 밝은 페이지 안의 한 장면처럼 보이게 했다.
- Mesh 배경: 종이 그라데이션 + 20px 점 격자.

## 채택 방향 정정 (2026-10-10) — `mockups/decided/final-mesh.html` · `mockups/old/final-globe.html`
주인님 정정: **레이아웃은 `concept-signal.html`, 스타일은 `concept-clear.html`**. (앞서 B+C 로 만든 `concept-blueprint.html` 과 `interact-*.html` 은 반대로 적용한 것이라 참고용으로만 남긴다.)

- 레이아웃(Signal): 투명 헤더 → 왼쪽 정렬 히어로(역할 줄 · 두 줄 헤드라인 · 리드 · Focus/In development/Contact 메타) + 오른쪽 그래픽 → 4열 카드 → 두 열 신조 박스 → 촘촘한 프로젝트 카드(auto-fill) → 푸터.
- 스타일(Clear): 흰 바탕 `#fff`/`#f5f5f7`, 먹색 `#1d1d1f`, 파랑 `#0a58e0`, Manrope 700 제목 + Inter, 둥근 모서리 16–22px, 부드러운 그림자, 헤어라인 `#e5e5ea`.
- 카피: 3안 확정("The tool keeps changing. The goal doesn’t."). 프로젝트는 Auto-Minutes · OmniSecure · ArchLens, 늘어나면 자동으로 흐름.
- 히어로 그래픽(두 판, 선택 대기): **Mesh** = 포인터에 반응하는 노드망, 허브 6개에 강점 라벨(호버 시 보조 한 줄). **Globe** = 흰 구체(음영·광택·경위선·후광), 파란 점 720개, 강점 6개 지시선 라벨, 드래그 회전·자전. 둘 다 `prefers-reduced-motion` 에서 정지, `#static` 캡처 모드.
- 생성기: `tools/gen-final.js` (`node tools/gen-final.js .`). 채택 시 해당 HTML 을 `index.html`/`assets/css/site.css` 로 옮기고 시안·생성기를 정리한다.

### 2026-10-10 추가 반영
- **In development 는 Journal 식 행 목록** — `final-mesh.html` 에만 적용(이름 · 한 줄 · 호스트 ↗, 헤어라인, 호버 시 파란 막대). `final-globe.html` 은 Signal 의 카드 그대로.
- **영문 기본 + 국문 전환** — 사이트 전체 문구(메뉴·히어로·메타·분야·신조·프로젝트·푸터·title·description)와 그래픽 안 강점 라벨까지 사전(`I18N`)으로 관리한다. 헤더 오른쪽 `KO`/`EN` 버튼으로 전환, 선택은 `localStorage` 에 기억, `#ko`/`#en` 해시로 바로 열 수 있다. `html[lang]` 이 바뀌고 국문은 `word-break: keep-all`, 제목 자간·행간을 따로 둔다. 글꼴에 Noto Sans KR 400/500/700 추가.
- 국문 카피(초안, 주인님 검토 필요): "도구는 계속 바뀝니다. / 목표는 바뀌지 않습니다." · 리드 "그래서 바뀌는 것을 계속 공부하고, 오래 가는 것을 계속 만듭니다. 클라우드 플랫폼과 AI 시스템, 그리고 그 둘을 필요한 사람들에게 쓰이게 하는 제품들입니다." · 신조 "기술은 도구이고, 더 나은 내일이 목적입니다." · 분야 아키텍처 / AI와 기술 / 전략 / 만들기.

### 2026-10-10 결정
- 히어로 그래픽 **Mesh 채택**(`final-mesh.html`). Globe 는 보류.
- **실명은 넣지 않는다.** 헤더의 `leestory.com` 은 단순 텍스트 대신 작은 **노드 글리프**(점 세 개와 연결선, 파란 점 하나) + "leestory" 굵게 + ".com" 회색으로 처리(A안). 비교안 B 밑줄 · C 파란 타일 · D .com 파랑은 `mockups/decided/brand-options.png`.
- 분야 카드 제목은 아이콘 아래 고정 높이에 정렬(본문 길이와 무관).

### 폴더 정리 (2026-10-10)
- `mockups/decided/` = 채택된 것과 결정 기록(`DECISIONS.md`). `mockups/old/` = 검토가 끝난 대안과 이전 라운드. 생성기는 `tools/gen-final.js` 만 현역, `tools/old/gen-interact.js` 는 보관.

## 채택 (2026-10-10)
- 헤더 표기 A안 확정. `mockups/decided/final-mesh.html` 을 운영 파일로 옮겼다: 구조는 `index.html`, 스타일은 `assets/css/site.css`, 언어 사전·전환·스크롤 리빌·Mesh 는 `assets/js/site.js`. `assets/hero.jpg` 는 쓰지 않아 삭제. 생성기는 `tools/old/` 로.
- 이후 수정은 운영 파일에서 직접 한다. **프로젝트 추가**: `index.html` 의 `#development` 목록에 `<li>` 하나 복사(이름·호스트), 설명은 `assets/js/site.js` 의 `I18N.en`·`I18N.ko` 에 `p4` 처럼 키를 더하고 `<span class="what" data-i18n="p4">` 로 연결. **문구 수정**: 두 사전만 고치면 양쪽 언어가 바뀐다. 영문 기본값은 `index.html` 본문에도 같은 문구가 있어야 한다(JS 없이 보이는 값).

## 2026-10-11 결정

- **히어로 제목 위계**: 시안 A(반전)·B(크기)·C(색)·D(페이드) 중 **C + 첫 줄 축소** 채택. 첫 줄은 `h1 span:first-child` 에서 `.72em`·500·`--ink-2`, 둘째 줄은 `--accent`·700. 1280/390 EN·KO 모두 첫 줄이 한 줄에 들어가는 것을 확인했다. 시트는 `mockups/decided/hero-emphasis-*.png`.
- **파비콘**: 5안 중 **1안 L · Block** 채택. `assets/img/favicon.svg`(원본) · `favicon-32.png`(대체) · `apple-touch-icon.png`(180, 모서리 없는 정사각형 — iOS 가 자체 마스크를 씌운다). 루트에는 두지 않고 `<link rel="icon">` 으로 연결한다. 비교 시트 `mockups/decided/favicon/sheet.png`.
- **신조 제목**: 두 문장을 각각 블록 `span` 으로 나눠 줄바꿈 위치를 고정했다(언어 키 `creed_a` / `creed_b`).
- **직함**: "Cloud Architect" → "Cloud Native Architect"(제목·OG·아이브로우). ArchLens 설명은 "Monolith-to-Microservices design, verified against the build."
