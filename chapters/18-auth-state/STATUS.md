---
chapter: "18-auth-state"
status: "completed"
startedAt: "2026-04-13"
completedAt: "2026-04-13"
quizPassed: true
---

## 실습 체크리스트
- [x] 동기부여: 로그인해도 새로고침하면 날아감 → 상태 저장 필요성 체감
- [x] 개념: Pinia (전역 상태 = 공용 사물함), localStorage (영구 저장), 라우트 가드
- [x] auth 스토어 생성 (stores/auth.ts) — token, user, login(), logout(), loadFromStorage()
- [x] LoginView에서 스토어 연결 (authStore.login)
- [x] 네비게이션 바에 로그인 상태 반영 (v-if isLoggedIn → 닉네임/로그아웃)
- [x] api 모듈에 토큰 자동 첨부 (Authorization: Bearer ...)
- [x] 라우트 가드 (router.beforeEach → meta.requiresAuth 체크)
- [x] localStorage로 새로고침 유지 (loadFromStorage)
- [x] 전체 흐름 테스트 (6단계 시나리오 통과)
- [x] 퀴즈 통과 (PASS-18-J6T2)

## 핵심 개념
1. **Pinia**: Vue의 전역 상태 관리. "공용 사물함" — 어떤 컴포넌트에서든 접근 가능. defineStore로 만들고 useXxxStore()로 사용.
2. **localStorage**: 브라우저 영구 저장소. 새로고침해도 유지. setItem/getItem/removeItem. 문자열만 저장 가능 (객체는 JSON.stringify/parse).
3. **computed**: 다른 ref에서 자동 계산되는 값. isLoggedIn = !!token.value — token 바뀌면 자동 재계산.
4. **!! (이중 부정)**: 값을 boolean으로 변환. !!'hello' → true, !!null → false.
5. **라우트 가드 (beforeEach)**: 모든 페이지 이동 전 실행. meta.requiresAuth + 토큰 없음 → /login 리다이렉트.
6. **useXxxStore()**: import한 건 "열쇠"(함수), 호출해야 "사물함"(스토어 객체)을 얻음.
7. **<template v-if>**: 화면에 안 그려지는 투명 감싸개. 여러 요소를 한꺼번에 조건부 렌더링.
8. **?.  (옵셔널 체이닝)**: null/undefined일 때 에러 대신 undefined 반환. user?.nickname.

## 작성/수정한 파일
- `src/frontend/src/stores/auth.ts` (신규)
- `src/frontend/src/views/LoginView.vue` (스토어 연결)
- `src/frontend/src/App.vue` (네비 + loadFromStorage)
- `src/frontend/src/api/index.ts` (토큰 자동 첨부)
- `src/frontend/src/router/index.ts` (라우트 가드)

## 퀴즈 결과
- passCode: PASS-18-J6T2
- 통과 기준: 6문제 중 5문제 이상 정답
- 결과: 통과 ✅ (2026-04-13)
