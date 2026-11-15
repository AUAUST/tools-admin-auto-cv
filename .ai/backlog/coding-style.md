# coding-style

## 1. `src` breaks engrenage lint and structure rules

- why: ~130 `engrenage eslint` errors (import specifiers and order, concise arrows, `utils` role exports, interfaces), `src/assets`, `components`, `contexts`, `styles` unclassified, import cycle `FlagsContext → ResumeContext → label → FlagsContext`
- want: domains declared in `.domain.json`, then code fixed to the rules
- done: `engrenage gate` passes on `src`; blocked on [engrenage.1](engrenage.md) for the alias fixes
