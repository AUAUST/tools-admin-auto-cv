import { defineConfig } from "@auaust/engrenage/config";
import {
  adapters,
  constants,
  createRolePreset,
  declarations,
  enums,
  errors,
  fixtures,
  index,
  ports,
  testsetup,
  types,
  utils,
} from "@auaust/engrenage/roles";

const operations = createRolePreset({
  name: "operations",
  exports: "named-match",
});

const roles = [
  index(),
  constants(),
  declarations(),
  types(),
  utils(),
  errors(),
  enums(),
  ports(),
  adapters(),
  operations(),
];

export default defineConfig({
  build: {
    outDir: "dist",
  },
  src: {
    baseline: "2026-11",
    bundled: true,
    roles,
    tsconfig: {
      lib: {
        append: ["DOM", "DOM.Iterable"],
      },
      types: ["vite/client"],
      compilerOptions: {
        jsx: "preserve",
        jsxImportSource: "solid-js",
      },
    },
  },
  tests: {
    roles: [...roles, fixtures(), testsetup()],
  },
  tooling: {
    roles,
    tsconfig: {
      inherits: undefined,
    },
  },
  agents: {
    preferred: ["claude"],
    attribution: false,
  },
});
