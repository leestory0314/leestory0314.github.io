# 디자인 결정사항 (2026-10-10)

이 폴더에는 **채택된 것만** 둔다. 검토가 끝난 대안·이전 라운드는 `../old/` 에 있다. 근거와 경위는 `docs/design.md`, 요건 추적은 `docs/requirements.md`.

| 항목 | 결정 | 파일 |
|---|---|---|
| 레이아웃 | Signal(투명 헤더 · 왼쪽 정렬 히어로 + 오른쪽 그래픽 · 4열 카드 · 두 열 신조 · 프로젝트 · 푸터) | `final-mesh.html` |
| 스타일 | Clear(흰 바탕 `#fff`/`#f5f5f7`, 먹색 `#1d1d1f`, 파랑 `#0a58e0`, Manrope + Inter + Noto Sans KR, 둥근 모서리와 부드러운 그림자) | `final-mesh.html` |
| 히어로 그래픽 | Mesh — 포인터에 반응하는 노드망, 허브 6개에 강점 라벨(영문 고정, 호버 시 보조 한 줄) | `final-mesh.html` |
| 히어로 카피 | 3안 "The tool keeps changing. / The goal doesn’t." | `final-mesh.html` |
| In development | Journal 식 행 목록(이름 · 한 줄 · 호스트 ↗) | `final-mesh.html` |
| 프로젝트 | Auto-Minutes · OmniSecure · ArchLens (늘어나면 행 추가) | `final-mesh.html` |
| 언어 | 영문 기본, 헤더 KO/EN 토글로 국문 전환. 국문 카피는 주인님 확정본 | `index.html`, `assets/js/site.js` `COPY.ko` |
| 헤더 표기 | 실명 없음. 노드 글리프 + leestory 굵게 + .com 회색 (A안 확정, 2026-10-10) | `brand-options.png` |
| 분야 카드 | 제목을 아이콘 아래 고정 높이에 정렬 | `final-mesh.html` |

확인용 스크린샷: `final-mesh-1280.png` · `final-mesh-390.png` (영문), `final-mesh-ko-1280.png` · `final-mesh-ko-390.png` (국문).
2026-10-10 채택 완료: `index.html` + `assets/css/site.css` + `assets/js/site.js` 가 원본이다. 이 폴더의 `final-mesh.html` 은 채택 시점 사본, 생성기는 `tools/old/gen-final.js` 에 보관.

## 2026-10-11 추가 결정

| 항목 | 결정 | 파일 |
|---|---|---|
| 히어로 제목 위계 | C안 + 첫 줄 축소. 첫 줄 "The tool keeps changing." 은 72% 크기·회색·중간 굵기로 한 줄에, 둘째 줄 "The goal doesn’t." 은 본래 크기·파랑 `#0a58e0`·굵게 | `hero-emphasis.html`, `hero-emphasis-en.png`, `hero-emphasis-ko.png` |
| 파비콘 | 1안 L · Block — 파랑 둥근 사각형에 흰 기하학 L. SVG 원본 + 32px PNG 대체 + 180px 터치 아이콘 | `favicon/f1.svg` → `assets/img/favicon.svg`, 비교 시트 `favicon/sheet.png` |
| 신조 제목 | 문장 단위 두 줄 고정("Technology is a tool." / "A better tomorrow is the goal.") | `index.html` |
| 공유 미리보기 이미지(2026-11-07) | 국문 안 채택(히어로 C안 구성, 1200×630). 영문 안은 보관 | `og/og-ko.png` → `assets/img/og.png`, 대안 `og/og-en.png` |
| 푸터 처리 고지(2026-11-07) | GA4 행태정보 고지·국외 이전 표·끄기 토글을 접히는 `details` 로 푸터 아래에. 별도 페이지 없음(루트 파일 금지) | `privacy/privacy-1280-en.png` · `-1280-ko` · `-390-en` · `-390-ko` |
