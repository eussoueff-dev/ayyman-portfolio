import { expect, test } from "@playwright/test";

test("puts engineering work first and handles missing credentials honestly", async ({ page }) => {
  await page.goto("/");
  const sectionIds = await page
    .locator("main > section")
    .evaluateAll((sections) => sections.map((section) => section.id));
  expect(sectionIds.indexOf("work")).toBeLessThan(sectionIds.indexOf("expertise"));
  await expect(page.locator("#awards")).toContainText("Award details have not been published yet.");
  await expect(page.getByRole("link", { name: "Request résumé" }).first()).toHaveAttribute(
    "href",
    "mailto:eussoueff@gmail.com?subject=R%C3%A9sum%C3%A9%20request",
  );
  await expect(page.locator("#resume")).toContainText("Available on request");
  await expect(page.locator("canvas, iframe, .design-stamp")).toHaveCount(0);
});

for (const slug of ["autoconstruct", "miss-compete"]) {
  test(`${slug} retains complete case study and navigation`, async ({ page }) => {
    await page.goto(`/work/${slug}/`);
    await expect(page.locator(".case-section")).toHaveCount(slug === "autoconstruct" ? 6 : 5);
    await expect(page.locator(".case-repository")).toContainText("Private");
    await page.getByRole("link", { name: "Back to selected work" }).click();
    await expect(page).toHaveURL(/\/#work$/);
  });
}
