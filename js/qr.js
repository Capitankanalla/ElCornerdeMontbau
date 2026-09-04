document.addEventListener("DOMContentLoaded", async () => {
  const content = await window.contentReady;
  const qr = content.qr;
  document.title = content.meta.qrTitle;
  const logoName = content.restaurant.name.toUpperCase().split(" DE ");
  document.getElementById("qr-logo").innerHTML = `<strong>${logoName[0]} DE&nbsp;<span>${logoName[1]}</span></strong>`;
  document.getElementById("qr-eyebrow").textContent = qr.eyebrow;
  document.getElementById("qr-title").textContent = qr.title;
  document.getElementById("daily-menu-icon").textContent = qr.dailyMenuIcon;
  document.getElementById("qr-daily-menu").textContent = qr.dailyMenu;
  document.getElementById("qr-daily-menu-description").textContent = qr.dailyMenuDescription;
  document.getElementById("carta-icon").textContent = qr.cartaIcon;
  document.getElementById("qr-carta").textContent = qr.carta;
  document.getElementById("qr-carta-description").textContent = qr.cartaDescription;
  document.getElementById("qr-restaurant").textContent = `${qr.restaurant} →`;
});