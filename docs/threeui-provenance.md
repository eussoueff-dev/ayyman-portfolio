# ThreeUI Halftone Flow provenance

The portfolio uses the public ThreeUI Community component described below without recreating or modifying its authored shader source.

- Registered source: <https://threeui.com/source-code/halftone-flow.json>
- Reference page: <https://threeui.com/backgrounds/predictive-arc/halftone-flow>
- Package: `@designcodeio/threeui@1.2.0`
- Package license: MIT
- Approved source revision prefix: `fa86582fc870`
- Last verified: 2026-09-10

## Verified registered files

| File                                                           | SHA-256                                                            |
| -------------------------------------------------------------- | ------------------------------------------------------------------ |
| `src/shaders/neuform-isolated/NeuformCraftEffects.tsx`         | `0a1680c3c119dba8c61d946322afa0b64d36dfd80956fb5e7c3fd017d7bfa450` |
| `src/shaders/neuform-isolated/sources/nexus-unified-flow.html` | `fa1a015ae407dc2091c3c96239d28107e973cbc03aa7abef37dd5da791d5428b` |
| `src/shaders/threeui.css`                                      | `efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf` |

All three decoded file bodies were independently hashed with SHA-256 immediately before integration and matched the approved values.

The authored source runs in a sandboxed iframe and references public CDN scripts and media. Those paths are intentionally preserved. Accessibility and unavailable-WebGL behavior are implemented outside the component as wrapper-level fallbacks.

## Brand Orbs Community component

The technology-orbit section also uses the package's verified `BrandOrbs` renderer without modifying its authored Canvas 2D source.

- Family reference: <https://threeui.com/ui-elements/brand-orbs>
- OpenAI reference: <https://threeui.com/ui-elements/brand-orbs/openai>
- Package import: `@designcodeio/threeui/components/BrandOrbs`
- Variants used: `openai`, `claude`, `gemini`, `github`, and `react`
- Presentation: `size="medium"`, `mode="dark"`, reduced speeds, wrapper-controlled reduced-motion pause

The orbs are section-local decoration inside the content layer. They do not modify, cover, or replace the approved full-viewport Halftone Flow renderer.
