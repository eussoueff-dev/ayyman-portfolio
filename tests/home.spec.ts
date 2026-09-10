import { expect, test } from "@playwright/test";

test("introduces Ayyman with his approved professional title", async ({ page }) => {
  await page.goto("/");

  const heading = page.getByRole("heading", { level: 1, name: "Ayyman Eussoueff" });
  await expect(page).toHaveTitle(/Ayyman Eussoueff/);
  await expect(heading).toBeVisible();
  await expect(
    page.getByText("Full-Stack Developer | DevOps & Cloud", { exact: true }),
  ).toBeVisible();

  await page.emulateMedia({ forcedColors: "active" });
  const forcedColorStyles = await heading.evaluate((element) => {
    const styles = getComputedStyle(element);
    return {
      textFillColor: styles.getPropertyValue("-webkit-text-fill-color"),
      filter: styles.filter,
    };
  });

  expect(forcedColorStyles.textFillColor).not.toBe("rgba(0, 0, 0, 0)");
  expect(forcedColorStyles.filter).toBe("none");
});
