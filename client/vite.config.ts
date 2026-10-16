/// <reference types="vitest/config" />

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    clearMocks: true,
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary", "lcov"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.ts", "src/**/*.d.ts"],
      thresholds: {
        lines: 1,
        branches: 20,

        "src/lib/time.ts": {
          lines: 90,
          branches: 90,
        },

        "src/api/invoices.ts": {
          lines: 90,
          branches: 90,
        },

        "src/lib/utils.ts": {
          lines: 60,
          branches: 90,
        },
      },
    },
  },
});
