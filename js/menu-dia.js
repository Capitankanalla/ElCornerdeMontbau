/* ============================================
   MENÚ DEL DÍA — render + botó de regenerar (demo)
   ============================================ */
function renderMenuDia(menu) {
  const labels = HOME_CONTENT.dailyMenu;
  const dateEl = document.getElementById("today-date");
  if (dateEl) {
    dateEl.textContent = new Date(menu.date).toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });
  }

  const steps = [
    { label: labels.starter, dish: menu.entrante },
    { label: labels.main, dish: menu.principal },
    { label: labels.dessert, dish: menu.postre }
  ];

  const mount = document.getElementById("menu-dia-mount");
  if (!mount) return;
  mount.innerHTML = steps
    .map(
      (s) => `
      <div class="menu-dia-card">
        <p class="step">${s.label}</p>
        <h3>${s.dish.name}</h3>
        ${s.dish.desc ? `<p>${s.dish.desc}</p>` : ""}
        <p class="category-hint">${labels.categoryHint} ${s.dish.category}</p>
      </div>
    `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", async () => {
  const content = await window.contentReady;
  const labels = content.dailyMenu;
  document.title = content.meta.dailyMenuTitle;
  document.getElementById("today-label").textContent = labels.today;
  document.getElementById("daily-menu-title").textContent = labels.title;
  document.getElementById("daily-menu-description").textContent = labels.description;
  document.getElementById("daily-menu-home-link").textContent = content.nav.home;
  document.getElementById("full-carta-link").textContent = labels.fullCarta;
  mountLayout("menu-dia");

  let currentMenu = getOrCreateTodayMenu();
  renderMenuDia(currentMenu);

});
