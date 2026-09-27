import { BrandOrbs } from "@designcodeio/threeui/components/BrandOrbs";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

import "@designcodeio/threeui/style.css";
import "./brand-orb-cluster.css";

type OrbVariant = "openai" | "claude" | "gemini" | "github" | "react";

interface OrbDefinition {
  label: string;
  variant: OrbVariant;
  x: number;
  y: number;
  speed: number;
  delay: number;
  duration: number;
}

const ORBS: readonly OrbDefinition[] = [
  { label: "ChatGPT", variant: "openai", x: 10, y: 10, speed: 0.58, delay: -3, duration: 9 },
  { label: "Claude", variant: "claude", x: 30, y: 8, speed: 0.52, delay: -6, duration: 11 },
  { label: "Gemini", variant: "gemini", x: 50, y: 9, speed: 0.48, delay: -1, duration: 10 },
  { label: "GitHub", variant: "github", x: 70, y: 8, speed: 0.55, delay: -8, duration: 12 },
  { label: "React", variant: "react", x: 90, y: 10, speed: 0.5, delay: -4, duration: 9.5 },
];

type OrbStyle = CSSProperties & {
  "--orb-x": string;
  "--orb-y": string;
  "--orb-delay": string;
  "--orb-duration": string;
};

export default function BrandOrbCluster() {
  const [mounted, setMounted] = useState(false);
  const [paused, setPaused] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () =>
      setPaused(reducedMotion.matches || document.documentElement.dataset.motion === "paused");

    updateMotion();
    setMounted(true);
    reducedMotion.addEventListener("change", updateMotion);
    document.addEventListener("portfolio-theme-change", updateMotion);

    return () => {
      reducedMotion.removeEventListener("change", updateMotion);
      document.removeEventListener("portfolio-theme-change", updateMotion);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!mounted || !root) return;

    const makeFramesInert = () => {
      root.querySelectorAll("iframe").forEach((frame) => {
        frame.tabIndex = -1;
        frame.setAttribute("aria-hidden", "true");
      });
    };

    makeFramesInert();
    const observer = new MutationObserver(makeFramesInert);
    observer.observe(root, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [mounted]);

  return (
    <div ref={rootRef} aria-hidden="true" className="brand-orb-cluster" inert>
      {ORBS.map((orb) => {
        const style = {
          "--orb-x": `${orb.x}%`,
          "--orb-y": `${orb.y}%`,
          "--orb-delay": `${orb.delay}s`,
          "--orb-duration": `${orb.duration}s`,
        } as OrbStyle;

        return (
          <div className="brand-orb" data-brand-orb={orb.variant} key={orb.variant} style={style}>
            <div className="brand-orb__art">
              {mounted ? (
                <BrandOrbs
                  aria-label={`${orb.label} animated mark`}
                  className="brand-orb__renderer"
                  mode="dark"
                  paused={paused}
                  size="medium"
                  speed={orb.speed}
                  style={{ height: 56, width: 56 }}
                  variant={orb.variant}
                />
              ) : (
                <span className="brand-orb__placeholder" />
              )}
            </div>
            <span className="brand-orb__label">{orb.label}</span>
          </div>
        );
      })}
    </div>
  );
}
