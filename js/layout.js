/* ============================================
   LAYOUT — Header i Footer modulars
   -------------------------------------------
   S'injecten via JS (en lloc de fetch() de partials
   HTML) perquè el projecte funcioni obrint els fitxers
   directament, sense necessitat de servidor.
   Canviar el header/footer d'una web sencera vol dir
   tocar només aquest fitxer.
   ============================================ */

function renderHeader(activePage) {
  const content = HOME_CONTENT;
  const nav = content.nav;
  const restaurant = content.restaurant;
  const logoName = restaurant.name.toUpperCase().split(" DE ");
  const links = [
    { href: "index.html", label: nav.home, key: "home" },
    { href: "menu-dia.html", label: nav.dailyMenu, key: "menu-dia" },
    { href: "carta.html", label: nav.carta, key: "carta" },
    { href: "index.html#nosotros", label: nav.about, key: "nosotros" },
    { href: "index.html#contacto", label: nav.contact, key: "contacto" }
  ];

  const linksHtml = links
    .map(
      (l) =>
        `<a href="${l.href}" class="${l.key === activePage ? "is-active" : ""}">${l.label}</a>`
    )
    .join("");

  return `
    <header class="site-header">
      <div class="container">
        <a href="index.html" class="logo"><strong>${logoName[0]} DE&nbsp;<span>${logoName[1]}</span></strong></a>
        <a href="tel:${restaurant.phone.replace(/\s/g, "")}" class="btn btn-outline header-cta">${restaurant.phone}</a>
        <button class="nav-toggle" aria-expanded="false" aria-controls="nav-overlay" aria-label="${nav.openMenu}">
          <span class="bar"></span><span class="bar"></span><span class="bar"></span>
        </button>
      </div>
    </header>
    <div class="nav-overlay" id="nav-overlay">
      <nav>
        <ul class="nav-links">
          ${links.map((l) => `<li><a href="${l.href}" class="${l.key === activePage ? "is-active" : ""}">${l.label}</a></li>`).join("")}
        </ul>
        <div class="nav-meta">
          <span>${restaurant.phone}</span>
          <span>&middot;</span>
          <span>${restaurant.address}</span>
        </div>
      </nav>
    </div>
  `;
}

function renderFooter() {
  const content = HOME_CONTENT;
  const restaurant = content.restaurant;
  const footer = content.footer;
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <h4>${restaurant.name}</h4>
            <p>${footer.description}</p>
          </div>
          <div class="footer-col">
            <h4>${footer.contact}</h4>
            <a href="tel:${restaurant.phone.replace(/\s/g, "")}">${restaurant.phone}</a>
            <p>${restaurant.address}</p>
          </div>
          <div class="footer-col">
            <h4>${footer.hours}</h4>
            <p>${restaurant.schedule} · ${restaurant.scheduleHours}</p>
            <a href="carta.html">${footer.menu}</a>
            <a href="menu-dia.html">${footer.dailyMenu}</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${restaurant.name}</span>
          <span>${footer.demo}</span>
        </div>
      </div>
    </footer>
  `;
}

function mountLayout(activePage) {
  const headerMount = document.getElementById("header-mount");
  const footerMount = document.getElementById("footer-mount");
  if (headerMount) headerMount.innerHTML = renderHeader(activePage);
  if (footerMount) footerMount.innerHTML = renderFooter();

  const toggle = document.querySelector(".nav-toggle");
  const overlay = document.getElementById("nav-overlay");
  if (toggle && overlay) {
    toggle.addEventListener("click", () => {
      const isOpen = overlay.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    overlay.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        overlay.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      })
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) {
        overlay.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }
}
