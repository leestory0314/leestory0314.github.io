# BASELINE — Part D 자체 진단

- 기준: `!base-environment/30-표준/30-개발-베이스라인.md` Part D. 확인일 2026-10-10.

**해당 없음.** 이 저장소는 서버 코드·컨테이너·클러스터 워크로드가 없는 정적 HTML 한 장이다. Part A 의 MUST 12 항목(typed settings · 오류 봉투 · 외부 호출 5종 · JSON 로그 · UTC · 테스트 데이터 · 컨테이너 보안 · 리소스 한도 · 빌드 1회 승격 · 공유 서비스 계정)은 적용 대상이 아니다.

적용되는 것만 남긴다.

| 항목 | 상태 | 확인 |
|---|---|---|
| 의존성 고정 (A10 취지) | 외부 의존 없음. 글꼴은 시스템 글꼴(Georgia · Inter/Segoe UI 폴백), 이미지는 저장소 안 `assets/hero.jpg` | `assets/css/site.css` `font-family` |
| 시크릿 (34·42) | 없음. 페이지에 메일 주소만 공개 | `git grep -nE "sk-\|xoxb-\|ghp_\|token"` 0건 |
| 운영 반영 승인 (43) | `main` push = 배포. 승인 후 push | `docs/runbook/deploy.md` |
| 공개 표기와 실제 동작 일치 (41 I-3) | 프로젝트 3개 링크가 200 응답 | `docs/runbook/incident.md` 점검 명령 |
