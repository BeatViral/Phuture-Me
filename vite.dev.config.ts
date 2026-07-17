import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";
import { defineConfig } from "vite";

const developmentEntry = readFileSync(new URL("./pages-entry.html", import.meta.url), "utf8");

export default defineConfig({
  plugins: [
    {
      name: "phuture-me-development-entry",
      apply: "serve",
      transformIndexHtml: {
        order: "pre",
        handler: () => developmentEntry,
      },
    },
    react(),
  ],
  base: "/",
});
