import { test, expect } from "@playwright/test";

test.describe("Theme", () => {
  test("page loads without errors", async ({ page }) => {
    await page.goto("/");
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });
    await page.waitForLoadState("networkidle");
    expect(errors.filter((e) => !e.includes("favicon"))).toHaveLength(0);
  });

  test("page has proper styling", async ({ page }) => {
    await page.goto("/");

    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("Erich Champion");
  });
});
