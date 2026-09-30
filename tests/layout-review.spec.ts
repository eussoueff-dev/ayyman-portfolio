import { expect, test } from "@playwright/test";

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`Minimalism content layout at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 960 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript(() => localStorage.setItem("portfolio-theme", "minimalism"));
    for (const path of ["/", "/work/autoconstruct/", "/work/miss-compete/"]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      const name = path === "/" ? "home" : path.split("/")[2];
      for (const section of await page.locator("main > section, .case-hero, .case-next").all()) {
        await section.scrollIntoViewIfNeeded();
        await section.screenshot({
          style: ".site-header, .skip-link, astro-dev-toolbar { visibility: hidden !important; }",
          path: testInfo.outputPath(
            `${name}-${(await section.getAttribute("id")) || (await section.getAttribute("class"))}-${width}.png`,
          ),
        });
      }
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
      if (path === "/") {
        const cards = await page
          .locator(".expertise-card, .project-card, .now-card, .contact-panel")
          .evaluateAll((elements) =>
            elements.map((element) => ({
              inset: parseFloat(getComputedStyle(element).paddingLeft),
              clipped: element.scrollHeight > element.clientHeight + 2,
            })),
          );
        expect(cards.every((card) => card.inset >= 20 && !card.clipped)).toBe(true);
        const overlaps = await page.locator(".technology-core").evaluate((core) => {
          const a = core.getBoundingClientRect();
          return Array.from(document.querySelectorAll(".tech-node, .brand-orb"))
            .filter((node) => {
              const b = node.getBoundingClientRect();
              return (
                Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 &&
                Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1
              );
            })
            .map((node) => node.textContent?.trim());
        });
        expect(overlaps).toEqual([]);
      }
    }
  });
}
