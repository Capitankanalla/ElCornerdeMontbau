/* ============================================
   HOME PAGE — pinta les dades dinàmiques
   ============================================ */
document.addEventListener("DOMContentLoaded", async () => {
  const content = await window.contentReady;
  const home = content.home;
  const restaurant = content.restaurant;
  const contact = content.contact;
  document.title = content.meta.homeTitle;
  document.querySelector('meta[name="description"]').content = content.meta.homeDescription;
  document.getElementById("hero-image").alt = restaurant.name;
  document.getElementById("hero-menu-link").textContent = home.heroDailyMenu;
  document.getElementById("hero-carta-link").textContent = home.heroCarta;
  document.getElementById("discover-label").textContent = home.discover;
  document.getElementById("classics-title").textContent = home.classicsTitle;
  document.getElementById("classics-lead").textContent = home.classicsLead;
  document.getElementById("about-eyebrow").textContent = home.aboutEyebrow;
  document.getElementById("about-title").textContent = home.aboutTitle;
  document.getElementById("hours-label").textContent = home.hours;
  document.getElementById("location-label").textContent = home.location;
  document.getElementById("reservations-label").textContent = home.reservations;
  document.getElementById("schedule-mount").innerHTML = `${restaurant.schedule}<br>${restaurant.scheduleHours}`;
  document.getElementById("contact-eyebrow").textContent = contact.eyebrow;
  document.getElementById("contact-title").textContent = contact.title;
  document.getElementById("contact-text").textContent = contact.text;
  document.getElementById("contact-menu-link").textContent = contact.menu;

  mountLayout("home");

  // Los Clásicos
  const classicsMount = document.getElementById("classics-mount");
  if (classicsMount) {
    classicsMount.innerHTML = content.classicsData.map(
      (c) => `
        <button type="button" class="classic-card reveal is-visible" data-title="${c.title}" data-desc="${c.desc}" data-detail="${(c.detail || c.desc).replace(/&/g, '&amp;').replace(/"/g, '&quot;')}">
          <img class="classic-card__image" src="${c.image}" alt="${c.title}" loading="lazy">
          <div class="classic-card__content">
            <h3>${c.title}</h3>
            <p>${c.desc}</p>
          </div>
        </button>
      `
    ).join("");

    const modal = document.createElement("div");
    modal.id = "classic-modal";
    modal.className = "classic-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
      <div class="classic-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="classic-modal-title">
        <button type="button" class="classic-modal__close" aria-label="Cerrar">×</button>
        <div class="classic-modal__content">
          <h3 id="classic-modal-title"></h3>
          <p id="classic-modal-text"></p>
          <button type="button" class="classic-modal__action">Cerrar</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const modalTitle = modal.querySelector("#classic-modal-title");
    const modalText = modal.querySelector("#classic-modal-text");
    const closeModalButtons = modal.querySelectorAll(".classic-modal__close, .classic-modal__action");

    const openModal = (card) => {
      if (!modalTitle || !modalText) return;
      const detail = (card.dataset.detail || card.dataset.desc || "").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
      modalTitle.textContent = card.dataset.title || "";
      modalText.textContent = detail;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    };

    const closeModal = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      const dialog = modal.querySelector(".classic-modal__dialog");
      if (dialog) dialog.scrollTop = 0;
    };

    classicsMount.querySelectorAll(".classic-card").forEach((card) => {
      card.addEventListener("click", () => openModal(card));
      card.setAttribute("aria-label", `Abrir descripción de ${card.dataset.title}`);
    });

    closeModalButtons.forEach((button) => button.addEventListener("click", closeModal));
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

  // Sobre nosotros
  const aboutMount = document.getElementById("about-mount");
  if (aboutMount) {
    aboutMount.innerHTML = restaurant.about.map((p) => `<p>${p}</p>`).join("");
  }

  // Contacto / info strip
  const addressMount = document.getElementById("address-mount");
  const phoneMount = document.getElementById("phone-mount");
  const phoneCta = document.getElementById("phone-cta");
  if (addressMount) addressMount.textContent = restaurant.address;
  if (phoneMount) phoneMount.textContent = restaurant.phone;
  if (phoneCta) {
    phoneCta.textContent = restaurant.phone;
    phoneCta.href = `tel:${restaurant.phone.replace(/\s/g, "")}`;
  }

  try {
    const heroSlides = Array.isArray(content.hero) ? content.hero : [];

    if (!heroSlides.length) return;

    let currentSlide = 0;
    const heroImage = document.getElementById("hero-image");
    const nextHeroImage = document.getElementById("hero-image-next");
    const heroEyebrow = document.querySelector(".hero .eyebrow");
    const heroTitle = document.querySelector(".hero-title");
    const heroSub = document.querySelector(".hero-sub");
    const heroColumns = document.getElementById("hero-columns");
    const heroCopy = [heroEyebrow, heroTitle, heroSub, heroColumns];
    let activeHeroImage = heroImage;
    let inactiveHeroImage = nextHeroImage;
    let hasRenderedSlide = false;
    let slideTimer = null;
    const slideTransitionDuration = 900;
    const slideDisplayDuration = 6000;

    const scheduleNextSlide = () => {
      clearTimeout(slideTimer);
      slideTimer = setTimeout(() => {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        renderSlide(currentSlide);
      }, slideDisplayDuration);
    };

    const renderSlide = (index) => {
      const slide = heroSlides[index];
      if (!slide || !activeHeroImage || !inactiveHeroImage || !heroEyebrow || !heroTitle || !heroSub || !heroColumns) return;

      const renderColumns = () => {
        heroColumns.innerHTML = Array.isArray(slide.columns)
          ? slide.columns.map((column) => `
              <div class="hero-column">
                <p class="eyebrow">${column.eyebrow}</p>
                <h2>${column.title}</h2>
              </div>
            `).join("")
          : "";
        heroColumns.classList.toggle("is-visible", Array.isArray(slide.columns) && slide.columns.length > 0);
      };

      const image = new Image();
      image.onload = () => {
        if (!hasRenderedSlide) {
          activeHeroImage.src = slide.image;
          activeHeroImage.classList.add("is-active");
          heroEyebrow.innerHTML = `<span class="ember-dot"></span> ${slide.eyebrow}`;
          heroTitle.textContent = slide.title;
          heroSub.textContent = slide.text;
          renderColumns();
          hasRenderedSlide = true;
          document.querySelector(".hero").classList.add("is-loaded");
          scheduleNextSlide();
          return;
        }

        inactiveHeroImage.src = slide.image;
        inactiveHeroImage.classList.add("is-active");
        activeHeroImage.classList.remove("is-active");
        const previousHeroImage = activeHeroImage;
        [activeHeroImage, inactiveHeroImage] = [inactiveHeroImage, activeHeroImage];

        setTimeout(() => {
          heroCopy.forEach((element) => element.classList.add("is-changing"));

          setTimeout(() => {
            heroEyebrow.innerHTML = `<span class="ember-dot"></span> ${slide.eyebrow}`;
            heroTitle.textContent = slide.title;
            heroSub.textContent = slide.text;
            renderColumns();
            requestAnimationFrame(() => {
              heroCopy.forEach((element) => element.classList.remove("is-changing"));
            });
          }, 100);
        }, 550);

        setTimeout(() => {
          scheduleNextSlide();
        }, slideTransitionDuration);
      };
      image.src = slide.image;
    };
    renderSlide(currentSlide);
  } catch (error) {
    console.error("No s'ha pogut carregar el hero:", error);
  }
});
