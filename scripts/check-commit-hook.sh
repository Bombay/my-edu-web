#!/bin/bash
# scripts/check-commit-hook.sh
# Claude PreToolUse hook에서 호출됨
# stdin으로 Bash 도구의 입력(JSON)을 받아 git commit 여부를 확인

INPUT=$(cat)
if echo "$INPUT" | grep -q "git commit"; then
  bash scripts/validate-progress.sh
fi
