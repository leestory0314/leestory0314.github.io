# BASELINE — Part D 자체 진단

- 기준: `!base-environment/30-표준/30-개발-베이스라인.md` Part D. 확인일 2026-10-10.

**해당 없음.** 이 저장소는 서버 코드·컨테이너·클러스터 워크로드가 없는 정적 HTML 한 장이다. Part A 의 MUST 12 항목(typed settings · 오류 봉투 · 외부 호출 5종 · JSON 로그 · UTC · 테스트 데이터 · 컨테이너 보안 · 리소스 한도 · 빌드 1회 승격 · 공유 서비스 계정)은 적용 대상이 아니다.

적용되는 것만 남긴다.

| 항목 | 상태 | 확인 |
|---|---|---|
| 의존성 고정 (A10 취지) | 외부 의존은 Google Fonts(Manrope · Inter · Noto Sans KR)뿐. 버전 고정 불가(서비스 특성) — 폰트가 안 오면 시스템 산세리프로 대체되도록 폴백을 둠. 스크립트는 자체 파일 | `assets/css/site.css` `--display` `--sans` |
| 시크릿 (34·42) | 없음. 페이지에 메일 주소만 공개 | `git grep -nE "sk-\|xoxb-\|ghp_\|token"` 0건 |
| 운영 반영 승인 (43) | `main` push = 배포. 승인 후 push | `docs/runbook/deploy.md` |
| 외부 분석 스크립트 (30 F-4 · 35 A-8, 2026-11-07 신설) | GA4 1개. 스위치 기본 꺼짐·꺼지면 로드 0 · 호스트 조건 · 끄기 토글 · 처리 고지(국외 이전 표) · CSP meta · 보내는 값 정리. 2026-11-07 2차 실측 13항목 ✅(`docs/qa/runs/20261107-ga4-2`). 회신 기한 2026-11-21 | `docs/runbook/analytics.md` · `docs/qa/runs/20261107-ga4/README.md` |
| 응답 보안 헤더 (35 A-1 계열 — HSTS · X-Frame-Options · X-Content-Type-Options · CSP 헤더 · CORS) | ❌ **+ ADR-0010**(수용, 주인님 승인 2026-11-07). GitHub Pages 가 헤더를 못 바꾼다. CSP 만 `<meta>`. 규약 예외 E-13(T) 등록 요청 중. 재검토: Cloudflare 전치 또는 호스팅 이전 시 | `curl -sI https://leestory.com/` · OmniSecure 스캔 2026-11-07 |
| 공개 표기와 실제 동작 일치 (41 I-3) | 프로젝트 3개 링크가 200 응답 | `docs/runbook/incident.md` 점검 명령 |
