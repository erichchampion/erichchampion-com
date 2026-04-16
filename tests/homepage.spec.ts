import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("renders hero section with name and title", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("h1")).toContainText("Erich Champion");
    await expect(page.locator("h1 + p")).toContainText("Senior Engineering Manager");
  });

  test("displays featured projects section", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Featured Projects" })).toBeVisible();
    await expect(page.locator("text=Sessions-AI")).toBeVisible();
  });

  test("displays GitHub repos section", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "GitHub Repositories" })).toBeVisible();
  });

  test("navigation links work", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("navigation").getByRole("link", { name: "Projects" }).click();
    await expect(page).toHaveURL("/projects");

    await page.getByRole("navigation").getByRole("link", { name: "GitHub" }).click();
    await expect(page).toHaveURL("/github");

    await page.getByRole("navigation").getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");
  });

  test("has correct page title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Erich Champion/);
  });
});
