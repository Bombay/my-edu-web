---
chapter: "23-deploy-prep"
status: "completed"
startedAt: "2026-04-22"
completedAt: "2026-04-22"
quizPassed: true
passCode: "PASS-23-MPGV"
---

## 실습 체크리스트
- [x] 동기부여: 코드에 박힌 비밀/주소를 그대로 올리면 큰일 나는 이유
- [x] 핵심 개념 1: 환경변수 (.env, process.env, import.meta.env)
- [x] 핵심 개념 2: 빌드 산출물 (dist/) — TS/Vue가 실행 가능한 JS/HTML/CSS로 변환되는 과정
- [x] 핵심 개념 3: Supabase = 클라우드 PostgreSQL + 관리 도구
- [x] 백엔드: dotenv 설치, .env/.env.example 작성, JWT 시크릿/포트 외부화 (3개 파일 수정)
- [x] 프론트엔드: VITE_API_BASE_URL .env/.env.example/.env.production 작성, api/index.ts 적용, env.d.ts 타입 추가
- [x] 빌드 실행 + dist/ 결과 확인 (백엔드 tsc, 프론트엔드 Vite build), preview까지 동작 확인
- [x] Supabase 계정 + 새 조직(이전 슬롯 가득 차서) + 빈 프로젝트 + PostgreSQL 스키마(users/boards/posts) + connection string 위치 파악
- [x] 퀴즈 통과 (PASS-23-MPGV)

## 핵심 개념
1. **환경변수의 두 역할**: ① 비밀(JWT 시크릿, DB 비밀번호) 분리 — 코드/Git에 노출 금지. ② 환경별 값(주소, 포트, 모드) 분기 — 같은 코드를 dev/prod에서 다르게 동작시킴.
2. **백엔드 vs 프론트엔드 환경변수의 차이**:
   - 백엔드: `dotenv` 라이브러리 필요, `process.env.X`로 사용, **모든 변수 자유롭게**
   - 프론트엔드(Vite): 라이브러리 불필요(내장), `import.meta.env.VITE_X`로 사용, **`VITE_` 접두사만 노출** (보안 장치 — 사용자 브라우저로 모든 코드가 노출되니 비밀은 절대 들어가면 안 됨)
3. **빌드의 본질**: 실행 환경(브라우저, Node.js)이 직접 못 읽는 코드(TS, Vue) → 읽을 수 있는 형태(JS, HTML, CSS)로 사전 변환. 결과는 `dist/` 폴더. 프론트는 추가로 번들링(여러 파일 합치기) + 해시 파일명(캐시 무효화)까지.
4. **`.env.example`의 의미**: 진짜 .env는 Git에 안 올라가니, 팀원이 *"어떤 변수가 필요한지"* 알 수 있도록 키 이름만 적은 템플릿을 함께 커밋한다.
5. **SQLite ↔ PostgreSQL 문법 차이**: `INTEGER PRIMARY KEY AUTOINCREMENT` → `SERIAL`, `DATETIME DEFAULT CURRENT_TIMESTAMP` → `TIMESTAMPTZ DEFAULT NOW()`. SQL은 표준이 있지만 DB마다 방언이 있어 마이그레이션엔 작은 작업이 따른다.
6. **Supabase = 클라우드 PostgreSQL 호스팅**. 무료 플랜은 조직당 프로젝트 2개 제한. 한도 차면 새 조직 생성으로 우회 가능. Connection string에서 `[YOUR-PASSWORD]` 자리만 진짜 비밀번호로 채워 사용.

## 작성/수정한 파일
- `src/backend/package.json` (dotenv 추가)
- `src/backend/.env` (신규, gitignore 됨)
- `src/backend/.env.example` (신규)
- `src/backend/src/index.ts` (dotenv/config import + PORT 환경변수)
- `src/backend/src/routes/auth.ts` (JWT_SECRET 환경변수)
- `src/backend/src/middleware/auth.ts` (JWT_SECRET 환경변수)
- `src/frontend/.env` (신규, gitignore 됨)
- `src/frontend/.env.example` (신규)
- `src/frontend/.env.production` (신규)
- `src/frontend/src/api/index.ts` (import.meta.env.VITE_API_BASE_URL 사용)
- `src/frontend/env.d.ts` (ImportMetaEnv 타입 정의)

## Supabase 준비물 (코드 외부)
- 새 조직 생성 후 프로젝트 1개 생성
- SQL Editor에서 users/boards/posts 테이블 생성 (PostgreSQL 문법)
- Connection string 위치 확인: Project Settings → Database 또는 상단 Connect 버튼
- DB 비밀번호 별도 메모

## 퀴즈 결과
- 통과 기준: 5문제 중 4문제 이상 정답
- 결과: 통과 ✅ (2026-04-22)
