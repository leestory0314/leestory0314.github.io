# 배포 런북 — leestory.com

- 호스팅: GitHub Pages. 저장소 `leestory0314/leestory0314.github.io`, 브랜치 `main`, 루트 디렉터리. `CNAME` 이 `leestory.com` 을 가리키고 DNS 는 `leestory0314.github.io` 로 CNAME 돼 있다(2026-10-10 실측 `nslookup leestory.com`).
- **push 가 곧 배포다.** 보통 1~3분 안에 반영되고 CDN 캐시 `max-age=600` 이라 최대 10분 지연될 수 있다.

## 배포
1. 로컬 확인: `node tools/serve.js` → `http://127.0.0.1:8765` 를 390px · 1280px 로 본다. 스크린샷은 `mockups/decided/` 에 둔다.
2. 게이트: 평문 자격 검색 0건, 프로젝트 링크 200, 390px·1280px 육안 확인, `node --check assets/js/site.js`. `index.html` 의 인라인 스크립트나 `assets/js/site.js` §0 을 건드렸으면 `node tools/ga4-check.mjs …` 의 CSP 위반 0·13항목(`docs/runbook/analytics.md` §3).
3. 커밋: `git add -A && git commit -m "feat(site): …"`.
4. `[승인 대기]` 로 주인님께 변경 요약과 `mockups/` 스크린샷 경로를 보고한다.
5. 승인 후 🖥️ PC: `git fetch origin && git status -sb` 가 `ahead` 만 보이면 `git push origin main`.
6. 확인: `curl -sI https://leestory.com/ | grep -i last-modified` 가 새 시각. 브라우저 강력 새로고침.

## 롤백
- 직전 커밋으로: `git revert HEAD` → 승인 → push. (`reset --hard` · `--force` 금지.)
- 2026-09-15 브랜딩 페이지로 통째 복원: `git checkout 83e6f39 -- index.html` 뒤 `git show 83e6f39:image/hero.jpg > assets/hero.jpg` 로 이미지 복원, `assets/css/site.css` · `assets/js/site.js` 삭제 → 커밋 → 승인 → push.

## 주인님만 하는 일
- GitHub 저장소 설정 → Pages → 사용자 지정 도메인·HTTPS 강제. DNS(`leestory.com` A/CNAME) 변경.
- `ads.txt` 의 AdSense 게시자 ID 변경.
- GA4 관리 화면(수집 스위치·Google 태그 설정·보관·필터) — `docs/runbook/analytics.md` §4. 방문 통계 **켜기/끄기 승인**(코드 스위치 한 줄, push = 운영).
