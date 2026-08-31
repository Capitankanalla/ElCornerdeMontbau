ElCornerM
Projecte d´actualització de la web del corner a dev amb vite i vanilla.

🍽️ MVP Web Restaurant: Redisseny i Autonomia
Aquest projecte neix per resoldre el problema d'actualització i rendiment de la web actual (feta en WordPress). L'objectiu és oferir una web estàtica d'alta velocitat de càrrega, optimitzada per a dispositius mòbils, i que el restaurant pugui modificar els preus i plats de manera 100% autònoma i ràpida.

🎯 Objectius de l'MVP (Fase 1)
Rendiment Màxim (SEO/Lighthouse): Reduir el pes de la web eliminant plantilles i plugins pesats de WordPress. Objectiu: fregar el 100% de rendiment a Google Lighthouse.
Navegació per Seccions: Eliminar l'scroll infinit actual. La carta estarà dividida de manera neta (Entrants, Carns, Postres, Menú del dia) mitjançant pestanyes interactives.
Autonomia amb Dades Desacoblades: La carta i els preus estaran separats de l'estructura HTML (gestionats via fitxer JSON) per permetre canvis ràpids sense tocar codi visual.
🛠️ Stack Tecnològic
Eines de construcció: Vite
Llenguatges: HTML5, CSS3 (Custom Properties / Flexbox & Grid), Vanilla JavaScript
Arquitectura de dades: JSON estàtic (src/data/carta.json)
📐 Estructura i Seccions de la Web
La web constarà d'una sola pàgina (Single Page Application a nivell visual) o seccions molt definides per a una navegació ràpida a la sala:

Secció d'Inici / Benvinguda:
Logo, horaris d'obertura actualitzats, telèfon de contacte i enllaç directe de reserva.
Localització amb un mapa estàtic i lleuger.
Secció Menú del Dia:
Zona destacada de lectura ràpida amb el menú fix i el seu preu tancat.
Secció La Carta (Interactiva):
Selector de categories superiors per filtrar plats sense fer scroll infinit.
Llistat de plats amb nom, descripció neta, preu i indicadors clau (al·lèrgens principals).
🏗️ Flux de Gestió de Dades de l'MVP
Per garantir que el client no depengui de tercers per modificar un preu o un plat, la informació es gestiona així:

El magatzem (src/data/carta.json): Un document estructurat que conté l'array de plats i categories.
El renderitzador (src/js/carta.js): Vanilla JS fa un fetch del JSON local al carregar la pàgina i pinta les seccions dinàmicament.
Manteniment express: Qualsevol canvi de preu o de text es fa modificant directament el text d'aquest fitxer JSON, sense risc de trencar el disseny o l'estil de la web.
🚀 Com arrancar el projecte en local
# 1. Instal·lar dependències
npm install

# 2. Executar el servidor de desenvolupament
npm run dev

# 3. Compilar per a producció (Genera la carpeta /dist)
npm run build
 
