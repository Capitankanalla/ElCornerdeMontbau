/* ============================================
   CARTA — tabs per categoria
   ============================================ */
document.addEventListener("DOMContentLoaded", async () => {
  const content = await window.contentReady;
  document.title = content.meta.cartaTitle;
  document.getElementById("carta-eyebrow").textContent = content.carta.eyebrow;
  document.getElementById("carta-title").textContent = content.carta.title;
  document.getElementById("carta-description").textContent = content.carta.description;
  document.getElementById("carta-home-link").textContent = content.nav.home;
  mountLayout("carta");

  const tabsMount = document.getElementById("tabs-mount");
  const panelsMount = document.getElementById("panels-mount");
  if (!tabsMount || !panelsMount) return;

  const categories = CARTA_DATA.categories;

  tabsMount.innerHTML = categories
    .map(
      (cat, i) => `
      <button class="tab-btn ${i === 0 ? "is-active" : ""}" role="tab" aria-selected="${i === 0}" data-tab="${cat.id}">
        ${cat.name}
      </button>
    `
    )
    .join("");

  panelsMount.innerHTML = categories
    .map(
      (cat, i) => `
      <div class="tab-panel ${i === 0 ? "is-active" : ""}" id="panel-${cat.id}" role="tabpanel">
        <h2 class="category-title">${cat.name}</h2>
        ${cat.note ? `<p class="carta-note">${cat.note}</p>` : ""}
        <div class="dish-list">
          ${cat.dishes
            .map(
              (d) => `
            <div class="dish-row">
              <div class="dish-info">
                <h3>${d.name}</h3>
                ${d.desc ? `<p>${d.desc}</p>` : ""}
              </div>
              <span class="dish-price">${d.price}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `
    )
    .join("");

  tabsMount.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.tab;
      tabsMount.querySelectorAll(".tab-btn").forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", String(b === btn));
      });
      panelsMount.querySelectorAll(".tab-panel").forEach((p) => {
        p.classList.toggle("is-active", p.id === `panel-${targetId}`);
      });
    });
  });
});
