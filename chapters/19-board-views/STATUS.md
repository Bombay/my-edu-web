---
chapter: "19-board-views"
status: "completed"
startedAt: "2026-04-15"
completedAt: "2026-04-15"
quizPassed: true
---

## 실습 체크리스트
- [x] 동기부여: 게시판 목록이 밋밋하고, 새 게시판을 만들 수 없는 상태 체감
- [x] BoardsView 개선: RouterLink로 상세 페이지로 이동 (동적 속성 바인딩 :to)
- [x] 새 게시판 생성 폼 (BoardsView 내 인라인 섹션)
- [x] 로그인 사용자에게만 생성 UI 노출 (v-if="authStore.isLoggedIn")
- [x] POST /api/boards 연동 (토큰 자동 첨부 — Ch.18의 api 모듈)
- [x] 생성 후 boards.value.push()로 목록 즉시 갱신
- [x] 시나리오 테스트 (비로그인 차단 → 로그인 → 생성 → 클릭 이동)
- [x] 퀴즈 통과 (PASS-19-H5B8)

## 핵심 개념
1. **동적 속성 바인딩 (`:to`, `:src` 등)**: 속성명 앞에 `:`를 붙이면 값을 JavaScript 표현식으로 해석. 템플릿 리터럴과 조합해 URL 동적 생성.
2. **배열에 직접 push (`boards.value.push(newBoard)`)**: Vue 반응성이 배열 변경도 감지. 서버에서 재요청 없이 화면 갱신 가능 → 효율적.
3. **인증 API 호출의 투명성**: api 모듈이 토큰을 자동 첨부하므로, 컴포넌트는 토큰을 의식하지 않고 POST 호출만 하면 됨.
4. **조합의 힘**: v-if, v-model, api, try/catch/finally — 모두 이전에 배운 것들의 조합. 새 개념 없이 기능이 완성됨.

## 작성/수정한 파일
- `src/frontend/src/views/BoardsView.vue` (RouterLink + 게시판 생성 폼 추가)

## 퀴즈 결과
- passCode: PASS-19-H5B8
- 통과 기준: 5문제 중 4문제 이상 정답
- 결과: 통과 ✅ (2026-04-15)
