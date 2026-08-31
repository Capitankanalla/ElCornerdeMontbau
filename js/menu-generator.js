/* ============================================
   GENERADOR DE MENÚ DEL DÍA
   -------------------------------------------
   IMPORTANT: Això és un PROTOTIP de demostració.
   Simula, en el navegador (localStorage), el que en
   producció seria un backend lleuger:
     - Un pool de plats (data/carta-data.js) marcats amb menuDia:true
     - Un historial dels últims menús servits
     - Una funció que genera un menú nou evitant
       repetir plats usats recentment
   En producció, l'historial es guardaria en un servidor
   compartit (no per dispositiu) i la generació es faria
   des d'un petit panell d'administració.
   ============================================ */

const MENU_HISTORY_KEY = "corner_menu_history_v1";
const HISTORY_LENGTH = 3; // nº de menús recents a evitar repetir

function getMenuDiaPool() {
  const pool = { entrantes: [], principales: [], postres: [] };
  CARTA_DATA.categories.forEach((cat) => {
    cat.dishes.forEach((dish) => {
      if (!dish.menuDia) return;
      if (cat.id === "entrantes" || cat.id === "ensaladas") {
        pool.entrantes.push({ ...dish, category: cat.name });
      } else if (cat.id === "postres") {
        pool.postres.push({ ...dish, category: cat.name });
      } else {
        pool.principales.push({ ...dish, category: cat.name });
      }
    });
  });
  return pool;
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(MENU_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveHistory(history) {
  try {
    localStorage.setItem(MENU_HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    /* localStorage no disponible: seguim sense persistir */
  }
}

function pickWithoutRepeat(list, usedNames) {
  const available = list.filter((d) => !usedNames.has(d.name));
  const source = available.length ? available : list; // si s'ha exhaurit el pool, es reinicia
  return source[Math.floor(Math.random() * source.length)];
}

function generateDailyMenu() {
  const pool = getMenuDiaPool();
  const history = loadHistory().slice(0, HISTORY_LENGTH);
  const usedNames = new Set(history.flat().map((d) => d.name));

  const menu = {
    date: new Date().toISOString().slice(0, 10),
    entrante: pickWithoutRepeat(pool.entrantes, usedNames),
    principal: pickWithoutRepeat(pool.principales, usedNames),
    postre: pickWithoutRepeat(pool.postres, usedNames)
  };

  const updatedHistory = [
    [menu.entrante, menu.principal, menu.postre],
    ...history
  ].slice(0, HISTORY_LENGTH);
  saveHistory(updatedHistory);

  return menu;
}

function getOrCreateTodayMenu() {
  const cacheKey = "corner_menu_today_v1";
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey) || "null");
    const todayStr = new Date().toISOString().slice(0, 10);
    if (cached && cached.date === todayStr) return cached;
  } catch (e) {
    /* ignore */
  }
  const menu = generateDailyMenu();
  try {
    localStorage.setItem("corner_menu_today_v1", JSON.stringify(menu));
  } catch (e) {
    /* ignore */
  }
  return menu;
}

function forceRegenerateMenu() {
  const menu = generateDailyMenu();
  try {
    localStorage.setItem("corner_menu_today_v1", JSON.stringify(menu));
  } catch (e) {
    /* ignore */
  }
  return menu;
}
