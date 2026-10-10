# requirements — leestory.com

- 서식 원본: `!base-environment/60-공통자산/templates/requirements.md`. 식별자 규약(31 §6): 요건 `REQ-NNN` · 결정 `ADR-NNNN` · 결함 `BUG-NNN`.
- 소급: 2022-02-05 최초 페이지와 2026-09-15 브랜딩 페이지의 요건 원문은 없다 — "원문 없음, 재구성"으로 적었다.

## 요건

| ID | 날짜 | 요건 (주인님 말 그대로) | 출처 | 상태 |
|---|---|---|---|---|
| REQ-001 | 2022-02-05 | 원문 없음, 재구성: `leestory.com` 도메인에 소개 페이지를 둔다 (CNAME · ads.txt) | git 이력 | 완료 |
| REQ-002 | 2026-09-15 | 원문 없음, 재구성: 영문 개인 브랜딩 페이지로 교체 (Cloud Architect · AI Technologist · Builder) | git 이력 | 완료, REQ-003 으로 대체 |
| REQ-003 | 2026-10-10 | "내 개인 프로필 페이지와, 내가 서브도메인으로 지정하는 프로젝트를 소개하는 페이지로 만들고 싶어" | 세션 지시 | 구현 중 |
| REQ-004 | 2026-10-10 | "am, omni, runon.life만 등록, 나머지는 내가 추후 지시" | 세션 답변 | 구현 중 |
| REQ-005 | 2026-10-10 | 디자인은 새로 설계(frontend-design 스킬), 프로필 문구는 현재 영문 문구를 바탕으로 에이전트가 초안 | 세션 답변 | 구현 중 |
| REQ-006 | 2026-10-10 | "상위 base-environment 폴더 확인해서 에이전트 규칙 준수" | 세션 지시 | 완료 (CLAUDE.md · docs/) |

## 결정

| ID | 날짜 | 결정 | 근거 |
|---|---|---|---|
| ADR-0001 | 2026-10-10 | 빌드 도구 없이 `index.html` 단일 파일 유지 | GitHub Pages 에 그대로 올라가고, 의존성 고정 문제가 없다 |
| ADR-0002 | 2026-10-10 | 인프라 호스트(git · harbor · argocd 등)는 페이지에 싣지 않는다 | base-env 35 보안 자가점검 — 인증 뒤 서비스 존재를 광고하지 않는다 |
| ADR-0003 | 2026-10-10 | 프로젝트 데이터를 JSON 으로 분리하지 않고 HTML 에 직접 둔다 | 항목이 3개이고 추가는 주인님 지시로만 일어난다. JS 없이도 보이는 쪽이 낫다 |
| ADR-0004 | 2026-10-10 | 사용하지 않게 된 `assets/hero.jpg` 는 삭제 | 새 디자인의 히어로는 타이포그래피다. git 이력에 남아 복원 가능 |

## 추적표 (요건 → 결정 → 산출물)

| 요건 | 결정 | 산출물 |
|---|---|---|
| REQ-003 | ADR-0001 · ADR-0003 | `index.html` · `docs/design.md` |
| REQ-004 | ADR-0002 | `index.html` 프로젝트 영역 · `docs/core/agent-rules.md` 금지 목록 |
| REQ-005 | — | `docs/design.md` |
| REQ-006 | — | `CLAUDE.md` · `docs/**` · `README.md` |
