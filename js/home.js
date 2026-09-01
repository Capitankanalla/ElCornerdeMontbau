/* ============================================
   HOME PAGE — pinta les dades dinàmiques
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
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
});

const response = await fetch("json/home.json");
const data = await response.json();

const heroSlides = data.hero;

let currentSlide = 0;

const heroImage = document.getElementById("hero-image");
const heroEyebrow = document.querySelector(".hero .eyebrow");
const heroTitle = document.querySelector(".hero-title");
const heroSub = document.querySelector(".hero-sub");

setInterval(() => {
  currentSlide = (currentSlide + 1) % heroSlides.length;
  const slide = heroSlides[currentSlide];

  heroImage.style.opacity = "0";

  setTimeout(() => {
    heroImage.src = slide.image;
    heroEyebrow.innerHTML = `<span class="ember-dot"></span> ${slide.eyebrow}`;
    heroTitle.textContent = slide.title;
    heroSub.textContent = slide.text;
    heroImage.style.opacity = "0.55";
  }, 600);
}, 5000);
