# My-Edu 프로젝트 스캐폴딩 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 비개발자 풀스택 학습 프로젝트의 인프라 구성 — CLAUDE.md, 진행 관리 시스템, 24개 챕터 구조, Claude hook, 퀴즈 템플릿을 모두 세팅한다.

**Architecture:** 단일 git 저장소에 학습 콘텐츠(chapters/)와 프로젝트 소스(src/)를 함께 관리. progress.json + 챕터별 STATUS.md로 진행 상태를 추적하며, Claude hook이 커밋 시 상태를 자동 검증한다.

**Tech Stack:** Node.js, TypeScript, Vue.js 3, Express, SQLite, Supabase, Vercel

---

### Task 1: .gitignore 생성

**Files:**
- Create: `.gitignore`

- [ ] **Step 1: .gitignore 파일 생성**

```gitignore
# Dependencies
node_modules/

# SQLite database files
*.db
*.sqlite
*.sqlite3

# Environment
.env
.env.local
.env.production

# Build output
dist/

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Logs
*.log
npm-debug.log*
```

- [ ] **Step 2: 커밋**

```bash
git add .gitignore
git commit -m "chore: .gitignore 추가"
```

---

### Task 2: CLAUDE.md 생성

**Files:**
- Create: `CLAUDE.md`

- [ ] **Step 1: CLAUDE.md 파일 생성**

```markdown
# My-Edu: 풀스택 웹개발 학습 프로젝트

## 프로젝트 개요
비개발자가 커뮤니티 게시판을 직접 만들며 풀스택 웹개발을 익히는 실습 코스.
학습자는 HTML/CSS 경험이 있고 Claude Code를 사용할 수 있다.

## 역할
너는 숙련된 웹개발 교육자다. 항상 한국어로 소통한다.
학습자를 자연스럽게 유도하며, 맥락 없이 갑자기 새 개념을 던지지 않는다.
비개발자가 이해할 수 있는 비유와 예시를 활용한다.

## 기술 스택
- Frontend: Vue.js 3 + TypeScript
- Backend: Node.js + Express + TypeScript
- Database (로컬): SQLite (better-sqlite3, ORM 없이 직접 SQL)
- Database (배포): Supabase (PostgreSQL)
- Deploy: Vercel + Supabase (무료 티어)

## 교육 원칙
1. **"왜?"부터** — 기술을 쓰기 전에 왜 필요한지 체감시킨다
2. **한 번에 하나** — 새 개념은 챕터당 1~2개만
3. **반드시 손으로 확인** — 코드를 직접 쓰고 결과를 눈으로 확인
4. **이해 못하면 넘어가지 않는다** — 학습자가 설명할 수 있어야 이해한 것
5. **숙련된 교육자처럼** — 자연스러운 순서로 유도, 맥락 없이 새 개념을 던지지 않는다

## 학습 시작 시 자동 동작
학습자가 "시작", "다음", 챕터 번호, 또는 아무 학습 관련 요청을 하면:
1. `progress.json`을 읽어 현재 상태를 파악한다
2. 현재 상태에 따라 분기:
   - **이전 챕터 미완료** → 이전 챕터 완료 안내 (퀴즈 통과 필수)
   - **다음 챕터 미시작** → 자동으로 다음 챕터 시작, STATUS.md를 `in_progress`로 갱신
   - **현재 챕터 진행 중** → 체크리스트 확인하여 이어서 진행
   - **특정 챕터 번호 지정** → 이전 챕터 모두 완료 확인 후 시작

## 챕터 진행 순서 (매 챕터 필수)
1. **동기부여** — 이전 챕터의 한계/불편함 보여주기
2. **개념 소개** — 비유와 함께 짧게 (핵심 1~2개만)
3. **따라하기** — 단계별 안내, 학습자가 직접 코드 작성
4. **스스로 해보기** — 변형 과제
5. **시각 확인** — ERD/브라우저/API 응답으로 결과 확인
6. **퀴즈 게이트** — HTML 퀴즈 페이지를 생성하여 브라우저에서 풀게 한다

## 게이트 규칙
- 챕터 N+1을 시작하려면 챕터 N의 STATUS.md가 `completed`이고 `quizPassed`가 `true`여야 한다
- 퀴즈 오답 시: 해당 개념을 다시 설명하고 재도전
- 학습자가 정답의 이유를 직접 설명할 수 있어야 통과
- **절대로 이 규칙을 우회하지 않는다**

## 커밋 규칙
- 커밋 전 반드시 `progress.json`과 해당 챕터 `STATUS.md`를 최신 상태로 갱신한다
- 커밋 메시지 형식: `chapter-XX: 작업 내용`
- `scripts/validate-progress.sh`가 Claude hook으로 커밋 전 자동 실행된다

## 퀴즈 형식
- 각 챕터의 `chapters/XX/quiz/index.html`로 생성
- Mermaid 다이어그램 + 코드 스니펫 기반 문제
- 브라우저에서 인터랙티브하게 풀기

## 테이블 시각화
- Mermaid ERD 또는 HTML로 테이블 구조 확인
- `docs/erd/`에 저장, 테이블 변경 시 갱신

## 상태 파일
- `progress.json`: 전체 진행 상태 + 챕터↔소스 매핑
- `chapters/XX/STATUS.md`: 챕터별 상세 진행 (체크리스트, 퀴즈 결과)

## 프로젝트 구조
```
my-edu/
├── CLAUDE.md
├── progress.json
├── chapters/                    # 학습 콘텐츠 (24개 챕터)
│   └── XX-chapter-name/
│       ├── README.md            # 개념 + 실습 가이드
│       ├── quiz/index.html      # 퀴즈 페이지
│       └── STATUS.md            # 완료 상태
├── src/                         # 실제 프로젝트 소스
│   ├── frontend/                # Vue.js + TypeScript
│   ├── backend/                 # Express + TypeScript
│   └── shared/                  # 프론트/백 공유 타입
├── docs/erd/                    # Mermaid ERD / HTML 시각화
└── scripts/                     # 유틸리티 스크립트
```

## 커리큘럼
### Part 1: 기초 다지기
- 01: 개발 환경 세팅 (Node.js, npm, 터미널)
- 02: 첫 번째 서버 (HTTP, Express)
- 03: TypeScript 맛보기 (타입, 인터페이스)
- 04: 데이터를 어디에 저장하지? (JSON 한계 체감)
- 05: SQL 기초와 SQLite (CREATE, INSERT, SELECT)
- 06: 테이블 설계의 기술 (관계, 정규화, FK)
- 07: SQL 심화 (JOIN, WHERE, 집계)

### Part 2: 백엔드 구축
- 08: DB와 서버 연결 (better-sqlite3)
- 09: REST API 설계 (CRUD)
- 10: 회원가입 API (해싱, 검증)
- 11: 로그인과 인증 (JWT, 미들웨어)
- 12: 게시판 API (카테고리, 페이지네이션)
- 13: 에러 처리와 검증

### Part 3: 프론트엔드 구축
- 14: Vue.js 첫 걸음 (컴포넌트, 반응성)
- 15: 페이지와 라우팅 (Vue Router)
- 16: API 연동 기초 (fetch, async/await)
- 17: 회원가입/로그인 화면 (폼, v-model)
- 18: 인증 상태 관리 (Pinia, 라우트 가드)
- 19: 게시판 목록과 생성
- 20: 글쓰기와 상세보기

### Part 4: 마무리와 배포
- 21: UI 다듬기 (CSS, 반응형)
- 22: 통합 테스트
- 23: 배포 준비 (빌드, 환경변수, Supabase)
- 24: 배포하기 (Vercel + Supabase)
```

- [ ] **Step 2: CLAUDE.md 내용이 올바른지 확인**

```bash
head -5 CLAUDE.md
```

Expected: `# My-Edu: 풀스택 웹개발 학습 프로젝트` 로 시작

- [ ] **Step 3: 커밋**

```bash
git add CLAUDE.md
git commit -m "docs: CLAUDE.md 학습 가이드 및 규칙 추가"
```

---

### Task 3: progress.json 생성

**Files:**
- Create: `progress.json`

- [ ] **Step 1: progress.json 생성 (전체 24개 챕터 매핑)**

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
    },
    "02-first-server": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": ["src/backend/src/index.js"],
      "description": "HTTP, 요청/응답, Express 기초, Hello World 서버"
    },
    "03-typescript-intro": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": ["src/backend/src/index.ts", "src/backend/tsconfig.json"],
      "description": "타입, 인터페이스, JS 서버를 TS로 전환"
    },
    "04-where-to-store-data": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": ["src/backend/src/data.json"],
      "description": "JSON 파일의 한계 체감, DB 필요성 인식"
    },
    "05-sql-basics": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": ["src/backend/src/db/schema.sql"],
      "description": "CREATE TABLE, INSERT, SELECT, SQLite 기초"
    },
    "06-table-design": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": ["src/backend/src/db/schema.sql", "docs/erd/community-board.md"],
      "description": "관계(1:N, N:M), 정규화, FK, ERD 설계"
    },
    "07-sql-advanced": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": ["src/backend/src/db/queries.sql"],
      "description": "JOIN, WHERE, ORDER BY, 집계 함수"
    },
    "08-db-server-connect": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": ["src/backend/src/db/index.ts"],
      "description": "better-sqlite3로 Express에서 SQLite 연동"
    },
    "09-rest-api-design": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": ["src/backend/src/routes/posts.ts"],
      "description": "REST 원칙, 라우팅, 게시글 CRUD API"
    },
    "10-signup-api": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": ["src/backend/src/routes/auth.ts", "src/backend/src/db/migrations/001-users.sql"],
      "description": "비밀번호 해싱, 입력 검증, POST /api/auth/register"
    },
    "11-login-auth": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": ["src/backend/src/routes/auth.ts", "src/backend/src/middleware/auth.ts"],
      "description": "세션/토큰, JWT, 로그인 API + 인증 미들웨어"
    },
    "12-board-api": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": ["src/backend/src/routes/boards.ts", "src/backend/src/routes/posts.ts", "src/backend/src/db/migrations/002-boards.sql"],
      "description": "게시판 생성/목록/상세, 카테고리, 페이지네이션"
    },
    "13-error-handling": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": ["src/backend/src/middleware/error.ts"],
      "description": "에러 미들웨어, 입력 유효성 검증, 통합 에러 핸들링"
    },
    "14-vue-intro": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": ["src/frontend/src/App.vue"],
      "description": "Vue.js 컴포넌트, 반응성, 템플릿, 프로젝트 생성"
    },
    "15-routing": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": ["src/frontend/src/router/index.ts", "src/frontend/src/views/HomeView.vue"],
      "description": "Vue Router, SPA 개념, 페이지 골격"
    },
    "16-api-integration": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": ["src/frontend/src/api/index.ts"],
      "description": "fetch/axios, async/await, 서버 데이터 표시"
    },
    "17-auth-views": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": ["src/frontend/src/views/LoginView.vue", "src/frontend/src/views/RegisterView.vue"],
      "description": "폼, v-model, 회원가입/로그인 폼 구현"
    },
    "18-auth-state": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": ["src/frontend/src/stores/auth.ts", "src/frontend/src/router/index.ts"],
      "description": "Pinia, 토큰 저장, 라우트 가드, 비로그인 접근 차단"
    },
    "19-board-views": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": ["src/frontend/src/views/BoardsView.vue", "src/frontend/src/views/BoardCreateView.vue"],
      "description": "리스트 렌더링, 폼 제출, 게시판 목록/생성 화면"
    },
    "20-post-views": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": ["src/frontend/src/views/PostListView.vue", "src/frontend/src/views/PostDetailView.vue", "src/frontend/src/views/PostCreateView.vue"],
      "description": "에디터, 동적 라우트, 글 작성/목록/상세 화면"
    },
    "21-ui-polish": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": ["src/frontend/src/assets/main.css"],
      "description": "CSS 기초 복습, 반응형, 전체 화면 스타일링"
    },
    "22-integration-test": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": [],
      "description": "전체 흐름 점검, 회원가입→로그인→글쓰기 시나리오"
    },
    "23-deploy-prep": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": ["vercel.json"],
      "description": "빌드, 환경변수, Supabase 설정, 프로덕션 구성"
    },
    "24-deploy": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null,
      "quizPassed": false,
      "sourceFiles": [],
      "description": "SQLite→Supabase 마이그레이션, Vercel 배포, 라이브 URL 확인"
    }
  }
}
```

- [ ] **Step 2: JSON 유효성 확인**

```bash
node -e "JSON.parse(require('fs').readFileSync('progress.json','utf8')); console.log('Valid JSON')"
```

Expected: `Valid JSON`

- [ ] **Step 3: 챕터 수 확인**

```bash
node -e "const p=JSON.parse(require('fs').readFileSync('progress.json','utf8')); console.log(Object.keys(p.chapters).length)"
```

Expected: `24`

- [ ] **Step 4: 커밋**

```bash
git add progress.json
git commit -m "chore: progress.json 전체 24개 챕터 진행 상태 추가"
```

---

### Task 4: 24개 챕터 디렉토리 + STATUS.md 생성

**Files:**
- Create: `chapters/01-environment-setup/STATUS.md` ~ `chapters/24-deploy/STATUS.md` (24개)
- Create: `scripts/init-chapters.sh`

- [ ] **Step 1: 챕터 초기화 스크립트 생성**

```bash
#!/bin/bash
# scripts/init-chapters.sh
# 24개 챕터 디렉토리와 STATUS.md를 생성하는 스크립트

CHAPTERS=(
  "01-environment-setup:Node.js, npm, 터미널 기초, 프로젝트 구조 생성"
  "02-first-server:HTTP, 요청/응답, Express 기초, Hello World 서버"
  "03-typescript-intro:타입, 인터페이스, JS 서버를 TS로 전환"
  "04-where-to-store-data:JSON 파일의 한계 체감, DB 필요성 인식"
  "05-sql-basics:CREATE TABLE, INSERT, SELECT, SQLite 기초"
  "06-table-design:관계(1:N, N:M), 정규화, FK, ERD 설계"
  "07-sql-advanced:JOIN, WHERE, ORDER BY, 집계 함수"
  "08-db-server-connect:better-sqlite3로 Express에서 SQLite 연동"
  "09-rest-api-design:REST 원칙, 라우팅, 게시글 CRUD API"
  "10-signup-api:비밀번호 해싱, 입력 검증, 회원가입 API"
  "11-login-auth:세션/토큰, JWT, 로그인 API + 인증 미들웨어"
  "12-board-api:게시판 생성/목록/상세, 카테고리, 페이지네이션"
  "13-error-handling:에러 미들웨어, 입력 유효성 검증, 통합 에러 핸들링"
  "14-vue-intro:Vue.js 컴포넌트, 반응성, 템플릿, 프로젝트 생성"
  "15-routing:Vue Router, SPA 개념, 페이지 골격"
  "16-api-integration:fetch/axios, async/await, 서버 데이터 표시"
  "17-auth-views:폼, v-model, 회원가입/로그인 폼 구현"
  "18-auth-state:Pinia, 토큰 저장, 라우트 가드, 비로그인 접근 차단"
  "19-board-views:리스트 렌더링, 폼 제출, 게시판 목록/생성 화면"
  "20-post-views:에디터, 동적 라우트, 글 작성/목록/상세 화면"
  "21-ui-polish:CSS 기초 복습, 반응형, 전체 화면 스타일링"
  "22-integration-test:전체 흐름 점검, 회원가입→로그인→글쓰기 시나리오"
  "23-deploy-prep:빌드, 환경변수, Supabase 설정, 프로덕션 구성"
  "24-deploy:SQLite→Supabase 마이그레이션, Vercel 배포"
)

for entry in "${CHAPTERS[@]}"; do
  IFS=':' read -r name desc <<< "$entry"
  dir="chapters/$name"
  mkdir -p "$dir/quiz"

  cat > "$dir/STATUS.md" << STATUSEOF
---
chapter: "$name"
status: "pending"
startedAt: null
completedAt: null
quizPassed: false
---

## 실습 체크리스트
(챕터 시작 시 생성됨)

## 퀴즈 결과
(미실시)
STATUSEOF

  echo "Created: $dir"
done

echo "Done: ${#CHAPTERS[@]} chapters created."
```

- [ ] **Step 2: 스크립트 실행**

```bash
chmod +x scripts/init-chapters.sh
bash scripts/init-chapters.sh
```

Expected: `Done: 24 chapters created.`

- [ ] **Step 3: 디렉토리 확인**

```bash
ls chapters/ | wc -l
```

Expected: `24`

- [ ] **Step 4: STATUS.md 내용 확인**

```bash
cat chapters/01-environment-setup/STATUS.md
```

Expected: YAML frontmatter에 `chapter: "01-environment-setup"`, `status: "pending"` 포함

- [ ] **Step 5: 커밋**

```bash
git add chapters/ scripts/
git commit -m "chore: 24개 챕터 디렉토리 및 STATUS.md 초기화"
```

---

### Task 5: 퀴즈 HTML 템플릿 생성

**Files:**
- Create: `chapters/templates/quiz-template.html`

- [ ] **Step 1: 퀴즈 템플릿 HTML 파일 생성**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>퀴즈 - {{CHAPTER_TITLE}}</title>
  <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      background: #f8f9fa;
      color: #333;
    }
    h1 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: #2c3e50;
    }
    .subtitle {
      color: #666;
      margin-bottom: 2rem;
      font-size: 0.9rem;
    }
    .question {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .question h2 {
      font-size: 1.1rem;
      margin-bottom: 1rem;
      color: #2c3e50;
    }
    .question pre {
      background: #1e1e1e;
      color: #d4d4d4;
      padding: 1rem;
      border-radius: 8px;
      overflow-x: auto;
      margin: 1rem 0;
      font-size: 0.85rem;
    }
    .mermaid {
      background: white;
      text-align: center;
      margin: 1rem 0;
    }
    .options {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .options li {
      padding: 0.75rem 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .options li:hover {
      border-color: #3498db;
      background: #ebf5fb;
    }
    .options li.correct {
      border-color: #27ae60;
      background: #eafaf1;
    }
    .options li.wrong {
      border-color: #e74c3c;
      background: #fdedec;
    }
    .options li.disabled {
      pointer-events: none;
      opacity: 0.6;
    }
    .feedback {
      margin-top: 0.75rem;
      padding: 0.75rem;
      border-radius: 8px;
      font-size: 0.9rem;
      display: none;
    }
    .feedback.show { display: block; }
    .feedback.correct-feedback {
      background: #eafaf1;
      color: #27ae60;
      border: 1px solid #27ae60;
    }
    .feedback.wrong-feedback {
      background: #fdedec;
      color: #e74c3c;
      border: 1px solid #e74c3c;
    }
    .score {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      display: none;
    }
    .score h2 { font-size: 1.3rem; margin-bottom: 1rem; }
    .score .result {
      font-size: 2rem;
      font-weight: bold;
      margin: 1rem 0;
    }
    .score .pass { color: #27ae60; }
    .score .fail { color: #e74c3c; }
  </style>
</head>
<body>
  <h1>{{CHAPTER_TITLE}} 퀴즈</h1>
  <p class="subtitle">챕터 {{CHAPTER_NUM}}에서 배운 내용을 확인합니다.</p>

  <div id="quiz-container">
    <!-- 퀴즈 문제들이 여기에 동적으로 생성됩니다 -->
  </div>

  <div class="score" id="score-board">
    <h2>퀴즈 결과</h2>
    <div class="result" id="score-text"></div>
    <p id="score-message"></p>
  </div>

  <script>
    mermaid.initialize({ startOnLoad: true, theme: 'neutral' });

    // 퀴즈 데이터 - 챕터별로 이 부분을 교체합니다
    const quizData = [
      // 예시: 다이어그램 기반 문제
      // {
      //   type: 'diagram',
      //   question: '아래 ERD에서 users와 posts의 관계는?',
      //   diagram: 'erDiagram\n  USERS ||--o{ POSTS : writes',
      //   options: ['1:1', '1:N', 'N:M', '관계 없음'],
      //   answer: 1,
      //   explanation: 'users 한 명이 여러 posts를 작성할 수 있으므로 1:N 관계입니다.'
      // },
      // 예시: 코드 기반 문제
      // {
      //   type: 'code',
      //   question: '다음 SQL의 실행 결과는?',
      //   code: 'SELECT COUNT(*) FROM users WHERE age > 20;',
      //   options: ['모든 사용자 수', '20세 초과 사용자 수', '에러 발생', '0'],
      //   answer: 1,
      //   explanation: 'WHERE age > 20 조건에 맞는 행의 수를 COUNT(*)로 세어 반환합니다.'
      // }
    ];

    const container = document.getElementById('quiz-container');
    let answered = 0;

    quizData.forEach((q, i) => {
      const div = document.createElement('div');
      div.className = 'question';
      div.id = `q${i}`;

      let contentHTML = `<h2>Q${i + 1}. ${q.question}</h2>`;

      if (q.type === 'diagram' && q.diagram) {
        contentHTML += `<div class="mermaid">${q.diagram}</div>`;
      }
      if (q.type === 'code' && q.code) {
        contentHTML += `<pre><code>${q.code}</code></pre>`;
      }

      contentHTML += '<ul class="options">';
      q.options.forEach((opt, j) => {
        contentHTML += `<li onclick="checkAnswer(${i}, ${j})">${opt}</li>`;
      });
      contentHTML += '</ul>';
      contentHTML += `<div class="feedback" id="feedback-${i}"></div>`;

      div.innerHTML = contentHTML;
      container.appendChild(div);
    });

    function checkAnswer(qIndex, selected) {
      const q = quizData[qIndex];
      const questionDiv = document.getElementById(`q${qIndex}`);
      const options = questionDiv.querySelectorAll('.options li');
      const feedback = document.getElementById(`feedback-${qIndex}`);

      options.forEach((opt, j) => {
        opt.classList.add('disabled');
        if (j === q.answer) opt.classList.add('correct');
        if (j === selected && j !== q.answer) opt.classList.add('wrong');
      });

      if (selected === q.answer) {
        feedback.className = 'feedback show correct-feedback';
        feedback.textContent = `정답! ${q.explanation}`;
      } else {
        feedback.className = 'feedback show wrong-feedback';
        feedback.textContent = `오답. ${q.explanation}`;
      }

      answered++;
      if (answered === quizData.length) showScore();
    }

    function showScore() {
      const correct = document.querySelectorAll('.options li.correct').length;
      const total = quizData.length;
      const scoreBoard = document.getElementById('score-board');
      const scoreText = document.getElementById('score-text');
      const scoreMsg = document.getElementById('score-message');
      const passed = correct === total;

      scoreBoard.style.display = 'block';
      scoreText.textContent = `${correct} / ${total}`;
      scoreText.className = `result ${passed ? 'pass' : 'fail'}`;
      scoreMsg.textContent = passed
        ? '모든 문제를 맞혔습니다! Claude에게 "퀴즈 통과"라고 알려주세요.'
        : '틀린 문제가 있습니다. Claude에게 틀린 부분을 질문해보세요.';
    }
  </script>
</body>
</html>
```

- [ ] **Step 2: 브라우저에서 템플릿 열어 확인**

```bash
open chapters/templates/quiz-template.html
```

Expected: 빈 퀴즈 페이지가 브라우저에서 정상 렌더링 (quizData가 비어있으므로 문제 없이 빈 화면)

- [ ] **Step 3: 커밋**

```bash
git add chapters/templates/
git commit -m "chore: 퀴즈 HTML 템플릿 추가"
```

---

### Task 6: 진행 상태 검증 스크립트 생성

**Files:**
- Create: `scripts/validate-progress.sh`

- [ ] **Step 1: 검증 스크립트 생성**

```bash
#!/bin/bash
# scripts/validate-progress.sh
# 커밋 전 progress.json과 STATUS.md의 일관성을 검증하는 스크립트
# Claude hook에서 호출됨

set -e

PROGRESS_FILE="progress.json"
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

if [ ! -f "$PROGRESS_FILE" ]; then
  echo -e "${RED}[ERROR] progress.json이 존재하지 않습니다.${NC}"
  exit 1
fi

# progress.json 유효성 확인
if ! node -e "JSON.parse(require('fs').readFileSync('$PROGRESS_FILE','utf8'))" 2>/dev/null; then
  echo -e "${RED}[ERROR] progress.json이 유효한 JSON이 아닙니다.${NC}"
  exit 1
fi

# 현재 챕터 확인
CURRENT=$(node -e "const p=JSON.parse(require('fs').readFileSync('$PROGRESS_FILE','utf8')); console.log(p.currentChapter)")
echo -e "${GREEN}[INFO] 현재 챕터: $CURRENT${NC}"

# 현재 챕터 STATUS.md 확인
STATUS_FILE="chapters/$CURRENT/STATUS.md"
if [ ! -f "$STATUS_FILE" ]; then
  echo -e "${YELLOW}[WARN] $STATUS_FILE 가 존재하지 않습니다.${NC}"
else
  STATUS=$(grep "^status:" "$STATUS_FILE" | head -1 | sed 's/status: *"\(.*\)"/\1/')
  echo -e "${GREEN}[INFO] 챕터 상태: $STATUS${NC}"
fi

# 스테이지된 파일 중 다음 챕터 소스가 포함되어 있는지 확인
STAGED_FILES=$(git diff --cached --name-only 2>/dev/null || true)

if [ -n "$STAGED_FILES" ]; then
  # progress.json이 스테이지에 포함되어 있는지 확인
  if echo "$STAGED_FILES" | grep -q "progress.json"; then
    echo -e "${GREEN}[OK] progress.json이 커밋에 포함되어 있습니다.${NC}"
  else
    echo -e "${YELLOW}[WARN] progress.json이 커밋에 포함되어 있지 않습니다. 상태를 갱신했는지 확인하세요.${NC}"
  fi

  # STATUS.md가 스테이지에 포함되어 있는지 확인
  if echo "$STAGED_FILES" | grep -q "STATUS.md"; then
    echo -e "${GREEN}[OK] STATUS.md가 커밋에 포함되어 있습니다.${NC}"
  else
    echo -e "${YELLOW}[WARN] STATUS.md가 커밋에 포함되어 있지 않습니다. 챕터 상태를 갱신했는지 확인하세요.${NC}"
  fi
fi

echo -e "${GREEN}[OK] 진행 상태 검증 완료${NC}"
```

- [ ] **Step 2: 실행 권한 부여 및 테스트**

```bash
chmod +x scripts/validate-progress.sh
bash scripts/validate-progress.sh
```

Expected: `[INFO] 현재 챕터: 01-environment-setup` 및 `[OK] 진행 상태 검증 완료`

- [ ] **Step 3: 커밋**

```bash
git add scripts/validate-progress.sh
git commit -m "chore: 진행 상태 검증 스크립트 추가"
```

---

### Task 7: Claude Hook 설정

**Files:**
- Create: `.claude/settings.local.json`

- [ ] **Step 1: .claude 디렉토리 생성 및 hook 래퍼 스크립트 작성**

`scripts/check-commit-hook.sh` 파일을 생성한다:

```bash
#!/bin/bash
# scripts/check-commit-hook.sh
# Claude PreToolUse hook에서 호출됨
# stdin으로 Bash 도구의 입력(JSON)을 받아 git commit 여부를 확인

INPUT=$(cat)
if echo "$INPUT" | grep -q "git commit"; then
  bash scripts/validate-progress.sh
fi
```

- [ ] **Step 2: .claude/settings.local.json 작성**

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash scripts/check-commit-hook.sh"
          }
        ]
      }
    ]
  }
}
```

- [ ] **Step 3: 실행 권한 부여**

```bash
chmod +x scripts/check-commit-hook.sh
```

- [ ] **Step 4: 설정 파일 확인**

```bash
cat .claude/settings.local.json
```

Expected: `hooks` 키 아래 `PreToolUse` 배열에 `Bash` matcher가 존재

- [ ] **Step 5: 커밋**

```bash
git add .claude/settings.local.json scripts/check-commit-hook.sh
git commit -m "chore: Claude hook 설정 추가 (커밋 시 진행 상태 검증)"
```

---

### Task 8: docs/erd 디렉토리 구조 생성

**Files:**
- Create: `docs/erd/.gitkeep`

- [ ] **Step 1: 디렉토리 및 .gitkeep 생성**

```bash
mkdir -p docs/erd
touch docs/erd/.gitkeep
```

- [ ] **Step 2: 커밋**

```bash
git add docs/erd/.gitkeep
git commit -m "chore: docs/erd 디렉토리 구조 추가"
```

---

### Task 9: 최종 검증

- [ ] **Step 1: 전체 구조 확인**

```bash
find . -not -path './.git/*' -not -path './node_modules/*' | head -80
```

Expected output에 포함되어야 할 경로:
- `./CLAUDE.md`
- `./progress.json`
- `./chapters/01-environment-setup/STATUS.md`
- `./chapters/24-deploy/STATUS.md`
- `./chapters/templates/quiz-template.html`
- `./scripts/validate-progress.sh`
- `./scripts/check-commit-hook.sh`
- `./scripts/init-chapters.sh`
- `./.claude/settings.local.json`
- `./docs/erd/.gitkeep`

- [ ] **Step 2: progress.json과 챕터 디렉토리 수 일치 확인**

```bash
CHAPTERS_JSON=$(node -e "const p=JSON.parse(require('fs').readFileSync('progress.json','utf8')); console.log(Object.keys(p.chapters).length)")
CHAPTERS_DIR=$(ls chapters/ | grep -v templates | wc -l | tr -d ' ')
echo "progress.json: $CHAPTERS_JSON, directories: $CHAPTERS_DIR"
```

Expected: `progress.json: 24, directories: 24`

- [ ] **Step 3: 검증 스크립트 정상 실행 확인**

```bash
bash scripts/validate-progress.sh
```

Expected: `[OK] 진행 상태 검증 완료`

- [ ] **Step 4: git log 확인**

```bash
git log --oneline
```

Expected: 모든 커밋이 순서대로 존재:
1. `docs: my-edu 풀스택 웹개발 학습 프로젝트 설계서 추가`
2. `chore: .gitignore 추가`
3. `docs: CLAUDE.md 학습 가이드 및 규칙 추가`
4. `chore: progress.json 전체 24개 챕터 진행 상태 추가`
5. `chore: 24개 챕터 디렉토리 및 STATUS.md 초기화`
6. `chore: 퀴즈 HTML 템플릿 추가`
7. `chore: 진행 상태 검증 스크립트 추가`
8. `chore: Claude hook 설정 추가`
9. `chore: docs/erd 디렉토리 구조 추가`
