# Ayyman Eussoueff — Portfolio

Personal portfolio for **Ayyman Eussoueff**, a Full-Stack Developer focused on DevOps and cloud engineering.

## Local development

Requirements: Node.js 24+ and npm 11+.

```powershell
npm install
npm run dev
```

Astro prints a local URL, normally `http://localhost:4321`. Open it in your browser to view the site. Press `Ctrl+C` in the terminal when you want to stop the development server.

## Quality checks

```powershell
npm run lint
npm run check
npm test
npm run test:e2e
npm run build
```

No secrets belong in this repository. Local `.env` files are ignored by Git.

## Résumé and PDF

The full résumé is at `/resume/`. Its **Download PDF** link serves the checked-in A4 document at `public/ayyman-eussoueff-resume.pdf`; **Print / Save as PDF** uses the browser's print dialog.

After editing `src/pages/resume.astro` or its print styles, regenerate the PDF with:

```powershell
npm run resume:pdf
```

This builds the site and uses the existing Playwright dependency with locally installed Chrome to render the résumé's print stylesheet. No server or external requests are needed. The output is copied to both `public/` and `dist/`. Review it and commit the updated PDF with the page changes. Normal builds and hosting need no browser: they copy the committed PDF as a static asset.
