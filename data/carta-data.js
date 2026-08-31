/* ============================================
   CARTA DATA
   Contingut extret de la web original en WordPress.
   Separar les dades del HTML permet actualitzar plats
   i preus sense tocar la maquetació.

   Camp "menuDia: true" marca els plats que formen part
   del pool per generar el Menú del Día aleatori.
   ============================================ */

const CARTA_DATA = {
  categories: [
    {
      id: "entrantes",
      name: "Entrantes",
      dishes: [
        { name: "Queso provolone al horno con tomate seco y albahaca", desc: "", price: "8.90€", menuDia: false },
        { name: "Queso provolone con tomate natural y anchoas", desc: "", price: "9.90€", menuDia: false },
        { name: "Tabla de Quesos", desc: "", price: "11.90€", menuDia: false },
        { name: "Patatas Bravas", desc: "", price: "4.90€", menuDia: true },
        { name: "Empanadas Argentinas D.O. Santiagueñas", desc: "De carne suave · De carne picante · De pollo · De mozzarella y cebolla · De jamón y queso · De tomate, mozzarella y albahaca · De callos con sofrito de cebolla y pimiento · Capresse · Humita.", price: "3.50€ /ud", menuDia: true },
        { name: "Empanadas Argentinas de Chorizo y Provolone", desc: "", price: "4.00€ /ud", menuDia: true }
      ]
    },
    {
      id: "ensaladas",
      name: "Ensaladas",
      dishes: [
        { name: "Ensalada Córner", desc: "Mezclum, queso de cabra, miel, pasas y nueces.", price: "9.90€", menuDia: true },
        { name: "Ensalada Tibia", desc: "Salteado de verduras con bacon, frutos secos y queso de cabra fundido.", price: "9.90€", menuDia: false },
        { name: "Ensalada César", desc: "Mezclum, pollo, tomates cherry, picatostes y salsa César.", price: "10.90€", menuDia: true },
        { name: "Ensalada tropical", desc: "Mix de lechuga, pollo, piña, pasas, salsa rosa.", price: "8.90€", menuDia: false },
        { name: "Ensalada verde", desc: "", price: "7.90€", menuDia: true },
        { name: "Ensalada de salmón", desc: "Escarola, canónigos, virutas de cebolla, salmón ahumado y queso de Burgos.", price: "11.90€", menuDia: false },
        { name: "Ensalada especial caprese", desc: "Tomate, mozzarella de búfala, albahaca y reducción de menta.", price: "10.90€", menuDia: false },
        { name: "Ensalada de rúcula", desc: "Crujiente de jamón y de cebolla, parmesano.", price: "9.90€", menuDia: false }
      ]
    },
    {
      id: "carnes",
      name: "Carnes",
      note: "Todas nuestras carnes se acompañan con guarnición. Pide tu salsa extra Gorgonzola o Cinco Pimientas (suplemento 3.00€).",
      dishes: [
        { name: "Solomillo de ternera", desc: "La parte más tierna de nuestras carnes.", price: "25.90€", menuDia: false },
        { name: "Vacío", desc: "Corte ubicado entre las costillas falsas y los huecos de las caderas, le da su textura peculiar.", price: "17.90€", menuDia: false },
        { name: "Butifarra Pagés con sanfaina", desc: "Típico plato catalán.", price: "10.50€", menuDia: true },
        { name: "Milanesa napolitana", desc: "Salsa de tomate, queso, jamón dulce y rodajas de tomate.", price: "16.90€", menuDia: false },
        { name: "Milanesa suiza", desc: "", price: "16.90€", menuDia: false },
        { name: "Suprema de pollo Suiza", desc: "Nata, mozzarella y cebolla caramelizada.", price: "15.90€", menuDia: false },
        { name: "Suprema de pollo con patatas", desc: "Pollo macerado y empanado, al horno, servido con patatas.", price: "10.90€", menuDia: true },
        { name: "Entrecot de Girona (400 gr)", desc: "Pieza de lomo alto de ternera de Girona.", price: "25.90€", menuDia: false },
        { name: "Entraña de ternera", desc: "El más clásico y sabroso corte argentino.", price: "17.90€", menuDia: false },
        { name: "Churrasco Argentino \"asado de tira\"", desc: "El clásico asado de tira argentino.", price: "17.90€", menuDia: false },
        { name: "1/2 Pollo a la Brasa", desc: "Sabroso pollo a la brasa con sus patatas caseras.", price: "10.90€", menuDia: true },
        { name: "Milanesa de ternera con patatas", desc: "Macerada y empanada, al horno, servida con patatas.", price: "11.90€", menuDia: true },
        { name: "Suprema de pollo napolitana", desc: "Salsa de tomate, queso, jamón dulce y rodajas de tomate.", price: "15.90€", menuDia: false }
      ]
    },
    {
      id: "pizzas",
      name: "Pizzas",
      note: "Ingrediente extra 2.50€",
      dishes: [
        { name: "Pizza especial de Rúcula", desc: "Tomate, mozzarella, rúcula, parmesano y virutas de jamón serrano.", price: "13.90€", menuDia: false },
        { name: "Pizza Marinera", desc: "Tomate, mozzarella, atún, gambas, palitos de cangrejo y orégano.", price: "14.90€", menuDia: false },
        { name: "Pizza 4 Quesos", desc: "Tomate, mozzarella, queso de cabra, brie y gorgonzola.", price: "12.90€", menuDia: true },
        { name: "Pizza Especial El Córner", desc: "Jamón país, bacon, nata, cebolla, maíz, mozzarella.", price: "14.90€", menuDia: false },
        { name: "Pizza Americana (barbacoa)", desc: "Tomate, mozzarella, pollo, cebolla y pimiento escalibado.", price: "13.90€", menuDia: false },
        { name: "Pizza Catalana", desc: "Tomate, mozzarella, butifarra, ajo y orégano.", price: "12.90€", menuDia: true },
        { name: "Pizza Atún escalibado", desc: "Tomate natural, cebolla, pimiento escalibado y atún natural.", price: "13.90€", menuDia: false },
        { name: "Pizza Pepperoni", desc: "Tomate, mozzarella, pepperoni y orégano.", price: "11.90€", menuDia: true },
        { name: "Pizza Margarita", desc: "Tomate, mozzarella y orégano.", price: "10.90€", menuDia: true },
        { name: "Pizza Noruega", desc: "Tomate, mozzarella, cebolla y salmón.", price: "15.50€", menuDia: false },
        { name: "Pizza Mexicana", desc: "Tomate, mozzarella, carne, bacon, maíz y un toque de picante.", price: "13.90€", menuDia: false },
        { name: "Pizza Carbonara", desc: "Salsa carbonara, mozzarella y cebolla.", price: "13.90€", menuDia: false },
        { name: "Pizza Napolitana", desc: "Tomate, mozzarella, anchoas, tomate natural y parmesano.", price: "13.90€", menuDia: false },
        { name: "Pizza Mallorquina", desc: "Tomate, mozzarella, queso de cabra, sobrasada de Mallorca y miel.", price: "13.90€", menuDia: false },
        { name: "Pizza Hawaiana", desc: "Tomate, mozzarella, jamón york, piña.", price: "11.90€", menuDia: true },
        { name: "Pizza Vegetal", desc: "Tomate, mozzarella y verduras de estación.", price: "11.90€", menuDia: true },
        { name: "Pizza Jamón champi", desc: "Tomate, mozzarella, champiñones, jamón york y huevo.", price: "12.50€", menuDia: false },
        { name: "Pizza Prosciutto", desc: "Tomate, mozzarella, jamón york y orégano.", price: "11.50€", menuDia: false },
        { name: "Pizza del país", desc: "Tomate natural picado, mozzarella, jamón del país, ajo y aceite.", price: "14.40€", menuDia: false }
      ]
    },
    {
      id: "pastas",
      name: "Pastas",
      note: "Pide tu salsa (suplemento 3.00€): Crema de Gorgonzola, Pesto genovés, Salsa de Mariscos, Boloñesa, Carbonara, Napolitana.",
      dishes: [
        { name: "Canelones Argentinos", desc: "", price: "10.90€", menuDia: true },
        { name: "Cinta Argentina", desc: "", price: "8.90€", menuDia: true },
        { name: "Tortelini de ricota y espinaca", desc: "", price: "10.50€", menuDia: false },
        { name: "Lasaña de carne", desc: "", price: "10.90€", menuDia: true },
        { name: "Espaguetis Napolitana", desc: "", price: "8.90€", menuDia: true },
        { name: "Girasol de queso y nueces", desc: "", price: "10.50€", menuDia: false }
      ]
    },
    {
      id: "postres",
      name: "Postres",
      note: "Suplemento dulce de leche o nata 1.00€",
      dishes: [
        { name: "Tiramisú Artesano", desc: "", price: "6.90€", menuDia: true },
        { name: "Tarta de la casa", desc: "", price: "5.90€", menuDia: true },
        { name: "Crepe de Nutella", desc: "", price: "6.90€", menuDia: true },
        { name: "Crepe de dulce de leche", desc: "Panqueque Argentino.", price: "6.90€", menuDia: true }
      ]
    }
  ]
};

const CLASSICS_DATA = [
  {
    title: "Empanadas",
    tag: "Los Clásicos",
    desc: "Carne suave o picante, mozzarella y cebolla, jamón y queso. Y... alguna sorpresita."
  },
  {
    title: "Cortes Argentinos",
    tag: "Los Clásicos",
    desc: "Trabajamos, básicamente, tres cortes: entraña, vacío y asado de tira."
  },
  {
    title: "Milanesas",
    tag: "Los Clásicos",
    desc: "Disfruta de nuestras especialidades: napolitana, suiza y clásica."
  }
];

const RESTAURANT_INFO = {
  name: "El Córner de Montbau",
  phone: "+34 93 428 21 71",
  address: "Plaça de Zurbarán, 1, 08035 Barcelona",
  about: [
    "La historia de El Córner de Montbau se sitúa a miles de kilómetros de aquí, en la tierra donde nace nuestra empanada santiagueña: Santiago del Estero.",
    "Ángel cruza el charco con un propósito en mente: conquistar la Barcelona gastronómica con la Argentina más auténtica, a base de conocimiento, calidad y esfuerzo.",
    "Tras varios años conociendo la ciudad, sus gentes y sus gustos, en 2010 consigue poner en marcha su sueño: ofrecer los mejores cortes argentinos y las auténticas empanadas santiagueñas, además de genuinas pizzas a la piedra, milanesas y supremas.",
    "Hoy, El Córner de Montbau ofrece los mejores platos argentinos, con nuestro menú actualizado diariamente y las pizzas cocinadas en horno a la piedra."
  ]
};
