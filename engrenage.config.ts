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

const sourceRoles = roles;

export default defineConfig({
  src: {
    baseline: "2026-11",
    roles: sourceRoles,
  },
  tests: {
    roles: [...roles, fixtures(), testsetup()],
  },
  scripts: {
    roles,
    tsconfig: {},
  },
  tooling: {
    roles,
  },
  agents: {
    preferred: ["claude"],
    attribution: false,
  },
});
