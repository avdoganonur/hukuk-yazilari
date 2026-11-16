#!/bin/bash
# Kullanım (hukuk-yazilari klasöründen): bash ops/yayinla.sh "mesaj" slug1 slug2 ...
# Taslakları yazilar-100'e kaydeder, verilen slugları origin/main'e taşır ve push eder.
set -e
cd /home/claude/hukuk-yazilari
git config user.name "Onur Doğan"
git config user.email "343915022+avdoganonur@users.noreply.github.com"
MSG="$1"; shift
TRAIL="

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HH2JtNkGYcqMPfGJcr9wgY"
git add -A content && (git commit -qm "Taslak: denetim sürüyor$TRAIL" || true)
git push -q origin yazilar-100
git fetch -q origin main:refs/remotes/origin/main
W=$(mktemp -d)
git worktree add -q --detach "$W" origin/main
for s in "$@"; do git show yazilar-100:content/yazilar/$s.md > "$W/content/yazilar/$s.md"; done
cd "$W"
python3 build.py --kontrol 2>&1 | tail -3
git add content/yazilar
git commit -qm "$MSG$TRAIL"
git push -q origin HEAD:main
cd /home/claude/hukuk-yazilari && git worktree remove --force "$W"
git fetch -q origin main:refs/remotes/origin/main
git log -1 --format='%h %an %s' origin/main
