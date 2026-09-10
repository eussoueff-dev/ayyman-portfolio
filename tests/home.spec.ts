import { expect, test } from "@playwright/test";
test("introduces Ayyman with his approved professional title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Ayyman Eussoueff/);
  await expect(page.getByRole("heading", { level: 1, name: "Ayyman Eussoueff" })).toBeVisible();
  await expect(
    page.getByText("Full-Stack Developer | DevOps & Cloud", { exact: true }),
  ).toBeVisible();
});
