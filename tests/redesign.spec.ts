import { expect, test } from "@playwright/test";

test("puts engineering work first and links the restored credentials", async ({ page }) => {
  await page.goto("/");
  const sectionIds = await page
    .locator("main > section")
    .evaluateAll((sections) => sections.map((section) => section.id));
  expect(sectionIds.indexOf("work")).toBeLessThan(sectionIds.indexOf("expertise"));
  await expect(page.locator("#awards")).toContainText("APEX 2026");
  await expect(page.getByRole("link", { name: "View résumé / CV" }).first()).toHaveAttribute(
    "href",
    "/resume/",
  );
  await expect(page.locator("#resume").getByRole("link", { name: "Download PDF" })).toHaveAttribute(
    "download",
    "",
  );
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
