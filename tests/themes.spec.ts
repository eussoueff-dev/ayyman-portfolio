import { expect, test } from "@playwright/test";

const themes = ["Typography", "Minimalism", "Brutalism", "Experimentalism", "Maximalism"];
const papers: Record<string, string> = {
  Typography: "rgb(243, 239, 230)",
  Minimalism: "rgb(252, 252, 250)",
  Brutalism: "rgb(222, 223, 214)",
  Experimentalism: "rgb(17, 16, 24)",
  Maximalism: "rgb(245, 187, 207)",
};

test("five design themes work on desktop and mobile, persist, and support keyboard and reduced motion", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Change design theme" });
  const picker = page.locator("#theme-picker");
  const appearances = new Set<string>();

  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 960 });
    for (const theme of themes) {
      await toggle.click();
      await expect(picker).toBeVisible();
      if (theme === "Typography" && width !== 390) {
        await page.screenshot({ path: testInfo.outputPath(`picker-${width}.png`) });
      }
      const option = page.getByRole("button", { name: theme, exact: true });
      await option.click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme.toLowerCase());
      await expect(picker).toBeHidden();
      await expect(toggle).toBeFocused();
      await expect(page.getByRole("heading", { level: 1, name: "Ayyman Eussoueff" })).toBeVisible();
      const layout = await page.evaluate(() => {
        const heading = document.querySelector("h1")!;
        const style = getComputedStyle(heading);
        const headingBounds = heading.getBoundingClientRect();
        const overflowing = Array.from(
          document.querySelectorAll(
            ".hero .name-word, .site-nav > *, .hero__content, .profile-panel, .design-stamp, .button, .project-card",
          ),
        )
          .filter((element) => {
            const bounds = element.getBoundingClientRect();
            return (
              bounds.width > 0 &&
              (bounds.left < -1 ||
                bounds.right > innerWidth + 1 ||
                (element.matches(".name-word, .button, .project-card") &&
                  element.scrollWidth > element.clientWidth + 2))
            );
          })
          .map((element) => element.className);
        return {
          width: document.documentElement.scrollWidth,
          viewport: innerWidth,
          headingRight: headingBounds.right,
          overflowing,
          appearance: [
            style.fontFamily,
            style.fontSize,
            getComputedStyle(document.body).backgroundColor,
          ].join("|"),
        };
      });
      await page.screenshot({ path: testInfo.outputPath(`${theme}-${width}.png`) });
      expect(layout.width, `${theme} at ${width}px: ${JSON.stringify(layout)}`).toBe(
        layout.viewport,
      );
      expect(layout.overflowing, `${theme} at ${width}px`).toEqual([]);
      if (width === 1440) appearances.add(layout.appearance);
      if (width === 1440 && ["Typography", "Maximalism"].includes(theme)) {
        await page.locator("#work").screenshot({ path: testInfo.outputPath(`work-${theme}.png`) });
        await page
          .locator("#stack")
          .screenshot({ path: testInfo.outputPath(`stack-${theme}.png`) });
        await page
          .locator("#contact")
          .screenshot({ path: testInfo.outputPath(`contact-${theme}.png`) });
        await page.evaluate(() => window.scrollTo(0, 0));
      }
    }
  }
  expect(appearances.size).toBe(5);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "maximalism");
  await toggle.click();
  await expect(page.getByRole("button", { name: "Maximalism", exact: true })).toBeFocused();
  await page.keyboard.press("Home");
  await expect(page.getByRole("button", { name: "Typography", exact: true })).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "minimalism");
  await toggle.click();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(picker).toBeHidden();

  await page.setViewportSize({ width: 1440, height: 960 });
  await page
    .getByRole("link", { name: /Read .* case study/ })
    .first()
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "minimalism");
  for (const theme of themes) {
    await toggle.click();
    await page.getByRole("button", { name: theme, exact: true }).click();
    await expect(page.locator("#case-title")).toBeVisible();
    await expect(page.locator("body")).toHaveCSS("background-color", papers[theme]!);
    await page.screenshot({
      path: testInfo.outputPath(`case-${theme}.png`),
      animations: "disabled",
    });
  }
  await toggle.click();
  await expect(page.getByRole("button", { name: "Reduced motion enabled" })).toBeDisabled();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("button", { name: "Pause motion" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
});

test("theme selection survives unavailable storage and invalid saved values", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("portfolio-theme", "not-a-theme");
    Storage.prototype.setItem = () => {
      throw new Error("Storage blocked");
    };
  });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "typography");
  await page.getByRole("button", { name: "Change design theme" }).click();
  await page.getByRole("button", { name: "Brutalism", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "brutalism");
  await page.getByRole("button", { name: "Remix the decorative accent" }).click();
  await expect(page.locator(".hero")).toHaveClass(/is-remixed/);
});

test("living backgrounds animate only the selected scene and obey pointer, pause, and reduced motion", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/");
  const background = page.locator(".theme-backdrop");
  await expect(background).toHaveAttribute("aria-hidden", "true");
  await expect(background).toHaveCSS("pointer-events", "none");

  for (const theme of themes.filter((name) => name !== "Experimentalism")) {
    await page.getByRole("button", { name: "Change design theme" }).click();
    await page.getByRole("button", { name: theme, exact: true }).click();
    const scene = page.locator(`[data-backdrop="${theme.toLowerCase()}"]`);
    await expect(scene).toBeVisible();
    await expect(page.locator(".backdrop-scene:visible")).toHaveCount(1);
    const first = scene
      .locator(theme === "Minimalism" ? ".water-current" : ".backdrop-motion")
      .first();
    const transform = await first.evaluate((element) => getComputedStyle(element).transform);
    await expect
      .poll(() => first.evaluate((element) => getComputedStyle(element).transform))
      .not.toBe(transform);
    await page.mouse.move(100, 120);
    await expect
      .poll(() =>
        background.evaluate((element) =>
          (element as HTMLElement).style.getPropertyValue("--backdrop-x"),
        ),
      )
      .not.toBe("");
    if (["Minimalism", "Brutalism"].includes(theme)) {
      const effect = scene.locator(theme === "Minimalism" ? ".minimal-lens" : ".glyph-reveal");
      const property = theme === "Minimalism" ? "left" : "mask-image";
      const before = await effect.evaluate(
        (element, name) => getComputedStyle(element).getPropertyValue(name),
        property,
      );
      await page.mouse.move(1200, 300);
      await expect
        .poll(() =>
          effect.evaluate(
            (element, name) => getComputedStyle(element).getPropertyValue(name),
            property,
          ),
        )
        .not.toBe(before);
      await expect(background).toHaveCSS("--light-x", "calc(1200px + 2rem)");
      const mousePosition = await background.getAttribute("style");
      await page
        .locator("body")
        .dispatchEvent("pointermove", { pointerType: "touch", clientX: 20, clientY: 20 });
      await page.waitForTimeout(50);
      expect(await background.getAttribute("style")).toBe(mousePosition);
      await page.mouse.move(880, 450);
      await page.screenshot({ path: testInfo.outputPath(`cursor-${theme}.png`) });
    }
    await page.getByRole("button", { name: "Change design theme" }).click();
    await page.getByRole("button", { name: "Pause motion" }).click();
    await page.keyboard.press("Escape");
    await expect(first).toHaveCSS("animation-play-state", "paused");
    const paused = await first.evaluate((element) => getComputedStyle(element).transform);
    const pointer = await background.getAttribute("style");
    await page.mouse.move(900, 700);
    // Sample after a frame interval to detect animations or pointer updates that escaped pause.
    await page.waitForTimeout(150);
    expect(await first.evaluate((element) => getComputedStyle(element).transform)).toBe(paused);
    expect(await background.getAttribute("style")).toBe(pointer);
    await page.screenshot({ path: testInfo.outputPath(`live-${theme}.png`) });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(first).toHaveCSS("animation-name", "none");
    await expect(scene).toHaveCSS("translate", "none");
    const reducedPointer = await background.getAttribute("style");
    await page.mouse.move(400, 400);
    await page.waitForTimeout(50);
    expect(await background.getAttribute("style")).toBe(reducedPointer);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.getByRole("button", { name: "Change design theme" }).click();
    await page.getByRole("button", { name: "Resume motion" }).click();
    await page.keyboard.press("Escape");
  }
  await page.getByRole("button", { name: "Change design theme" }).click();
  await page.getByRole("button", { name: "Experimentalism", exact: true }).click();
  await expect(page.locator(".backdrop-scene:visible")).toHaveCount(0);
});
