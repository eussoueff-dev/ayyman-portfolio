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
  await page.goto("/");

  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
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

test("stays within a 320 pixel mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));

  expect(dimensions.content).toBe(dimensions.viewport);
});
