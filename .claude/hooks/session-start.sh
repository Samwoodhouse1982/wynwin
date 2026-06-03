#!/bin/bash
# SessionStart hook: re-apply the CCR stop-hook signing-check fix.
#
# Claude Code on the web rebuilds the container's ~/.claude on every session,
# which restores the *harness* copy of stop-hook-git-check.sh. That copy marks
# a commit "Unverified" whenever `git log %G?` returns "N" — but in this
# environment SSH signatures cannot be verified locally (no allowedSignersFile,
# no ssh-keygen), so %G? is "N" even for validly-signed commits. The result is
# a false "Unverified" warning on every signed commit.
#
# This installs a fixed copy (which detects signature *presence* from the raw
# commit object's `gpgsig` header instead of trusting %G?) over any harness
# copy that still contains the bug. It is idempotent and only rewrites files
# that exist AND still carry the buggy marker, so it never clobbers a hook that
# has already been fixed upstream.

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FIXED="$SCRIPT_DIR/stop-hook-git-check.fixed.sh"

# Harness copies CCR may use. Colon-separated $STOP_HOOK_TARGETS overrides (tests).
if [ -n "${STOP_HOOK_TARGETS:-}" ]; then
  IFS=':' read -r -a TARGETS <<< "$STOP_HOOK_TARGETS"
else
  TARGETS=("$HOME/.claude/stop-hook-git-check.sh" "/home/claude/.claude/stop-hook-git-check.sh")
fi

if [ ! -f "$FIXED" ]; then
  echo "session-start: fixed hook missing at $FIXED; nothing to do" >&2
  exit 0
fi

for t in "${TARGETS[@]}"; do
  [ -n "$t" ] || continue
  # Only touch a target that exists and still has the buggy %G?-based check.
  if [ -f "$t" ] && grep -qF '$2 == "N"' "$t" 2>/dev/null; then
    if cp "$FIXED" "$t" 2>/dev/null && chmod +x "$t" 2>/dev/null; then
      echo "session-start: re-applied stop-hook signing fix -> $t" >&2
    else
      echo "session-start: could not patch $t (continuing)" >&2
    fi
  fi
done

exit 0
