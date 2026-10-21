import { chromium } from "@playwright/test";
import { copyFile, mkdir, readFile } from "node:fs/promises";
import { resolve, sep } from "node:path";

// Render the existing print stylesheet without a server or external network requests.
const root = resolve("dist");
const filename = "ayyman-eussoueff-resume.pdf";
const output = resolve("public", filename);
const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage({ javaScriptEnabled: false });
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    const path = resolve(
      root,
      `.${url.pathname === "/resume/" ? "/resume/index.html" : url.pathname}`,
    );
    if (url.origin !== "http://resume.test" || !path.startsWith(root + sep)) {
      await route.abort();
      return;
    }
    try {
      const body = await readFile(path);
      const contentType = path.endsWith(".css") ? "text/css" : "text/html";
      await route.fulfill({ body, contentType });
    } catch {
      await route.fulfill({ status: 404, body: "Not found" });
    }
  });
  await page.goto("http://resume.test/resume/");
  await page.getByRole("heading", { name: "AYYMAN EUSSOUEFF", exact: true }).waitFor();
  await page.emulateMedia({ media: "print" });
  await page.evaluate(() => document.fonts.ready);
  await mkdir(resolve("public"), { recursive: true });
  await page.pdf({
    path: output,
    format: "A4",
    preferCSSPageSize: true,
    printBackground: true,
    tagged: true,
  });
  await copyFile(output, resolve(root, filename));
  console.log(`Generated public/${filename}`);
} finally {
  await browser.close();
}
