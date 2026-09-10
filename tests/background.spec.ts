import { expect, test } from "@playwright/test";

const backdropHydrationTimeout = 15_000;

test.describe.configure({ mode: "serial" });

test("renders the exact Halftone Flow in a fixed full-viewport layer", async ({ page }) => {
  await page.goto("/");

  const backdrop = page.getByTestId("halftone-backdrop");
  await expect(backdrop).toHaveAttribute("data-rendering", "webgl", {
    timeout: backdropHydrationTimeout,
  });
  await expect(backdrop.locator('iframe[title="Nexus unified halftone flow"]')).toBeVisible({
    timeout: backdropHydrationTimeout,
  });

  const canvas = page
    .frameLocator('iframe[title="Nexus unified halftone flow"]')
    .locator("#glcanvas");
  await expect(canvas).toBeVisible({ timeout: backdropHydrationTimeout });
  await expect
    .poll(
      () =>
        canvas.evaluate((element) => Boolean((element as HTMLCanvasElement).getContext("webgl"))),
      { timeout: backdropHydrationTimeout },
    )
    .toBe(true);

  const placement = await backdrop.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    return {
      position: getComputedStyle(element).position,
      top: Math.round(bounds.top),
      left: Math.round(bounds.left),
      width: Math.round(bounds.width),
      height: Math.round(bounds.height),
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
    };
  });

  expect(placement).toEqual({
    position: "fixed",
    top: 0,
    left: 0,
    width: placement.viewportWidth,
    height: placement.viewportHeight,
    viewportWidth: placement.viewportWidth,
    viewportHeight: placement.viewportHeight,
  });
});

test("keeps a static wrapper-level fallback for reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const backdrop = page.getByTestId("halftone-backdrop");
  await expect(backdrop).toHaveAttribute("data-rendering", "static", {
    timeout: backdropHydrationTimeout,
  });
  await expect(backdrop.locator("iframe")).toHaveCount(0);
});
