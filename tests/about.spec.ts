import { test, expect } from "@playwright/test";

test.describe("About Page", () => {
  test("renders about page correctly", async ({ page }) => {
    await page.goto("/about");

    await expect(page.locator("h1")).toContainText("Erich Champion");
    await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
  });

  test("displays work history section", async ({ page }) => {
    await page.goto("/about");

    await expect(page.getByRole("heading", { name: "Work History" })).toBeVisible();
  });

  test("displays job entries", async ({ page }) => {
    await page.goto("/about");

    const jobs = page.locator("main h3");
    await expect(jobs.first()).toBeVisible();
    expect(await jobs.count()).toBeGreaterThan(0);
  });

  test("displays bio text", async ({ page }) => {
    await page.goto("/about");

    await expect(page.locator("p").first()).toBeVisible();
  });
});
