# Editorial portfolio redesign — 2026-10-21

## Codebase inspection

The app is a static Astro site with the existing React integration. The package manifest adds only the `resume:pdf` maintenance script. Dependencies, the lockfile, TypeScript, ESLint, Prettier, Vitest, Playwright, and Astro configurations remain unchanged.

- Routes: the home page, `/resume/`, and two statically generated case-study pages under `/work/[slug]/`.
- Content: `src/data/portfolio.ts` holds profile, contact links, expertise, education, current focus, and credential availability. `src/data/case-studies.ts` holds both projects and their evidence/limitations.
- Shared UI: BaseLayout provides metadata, canonical URLs, storage restoration, the skip link, and reveal initialization. SiteNav provides responsive navigation and keyboard focus handling. SectionHeading provides the repeated section hierarchy.
- Styling: global reset/tokens, navigation, home, theme preferences, toolkit, and case-study styles.
- Behavior: five saved theme preferences, keyboard-operated theme popover, persistent motion preference, operating-system reduced motion, mobile menu with Escape/outside-click dismissal and anchor focus, case-study links, email, GitHub, and LinkedIn.
- Previous visual layer: React/ThreeUI shader and brand-orb renderers, SVG/CSS backgrounds, pointer parallax, and a spinning decorative stamp. These have been removed as part of the requested restraint. Packages remain installed to preserve the existing stack.
- Tests: Vitest checks identity/content invariants; Playwright checks routes, layout, interactions, and accessibility-related behavior. There was no graphify graph or additional repository AGENTS.md file in the tracked project.

The initial local revision had an empty `achievements` array and null `resumeUrl`. Before merging, a fetch discovered newer remote commits through `73f4063` with a complete `/resume/` page, PDF print workflow, and award details. Those commits are now integrated, and their existing résumé content is retained. The original contact section promised a future form; there was no functioning form or server endpoint to preserve.

## Design and implementation

The default palette is ivory, ink, and rust. System sans-serif text, Georgia display type, and monospace metadata provide three clear levels without external font requests. Rules, spacing, real portrait photography, and an italic surname form the identity.

Selected work follows the introduction. Project rows expose project state, individual contribution, summary, technology, and a case-study link. Expertise, all twenty existing toolkit names, biography, education, current focus, contact links, and complete case-study content remain available. The five visual preferences share this coherent layout and vary the palette.

Awards now show the three AutoConstruct results from the restored résumé. Résumé links open `/resume/`, which retains Print / Save as PDF and adds a direct Download PDF link. `public/ayyman-eussoueff-resume.pdf` is generated from that page's print stylesheet with the existing Playwright/Chrome tooling. Normal production builds serve the checked-in PDF without requiring Chrome. No project screenshots, achievements, business metrics, qualifications, or delivery claims were invented.

The implementation retains semantic regions, one main heading, image alternatives, skip navigation, visible keyboard focus, native popovers, mobile focus return, forced-color support, static readable HTML, and reduced-motion handling. Reveals use a short fade and a ten-pixel movement; there is no ambient animation.

## Verification and visual review

- `npm run lint`: passed.
- Formatting for all source, tests, and updated documentation: passed. The repository-wide `npm run format:check` reports an existing formatting warning in unchanged `.kiro/settings/mcp.json`; that local tool configuration was left untouched.
- `npm run check`: zero errors, warnings, or hints.
- `npm test`: four content/metadata tests passed. The obsolete source-text test for the deleted shader component was removed.
- `npm run build`: four static pages built successfully.
- `npx playwright test --reporter=list --workers=2`: twenty-five tests passed.
- Layout captures cover home, AutoConstruct, and Miss-Compete at 320, 390, 768, 1024, and 1440 pixels. Tests check content overflow, image loading, runtime errors, and main heading count.
- Theme tests cover all five preferences at those widths, persistence, blocked storage, keyboard selection, and case-study navigation.
- Interaction checks cover mobile navigation at 320 × 740 and 320 × 320, Escape/focus handling, no-JavaScript content, skip navigation, and reduced/paused motion.
- Résumé checks cover its page and actual PDF downloads at 320, 390, 768, and 1440 pixels, print control activation, print-only visibility, and all internal link destinations across the four routes.
- PDF verification: tagged, extractable, one-page A4; the expected name, CGPA, awards, and certifications are present. Rendered and visually reviewed with Poppler alongside desktop/mobile résumé screenshots.
- Manually inspected viewport and full-page screenshots on desktop and mobile for the home page and both case studies. Fixed the next-project heading overflow discovered at 320 pixels.
- Independent read-only code review: no actionable code findings after checking the changed files and connected navigation, theme, reveal, case-study, and content-test code.
- Screenshots are local review artifacts under `test-results/layout-review-editorial-layout-at-{width}px-chrome/`. They are genuine browser captures, excluded from version control, and regenerated by Playwright.

Visual review is in desktop Chrome with emulated responsive viewports. Real-device Safari/Firefox and screen-reader testing were not performed. External project availability and historical evidence were preserved from the existing content, not independently re-audited.

## Delivery boundary

The redesign started from local `main` at `e1ab22a`. On the user's subsequent request to merge, the newer remote résumé commits through `73f4063` were fetched and integrated into the redesign branch first. The authorized delivery is a local merge to `main` after verification. No push or deployment is authorized.
