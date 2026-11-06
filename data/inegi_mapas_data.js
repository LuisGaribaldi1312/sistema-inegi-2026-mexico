// =============================================================================
// CATÁLOGO OFICIAL DE MAPAS DEL INEGI (14 MAPAS TEMÁTICOS Y CARTOGRÁFICOS)
// Basado en el visualizador oficial de Mapas del INEGI
// =============================================================================

window.INEGI_MAPAS_CATALOG = {
    "topografia": {
        id: "topografia",
        name: "Topografía",
        badge: "Escala 1:50,000 / 1:250,000",
        desc: "Representación del relieve continental mediante curvas de nivel, cotas fotogramétricas, elevaciones y rasgos fisiográficos del territorio nacional generados a partir del Continuo de Elevaciones Mexicano.",
        layerType: "topo",
        tileUrl: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        subdomains: ["a", "b", "c"],
        attribution: '&copy; OpenTopoMap &copy; INEGI Topografía Oficial',
        legend: {
            title: "Elevación Topográfica (msnm)",
            bars: ["#2d6a4f", "#74c69d", "#d8f3dc", "#ffe6a7", "#bb9457", "#6f1d1b"],
            labels: ["0 m", "500 m", "1,500 m", "2,500 m", "4,000 m", "5,636 m (Pico de Orizaba)"]
        },
        meta: {
            escala: "1:50,000 y 1:250,000",
            sistema: "ITRF2008 / WGS84",
            elementos: "Curvas de nivel maestras e intermedias, cotas, topoformas, puertos de montaña"
        }
    },
    "relieve_continental": {
        id: "relieve_continental",
        name: "Relieve Continental",
        badge: "Modelo Digital de Elevación (MDE)",
        desc: "Continuo de Elevaciones Mexicano (CEM 3.0) con sombreado de laderas que define la estructura geomorfológica de sierras, cañones, mesetas y planicies.",
        layerType: "relief",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; ESRI Shaded Relief &copy; INEGI Continuo de Elevaciones',
        legend: {
            title: "Estructura del Relieve Continental",
            bars: ["#4a7c59", "#8fc0a9", "#c8d5b9", "#faf3dd", "#685634"],
            labels: ["Llanuras Costeras", "Valles Intermontanos", "Meseta Central", "Sierras Madres", "Eje Neovolcánico"]
        },
        meta: {
            resolucion: "15 y 30 metros de celda",
            formato: "Raster GeoTIFF / Bil y Grid",
            cobertura: "100% Territorio Continental de México"
        }
    },
    "relieve_submarino": {
        id: "relieve_submarino",
        name: "Relieve Submarino",
        badge: "Batimetría de Fondos Oceánicos",
        desc: "Batimetría multihaz y digitalización de la plataforma continental, talud insular, planicies abisales y fosas marinas del Golfo de México, Mar Caribe y Océano Pacífico.",
        layerType: "ocean",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; ESRI Ocean Basemap &copy; GEBCO &copy; INEGI Relieve Submarino',
        legend: {
            title: "Profundidad Oceánica (Metros Bajo el Mar)",
            bars: ["#c6dbef", "#9ecae1", "#6baed6", "#3182bd", "#08519c"],
            labels: ["0 m (Costa)", "-200 m (Plataforma)", "-1,500 m (Talud)", "-3,500 m (Planicie)", "-6,500 m (Fosa Mesoamericana)"]
        },
        meta: {
            limites: "Plataforma continental jurídica y ZEE (200 millas náuticas)",
            profundidadMax: "Fosa Mesoamericana en el Pacífico (-6,662 m)"
        }
    },
    "territorio_insular": {
        id: "territorio_insular",
        name: "Territorio Insular",
        badge: "4,111 Islas, Cayos y Arrecifes Oficiales",
        desc: "Catálogo geográfico de las 4,111 islas, cayos, islotes y arrecifes bajo soberanía mexicana que extienden la Zona Económica Exclusiva (ZEE) a más de 3.1 millones de km².",
        layerType: "insular",
        tileUrl: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
        attribution: '&copy; Google Satellite Hybrid &copy; INEGI Territorio Insular Mexicano',
        legend: {
            title: "Categorización del Territorio Insular",
            bars: ["#BC955C", "#0084B4", "#107C41", "#8A1538", "#E87722"],
            labels: ["Islas Mayores", "Islotes", "Cayos", "Arrecifes", "Límite Marítimo ZEE"]
        },
        meta: {
            totalElementos: "4,111 islas, cayos, islotes y arrecifes",
            superficieInsular: "5,127 km² emergidos",
            archipielagos: "Revillagigedo, Islas Marías, Arrecife Alacranes, San Benito"
        },
        hasInsularPoints: true
    },
    "vias_comunicacion": {
        id: "vias_comunicacion",
        name: "Vías de Comunicación",
        icon: "fa-road",
        badge: "Red Nacional de Caminos (RNC)",
        desc: "Red geoestadística continua con carreteras pavimentadas libres y de cuota, autopistas de altas especificaciones, caminos rurales, vías férreas, puertos y aeropuertos.",
        layerType: "roads",
        tileUrl: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        attribution: '&copy; Google Maps &copy; SCT &copy; INEGI Red Nacional de Caminos',
        legend: {
            title: "Tipo de Vía de Comunicación",
            bars: ["#d7191c", "#fdae6b", "#ffffbf", "#abdda4", "#2b83ba"],
            labels: ["Autopistas de Cuota", "Carreteras Federales", "Carreteras Estatales", "Caminos Rurales", "Red Ferroviaria"]
        },
        meta: {
            longitudTotal: "+178,000 km carreteros y +26,000 km ferroviarios",
            actualizacion: "Integración anual con SCT y CAPUFE"
        }
    },
    "hidrografia": {
        id: "hidrografia",
        name: "Hidrografía",
        badge: "Red Hidrográfica Escala 1:50,000",
        desc: "Red de corrientes superficiales perennes e intermitentes, cuencas, subcuencas, lagos, lagunas, presas de almacenamiento y manantiales.",
        layerType: "hydro",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; CONAGUA &copy; INEGI Red Hidrográfica 2.0',
        legend: {
            title: "Jerarquía de Cuencas y Corrientes",
            bars: ["#08519c", "#3182bd", "#6baed6", "#9ecae1", "#c6dbef"],
            labels: ["Ríos Caudalosos", "Ríos Tributarios", "Lagos Naturales", "Presas de Almacenamiento", "Arroyos Estacionales"]
        },
        meta: {
            cuencas: "37 Regiones Hidrológicas Oficiales",
            riosPrincipales: "Bravo, Lerma-Santiago, Balsas, Grijalva, Usumacinta, Pánuco"
        }
    },
    "climatologia": {
        id: "climatologia",
        name: "Climatología",
        badge: "Köppen modificado por E. García",
        desc: "Distribución de los tipos climáticos de México (cálidos, secos, templados y fríos), isoyetas de precipitación anual media e isotermas térmicas.",
        layerType: "climate",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; INEGI Climatología &copy; SMN',
        legend: {
            title: "Grupos Climáticos de México",
            bars: ["#e6550d", "#fdae6b", "#feedde", "#74c476", "#006d2c"],
            labels: ["Cálido Húmedo (A)", "Cálido Subhúmedo (Aw)", "Seco y Muy Seco (B)", "Templado Subhúmedo (C)", "Frío de Altura (E)"]
        },
        meta: {
            sistemaClasificacion: "Köppen-García adaptado al territorio mexicano",
            precipitacion: "Rangos de 100mm (Altar, Son.) a más de 4,500mm (Teapa, Tab.)"
        }
    },
    "edafologia": {
        id: "edafologia",
        name: "Edafología",
        badge: "Clasificación Internacional WRB / FAO",
        desc: "Tipos de suelo predominantes en México, características físicas, textura, fertilidad, profundidad efectiva y susceptibilidad a la erosión.",
        layerType: "edaf",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; INEGI Edafología Serie II',
        legend: {
            title: "Unidades de Suelo Dominantes",
            bars: ["#8c510a", "#bf812d", "#dfc27d", "#80cdc1", "#01665e"],
            labels: ["Leptosoles (Suelos someros)", "Regosoles (No consolidados)", "Phaeozems (Ricos en materia orgánica)", "Vertisoles (Arcillas expansivas)", "Calcisoles (Suelos calcáreos)"]
        },
        meta: {
            tiposIdentificados: "24 de los 32 grupos mundiales de suelo WRB presentes en México",
            erosion: "Cartografía de erosión hídrica y eólica"
        }
    },
    "fisiografia": {
        id: "fisiografia",
        name: "Fisiografía",
        badge: "15 Provincias Fisiográficas",
        desc: "Zonificación morfológica y tectónica de México dividida en 15 grandes provincias fisiográficas con sus respectivas subprovincias y topoformas.",
        layerType: "physio",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; INEGI Fisiografía Serie I',
        legend: {
            title: "Provincias Fisiográficas de México",
            bars: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3"],
            labels: ["Sierra Madre Occidental", "Sierra Madre Oriental", "Eje Neovolcánico", "Mesa del Centro", "Sierra Madre del Sur"]
        },
        meta: {
            provinciasTotales: "15 Provincias Fisiográficas y 73 Subprovincias",
            topoformas: "Sierras, mesetas, lomeríos, cañones y valles"
        }
    },
    "geologia": {
        id: "geologia",
        name: "Geología",
        badge: "Litología y Eras Geológicas",
        desc: "Rocas ígneas intrusivas y extrusivas, rocas sedimentarias y metamórficas, fallas activas, fracturas tectónicas y yacimientos minerales.",
        layerType: "geology",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; Servicio Geológico Mexicano &copy; INEGI Geología',
        legend: {
            title: "Grupos de Rocas y Fallas",
            bars: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"],
            labels: ["Ígnea Extrusiva (Basaltos/Riolitas)", "Ígnea Intrusiva (Granitos)", "Sedimentaria Marina", "Sedimentaria Continental", "Metamórfica"]
        },
        meta: {
            placasTectonicas: "Interacción de placas Norteamericana, Pacífico, Cocos, Rivera y Caribe",
            vulcanismo: "Faja Volcánica Transmexicana"
        }
    },
    "hidrologia": {
        id: "hidrologia",
        name: "Hidrología",
        badge: "653 Acuíferos Delimitados",
        desc: "Disponibilidad de agua subterránea, delimitación oficial de los 653 acuíferos de México, nivel piezométrico y balance hidrogeológico.",
        layerType: "aquifers",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; CONAGUA &copy; INEGI Hidrología Subterránea',
        legend: {
            title: "Balance Medio Anual de Acuíferos",
            bars: ["#238b45", "#74c476", "#bae4b3", "#fed976", "#e31a1c"],
            labels: ["Disponibilidad Alta", "Disponibilidad Media", "Equilibrio", "Déficit Hidráulico", "Sobreexplotación Crítica"]
        },
        meta: {
            totalAcuiferos: "653 acuíferos evaluados oficialmente en DOF",
            sobreexplotados: "115 acuíferos prioritarios bajo monitoreo"
        }
    },
    "humedales": {
        id: "humedales",
        name: "Humedales Potenciales",
        badge: "144 Sitios Ramsar Protegidos",
        desc: "Ecosistemas inundables, manglares costeros del Golfo y Pacífico, marismas, ciénegas, turberas y lagunas protegidas por la Convención Ramsar.",
        layerType: "wetlands",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; CONABIO &copy; INEGI Humedales de México',
        legend: {
            title: "Tipos de Humedal",
            bars: ["#005a32", "#238b45", "#41ab5d", "#74c476", "#a1d99b"],
            labels: ["Manglares Costeros", "Marismas Salobres", "Pantanos de Agua Dulce", "Ciénagas y Lagunas", "Sitios Ramsar"]
        },
        meta: {
            sitiosRamsar: "144 sitios con más de 8.6 millones de hectáreas",
            manglares: "México posee el 4° lugar mundial en extensión de manglares"
        }
    },
    "uso_suelo": {
        id: "uso_suelo",
        name: "Uso de Suelo y Vegetación",
        badge: "Serie VII Oficial INEGI",
        desc: "Cartografía de cobertura vegetal y uso antrópico: bosques templados, selvas húmedas y secas, matorrales desérticos, pastizales, agricultura y zonas urbanas.",
        layerType: "landuse",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; INEGI Serie VII &copy; CONAFOR',
        legend: {
            title: "Cobertura Vegetal y Uso del Suelo",
            bars: ["#00441b", "#006d2c", "#238b45", "#e7298a", "#d95f02"],
            labels: ["Bosque Templado (17.2%)", "Selva Húmeda y Seca (16.1%)", "Matorral Xerófilo (29.4%)", "Pastizal Inducido (10.1%)", "Agricultura y Urbano (27.2%)"]
        },
        meta: {
            metodologia: "Interpretación visual de imágenes de satélite y verificación de campo",
            escala: "1:250,000 en 121 cartas continuas"
        }
    },
    "uso_potencial": {
        id: "uso_potencial",
        name: "Uso Potencial de Suelo",
        badge: "Aptitud Agroecológica y Forestal",
        desc: "Capacidad potencial de los terrenos para sostener actividades agrícolas mecanizadas, ganadería extensiva o conservación forestal sin degradación.",
        layerType: "potencial",
        tileUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        attribution: '&copy; SADER &copy; INEGI Uso Potencial',
        legend: {
            title: "Capacidad Agrológica del Territorio",
            bars: ["#1a9850", "#91cf60", "#d9ef8b", "#fee08b", "#fc8d59"],
            labels: ["Alta Aptitud Agrícola", "Media Aptitud Agrícola", "Aptitud Pecuaria", "Aptitud Forestal", "Conservación / No Apto"]
        },
        meta: {
            variables: "Pendiente, profundidad de suelo, precipitación y temperatura",
            aplicacion: "Ordenamiento ecológico territorial y planeación agropecuaria"
        }
    }
};

// -----------------------------------------------------------------------------
// PUNTOS CLAVE DEL TERRITORIO INSULAR MEXICANO (4,111 ELEMENTOS)
// -----------------------------------------------------------------------------
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
