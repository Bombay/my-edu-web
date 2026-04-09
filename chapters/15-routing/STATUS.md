---
chapter: "15-routing"
status: "completed"
startedAt: "2026-04-09"
completedAt: "2026-04-09"
quizPassed: true
passCode: "PASS-15-M3Q8"
---

## 핵심 개념
- SPA: HTML은 하나, URL에 따라 RouterView 부분만 교체 (깜빡임 없는 페이지 전환)
- RouterLink: 새로고침 없이 이동하는 링크 (a 태그와의 차이)
- RouterView: 현재 URL에 맞는 컴포넌트가 표시되는 자리 (액자 틀)
- 동적 라우트: /boards/:id로 선언, route.params.id로 값 접근

## 실습 체크리스트
- [x] SPA와 라우팅 개념 이해
- [x] Vue Router에 페이지 등록
- [x] views 폴더에 페이지 컴포넌트 생성 (Home, Login, Register, Boards)
- [x] RouterLink로 네비게이션 구현
- [x] 동적 라우트 (:id) 이해
- [x] 퀴즈 통과

## 작성한 코드
- `src/frontend/src/router/index.ts` — 라우터 설정 (경로 5개 등록)
- `src/frontend/src/views/HomeView.vue` — 홈 페이지
- `src/frontend/src/views/LoginView.vue` — 로그인 페이지
- `src/frontend/src/views/RegisterView.vue` — 회원가입 페이지
- `src/frontend/src/views/BoardsView.vue` — 게시판 목록 페이지
- `src/frontend/src/views/BoardDetailView.vue` — 게시판 상세 (동적 라우트)
- `src/frontend/src/App.vue` — 네비게이션 + RouterView

## 어려웠던 점 / 질문
- 특이사항 없음

## 퀴즈 결과
통과 (2026-04-09) — PASS-15-M3Q8
