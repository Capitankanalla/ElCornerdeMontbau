/* ============================================
   HOME PAGE — pinta les dades dinàmiques
   ============================================ */
document.addEventListener("DOMContentLoaded", async () => {
  mountLayout("home");

  // Los Clásicos
  const classicsMount = document.getElementById("classics-mount");
  if (classicsMount) {
    classicsMount.innerHTML = CLASSICS_DATA.map(
      (c) => `
        <div class="classic-card reveal is-visible">
          <p class="tag">${c.tag}</p>
          <h3>${c.title}</h3>
          <p>${c.desc}</p>
        </div>
      `
    ).join("");
  }

  // Sobre nosotros
  const aboutMount = document.getElementById("about-mount");
  if (aboutMount) {
    aboutMount.innerHTML = RESTAURANT_INFO.about.map((p) => `<p>${p}</p>`).join("");
  }

  // Contacto / info strip
  const addressMount = document.getElementById("address-mount");
  const phoneMount = document.getElementById("phone-mount");
  const phoneCta = document.getElementById("phone-cta");
  if (addressMount) addressMount.textContent = RESTAURANT_INFO.address;
  if (phoneMount) phoneMount.textContent = RESTAURANT_INFO.phone;
  if (phoneCta) {
    phoneCta.textContent = RESTAURANT_INFO.phone;
    phoneCta.href = `tel:${RESTAURANT_INFO.phone.replace(/\s/g, "")}`;
  }

  try {
    const response = await fetch("js/json/homeEs.json");
    if (!response.ok) throw new Error(`Error carregant el JSON del hero: ${response.status}`);

    const data = await response.json();
    const heroSlides = Array.isArray(data.hero) ? data.hero : [];

    if (!heroSlides.length) return;

    let currentSlide = 0;
    let slideTimer = null;
    const heroImage = document.getElementById("hero-image");
    const heroEyebrow = document.querySelector(".hero .eyebrow");
    const heroTitle = document.querySelector(".hero-title");
    const heroSub = document.querySelector(".hero-sub");
    const slideDuration = 11000;

    const scheduleNextSlide = () => {
      clearTimeout(slideTimer);
      slideTimer = setTimeout(() => {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        renderSlide(currentSlide);
        scheduleNextSlide();
      }, slideDuration);
    };

    const renderSlide = (index) => {
      const slide = heroSlides[index];
      if (!slide || !heroImage || !heroEyebrow || !heroTitle || !heroSub) return;

      heroImage.dataset.loaded = "false";
      heroImage.style.opacity = "0";
      heroImage.style.animation = "none";

      const img = new Image();
      img.onload = () => {
        heroImage.src = slide.image;
        heroEyebrow.innerHTML = `<span class="ember-dot"></span> ${slide.eyebrow}`;
        heroTitle.textContent = slide.title;
        heroSub.textContent = slide.text;

        requestAnimationFrame(() => {
          heroImage.style.animation = "none";
          void heroImage.offsetWidth;
          heroImage.style.animation = "hero-zoom 10s cubic-bezier(0.17, 0.84, 0.44, 1) forwards";
          heroImage.dataset.loaded = "true";
          heroImage.style.opacity = "1";
        });
      };
      img.src = slide.image;
    };

    renderSlide(currentSlide);
    scheduleNextSlide();
  } catch (error) {
    console.error("No s'ha pogut carregar el hero:", error);
  }
});
