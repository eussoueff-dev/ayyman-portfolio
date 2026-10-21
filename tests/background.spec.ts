import { expect, test } from "@playwright/test";

test("content remains readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Ayyman Eussoueff", level: 1 })).toBeVisible();
  await expect(page.locator("#work")).toContainText("AutoConstruct");
  await expect(page.getByRole("link", { name: "Email Ayyman" })).toHaveAttribute(
    "href",
    "mailto:eussoueff@gmail.com",
  );
  await page.getByRole("link", { name: "Read AutoConstruct case study" }).click();
  await expect(page.locator("#case-title")).toHaveText("AutoConstruct");
  await context.close();
});

test("respects reduced motion, pause, and keyboard skip navigation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("main h1")).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await expect(page.locator("iframe, canvas")).toHaveCount(0);
  await page.getByRole("button", { name: "Change design theme" }).click();
  await expect(page.getByRole("button", { name: "Reduced motion enabled" })).toBeDisabled();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("button", { name: "Pause motion" }).click();
  await page.keyboard.press("Escape");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
});
