# leestory.com

`https://leestory.com` 개인 홈페이지. 프로필과, 서브도메인으로 운영하는 프로젝트 소개.

## 어디서 도나
- **GitHub Pages.** 저장소 `leestory0314/leestory0314.github.io`, 브랜치 `main` 루트. `CNAME` = `leestory.com`.
- 빌드 도구 없음. `index.html` 한 장에 CSS 내장. **`main` push 가 곧 배포**다(승인 후).

## 파일
| 파일 | 역할 |
|---|---|
| `index.html` | 페이지 전체 |
| `CNAME` | 사용자 지정 도메인. 지우지 않는다 |
| `ads.txt` | AdSense 소유 확인. 지우지 않는다 |
| `CLAUDE.md` | 에이전트 규칙 (agent-baseline v1.0 + 이 저장소 규칙) |
| `docs/design.md` | 시각 언어와 항목 추가 방법 |
| `docs/core/agent-rules.md` | 에이전트 실행·커밋·게이트 규칙 |
| `docs/requirements.md` | 요건(REQ)·결정(ADR) 추적표 |
| `docs/runbook/` | 배포·장애 런북 |

## 로컬에서 보기
```sh
python -m http.server 8765
# http://localhost:8765
```

## 프로젝트 항목 추가
`docs/design.md` 마지막 절. 싣는 프로젝트는 주인님 지시로만 늘린다(현재 `am` · `omni` · `runon.life`).

## 연락
`leestory0314@gmail.com`
