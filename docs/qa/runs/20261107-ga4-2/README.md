# GA4 실측 2026-11-07 (2차) — 주인님 관리 화면 조치(§4 1~4) 뒤, 켜기 전 측정

- 도구·조건: 1차(`../20261107-ga4/README.md`)와 같다. 원본 `ga4-check.json`. 실 gtag.js 응답 `Date: Sat, 07 Nov 2026 11:02:05 GMT`, `Cache-Control: private, max-age=900`.
- 결과: **13항목 전부 ✅.** 8-3 의 표준 grep 목록(`historyEvents|enableHistoryEvents|enableScroll|enableOutboundClick|enableVideo|autoEmailEnabled|autoPhoneEnabled|autoAddressEnabled`) **0줄**(1차 7줄 → 2줄 → 0줄).

| 항목 | 판정 | 근거(실측) |
|---|---|---|
| 8-3 | ✅ | 위 8키 `:true` 0줄. 참고로 `vtp_isAutoCollectPiiEnabledFlag:true` 는 남아 있으나 표준 목록 밖이고 `vtp_autoEmail/Phone/AddressEnabled` 가 전부 false 라 자동 감지는 꺼진 상태. `vtp_redactEmail:true`(이메일 가림)는 켜 둔다 |
| 8-5 · 8-6(5) · 8-7(3) · 8-8 · 호스트 조건 · 쿠키 | ✅ | 1차와 동일 값(`dl=https://leestory.com/` · `dt=/` · `dr=https://www.google.com` · `npa=1` · page_view 1건 · 끄기 0건 · CSP 0 · 2차 도메인 0건 · `_ga` domain `leestory.com` 60일) |

이 결과로 `enabled: true` 커밋을 올린다. 운영 반영 뒤 같은 명령을 한 번 더 돌려 `docs/qa/runs/` 에 남긴다.
