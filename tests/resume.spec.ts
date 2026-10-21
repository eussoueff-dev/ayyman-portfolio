import { expect, test } from "@playwright/test";

for (const width of [320, 390, 768, 1440]) {
  test(`résumé page and PDF work at ${width}px`, async ({ page, request }, testInfo) => {
    await page.setViewportSize({ width, height: 960 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    if (width < 800) await page.getByRole("button", { name: "Toggle navigation menu" }).click();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Résumé / CV", exact: true })
      .filter({ visible: true })
      .click();
    await expect(page).toHaveURL(/\/resume\/$/);
    await expect(page.getByRole("heading", { level: 1, name: "AYYMAN EUSSOUEFF" })).toBeVisible();
    await expect(page.locator(".resume-sheet")).toContainText("CGPA: 3.61");
    await expect(page.locator(".resume-sheet")).toContainText("OPSWAT Academy");

    const downloadLink = page.getByRole("link", { name: "Download PDF" });
    const response = await request.get((await downloadLink.getAttribute("href"))!);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
    expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
    const downloading = page.waitForEvent("download");
    await downloadLink.click();
    const download = await downloading;
    expect(download.suggestedFilename()).toBe("ayyman-eussoueff-resume.pdf");
    expect(await download.failure()).toBeNull();

    await page.evaluate(() => {
      window.print = () => document.documentElement.setAttribute("data-print-requested", "true");
    });
    await page.getByRole("button", { name: "Print / Save as PDF" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-print-requested", "true");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    await page.screenshot({
      path: testInfo.outputPath(`resume-${width}.png`),
      fullPage: true,
      style: "astro-dev-toolbar { display: none !important; }",
    });
    await page.emulateMedia({ media: "print" });
    await expect(page.locator(".site-header")).toBeHidden();
    await expect(page.locator(".resume-controls")).toBeHidden();
    await expect(page.locator(".resume-sheet")).toBeVisible();
    await page.emulateMedia({ media: "screen" });
    await page.getByRole("link", { name: "Back to portfolio" }).click();
    await expect(page).toHaveURL(/\/$/);
  });
}

test("homepage PDF download and all navigation targets resolve", async ({ page, request }) => {
  for (const path of ["/", "/work/autoconstruct/", "/work/miss-compete/", "/resume/"]) {
    await page.goto(path);
    const links = await page
      .locator("main a[href], .site-nav a[href]")
      .evaluateAll((elements) => elements.map((element) => element.getAttribute("href")!));
    for (const href of new Set(
      links.filter((href) => href.startsWith("/") || href.startsWith("#")),
    )) {
      const destination = new URL(href, page.url());
      const response = await request.get(destination.pathname);
      expect(response.status(), `${path} → ${href}`).toBe(200);
      if (destination.hash) {
        const html = await response.text();
        expect(html, `${path} → ${href}`).toContain(`id="${destination.hash.slice(1)}"`);
      }
    }
  }
  await page.goto("/#resume");
  const downloading = page.waitForEvent("download");
  await page.locator("#resume").getByRole("link", { name: "Download PDF" }).click();
  expect((await downloading).suggestedFilename()).toBe("ayyman-eussoueff-resume.pdf");
});
