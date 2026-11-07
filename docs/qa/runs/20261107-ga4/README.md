# GA4 실측 2026-11-07 (A-8 8-3·8-5~8-8) — 스위치 꺼짐 상태로 커밋하기 전 측정

- 도구: `tools/ga4-check.mjs` (puppeteer-core 24.43 + 이 PC Chrome, headless). 원본 결과 `ga4-check.json`.
- 조건: 저장소 작업 트리(커밋 전), 켜짐 시나리오는 served `site.js` 의 `enabled` 만 `true` 로 바꿔 측정. 실제 gtag.js(`G-TX4SCQ4QYE`, 477,180 B) 로드, 수집 요청은 204 로 차단.

| 항목 | 판정 | 근거(실측) |
|---|---|---|
| 8-3 실 원문 `vtp_*:true` | ❌ | `enableOutboundClick` · `enableScroll` 2줄 남음(같은 날 18:1x 7줄 → 18:4x 2줄, 주인님이 관리 화면을 끄는 중). 향상된 측정의 스크롤·이탈 클릭 → 끄고 15분 뒤 재측정 |
| 8-5 스위치 꺼짐 → 분석 요청 0 | ✅ | `switchOff`: gtag.js 0회, collect 0건. 제3자 호스트는 `fonts.googleapis.com` 뿐 |
| 8-6 `dl` 에 `?`·`#` 없음 | ✅ | 진입 `/?utm_source=test&q=secret#ko` → `dl=https://leestory.com/` |
| 8-6 `dt` = 경로 | ✅ | `dt=/` (화면 제목 "Cloud Native Architect…" 안 나감) |
| 8-6 `dr` 외부는 출처만 | ✅ | referer `https://www.google.com/search?q=leestory+secret` → `dr=https://www.google.com` |
| 8-6 `npa=1` | ✅ | 모든 hit |
| 8-6 `em`·`uid` 없음 | ✅ | 0 |
| 8-8 화면 이동당 page_view 1건 | ✅ | 해시 이동(`#fields`) · 언어 전환 · `pushState('/?after=push')` 뒤에도 총 1건 |
| 8-7 끄기 저장 → 요청 0 | ✅ | `optOut`: gtag.js 0회 |
| 8-7 토글 | ✅ | 클릭 → `localStorage.ga_optout=1` + `window['ga-disable-G-TX4SCQ4QYE']=true` |
| 8-7 CSP 위반 0 | ✅ | 5개 시나리오 콘솔에 CSP 메시지 0, pageerror 0 |
| 호스트 조건 | ✅ | `academyfit.leestory.com` 으로 같은 파일을 열면 gtag.js 0회 |
| 쿠키 host-only 60일 | ✅ | `_ga` · `_ga_TX4SCQ4QYE` domain `leestory.com`(점 없음), 만료 60일. **`gtag('config')` 에 넣었을 때는 `.leestory.com` 400일로 무시됐다 → `gtag('set')` 으로 옮겨 해결** |

다음 측정: 관리 화면 8-3 완료 15분 뒤 같은 명령. 13항목 ✅ 가 되면 그 결과로 `enabled: true` 커밋.
