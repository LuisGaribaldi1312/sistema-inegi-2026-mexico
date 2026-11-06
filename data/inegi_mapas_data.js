// =============================================================================
// CATÁLOGO INTEGRAL DE LOS 14 MAPAS OFICIALES DEL INEGI (SNIEG 2026)
// Teselas temáticas, simbología, leyendas y rasgos geográficos interactivos
// =============================================================================

window.INEGI_MAPAS_CATALOG = {
    "topografia": {
        id: "topografia",
        name: "Topografía",
        badge: "Escala Oficial 1:50,000 / 1:250,000",
        desc: "Representación continua del relieve continental mexicano mediante curvas de nivel equidistantes, cotas altimétricas, topoformas y cumbres principales con referencia al elipsoide ITRF2008.",
        tileUrl: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        subdomains: "abc",
        attribution: '&copy; OpenTopoMap &copy; INEGI Continuo de Elevaciones Mexicano',
        legend: {
            title: "Elevación Topográfica (Metros sobre el nivel del mar)",
            bars: ["#2d6a4f", "#74c69d", "#d8f3dc", "#ffe6a7", "#bb9457", "#6f1d1b"],
            labels: ["0 m", "500 m", "1,500 m", "2,500 m", "4,000 m", "5,636 m"]
        },
        meta: {
            escala: "1:50,000 y 1:250,000",
            sistema: "ITRF2008 / WGS84",
            equidistancia: "Curvas maestras cada 50 m o 100 m según pendiente",
            cobertura: "100% de la superficie continental de México"
        },
        features: [
            { name: "Pico de Orizaba (Citlaltépetl)", coords: [19.0300, -97.2700], desc: "Volcán inactivo y cumbre más alta de México con 5,636 msnm.", tag: "5,636 msnm &bull; Cumbre Nacional" },
            { name: "Popocatépetl", coords: [19.0222, -98.6277], desc: "Estratovolcán activo en el Eje Neovolcánico con 5,426 msnm.", tag: "5,426 msnm &bull; Volcán Activo" },
            { name: "Iztaccíhuatl", coords: [19.1791, -98.6419], desc: "Tercera cumbre más elevada del país, conocida como la Mujer Dormida.", tag: "5,230 msnm &bull; Glaciar" },
            { name: "Nevado de Toluca (Xinantécatl)", coords: [19.1083, -99.7611], desc: "Volcán con lagunas del Sol y de la Luna en su cráter a 4,680 msnm.", tag: "4,680 msnm &bull; Cráter y Lagunas" },
            { name: "La Malinche (Matlalcueye)", coords: [19.2319, -98.0319], desc: "Volcán aislado en Tlaxcala y Puebla con 4,461 msnm.", tag: "4,461 msnm &bull; Parque Nacional" },
            { name: "Cofre de Perote", coords: [19.4958, -97.1486], desc: "Estratovolcán extinto en Veracruz con 4,282 msnm.", tag: "4,282 msnm &bull; Sierra de Chiconquiaco" }
        ]
    },
    "relieve_continental": {
        id: "relieve_continental",
        name: "Relieve Continental",
        badge: "Modelo Digital de Elevación (CEM 3.0)",
        desc: "Sombreado digital de laderas que resalta la rugosidad del terreno, cañones, valles intermontanos, mesetas y las grandes cadenas montañosas de México.",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; ESRI Shaded Relief &copy; INEGI Modelo Digital de Elevación',
        legend: {
            title: "Morfología del Relieve Continental",
            bars: ["#4a7c59", "#8fc0a9", "#c8d5b9", "#faf3dd", "#685634"],
            labels: ["Planicie Costera", "Valles", "Meseta Central", "Sierras", "Cumbres Volcánicas"]
        },
        meta: {
            resolucion: "15 m y 30 m por celda",
            fuente: "Continuo de Elevaciones Mexicano CEM 3.0",
            aplicacion: "Estudios hidrológicos, geomorfológicos y ordenamiento territorial"
        },
        features: [
            { name: "Barrancas del Cobre", coords: [27.5200, -107.7500], desc: "Sistema de cañones cuatro veces más extenso que el Gran Cañón del Colorado.", tag: "Chihuahua &bull; Profundidad >1,500m" },
            { name: "Cañón del Sumidero", coords: [16.8333, -93.0833], desc: "Falla geológica sobre el Río Grijalva con acantilados de más de 1,000 m de altura.", tag: "Chiapas &bull; Desfiladero Profundo" },
            { name: "Altiplano Mexicano", coords: [24.0000, -102.0000], desc: "Vasta meseta elevada entre la Sierra Madre Occidental y Oriental.", tag: "Mesa Central &bull; Altitud ~1,800m" },
            { name: "Península de Baja California", coords: [27.0000, -113.0000], desc: "Franja de más de 1,200 km con sierras escarpadas y desiertos costeros.", tag: "Sierras de Juárez y San Pedro Mártir" }
        ]
    },
    "relieve_submarino": {
        id: "relieve_submarino",
        name: "Relieve Submarino",
        badge: "Batimetría y Fondos Oceánicos",
        desc: "Batimetría multihaz que mapea la plataforma continental, taludes submarinos, cordilleras oceánicas y fosas abisales del Golfo de México, Mar Caribe y Océano Pacífico.",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; ESRI Ocean Basemap &copy; GEBCO &copy; INEGI Batimetría',
        legend: {
            title: "Profundidad Marina (Metros bajo el nivel del mar)",
            bars: ["#c6dbef", "#9ecae1", "#6baed6", "#3182bd", "#08519c"],
            labels: ["0 m (Litoral)", "-200 m (Plataforma)", "-1,500 m (Talud)", "-3,500 m (Cuenca)", "-6,600 m+ (Fosa Mesoamericana)"]
        },
        meta: {
            superficieMarina: "3,149,920 km² de Zona Económica Exclusiva (ZEE)",
            profundidadMax: "Fosa Mesoamericana en el Pacífico (-6,662 m)"
        },
        features: [
            { name: "Fosa Mesoamericana (Trinchera)", coords: [15.5000, -96.0000], desc: "Zona de subducción entre la Placa de Cocos y la Norteamericana con -6,662m.", tag: "Pacífico Sur &bull; Máxima Profundidad" },
            { name: "Banco de Campeche", coords: [21.5000, -91.5000], desc: "Amplia plataforma continental poco profunda rica en recursos pesqueros y petrolíferos.", tag: "Golfo de México &bull; Plataforma Somera" },
            { name: "Cuenca de Yucatán (Caribe)", coords: [19.5000, -85.5000], desc: "Fondos marinos profundos del Mar Caribe con fosas y arrecifes coralinos.", tag: "Mar Caribe &bull; Profundidad -4,500m" },
            { name: "Rift del Golfo de California", coords: [25.0000, -110.0000], desc: "Dorsal tectónica en formación con fosas de Guaymas y Pescadero (-3,000m).", tag: "Mar de Cortés &bull; Cuenca Tectónica" }
        ]
    },
    "territorio_insular": {
        id: "territorio_insular",
        name: "Territorio Insular",
        badge: "4,111 Islas, Cayos y Arrecifes Oficiales",
        desc: "Inventario oficial de todas las islas, cayos, islotes y arrecifes mexicanos que extienden la soberanía y la Zona Económica Exclusiva a más de 3.1 millones de km².",
        tileUrl: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
        attribution: '&copy; Google Satellite Hybrid &copy; INEGI Territorio Insular',
        legend: {
            title: "Territorio Insular y Soberanía Marítima",
            bars: ["#BC955C", "#0084B4", "#107C41", "#8A1538", "#E87722"],
            labels: ["Islas Mayores", "Islotes", "Cayos", "Arrecifes", "Límite Marítimo ZEE"]
        },
        meta: {
            totalElementos: "4,111 islas, cayos, islotes y arrecifes",
            superficieInsular: "5,127 km² de superficie terrestre emergida",
            archipielagos: "Revillagigedo, Islas Marías, San Benito, Alacranes"
        },
        hasInsularPoints: true,
        features: [
            { name: "Isla Guadalupe", coords: [29.0333, -118.2833], desc: "Isla oceánica volcánica en el Pacífico y punto más occidental de México.", tag: "Baja California &bull; Reserva de la Biosfera" },
            { name: "Isla Socorro (Revillagigedo)", coords: [18.7900, -110.9600], desc: "Patrimonio Mundial de la Humanidad UNESCO, volcán activo y base de soberanía.", tag: "Colima &bull; Archipiélago Oceánico" },
            { name: "Isla Tiburón", coords: [28.9833, -112.3500], desc: "La isla más grande de México con 1,208 km², territorio sagrado Seri.", tag: "Sonora &bull; Golfo de California (1,208 km²)" },
            { name: "Isla Cozumel", coords: [20.4333, -86.9167], desc: "La isla más poblada del país y sede del Gran Arrecife Maya.", tag: "Quintana Roo &bull; Caribe Mexicano" },
            { name: "Islas Marías (Isla Madre)", coords: [21.6333, -106.5333], desc: "Archipiélago transformado en Centro de Educación Ambiental y Reserva de la Biosfera.", tag: "Nayarit &bull; Pacífico Mexicano" },
            { name: "Arrecife Alacranes", coords: [22.5200, -89.7100], desc: "Mayor complejo de arrecifes coralinos del Golfo de México.", tag: "Yucatán &bull; Parque Nacional Marino" },
            { name: "Isla Cedros", coords: [28.1833, -115.2167], desc: "Histórica isla del Pacífico norte con importante tradición pesquera.", tag: "Baja California &bull; Pacífico Norte" },
            { name: "Isla Mujeres", coords: [21.2333, -86.7333], desc: "Punto territorial más oriental de los Estados Unidos Mexicanos.", tag: "Quintana Roo &bull; Cabo Catoche" }
        ]
    },
    "vias_comunicacion": {
        id: "vias_comunicacion",
        name: "Vías de Comunicación",
        badge: "Red Nacional de Caminos (RNC)",
        desc: "Infraestructura carretera pavimentada, autopistas de cuota, caminos rurales, red ferroviaria de carga y pasajeros, puertos de altura y aeropuertos.",
        tileUrl: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        attribution: '&copy; Google Maps &copy; SCT &copy; INEGI Red Nacional de Caminos',
        legend: {
            title: "Jerarquía de Vías de Transporte",
            bars: ["#d7191c", "#fdae6b", "#ffffbf", "#abdda4", "#2b83ba"],
            labels: ["Autopistas Cuota", "Carreteras Federales", "Carreteras Estatales", "Caminos Rurales", "Red Ferroviaria"]
        },
        meta: {
            longitudCarretera: "+178,000 km pavimentados y +26,000 km de vías férreas",
            aeropuertos: "78 aeropuertos nacionales e internacionales"
        },
        features: [
            { name: "Corredor Carretero Federal 57", coords: [22.1565, -100.9855], desc: "Eje logístico México-Querétaro-SLP-Monterrey-Nuevo Laredo con mayor flujo comercial.", tag: "Carretera Federal 57 &bull; Eje NAFTA" },
            { name: "Corredor Carretero Federal 15", coords: [24.8090, -107.3940], desc: "Eje del Pacífico México-Guadalajara-Mazatlán-Hermosillo-Nogales.", tag: "Carretera Federal 15 &bull; Eje Pacífico" },
            { name: "Corredor Interoceánico del Istmo", coords: [16.8000, -94.8000], desc: "Conexión ferroviaria y carretera entre Salina Cruz (Pacífico) y Coatzacoalcos (Golfo).", tag: "Istmo de Tehuantepec &bull; Conexión Interoceánica" },
            { name: "Tren Maya (Circuito Sureste)", coords: [20.6843, -88.5678], desc: "Red ferroviaria de más de 1,550 km que interconecta 5 estados del sureste.", tag: "Sureste Mexicano &bull; Red Ferroviaria" }
        ]
    },
    "hidrografia": {
        id: "hidrografia",
        name: "Hidrografía",
        badge: "Red Hidrográfica Digital Continua",
        desc: "Red de corrientes de agua superficiales perennes e intermitentes, cuencas exorreicas y endorreicas, lagos naturales y grandes presas hidroeléctricas.",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; CONAGUA &copy; INEGI Red Hidrográfica 2.0',
        legend: {
            title: "Cuerpos de Agua y Corrientes Superficiales",
            bars: ["#08519c", "#3182bd", "#6baed6", "#9ecae1", "#c6dbef"],
            labels: ["Ríos Caudalosos", "Ríos Tributarios", "Lagos Naturales", "Presas de Almacenamiento", "Arroyos Estacionales"]
        },
        meta: {
            regionesHidrologicas: "37 Regiones Hidrológicas Oficiales en México",
            lagosPrincipales: "Lago de Chapala (1,112 km²), Cuitzeo (306 km²), Pátzcuaro"
        },
        features: [
            { name: "Río Bravo / Grande", coords: [26.0000, -98.3000], desc: "Frontera natural norte y uno de los ríos más largos de Norteamérica (3,034 km).", tag: "Cuenca del Río Bravo &bull; 3,034 km" },
            { name: "Río Grijalva - Usumacinta", coords: [17.8000, -92.5000], desc: "Sistema fluvial más caudaloso de México, alimenta las grandes presas hidroeléctricas.", tag: "Tabasco/Chiapas &bull; Mayor Caudal" },
            { name: "Río Lerma - Santiago", coords: [20.3000, -102.8000], desc: "Eje hidrográfico central que nace en el Estado de México y desemboca en el Pacífico.", tag: "Cuenca Central &bull; Lago de Chapala" },
            { name: "Río Balsas", coords: [18.2000, -101.5000], desc: "Cuenca estratégica del sur de México que drena Guerrero, Michoacán y Puebla.", tag: "Presa El Infiernillo &bull; Pacífico Sur" },
            { name: "Lago de Chapala", coords: [20.2500, -103.0000], desc: "El lago natural más grande de México (1,112 km²) y fuente de agua del occidente.", tag: "Jalisco / Michoacán &bull; 1,112 km²" }
        ]
    },
    "climatologia": {
        id: "climatologia",
        name: "Climatología",
        badge: "Clasificación Köppen-García Oficial",
        desc: "Distribución de los grandes grupos y subtipos climáticos en México: cálidos, secos, templados y fríos, complementados con isoyetas de lluvia media anual.",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; INEGI Climatología &copy; SMN',
        legend: {
            title: "Grupos Climáticos Oficiales de México",
            bars: ["#d73027", "#fc8d59", "#fee08b", "#d9ef8b", "#91cf60"],
            labels: ["Cálido Húmedo (A)", "Cálido Subhúmedo (Aw)", "Seco / Desértico (B)", "Templado Subhúmedo (C)", "Frío de Altura (E)"]
        },
        meta: {
            clasificacion: "Sistema Köppen adaptado a las condiciones orográficas de México",
            temperatura: "Rango medio anual de 10°C en sierras a 28°C en costas"
        },
        features: [
            { name: "Selva Lacandona (Cálido Húmedo)", coords: [16.5000, -91.0000], desc: "Zona con la mayor precipitación pluvial del país (más de 3,500 mm anuales).", tag: "Chiapas &bull; Clima Af / Am (Lluvias intensas)" },
            { name: "Desierto de Altar (Muy Seco / Árido)", coords: [31.5000, -113.5000], desc: "Una de las zonas más áridas de Norteamérica con menos de 100 mm de lluvia anual.", tag: "Sonora &bull; Clima BWh (Desértico extremo)" },
            { name: "Valle de Toluca (Templado Semifrío)", coords: [19.2900, -99.6500], desc: "Valle intermontano a más de 2,600 msnm con clima templado y heladas invernales.", tag: "Edomex &bull; Clima C(w) (Templado de altura)" },
            { name: "Península de Yucatán (Cálido Subhúmedo)", coords: [20.5000, -89.0000], desc: "Clima cálido con régimen regular de lluvias en verano y época de secas.", tag: "Yucatán &bull; Clima Aw (Selvas bajas y medianas)" }
        ]
    },
    "edafologia": {
        id: "edafologia",
        name: "Edafología",
        badge: "Clasificación Internacional WRB / FAO",
        desc: "Distribución de los tipos de suelo en las 32 entidades federativas: textura, profundidad, fertilidad, salinidad y aptitud para cultivos o pastoreo.",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; INEGI Edafología Serie II',
        legend: {
            title: "Grupos de Suelo Dominantes (WRB)",
            bars: ["#8c510a", "#bf812d", "#dfc27d", "#80cdc1", "#01665e"],
            labels: ["Leptosoles (24%)", "Regosoles (18.5%)", "Phaeozems (11.7%)", "Vertisoles (8.6%)", "Calcisoles (7.8%)"]
        },
        meta: {
            gruposPresentes: "24 de los 32 grupos mundiales de suelo WRB",
            fertilidad: "Phaeozems y Vertisoles representan las tierras más productivas"
        },
        features: [
            { name: "Suelos Vertisoles (El Bajío)", coords: [20.7000, -101.3000], desc: "Suelos arcillosos pesados de alta fertilidad agrícola en Guanajuato y Jalisco.", tag: "Guanajuato &bull; Alta Productividad Agrícola" },
            { name: "Suelos Leptosoles (Sierra Madre)", coords: [25.0000, -105.0000], desc: "Suelos delgados sobre roca continua en pendientes montañosas escarpadas.", tag: "Sierras Madres &bull; Vocación Forestal" },
            { name: "Suelos Calcisoles (Desierto Chihuahuense)", coords: [28.0000, -104.0000], desc: "Suelos con acumulación de carbonatos de calcio en zonas semiáridas del norte.", tag: "Chihuahua / Coahuila &bull; Zonas Áridas" },
            { name: "Suelos Andosoles (Faja Volcánica)", coords: [19.5000, -102.0000], desc: "Suelos derivados de cenizas volcánicas ideales para aguacate y bosques de coníferas.", tag: "Michoacán &bull; Origen Volcánico" }
        ]
    },
    "fisiografia": {
        id: "fisiografia",
        name: "Fisiografía",
        badge: "15 Provincias Fisiográficas Nacionales",
        desc: "Zonificación morfológica y tectónica de México dividida en 15 grandes provincias que reflejan el relieve, historia orogénica y tipos de topoformas.",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; INEGI Fisiografía Nacional',
        legend: {
            title: "Grandes Provincias Fisiográficas de México",
            bars: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3"],
            labels: ["Sierra Madre Occidental", "Sierra Madre Oriental", "Eje Neovolcánico", "Mesa del Centro", "Sierra Madre del Sur"]
        },
        meta: {
            totalProvincias: "15 Provincias y 73 Subprovincias Fisiográficas",
            metodologia: "Análisis morfométrico de pendientes y estructuras geológicas"
        },
        features: [
            { name: "Sierra Madre Occidental", coords: [26.0000, -106.0000], desc: "La cadena montañosa más larga de México con mesetas y cañones de más de 2,500 m.", tag: "Chihuahua / Durango / Sonora / Sinaloa" },
            { name: "Eje Neovolcánico Transversal", coords: [19.2000, -99.0000], desc: "Cinturón de estratovolcanes y conos cineríticos que cruza el país de este a oeste.", tag: "Cinturón Volcánico &bull; Mayores Cumbres" },
            { name: "Sierra Madre Oriental", coords: [25.5000, -100.5000], desc: "Sierras plegadas de rocas calizas marinas mesozoicas con cañones espectaculares.", tag: "Nuevo León / Coahuila / San Luis Potosí" },
            { name: "Península de Yucatán", coords: [20.0000, -89.0000], desc: "Plataforma cárstica plana casi desprovista de elevaciones con redes de cenotes subterráneos.", tag: "Relieve Cárstico &bull; Cenotes" },
            { name: "Sierra Madre del Sur", coords: [17.0000, -97.5000], desc: "Complejo orográfico muy abrupto y accidentado que bordea el Océano Pacífico.", tag: "Guerrero / Oaxaca / Michoacán" }
        ]
    },
    "geologia": {
        id: "geologia",
        name: "Geología",
        badge: "Litología, Tectónica y Fallas",
        desc: "Clasificación de rocas ígneas extrusivas e intrusivas, rocas sedimentarias y metamórficas, alineamiento de fallas activas y contacto de placas tectónicas.",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; SGM &copy; INEGI Geología',
        legend: {
            title: "Tipo de Roca Dominante y Régimen Tectónico",
            bars: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"],
            labels: ["Ígnea Volcánica (Basaltos)", "Ígnea Plutónica (Granitos)", "Sedimentaria Marina (Calizas)", "Sedimentaria Clástica (Areniscas)", "Metamórfica"]
        },
        meta: {
            placas: "Interacción de placas Norteamericana, Pacífico, Cocos, Rivera y Caribe",
            fallas: "Falla de San Andrés y fallas transformantes del Golfo de California"
        },
        features: [
            { name: "Cráter de Chicxulub (Impacto K/Pg)", coords: [21.3000, -89.5000], desc: "Estructura de impacto meteórico sepultada de 180 km de diámetro vinculada a la extinción de dinosaurios.", tag: "Yucatán &bull; Impacto Extraterrestre" },
            { name: "Volcán Paricutín", coords: [19.4933, -102.2514], desc: "El volcán más joven de América, nacido súbitamente en un campo de maíz en 1943.", tag: "Michoacán &bull; Volcán Cinder Cone (1943)" },
            { name: "Falla de San Andrés (Rift de Cortés)", coords: [32.0000, -115.0000], desc: "Límite transformante entre la Placa del Pacífico y la Placa Norteamericana.", tag: "Baja California &bull; Límite Tectónico Activo" },
            { name: "Sierra de Catorce (Rocas Antiguas)", coords: [23.6800, -100.8800], desc: "Afloramientos de rocas sedimentarias y metamórficas del Jurásico con minerales de plata.", tag: "San Luis Potosí &bull; Distrito Minero Histórico" }
        ]
    },
    "hidrologia": {
        id: "hidrologia",
        name: "Hidrología",
        badge: "653 Acuíferos Subterráneos",
        desc: "Delimitación y balance hidrológico de los 653 acuíferos subterráneos de México: recarga anual, extracción, zonas de veda y monitoreo de abatimiento.",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; CONAGUA &copy; INEGI Hidrología Subterránea',
        legend: {
            title: "Condición y Disponibilidad de Acuíferos",
            bars: ["#238b45", "#74c476", "#bae4b3", "#fed976", "#e31a1c"],
            labels: ["Disponibilidad Favorable", "Equilibrio Hidrológico", "Déficit Medio", "Sobreexplotado", "Veda Rígida"]
        },
        meta: {
            acuiferosTotales: "653 unidades hidrogeológicas delimitadas en el DOF",
            aguaSubterranea: "Provee agua potable a más del 70% de las ciudades mexicanas"
        },
        features: [
            { name: "Acuífero Valle de México", coords: [19.4000, -99.1000], desc: "Acuífero de alta demanda metropolitana con abatimiento de niveles y subsidencia.", tag: "CDMX / Edomex &bull; Alta Demanda Urbana" },
            { name: "Acuífero Valle de León", coords: [21.1200, -101.6800], desc: "Acuífero clave para el desarrollo industrial y agrícola de Guanajuato.", tag: "El Bajío &bull; Monitoreo de Sobreexplotación" },
            { name: "Acuífero Principal de La Laguna", coords: [25.5400, -103.4000], desc: "Suministro agrícola de Coahuila y Durango con programas de recarga hídrica.", tag: "Torreón / Gómez Palacio &bull; Zona Agrícola" },
            { name: "Anillo de Cenotes (Yucatán)", coords: [20.8000, -89.7000], desc: "Sistema hidrogeológico cárstico alineado con el borde del cráter de Chicxulub.", tag: "Yucatán &bull; Flujo Cárstico Subterráneo" }
        ]
    },
    "humedales": {
        id: "humedales",
        name: "Humedales Potenciales",
        badge: "144 Sitios Ramsar de Importancia Mundial",
        desc: "Catálogo de ecosistemas inundables: manglares de cuatro especies (rojo, blanco, negro, botoncillo), marismas costeras, ciénegas continentales y turberas.",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; CONABIO &copy; INEGI Humedales Protegidos',
        legend: {
            title: "Ecosistemas de Humedal Protegidos",
            bars: ["#005a32", "#238b45", "#41ab5d", "#74c476", "#a1d99b"],
            labels: ["Manglares Costeros", "Marismas Salobres", "Pantanos Continentales", "Lagos y Ciénegas", "Sitios Ramsar"]
        },
        meta: {
            sitiosRamsar: "144 sitios con más de 8.6 millones de hectáreas protegidas",
            manglares: "México posee la 4ª extensión de manglares más extensa del planeta"
        },
        features: [
            { name: "Marismas Nacionales", coords: [22.0000, -105.5000], desc: "El bosque de manglar más extenso del Pacífico mexicano en Nayarit y Sinaloa.", tag: "Nayarit / Sinaloa &bull; Sitio Ramsar 732" },
            { name: "Pantanos de Centla", coords: [18.3000, -92.6000], desc: "Delta de los ríos Grijalva y Usumacinta con 302,000 hectáreas de humedales.", tag: "Tabasco &bull; Mayor Humedal Continental" },
            { name: "Ría Celestún", coords: [20.8500, -90.4000], desc: "Estuario con manantiales de agua dulce y principal colonia de flamencos del Caribe.", tag: "Yucatán / Campeche &bull; Santuario de Aves" },
            { name: "Cuatro Ciénegas", coords: [26.9800, -102.0600], desc: "Valle con pozas de agua y estromatolitos con especies microbianas únicas en el mundo.", tag: "Coahuila &bull; Ecosistema Fósil Único" }
        ]
    },
    "uso_suelo": {
        id: "uso_suelo",
        name: "Uso de Suelo y Vegetación",
        badge: "Serie VII Oficial del INEGI",
        desc: "Cartografía de cobertura vegetal y uso del suelo: bosques templados, selvas húmedas y secas, matorral xerófilo, pastizales, zonas agrícolas y urbanas.",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; INEGI Serie VII &copy; CONAFOR',
        legend: {
            title: "Cobertura Vegetal y Uso del Suelo (Serie VII)",
            bars: ["#00441b", "#006d2c", "#238b45", "#e7298a", "#d95f02"],
            labels: ["Bosque Templado (17.2%)", "Selva Húmeda/Seca (16.1%)", "Matorral Xerófilo (29.4%)", "Pastizal (10.1%)", "Agricultura y Urbano (27.2%)"]
        },
        meta: {
            metodologia: "Interpretación visual de imágenes satelitales multiespectrales y muestreo de campo",
            escala: "1:250,000 continua en todo el territorio"
        },
        features: [
            { name: "Bosques de Coníferas (Eje Neovolcánico)", coords: [19.5000, -100.2000], desc: "Bosques de oyamel y pino hogar de hibernación de la mariposa monarca.", tag: "Michoacán / Edomex &bull; Reserva de la Monarca" },
            { name: "Selva Maya (Calakmul)", coords: [18.1000, -89.8000], desc: "El mayor macizo de selva tropical de México y segundo más grande de América.", tag: "Campeche &bull; Selva Tropical y Patrimonio UNESCO" },
            { name: "Matorral Espinoso Tamaulipeco", coords: [24.5000, -98.5000], desc: "Comunidad vegetal densa adaptada al calor y suelos arcillosos del noreste.", tag: "Tamaulipas / Nuevo León &bull; Matorral" },
            { name: "Distrito de Riego del Río Yaqui", coords: [27.3000, -110.0000], desc: "Intensa agricultura tecnificada de trigo, maíz y hortalizas bajo riego.", tag: "Sonora &bull; Granero de México" }
        ]
    },
    "uso_potencial": {
        id: "uso_potencial",
        name: "Uso Potencial de Suelo",
        badge: "Zonificación Agroecológica Nacional",
        desc: "Capacidad agrológica del territorio mexicano para el desarrollo de agricultura mecanizada continua, ganadería intensiva o aprovechamiento forestal sustentable.",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; SADER &copy; INEGI Uso Potencial de Suelo',
        legend: {
            title: "Capacidad y Vocación Agrológica",
            bars: ["#1a9850", "#91cf60", "#d9ef8b", "#fee08b", "#fc8d59"],
            labels: ["Alta Aptitud Agrícola", "Media Aptitud Agrícola", "Aptitud Pecuaria", "Aptitud Forestal", "Conservación / No Apto"]
        },
        meta: {
            criterios: "Pendiente del terreno, profundidad de suelo, precipitación y fertilidad",
            objetivo: "Prevenir la degradación de suelos e impulsar la productividad sustentable"
        },
        features: [
            { name: "Zona de Alta Aptitud Agrícola (El Bajío)", coords: [20.8000, -101.5000], desc: "Tierras planas y ricas en nutrientes con disponibilidad de riego tecnificado.", tag: "Guanajuato / Querétaro &bull; Alta Aptitud" },
            { name: "Zona de Vocación Ganadera (Norte Árido)", coords: [29.0000, -106.0000], desc: "Vastos pastizales naturales ideales para ganadería bovina de exportación.", tag: "Chihuahua / Sonora &bull; Ganadería Bovina" },
            { name: "Zona Forestal Maderable (Sierra Tarahumara)", coords: [27.8000, -107.0000], desc: "Bosques templados con alto potencial de aprovechamiento forestal certificado.", tag: "Chihuahua &bull; Vocación Silvícola" },
            { name: "Suelos de Conservación Ecológica", coords: [16.2000, -96.5000], desc: "Pendientes montañosas que deben permanecer con cubierta forestal para evitar deslaves.", tag: "Sierras de Oaxaca &bull; Protección Hídrica" }
        ]
    }
};

// Puntos insulares detallados (Territorio Insular de México)
window.INEGI_INSULAR_POINTS = [
    { name: "Isla Guadalupe", coords: [29.0333, -118.2833], estado: "Baja California", ocean: "Océano Pacífico", desc: "Isla oceánica volcánica, Reserva de la Biosfera marina y punto extremo occidental de México." },
    { name: "Isla Cedros", coords: [28.1833, -115.2167], estado: "Baja California", ocean: "Océano Pacífico", desc: "La isla más poblada del Pacífico norte mexicano con tradición pesquera y salinera." },
    { name: "Isla Tiburón", coords: [28.9833, -112.3500], estado: "Sonora", ocean: "Golfo de California", desc: "La isla más grande de México (1,208 km²), territorio sagrado de la nación Comcáac (Seri)." },
    { name: "Isla Ángel de la Guarda", coords: [29.2555, -113.3666], estado: "Baja California", ocean: "Golfo de California", desc: "Segunda isla más grande del país, santuario de reptiles y aves marinas endémicas." },
    { name: "Islas Marías (Isla Madre)", coords: [21.6333, -106.5333], estado: "Nayarit", ocean: "Océano Pacífico", desc: "Archipiélago emblemático transformado en Centro de Educación Ambiental y Reserva de la Biosfera." },
    { name: "Isla Socorro (Revillagigedo)", coords: [18.7900, -110.9600], estado: "Colima", ocean: "Océano Pacífico", desc: "Patrimonio Natural Mundial de la Humanidad UNESCO, volcán activo y base de soberanía marítima." },
    { name: "Isla San Benedicto (Revillagigedo)", coords: [19.3100, -110.8200], estado: "Colima", ocean: "Océano Pacífico", desc: "Isla del Archipiélago de Revillagigedo famosa por el volcán Bárcena y mantas gigantes." },
    { name: "Isla Clarión (Revillagigedo)", coords: [18.3583, -114.7250], estado: "Colima", ocean: "Océano Pacífico", desc: "El punto territorial más occidental de los Estados Unidos Mexicanos." },
    { name: "Isla Cozumel", coords: [20.4333, -86.9167], estado: "Quintana Roo", ocean: "Mar Caribe", desc: "La isla más poblada de México, cuna del Gran Arrecife Maya y destino turístico internacional." },
    { name: "Isla Mujeres", coords: [21.2333, -86.7333], estado: "Quintana Roo", ocean: "Mar Caribe", desc: "Punto más oriental de México, santuario de tortugas marinas y arrecife de coral." },
    { name: "Isla Holbox", coords: [21.5277, -87.2600], estado: "Quintana Roo", ocean: "Golfo de México / Caribe", desc: "Área de Protección de Flora y Fauna Yum Balam y refugio del tiburón ballena." },
    { name: "Arrecife Alacranes", coords: [22.5200, -89.7100], estado: "Yucatán", ocean: "Golfo de México", desc: "El complejo arrecifal más grande del Golfo de México, clave para la soberanía marítima." },
    { name: "Banco Chinchorro", coords: [18.5833, -87.3500], estado: "Quintana Roo", ocean: "Mar Caribe", desc: "El mayor atolón de coral de México con cementerios de pecios históricos y fauna marina protegida." },
    { name: "Isla del Carmen", coords: [18.6500, -91.8000], estado: "Campeche", ocean: "Golfo de México", desc: "Isla de barrera que separa la Laguna de Términos del Golfo de México, sede industrial pesquera y petrolera." },
    { name: "Isla Espíritu Santo", coords: [24.4700, -110.3300], estado: "Baja California Sur", ocean: "Golfo de California", desc: "Área Natural Protegida y joya del Mar de Cortés con colonias de lobos marinos." }
];
