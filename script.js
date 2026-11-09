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

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
