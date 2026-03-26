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
