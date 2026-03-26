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
