import { expect, test } from "@playwright/test";

const expectedSections = [
  { id: "expertise", heading: "Three connected disciplines." },
  { id: "work", heading: "Building in public, one real project at a time." },
  { id: "about", heading: "Curious about the whole system." },
  { id: "journey", heading: "Learning with direction." },
  { id: "now", heading: "What I am focused on now." },
  { id: "contact", heading: "Let’s build something useful." },
] as const;

test("renders the complete verified homepage shell", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const navigation = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(navigation).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Work" })).toBeVisible();
  await expect(
    page.getByText("Open to work and internships", { exact: true }).first(),
  ).toBeVisible();

  for (const section of expectedSections) {
    const region = page.getByRole("region", { name: section.heading });
    await expect(region).toHaveAttribute("id", section.id);
    await expect(region.getByRole("heading", { level: 2, name: section.heading })).toBeVisible();
  }

  await expect(page.getByRole("link", { name: /email/i })).toHaveAttribute(
    "href",
    "mailto:eussoueff@gmail.com",
  );
  await expect(page.getByRole("link", { name: /github/i }).last()).toHaveAttribute(
    "href",
    "https://github.com/eussoueff-dev",
  );
  await expect(page.getByRole("link", { name: /linkedin/i }).last()).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/ayyman-eussoueff-ab446b2b8/",
  );
});

test("stays usable within narrow and short mobile viewports", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const menuButton = page.getByRole("button", { name: "Toggle navigation menu" });
  const menuPanel = page.locator("#mobile-navigation");
  await expect(menuButton).toBeVisible();
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(menuPanel).toBeVisible();

  const mobileWorkLink = menuPanel.getByRole("link", { name: "Work" });
  await expect(mobileWorkLink).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
    overflowingElements: Array.from(document.body.querySelectorAll<HTMLElement>("*"))
      .filter((element) => {
        const style = window.getComputedStyle(element);
        const bounds = element.getBoundingClientRect();
        const belongsToBackdrop = Boolean(element.closest(".visual-backdrop, .static-backdrop"));

        return (
          !belongsToBackdrop &&
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          bounds.width > 0 &&
          (bounds.left < -1 || bounds.right > window.innerWidth + 1)
        );
      })
      .map((element) => element.className || element.tagName),
  }));

  expect(dimensions.content, JSON.stringify(dimensions)).toBe(dimensions.viewport);
  expect(dimensions.overflowingElements).toEqual([]);

  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(menuPanel).toBeHidden();
  await expect(menuButton).toBeFocused();

  await menuButton.click();
  await mobileWorkLink.click();
  await expect(page).toHaveURL(/#work$/);
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(menuPanel).toBeHidden();
  await expect(page.locator("#work")).toBeFocused();

  await page.setViewportSize({ width: 320, height: 320 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Toggle navigation menu" }).click();

  const shortPanel = page.locator("#mobile-navigation");
  const panelBounds = await shortPanel.boundingBox();
  expect(panelBounds).not.toBeNull();
  expect(panelBounds!.y + panelBounds!.height).toBeLessThanOrEqual(321);

  const mobileContact = shortPanel.getByRole("link", { name: "Start a conversation" });
  await mobileContact.scrollIntoViewIfNeeded();
  await expect(mobileContact).toBeVisible();
});
