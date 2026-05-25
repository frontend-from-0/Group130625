import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve(__dirname, ".env.local") });
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    baseURL: "http://localhost:4005",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:4005",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "setup",
      testDir: "./e2e/setup",
      timeout: 60_000,
    },
    {
      name: "chromium-logged-in",
      testDir: "./e2e/logged-in",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "e2e/.auth/admin.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "chromium-logged-out",
      testDir: "./e2e/logged-out",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
