# 장애 런북 — leestory.com

상태를 가진 것이 없으므로 복구 런북·RTO/RPO 는 **해당 없음**. 아래 세 가지만 일어난다.

## 1. 페이지가 안 열린다 (404 / 연결 실패)
```sh
nslookup leestory.com                      # leestory0314.github.io 로 풀려야 한다
curl -sI https://leestory.com/ | head -5   # Server: GitHub.com, 200
```
- DNS 가 다른 곳을 가리키면: 주인님이 DNS 를 되돌린다(이 저장소 권한 밖).
- 200 인데 GitHub 404 페이지면: `CNAME` 파일이 지워졌거나 `index.html` 이 없다 → `git log --oneline -3` 로 마지막 커밋 확인 → `docs/runbook/deploy.md` 롤백 절.
- GitHub 자체 장애: `https://www.githubstatus.com` 확인, 기다린다.

## 2. 프로젝트 링크가 죽었다
```sh
for h in https://academyfit.leestory.com/ https://archlens.leestory.com/ https://am.leestory.com/ https://omni.leestory.com/; do curl -s -m 10 -o /dev/null -w "$h %{http_code}\n" "$h"; done
```
- 000 / 5xx 면 **이 저장소 문제가 아니다.** 해당 프로젝트 세션(`academyfit` · `ArchLens` · `auto-minutes` · `omnisecure`)에 `!exchange` 로 알린다: `TO-<프로젝트>-FROM-leestory-<호스트>-down-<YYYYMMDD-HHMM>.md`. 페이지에서 링크를 빼지 않는다(주인님 결정 사항).

## 3. 글꼴이 깨져 보인다
- Google Fonts 차단·장애. 폴백(시스템 세리프)으로 읽히는지 확인하고, 길어지면 주인님과 자체 호스팅 여부를 정한다.

## 4. 방문 통계(GA4)가 이상하다
```sh
curl -s https://leestory.com/assets/js/site.js | grep -E "enabled: (true|false)"      # 운영 스위치
node tools/ga4-check.mjs <puppeteer-core 디렉터리>                                      # 13항목 — 8-3 ❌ 면 관리 화면이 바뀐 것
```
- **보고서에 0건**: 스위치가 `false` 거나(의도된 상태), 관리 화면에서 스트림이 지워졌거나, CSP 가 `googletagmanager.com` 을 막고 있다(브라우저 콘솔). 코드가 맞으면 `docs/runbook/analytics.md` §2.
- **과수집 의심**(8-3 ❌, 검색어·제목이 보고서에 보임): 즉시 **스위치를 끄고 push**(승인) → 관리 화면 끄기 → 15분 뒤 재측정 → 다시 켜기. 35 §8 "사고가 났을 때" 대로 기록.
- **2차 도메인 트래픽이 섞임**: 그 도메인 페이지에 같은 측정 ID 가 들어간 것이다. 이 저장소 문제가 아니다 — 해당 프로젝트에 `!exchange`.

## 5. 보안 스캐너가 응답 헤더 누락을 낸다 (HSTS · X-Frame-Options · X-Content-Type-Options · CSP · CORS `*`)
- **알려진 수용 항목이다(ADR-0010, 규약 예외 E-13).** GitHub Pages 는 응답 헤더를 바꿀 수 없다. 저장소에서 할 일 없음 — 스캔 보고에 ADR 번호로 답한다.
- 다시 볼 때: 로그인·폼·API 가 생기거나, 호스팅 앞에 Cloudflare 를 세우거나 옮길 때. 그때 ADR-0010 을 개정한다.

## 사후 보고
- 주인님께 보고가 필요한 건(DNS·도메인 만료·GitHub 계정)은 base-env 30 E-4 R6 형식으로 `.docx` 를 만든다.
