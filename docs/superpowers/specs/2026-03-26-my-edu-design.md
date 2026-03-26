# My-Edu: 풀스택 웹개발 학습 프로젝트 설계서

## 1. 프로젝트 개요

### 목적
비개발자(HTML/CSS 경험 있음, Claude Code 사용 가능)가 커뮤니티 게시판을 직접 만들며 풀스택 웹개발을 익히는 실습 중심 코스.

### 최종 결과물
커뮤니티 게시판 — 회원가입, 주제별 게시판 생성, 글쓰기 기능 포함.

### 기술 스택
| 영역 | 기술 | 선택 이유 |
|------|------|----------|
| Frontend | Vue.js 3 + TypeScript | 직관적 템플릿 문법, TS로 타입 안전성 학습 |
| Backend | Node.js + Express + TypeScript | JS 생태계 통일, 가장 널리 쓰이는 웹 프레임워크 |
| Database (로컬) | SQLite (better-sqlite3) | 설치 불필요, 파일 기반, SQL 직접 작성으로 학습 극대화 |
| Database (배포) | Supabase (PostgreSQL) | 무료 티어, 관리형 DB, SQL 지식이 그대로 이전됨 |
| ORM | 사용하지 않음 | 직접 SQL 작성으로 DB 동작 원리 체득 |
| Deploy | Vercel + Supabase | 프론트+백엔드: Vercel, DB: Supabase (모두 무료 티어) |

---

## 2. 교육 철학

### 핵심 원칙
1. **"왜?"부터 시작** — 기술을 쓰기 전에 왜 필요한지 체감시킨다. 예: JSON 저장의 불편함 → DB 필요성.
2. **한 번에 하나** — 새 개념은 챕터당 최대 1~2개. 나머지는 이미 아는 것 위에 쌓는다.
3. **반드시 손으로 확인** — 모든 개념은 코드를 직접 쓰고, 결과를 눈으로 확인해야 넘어간다.
4. **이해 못하면 넘어가지 않는다** — 학습자가 직접 설명할 수 있어야 이해한 것으로 판단한다.
5. **숙련된 교육자처럼** — 자연스러운 순서로 학습자를 유도하며, 맥락 없이 갑자기 새 개념을 던지지 않는다.

### 챕터 내부 흐름 (매 챕터 필수)
```
[1. 동기부여]  → 이전 챕터의 한계/불편함을 보여줌
[2. 개념 소개] → 핵심 개념 1~2개를 비유와 함께 짧게
[3. 따라하기]  → Claude가 단계별로 안내, 학습자가 직접 코드 작성
[4. 스스로 해보기] → 약간 변형된 과제를 혼자 풀어봄
[5. 시각 확인] → ERD, 브라우저, API 응답 등으로 결과 확인
[6. 퀴즈 게이트] → HTML 퀴즈 통과해야 다음 챕터로 진행 가능
```

### 게이트 체크
- 챕터 N+1을 시작하려면 챕터 N의 `quizPassed`가 `true`여야 한다.
- 퀴즈 오답 시: 해당 개념을 다시 설명하고 재도전.
- 학습자가 정답의 이유를 직접 설명할 수 있어야 통과.

---

## 3. 프로젝트 구조

```
my-edu/
├── CLAUDE.md                          # 학습 가이드 & 규칙
├── progress.json                      # 전체 진행 상태 + 챕터↔소스 매핑
│
├── chapters/                          # 학습 콘텐츠
│   ├── 01-environment-setup/
│   │   ├── README.md                  # 개념 + 실습 가이드
│   │   ├── quiz/index.html            # 퀴즈 페이지
│   │   └── STATUS.md                  # 완료 상태
│   ├── 02-first-server/
│   └── ... (24개 챕터)
│
├── src/                               # 실제 프로젝트 소스
│   ├── frontend/                      # Vue.js + TypeScript
│   │   ├── src/
│   │   │   ├── views/
│   │   │   ├── components/
│   │   │   └── ...
│   │   └── package.json
│   ├── backend/                       # Express + TypeScript
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   ├── db/
│   │   │   │   ├── schema.sql         # 테이블 정의
│   │   │   │   ├── migrations/        # 마이그레이션 SQL
│   │   │   │   └── community.db       # SQLite 파일 (.gitignore)
│   │   │   └── ...
│   │   └── package.json
│   └── shared/                        # 프론트/백 공유 타입
│       └── types/
│
└── docs/                              # 시각 자료
    ├── erd/                           # Mermaid ERD / HTML 시각화
    └── superpowers/specs/             # 설계 문서
```

---

## 4. 커리큘럼 상세

### Part 1: 기초 다지기 (챕터 01~07)

| # | 챕터 | 핵심 개념 | 만드는 것 | 소스 위치 |
|---|------|----------|----------|----------|
| 01 | 개발 환경 세팅 | Node.js, npm, 터미널 기초 | 프로젝트 폴더 구조 | (프로젝트 루트) |
| 02 | 첫 번째 서버 | HTTP, 요청/응답, Express 기초 | "Hello World" API 서버 | `src/backend/` |
| 03 | TypeScript 맛보기 | 타입, 인터페이스, 왜 TS인가 | 02의 서버를 TS로 전환 | `src/backend/` |
| 04 | 데이터를 어디에 저장하지? | JSON 파일의 한계 → DB 필요성 체감 | JSON으로 게시글 저장 (불편함 체감) | `src/backend/` |
| 05 | SQL 기초와 SQLite | CREATE TABLE, INSERT, SELECT | 첫 테이블 생성 + 데이터 조회 | `src/backend/src/db/` |
| 06 | 테이블 설계의 기술 | 관계(1:N, N:M), 정규화, FK | ERD로 게시판 테이블 설계 | `src/backend/src/db/schema.sql`, `docs/erd/` |
| 07 | SQL 심화 | JOIN, WHERE, ORDER BY, 집계 | 여러 테이블에서 데이터 조합 | `src/backend/src/db/` |

**순서 설계 의도:**
- 02→03: JS로 먼저 동작시킨 뒤 TS로 전환하면 타입의 가치를 직접 비교
- 04→05: JSON 저장의 불편함을 체감한 뒤 DB를 배우면 필요성 직감
- 06: SQL 기본을 알고 난 뒤에 설계를 다루면 "왜 이렇게 나누지?"를 이해 가능

### Part 2: 백엔드 구축 (챕터 08~13)

| # | 챕터 | 핵심 개념 | 만드는 것 | 소스 위치 |
|---|------|----------|----------|----------|
| 08 | DB와 서버 연결 | better-sqlite3, 쿼리 실행 | Express에서 SQLite 연동 | `src/backend/src/db/` |
| 09 | REST API 설계 | REST 원칙, 라우팅, HTTP 메서드 | 게시글 CRUD API | `src/backend/src/routes/` |
| 10 | 회원가입 API | 비밀번호 해싱, 입력 검증 | POST /api/auth/register | `src/backend/src/routes/auth.ts` |
| 11 | 로그인과 인증 | 세션/토큰, JWT 기초 | POST /api/auth/login + 미들웨어 | `src/backend/src/routes/auth.ts`, `src/backend/src/middleware/` |
| 12 | 게시판 API | 카테고리, 페이지네이션 | 게시판 생성/목록/상세 API | `src/backend/src/routes/boards.ts`, `src/backend/src/routes/posts.ts` |
| 13 | 에러 처리와 검증 | 에러 미들웨어, 입력 유효성 | 통합 에러 핸들링 | `src/backend/src/middleware/` |

**순서 설계 의도:**
- 08: SQL과 서버를 각각 배운 뒤에 연결 — 한 번에 두 가지를 새로 배우지 않음
- 09→10: 일반 CRUD를 먼저 만든 뒤 인증이라는 특수 케이스로 확장
- 13: 기능이 다 만들어진 뒤 에러 처리를 다루면 "왜 필요한지" 명확

### Part 3: 프론트엔드 구축 (챕터 14~20)

| # | 챕터 | 핵심 개념 | 만드는 것 | 소스 위치 |
|---|------|----------|----------|----------|
| 14 | Vue.js 첫 걸음 | 컴포넌트, 반응성, 템플릿 | Vue 프로젝트 생성 + 첫 컴포넌트 | `src/frontend/` |
| 15 | 페이지와 라우팅 | Vue Router, SPA 개념 | 메인/로그인/회원가입 페이지 골격 | `src/frontend/src/views/`, `src/frontend/src/router/` |
| 16 | API 연동 기초 | fetch/axios, async/await | 서버에서 데이터 가져와 화면에 표시 | `src/frontend/src/api/` |
| 17 | 회원가입/로그인 화면 | 폼, v-model, 상태 관리 기초 | 회원가입/로그인 폼 구현 | `src/frontend/src/views/LoginView.vue`, `src/frontend/src/views/RegisterView.vue` |
| 18 | 인증 상태 관리 | Pinia, 토큰 저장, 라우트 가드 | 로그인 유지 + 비로그인 접근 차단 | `src/frontend/src/stores/`, `src/frontend/src/router/` |
| 19 | 게시판 목록과 생성 | 리스트 렌더링, 폼 제출 | 게시판 목록/생성 화면 | `src/frontend/src/views/BoardsView.vue` |
| 20 | 글쓰기와 상세보기 | 에디터, 동적 라우트 | 글 작성/목록/상세 화면 | `src/frontend/src/views/PostView.vue`, `src/frontend/src/views/PostDetailView.vue` |

**순서 설계 의도:**
- 14: 백엔드가 완성된 뒤 프론트 시작 — API가 이미 있으니 연동 시 백엔드 걱정 없음
- 16→17: API 연동 기초를 먼저 배운 뒤 실제 폼과 연결

### Part 4: 마무리와 배포 (챕터 21~24)

| # | 챕터 | 핵심 개념 | 만드는 것 | 소스 위치 |
|---|------|----------|----------|----------|
| 21 | UI 다듬기 | CSS 기초 복습, 반응형 | 전체 화면 스타일링 | `src/frontend/src/assets/`, `src/frontend/src/components/` |
| 22 | 통합 테스트 | 전체 흐름 점검, 디버깅 | 회원가입→로그인→글쓰기 풀 시나리오 | 전체 |
| 23 | 배포 준비 | 빌드, 환경변수, 프로덕션 설정 | 빌드 스크립트, .env 구성 | 프로젝트 루트 |
| 24 | 배포하기 | Vercel + Supabase, 배포 흐름 | SQLite→Supabase 마이그레이션 + Vercel 배포 | 프로젝트 루트 |

---

## 5. 진행 관리 시스템

### 5.1 상태 파일

#### progress.json (전체 진행)
```json
{
  "learner": "",
  "currentChapter": "01-environment-setup",
  "totalChapters": 24,
  "completedChapters": 0,
  "lastUpdated": "",
  "chapters": {
    "01-environment-setup": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": [],
      "description": "Node.js, npm, 터미널 기초, 프로젝트 구조 생성"
    }
  }
}
```

#### STATUS.md (챕터별 상세)
```markdown
---
chapter: "01-environment-setup"
status: "pending"
startedAt: null
completedAt: null
quizPassed: false
---

## 실습 체크리스트
- [ ] 항목 1
- [ ] 항목 2

## 퀴즈 결과
(미실시)
```

### 5.2 Claude Hook

커밋 시 자동 실행:

1. `progress.json`의 `currentChapter` 확인
2. 해당 챕터의 `sourceFiles` 존재 여부 체크
3. `STATUS.md` 갱신 (커밋에 포함된 파일 기준으로 체크리스트 업데이트)
4. 다음 챕터 소스가 현재 챕터 미완료 상태에서 포함되면 경고

커밋 메시지 형식: `chapter-XX: 작업 내용`

### 5.3 학습 흐름 자동 인식

학습자가 "시작", "다음", 또는 아무 학습 관련 요청을 하면:

| 현재 상태 | Claude 동작 |
|----------|------------|
| 이전 챕터 미완료 | 이전 챕터 퀴즈/실습 완료 안내 → 통과 시 자동으로 다음 챕터 시작 |
| 다음 챕터 미시작 | 자동으로 다음 챕터 시작, STATUS.md를 in_progress로 갱신 |
| 현재 챕터 진행 중 | 체크리스트 확인하여 이어서 진행 |
| 특정 챕터 번호 지정 | 이전 챕터 모두 완료 확인 후 해당 챕터 시작 |

---

## 6. 퀴즈 시스템

### 형식
- 각 챕터의 `quiz/index.html`로 생성
- 브라우저에서 인터랙티브하게 풀 수 있는 HTML 페이지

### 문제 유형
1. **다이어그램 기반** — Mermaid ERD/플로우차트를 보고 답하기 (개념 챕터)
2. **코드 기반** — 코드 스니펫의 결과 예측, 버그 찾기 (코딩 챕터)

### 통과 기준
- 퀴즈 정답 + 학습자가 정답의 이유를 직접 설명할 수 있어야 통과
- 오답 시: 해당 개념 재설명 후 재도전

---

## 7. 테이블 시각화

- **Mermaid ERD**: `docs/erd/` 디렉토리에 `.md` 파일로 저장
- **HTML 시각화**: 브라우저에서 테이블 구조 확인 가능한 HTML 페이지
- 테이블이 추가/변경될 때마다 ERD 갱신

---

## 8. CLAUDE.md 역할

CLAUDE.md는 이 프로젝트의 핵심 제어 파일로, 다음을 정의한다:

1. Claude의 역할 (숙련된 교육자)
2. 교육 원칙 5가지
3. 챕터 진행 흐름 (6단계)
4. 게이트 규칙 (퀴즈 통과 필수)
5. 커밋 규칙 (상태 파일 갱신 필수)
6. 학습 흐름 자동 인식 규칙
7. 기술 스택 정보

---

## 9. 배포

### 로컬 → 프로덕션 전환
- **로컬 개발**: SQLite (파일 기반, 설치 불필요, 빠른 피드백)
- **배포**: Supabase (PostgreSQL) + Vercel

### 배포 구성
- **Database**: Supabase 무료 티어 (관리형 PostgreSQL)
  - SQLite에서 작성한 SQL을 PostgreSQL로 마이그레이션하는 과정이 학습 포인트
  - "같은 SQL인데 DB가 바뀌면 뭐가 달라지나?" 체감
- **Frontend + Backend**: Vercel 무료 티어
  - Supabase를 외부 DB로 사용하므로 Vercel 서버리스에서도 동작
- 챕터 23에서 빌드/환경변수/Supabase 설정
- 챕터 24에서 Vercel 배포 + 라이브 URL 확인
