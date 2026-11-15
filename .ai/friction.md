# Agent friction

- engrenage PreToolUse Bash hook: ran a command after `cd` into `node_modules/@auaust/engrenage` — hook resolves the nearest package.json, finds engrenage itself and fails on its missing `bin/engrenage/executable.ts`, blocking every Bash call until the session cwd reset
- Edit tool: replacing YAML text containing narrow no-break space before colon — match failed; replaced lines with a Python script
- ccd_session_mgmt list_sessions: looked for a way to read another session's transcript — no read tool; found it by grepping `customTitle` in ~/.claude/projects/<project>/*.jsonl
- npx engrenage: ran gate via npx — EBADDEVENGINES (project requires pnpm); used `pnpm exec engrenage`
