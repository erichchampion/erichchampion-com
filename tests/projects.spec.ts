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

    const cards = page.locator("main h3");
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test("filter functionality works", async ({ page }) => {
    await page.goto("/projects");

    const cards = page.locator("main h3");
    const appsButton = page.getByRole("button", { name: "Apps" });
    const booksButton = page.getByRole("button", { name: "Books" });
    const allButton = page.getByRole("button", { name: "All" });

    await expect(cards.first()).toBeVisible();
    const allCount = await cards.count();
    expect(allCount).toBeGreaterThan(0);

    await appsButton.click();
    await expect(appsButton).toHaveAttribute("aria-pressed", "true");
    const appsCount = await cards.count();

    await booksButton.click();
    await expect(booksButton).toHaveAttribute("aria-pressed", "true");
    const booksCount = await cards.count();

    await allButton.click();
    await expect(allButton).toHaveAttribute("aria-pressed", "true");
    await expect(cards).toHaveCount(allCount);

    expect(appsCount + booksCount).toBe(allCount);
  });

  test("project cards have links", async ({ page }) => {
    await page.goto("/projects");

    const cardLinks = page.locator('main a[target="_blank"]');
    await expect(cardLinks.first()).toBeVisible();
    expect(await cardLinks.count()).toBeGreaterThan(0);
  });
});
