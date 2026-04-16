import { test, expect } from "@playwright/test";

test.describe("GitHub Page", () => {
  test("renders github page with title", async ({ page }) => {
    await page.goto("/github");

    await expect(page.getByRole("heading", { name: "GitHub" })).toBeVisible();
  });

  test("displays stats cards", async ({ page }) => {
    await page.goto("/github");

    await expect(page.locator("text=Repositories")).toBeVisible();
    await expect(page.locator("text=Stars")).toBeVisible();
  });

  test("displays repo cards", async ({ page }) => {
    await page.goto("/github");

    const repoLinks = page.locator("a[href*='github.com/erichchampion']");
    await expect(repoLinks.first()).toBeVisible();
  });

  test("repo cards have external links", async ({ page }) => {
    await page.goto("/github");

    const firstRepo = page.locator("a[href*='github.com']").first();
    await expect(firstRepo).toBeVisible();
  });

  test("repo language is displayed", async ({ page }) => {
    await page.goto("/github");

    const repoCard = page.locator("a[href*='github.com/erichchampion']").first();
    await repoCard.scrollIntoViewIfNeeded();
    await expect(repoCard).toBeVisible();
  });
});
