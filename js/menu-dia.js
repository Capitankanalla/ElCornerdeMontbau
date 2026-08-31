/* ============================================
   MENÚ DEL DÍA — render + botó de regenerar (demo)
   ============================================ */
function renderMenuDia(menu) {
  const dateEl = document.getElementById("today-date");
  if (dateEl) {
    dateEl.textContent = new Date(menu.date).toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });
  }

  const steps = [
    { label: "Entrante", dish: menu.entrante },
    { label: "Principal", dish: menu.principal },
    { label: "Postre", dish: menu.postre }
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
        <p class="category-hint">De nuestra sección ${s.dish.category}</p>
      </div>
    `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  mountLayout("menu-dia");

  let currentMenu = getOrCreateTodayMenu();
  renderMenuDia(currentMenu);

  const regenBtn = document.getElementById("regenerate-btn");
  if (regenBtn) {
    regenBtn.addEventListener("click", () => {
      currentMenu = forceRegenerateMenu();
      renderMenuDia(currentMenu);
    });
  }
});
