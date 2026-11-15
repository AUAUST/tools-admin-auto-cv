# engrenage

## 1. Generated `#…` aliases target only `*.ts`, so `.tsx` modules cannot be imported through them

- why: `package.json#imports` and tsconfig `paths` map `#components/*` to `./src/components/*.ts`; components, contexts and `utils/label` are `.tsx`, yet `auaust/import-specifiers` demands those aliases (46 errors)
- want: aliases resolving every extension of `typescript.files`, and no alias demanded for `.css` side-effect imports (`#styles/index` for `./styles/index.css`)
- done: `#components/Page` resolves to `src/components/Page.tsx`
