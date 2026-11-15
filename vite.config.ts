import tailwind from "@tailwindcss/vite";
import solid from "vite-plugin-solid";

import { defineViteConfig } from "@auaust/engrenage/vite";

export default defineViteConfig(undefined, {
  plugins: [tailwind(), solid()],
  optimizeDeps: {
    include: ["solid-markdown > micromark", "solid-markdown > unified"],
  },
});
