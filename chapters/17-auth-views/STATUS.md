---
chapter: "17-auth-views"
status: "completed"
startedAt: "2026-04-12"
completedAt: "2026-04-12"
quizPassed: true
---

## 실습 체크리스트
- [x] 동기부여: 회원가입/로그인 API가 있지만 화면이 없음을 체감
- [x] 개념: v-model (양방향 바인딩), POST 요청, API 모듈 분리
- [x] API 모듈 생성 (src/frontend/src/api/index.ts)
- [x] 회원가입 폼 (RegisterView.vue) — v-model + POST fetch
- [x] 로그인 폼 (LoginView.vue) — v-model + POST fetch (스스로 작성!)
- [x] 에러 메시지 표시 + 로딩 상태
- [x] 성공 후 라우터로 페이지 이동 (router.push)
- [x] BoardsView.vue를 api 모듈로 리팩토링
- [x] 퀴즈 통과 (PASS-17-W4K7)

## 핵심 개념
1. **v-model**: 양방향 바인딩. input ↔ ref가 항상 동기화. 거울처럼 어느 쪽이 바뀌든 반대쪽도 따라 바뀜.
2. **POST fetch**: GET과 달리 method, headers(Content-Type), body(JSON.stringify)를 명시해야 함.
3. **API 모듈 분리**: BASE_URL, 헤더, 에러 처리를 한 곳에서 관리 → 중복 제거 + 변경 시 한 파일만 수정.
4. **@submit.prevent**: 폼 제출 시 브라우저 기본 동작(페이지 새로고침)을 막고 JS 함수로 처리.
5. **useRouter / router.push()**: JS 코드 안에서 프로그래밍적 페이지 이동 (성공 후 자동 이동 등).
6. **return 값 받기**: `const data = await api(...)` — 함수의 return 값은 필요하면 받고, 필요 없으면 안 받아도 됨.

## 퀴즈 결과
- passCode: PASS-17-W4K7
- 통과 기준: 6문제 중 5문제 이상 정답
- 결과: 통과 ✅ (2026-04-12)
