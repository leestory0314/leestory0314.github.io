# 장애 런북 — leestory.com

상태를 가진 것이 없으므로 복구 런북·RTO/RPO 는 **해당 없음**. 아래 세 가지만 일어난다.

## 1. 페이지가 안 열린다 (404 / 연결 실패)
```sh
nslookup leestory.com                      # leestory0314.github.io 로 풀려야 한다
curl -sI https://leestory.com/ | head -5   # Server: GitHub.com, 200
```
- DNS 가 다른 곳을 가리키면: 주인님이 DNS 를 되돌린다(에이전트 권한 없음).
- 200 인데 GitHub 404 페이지면: `CNAME` 파일이 지워졌거나 `index.html` 이 없다 → `git log --oneline -3` 로 마지막 커밋 확인 → `docs/runbook/deploy.md` 되돌리기.
- GitHub 자체 장애: `https://www.githubstatus.com` 확인, 기다린다.

## 2. 프로젝트 링크가 죽었다
```sh
for h in https://am.leestory.com/ https://omni.leestory.com/ https://archlens.leestory.com/; do curl -s -m 10 -o /dev/null -w "$h %{http_code}\n" "$h"; done
```
- 000 / 5xx 면 **이 저장소 문제가 아니다.** 해당 프로젝트 세션(`auto-minutes` · `omnisecure` · `ArchLens`)에 `!exchange` 로 알린다: `TO-<프로젝트>-FROM-leestory-<호스트>-down-<YYYYMMDD-HHMM>.md`. 페이지에서 링크를 빼지 않는다(주인님 결정 사항).

## 3. 글꼴이 깨져 보인다
- Google Fonts 차단·장애. 폴백(시스템 세리프)으로 읽히는지 확인하고, 길어지면 주인님과 자체 호스팅 여부를 정한다.

## 사후 보고
- 주인님께 보고가 필요한 건(DNS·도메인 만료·GitHub 계정)은 base-env 30 E-4 R6 형식으로 `.docx` 를 만든다.
