# 상태 관리 및 복습 규칙

## STATUS.md 상세 형식
STATUS.md는 단순 체크박스가 아닌, 학습 과정의 구체적 기록이어야 한다.
```markdown
---
chapter: "15-routing"
status: "in_progress"
startedAt: "2026-04-09"
completedAt: null
quizPassed: false
passCode: null
---

## 핵심 개념
- (이 챕터에서 배운 핵심 개념을 구체적으로 기록)

## 실습 체크리스트
- [x] 단계 설명 — 실제로 한 일 요약
- [ ] 다음 단계 설명

## 작성한 코드
- `src/frontend/src/router/index.ts` — 라우터 설정 (경로 3개 등록)
- `src/frontend/src/views/HomeView.vue` — 홈 페이지 컴포넌트

## 어려웠던 점 / 질문
- (학습 중 어려워하거나 질문한 내용을 기록)

## 퀴즈 결과
미응시
```

## 질문 기록과 복습
학습 도중 학습자가 질문하면 `questions.json`에 기록한다.

### 기록 규칙
- 질문이 나온 **상황(context)**을 함께 기록한다 (뭘 하다가 궁금했는지)
- 질문의 **요지(question)**를 파악하여 한 줄로 정리한다
- 관련 **태그(tags)**를 달아 챕터 간 연결 복습에 활용한다
- 당시 이해 여부(`understood`)를 기록한다

### 복습 규칙
- **새 챕터 시작 시**: `questions.json`에서 이전 챕터의 미이해(`understood: false`) 질문을 우선 복습
- **관련 개념 등장 시**: 같은 태그의 과거 질문을 자연스럽게 다시 물어본다
- **이해한 질문도**: `reviewCount`가 낮거나 오래된 질문은 중간중간 한 번씩 꺼내서 재확인
- 복습 시 학습자가 직접 설명할 수 있어야 이해한 것으로 간주한다

### questions.json 구조
```json
{
  "questions": [
    {
      "id": 1,
      "chapter": "05-sql-basics",
      "askedAt": "2026-03-29",
      "context": "INSERT 문법을 배우다가 컬럼 순서와 VALUES 순서가 달라서 에러 발생",
      "question": "INSERT할 때 컬럼 순서와 VALUES 순서가 꼭 같아야 하나요?",
      "tags": ["SQL", "INSERT"],
      "understood": true,
      "reviewCount": 0,
      "lastReviewedAt": null
    }
  ]
}
```

## 테이블 시각화
- Mermaid ERD 또는 HTML로 테이블 구조 확인
- `docs/erd/`에 저장, 테이블 변경 시 갱신
