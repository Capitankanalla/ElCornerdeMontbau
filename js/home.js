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
    const heroImage = document.getElementById("hero-image");
    const nextHeroImage = document.getElementById("hero-image-next");
    const heroEyebrow = document.querySelector(".hero .eyebrow");
    const heroTitle = document.querySelector(".hero-title");
    const heroSub = document.querySelector(".hero-sub");
    const heroCopy = [heroEyebrow, heroTitle, heroSub];
    let activeHeroImage = heroImage;
    let inactiveHeroImage = nextHeroImage;
    let hasRenderedSlide = false;
    let slideTimer = null;
    const slideTransitionDuration = 900;
    const zoomDuration = 4000;

    heroImage.classList.add("is-active");

    const startZoomAndSchedule = () => {
      activeHeroImage.classList.remove("is-zooming");
      void activeHeroImage.offsetWidth;
      activeHeroImage.classList.add("is-zooming");
      clearTimeout(slideTimer);
      slideTimer = setTimeout(() => {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        renderSlide(currentSlide);
      }, zoomDuration);
    };

    const renderSlide = (index) => {
      const slide = heroSlides[index];
      if (!slide || !activeHeroImage || !inactiveHeroImage || !heroEyebrow || !heroTitle || !heroSub) return;

      const image = new Image();
      image.onload = () => {
        if (!hasRenderedSlide) {
          activeHeroImage.src = slide.image;
          heroEyebrow.innerHTML = `<span class="ember-dot"></span> ${slide.eyebrow}`;
          heroTitle.textContent = slide.title;
          heroSub.textContent = slide.text;
          hasRenderedSlide = true;
          startZoomAndSchedule();
          return;
        }

        inactiveHeroImage.src = slide.image;
        inactiveHeroImage.classList.add("is-active");
        activeHeroImage.classList.remove("is-zooming");
        activeHeroImage.classList.add("is-previous");
        activeHeroImage.classList.remove("is-active");
        const previousHeroImage = activeHeroImage;
        [activeHeroImage, inactiveHeroImage] = [inactiveHeroImage, activeHeroImage];

        setTimeout(() => {
          heroCopy.forEach((element) => element.classList.add("is-changing"));

          setTimeout(() => {
            heroEyebrow.innerHTML = `<span class="ember-dot"></span> ${slide.eyebrow}`;
            heroTitle.textContent = slide.title;
            heroSub.textContent = slide.text;
            requestAnimationFrame(() => {
              heroCopy.forEach((element) => element.classList.remove("is-changing"));
            });
          }, 150);
        }, 650);

        setTimeout(() => {
          previousHeroImage.classList.remove("is-previous");
          startZoomAndSchedule();
        }, slideTransitionDuration);
      };
      image.src = slide.image;
    };
      renderSlide(currentSlide);
  } catch (error) {
    console.error("No s'ha pogut carregar el hero:", error);
  }
});
