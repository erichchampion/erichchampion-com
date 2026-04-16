import { test, expect } from "@playwright/test";

test.describe("Projects Page", () => {
  test("renders projects page with title", async ({ page }) => {
    await page.goto("/projects");

    await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
  });

  test("displays filter buttons", async ({ page }) => {
    await page.goto("/projects");

    await expect(page.getByRole("button", { name: "All" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Apps" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Books" })).toBeVisible();
  });

  test("displays project cards", async ({ page }) => {
    await page.goto("/projects");

    await expect(page.locator("h3", { hasText: "Sessions-AI" })).toBeVisible();
    await expect(page.locator("h3", { hasText: "Building AI Coding Assistants" })).toBeVisible();
  });

  test("filter functionality works", async ({ page }) => {
    await page.goto("/projects");

    await page.getByRole("button", { name: "Apps" }).click();
    await expect(page.locator("h3", { hasText: "Sessions-AI" })).toBeVisible();
    await expect(page.locator("h3", { hasText: "Building AI Coding Assistants" })).not.toBeVisible();

    await page.getByRole("button", { name: "Books" }).click();
    await expect(page.locator("h3", { hasText: "Building AI Coding Assistants" })).toBeVisible();

    await page.getByRole("button", { name: "All" }).click();
    await expect(page.locator("h3", { hasText: "Sessions-AI" })).toBeVisible();
  });

  test("project cards have links", async ({ page }) => {
    await page.goto("/projects");

    const sessionsAI = page.locator("h3", { hasText: "Sessions-AI" }).locator("..");
    await expect(sessionsAI.locator("text=App Store")).toBeVisible();
    await expect(sessionsAI.locator("text=GitHub")).toBeVisible();
  });
});
