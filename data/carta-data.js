/* ============================================
   CARTA DATA
   Contingut extret de la web original en WordPress.
   Separar les dades del HTML permet actualitzar plats
   i preus sense tocar la maquetació.

   Camp "menuDia: true" marca els plats que formen part
   del pool per generar el Menú del Día aleatori.
   ============================================ */


let CARTA_DATA;

window.contentReady.then((content) => {
  CARTA_DATA = content.cartaData;
});
