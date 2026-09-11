const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let observer: IntersectionObserver | undefined;

const reveal = (element: HTMLElement) => {
  element.dataset.revealState = "revealed";
  observer?.unobserve(element);
};

const revealEverything = () => {
  observer?.disconnect();
  observer = undefined;
  revealElements.forEach(reveal);
};

const prepareReveals = () => {
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealEverything();
    return;
  }

  observer?.disconnect();
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) reveal(entry.target as HTMLElement);
      });
    },
    {
      rootMargin: "0px 0px -8%",
      threshold: 0.12,
    },
  );

  revealElements.forEach((element) => {
    if (element.dataset.revealState === "revealed") return;

    const bounds = element.getBoundingClientRect();
    if (bounds.top <= window.innerHeight * 0.92) {
      reveal(element);
      return;
    }

    element.dataset.revealState = "pending";
    observer?.observe(element);
  });
};

prepareReveals();
reducedMotion.addEventListener("change", (event) => {
  if (event.matches) revealEverything();
  else prepareReveals();
});
