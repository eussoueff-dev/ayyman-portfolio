import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("./VisualBackdrop.tsx", import.meta.url), "utf8");

describe("VisualBackdrop ThreeUI contract", () => {
  it("keeps the exact approved Halftone Flow usage", () => {
    expect(source).toContain('import { PredictiveArcCanvas } from "@designcodeio/threeui";');
    expect(source).toContain('import "@designcodeio/threeui/style.css";');
    expect(source).toContain('variant="halftone-flow"');
    expect(source).toContain("hue={0}");
    expect(source).toContain("saturation={1.0}");
    expect(source).toContain("brightness={1.0}");
  });
});
