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
- `index.html` 의 `<ul class="project-list">` 에 `<li>` 하나를 복사해 주소(`.host`)와 한 줄 설명(`.desc`)을 바꾼다. 설명은 "이름 — 무엇" 한 줄, 60자 안.
- CSS 는 건드릴 필요 없다. 넷째 칩부터는 자동으로 다음 줄로 흐른다.
- 확인: `node tools/serve.js` → `mockups/desktop-1280.png` · `mockups/mobile-390.png` 를 같은 이름으로 다시 찍는다.

## 콘셉트 시안 (2026-10-10 3차, 채택 대기)
1차(기존 틀 변형)와 2차(레퍼런스식 미니멀)는 "전문가답지도 고급스럽지도 않다"로 반려됐다. 3차는 주인님이 고른 **세 톤에 하나씩**, 첫 화면은 **코드로 그린 추상 그래픽**, 메시지는 "집에서 운영"이 아니라 **기술을 계속 연구하고 개발해 나간다**로 잡았다.

공통: 프로필 우선, 프로젝트는 아래쪽 작은 영역에 링크만(새 탭, ↗, 스크린리더 문구), 목록은 `auto-fill` 격자나 행 목록이라 **항목이 늘어도 그대로 흐른다**(개수를 문구에 박지 않는다). `leestory` 는 작은 도메인 표기뿐, 사진 없음, `:focus-visible`, 메타 설명·og 태그, `prefers-reduced-motion` 존중.

| 콘셉트 | 파일 | 톤 | 첫 화면 | 글꼴 | 바탕·강조 |
|---|---|---|---|---|---|
| Signal | `mockups/concept-signal.html` | 다크 시네마틱 (Linear · Vercel 류) | "Researching what’s next. Building what works." + 천천히 도는 궤도 다이어그램, 은은한 격자와 필름 그레인 | Inter Tight + Inter | `#06080f`, 파랑→하늘 빛 |
| Clear | `mockups/concept-clear.html` | 라이트 프리미엄 (Apple · Stripe 류) | 가운데 정렬 "Always researching. Always building." + 흰 스테이지 위 등축 계층 다이어그램(Platform·Models·Product·Operations) | Manrope + Inter | 흰색/`#f5f5f7`, 파랑 `#0a58e0` |
| Journal | `mockups/concept-journal.html` | 에디토리얼 럭셔리 (매거진 류) | 가벼운 세리프 "The quiet work of researching, and building, what comes next." + 브론즈 선으로 그린 계기판 다이얼 | Cormorant Garamond + Inter | 본색 `#f4f2ee`, 브론즈 `#8a6a3b` |

채택되면 해당 HTML 의 `<style>` 을 `assets/css/site.css` 로, 본문을 `index.html` 로 옮기고 나머지 두 파일을 지운다. 프로젝트 추가는 `#development` 목록에 `<li>` 하나를 복사해 이름·한 줄·호스트를 바꾸는 것뿐이다.

## 주인님 판단이 필요한 것
- 이름: 도메인 강조 금지 지시로 세 시안 어디에도 실명이 없다. 헤더의 `leestory.com` 자리에 이름 한 줄을 둘지.
- 언어: 공공 접점을 위해 한국어 한 줄 요약(역할·연락처)을 둘지.
