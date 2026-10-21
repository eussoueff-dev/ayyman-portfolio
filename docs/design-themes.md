# Portfolio appearance preferences

Updated for the editorial redesign on 2026-10-21.

The portfolio uses one editorial layout with five saved color preferences. Typography is the default: warm ivory, dark ink, and a rust accent. Minimalism uses near-white and green, Brutalism uses gray-green, Experimentalism uses dark slate and warm tan, and Maximalism uses muted rose.

The existing theme names and storage keys are retained so previously saved preferences continue to work. All preferences now share readable typography, ruled sections, responsive project rows, and the same interaction model. The theme popover supports arrow keys, Home/End, Escape, and focus return.

Motion follows the operating system preference. A persistent pause control remains available in the chooser. Page reveals use a brief fade and small vertical movement. Ambient backgrounds, pointer parallax, decorative stamp interactions, brand orbs, and WebGL rendering were removed to support the requested restrained direction.

## Content and layout

The home page leads with the developer identity and selected work, followed by engineering focus, toolkit, biography, education, awards, résumé, current focus, and contact. Case studies preserve the existing project content, contribution boundaries, and prototype qualifications.

No award details or résumé file exist in the source data yet. Awards show a clear unpublished state. Résumé links request the document by email, with support for an actual download URL when supplied.

## Verification

See [the redesign review](redesign-review.md) for architecture, checks, screenshot coverage, and known limits. Playwright captures desktop, tablet, and mobile layouts for all three pages and checks the existing theme and navigation behavior.

Earlier research and animation studies are retained in Git history. [ThreeUI provenance](threeui-provenance.md) remains a historical integration record; those renderers are no longer mounted by this portfolio.
