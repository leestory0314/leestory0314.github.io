# GA4 실측 2026-11-08 00:10 KST (3차) — 성능 보완(REQ-030) 뒤 재측정

- 왜: gtag.js 로드를 `load` 이벤트 뒤로 미루고(A-8 8-6·8-8 영향 가능), 한글 글꼴을 KO 전환 때만 받도록 바꿨다. 수집 동작이 그대로인지 같은 도구로 확인한다.
- 도구·조건: `node tools/ga4-check.mjs <puppeteer-core 디렉터리> --out docs/qa/runs/20261108-ga4-3`. 1·2차와 같은 5개 시나리오, 실 gtag.js 원문(477 KB) 사용, 수집 요청은 204 로 차단. 원본 `ga4-check.json`.
- 도구 수정 1건: 켜짐 커밋(`ba990ab`) 뒤에는 저장소 상수가 `true` 라 8-5(꺼짐) 시나리오가 저장소 값을 그대로 쓰면 틀리게 ❌ 가 났다. 시나리오가 요구하는 값으로 양방향 치환하도록 고쳤다(측정 대상의 회귀 아님 — 첫 실행에서 8-5 만 ❌, 도구 수정 뒤 재실행).
- 결과: **13항목 전부 ✅.** 8-3 표준 8키 `:true` 0줄. 꺼짐 시나리오 gtag.js 0·collect 0. 켜짐 시나리오 gtag.js 1회·`page_view` 1건·`npa=1`·쿠키 `_ga`·`_ga_TX4SCQ4QYE` host-only `leestory.com`. 제3자 호스트는 Google Fonts 뿐. CSP 위반 0, 스크립트 오류 0.
- 지연 로드의 뜻: `gtag('consent')`·`gtag('set')`·`gtag('config')` 는 전과 같이 즉시 dataLayer 에 쌓이고, 스크립트만 `load` 뒤에 붙는다. gtag.js 가 도착하면 쌓인 호출을 그대로 처리하므로 보내는 값은 같다(위 실측).
