import { useEffect, useState } from "react";

import { PredictiveArcCanvas } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

import "./visual-backdrop.css";

function browserSupportsWebGL() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl");

  if (!context) {
    return false;
  }

  context.getExtension("WEBGL_lose_context")?.loseContext();
  return true;
}

export default function VisualBackdrop() {
  const [shouldRenderWebGL, setShouldRenderWebGL] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateRenderingMode = () => {
      setShouldRenderWebGL(!reducedMotion.matches && browserSupportsWebGL());
    };

    updateRenderingMode();
    reducedMotion.addEventListener("change", updateRenderingMode);

    return () => reducedMotion.removeEventListener("change", updateRenderingMode);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="visual-backdrop"
      data-rendering={shouldRenderWebGL ? "webgl" : "static"}
      data-testid="halftone-backdrop"
    >
      <div className="visual-backdrop__fallback" />
      {shouldRenderWebGL ? (
        <div className="shader-frame">
          <PredictiveArcCanvas variant="halftone-flow" hue={0} saturation={1.0} brightness={1.0} />
        </div>
      ) : null}
    </div>
  );
}
