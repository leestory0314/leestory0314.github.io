# GA4 실측 2026-11-07 (2차) — 주인님 관리 화면 조치(§4 1~4) 뒤, 켜기 전 측정

- 도구·조건: 1차(`../20261107-ga4/README.md`)와 같다. 원본 `ga4-check.json`. 실 gtag.js 응답 `Date: Sat, 07 Nov 2026 11:02:05 GMT`, `Cache-Control: private, max-age=900`.
- 결과: **13항목 전부 ✅.** 8-3 의 표준 grep 목록(`historyEvents|enableHistoryEvents|enableScroll|enableOutboundClick|enableVideo|autoEmailEnabled|autoPhoneEnabled|autoAddressEnabled`) **0줄**(1차 7줄 → 2줄 → 0줄).

| 항목 | 판정 | 근거(실측) |
|---|---|---|
| 8-3 | ✅ | 위 8키 `:true` 0줄. 참고로 `vtp_isAutoCollectPiiEnabledFlag:true` 는 남아 있으나 표준 목록 밖이고 `vtp_autoEmail/Phone/AddressEnabled` 가 전부 false 라 자동 감지는 꺼진 상태. `vtp_redactEmail:true`(이메일 가림)는 켜 둔다 |
| 8-5 · 8-6(5) · 8-7(3) · 8-8 · 호스트 조건 · 쿠키 | ✅ | 1차와 동일 값(`dl=https://leestory.com/` · `dt=/` · `dr=https://www.google.com` · `npa=1` · page_view 1건 · 끄기 0건 · CSP 0 · 2차 도메인 0건 · `_ga` domain `leestory.com` 60일) |

이 결과로 `enabled: true` 커밋을 올린다. 운영 반영 뒤 같은 명령을 한 번 더 돌려 `docs/qa/runs/` 에 남긴다.

## 운영 라이브 실측 (2차 push `ba990ab` 반영 뒤, 2026-11-07 11:12 UTC = 20:12 KST)
- 대상: 운영 `https://leestory.com/` 그대로(파일 대체 없음). 진입 `/?utm_source=live&x=1#ko`, 참조 `search.naver.com/search.naver?query=…`, 해시 이동·언어 전환 뒤 이탈. 수집 요청은 204 로 차단. 원본 `live-check.json`.
- gtag.js 1회 로드 · `page_view` **1건**: `dl=https://leestory.com/` · `dt=/` · `dr=https://search.naver.com` · `npa=1` · `em`/`uid` 없음. 이탈 시 `user_engagement` 1건(GA4 표준 체류 이벤트, 같은 정리값).
- 쿠키 `_ga`·`_ga_TX4SCQ4QYE` domain `leestory.com`(host-only) 60일. CSP 위반 0, 스크립트 오류 0. 외부 호스트는 Google Fonts 2개 + `www.googletagmanager.com` + `www.google-analytics.com` 뿐.
- 푸터 상태 "Analytics is on in this browser." + [Turn off] 버튼 표시.
