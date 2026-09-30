export {};

const root = document.documentElement;
const picker = document.querySelector<HTMLElement>("#theme-picker")!;
const toggle = document.querySelector<HTMLButtonElement>(".theme-toggle")!;
const options = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-theme-option]"));
const motionToggle = document.querySelector<HTMLButtonElement>(".motion-toggle")!;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const save = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* The controls still work without storage. */
  }
};

const syncTheme = () => {
  const active = options.find((option) => option.dataset.themeOption === root.dataset.theme)!;
  options.forEach((option) => option.setAttribute("aria-pressed", String(option === active)));
  document.querySelectorAll("[data-theme-name]").forEach((label) => {
    label.textContent = active.getAttribute("aria-label");
  });
};

options.forEach((option) => {
  option.addEventListener("click", () => {
    root.dataset.theme = option.dataset.themeOption;
    save("portfolio-theme", root.dataset.theme!);
    syncTheme();
    document.dispatchEvent(new Event("portfolio-theme-change"));
    document.querySelector("#theme-status")!.textContent =
      `${option.getAttribute("aria-label")} theme selected`;
    picker.hidePopover();
    toggle.focus();
    if (!reducedMotion.matches && root.dataset.motion !== "paused") {
      document.querySelector("main")?.animate(
        [
          { opacity: 0.55, translate: "0 10px" },
          { opacity: 1, translate: "0 0" },
        ],
        { duration: 400, easing: "ease-out" },
      );
    }
  });
});

picker.addEventListener("toggle", () => {
  if (picker.matches(":popover-open"))
    options.find((option) => option.getAttribute("aria-pressed") === "true")?.focus();
});

picker.addEventListener("keydown", (event) => {
  const index = options.indexOf(document.activeElement as HTMLButtonElement);
  if (
    index < 0 ||
    !["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)
  )
    return;
  event.preventDefault();
  const next =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? options.length - 1
        : (index + (["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1) + options.length) %
          options.length;
  options[next]?.focus();
});

const syncMotion = () => {
  const paused = root.dataset.motion === "paused";
  motionToggle.setAttribute("aria-pressed", String(paused));
  motionToggle.textContent = reducedMotion.matches
    ? "Reduced motion enabled"
    : paused
      ? "Resume motion"
      : "Pause motion";
  motionToggle.disabled = reducedMotion.matches;
};
motionToggle.addEventListener("click", () => {
  root.dataset.motion = root.dataset.motion === "paused" ? "playing" : "paused";
  save("portfolio-motion", root.dataset.motion);
  syncMotion();
  document.dispatchEvent(new Event("portfolio-theme-change"));
});
reducedMotion.addEventListener("change", syncMotion);
syncTheme();
syncMotion();

const hero = document.querySelector<HTMLElement>(".hero");
const backdrop = document.querySelector<HTMLElement>(".theme-backdrop");
let backdropFrame = 0;
document.addEventListener(
  "pointermove",
  (event) => {
    if (
      backdropFrame ||
      event.pointerType !== "mouse" ||
      reducedMotion.matches ||
      root.dataset.motion === "paused"
    )
      return;
    backdropFrame = requestAnimationFrame(() => {
      backdropFrame = 0;
      if (reducedMotion.matches || root.dataset.motion === "paused") return;
      backdrop?.style.setProperty("--backdrop-x", `${(event.clientX / innerWidth - 0.5) * 24}px`);
      backdrop?.style.setProperty("--backdrop-y", `${(event.clientY / innerHeight - 0.5) * 24}px`);
      // The scenes extend 2rem past the viewport to keep their moving edges out of view.
      backdrop?.style.setProperty("--light-x", `calc(${event.clientX}px + 2rem)`);
      backdrop?.style.setProperty("--light-y", `calc(${event.clientY}px + 2rem)`);
    });
  },
  { passive: true },
);
hero?.addEventListener("pointermove", (event) => {
  if (event.pointerType !== "mouse" || reducedMotion.matches || root.dataset.motion === "paused")
    return;
  const bounds = hero.getBoundingClientRect();
  hero.style.setProperty(
    "--pointer-x",
    `${((event.clientX - bounds.left) / bounds.width - 0.5) * 16}px`,
  );
  hero.style.setProperty(
    "--pointer-y",
    `${((event.clientY - bounds.top) / bounds.height - 0.5) * 16}px`,
  );
});
hero?.addEventListener("pointerleave", () => {
  hero.style.setProperty("--pointer-x", "0px");
  hero.style.setProperty("--pointer-y", "0px");
});

let turn = 0;
document.querySelector(".design-stamp")?.addEventListener("click", () => {
  turn += 90;
  hero?.style.setProperty("--art-turn", `${turn}deg`);
  hero?.classList.toggle("is-remixed");
});
