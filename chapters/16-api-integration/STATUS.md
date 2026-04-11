---
chapter: "16-api-integration"
status: "completed"
startedAt: "2026-04-10"
completedAt: "2026-04-10"
quizPassed: true
---

## 실습 체크리스트
- [x] 동기부여: 프론트와 백엔드가 분리되어 있음을 체감
- [x] 개념: fetch + async/await ("전화 걸기" 비유)
- [x] 브라우저 콘솔에서 fetch 직접 호출 (Promise pending/rejected/fulfilled 체감)
- [x] CORS 에러 마주침 → 원인 이해 (출처/포트가 다름)
- [x] 백엔드에 cors 패키지 설치 + `app.use(cors())` 적용
- [x] BoardsView에 `ref` + `onMounted`로 데이터 표시
- [x] `boards.value = data` 의 반응성 스위치 의미 이해
- [x] try / catch / finally + loading / error 상태 추가
- [x] 에러 케이스 직접 만들어보기 (서버 끄기 → 빨간 에러 메시지 확인)
- [x] 퀴즈 통과 (PASS-16-F9R3)

## 핵심 개념
1. **fetch + Promise**: `fetch`는 즉시 Promise(약속 쪽지)를 반환. `await` 없이 쓰면 `pending` 상태의 Promise만 잡혀 데이터를 못 씀.
2. **async/await**: 비동기 응답을 동기처럼 읽게 해주는 문법. JavaScript는 싱글스레드라 동기 블로킹은 화면을 멈추게 해서 비동기가 기본.
3. **CORS (Same-Origin Policy)**: 브라우저는 출처(프로토콜+호스트+포트)가 다른 서버로 가는 JS 요청을 기본 차단. 서버가 `Access-Control-Allow-Origin` 헤더로 허락해줘야 함. Express는 `cors` 미들웨어로 한 줄 해결.
4. **onMounted**: 컴포넌트가 DOM에 붙는 순간 실행되는 라이프사이클 훅. SPA에서 라우트 이동 시마다 새로 mount되어 fetch가 재실행됨.
5. **반응성**: `ref`의 `.value`에 새 값을 대입하는 순간 Vue가 화면을 자동 갱신. 지역 변수에만 담으면 화면 업데이트 안 됨.
6. **fetch 함정**: 4xx/5xx 응답은 reject되지 않음 → `response.ok`로 수동 체크 후 `throw` 필요.
7. **try/catch/finally**: 성공/실패와 무관하게 `loading`을 꺼야 하므로 `finally` 사용.

## 작성한 파일
- `src/backend/src/index.ts` (cors 미들웨어 추가)
- `src/frontend/src/views/BoardsView.vue` (fetch + 상태 관리)

## 퀴즈 결과
- passCode: PASS-16-F9R3
- 통과 기준: 6문제 중 5문제 이상 정답
- 결과: 통과 ✅ (2026-04-10)
