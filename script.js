const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Project filters
const filters = Array.from(document.querySelectorAll(".filter"));
const projects = Array.from(document.querySelectorAll(".project"));

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    projects.forEach((project) => {
      const visible = filter === "all" || project.dataset.category === filter;
      project.hidden = !visible;
    });
  });
});

// Reveal on scroll, only when motion is allowed and IntersectionObserver exists
const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));

if (!reduceMotion && "IntersectionObserver" in window && revealItems.length) {
  revealItems.forEach((item) => item.classList.add("will-reveal"));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

// Highlight the current section in the top navigation
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && navSections.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.removeAttribute("aria-current"));
        const active = navLinks.find(
          (link) => link.getAttribute("href") === `#${entry.target.id}`
        );
        if (active) active.setAttribute("aria-current", "true");
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  navSections.forEach((section) => navObserver.observe(section));
}

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
