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

## 콘셉트 시안 (2026-10-10 2차, 채택 대기)
1차 시안(기존 틀의 변형 3종)은 반려됐다. 2차는 `docs/references.md` 의 조사를 바탕으로 **목표·독자·관점이 다른 셋**을 만들고 UI/UX 비평 에이전트의 지적을 반영했다. 공통: 프로필 우선, 프로젝트는 작은 영역에 링크만(새 탭, ↗ 표시, 스크린리더 문구), `leestory` 는 작은 도메인 표기뿐, LS 마크 없음, `:focus-visible` 스타일, 메타 설명·og 태그, 작은 글자 대비 4.5:1 이상.

| 콘셉트 | 파일 | 목표·독자 | 구조 | 글꼴 | 바탕 |
|---|---|---|---|---|---|
| Dossier | `mockups/concept-dossier.html` | 30초 안에 신뢰 · 채용·협업·공공 담당자 | 역할 선언 H1 + 프로필 레코드(사진·역할·초점·거점·연락) → Fields 표(주장 + In practice 근거) → Building now 압축 목록 → 철학 | IBM Plex Serif + Plex Sans | 웜그레이 `#f6f6f3`, 남색 링크 |
| Essay | `mockups/concept-essay.html` | 생각과 관점 · 동료 | 1열 680px 산문. "I am a cloud architect…" H1 → 리드 → Fields 원문 + 이탤릭 한 문장씩 → 철학 → Now building(각 "왜 만들었나" 1인칭 한 줄) | Newsreader | 흰색, 녹색 링크 |
| Index | `mockups/concept-index.html` | 한 화면에서 다 보고 떠남 · 급한 방문자 | 600px 색인. 역할 H1 → Fields → Philosophy → Now building → 푸터. 다크 모드 자동 | Geist | 흑백, 다크 모드 |

비평 결과 순위: Dossier > Index > Essay (근거는 보고 본문). 채택되면 해당 HTML 의 `<style>` 을 `assets/css/site.css` 로 옮기고 `index.html` 을 맞춘 뒤 나머지 두 파일을 지운다.

## 주인님 판단이 필요한 것
- 이름: 세 시안 어디에도 주인님 이름이 없다(도메인 강조 금지 지시 때문). 헤더의 `leestory.com` 자리에 실명 한 줄을 둘지.
- 사진: 현재 `assets/hero.jpg` 에는 "BIGGER IDEAS A BRIGHTER TOMORROW" 문구가 박혀 있어 Essay·Index 는 사진을 쓰지 않고 Dossier 는 문구가 안 보이게 잘랐다. 문구 없는 사진으로 교체할지.
- 언어: 공공 접점을 위해 한국어 한 줄 요약(역할·연락처)을 둘지.
