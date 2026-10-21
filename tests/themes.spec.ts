import { expect, test } from "@playwright/test";

const themes = ["Typography", "Minimalism", "Brutalism", "Experimentalism", "Maximalism"];
const papers: Record<string, string> = {
  Typography: "rgb(244, 241, 234)",
  Minimalism: "rgb(252, 252, 250)",
  Brutalism: "rgb(222, 223, 214)",
  Experimentalism: "rgb(25, 29, 34)",
  Maximalism: "rgb(238, 229, 224)",
};

for (const width of [1440, 1024, 768, 390, 320]) {
  test(`five themes remain usable at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 960 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Change design theme" });
    for (const theme of themes) {
      await toggle.click();
      const picker = page.locator("#theme-picker");
      await expect(picker).toBeVisible();
      await page.getByRole("button", { name: theme, exact: true }).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme.toLowerCase());
      await expect(picker).toBeHidden();
      await expect(toggle).toBeFocused();
      await expect(page.locator("body")).toHaveCSS("background-color", papers[theme]!);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
      if ([390, 1440].includes(width)) {
        await page.screenshot({
          path: testInfo.outputPath(`${theme}-${width}.png`),
          style: "astro-dev-toolbar { display: none !important; }",
        });
      }
    }
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "maximalism");
  });
}

test("theme keyboard controls, persistence across case studies, and motion preferences", async ({
  page,
}) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Change design theme" });
  await toggle.click();
  await expect(page.getByRole("button", { name: "Typography", exact: true })).toBeFocused();
  await page.keyboard.press("End");
  await expect(page.getByRole("button", { name: "Maximalism", exact: true })).toBeFocused();
  await page.keyboard.press("Home");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "minimalism");
  await toggle.click();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await page.getByRole("link", { name: "Read AutoConstruct case study" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "minimalism");
  for (const theme of themes) {
    await toggle.click();
    await page.getByRole("button", { name: theme, exact: true }).click();
    await expect(page.locator("#case-title")).toBeVisible();
    await expect(page.locator("body")).toHaveCSS("background-color", papers[theme]!);
  }
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
});
