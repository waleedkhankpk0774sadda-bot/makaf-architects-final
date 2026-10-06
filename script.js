(() => {
  const body = document.body;
  const modal = document.getElementById("modal");
  const menu = document.getElementById("menuBtn");
  const nav = document.getElementById("siteNav");
  const form = document.getElementById("contactForm");
  const phone = "923104802342";

  const openModal = () => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("no-scroll");
    window.setTimeout(() => modal.querySelector("input")?.focus(), 40);
  };
  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    body.classList.remove("no-scroll");
  };

  document.querySelectorAll("[data-open]").forEach(btn => btn.addEventListener("click", openModal));
  document.querySelectorAll("[data-close]").forEach(btn => btn.addEventListener("click", closeModal));
  modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && modal.classList.contains("open")) closeModal(); });

  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    const message = [
      "Hello MAKAF ARCHITECTS,",
      "",
      `My name is ${data.get("name")}.`,
      `Phone/WhatsApp: ${data.get("phone")}`,
      "",
      "Project details:",
      data.get("message")
    ].join("\n");
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    form.reset();
    closeModal();
  });

  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("mobile-open");
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });

  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("mobile-open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open navigation");
  }));

  document.getElementById("year").textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll(".nav-links a")];
  const updateActive = () => {
    const y = window.scrollY + 140;
    let current = "";
    sections.forEach(section => { if (y >= section.offsetTop) current = section.id; });
    links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
  };
  window.addEventListener("scroll", updateActive, { passive: true });
  updateActive();
})();