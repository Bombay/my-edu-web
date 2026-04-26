---
chapter: "24-deploy"
status: "completed"
startedAt: "2026-04-23"
completedAt: "2026-04-26"
quizPassed: true
---

## 실습 체크리스트
- [x] 동기부여: 진짜 인터넷에 올린다 + 마지막 챕터의 책임감
- [x] 핵심 개념 1: better-sqlite3(sync) → pg(async) 패러다임 변화
- [x] 핵심 개념 2: PostgreSQL 자리표시자(`$1, $2`) + 결과 형태(`result.rows`) 차이
- [x] 핵심 개념 3: 클라우드 배포 모델 (정적 호스팅 vs 서버 실행)
- [x] Phase A-1: pg 설치 + db/index.ts를 Pool 패턴으로 재작성
- [x] Phase A-2: 모든 라우트를 async + pool.query로 변환 (auth, boards, posts)
- [x] Phase A-3: 로컬에서 Supabase 연결로 회원가입/로그인/글쓰기 검증
- [x] Phase C: 백엔드 Render 배포 — https://my-edu-web.onrender.com
- [x] Phase B: 프론트엔드 Vercel 배포 — https://my-edu-web.vercel.app
- [x] Phase D: 라이브 URL에서 회원가입→로그인→글쓰기 시나리오 검증
- [x] 퀴즈 통과

## 핵심 개념

### 1. sync → async 패러다임 변화
- **better-sqlite3 (로컬)**: DB가 같은 컴퓨터의 파일 → `db.prepare(...).get()` 즉시 응답 (동기)
- **pg (PostgreSQL)**: DB가 네트워크 너머의 별도 서버 → `await pool.query(...)` 응답 대기 (비동기)
- **결과 형태**: SQLite는 row 자체 / pg는 메타데이터까지 포함된 객체 → `result.rows[0]`로 꺼냄

### 2. SQL 방언 (자리표시자)
| DB | 자리표시자 | 자동증가 | 시간 함수 |
|---|---|---|---|
| SQLite | `?` | `AUTOINCREMENT` | `CURRENT_TIMESTAMP` |
| PostgreSQL | `$1, $2` | `SERIAL` | `NOW()` (`TIMESTAMPTZ`) |
| MySQL | `?` | `AUTO_INCREMENT` | `NOW()` |
| Oracle | `:name` | `SEQUENCE` | `SYSDATE` |

목적은 같음(SQL 인젝션 방지) — 표기법만 다름.

### 3. 클라우드 배포 모델
- **정적 호스팅 (Vercel)**: 빌드 산출물(HTML/JS/CSS)만 CDN에 분배. 서버 안 떠있어도 됨. 항상 즉시 응답.
- **서버 실행 환경 (Render)**: 우리 Express 코드가 24시간 컨테이너에서 실행. 무료 티어는 15분 무요청 시 spin down → 콜드 스타트 30초~1분.

### 4. 환경변수 분리의 진짜 이유
- `.env`는 .gitignore로 Git에서 제외 → 배포 서버는 값을 모름
- 클라우드 콘솔(Render Environment, Vercel Environment Variables)에 직접 등록 필요
- 누락하면 `process.env.X`가 undefined → 의존 코드가 깨짐 (오늘 JWT_SECRET 사건)
- **로컬 동작 ≠ 배포 동작** — 환경변수 체크리스트 필수

## 작성/수정한 파일
- `src/backend/src/db/index.ts` — better-sqlite3 → pg Pool 패턴 (`new Pool({ connectionString, ssl })`)
- `src/backend/src/routes/auth.ts` — async + `pool.query` + `$1, $2` + `RETURNING` 절
- `src/backend/src/routes/boards.ts` — async + `pool.query` + `$1` + `RETURNING *`
- `src/backend/src/routes/posts.ts` — async + `pool.query` + `DELETE ... RETURNING id` (존재 확인 + 삭제 한 번에)
- `src/backend/.env` — `DATABASE_URL`(Supabase Session pooler URL) 추가
- `src/frontend/.env.production` — `VITE_API_BASE_URL=https://my-edu-web.onrender.com/api`
- (Render 콘솔) `DATABASE_URL`, `JWT_SECRET` 환경변수 등록
- (Vercel 콘솔) `VITE_API_BASE_URL` 환경변수 등록 + Root Directory: `src/frontend`

## 라이브 URL
- 프론트엔드: https://my-edu-web.vercel.app
- 백엔드: https://my-edu-web.onrender.com

## 알려진 이슈/실수에서 배운 것
1. **Supabase 연결: IPv6 직결 불가** — `db.PROJECT.supabase.co:5432` 직결은 IPv6 전용 → 한국 IPv4 환경에서 `getaddrinfo ENOTFOUND`. **해결: Session pooler URL 사용** (`aws-1-ap-southeast-1.pooler.supabase.com:5432`, username `postgres.PROJECTREF`).
2. **DB 비밀번호 함정**: Supabase가 보여준 URL의 `[YOUR-PASSWORD]` 자리표시자에서 대괄호를 그대로 두면 `password authentication failed`. (1시간 헤맴)
3. **Render에 코드만 푸시하면 끝이 아님**: 환경변수(DATABASE_URL, JWT_SECRET)를 Environment 탭에 직접 등록해야 함. JWT_SECRET 누락 → 회원가입은 되는데 로그인만 500.
4. **GitHub 권한**: 저장소가 `Bombay/my-edu-web`(사수 계정)이라 Vercel GitHub App을 그쪽에 설치하기 까다로움. **해결: Public Git Repository URL** 옵션으로 import (저장소가 public이라 가능).
5. **Render 무료 티어 콜드 스타트**: 15분 무요청 시 spin down. 첫 요청 30초~1분 지연. 학습용은 OK, 운영용은 유료 플랜 필요.
6. **JWT_SECRET placeholder**: 현재 Render에 등록한 값이 `change-this-to-a-long-random-string-at-least-32-chars`. 진짜 운영 전 강한 랜덤 문자열로 교체 필요.

## 퀴즈 결과
- 통과: 2026-04-26
- 5문제 중 4문제 이상 정답
