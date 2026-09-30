# Portfolio design themes

Five styles share the same portfolio content and case studies. The theme chooser is in the navigation; selections persist in local storage when available. Typography is the default. Motion follows the operating system preference, with a persistent pause control in the chooser.

## Research references

Reviewed on 2026-09-28:

- [ThreeUI](https://threeui.com/): component catalog, including Morrow's kinetic typography and motion-led portfolio. Informed the responsive name and accent interactions.
- [RenderLab](https://threeui.com/landing-pages/renderlab-landing-page): ruled editorial structure and motion details. Informed Typography's rules and strong typographic hierarchy.
- [Volta Atelier](https://threeui.com/landing-pages/volta-atelier-landing-page): studio collage composition. Informed Maximalism's layered portrait, angled panels, print colors, and patterns.
- [Brutalist Websites](https://brutalistwebsites.com/): reference gallery for raw structure and assertive typography. Informed Brutalism's heavy borders, direct labels, acid paper, and hard shadows.
- The supplied [Pinterest pin](https://www.pinterest.com/pin/835065955954453940/) could not be loaded in this environment; its image was not used or reconstructed.

These are design references, not copied templates. No dependencies or external assets were added. Experimentalism reuses the existing ThreeUI Halftone Flow; the shader is unmounted in the other themes or when motion is paused. The original component source is unchanged. Existing brand orbs obey the same pause preference.

## Living backgrounds

The four lighter themes now have original CSS/SVG backgrounds: outlined drifting letterforms and print rules (Typography), refracted water-light patterns and a pointer-following translucent lens over a sage wash (Minimalism), a drafting grid with a lime glyph field revealed around the pointer and a stepped scan (Brutalism), and a floating collage of petals, checks, ribbons, and confetti (Maximalism). Experimentalism retains its live ThreeUI Halftone Flow.

The 2026-10-01 Minimalism and Brutalism updates draw on Fedir Davydov's [Live Activity and Reveal Background studies](https://contra.com/p/3UWBOZlm-made-with-unicorn-studio). The public Unicorn Studio remix pages did not expose scene exports in this environment. These are original native SVG/CSS interpretations, not embedded Unicorn scenes or copied source. Minimalism layers displaced curved cells with slow opposing currents. Brutalism uses a repeating glyph tile and radial cursor mask. Touch devices retain ambient motion and a default focal point without requiring a cursor. Both use the existing shared pointer handler and motion preferences; no new rendering library is needed.

Background research on 2026-09-28:

- [Codrops: Kinetic Typography Page Transition](https://tympanus.net/codrops/2021/09/29/kinetic-typography-page-transition/) — oversized background letterforms and type as a moving graphic.
- [Codrops: Morphing Background Shapes](https://tympanus.net/Development/MorphingBackgroundShapes/) — restrained organic shapes behind readable content.
- [ThreeUI background catalog](https://threeui.com/backgrounds?sort=recent) — Override Grid's block-based visual language and the existing Halftone Flow.
- [Nupur's Flat Geometric Pure CSS Animated Responsive Background](https://codepen.io/Nupur16/pen/qBoebBy) — geometric pattern composition and native CSS motion.

These references inform the artwork; no third-party source or assets were copied. Pinterest's kinetic typography pin could not be opened. The new backgrounds need no WebGL, downloads, or dependencies. Only the selected scene is displayed. Pointer parallax is capped at one update per animation frame, ignores touch, and stops with reduced motion or the existing pause control. Decorations remain behind the content, hidden from assistive technology, and cannot capture clicks. The same backgrounds appear on case studies.

## Verification

`npm run test:e2e` checks all five styles at 1440, 1024, 768, 390, and 320 pixels, saves screenshots under the ignored test-results directory, and checks keyboard operation, persistence, case studies, reduced motion, and unavailable storage. `tests/layout-review.spec.ts` additionally captures every Minimalism homepage and case-study section at those widths, checks text overflow and card padding, and detects technology-card overlaps.

For visual changes, inspect the rendered results below the hero as well as the first viewport, including tablet widths and both case studies. Passing automated checks alone is not a visual review. Minimalism uses content-sized project cards with inset padding, a restrained heading scale, and a hero name sized to its column.
