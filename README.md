# leestory.com

`https://leestory.com` 개인 홈페이지. 프로필 랜딩 한 장(영문 기본, 국문 전환)이고, 진행 중인 프로젝트는 아래쪽 행 목록에 링크로만 표기한다.

## 어디서 도나
- **GitHub Pages.** 저장소 `leestory0314/leestory0314.github.io`, 브랜치 `main` 루트. `CNAME` = `leestory.com`.
- 빌드 도구 없음. **`main` push 가 곧 배포**다(승인 후).

## 디렉토리
| 자리 | 무엇 |
|---|---|
| `/` (루트) | GitHub Pages 가 읽는 파일만: `index.html` · `CNAME` · `ads.txt` |
| `assets/` | 스타일(`css/site.css`)·이미지 |
| `docs/` | 요건·결정·규칙·런북·디자인 문서 |
| `mockups/` | 확인용 스크린샷·목업 |
| `tools/` | 로컬 확인용 도구(`serve.js`) |

## 파일
| 파일 | 역할 |
|---|---|
| `index.html` | 페이지 구조와 내용 |
| `assets/css/site.css` | 스타일(변수·배치·반응형) |
| `assets/js/site.js` | 언어 사전(EN/KO)과 전환, 스크롤 리빌, 히어로 Mesh |
| `CNAME` | 사용자 지정 도메인. 지우지 않는다 |
| `ads.txt` | AdSense 소유 확인. 지우지 않는다 |
| `docs/design.md` | 시각 언어와 항목 추가 방법 |
| `docs/requirements.md` | 요건(REQ)·결정(ADR) 추적표 |
| `docs/runbook/` | 배포·장애 런북 |
| `mockups/decided/` | 채택된 시안과 결정 기록(`DECISIONS.md`) |
| `mockups/old/` | 검토가 끝난 대안·이전 라운드 |
| `docs/references.md` | 개인 홈페이지 레퍼런스 조사 |
| `docs/copy-ko.md` | 국문 카피 검수 AS-IS → TO-BE |
| `tools/serve.js` | 로컬 정적 서버 |
| `tools/old/gen-interact.js` | 인터랙션 시안 생성기(시안 단계에만) |

## 로컬에서 보기
```sh
node tools/serve.js
# http://127.0.0.1:8765
```

## 프로젝트 항목 추가
`docs/design.md` 마지막 절. `#projects` 띠에 칩 하나를 더하는 것뿐이며, 싣는 프로젝트는 주인님 지시로만 늘린다(현재 `am` · `omni` · `archlens`).

## 연락
`leestory0314@gmail.com`
