import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("header navigation links are visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("header")).toContainText("Erich Champion");
    await expect(page.getByRole("navigation").getByRole("link", { name: "About" })).toBeVisible();
    await expect(page.getByRole("navigation").getByRole("link", { name: "Projects" })).toBeVisible();
    await expect(page.getByRole("navigation").getByRole("link", { name: "GitHub" })).toBeVisible();
  });

  test("footer navigation links are visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("contentinfo").getByRole("link", { name: "Home" })).toBeVisible();
    await expect(page.getByRole("contentinfo").getByRole("link", { name: "About" })).toBeVisible();
    await expect(page.getByRole("contentinfo").getByRole("link", { name: "Projects" })).toBeVisible();
  });

  test("footer has copyright", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("footer")).toContainText("©");
    await expect(page.locator("footer")).toContainText("Erich Champion");
  });
});
