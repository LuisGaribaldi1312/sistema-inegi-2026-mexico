// =============================================================================
// CATÁLOGO OFICIAL DE INFORMACIÓN INSTITUCIONAL INEGI (SNIEG 2026)
// Contenidos auténticos, metodologías y enlaces oficiales del portal del INEGI
// =============================================================================

window.INEGI_MENU_INFO = {
    // -------------------------------------------------------------------------
    // TEMAS: DEMOGRAFÍA Y SOCIEDAD
    // -------------------------------------------------------------------------
    "educacion": {
        category: "Temas > Demografía y Sociedad",
        title: "Educación y Capacitación",
        icon: "fa-graduation-cap",
        badge: "Censo 2020 & SEP",
        summary: "Información estadística sobre el nivel de escolaridad de la población, asistencia escolar, analfabetismo, eficiencia terminal y características educativas de los habitantes de México.",
        officialDefinition: "El INEGI capta a través de los censos de población y encuestas en hogares (como la ENIGH y la ENOE) el nivel de instrucción formal alcanzado por los habitantes, la asistencia a escuelas y la condición de alfabetismo a nivel nacional, estatal, municipal y por localidad.",
        keyMetrics: [
            { label: "Grado promedio de escolaridad nacional", val: "9.7 años (equivalente a secundaria concluida)" },
            { label: "Tasa de analfabetismo en población de 15+ años", val: "4.7% (disminución constante desde 2010)" },
            { label: "Asistencia escolar en niñas y niños de 6 a 14 años", val: "94.1% a nivel nacional" },
            { label: "Población de 15 años y más con educación superior", val: "21.6% de la población total" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/educacion/",
        scinceFilter: "escolaridad"
    },
    "empleo": {
        category: "Temas > Demografía y Sociedad",
        title: "Empleo y Ocupación",
        icon: "fa-briefcase",
        badge: "ENOE Continua",
        summary: "Datos continuos y mensuales sobre la Población Económicamente Activa (PEA), ocupación formal e informal, subocupación y tasas de desocupación.",
        officialDefinition: "La Encuesta Nacional de Ocupación y Empleo (ENOE) es el proyecto estadístico continuo que genera cifras mensuales y trimestrales del mercado de trabajo mexicano, conforme a las directrices de la Organización Internacional del Trabajo (OIT).",
        keyMetrics: [
            { label: "Población Económicamente Activa (PEA)", val: "60.5 millones de personas" },
            { label: "Tasa de ocupación nacional", val: "97.3% de la PEA" },
            { label: "Tasa de desocupación abierta", val: "2.7% (niveles mínimos históricos)" },
            { label: "Tasa de informalidad laboral", val: "54.1% de la población ocupada" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/empleo/",
        scinceFilter: "ingreso"
    },
    "hogares_vivienda": {
        category: "Temas > Demografía y Sociedad",
        title: "Hogares y Vivienda",
        icon: "fa-house-chimney",
        badge: "Censo 2020 & INV",
        summary: "Estadísticas sobre viviendas particulares habitadas, materiales de construcción, hacinamiento, servicios básicos y equipamiento tecnológico.",
        officialDefinition: "El Censo de Población y Vivienda 2020 y el Inventario Nacional de Viviendas (INV) caracterizan las condiciones habitacionales, la tenencia, disponibilidad de agua potable, energía eléctrica, drenaje, tecnologías y saneamiento en el país.",
        keyMetrics: [
            { label: "Viviendas particulares habitadas en México", val: "35,219,514 viviendas" },
            { label: "Promedio de ocupantes por vivienda", val: "3.6 personas por hogar" },
            { label: "Disponibilidad de energía eléctrica", val: "99.2% de las viviendas habitadas" },
            { label: "Disponibilidad de agua potable entubada", val: "96.1% de las viviendas habitadas" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/vivienda/",
        scinceFilter: "pob2026"
    },
    "poblacion": {
        category: "Temas > Demografía y Sociedad",
        title: "Población y Dinámica Demográfica",
        icon: "fa-users",
        badge: "Censo 2020 & Proyecciones",
        summary: "Evolución del volumen poblacional, estructura por edad y sexo, fecundidad, mortalidad y migración interna e internacional.",
        officialDefinition: "El Censo de Población y Vivienda 2020 determinó que en México residen 126,014,024 personas, con proyecciones oficiales 2026 que superan los 132.4 millones de habitantes, constituyendo el décimo país más poblado del mundo.",
        keyMetrics: [
            { label: "Población Censo 2020", val: "126,014,024 personas" },
            { label: "Proyección Demográfica 2026", val: "132,450,000 personas" },
            { label: "Distribución por sexo", val: "51.2% Mujeres / 48.8% Hombres" },
            { label: "Edad mediana de la población", val: "29 años" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/estructura/",
        scinceFilter: "pob2026"
    },
    "salud": {
        category: "Temas > Demografía y Sociedad",
        title: "Salud y Seguridad Social",
        icon: "fa-heart-pulse",
        badge: "Censo 2020 & Registros",
        summary: "Condición de derechohabiencia a servicios de salud, causas de defunción, discapacidad y limitaciones en la actividad cotidiana.",
        officialDefinition: "El INEGI recopila información de afiliación a instituciones de seguridad social (IMSS, ISSSTE, Pemex, Sedena, Semar, IMSS-Bienestar) y estadísticas vitales sobre natalidad y mortalidad general por causas.",
        keyMetrics: [
            { label: "Población con derechohabiencia a salud", val: "73.5% de los habitantes (92.6M)" },
            { label: "Esperanza de vida al nacer", val: "75.4 años (78.1 mujeres / 72.4 hombres)" },
            { label: "Población con alguna discapacidad o limitación", val: "16.5% de la población nacional" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/derechohabiencia/",
        scinceFilter: "pob2026"
    },
    "tic": {
        category: "Temas > Demografía y Sociedad",
        title: "Tecnologías de la Información y Comunicaciones (TIC)",
        icon: "fa-wifi",
        badge: "ENDUTIH Oficial",
        summary: "Disponibilidad y uso de computadoras, internet, telefonía celular móvil y tecnologías inteligentes en los hogares mexicanos.",
        officialDefinition: "La Encuesta Nacional sobre Disponibilidad y Uso de Tecnologías de la Información en los Hogares (ENDUTIH) mide el avance de la inclusión digital y la conectividad en zonas urbanas y rurales de México.",
        keyMetrics: [
            { label: "Hogares con conexión a Internet", val: "78.6% a nivel nacional" },
            { label: "Usuarios de teléfono celular inteligente", val: "91.4% de la población de 6+ años" },
            { label: "Usuarios de Internet en México", val: "97.0 millones de personas" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/ticshogares/",
        scinceFilter: "internet"
    },

    // -------------------------------------------------------------------------
    // TEMAS: ECONOMÍA Y SECTORES PRODUCTIVOS
    // -------------------------------------------------------------------------
    "agricultura": {
        category: "Temas > Economía y Sectores Productivos",
        title: "Agricultura, Ganadería y Pesca",
        icon: "fa-wheat-awn",
        badge: "Censo Agropecuario",
        summary: "Estadísticas del campo mexicano: unidades de producción agropecuaria y forestal, tenencia de la tierra, riego, cultivos y cría de ganado.",
        officialDefinition: "El Censo Agropecuario 2022 ofrece el diagnóstico más completo de la producción rural en México, identificando las actividades de pequeños, medianos y grandes productores agrícolas y pecuarios.",
        keyMetrics: [
            { label: "Superficie de uso agrícola en México", val: "32.1 millones de hectáreas" },
            { label: "Unidades de producción agropecuaria activas", val: "5.0 millones en el país" },
            { label: "Principales cultivos perennes y cíclicos", val: "Maíz grano, caña, frijol, aguacate, jitomate" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/agricultura/",
        scinceFilter: "ingreso"
    },
    "comercio": {
        category: "Temas > Economía y Sectores Productivos",
        title: "Comercio Interior",
        icon: "fa-cart-shopping",
        badge: "DENUE & EMEC",
        summary: "Indicadores mensuales de ventas al mayoreo y al menudeo, ingresos por suministro de bienes y servicios y personal ocupado.",
        officialDefinition: "La Encuesta Mensual sobre Empresas Comerciales (EMEC) y los Censos Económicos proporcionan información continua sobre la dinámica comercial que genera más del 19.5% del PIB nacional.",
        keyMetrics: [
            { label: "Establecimientos comerciales en México (DENUE)", val: "2.18 millones de comercios" },
            { label: "Participación en el empleo total", val: "31.2% de los puestos de trabajo" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/comercioemp/",
        scinceFilter: "ingreso"
    },
    "comercio_exterior": {
        category: "Temas > Economía y Sectores Productivos",
        title: "Comercio Exterior y Balanza Comercial",
        icon: "fa-ship",
        badge: "Balanza Comercial SAT-INEGI",
        summary: "Registro de exportaciones e importaciones de mercancías de México: petroleras, no petroleras, automotrices y bienes de capital.",
        officialDefinition: "Información generada por el Grupo de Trabajo SAT, Secretaría de Economía, Banco de México e INEGI que detalla mensualmente el flujo comercial internacional del país.",
        keyMetrics: [
            { label: "Exportaciones totales de mercancías", val: "+590,000 millones de USD anuales" },
            { label: "Componente manufacturero automotriz", val: "32.4% del valor total de exportación" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/comercioext/",
        scinceFilter: "ingreso"
    },
    "construccion": {
        category: "Temas > Economía y Sectores Productivos",
        title: "Industria de la Construcción",
        icon: "fa-trowel-bricks",
        badge: "ENEC Oficial",
        summary: "Evolución del valor de producción de las empresas constructoras: edificación, obras de transporte, infraestructura eléctrica y saneamiento.",
        officialDefinition: "La Encuesta Nacional de Empresas Constructoras (ENEC) mide mensualmente el comportamiento del sector constructor tanto en obras públicas como privadas en las 32 entidades.",
        keyMetrics: [
            { label: "Aportación al PIB Nacional", val: "6.8% del Producto Interno Bruto" },
            { label: "Personal ocupado en la construcción", val: "Más de 4.4 millones de trabajadores" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/construccion/",
        scinceFilter: "ingreso"
    },
    "empresas": {
        category: "Temas > Economía y Sectores Productivos",
        title: "Empresas y Establecimientos (DENUE)",
        icon: "fa-store",
        badge: "Directorio DENUE 2026",
        summary: "Directorio Nacional con la ubicación geográfica exacta y razón social de más de 5.5 millones de unidades económicas activas.",
        officialDefinition: "El Directorio Estadístico Nacional de Unidades Económicas (DENUE) es la herramienta fundamental del INEGI para localizar establecimientos micro, pequeños, medianos y grandes por sector de actividad económica.",
        keyMetrics: [
            { label: "Unidades económicas registradas y geolocalizadas", val: "5,540,000 establecimientos" },
            { label: "Porcentaje de micro y pequeñas empresas", val: "94.8% del tejido empresarial" }
        ],
        officialUrl: "https://www.inegi.org.mx/app/mapa/denue/",
        scinceFilter: "ingreso"
    },
    "manufacturas": {
        category: "Temas > Economía y Sectores Productivos",
        title: "Industrias Manufactureras",
        icon: "fa-industry",
        badge: "EMIM Oficial",
        summary: "Producción, horas trabajadas, capacidad de planta utilizada y remuneraciones en los 21 subsectores de la manufactura nacional.",
        officialDefinition: "La Encuesta Mensual de la Industria Manufacturera (EMIM) analiza el motor industrial de México, liderado por la fabricación de equipo de transporte, electrónica, química y alimentos.",
        keyMetrics: [
            { label: "Participación en el PIB de México", val: "18.2% del Producto Interno Bruto" },
            { label: "Aportación a exportaciones manufactureras", val: "88.6% del total no petrolero" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/manufacturas/",
        scinceFilter: "ingreso"
    },
    "mineria": {
        category: "Temas > Economía y Sectores Productivos",
        title: "Minería y Extracción",
        icon: "fa-gem",
        badge: "Estadística Minerometalúrgica",
        summary: "Volumen y valor de la producción de minerales metálicos y no metálicos en México: oro, plata, plomo, cobre, zinc, carbón y azufre.",
        officialDefinition: "Información mensual sobre las empresas mineras de beneficio y fundición, destacando el liderazgo global de México en producción de plata y fluorita.",
        keyMetrics: [
            { label: "Liderazgo mundial en plata", val: "México es el 1° productor mundial" },
            { label: "Entidades mineras líderes", val: "Zacatecas, Sonora, Chihuahua, Durango" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/mineria/",
        scinceFilter: "ingreso"
    },
    "pib": {
        category: "Temas > Economía y Sectores Productivos",
        title: "PIB y Cuentas Nacionales",
        icon: "fa-chart-pie",
        badge: "SCNM Año Base 2018",
        summary: "Estimación Oportuna y Cifras Definitivas del Producto Interno Bruto (PIB) trimestral y anual por entidad federativa y gran actividad económica.",
        officialDefinition: "El Sistema de Cuentas Nacionales de México (SCNM) es el marco contable macroeconómico que mide el valor monetario de todos los bienes y servicios finales producidos en el país.",
        keyMetrics: [
            { label: "Crecimiento anual del PIB (2º Trim 2026)", val: "3.2% a tasa anual desestacionalizada" },
            { label: "Variación trimestral del PIB", val: "0.9% respecto al trimestre inmediato anterior" },
            { label: "Actividades Terciarias (Servicios y Comercio)", val: "64.2% del PIB total de México" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/pib/",
        scinceFilter: "ingreso"
    },
    "precios": {
        category: "Temas > Economía y Sectores Productivos",
        title: "Índices de Precios (Inflación)",
        icon: "fa-tags",
        badge: "INPC & INPP Oficial",
        summary: "Medición quincenal y mensual de la inflación al consumidor (INPC) y a la producción (INPP) con canastas representativas de bienes y servicios.",
        officialDefinition: "El Índice Nacional de Precios al Consumidor (INPC) mide la variación promedio de precios de una canasta de bienes y servicios ponderada por el gasto de los hogares de 55 ciudades de la República.",
        keyMetrics: [
            { label: "Inflación General Anual (Septiembre 2026)", val: "3.45% (dentro del rango meta oficial)" },
            { label: "Variación mensual del INPC", val: "0.42% mensual" },
            { label: "Inflación subyacente (mercancías y servicios)", val: "3.88% a tasa anual" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/inpc/",
        scinceFilter: "ingreso"
    },
    "transporte": {
        category: "Temas > Economía y Sectores Productivos",
        title: "Transporte y Comunicaciones",
        icon: "fa-truck-fast",
        badge: "Registros SCT-INEGI",
        summary: "Estadística de parque vehicular, vehículos de motor registrados en circulación, transporte urbano de pasajeros y carga aérea y marítima.",
        officialDefinition: "El INEGI publica el Registro de Vehículos de Motor en Circulación y las estadísticas de los sistemas de transporte colectivo metro, metrobús y tren suburbano.",
        keyMetrics: [
            { label: "Vehículos de motor registrados en circulación", val: "+55.2 millones de automotores" },
            { label: "Pasajeros transportados en sistemas urbanos", val: "+190 millones mensuales" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/vehiculos/",
        scinceFilter: "pob2026"
    },
    "turismo": {
        category: "Temas > Economía y Sectores Productivos",
        title: "Turismo y Servicios Turísticos",
        icon: "fa-plane-departure",
        badge: "CST & Encuestas",
        summary: "Cuenta Satélite del Turismo de México (CSTM), llegadas de turistas internacionales, ocupación hotelera y derrama económica generada.",
        officialDefinition: "Mide la contribución del turismo al Producto Interno Bruto y el empleo en destinos de playa, ciudades coloniales y zonas arqueológicas.",
        keyMetrics: [
            { label: "Aportación turística al PIB", val: "8.5% del PIB nacional" },
            { label: "Llegada de turistas internacionales anuales", val: "+42.1 millones de visitantes" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/turismosat/",
        scinceFilter: "ingreso"
    },

    // -------------------------------------------------------------------------
    // TEMAS: GEOGRAFÍA Y MEDIO AMBIENTE
    // -------------------------------------------------------------------------
    "catastro": {
        category: "Temas > Geografía y Medio Ambiente",
        title: "Catastro y Gestión Territorial",
        icon: "fa-map",
        badge: "Norma Técnica Registral",
        summary: "Estandarización y modernización de los catastros municipales y registros públicos de la propiedad en coordinación con los municipios.",
        officialDefinition: "El Modelo Óptimo de Catastro desarrollado por el INEGI facilita a los 2,464 municipios integrar y digitalizar su cartografía predial para fortalecer la hacienda pública local.",
        keyMetrics: [
            { label: "Municipios con cartografía catastral digitalizada", val: "1,840 municipios integrados" },
            { label: "Predios urbanos y rurales registrados", val: "+40 millones de claves catastrales" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/catastro/",
        scinceFilter: "pob2026"
    },
    "imagenes": {
        category: "Temas > Geografía y Medio Ambiente",
        title: "Imágenes del Territorio y Percepción Remota",
        icon: "fa-satellite",
        badge: "Ortofotos & Satélite",
        summary: "Fotografía aérea ortorrectificada, Modelos Digitales de Elevación (MDE) y mosaicos de satélite para monitoreo ambiental y urbano.",
        officialDefinition: "El acervo de imágenes del INEGI incluye vuelos fotogramétricos a escala 1:10,000 y 1:20,000 e imágenes multiespectrales para el análisis de cobertura vegetal y expansión de ciudades.",
        keyMetrics: [
            { label: "Resolución de Ortofotos de alta precisión", val: "Hasta 25 cm por píxel" },
            { label: "Cobertura de Modelo Digital de Elevación", val: "100% de la superficie continental de México" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/imagenes/",
        scinceFilter: "pob2026"
    },
    "marco_geoestadistico": {
        category: "Temas > Geografía y Medio Ambiente",
        title: "Marco Geoestadístico 2026",
        icon: "fa-draw-polygon",
        badge: "Delimitación Oficial SNIEG",
        summary: "División territorial unívoca de México: 32 Áreas Geoestadísticas Estatales (AGEE), 2,464 Municipales (AGEM) y más de 304,000 Localidades.",
        officialDefinition: "El Marco Geoestadístico es el sistema único y de carácter nacional diseñado por el INEGI para referenciar geográficamente la información de los censos y encuestas con los límites territoriales de México.",
        keyMetrics: [
            { label: "Entidades Federativas (AGEE)", val: "32 Entidades" },
            { label: "Municipios y Demarcaciones Territoriales (AGEM)", val: "2,464 Municipios" },
            { label: "Localidades urbanas y rurales registradas", val: "304,231 Localidades censales" },
            { label: "Áreas Geoestadísticas Básicas (AGEB)", val: "+72,000 AGEB urbanas y rurales" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/mg/",
        scinceFilter: "pob2026"
    },
    "medio_ambiente": {
        category: "Temas > Geografía y Medio Ambiente",
        title: "Medio Ambiente y Recursos Naturales",
        icon: "fa-leaf",
        badge: "Cuentas Ecológicas SCEEM",
        summary: "Cuentas económicas y ecológicas de México (SCEEM), agotamiento de recursos naturales, emisiones a la atmósfera y residuos sólidos.",
        officialDefinition: "Permite conocer los Costos Globales por Agotamiento y Degradación Ambiental (CGADA) y el Producto Interno Neto Ecológico (PINE) de la economía mexicana.",
        keyMetrics: [
            { label: "Costos por Degradación y Agotamiento", val: "4.1% del PIB nacional" },
            { label: "Generación de residuos sólidos urbanos", val: "1.02 kg diarios por habitante" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/medioambiente/",
        scinceFilter: "pob2026"
    },

    // -------------------------------------------------------------------------
    // TEMAS: GOBIERNO, SEGURIDAD Y JUSTICIA
    // -------------------------------------------------------------------------
    "gobierno": {
        category: "Temas > Gobierno, Seguridad y Justicia",
        title: "Gobierno y Gestión Pública",
        icon: "fa-landmark-flag",
        badge: "Censos de Gobierno",
        summary: "Estructura institucional, recursos humanos, trámites, contrataciones y presupuesto ejercido por administraciones públicas municipales, estatales y federales.",
        officialDefinition: "Los Censos Nacionales de Gobiernos Estatales y Municipales evalúan la capacidad de gestión, transparencia, digitalización de servicios y control interno de las autoridades públicas.",
        keyMetrics: [
            { label: "Servidores públicos censados", val: "+5.1 millones en los tres órdenes de gobierno" },
            { label: "Municipios con plan de desarrollo urbano", val: "68.2% de los 2,464 municipios" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/gestionpub/",
        scinceFilter: "pob2026"
    },
    "seguridad": {
        category: "Temas > Gobierno, Seguridad y Justicia",
        title: "Seguridad Pública y Justicia",
        icon: "fa-shield-halved",
        badge: "ENVIPE & Registros Judiciales",
        summary: "Prevalencia delictiva, cifra negra, percepción de inseguridad ciudadana, ministerios públicos, juzgados y centros penitenciarios.",
        officialDefinition: "La Encuesta Nacional de Victimización y Percepción sobre Seguridad Pública (ENVIPE) estima los delitos más frecuentes que afectan a los hogares y mide la confianza en corporaciones de seguridad.",
        keyMetrics: [
            { label: "Tasa de prevalencia delictiva", val: "22,500 víctimas por cada 100,000 habitantes" },
            { label: "Cifra negra (delitos no denunciados o sin carpeta)", val: "92.4% a nivel nacional" },
            { label: "Percepción de seguridad en corporaciones", val: "Marina (88.1%) y Ejército (84.8%) con mayor confianza" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/percepcion/",
        scinceFilter: "pob2026"
    },

    // -------------------------------------------------------------------------
    // PROGRAMAS DE INFORMACIÓN (IMAGEN 4)
    // -------------------------------------------------------------------------
    "censo_2020": {
        category: "Programas de Información > Censos",
        title: "Censo de Población y Vivienda 2020",
        icon: "fa-clipboard-check",
        badge: "Operativo Censal Quinquenal",
        summary: "El operativo estadístico más grande de México que contó a todas las personas y viviendas del territorio nacional con dispositivos móviles digitales.",
        officialDefinition: "Realizado del 2 al 27 de marzo de 2020 con más de 147 mil entrevistadoras y entrevistadores, el Censo 2020 proporciona la fotografía más detallada de las condiciones de vida de la sociedad mexicana.",
        keyMetrics: [
            { label: "Población total censada", val: "126,014,024 personas" },
            { label: "Viviendas visitadas y censadas", val: "35,219,514 viviendas" },
            { label: "Localidades geolocalizadas con datos", val: "304,231 localidades del país" }
        ],
        officialUrl: "https://www.inegi.org.mx/programas/ccpv/2020/",
        scinceFilter: "pob2026"
    },
    "enoe": {
        category: "Programas de Información > Encuestas en Hogares",
        title: "Encuesta Nacional de Ocupación y Empleo (ENOE)",
        icon: "fa-people-arrows",
        badge: "Encuesta Mensual y Trimestral",
        summary: "Fuente primordial de información sobre la fuerza laboral, desempleo, ingresos por hora trabajada y tipos de contratación en México.",
        officialDefinition: "Muestra probabilística que visita más de 120,000 viviendas trimestralmente en todas las entidades federativas para monitorear el mercado de trabajo.",
        keyMetrics: [
            { label: "Cobertura geográfica", val: "Nacional, urbano, rural y 39 ciudades autorrepresentadas" },
            { label: "Periodicidad de entrega", val: "Boletines mensuales y tabulados trimestrales" }
        ],
        officialUrl: "https://www.inegi.org.mx/programas/enoe/15ymas/",
        scinceFilter: "ingreso"
    },
    "enigh": {
        category: "Programas de Información > Encuestas en Hogares",
        title: "Encuesta Nacional de Ingresos y Gastos de los Hogares (ENIGH)",
        icon: "fa-money-bill-transfer",
        badge: "Bienal Oficial",
        summary: "Composición del ingreso corriente de los hogares mexicanos por deciles, estructura de gasto en alimentos, educación, transporte y salud.",
        officialDefinition: "Base indispensable para que el CONEVAL y el INEGI calculen las líneas de pobreza, y para que se actualice la canasta del Índice Nacional de Precios al Consumidor.",
        keyMetrics: [
            { label: "Ingreso corriente promedio mensual por hogar", val: "$21,160 MXN (ENIGH)" },
            { label: "Rubro de mayor gasto de las familias", val: "Alimentos, bebidas y tabaco (37.7%)" }
        ],
        officialUrl: "https://www.inegi.org.mx/programas/enigh/nc/2022/",
        scinceFilter: "ingreso"
    },
    "edn": {
        category: "Programas de Información > Demografía de los Negocios",
        title: "Estudio sobre la Demografía de los Negocios (EDN)",
        icon: "fa-chart-simple",
        badge: "Monitoreo MIPYMES",
        summary: "Seguimiento a la supervivencia, apertura de nuevas empresas y muerte de establecimientos micro, pequeños y medianos en México.",
        officialDefinition: "El EDN permite identificar la resiliencia del sector productivo privado e informal posterior a los censos económicos.",
        keyMetrics: [
            { label: "Tasa de nacimientos de establecimientos", val: "10.6% de nuevas unidades por año" },
            { label: "Esperanza de vida promedio de un negocio al nacer", val: "7.8 años promedio nacional" }
        ],
        officialUrl: "https://www.inegi.org.mx/programas/edn/2023/",
        scinceFilter: "ingreso"
    },

    // -------------------------------------------------------------------------
    // SISTEMAS DE CONSULTA (IMAGEN 5)
    // -------------------------------------------------------------------------
    "scince": {
        category: "Sistemas de Consulta > Geovisores",
        title: "Sistema para la Consulta de Información Censal (SCINCE)",
        icon: "fa-map-location",
        badge: "Geovisor Integrado en el Portal",
        summary: "Plataforma cartográfica interactiva desarrollada para consultar la información del Censo de Población y Vivienda a nivel de entidad, municipio y localidad.",
        officialDefinition: "El SCINCE vincula las bases de datos censales con la cartografía digital vectorial del Marco Geoestadístico, permitiendo análisis espaciales, selección de indicadores temáticos y visualización coroplética en mapas satelitales, de calles o relieve.",
        keyMetrics: [
            { label: "Desagregación geográfica", val: "32 Estados, 2,464 Municipios, 304,231 Localidades" },
            { label: "Integración", val: "Capas de Google Maps, Leaflet y descarga de shapefiles" }
        ],
        officialUrl: "https://www.inegi.org.mx/app/scince/",
        scinceFilter: "pob2026"
    },
    "denue_sistema": {
        category: "Sistemas de Consulta > Geovisores",
        title: "Directorio Estadístico Nacional de Unidades Económicas (DENUE)",
        icon: "fa-shop",
        badge: "Directorio Interactivo",
        summary: "Herramienta de búsqueda espacial que permite localizar negocios por nombre comercial, actividad económica o cercanía geográfica.",
        officialDefinition: "Ofrece datos de contacto, estratos de personal ocupado y coordenadas precisas de cada comercio, fábrica y prestador de servicios en México.",
        keyMetrics: [
            { label: "Total de unidades registradas", val: "5,540,000 establecimientos" },
            { label: "Opciones de descarga", val: "Descarga masiva por estado y por actividad SCIAN" }
        ],
        officialUrl: "https://www.inegi.org.mx/app/mapa/denue/",
        scinceFilter: "ingreso"
    },
    "mapa_digital": {
        category: "Sistemas de Consulta > Geovisores",
        title: "Mapa Digital de México (MDM)",
        icon: "fa-layer-group",
        badge: "SIG Institucional",
        summary: "Sistema de Información Geográfica en web y de escritorio que integra más de 200 capas de información estadística, ambiental y de infraestructura.",
        officialDefinition: "Permite cruzar datos demográficos y económicos con redes hidrográficas, geológicas, climatológicas, áreas naturales protegidas y redes viales.",
        keyMetrics: [
            { label: "Formatos compatibles", val: "Shapefile, GeoJSON, KML, WMS, WFS" },
            { label: "Acceso", val: "Libre y gratuito conforme a la Ley del SNIEG" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/mapadigital/",
        scinceFilter: "pob2026"
    },
    "bie": {
        category: "Sistemas de Consulta > Banco de Indicadores",
        title: "Banco de Información Económica (BIE)",
        icon: "fa-database",
        badge: "Series de Tiempo",
        summary: "Repositorio institucional con más de 30,000 series de tiempo históricas sobre la economía mexicana desde 1900 hasta el presente.",
        officialDefinition: "Permite consultar y exportar series de PIB, empleo, manufactura, balanza de pagos, precios y tipos de cambio en formatos Excel y CSV.",
        keyMetrics: [
            { label: "Series disponibles", val: "Más de 30,000 series económicas" },
            { label: "Actualización", val: "En tiempo real conforme al calendario oficial" }
        ],
        officialUrl: "https://www.inegi.org.mx/app/indicadores/bie.html",
        scinceFilter: "ingreso"
    },
    "apis": {
        category: "Sistemas de Consulta > Para Desarrolladores",
        title: "Servicios Web y APIs REST INEGI",
        icon: "fa-code",
        badge: "Datos Abiertos para Desarrolladores",
        summary: "Interfaces de Programación de Aplicaciones (API) para consultar directamente indicadores, catálogos del DENUE y servicios cartográficos.",
        officialDefinition: "El INEGI provee APIs públicas y documentadas que permiten a investigadores, empresas y desarrolladores consumir datos censales en JSON.",
        keyMetrics: [
            { label: "Protocolo", val: "RESTful sobre HTTPS con tokens gratuitos" },
            { label: "Servicios WMS / WFS", val: "Geoservicios compatibles con QGIS, ArcGIS y Leaflet" }
        ],
        officialUrl: "https://www.inegi.org.mx/servicios/api_indicadores.html",
        scinceFilter: "pob2026"
    },

    // -------------------------------------------------------------------------
    // DESARROLLO SOCIAL: MEDICIÓN DE POBREZA (IMAGEN 1)
    // -------------------------------------------------------------------------
    "pobreza_general": {
        category: "Desarrollo Social > Medición de Pobreza",
        title: "Medición Multidimensional de la Pobreza en México",
        icon: "fa-hand-holding-heart",
        badge: "Ley General de Desarrollo Social",
        summary: "Metodología oficial que evalúa la pobreza combinando dos espacios fundamentales: el bienestar económico (ingresos) y los derechos sociales.",
        officialDefinition: "Conforme a la Ley General de Desarrollo Social, el INEGI genera la información fundamental para que el Estado mexicano identifique carencias sociales en educación, salud, seguridad social, vivienda, servicios básicos y alimentación.",
        keyMetrics: [
            { label: "Espacio de bienestar económico", val: "Líneas de Pobreza por Ingresos (LPI y LPEI)" },
            { label: "Espacio de derechos sociales", val: "6 carencias sociales normativas consagradas en la Constitución" },
            { label: "Periodicidad de medición", val: "Bienal para entidades federativas y quinquenal para municipios" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/pobreza/",
        scinceFilter: "ingreso"
    },
    "lineas_pobreza": {
        category: "Desarrollo Social > Medición de Pobreza",
        title: "Líneas de Pobreza por Ingresos (Canastas)",
        icon: "fa-scale-balanced",
        badge: "Publicación Mensual",
        summary: "Valor monetario mensual de la canasta alimentaria (LPEI) y de la canasta no alimentaria (LPI) para zonas urbanas y rurales.",
        officialDefinition: "La Línea de Pobreza Extrema por Ingresos (LPEI) representa el costo de adquirir los nutrientes indispensables para una persona al mes; la Línea de Pobreza por Ingresos (LPI) agrega gastos en transporte, vivienda, vestido y calzado.",
        keyMetrics: [
            { label: "Publicación reciente oficial", val: "13 de octubre de 2026" },
            { label: "Próxima publicación calendarizada", val: "11 de noviembre de 2026" },
            { label: "Diferenciación geográfica", val: "Canastas específicas para ámbitos urbanos y rurales" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/pobreza/lineas.html",
        scinceFilter: "ingreso"
    },
    "pobreza_laboral": {
        category: "Desarrollo Social > Medición de Pobreza",
        title: "Pobreza Laboral e ITLP",
        icon: "fa-hand-holding-dollar",
        badge: "Publicación Trimestral",
        summary: "Proporción de personas cuyo ingreso proveniente del trabajo es inferior al costo de la canasta alimentaria para los integrantes de su hogar.",
        officialDefinition: "Calculado a partir de la ENOE, el Índice de la Tendencia Laboral de la Pobreza (ITLP) monitorea si el poder adquisitivo del salario de los trabajadores aumenta o disminuye con el tiempo.",
        keyMetrics: [
            { label: "Publicación reciente oficial", val: "28 de agosto de 2026" },
            { label: "Próxima publicación calendarizada", val: "28 de noviembre de 2026" },
            { label: "Población en pobreza laboral", val: "35.8% de la población nacional" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/itlp/",
        scinceFilter: "ingreso"
    },
    "pobreza_multidimensional": {
        category: "Desarrollo Social > Medición de Pobreza",
        title: "Pobreza Multidimensional y Carencias Sociales",
        icon: "fa-network-wired",
        badge: "Bienal & Quinquenal",
        summary: "Integración de los ingresos familiares con las 6 carencias sociales: rezago educativo, salud, seguridad social, calidad de vivienda, servicios básicos y alimentación nutritiva.",
        officialDefinition: "Una persona se encuentra en pobreza multidimensional cuando tiene al menos una carencia social y su ingreso es insuficiente para adquirir la canasta alimentaria más la no alimentaria.",
        keyMetrics: [
            { label: "Publicación más reciente", val: "13 de agosto de 2025" },
            { label: "Porcentaje de personas en situación de pobreza", val: "36.3% de la población del país" },
            { label: "Pobreza extrema multidimensional", val: "7.1% de la población nacional" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/pobrezamulti/",
        scinceFilter: "ingreso"
    },
    "derechos_sociales": {
        category: "Desarrollo Social > Derechos Sociales",
        title: "Sistema de Información de Derechos Sociales (SIDS)",
        icon: "fa-people-roof",
        badge: "Monitoreo Bienal",
        summary: "Indicadores de acceso efectivo: disponibilidad, accesibilidad y calidad de servicios para grupos prioritarios y cierre de brechas.",
        officialDefinition: "Mide las brechas de desigualdad en niñas, niños y adolescentes, jóvenes, personas adultas mayores, mujeres indígenas y personas con discapacidad.",
        keyMetrics: [
            { label: "Publicación oficial reciente", val: "03 de marzo de 2026" },
            { label: "Dimensiones analizadas", val: "Educación, Salud, Seguridad Social, Vivienda, Alimentación" }
        ],
        officialUrl: "https://www.inegi.org.mx/temas/derechossociales/",
        scinceFilter: "pob2026"
    }
};
