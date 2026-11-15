# coding-style

## 1. `src` breaks engrenage lint and structure rules

- why: ~130 `engrenage eslint` errors (import specifiers and order, concise arrows, `utils` role exports, interfaces), `src/assets`, `components`, `contexts`, `styles` unclassified, import cycle `FlagsContext → ResumeContext → label → FlagsContext`
- want: domains declared in `.domain.json`, then code fixed to the rules
- done: `engrenage gate` passes on `src`; blocked on [engrenage.1](engrenage.md) for the alias fixes

## 2. `prefer-const` autofix turns Solid `let` refs into `const`, which compile to a ref callback call and crash at runtime

- why: `ea9bc91` rewrote `let doc` to `const doc` in `Document.tsx`; Solid then called `doc(el)` → `fn is not a function`; lint and typecheck both passed
- want: a lint rule rejecting variable refs (`ref={identifier}` on a non-function binding), so refs use a signal setter or callback
- done: reintroducing `const x: HTMLElement = undefined!; <div ref={x}>` fails lint
