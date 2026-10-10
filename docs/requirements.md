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
| REQ-005 | 2026-10-10 | 디자인은 새로 설계(frontend-design 스킬), 프로필 문구는 현재 영문 문구를 바탕으로 에이전트가 초안 | 세션 답변 | 폐기 — REQ-008 로 대체 (목업 확인 후 반려) |
| REQ-006 | 2026-10-10 | "상위 base-environment 폴더 확인해서 에이전트 규칙 준수" | 세션 지시 | 완료 (CLAUDE.md · docs/) |
| REQ-007 | 2026-10-10 | "스크린샷은 지금 프로젝트 폴더 아래로 폴더 만들어서 옮겨" · "소스와 문서 목업등은 다 디렉토리로 나누어서 저장해" | 세션 지시 | 완료 |
| REQ-008 | 2026-10-10 | "기본 랜딩은 그냥 기존처럼 내 프로필만 표시하고, 진행중인 프로젝트는 별도로 작은 영역에 표기만 해야해" | 세션 지시 | 완료 |
| REQ-009 | 2026-10-10 | "기존 랜딩페이지를 좀더 고급스럽게 고도화해서 시안 3가지 보고해. 그리고 LS라고 적힌 부분은 빼" | 세션 지시 | LS 제거 완료(e33bcff). 1차 시안 3종은 "기존 틀의 변형"으로 반려 → REQ-011 |
| REQ-010 | 2026-10-10 | "빌드중인 프로젝트는 4가지로, auto-minutes, omnisecure, archlens, runon 한다" · "프로젝트 거는 링크는 blank로 해 새창또는 새탭으로 뜨게" | 세션 지시 | 완료 (index.html 반영, 시안에도 적용) |
| REQ-011 | 2026-10-10 | "각각 다른 목표와 관점으로 3가지를 만들어서 보고" · "우주최강 UIUX 에이전트 소환해서 다시 점검" · "leestory 라는 키워드 자체를 강조할 필요 없다" · "유명한 개인홈페이지 레퍼런스들을 우선 조사" | 세션 지시 | 완료 — `docs/references.md`, `mockups/concept-{dossier,essay,index}.html`, 비평 반영. 채택 대기 |
| REQ-012 | 2026-10-10 | "프로젝트 4개중 runon은 빼자" · "at home 이라는건 중요하지 않아. 기술적인 것들을 계속 연구하고 개발해 나간다는게 중요" · 톤별 시안 3가지, 첫 화면은 추상 그래픽 · "프로젝트는 계속 추가될 수 있으니 그점도 고려해" | 세션 지시 | 시안 3종(`mockups/concept-{signal,clear,journal}.html`) 보고, 채택 대기 |
| REQ-013 | 2026-10-10 | "B 레이아웃으로 C스타일로 하고 인터랙티브한 요소를 좀더 강조" · "원으로 표현한 이 부분을 IT engineer를 연상되는 추상적인요소로" · "in development는 A 레이아웃으로" · "hero영역의 문구 … 카피라이터 소환해서 후보 3가지" | 세션 지시 | `mockups/concept-blueprint.html` 보고, 카피 후보 3안 제시. 채택 대기 |
| REQ-014 | 2026-10-10 | "카피는 3번으로 하고... 인터랙티브한 요소는 다른걸로 시안을 5개 정도 만들어서 보고해" | 세션 지시 | 카피 3안 반영. `mockups/interact-{1..5}-*.html` 보고, 채택 대기 |
| REQ-015 | 2026-10-10 | "in development만 리스트형" · "인터랙티브 1번과 5번에 내 강점에 대한 텍스트를 넣어서" · "5번은 좀더 원구형체처럼" · "둘다 배경도 어울리게" | 세션 지시 | 완료 — 기준 시안·변형 재생성, 채택 대기 |
| REQ-016 | 2026-10-10 | "레이아웃은 concept-signal.html 스타일은 concept-clear.html 였다" | 세션 지시 | `mockups/final-mesh.html` · `final-globe.html` 보고, 채택 대기 |
| REQ-017 | 2026-10-10 | "In development는 목록화 되어 있던 시안 journal 처럼 해봐 그리고 mesh에만 적용해" · "한글버전과 영문 버전을 두고 기본을 영문으로" · "전체 사이트를 영문과 국문으로" | 세션 지시 | 완료 — `final-mesh.html` 행 목록, 두 시안 모두 EN 기본 + KO 전환. 채택 대기 |
| REQ-018 | 2026-10-10 | "한글 표기에 대해 … 우주최강 번역가와 카피라이터를 소환해서 … asis tobe 변경 사항을 보고후 변경" · "hero 영역의 mesh영역은 영문 그대로" · (확정 표 전달) "수정사항 반영해" | 세션 지시 | 완료 — `docs/copy-ko.md`, `tools/gen-final.js` T.ko 확정본, 그래픽 라벨 영문 유지 |

## 결정

| ID | 날짜 | 결정 | 근거 |
|---|---|---|---|
| ADR-0001 | 2026-10-10 | 빌드 도구 없음. (개정 2026-10-10) CSS 는 `assets/css/site.css` 로 분리, HTML 은 `index.html` 하나 | GitHub Pages 에 그대로 올라가고, 의존성 고정 문제가 없다. 분리는 REQ-007 디렉토리 배치 때문이며 여전히 빌드 없음 |
| ADR-0002 | 2026-10-10 | 홈랩 인프라 호스트 이름은 페이지에도 이 저장소 문서에도 싣지 않는다 | base-env 35 보안 자가점검 — 공개 저장소에서 인증 뒤 서비스 존재를 광고하지 않는다. (개정 2026-10-10: 문서에 적혀 있던 이름도 제거) |
| ADR-0003 | 2026-10-10 | 프로젝트 데이터를 JSON 으로 분리하지 않고 HTML 에 직접 둔다 | 항목이 3개이고 추가는 주인님 지시로만 일어난다. JS 없이도 보이는 쪽이 낫다 |
| ADR-0004 | 2026-10-10 | ~~사용하지 않게 된 `assets/hero.jpg` 는 삭제~~ → ADR-0006 으로 취소, 복원 | 새 디자인이 반려됐다 |
| ADR-0005 | 2026-10-10 | 디렉토리 배치: 루트 = Pages 필수 파일만(`index.html` · `CNAME` · `ads.txt`), `assets/` 스타일·이미지, `docs/` 문서, `mockups/` 스크린샷·목업, `tools/` 로컬 도구 | REQ-007. GitHub Pages 는 소스를 루트 또는 `/docs` 로만 잡을 수 있어 `index.html` 은 루트를 떠날 수 없다(Pages 설정 변경은 주인님 권한이고 `docs/` 는 문서용으로 쓴다) |
| ADR-0006 | 2026-10-10 | 2026-09-15 브랜딩 페이지를 그대로 되살리고(`assets/hero.jpg` 복원), 프로젝트는 철학 영역과 푸터 사이 `#projects` 띠에 칩 3개로만 표기. 다크 모드·새 글꼴은 도입하지 않는다 | REQ-008. 주인님이 목업을 보고 "기존처럼 프로필만, 프로젝트는 작은 영역에 표기만" 으로 정했다 |

## 추적표 (요건 → 결정 → 산출물)

| 요건 | 결정 | 산출물 |
|---|---|---|
| REQ-003 | ADR-0001 · ADR-0003 | `index.html` · `docs/design.md` |
| REQ-004 | ADR-0002 | `index.html` 프로젝트 영역 · `docs/core/agent-rules.md` 금지 목록 |
| REQ-005 | — | 폐기 |
| REQ-006 | — | `CLAUDE.md` · `docs/**` · `README.md` |
| REQ-007 | ADR-0005 · ADR-0001 개정 | `assets/css/site.css` · `mockups/` · `tools/serve.js` · `README.md` 디렉토리 표 |
| REQ-008 | ADR-0006 | `index.html` `#projects` · `assets/css/site.css` 마지막 절 · `docs/design.md` |
| REQ-009 | — | 반려(파일 삭제) |
| REQ-011 | — (채택 후 ADR) | `docs/references.md` · `mockups/concept-*.html` + 1280/390 스크린샷 · `docs/design.md` 콘셉트 표 |
| REQ-012 | — (채택 후 ADR) | `mockups/concept-signal.html` · `concept-clear.html` · `concept-journal.html` + 1280/390 스크린샷 · `docs/design.md` 3차 표 |
| REQ-013 | — (채택 후 ADR) | `mockups/concept-blueprint.html` + 1280/390/copy1~3 스크린샷 · `docs/design.md` 4차 절 |
| REQ-014 | — (채택 후 ADR) | `mockups/interact-*.html` + 스크린샷 · `tools/gen-interact.js` · `docs/design.md` 인터랙션 표 |
