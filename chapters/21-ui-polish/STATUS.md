---
chapter: "21-ui-polish"
status: "completed"
startedAt: "2026-04-20"
completedAt: "2026-04-20"
quizPassed: true
passCode: "PASS-21-X90G"
---

## 실습 체크리스트
- [x] 동기부여: 인라인 style 흩어져 있고, 모바일에서 깨지는 현재 화면 체감
- [x] 핵심 개념 1: 전역 CSS (assets/main.css) + main.ts에서 import → 모든 컴포넌트가 공유
- [x] 핵심 개념 2: 미디어쿼리(@media)로 화면 크기에 따라 스타일 분기 (반응형)
- [x] main.css 작성 (디자인 토큰 + .card / .btn / .input 공통 클래스)
- [x] 주요 뷰 인라인 style → 클래스 기반으로 교체 (App, Boards, BoardDetail, PostDetail, Login, Register, Home)
- [x] 모바일(375px) 시뮬레이션 + 미디어쿼리 동작 확인
- [x] 퀴즈 통과 (PASS-21-X90G)

## 핵심 개념
1. **전역 CSS + 번들러**: `main.ts`에서 `import './assets/main.css'` 한 줄이면, Vite가 빌드 시 모든 CSS를 하나의 시트로 묶어 페이지에 주입. 그 결과 모든 컴포넌트가 같은 클래스(.card, .btn 등)를 공유.
2. **CSS 변수 (디자인 토큰)**: `:root { --color-primary: #3b82f6 }`로 색/간격을 변수로 정의 → `var(--color-primary)`로 꺼내 씀. 한 곳만 바꾸면 그 변수를 쓰는 모든 요소가 일괄 변경. "디자인 토큰" 개념의 코드 표현.
3. **미디어쿼리 `@media (max-width: 768px)`**: "최대 768px까지" — 화면이 그 이하로 좁아질 때만 안쪽 규칙 활성화. 평소 스타일을 덮어쓰는 방식. 모바일/태블릿 대응의 표준 도구.
4. **전역 vs 스코프 분리 기준**: 여러 컴포넌트에서 쓰는 공통 스타일은 main.css(전역), 한 컴포넌트에서만 의미 있는 좁은 스타일은 `<style scoped>`. 분리해두면 main.css가 비대해지지 않고, 어디서 쓰는지 추적도 쉬움.
5. **`max-width` + `margin: 0 auto`**: 콘텐츠 가운데 정렬의 표준 패턴. 화면이 좁으면 함께 줄어들어 가로 스크롤 안 생기고, 넓어도 800px까지만 커지면서 좌우 여백이 자동 균등 분배.

## 작성/수정한 파일
- `src/frontend/src/assets/main.css` (신규 — 디자인 토큰, 공통 클래스, 미디어쿼리)
- `src/frontend/src/main.ts` (CSS import 한 줄 추가)
- `src/frontend/src/App.vue` (main에 .container 적용)
- `src/frontend/src/views/HomeView.vue` (.card 적용)
- `src/frontend/src/views/BoardsView.vue` (.card / .input / .btn / .list)
- `src/frontend/src/views/BoardDetailView.vue` (.card / .input / .textarea / .btn / .list)
- `src/frontend/src/views/PostDetailView.vue` (.card + scoped .post-content)
- `src/frontend/src/views/LoginView.vue` (.card / .input / .btn)
- `src/frontend/src/views/RegisterView.vue` (.card / .input / .btn)

## 퀴즈 결과
- passCode: PASS-21-X90G
- 통과 기준: 5문제 중 4문제 이상 정답
- 결과: 통과 ✅ (2026-04-20)
