import { expect, test } from "@playwright/test";

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`editorial layout at ${width}px`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 960 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const path of ["/", "/work/autoconstruct/", "/work/miss-compete/"]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator("main img").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            image.evaluate(
              (element) =>
                element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0,
            ),
          )
          .toBe(true);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      const name = path === "/" ? "home" : path.split("/")[2];
      const screenshotStyle = "astro-dev-toolbar { display: none !important; }";
      await page.screenshot({
        path: testInfo.outputPath(`${name}-viewport-${width}.png`),
        animations: "disabled",
        style: screenshotStyle,
      });
      await page.screenshot({
        path: testInfo.outputPath(`${name}-full-${width}.png`),
        fullPage: true,
        animations: "disabled",
        style: screenshotStyle,
      });
      const overflow = await page.locator("main").evaluate((main) =>
        Array.from(main.querySelectorAll<HTMLElement>("h1, h2, h3, p, dd, dt, li, a, .name-word"))
          .filter((element) => {
            if (element.closest(".sr-only")) return false;
            const box = element.getBoundingClientRect();
            return (
              box.width > 0 &&
              (element.scrollWidth > element.clientWidth + 2 ||
                box.left < -1 ||
                box.right > innerWidth + 1)
            );
          })
          .map(
            (element) =>
              `${element.className || element.tagName}: ${element.textContent?.trim().slice(0, 70)}`,
          ),
      );
      expect.soft(overflow, `${name} at ${width}`).toEqual([]);
      expect(await page.locator("main h1").count()).toBe(1);
      const brokenImages = await page
        .locator("main img")
        .evaluateAll((images) =>
          images
            .filter(
              (image) =>
                image instanceof HTMLImageElement && (!image.complete || image.naturalWidth === 0),
            )
            .map((image) => image.getAttribute("src")),
        );
      expect(brokenImages).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    }
    expect(errors).toEqual([]);
  });
}
