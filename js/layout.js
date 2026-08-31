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
  const links = [
    { href: "index.html", label: "Inicio", key: "home" },
    { href: "menu-dia.html", label: "Menú del día", key: "menu-dia" },
    { href: "carta.html", label: "Carta", key: "carta" },
    { href: "index.html#nosotros", label: "Nosotros", key: "nosotros" },
    { href: "index.html#contacto", label: "Contacto", key: "contacto" }
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
        <a href="index.html" class="logo">EL CÓRNER <span>DE MONTBAU</span></a>
        <a href="tel:${RESTAURANT_INFO.phone.replace(/\s/g, "")}" class="btn btn-outline header-cta">${RESTAURANT_INFO.phone}</a>
        <button class="nav-toggle" aria-expanded="false" aria-controls="nav-overlay" aria-label="Abrir menú">
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
          <span>${RESTAURANT_INFO.phone}</span>
          <span>&middot;</span>
          <span>${RESTAURANT_INFO.address}</span>
        </div>
      </nav>
    </div>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <h4>El Córner de Montbau</h4>
            <p>Auténtica gastronomía argentina en el corazón de Montbau: cortes a la parrilla, empanadas santiagueñas y pizza a la piedra.</p>
          </div>
          <div class="footer-col">
            <h4>Contacto</h4>
            <a href="tel:${RESTAURANT_INFO.phone.replace(/\s/g, "")}">${RESTAURANT_INFO.phone}</a>
            <p>${RESTAURANT_INFO.address}</p>
          </div>
          <div class="footer-col">
            <h4>Horario</h4>
            <p>Todos los días · 13:00–16:00 y 20:00–23:30</p>
            <a href="carta.html">Ver la carta</a>
            <a href="menu-dia.html">Ver menú del día</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} El Córner de Montbau</span>
          <span>Demo MVP — refactor sin WordPress</span>
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
