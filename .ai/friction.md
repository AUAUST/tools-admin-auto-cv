# Agent friction

- engrenage PreToolUse Bash hook: ran a command after `cd` into `node_modules/@auaust/engrenage` — hook resolves the nearest package.json, finds engrenage itself and fails on its missing `bin/engrenage/executable.ts`, blocking every Bash call until the session cwd reset
