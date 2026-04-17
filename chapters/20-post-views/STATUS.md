---
chapter: "20-post-views"
status: "completed"
startedAt: "2026-04-17"
completedAt: "2026-04-17"
quizPassed: true
passCode: "PASS-20-T9R3"
---

## 실습 체크리스트
- [x] 동기부여: 게시판을 클릭해도 빈 화면 — 글을 보지도 쓰지도 못함
- [x] 핵심 개념 1: 동적 라우트 파라미터(`route.params.id`)를 fetch URL에 끼워넣기
- [x] 핵심 개념 2: `<textarea>` + v-model로 긴 본문 입력
- [x] 백엔드: GET /api/posts?boardId=X 필터 지원 (쿼리 파라미터 맛보기)
- [x] BoardDetailView: 그 게시판의 글 목록 + 글쓰기 폼 (인라인)
- [x] PostDetailView 생성 + 라우터에 /posts/:id 등록
- [x] 시나리오 테스트 (게시판 클릭 → 글쓰기 → 목록 갱신 → 글 클릭 → 상세 이동)
- [x] 디버깅 경험: 401 (토큰 만료), API 응답 키 불일치 (백엔드 `error` vs 프론트 `message`)
- [x] 퀴즈 통과 (PASS-20-T9R3)

## 핵심 개념
1. **동적 라우트 + URL 변수**: `route.params.id`로 URL의 `:id` 값을 꺼내, 백틱 + `${}` 템플릿 리터럴로 fetch URL에 끼워넣어 그 자원만 요청. `/boards/:id` → `GET /api/posts?boardId=${id}`, `/posts/:id` → `GET /api/posts/${id}`.
2. **쿼리 파라미터 vs URL 파라미터**: URL의 `:id`는 `req.params.id`로, `?boardId=X`는 `req.query.boardId`로 — Express에서 두 통로가 다름. 쿼리는 "선택적 필터"에, URL params는 "이 자원의 식별자"에 적합.
3. **v-model의 일관성**: `<input>`이든 `<textarea>`든 `<select>`든 `v-model`은 동일하게 동작. Vue가 알아서 적절한 DOM 속성에 연결.
4. **push vs unshift**: 둘 다 Vue 반응성을 트리거하지만, `push`는 맨 뒤, `unshift`는 맨 앞. 최신 글이 위로 오는 게 자연스러우면 `unshift`.
5. **API 응답 키 약속**: 프론트와 백엔드가 JSON 키 이름을 정확히 맞춰야 함. 백엔드가 `{ error: ... }`로 보내는데 프론트가 `errorData.message`를 보면 조용히 폴백 메시지가 뜨는 까다로운 버그 발생.

## 작성/수정한 파일
- `src/backend/src/routes/posts.ts` (boardId 쿼리 파라미터 필터 추가)
- `src/frontend/src/views/BoardDetailView.vue` (글 목록 + 인라인 글쓰기 폼)
- `src/frontend/src/views/PostDetailView.vue` (신규 — 글 상세 페이지)
- `src/frontend/src/router/index.ts` (`/posts/:id` 라우트 등록)
- `src/frontend/src/api/index.ts` (errorData.error 폴백 추가)

## 퀴즈 결과
- passCode: PASS-20-T9R3
- 통과 기준: 5문제 중 4문제 이상 정답
- 결과: 통과 ✅ (2026-04-17)
