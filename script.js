const navigationLinks = [...document.querySelectorAll(".rail-link")];
const sections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const revealTargets = document.querySelectorAll(
    ".about-section, .profile-facts > div, .services-section, .service-card, .work-section, .strength-list > span, .project-card, .contact-intro, .contact-method",
  );
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );

  for (const target of revealTargets) {
    target.classList.add("reveal");
    revealObserver.observe(target);
  }
  if (revealTargets.length > 0) {
    document.documentElement.classList.add("reveal-ready");
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        for (const link of navigationLinks) {
          const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-active", isCurrent);
          if (isCurrent) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        }
      }
    },
    { rootMargin: "-18% 0px -18% 0px", threshold: 0.05 },
  );

  for (const section of sections) {
    sectionObserver.observe(section);
  }
}

const scrollProgress = document.querySelector(".scroll-progress span");
let progressFrame = 0;

const updateScrollProgress = () => {
  progressFrame = 0;
  if (!scrollProgress) return;

  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress =
    scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  scrollProgress.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
};

window.addEventListener(
  "scroll",
  () => {
    if (progressFrame) return;
    progressFrame = window.requestAnimationFrame(updateScrollProgress);
  },
  { passive: true },
);
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

document.querySelector(".rail-download")?.addEventListener("click", () => {
  window.print();
});
