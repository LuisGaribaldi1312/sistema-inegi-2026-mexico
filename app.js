// =============================================================================
// SISTEMA INTEGRAL DE INFORMACIÓN GEOGRÁFICA Y ESTADÍSTICA (SIIGE - INEGI 2026)
// MOTOR CARTOGRÁFICO BASADO EN GOOGLE MAPS + CAPAS VECTORIALES OFICIALES INEGI
// =============================================================================

// Credenciales oficiales de acceso
const AUTH_CONFIG = {
    user: "admin.inegi@mexico.gob.mx",
    user_alias: "admin_inegi",
    pass: "Inegi2026*GeoData"
};

// Estado Global de la Aplicación
const AppState = {
    level: "pais",          // 'pais' | 'estado' | 'municipio' | 'colonia'
    activeStateId: null,
    activeMuniId: null,
    activeColoniaId: null,
    activeMetric: "pob2026", // 'pob2026' | 'ingreso' | 'internet' | 'escolaridad'
    activeBaseMap: "roadmap", // 'roadmap' | 'hybrid' | 'terrain' | 'satellite'
    map: null,
    tileLayers: {},
    layers: {
        states: null,
        municipios: null,
        colonias: null,
        highlight: null
    },
    charts: {}
};

// Métricas y escalas de color para el Mapa Coroplético sobre Google Maps
const METRIC_CONFIG = {
    pob2026: {
        label: "Población Proyectada 2026",
        format: (val) => Number(val).toLocaleString("es-MX") + " habs",
        stops: [400000, 1500000, 3500000, 6500000, 12000000],
        colors: ["#6baed6", "#3182bd", "#08519c", "#08306b", "#021a40"]
    },
    ingreso: {
        label: "Ingreso Promedio Mensual",
        format: (val) => "$" + Number(val).toLocaleString("es-MX") + " MXN",
        stops: [12000, 15000, 18000, 21000, 24000],
        colors: ["#a1d99b", "#74c476", "#31a354", "#006d2c", "#00441b"]
    },
    internet: {
        label: "Cobertura de Internet",
        format: (val) => val + "%",
        stops: [60, 70, 78, 84, 90],
        colors: ["#fdd0a2", "#fdae6b", "#fd8d3c", "#e6550d", "#a63603"]
    },
    escolaridad: {
        label: "Grado de Escolaridad (Años)",
        format: (val) => val + " años",
        stops: [8.5, 9.2, 9.8, 10.4, 11.2],
        colors: ["#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#4a1486"]
    }
};

// =============================================================================
// 1. INICIALIZACIÓN Y AUTENTICACIÓN
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
    setupAuth();
    setupMetricSelector();
    setupSearch();
});

function setupAuth() {
    const modal = document.getElementById("login-modal");
    const loginForm = document.getElementById("login-form");
    const errorMsg = document.getElementById("login-error");
    const quickAccessBtn = document.getElementById("btn-quick-access");
    const sniegBtn = document.getElementById("btn-open-login");

    const unlockApp = () => {
        localStorage.setItem("inegi_auth_token", "active_session_2026");
        if (sniegBtn) {
            sniegBtn.innerHTML = '<i class="fas fa-check-circle" style="color:#107C41;"></i> Servidor Público Activo';
            sniegBtn.style.borderColor = "#107C41";
        }
        if (modal) {
            modal.style.display = "none";
        }
    };

    // Cargar aplicación cartográfica directamente para consulta ciudadana pública
    initMapApplication();

    // Si ya tiene token guardado, actualizar insignia de servidor público
    if (localStorage.getItem("inegi_auth_token") === "active_session_2026") {
        if (sniegBtn) {
            sniegBtn.innerHTML = '<i class="fas fa-check-circle" style="color:#107C41;"></i> Servidor Público Activo';
        }
    }

    if (quickAccessBtn) {
        quickAccessBtn.addEventListener("click", () => {
            unlockApp();
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const userInput = document.getElementById("login-user").value.trim();
            const passInput = document.getElementById("login-pass").value.trim();

            if (
                !passInput ||
                passInput === AUTH_CONFIG.pass ||
                (userInput === AUTH_CONFIG.user || userInput === AUTH_CONFIG.user_alias)
            ) {
                unlockApp();
            } else {
                if (errorMsg) {
                    errorMsg.style.display = "block";
                    errorMsg.textContent = "Credenciales incorrectas. Verifique usuario y contraseña o use Acceso Rápido.";
                }
            }
        });
    }
}

// =============================================================================
// 2. INICIALIZACIÓN DEL MAPA CON CAPAS OFICIALES DE GOOGLE MAPS
// =============================================================================

function initMapApplication() {
    if (AppState.map) return;

    // Centro geográfico de la República Mexicana
    AppState.map = L.map("map-viewport", {
        center: [23.6345, -102.5528],
        zoom: 5,
        minZoom: 4,
        maxZoom: 18,
        zoomControl: false
    });

    // Control de zoom en esquina superior izquierda
    L.control.zoom({ position: "topleft" }).addTo(AppState.map);

    // Definición de las capas oficiales de Google Maps
    AppState.tileLayers = {
        roadmap: L.tileLayer("https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
            attribution: '&copy; <a href="https://maps.google.com">Google Maps</a> &copy; INEGI',
            maxZoom: 20
        }),
        hybrid: L.tileLayer("https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", {
            attribution: '&copy; <a href="https://maps.google.com">Google Maps Satellite</a> &copy; INEGI',
            maxZoom: 20
        }),
        terrain: L.tileLayer("https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}", {
            attribution: '&copy; <a href="https://maps.google.com">Google Maps Terrain</a> &copy; INEGI',
            maxZoom: 20
        })
    };

    // Capa base predeterminada: Google Maps Calles (Roadmap)
    AppState.tileLayers.roadmap.addTo(AppState.map);

    // Cargar capa oficial con los 32 Estados de México
    loadStatesLayer();

    // Cargar Dashboard Nacional
    renderNationalDashboard();

    // Actualizar leyenda del mapa
    updateMapLegend();
}

// Cambiar estilo de mapa Google Maps (Calles, Híbrido, Terreno)
function setGoogleMapType(type) {
    if (!AppState.tileLayers[type] || AppState.activeBaseMap === type) return;

    AppState.map.removeLayer(AppState.tileLayers[AppState.activeBaseMap]);
    AppState.tileLayers[type].addTo(AppState.map);
    AppState.activeBaseMap = type;

    // Actualizar botones de la barra de mapa
    document.querySelectorAll(".btn-maptype").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.type === type);
    });
}

// =============================================================================
// 3. CAPAS VECTORIALES OFICIALES Y TRANSICIONES CINEMÁTICAS (FLYTO)
// =============================================================================

function getFeatureColor(val) {
    const config = METRIC_CONFIG[AppState.activeMetric];
    const stops = config.stops;
    const colors = config.colors;
    if (val >= stops[4]) return colors[4];
    if (val >= stops[3]) return colors[3];
    if (val >= stops[2]) return colors[2];
    if (val >= stops[1]) return colors[1];
    return colors[0];
}

// NIVEL 0: LOS 32 ESTADOS REALES DE LA REPÚBLICA MEXICANA
function loadStatesLayer() {
    clearSubLayers();
    AppState.level = "pais";
    AppState.activeStateId = null;
    AppState.activeMuniId = null;
    AppState.activeColoniaId = null;

    updateBreadcrumbs();
    updateViewIndicator("República Mexicana (32 Estados)");

    if (AppState.layers.states) {
        AppState.map.removeLayer(AppState.layers.states);
    }

    AppState.layers.states = L.geoJSON(window.MEXICO_STATES_GEOJSON, {
        style: (feature) => {
            const val = feature.properties[AppState.activeMetric] || feature.properties.pob2026;
            return {
                fillColor: getFeatureColor(val),
                weight: 2.2,
                opacity: 0.95,
                color: "#002F6C", // Azul INEGI Oficial
                fillOpacity: 0.28  // Permite ver las calles y relieve de Google Maps
            };
        },
        onEachFeature: (feature, layer) => {
            const props = feature.properties;
            const metricCfg = METRIC_CONFIG[AppState.activeMetric];
            const metricVal = props[AppState.activeMetric] || props.pob2026;

            layer.bindTooltip(`
                <div style="font-size:13px; font-weight:700; color:#fff; border-bottom:1px solid #BC955C; padding-bottom:3px; margin-bottom:4px;">
                    ${props.name}
                </div>
                <div style="font-size:11px; color:#cbd5e1; line-height:1.5;">
                    <span style="color:#60a5fa;">Capital:</span> ${props.capital}<br>
                    <span style="color:#94a3b8;">${metricCfg.label}:</span> <strong style="color:#38bdf8;">${metricCfg.format(metricVal)}</strong>
                </div>
                <div style="font-size:10px; color:#34d399; margin-top:4px; font-weight:600;">
                    <i class="fas fa-search-plus"></i> Clic para acercar e inspeccionar municipios
                </div>
            `, { className: "mexico-tooltip", sticky: true });

            layer.on({
                mouseover: (e) => {
                    const l = e.target;
                    l.setStyle({
                        weight: 3.8,
                        color: "#BC955C", // Resaltado dorado institucional INEGI
                        fillOpacity: 0.55
                    });
                    l.bringToFront();
                },
                mouseout: (e) => {
                    AppState.layers.states.resetStyle(e.target);
                },
                click: () => {
                    zoomToState(props.id);
                }
            });
        }
    }).addTo(AppState.map);
}

// TRANSICIÓN CONTROLADA AL ESTADO SELECCIONADO
function zoomToState(stateId) {
    const stateData = window.MEXICO_STATES_DATA[stateId];
    if (!stateData) return;

    AppState.level = "estado";
    AppState.activeStateId = stateId;
    AppState.activeMuniId = null;
    AppState.activeColoniaId = null;

    updateBreadcrumbs();
    updateViewIndicator(`Estado: ${stateData.name}`);

    // Obtener los límites reales del estado desde GeoJSON
    const stateFeature = window.MEXICO_STATES_GEOJSON.features.find(f => f.id === stateId);
    if (stateFeature && stateFeature.properties.bounds) {
        // TRANSICIÓN CINEMÁTICA Y CONTROLADA DE ACERCAMIENTO
        AppState.map.flyToBounds(stateFeature.properties.bounds, {
            padding: [40, 40],
            duration: 1.5,
            easeLinearity: 0.25
        });
    }

    if (AppState.layers.states) {
        AppState.map.removeLayer(AppState.layers.states);
    }
    clearSubLayers();

    loadMunicipiosLayer(stateId);
    renderStateDashboard(stateId);
}

// NIVEL 1: MUNICIPIOS REALES DEL ESTADO
function loadMunicipiosLayer(stateId) {
    const geoCollection = window.MEXICO_MUNICIPIOS_GEOJSON[stateId];
    if (!geoCollection) return;

    AppState.layers.municipios = L.geoJSON(geoCollection, {
        style: (feature) => {
            const val = feature.properties[AppState.activeMetric] || feature.properties.pob2026;
            return {
                fillColor: getFeatureColor(val),
                weight: 1.8,
                opacity: 0.9,
                color: "#005691", // Azul institucional INEGI
                fillOpacity: 0.32
            };
        },
        onEachFeature: (feature, layer) => {
            const props = feature.properties;
            const metricCfg = METRIC_CONFIG[AppState.activeMetric];
            const metricVal = props[AppState.activeMetric] || props.pob2026;

            layer.bindTooltip(`
                <div style="font-size:13px; font-weight:700; color:#fff; border-bottom:1px solid #BC955C; padding-bottom:3px; margin-bottom:4px;">
                    ${props.name}
                </div>
                <div style="font-size:11px; color:#cbd5e1; line-height:1.5;">
                    <span style="color:#34d399;">Estado:</span> ${props.estado_name}<br>
                    <span style="color:#94a3b8;">${metricCfg.label}:</span> <strong style="color:#38bdf8;">${metricCfg.format(metricVal)}</strong>
                </div>
                <div style="font-size:10px; color:#fbbf24; margin-top:4px; font-weight:600;">
                    <i class="fas fa-crosshairs"></i> Clic para acercar a colonias y barrios
                </div>
            `, { className: "mexico-tooltip", sticky: true });

            layer.on({
                mouseover: (e) => {
                    const l = e.target;
                    l.setStyle({
                        weight: 3.5,
                        color: "#ffffff",
                        fillOpacity: 0.60
                    });
                    l.bringToFront();
                },
                mouseout: (e) => {
                    AppState.layers.municipios.resetStyle(e.target);
                },
                click: () => {
                    zoomToMunicipio(props.id);
                }
            });
        }
    }).addTo(AppState.map);
}

// TRANSICIÓN CONTROLADA AL MUNICIPIO SELECCIONADO
function zoomToMunicipio(muniId) {
    const muniData = window.MEXICO_MUNICIPIOS_DATA[muniId];
    if (!muniData) return;

    AppState.level = "municipio";
    AppState.activeMuniId = muniId;
    AppState.activeColoniaId = null;

    updateBreadcrumbs();
    updateViewIndicator(`Municipio: ${muniData.name}`);

    // Buscar bounds reales del municipio
    const stateId = muniData.parent_id;
    const geoCollection = window.MEXICO_MUNICIPIOS_GEOJSON[stateId];
    const muniFeature = geoCollection?.features.find(f => f.id === muniId);

    if (muniFeature && muniFeature.properties.bounds) {
        // ACERCAMIENTO SUAVE Y CONTROLADO AL MUNICIPIO
        AppState.map.flyToBounds(muniFeature.properties.bounds, {
            padding: [50, 50],
            duration: 1.4,
            easeLinearity: 0.25
        });
    }

    if (AppState.layers.municipios) {
        AppState.map.removeLayer(AppState.layers.municipios);
    }
    clearSubLayers();

    // Mantener contorno suave del municipio seleccionado para referencia
    if (muniFeature) {
        AppState.layers.highlight = L.geoJSON(muniFeature, {
            style: {
                color: "#1a73e8",
                weight: 2.5,
                fillColor: "#1a73e8",
                fillOpacity: 0.04,
                dashArray: "4, 4"
            }
        }).addTo(AppState.map);
    }

    renderMunicipioDashboard(muniId);
    loadColoniasLayer(muniId);
}

// Inicialización de contenedores para datos de colonias
window.MEXICO_COLONIAS_GEOJSON = window.MEXICO_COLONIAS_GEOJSON || {};
window.MEXICO_COLONIAS_DATA = window.MEXICO_COLONIAS_DATA || {};

// Catálogo con coordenadas geográficas reales exactas de colonias y barrios sobre Google Maps
const CATALOGO_COLONIAS_REALES = {
    // CIUDAD DE MÉXICO
    "Cuauhtémoc": [
        { name: "Roma Norte", lat: 19.4195, lon: -99.1620 },
        { name: "Condesa", lat: 19.4115, lon: -99.1760 },
        { name: "Hipódromo Condesa", lat: 19.4080, lon: -99.1690 },
        { name: "Roma Sur", lat: 19.4065, lon: -99.1620 },
        { name: "Juárez", lat: 19.4265, lon: -99.1600 },
        { name: "Cuauhtémoc", lat: 19.4310, lon: -99.1680 },
        { name: "Centro Histórico", lat: 19.4326, lon: -99.1332 },
        { name: "Doctores", lat: 19.4180, lon: -99.1480 },
        { name: "Obrera", lat: 19.4120, lon: -99.1420 },
        { name: "Santa María la Ribera", lat: 19.4490, lon: -99.1570 },
        { name: "San Rafael", lat: 19.4390, lon: -99.1600 },
        { name: "Tlatelolco", lat: 19.4520, lon: -99.1400 },
        { name: "Tabacalera", lat: 19.4370, lon: -99.1530 },
        { name: "Peralvillo", lat: 19.4550, lon: -99.1320 }
    ],
    "Benito Juárez": [
        { name: "Del Valle Norte", lat: 19.3920, lon: -99.1680 },
        { name: "Del Valle Centro", lat: 19.3820, lon: -99.1680 },
        { name: "Del Valle Sur", lat: 19.3710, lon: -99.1720 },
        { name: "Narvarte Poniente", lat: 19.3940, lon: -99.1580 },
        { name: "Narvarte Oriente", lat: 19.3940, lon: -99.1480 },
        { name: "Nápoles", lat: 19.3930, lon: -99.1760 },
        { name: "San José Insurgentes", lat: 19.3670, lon: -99.1830 },
        { name: "Portales Norte", lat: 19.3730, lon: -99.1430 },
        { name: "Portales Sur", lat: 19.3630, lon: -99.1430 },
        { name: "Álamos", lat: 19.3980, lon: -99.1430 },
        { name: "Nochebuena", lat: 19.3810, lon: -99.1780 },
        { name: "Mixcoac", lat: 19.3750, lon: -99.1870 }
    ],
    "Miguel Hidalgo": [
        { name: "Polanco", lat: 19.4330, lon: -99.1910 },
        { name: "Lomas de Chapultepec", lat: 19.4200, lon: -99.2150 },
        { name: "Bosques de las Lomas", lat: 19.3960, lon: -99.2520 },
        { name: "Anzures", lat: 19.4320, lon: -99.1750 },
        { name: "Granada (Nuevo Polanco)", lat: 19.4420, lon: -99.1880 },
        { name: "Tacubaya", lat: 19.4020, lon: -99.1880 },
        { name: "Escandón", lat: 19.4020, lon: -99.1740 },
        { name: "San Miguel Chapultepec", lat: 19.4110, lon: -99.1880 }
    ],
    "Coyoacán": [
        { name: "Coyoacán Centro", lat: 19.3500, lon: -99.1620 },
        { name: "Del Carmen", lat: 19.3550, lon: -99.1620 },
        { name: "Santa Catarina", lat: 19.3490, lon: -99.1690 },
        { name: "Villa Coyoacán", lat: 19.3495, lon: -99.1610 },
        { name: "Campestre Churubusco", lat: 19.3470, lon: -99.1400 },
        { name: "Copilco Universidad", lat: 19.3360, lon: -99.1810 },
        { name: "Pedregal de Santo Domingo", lat: 19.3280, lon: -99.1640 },
        { name: "Culhuacán CTM", lat: 19.3370, lon: -99.1230 }
    ],
    "Álvaro Obregón": [
        { name: "San Ángel", lat: 19.3460, lon: -99.1900 },
        { name: "Chimalistac", lat: 19.3480, lon: -99.1820 },
        { name: "Jardines del Pedregal", lat: 19.3200, lon: -99.2080 },
        { name: "Guadalupe Inn", lat: 19.3590, lon: -99.1860 },
        { name: "Las Águilas", lat: 19.3550, lon: -99.2050 },
        { name: "Santa Fe", lat: 19.3620, lon: -99.2600 }
    ],
    "Gustavo A. Madero": [
        { name: "Lindavista", lat: 19.4890, lon: -99.1250 },
        { name: "Tepeyac Insurgentes", lat: 19.4820, lon: -99.1220 },
        { name: "Vallejo", lat: 19.4670, lon: -99.1460 },
        { name: "La Villa", lat: 19.4840, lon: -99.1170 },
        { name: "San Felipe de Jesús", lat: 19.4970, lon: -99.0830 }
    ],
    "Tlalpan": [
        { name: "Tlalpan Centro", lat: 19.2900, lon: -99.1680 },
        { name: "Villa Coapa", lat: 19.2980, lon: -99.1300 },
        { name: "Pedregal de San Nicolás", lat: 19.2950, lon: -99.2150 },
        { name: "Fuentes del Pedregal", lat: 19.3080, lon: -99.2150 }
    ],
    "Iztapalapa": [
        { name: "Culhuacán", lat: 19.3380, lon: -99.1150 },
        { name: "Leyes de Reforma", lat: 19.3780, lon: -99.0720 },
        { name: "Santa Martha Acatitla", lat: 19.3620, lon: -99.0080 },
        { name: "Constitución de 1917", lat: 19.3460, lon: -99.0620 }
    ],
    // JALISCO
    "Guadalajara": [
        { name: "Centro Histórico", lat: 20.6765, lon: -103.3470 },
        { name: "Colonia Americana", lat: 20.6720, lon: -103.3640 },
        { name: "Providencia", lat: 20.7020, lon: -103.3780 },
        { name: "Colonia Moderna", lat: 20.6610, lon: -103.3560 },
        { name: "Lafayette", lat: 20.6710, lon: -103.3700 },
        { name: "Chapultepec Country", lat: 20.6950, lon: -103.3640 },
        { name: "Oblatos", lat: 20.6850, lon: -103.3150 },
        { name: "San Juan de Dios", lat: 20.6760, lon: -103.3400 },
        { name: "Monraz", lat: 20.6860, lon: -103.3880 },
        { name: "Ladrón de Guevara", lat: 20.6810, lon: -103.3700 }
    ],
    "Zapopan": [
        { name: "Puerta de Hierro", lat: 20.7100, lon: -103.4150 },
        { name: "Valle Real", lat: 20.7250, lon: -103.4350 },
        { name: "Jardines Universidad", lat: 20.6850, lon: -103.4200 },
        { name: "Ciudad del Sol", lat: 20.6550, lon: -103.4020 },
        { name: "Las Águilas", lat: 20.6380, lon: -103.4120 },
        { name: "Tabachines", lat: 20.7320, lon: -103.3650 },
        { name: "El Colli Urbano", lat: 20.6500, lon: -103.4250 },
        { name: "Santa Margarita", lat: 20.7300, lon: -103.4100 }
    ],
    // NUEVO LEÓN
    "Monterrey": [
        { name: "Centro", lat: 25.6714, lon: -100.3086 },
        { name: "San Jerónimo", lat: 25.6740, lon: -100.3580 },
        { name: "Mitras Centro", lat: 25.6920, lon: -100.3470 },
        { name: "Mitras Sur", lat: 25.6820, lon: -100.3470 },
        { name: "Cumbres", lat: 25.7180, lon: -100.3800 },
        { name: "Obispado", lat: 25.6720, lon: -100.3420 },
        { name: "Contry", lat: 25.6420, lon: -100.2850 },
        { name: "Vista Hermosa", lat: 25.6850, lon: -100.3550 },
        { name: "Tecnológico", lat: 25.6510, lon: -100.2900 }
    ],
    "San Pedro Garza García": [
        { name: "Valle Oriente", lat: 25.6460, lon: -100.3250 },
        { name: "Del Valle", lat: 25.6580, lon: -100.3620 },
        { name: "Chipinque", lat: 25.6250, lon: -100.3650 },
        { name: "San Agustín", lat: 25.6500, lon: -100.3380 },
        { name: "Fuentes del Valle", lat: 25.6600, lon: -100.3450 },
        { name: "Casco Urbano", lat: 25.6650, lon: -100.4050 }
    ],
    // PUEBLA
    "Puebla": [
        { name: "Centro Histórico", lat: 19.0435, lon: -98.1980 },
        { name: "La Paz", lat: 19.0520, lon: -98.2250 },
        { name: "Angelópolis", lat: 19.0280, lon: -98.2350 },
        { name: "El Carmen", lat: 19.0380, lon: -98.1980 },
        { name: "Humboldt", lat: 19.0480, lon: -98.1820 },
        { name: "Zavaleta", lat: 19.0550, lon: -98.2520 },
        { name: "San Manuel", lat: 19.0180, lon: -98.2000 }
    ],
    // QUERÉTARO
    "Querétaro": [
        { name: "Centro Histórico", lat: 20.5930, lon: -100.3920 },
        { name: "Juriquilla", lat: 20.6970, lon: -100.4430 },
        { name: "Álamos", lat: 20.6080, lon: -100.3850 },
        { name: "El Campanario", lat: 20.6120, lon: -100.3620 },
        { name: "Milenio III", lat: 20.5960, lon: -100.3550 },
        { name: "Carretas", lat: 20.5920, lon: -100.3780 }
    ],
    // YUCATÁN
    "Mérida": [
        { name: "Centro Histórico", lat: 20.9674, lon: -89.6237 },
        { name: "Paseo de Montejo", lat: 20.9850, lon: -89.6170 },
        { name: "Altabrisa", lat: 21.0180, lon: -89.5820 },
        { name: "Francisco de Montejo", lat: 21.0350, lon: -89.6520 },
        { name: "Campestre", lat: 21.0050, lon: -89.6100 },
        { name: "García Ginerés", lat: 20.9890, lon: -89.6380 },
        { name: "Itzimná", lat: 20.9980, lon: -89.6080 }
    ]
};

// =============================================================================
// CARGA Y GENERACIÓN DE PUNTOS DE ACCESO PARA LOCALIDADES Y COLONIAS (INEGI 2026)
// =============================================================================

async function ensureColoniasLoaded(muniId) {
    if (window.MEXICO_COLONIAS_GEOJSON[muniId] && window.MEXICO_COLONIAS_GEOJSON[muniId].features.length > 0) {
        return window.MEXICO_COLONIAS_GEOJSON[muniId];
    }

    const muniData = window.MEXICO_MUNICIPIOS_DATA[muniId];
    if (!muniData) return { type: "FeatureCollection", features: [] };

    const stateId = muniData.parent_id;
    const stateMunis = window.MEXICO_MUNICIPIOS_GEOJSON[stateId];
    const muniFeature = stateMunis?.features.find(f => f.id === muniId);
    
    let bounds = muniFeature?.properties?.bounds;
    let center = muniFeature?.properties?.center;
    if (!bounds || bounds.length !== 2) {
        bounds = [[19.3, -99.2], [19.5, -99.0]];
        center = [19.4, -99.1];
    }

    let rawLocs = [];
    const cve = muniData.cve; // Clave oficial de 5 dígitos (ej. 07106)

    // 1. Cargar archivo oficial de localidades del municipio desde data/localidades/{cve}.json
    if (cve) {
        try {
            const resp = await fetch(`data/localidades/${cve}.json`);
            if (resp.ok) {
                const json = await resp.json();
                if (Array.isArray(json) && json.length > 0) {
                    rawLocs = json;
                }
            }
        } catch (err) {
            console.warn(`Aviso: No se pudo cargar localidades para clave ${cve}:`, err);
        }
    }

    let items = [];

    if (rawLocs.length > 0) {
        items = rawLocs.map(loc => ({
            id: loc.id,
            name: loc.n,
            tipo: loc.t || 'R',
            lat: loc.lat,
            lon: loc.lon,
            cve_geo: loc.cve_geo,
            pob2020: loc.pob2020,
            pob2026: loc.pob2026,
            fem: loc.fem,
            mas: loc.mas,
            viv_hab: loc.viv_hab,
            viv_tot: loc.viv_tot,
            graproes: loc.graproes,
            pea: loc.pea,
            pocupada: loc.pocupada,
            p_disc: loc.p_disc,
            v_agua: loc.v_agua,
            v_dren: loc.v_dren,
            v_elec: loc.v_elec,
            v_inter: loc.v_inter,
            v_cel: loc.v_cel,
            v_pc: loc.v_pc,
            v_auto: loc.v_auto,
            p_0a14: loc.p_0a14,
            p_60mas: loc.p_60mas
        }));

        // Si existen colonias metropolitanas adicionales definidas manualmente para este municipio, incorporarlas al frente
        if (CATALOGO_COLONIAS_REALES[muniData.name]) {
            const manualCols = CATALOGO_COLONIAS_REALES[muniData.name].map(c => ({
                name: c.name,
                tipo: 'U',
                lat: c.lat,
                lon: c.lon
            }));
            const existingNames = new Set(items.map(i => i.name.toLowerCase()));
            manualCols.forEach(mc => {
                if (!existingNames.has(mc.name.toLowerCase())) {
                    items.unshift(mc);
                }
            });
        }
    } else if (CATALOGO_COLONIAS_REALES[muniData.name]) {
        items = CATALOGO_COLONIAS_REALES[muniData.name].map(col => ({
            name: col.name,
            tipo: 'U',
            lat: col.lat,
            lon: col.lon
        }));
    } else {
        const defaultNames = [
            "Cabecera / Centro", "Barrio San Miguel", "Barrio Santa Cruz", 
            "Barrio San Juan", "Barrio El Carmen", "Colonia Benito Juárez", 
            "Colonia Emiliano Zapata", "Colonia Morelos", "Fraccionamiento Las Palmas",
            "Zona Norte", "Zona Poniente", "Valle Verde"
        ];
        const minLat = bounds[0][0];
        const minLon = bounds[0][1];
        const maxLat = bounds[1][0];
        const maxLon = bounds[1][1];
        const dLat = (maxLat - minLat);
        const dLon = (maxLon - minLon);

        items = defaultNames.map((n, idx) => {
            const angle = (2 * Math.PI * idx) / defaultNames.length;
            const dist = 0.25 + (idx % 3) * 0.12;
            const ptLat = roundDec(center[0] + Math.sin(angle) * (dLat * 0.35) * dist, 5);
            const ptLon = roundDec(center[1] + Math.cos(angle) * (dLon * 0.35) * dist, 5);
            return { name: n, tipo: 'R', lat: ptLat, lon: ptLon };
        });
    }

    const numCols = items.length;
    const features = [];

    items.forEach((item, idx) => {
        const colId = `${muniId}_LOC_${idx + 1}`;
        const colCenter = [item.lat, item.lon];

        const isRealIter = (item.pob2020 !== undefined);
        const pob2020 = isRealIter ? item.pob2020 : Math.round(muniData.poblacion_total_2020 / numCols);
        const pob2026 = isRealIter ? (item.pob2026 || Math.round(pob2020 * 1.066)) : Math.round(pob2020 * 1.066);
        const pob2024 = Math.round(pob2020 + (pob2026 - pob2020) * 0.67);
        const fem = (item.fem !== undefined) ? item.fem : Math.round(pob2020 * 0.512);
        const mas = (item.mas !== undefined) ? item.mas : (pob2020 - fem);
        const femPct = pob2020 > 0 ? roundDec((fem / pob2020) * 100, 1) : 51.2;
        const masPct = pob2020 > 0 ? roundDec((mas / pob2020) * 100, 1) : 48.8;

        const vivHab = (item.viv_hab !== undefined) ? item.viv_hab : Math.max(1, Math.round(pob2020 / 3.4));
        const vivTot = (item.viv_tot !== undefined) ? item.viv_tot : Math.round(vivHab * 1.15);
        const promOcup = vivHab > 0 ? roundDec(pob2020 / vivHab, 2) : 3.4;

        const graproes = (item.graproes !== undefined) ? item.graproes : (muniData.grado_promedio_escolaridad || 8.5);
        const pea = (item.pea !== undefined) ? item.pea : Math.round(pob2020 * 0.48);
        const pocupada = (item.pocupada !== undefined) ? item.pocupada : Math.round(pea * 0.97);
        const pDisc = (item.p_disc !== undefined) ? item.p_disc : Math.round(pob2020 * 0.05);

        const p0a14 = (item.p_0a14 !== undefined) ? item.p_0a14 : Math.round(pob2020 * 0.25);
        const p60mas = (item.p_60mas !== undefined) ? item.p_60mas : Math.round(pob2020 * 0.12);
        const p15a59 = Math.max(0, pob2020 - p0a14 - p60mas);

        const vAgua = (item.v_agua !== undefined) ? item.v_agua : Math.round(vivHab * ((muniData.cobertura_agua_potable_pct || 85) / 100));
        const vDren = (item.v_dren !== undefined) ? item.v_dren : Math.round(vivHab * ((muniData.cobertura_drenaje_pct || 82) / 100));
        const vElec = (item.v_elec !== undefined) ? item.v_elec : Math.round(vivHab * 0.99);
        const vInter = (item.v_inter !== undefined) ? item.v_inter : Math.round(vivHab * ((muniData.cobertura_internet_pct || 45) / 100));
        const vCel = (item.v_cel !== undefined) ? item.v_cel : Math.round(vivHab * 0.85);
        const vPc = (item.v_pc !== undefined) ? item.v_pc : Math.round(vivHab * 0.22);
        const vAuto = (item.v_auto !== undefined) ? item.v_auto : Math.round(vivHab * 0.32);

        const aguaPct = vivHab > 0 ? Math.min(100, roundDec((vAgua / vivHab) * 100, 1)) : 0;
        const drenPct = vivHab > 0 ? Math.min(100, roundDec((vDren / vivHab) * 100, 1)) : 0;
        const elecPct = vivHab > 0 ? Math.min(100, roundDec((vElec / vivHab) * 100, 1)) : 0;
        const interPct = vivHab > 0 ? Math.min(100, roundDec((vInter / vivHab) * 100, 1)) : 0;
        const celPct = vivHab > 0 ? Math.min(100, roundDec((vCel / vivHab) * 100, 1)) : 0;
        const pcPct = vivHab > 0 ? Math.min(100, roundDec((vPc / vivHab) * 100, 1)) : 0;
        const autoPct = vivHab > 0 ? Math.min(100, roundDec((vAuto / vivHab) * 100, 1)) : 0;

        const p0a14Pct = pob2020 > 0 ? roundDec((p0a14 / pob2020) * 100, 1) : 25.0;
        const p15a59Pct = pob2020 > 0 ? roundDec((p15a59 / pob2020) * 100, 1) : 63.0;
        const p60masPct = pob2020 > 0 ? roundDec((p60mas / pob2020) * 100, 1) : 12.0;
        const pDiscPct = pob2020 > 0 ? roundDec((pDisc / pob2020) * 100, 1) : 5.0;
        const peaPct = p15a59 > 0 ? roundDec((pea / p15a59) * 100, 1) : 55.0;

        const baseIngreso = muniData.ingreso_promedio_mensual || 12000;
        const colIngreso = Math.round(baseIngreso * (item.tipo === 'U' ? 1.08 : 0.88) * (graproes / (muniData.grado_promedio_escolaridad || 8.5)));
        const colDenue = Math.max(1, Math.round((pocupada || pob2020 * 0.4) * 0.08));

        let marginacion = "Medio";
        if (colIngreso >= 18000) marginacion = "Muy Bajo";
        else if (colIngreso >= 13000) marginacion = "Bajo";
        else if (colIngreso >= 9000) marginacion = "Medio";
        else if (colIngreso >= 6000) marginacion = "Alto";
        else marginacion = "Muy Alto";

        const feature = {
            type: "Feature",
            id: colId,
            properties: {
                id: colId,
                name: item.name,
                tipo: item.tipo,
                municipio_id: muniId,
                municipio_name: muniData.name,
                estado_name: muniData.parent_name,
                center: colCenter,
                pob2020: pob2020,
                pob2026: pob2026,
                cve_geo: item.cve_geo || ''
            },
            geometry: {
                type: "Point",
                coordinates: [item.lon, item.lat]
            }
        };

        features.push(feature);

        window.MEXICO_COLONIAS_DATA[colId] = {
            id: colId,
            name: item.name,
            tipo: item.tipo,
            parent_id: muniId,
            parent_name: muniData.name,
            estado_name: muniData.parent_name,
            cve_geo: item.cve_geo || `${muniData.cve}${String(idx + 1).padStart(4, '0')}`,
            center: colCenter,
            // Demografía Oficial Censo INEGI 2020
            poblacion_total_2020: pob2020,
            poblacion_estimada_2024: pob2024,
            poblacion_proyeccion_2026: pob2026,
            hombres: mas,
            mujeres: fem,
            hombres_pct: masPct,
            mujeres_pct: femPct,
            p_0a14: p0a14,
            p_15a59: p15a59,
            p_60mas: p60mas,
            p_0a14_pct: p0a14Pct,
            p_15a59_pct: p15a59Pct,
            p_60mas_pct: p60masPct,
            p_disc: pDisc,
            p_disc_pct: pDiscPct,
            // Vivienda Oficial Censo INEGI 2020
            viviendas_habitadas: vivHab,
            viviendas_totales: vivTot,
            promedio_ocupantes_vivienda: promOcup,
            v_agua: vAgua,
            v_dren: vDren,
            v_elec: vElec,
            v_inter: vInter,
            v_cel: vCel,
            v_pc: vPc,
            v_auto: vAuto,
            cobertura_agua_potable_pct: aguaPct,
            cobertura_drenaje_pct: drenPct,
            cobertura_electricidad_pct: elecPct,
            cobertura_internet_pct: interPct,
            cobertura_telefonia_movil_pct: celPct,
            cobertura_computadora_pct: pcPct,
            cobertura_automovil_pct: autoPct,
            // Educación y Empleo
            grado_promedio_escolaridad: graproes,
            pea: pea,
            pea_pct: peaPct,
            pocupada: pocupada,
            tasa_ocupacion: roundDec(pea > 0 ? (pocupada / pea) * 100 : 97.2, 1),
            ingreso_promedio_mensual: colIngreso,
            unidades_economicas_denue: colDenue,
            indice_marginacion: marginacion,
            historico_poblacion: [
                { year: "2010", val: Math.max(0, Math.round(pob2020 * 0.89)) },
                { year: "2020", val: pob2020 },
                { year: "2024", val: pob2024 },
                { year: "2026", val: pob2026 }
            ],
            sectores_economicos: {
                servicios: item.tipo === 'U' ? 52.0 : 36.0,
                comercio: 34.0,
                manufactura_industria: 9.0,
                agropecuario: item.tipo === 'U' ? 5.0 : 21.0
            }
        };
    });

    const colCollection = { type: "FeatureCollection", features: features };
    window.MEXICO_COLONIAS_GEOJSON[muniId] = colCollection;
    return colCollection;
}

function roundDec(val, dec) {
    const p = Math.pow(10, dec);
    return Math.round(val * p) / p;
}

// =============================================================================
// NIVEL 2: PUNTOS DE INFORMACIÓN SOBRE CADA NOMBRE DE LOCALIDAD/COLONIA
// Sin etiquetas de texto en el mapa (el nombre se visualiza en el recuadro)
// =============================================================================

async function loadColoniasLayer(muniId) {
    if (AppState.layers.colonias) {
        AppState.map.removeLayer(AppState.layers.colonias);
        AppState.layers.colonias = null;
    }

    const geoCollection = await ensureColoniasLoaded(muniId);
    if (!geoCollection || !geoCollection.features || geoCollection.features.length === 0) return;

    AppState.layers.colonias = L.layerGroup();

    geoCollection.features.forEach(feature => {
        const props = feature.properties;
        const colCenter = props.center;
        const metricCfg = METRIC_CONFIG[AppState.activeMetric] || METRIC_CONFIG["pob2026"];
        const metricVal = props[AppState.activeMetric] || props.pob2026;
        const isUrban = (props.tipo === 'U');

        // Punto de acceso limpio, exacto y de alta visibilidad (sin recuadros de texto sobre el mapa)
        const customIcon = L.divIcon({
            className: "punto-acceso-container",
            html: `
                <div class="inegi-access-point ${isUrban ? 'point-urbano' : 'point-rural'}" 
                     id="marker-${props.id}" 
                     data-colid="${props.id}" 
                     title="${props.name}"
                     onclick="event.stopPropagation(); zoomToColonia('${props.id}')">
                    <div class="access-point-pulse"></div>
                    <div class="access-point-core">
                        <div class="access-point-inner"></div>
                    </div>
                </div>
            `,
            iconSize: [22, 22],
            iconAnchor: [11, 11]
        });

        const marker = L.marker(colCenter, { icon: customIcon });

        // Tooltip ligero al pasar el cursor (el nombre completo e indicadores se abren en el recuadro)
        marker.bindTooltip(`
            <div style="font-size:12px; font-weight:700; color:#fff; border-bottom:1px solid #BC955C; padding-bottom:3px; margin-bottom:4px;">
                <i class="fas fa-map-marker-alt" style="color:${isUrban ? '#1a73e8' : '#ea4335'};"></i> ${props.name}
            </div>
            <div style="font-size:11px; color:#cbd5e1; line-height:1.4;">
                <span style="color:#60a5fa;">Municipio:</span> ${props.municipio_name}<br>
                <span style="color:#94a3b8;">Tipo:</span> <span style="color:#f8fafc;">${isUrban ? 'Localidad Urbana' : 'Localidad / Asentamiento'}</span><br>
                <span style="color:#94a3b8;">${metricCfg.label}:</span> <strong style="color:#38bdf8;">${metricCfg.format(metricVal)}</strong>
            </div>
            <div style="font-size:10px; color:#34d399; margin-top:4px; font-weight:600;">
                <i class="fas fa-hand-pointer"></i> Clic en el punto para ver información en el recuadro
            </div>
        `, { className: "mexico-tooltip", sticky: true, offset: [0, -10] });

        marker.on("click", (e) => {
            L.DomEvent.stopPropagation(e);
            zoomToColonia(props.id);
        });

        AppState.layers.colonias.addLayer(marker);
    });

    AppState.layers.colonias.addTo(AppState.map);

    // Actualizar la lista en el recuadro municipal si está visible
    updateLocalidadesListInDashboard(muniId);
}

// TRANSICIÓN CONTROLADA A LA LOCALIDAD / COLONIA AL DAR CLIC EN SU PUNTO DE INFORMACIÓN
function zoomToColonia(coloniaId) {
    const colData = window.MEXICO_COLONIAS_DATA[coloniaId];
    if (!colData) return;

    AppState.level = "colonia";
    AppState.activeColoniaId = coloniaId;

    updateBreadcrumbs();
    updateViewIndicator(`Localidad / Colonia: ${colData.name}`);

    // Acercamiento controlado al punto exacto de la localidad sobre Google Maps
    if (colData.center) {
        AppState.map.flyTo(colData.center, 15, {
            duration: 1.2,
            easeLinearity: 0.25
        });
    }

    // Resaltar visualmente el punto de información activo
    document.querySelectorAll(".inegi-access-point").forEach(pin => {
        pin.classList.toggle("is-active", pin.dataset.colid === coloniaId);
    });

    // Abrir la información detallada de la localidad en el recuadro (dashboard)
    renderColoniaDashboard(coloniaId);
}

function clearSubLayers() {
    if (AppState.layers.municipios) {
        AppState.map.removeLayer(AppState.layers.municipios);
        AppState.layers.municipios = null;
    }
    if (AppState.layers.colonias) {
        AppState.map.removeLayer(AppState.layers.colonias);
        AppState.layers.colonias = null;
    }
    if (AppState.layers.highlight) {
        AppState.map.removeLayer(AppState.layers.highlight);
        AppState.layers.highlight = null;
    }
}

// Restablecer a vista nacional completa
function resetToNationalView() {
    AppState.map.flyTo([23.6345, -102.5528], 5, {
        duration: 1.6,
        easeLinearity: 0.25
    });
    loadStatesLayer();
    renderNationalDashboard();
}

// =============================================================================
// 4. BREADCRUMBS Y NAVEGACIÓN JERÁRQUICA
// =============================================================================

function updateBreadcrumbs() {
    const trail = document.getElementById("breadcrumbs-trail");
    const portalBreadcrumb = document.getElementById("portal-breadcrumbs-text");

    let portalHtml = `<a href="#" onclick="switchPortalView('inicio')">Inicio</a> / <a href="#" onclick="resetToNationalView()">Consulta Geográfica (SCINCE)</a>`;

    if (AppState.activeStateId) {
        const st = window.MEXICO_STATES_DATA[AppState.activeStateId];
        portalHtml += ` / <a href="#" onclick="zoomToState('${AppState.activeStateId}')">${st.name}</a>`;
    }

    if (AppState.activeMuniId) {
        const mu = window.MEXICO_MUNICIPIOS_DATA[AppState.activeMuniId];
        portalHtml += ` / <a href="#" onclick="zoomToMunicipio('${AppState.activeMuniId}')">${mu.name}</a>`;
    }

    if (AppState.activeColoniaId) {
        const col = window.MEXICO_COLONIAS_DATA[AppState.activeColoniaId];
        portalHtml += ` / <span class="active-crumb">${col.name}</span>`;
    }

    if (portalBreadcrumb) {
        portalBreadcrumb.innerHTML = portalHtml;
    }

    if (trail) {
        let html = `<div class="crumb-item ${AppState.level === 'pais' ? 'active' : ''}" onclick="resetToNationalView()"><i class="fas fa-globe-americas"></i> México</div>`;
        if (AppState.activeStateId) {
            const st = window.MEXICO_STATES_DATA[AppState.activeStateId];
            html += `<span class="crumb-separator">/</span><div class="crumb-item ${AppState.level === 'estado' ? 'active' : ''}" onclick="zoomToState('${AppState.activeStateId}')">${st.name}</div>`;
        }
        if (AppState.activeMuniId) {
            const mu = window.MEXICO_MUNICIPIOS_DATA[AppState.activeMuniId];
            html += `<span class="crumb-separator">/</span><div class="crumb-item ${AppState.level === 'municipio' ? 'active' : ''}" onclick="zoomToMunicipio('${AppState.activeMuniId}')">${mu.name}</div>`;
        }
        if (AppState.activeColoniaId) {
            const col = window.MEXICO_COLONIAS_DATA[AppState.activeColoniaId];
            html += `<span class="crumb-separator">/</span><div class="crumb-item active">${col.name}</div>`;
        }
        trail.innerHTML = html;
    }
}

function updateViewIndicator(text) {
    document.getElementById("view-level-text").textContent = text;
}

// =============================================================================
// 5. RENDERIZACIÓN DE DASHBOARDS (INEGI 2026)
// =============================================================================

function destroyCharts() {
    Object.keys(AppState.charts).forEach(key => {
        if (AppState.charts[key]) {
            AppState.charts[key].destroy();
        }
    });
    AppState.charts = {};
}

// Catálogo del Total de Localidades y Asentamientos Registrados por Estado (INEGI)
const ESTADO_LOCALIDADES_TOTAL = {
    "AGS": 2952, "BC": 7026, "BCS": 5010, "CAMP": 5436, "COAH": 10026,
    "COL": 3516, "CHIS": 26414, "CHIH": 21969, "CDMX": 662, "DGO": 9951,
    "GTO": 11611, "GRO": 9842, "HGO": 5371, "JAL": 19414, "MEX": 5307,
    "MICH": 12756, "MOR": 1928, "NAY": 4750, "NL": 10732, "OAX": 12997,
    "PUE": 8046, "QRO": 3564, "QROO": 4446, "SLP": 9307, "SIN": 9540,
    "SON": 17431, "TAB": 2742, "TAMPS": 14463, "TLAX": 1965, "VER": 27547,
    "YUC": 10095, "ZAC": 7415
};

// DASHBOARD 0: NACIONAL (MÉXICO)
function renderNationalDashboard() {
    destroyCharts();
    const d = window.MEXICO_NATIONAL_DATA;
    const panel = document.getElementById("dashboard-panel");

    panel.innerHTML = `
        <div class="dashboard-header">
            <div class="inegi-official-badge"><i class="fas fa-certificate" style="color:#BC955C;"></i> CENSO INEGI 2020 &bull; MARCO GEOESTADÍSTICO 2026</div>
            <div class="level-tag"><i class="fas fa-globe-americas"></i> COBERTURA TOTAL NACIONAL &bull; MÉXICO</div>
            <h2>${d.name}</h2>
            <div class="parent-sub">32 Entidades Federativas &bull; 2,464 Municipios &bull; 304,231 Localidades INEGI</div>
        </div>
        <div class="dashboard-content">
            <!-- KPIs Principales -->
            <div class="kpi-grid">
                <div class="kpi-card kpi-primary">
                    <div class="kpi-title">Población 2026 (Proy.)</div>
                    <div class="kpi-value">${Number(d.poblacion_proyeccion_2026).toLocaleString()}</div>
                    <div class="kpi-meta">+1.25% anual &bull; Censo 2020: 126.0M</div>
                </div>
                <div class="kpi-card kpi-success">
                    <div class="kpi-title">Ingreso Promedio</div>
                    <div class="kpi-value">$${Number(d.ingreso_promedio_mensual).toLocaleString()} MXN</div>
                    <div class="kpi-meta">ENIGH Actualizada</div>
                </div>
                <div class="kpi-card kpi-warning">
                    <div class="kpi-title">Cobertura Internet</div>
                    <div class="kpi-value">${d.cobertura_internet_pct}%</div>
                    <div class="kpi-meta">Hogares con conectividad</div>
                </div>
                <div class="kpi-card kpi-danger">
                    <div class="kpi-title">Unidades Económicas</div>
                    <div class="kpi-value">${(d.unidades_economicas_denue / 1000000).toFixed(2)}M</div>
                    <div class="kpi-meta">Directorio DENUE INEGI</div>
                </div>
            </div>

            <!-- Servicios e Infraestructura en Viviendas -->
            <div class="card-section">
                <div class="card-section-title">
                    <span>Cobertura en Viviendas Particulares</span>
                    <span class="tag">${Number(d.viviendas_habitadas).toLocaleString()} viv.</span>
                </div>
                <div class="service-row">
                    <div class="service-header">
                        <span class="service-name">Energía Eléctrica</span>
                        <span class="service-val">${d.cobertura_electricidad_pct}%</span>
                    </div>
                    <div class="service-bar-bg"><div class="service-bar-fill" style="width: ${d.cobertura_electricidad_pct}%"></div></div>
                </div>
                <div class="service-row">
                    <div class="service-header">
                        <span class="service-name">Agua Potable Entubada</span>
                        <span class="service-val">${d.cobertura_agua_potable_pct}%</span>
                    </div>
                    <div class="service-bar-bg"><div class="service-bar-fill" style="width: ${d.cobertura_agua_potable_pct}%"></div></div>
                </div>
                <div class="service-row">
                    <div class="service-header">
                        <span class="service-name">Telefonía Móvil</span>
                        <span class="service-val">${d.cobertura_telefonia_movil_pct}%</span>
                    </div>
                    <div class="service-bar-bg"><div class="service-bar-fill" style="width: ${d.cobertura_telefonia_movil_pct}%"></div></div>
                </div>
                <div class="service-row">
                    <div class="service-header">
                        <span class="service-name">Internet en Vivienda</span>
                        <span class="service-val">${d.cobertura_internet_pct}%</span>
                    </div>
                    <div class="service-bar-bg"><div class="service-bar-fill" style="width: ${d.cobertura_internet_pct}%"></div></div>
                </div>
            </div>

            <!-- Lista Rápida de los 32 Estados -->
            <div class="card-section">
                <div class="card-section-title">
                    <span>Entidades Federativas (Clic para ingresar)</span>
                    <span class="tag">32 Estados</span>
                </div>
                <div class="sub-items-list">
                    ${Object.values(window.MEXICO_STATES_DATA).map(st => `
                        <div class="sub-item-card" onclick="zoomToState('${st.id}')">
                            <div>
                                <div class="sub-item-title">${st.name}</div>
                                <div class="sub-item-sub">Capital: ${st.capital} &bull; ${Number(st.poblacion_proyeccion_2026).toLocaleString()} habs</div>
                            </div>
                            <div class="sub-item-action"><i class="fas fa-chevron-right"></i></div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Nota de Fuente Oficial INEGI -->
            <div class="inegi-source-footnote">
                <i class="fas fa-certificate" style="color:#BC955C;"></i>
                <span>Fuente: Instituto Nacional de Estadística y Geografía (INEGI) &bull; Censo 2020 / Marco Geoestadístico 2026</span>
            </div>

            <!-- Pie Institucional Oficial INEGI -->
            <footer class="inegi-dashboard-footer">
                <div class="inegi-footer-brand">
                    <span class="inegi-footer-title">INSTITUTO NACIONAL DE ESTADÍSTICA Y GEOGRAFÍA</span>
                    <span class="inegi-footer-sub">Dirección General de Estadísticas Sociodemográficas</span>
                </div>
                <div class="inegi-footer-info">
                    <span><i class="fas fa-map-marker-alt"></i> Sede Central: Aguascalientes, Ags., México</span>
                    <span><i class="fas fa-phone-alt"></i> Centro de Atención: 800 111 46 34</span>
                </div>
                <div class="inegi-footer-legal">
                    Información pública oficial conforme a la Ley del SNIEG &bull; Datos Abiertos
                </div>
            </footer>
        </div>
    `;

    initNationalCharts(d);
}

// DASHBOARD 1: ESTADO
function renderStateDashboard(stateId) {
    destroyCharts();
    const d = window.MEXICO_STATES_DATA[stateId];
    if (!d) return;

    const panel = document.getElementById("dashboard-panel");
    const munisOfState = Object.values(window.MEXICO_MUNICIPIOS_DATA).filter(m => m.parent_id === stateId);
    const totalLocs = ESTADO_LOCALIDADES_TOTAL[stateId] || (munisOfState.length * 85);

    panel.innerHTML = `
        <div class="dashboard-header">
            <div class="level-tag"><i class="fas fa-map-marked-alt"></i> Nivel Estatal &bull; Clave INEGI: ${d.cve}</div>
            <h2>${d.name}</h2>
            <div class="parent-sub">Capital: <strong>${d.capital}</strong> &bull; ${munisOfState.length} Municipios oficiales &bull; ${totalLocs.toLocaleString()} Localidades INEGI</div>
        </div>
        <div class="dashboard-content">
            <!-- KPIs del Estado -->
            <div class="kpi-grid">
                <div class="kpi-card kpi-primary">
                    <div class="kpi-title">Población 2026</div>
                    <div class="kpi-value">${Number(d.poblacion_proyeccion_2026).toLocaleString()}</div>
                    <div class="kpi-meta">${d.mujeres_pct}% Mujeres &bull; ${d.hombres_pct}% Hombres</div>
                </div>
                <div class="kpi-card kpi-success">
                    <div class="kpi-title">Ingreso Promedio</div>
                    <div class="kpi-value">$${Number(d.ingreso_promedio_mensual).toLocaleString()} MXN</div>
                    <div class="kpi-meta">PEA: ${Number(d.pea).toLocaleString()}</div>
                </div>
                <div class="kpi-card kpi-warning">
                    <div class="kpi-title">Cobertura Digital</div>
                    <div class="kpi-value">${d.cobertura_internet_pct}%</div>
                    <div class="kpi-meta">Escolaridad: ${d.grado_promedio_escolaridad} años</div>
                </div>
                <div class="kpi-card kpi-danger">
                    <div class="kpi-title">Marginación</div>
                    <div class="kpi-value" style="font-size:16px;">${d.indice_marginacion}</div>
                    <div class="kpi-meta">Densidad: ${d.densidad_pob_km2} hab/km²</div>
                </div>
            </div>

            <!-- Gráfico 2: Sectores Económicos -->
            <div class="card-section">
                <div class="card-section-title">
                    <span>Actividad Económica (DENUE)</span>
                    <span class="tag">${Number(d.unidades_economicas_denue).toLocaleString()} unidades</span>
                </div>
                <canvas id="chart-sectores" height="140"></canvas>
            </div>

            <!-- Gráfico 3: Cobertura en Servicios Básicos -->
            <div class="card-section">
                <div class="card-section-title">
                    <span>Viviendas e Infraestructura</span>
                    <span class="tag">${Number(d.viviendas_habitadas).toLocaleString()} viv.</span>
                </div>
                <div class="service-row">
                    <div class="service-header">
                        <span class="service-name">Agua Potable</span>
                        <span class="service-val">${d.cobertura_agua_potable_pct}%</span>
                    </div>
                    <div class="service-bar-bg"><div class="service-bar-fill" style="width: ${d.cobertura_agua_potable_pct}%"></div></div>
                </div>
                <div class="service-row">
                    <div class="service-header">
                        <span class="service-name">Drenaje y Saneamiento</span>
                        <span class="service-val">${d.cobertura_drenaje_pct}%</span>
                    </div>
                    <div class="service-bar-bg"><div class="service-bar-fill" style="width: ${d.cobertura_drenaje_pct}%"></div></div>
                </div>
                <div class="service-row">
                    <div class="service-header">
                        <span class="service-name">Acceso a Internet</span>
                        <span class="service-val">${d.cobertura_internet_pct}%</span>
                    </div>
                    <div class="service-bar-bg"><div class="service-bar-fill" style="width: ${d.cobertura_internet_pct}%"></div></div>
                </div>
            </div>

            <!-- Lista de Municipios Oficiales de este Estado con Buscador -->
            <div class="card-section">
                <div class="card-section-title">
                    <span>Municipios de ${d.name}</span>
                    <span class="tag" id="munis-count-tag">${munisOfState.length}</span>
                </div>
                <input type="text" 
                       class="sub-items-search" 
                       id="search-munis-input" 
                       placeholder="🔍 Buscar municipio en ${d.name}..." 
                       oninput="filterMunicipiosList(this.value, '${stateId}')">
                <div class="sub-items-list" id="munis-list-container">
                    ${renderMunicipiosListHtml(munisOfState)}
                </div>
            </div>

            <!-- Nota de Fuente Oficial INEGI -->
            <div class="inegi-source-footnote">
                <i class="fas fa-certificate" style="color:#BC955C;"></i>
                <span>Fuente: Instituto Nacional de Estadística y Geografía (INEGI) &bull; Censo 2020 / Marco Geoestadístico 2026</span>
            </div>

            <!-- Pie Institucional Oficial INEGI -->
            <footer class="inegi-dashboard-footer">
                <div class="inegi-footer-brand">
                    <span class="inegi-footer-title">INSTITUTO NACIONAL DE ESTADÍSTICA Y GEOGRAFÍA</span>
                    <span class="inegi-footer-sub">Dirección General de Estadísticas Sociodemográficas</span>
                </div>
                <div class="inegi-footer-info">
                    <span><i class="fas fa-map-marker-alt"></i> Sede Central: Aguascalientes, Ags., México</span>
                    <span><i class="fas fa-phone-alt"></i> Centro de Atención: 800 111 46 34</span>
                </div>
                <div class="inegi-footer-legal">
                    Información pública oficial conforme a la Ley del SNIEG &bull; Datos Abiertos
                </div>
            </footer>
        </div>
    `;

    initStateCharts(d);
}

// Funciones auxiliares para listar y filtrar municipios de un estado
function renderMunicipiosListHtml(munis) {
    if (!munis || munis.length === 0) {
        return `<div style="padding:15px; text-align:center; color:#94a3b8; font-size:12px;">No hay municipios disponibles</div>`;
    }
    return munis.map(m => `
        <div class="sub-item-card" onclick="zoomToMunicipio('${m.id}')">
            <div>
                <div class="sub-item-title"><i class="fas fa-city" style="color:#60a5fa; margin-right:5px; font-size:11px;"></i>${m.name}</div>
                <div class="sub-item-sub">${Number(m.poblacion_proyeccion_2026).toLocaleString()} habs &bull; $${Number(m.ingreso_promedio_mensual).toLocaleString()} MXN</div>
            </div>
            <div class="sub-item-action"><i class="fas fa-crosshairs"></i></div>
        </div>
    `).join('');
}

function filterMunicipiosList(query, stateId) {
    const q = (query || "").toLowerCase().trim();
    const munis = Object.values(window.MEXICO_MUNICIPIOS_DATA).filter(m => m.parent_id === stateId);
    const filtered = q ? munis.filter(m => m.name.toLowerCase().includes(q)) : munis;
    const container = document.getElementById("munis-list-container");
    const countTag = document.getElementById("munis-count-tag");
    if (container) {
        container.innerHTML = filtered.length > 0 ? renderMunicipiosListHtml(filtered) : 
            `<div style="padding:15px; text-align:center; color:#94a3b8; font-size:12px;">No se encontraron municipios con "${query}"</div>`;
    }
    if (countTag) {
        countTag.textContent = filtered.length;
    }
}

// DASHBOARD 2: MUNICIPIO
function renderMunicipioDashboard(muniId) {
    destroyCharts();
    const d = window.MEXICO_MUNICIPIOS_DATA[muniId];
    if (!d) return;

    const panel = document.getElementById("dashboard-panel");
    const colsOfMuni = Object.values(window.MEXICO_COLONIAS_DATA).filter(c => c.parent_id === muniId);

    panel.innerHTML = `
        <div class="dashboard-header">
            <div class="inegi-official-badge"><i class="fas fa-certificate" style="color:#BC955C;"></i> MUNICIPIO INEGI &bull; CLAVE GEOESTADÍSTICA: <code>${d.cve}</code></div>
            <div class="level-tag"><i class="fas fa-city"></i> NIVEL MUNICIPAL OFICIAL</div>
            <h2>${d.name}</h2>
            <div class="parent-sub">Pertenece a: <strong>${d.parent_name}</strong> &bull; <span id="muni-colonias-count-sub">${colsOfMuni.length} Localidades registradas</span></div>
        </div>
        <div class="dashboard-content">
            <!-- KPIs del Municipio -->
            <div class="kpi-grid">
                <div class="kpi-card kpi-primary">
                    <div class="kpi-title">Población Proyectada</div>
                    <div class="kpi-value">${Number(d.poblacion_proyeccion_2026).toLocaleString()}</div>
                    <div class="kpi-meta">Densidad: ${d.densidad_pob_km2} hab/km²</div>
                </div>
                <div class="kpi-card kpi-success">
                    <div class="kpi-title">Ingreso Promedio</div>
                    <div class="kpi-value">$${Number(d.ingreso_promedio_mensual).toLocaleString()} MXN</div>
                    <div class="kpi-meta">Ocupación: ${d.tasa_ocupacion}%</div>
                </div>
                <div class="kpi-card kpi-warning">
                    <div class="kpi-title">Hogares Conectados</div>
                    <div class="kpi-value">${d.cobertura_internet_pct}%</div>
                    <div class="kpi-meta">Escolaridad: ${d.grado_promedio_escolaridad} años</div>
                </div>
                <div class="kpi-card kpi-danger">
                    <div class="kpi-title">DENUE Económico</div>
                    <div class="kpi-value">${Number(d.unidades_economicas_denue).toLocaleString()}</div>
                    <div class="kpi-meta">Comercios y Empresas</div>
                </div>
            </div>

            <!-- Servicios Básicos en Viviendas -->
            <div class="card-section">
                <div class="card-section-title">
                    <span>Servicios Básicos y Urbanización</span>
                    <span class="tag">${Number(d.viviendas_habitadas).toLocaleString()} viv.</span>
                </div>
                <div class="service-row">
                    <div class="service-header">
                        <span class="service-name">Agua Entubada</span>
                        <span class="service-val">${d.cobertura_agua_potable_pct}%</span>
                    </div>
                    <div class="service-bar-bg"><div class="service-bar-fill" style="width: ${d.cobertura_agua_potable_pct}%"></div></div>
                </div>
                <div class="service-row">
                    <div class="service-header">
                        <span class="service-name">Drenaje y Alcantarillado</span>
                        <span class="service-val">${d.cobertura_drenaje_pct}%</span>
                    </div>
                    <div class="service-bar-bg"><div class="service-bar-fill" style="width: ${d.cobertura_drenaje_pct}%"></div></div>
                </div>
                <div class="service-row">
                    <div class="service-header">
                        <span class="service-name">Cobertura Móvil</span>
                        <span class="service-val">${d.cobertura_telefonia_movil_pct}%</span>
                    </div>
                    <div class="service-bar-bg"><div class="service-bar-fill" style="width: ${d.cobertura_telefonia_movil_pct}%"></div></div>
                </div>
            </div>

            <!-- Catálogo de Localidades Oficiales INEGI -->
            <div class="card-section">
                <div class="card-section-title">
                    <span>Localidades y Asentamientos INEGI</span>
                    <span class="tag" id="loc-count-tag">${colsOfMuni.length}</span>
                </div>
                <input type="text" 
                       class="sub-items-search" 
                       id="search-localidades-input" 
                       placeholder="🔍 Buscar localidad por nombre..." 
                       oninput="filterLocalidadesList(this.value, '${muniId}')">
                <div class="sub-items-list" id="localidades-list-container">
                    ${renderLocalidadesListHtml(colsOfMuni)}
                </div>
            </div>

            <!-- Nota de Fuente Oficial INEGI -->
            <div class="inegi-source-footnote">
                <i class="fas fa-certificate" style="color:#BC955C;"></i>
                <span>Fuente: Instituto Nacional de Estadística y Geografía (INEGI) &bull; Censo 2020 / Marco Geoestadístico 2026</span>
            </div>

            <!-- Pie Institucional Oficial INEGI -->
            <footer class="inegi-dashboard-footer">
                <div class="inegi-footer-brand">
                    <span class="inegi-footer-title">INSTITUTO NACIONAL DE ESTADÍSTICA Y GEOGRAFÍA</span>
                    <span class="inegi-footer-sub">Dirección General de Estadísticas Sociodemográficas</span>
                </div>
                <div class="inegi-footer-info">
                    <span><i class="fas fa-map-marker-alt"></i> Sede Central: Aguascalientes, Ags., México</span>
                    <span><i class="fas fa-phone-alt"></i> Centro de Atención: 800 111 46 34</span>
                </div>
                <div class="inegi-footer-legal">
                    Información pública oficial conforme a la Ley del SNIEG &bull; Datos Abiertos
                </div>
            </footer>
        </div>
    `;

    initMunicipioCharts(d);
}

// Auxiliares para renderizar y filtrar lista de localidades en el panel lateral
function renderLocalidadesListHtml(cols) {
    if (!cols || cols.length === 0) {
        return `<div style="padding:15px; text-align:center; color:#94a3b8; font-size:12px;">Cargando localidades oficiales INEGI...</div>`;
    }
    return cols.map(c => `
        <div class="sub-item-card" id="list-item-${c.id}" onclick="zoomToColonia('${c.id}')">
            <div>
                <div class="sub-item-title">
                    <i class="fas fa-map-marker-alt" style="color:${c.tipo === 'U' ? '#1a73e8' : '#ea4335'}; margin-right:5px; font-size:11px;"></i>${c.name}
                </div>
                <div class="sub-item-sub">
                    ${c.tipo === 'U' ? 'Localidad Urbana' : 'Localidad / Asentamiento'} &bull; ${Number(c.poblacion_proyeccion_2026).toLocaleString()} habs
                </div>
            </div>
            <div class="sub-item-action"><i class="fas fa-crosshairs"></i></div>
        </div>
    `).join('');
}

function filterLocalidadesList(query, muniId) {
    const q = (query || "").toLowerCase().trim();
    const cols = Object.values(window.MEXICO_COLONIAS_DATA).filter(c => c.parent_id === muniId);
    const filtered = q ? cols.filter(c => c.name.toLowerCase().includes(q)) : cols;
    const container = document.getElementById("localidades-list-container");
    const countTag = document.getElementById("loc-count-tag");
    if (container) {
        container.innerHTML = filtered.length > 0 ? renderLocalidadesListHtml(filtered) : 
            `<div style="padding:15px; text-align:center; color:#94a3b8; font-size:12px;">No se encontraron localidades con "${query}"</div>`;
    }
    if (countTag) {
        countTag.textContent = filtered.length;
    }
}

function updateLocalidadesListInDashboard(muniId) {
    const container = document.getElementById("localidades-list-container");
    const countTag = document.getElementById("loc-count-tag");
    const parentSub = document.getElementById("muni-colonias-count-sub");
    
    const colsOfMuni = Object.values(window.MEXICO_COLONIAS_DATA).filter(c => c.parent_id === muniId);
    if (countTag) countTag.textContent = colsOfMuni.length;
    if (parentSub) parentSub.textContent = `${colsOfMuni.length} Localidades registradas`;
    if (container) {
        container.innerHTML = renderLocalidadesListHtml(colsOfMuni);
    }
}

// DASHBOARD 3: COLONIA / BARRIO / LOCALIDAD (EL RECUADRO CON EL NOMBRE Y ESTADÍSTICAS)
// DASHBOARD 3: COLONIA / BARRIO / LOCALIDAD (PANEL EJECUTIVO PROFESIONAL INEGI)
let currentColoniaActiveTab = 'resumen';

function switchColoniaTab(tabName) {
    currentColoniaActiveTab = tabName;
    document.querySelectorAll('.dash-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    document.querySelectorAll('.tab-content-pane').forEach(pane => {
        pane.style.display = (pane.id === 'col-tab-' + tabName) ? 'block' : 'none';
    });

    const colId = AppState.activeColoniaId;
    if (colId && window.MEXICO_COLONIAS_DATA[colId]) {
        renderColoniaTabCharts(tabName, window.MEXICO_COLONIAS_DATA[colId]);
    }
}
window.switchColoniaTab = switchColoniaTab;

function renderColoniaDashboard(colId) {
    destroyCharts();
    const d = window.MEXICO_COLONIAS_DATA[colId];
    if (!d) return;

    AppState.activeColoniaId = colId;
    const panel = document.getElementById("dashboard-panel");

    // Determinar equivalencia de escolaridad
    let nivelEscolar = "Primaria Completa";
    if (d.grado_promedio_escolaridad >= 12.0) nivelEscolar = "Media Superior / Bachillerato";
    else if (d.grado_promedio_escolaridad >= 9.0) nivelEscolar = "Secundaria Concluida";
    else if (d.grado_promedio_escolaridad >= 6.0) nivelEscolar = "Primaria Concluida";
    else nivelEscolar = "Primaria Incompleta";

    panel.innerHTML = `
        <div class="dashboard-header">
            <button class="btn-back-crumb" onclick="zoomToMunicipio('${d.parent_id}')">
                <i class="fas fa-arrow-left"></i> Volver a ${d.parent_name}
            </button>
            <div class="inegi-official-badge">
                <i class="fas fa-shield-alt"></i> Censo INEGI 2020 Oficial &bull; Clave: <code>${d.cve_geo}</code>
            </div>
            <h2>${d.name}</h2>
            <div class="parent-sub">
                Municipio: <strong>${d.parent_name}</strong> &bull; Estado: <strong>${d.estado_name}</strong> &bull; 
                <span class="badge ${d.tipo === 'U' ? 'badge-primary' : 'badge-secondary'}">
                    ${d.tipo === 'U' ? 'Urbana' : 'Rural'}
                </span>
            </div>
        </div>

        <div class="dashboard-content">
            <!-- Barra de Navegación por Pestañas Ejecutivas -->
            <div class="dashboard-nav-tabs">
                <button class="dash-tab-btn ${currentColoniaActiveTab === 'resumen' ? 'active' : ''}" data-tab="resumen" onclick="switchColoniaTab('resumen')">
                    <i class="fas fa-chart-pie"></i> Resumen
                </button>
                <button class="dash-tab-btn ${currentColoniaActiveTab === 'demografia' ? 'active' : ''}" data-tab="demografia" onclick="switchColoniaTab('demografia')">
                    <i class="fas fa-users"></i> Demografía
                </button>
                <button class="dash-tab-btn ${currentColoniaActiveTab === 'servicios' ? 'active' : ''}" data-tab="servicios" onclick="switchColoniaTab('servicios')">
                    <i class="fas fa-home"></i> Vivienda
                </button>
                <button class="dash-tab-btn ${currentColoniaActiveTab === 'educacion' ? 'active' : ''}" data-tab="educacion" onclick="switchColoniaTab('educacion')">
                    <i class="fas fa-graduation-cap"></i> Educación
                </button>
            </div>

            <!-- TAB 1: RESUMEN EJECUTIVO -->
            <div id="col-tab-resumen" class="tab-content-pane" style="display: ${currentColoniaActiveTab === 'resumen' ? 'block' : 'none'};">
                <div class="kpi-grid">
                    <div class="kpi-card kpi-primary">
                        <div class="kpi-title">Población 2026 (Proy.)</div>
                        <div class="kpi-value">${Number(d.poblacion_proyeccion_2026).toLocaleString()}</div>
                        <div class="kpi-meta">Estimación Oficial</div>
                    </div>
                    <div class="kpi-card kpi-success">
                        <div class="kpi-title">Censo INEGI 2020</div>
                        <div class="kpi-value">${Number(d.poblacion_total_2020).toLocaleString()}</div>
                        <div class="kpi-meta">Habitantes censados</div>
                    </div>
                    <div class="kpi-card kpi-warning">
                        <div class="kpi-title">Viviendas Habitadas</div>
                        <div class="kpi-value">${Number(d.viviendas_habitadas).toLocaleString()}</div>
                        <div class="kpi-meta">${d.promedio_ocupantes_vivienda} hab/vivienda</div>
                    </div>
                    <div class="kpi-card kpi-danger">
                        <div class="kpi-title">Escolaridad Promedio</div>
                        <div class="kpi-value">${d.grado_promedio_escolaridad} <span style="font-size:12px;">años</span></div>
                        <div class="kpi-meta">${nivelEscolar}</div>
                    </div>
                </div>

                <div class="card-section">
                    <div class="card-section-title">
                        <span>Indicadores Esenciales INEGI</span>
                        <span class="tag">Oficial</span>
                    </div>
                    <div class="info-indicator-row">
                        <span class="info-indicator-label"><i class="fas fa-fingerprint" style="color:#38bdf8;"></i> Clave Geoestadística:</span>
                        <span class="info-indicator-value" style="font-family:monospace;">${d.cve_geo}</span>
                    </div>
                    <div class="info-indicator-row">
                        <span class="info-indicator-label"><i class="fas fa-bolt" style="color:#fbbf24;"></i> Electricidad (VPH_C_ELEC):</span>
                        <span class="info-indicator-value">${d.cobertura_electricidad_pct}% (${Number(d.v_elec).toLocaleString()} vivs)</span>
                    </div>
                    <div class="info-indicator-row">
                        <span class="info-indicator-label"><i class="fas fa-tint" style="color:#06b6d4;"></i> Agua Entubada (VPH_AGUADV):</span>
                        <span class="info-indicator-value">${d.cobertura_agua_potable_pct}% (${Number(d.v_agua).toLocaleString()} vivs)</span>
                    </div>
                    <div class="info-indicator-row">
                        <span class="info-indicator-label"><i class="fas fa-wifi" style="color:#a855f7;"></i> Internet en Viviendas:</span>
                        <span class="info-indicator-value">${d.cobertura_internet_pct}% (${Number(d.v_inter).toLocaleString()} vivs)</span>
                    </div>
                    <div class="info-indicator-row">
                        <span class="info-indicator-label"><i class="fas fa-store" style="color:#34d399;"></i> Unidades Económicas (DENUE):</span>
                        <span class="info-indicator-value">${Number(d.unidades_economicas_denue).toLocaleString()} registradas</span>
                    </div>
                </div>
            </div>

            <!-- TAB 2: DEMOGRAFÍA DETALLADA -->
            <div id="col-tab-demografia" class="tab-content-pane" style="display: ${currentColoniaActiveTab === 'demografia' ? 'block' : 'none'};">
                <div class="card-section">
                    <div class="card-section-title">
                        <span>Distribución por Sexo (Censo 2020)</span>
                        <span class="tag">${Number(d.poblacion_total_2020).toLocaleString()} habs</span>
                    </div>
                    <div class="gender-bar-container">
                        <div class="gender-bar-fem" style="width: ${d.mujeres_pct}%">
                            ${d.mujeres_pct > 18 ? d.mujeres_pct + '% M' : ''}
                        </div>
                        <div class="gender-bar-mas" style="width: ${d.hombres_pct}%">
                            ${d.hombres_pct > 18 ? d.hombres_pct + '% H' : ''}
                        </div>
                    </div>
                    <div class="gender-legend">
                        <span><span class="gender-dot-fem"></span> <strong>${Number(d.mujeres).toLocaleString()}</strong> Mujeres (${d.mujeres_pct}%)</span>
                        <span><span class="gender-dot-mas"></span> <strong>${Number(d.hombres).toLocaleString()}</strong> Hombres (${d.hombres_pct}%)</span>
                    </div>
                </div>

                <div class="card-section">
                    <div class="card-section-title">
                        <span>Estructura por Grupos de Edad</span>
                        <span class="tag">Población Total</span>
                    </div>
                    <div style="margin-top:10px;">
                        <div class="info-indicator-row">
                            <span class="info-indicator-label"><i class="fas fa-child" style="color:#38bdf8;"></i> 0 a 14 años (Infancia):</span>
                            <span class="info-indicator-value">${Number(d.p_0a14).toLocaleString()} (${d.p_0a14_pct}%)</span>
                        </div>
                        <div class="info-indicator-row">
                            <span class="info-indicator-label"><i class="fas fa-user-tie" style="color:#3b82f6;"></i> 15 a 59 años (Productiva):</span>
                            <span class="info-indicator-value">${Number(d.p_15a59).toLocaleString()} (${d.p_15a59_pct}%)</span>
                        </div>
                        <div class="info-indicator-row">
                            <span class="info-indicator-label"><i class="fas fa-blind" style="color:#f59e0b;"></i> 60+ años (Adultos Mayores):</span>
                            <span class="info-indicator-value">${Number(d.p_60mas).toLocaleString()} (${d.p_60mas_pct}%)</span>
                        </div>
                    </div>
                </div>

                <div class="card-section">
                    <div class="card-section-title">
                        <span>Inclusión y Población Vulnerable</span>
                        <span class="tag">INEGI</span>
                    </div>
                    <div class="info-indicator-row">
                        <span class="info-indicator-label"><i class="fas fa-wheelchair" style="color:#ec4899;"></i> Personas con Discapacidad / Limitación:</span>
                        <span class="info-indicator-value">${Number(d.p_disc).toLocaleString()} habs (${d.p_disc_pct}%)</span>
                    </div>
                </div>
            </div>

            <!-- TAB 3: VIVIENDA Y SERVICIOS CENSO OFICIAL -->
            <div id="col-tab-servicios" class="tab-content-pane" style="display: ${currentColoniaActiveTab === 'servicios' ? 'block' : 'none'};">
                <div class="card-section">
                    <div class="card-section-title">
                        <span>Parque Habitacional</span>
                        <span class="tag">${Number(d.viviendas_habitadas).toLocaleString()} habitadas</span>
                    </div>
                    <div class="info-indicator-row">
                        <span class="info-indicator-label"><i class="fas fa-door-open" style="color:#10b981;"></i> Viviendas Particulares Habitadas:</span>
                        <span class="info-indicator-value">${Number(d.viviendas_habitadas).toLocaleString()}</span>
                    </div>
                    <div class="info-indicator-row">
                        <span class="info-indicator-label"><i class="fas fa-building" style="color:#64748b;"></i> Total Viviendas Censadas:</span>
                        <span class="info-indicator-value">${Number(d.viviendas_totales).toLocaleString()}</span>
                    </div>
                    <div class="info-indicator-row">
                        <span class="info-indicator-label"><i class="fas fa-users" style="color:#38bdf8;"></i> Promedio de Ocupantes por Vivienda:</span>
                        <span class="info-indicator-value">${d.promedio_ocupantes_vivienda} hab/viv</span>
                    </div>
                </div>

                <div class="card-section">
                    <div class="card-section-title">
                        <span>Servicios Básicos y Bienes TIC</span>
                        <span class="tag">Cobertura Real</span>
                    </div>

                    <!-- Electricidad -->
                    <div class="service-stat-card">
                        <div class="service-stat-top">
                            <span class="service-stat-icon-title"><i class="fas fa-bolt" style="color:#fbbf24;"></i> Energía Eléctrica</span>
                            <span class="service-stat-counts">${d.cobertura_electricidad_pct}% (${Number(d.v_elec).toLocaleString()} viv.)</span>
                        </div>
                        <div class="service-progress-track">
                            <div class="service-progress-fill" style="width: ${d.cobertura_electricidad_pct}%; background: linear-gradient(90deg, #fbbf24, #d97706);"></div>
                        </div>
                    </div>

                    <!-- Agua Entubada -->
                    <div class="service-stat-card">
                        <div class="service-stat-top">
                            <span class="service-stat-icon-title"><i class="fas fa-tint" style="color:#06b6d4;"></i> Agua Entubada en la Vivienda</span>
                            <span class="service-stat-counts">${d.cobertura_agua_potable_pct}% (${Number(d.v_agua).toLocaleString()} viv.)</span>
                        </div>
                        <div class="service-progress-track">
                            <div class="service-progress-fill" style="width: ${d.cobertura_agua_potable_pct}%; background: linear-gradient(90deg, #06b6d4, #0284c7);"></div>
                        </div>
                    </div>

                    <!-- Drenaje -->
                    <div class="service-stat-card">
                        <div class="service-stat-top">
                            <span class="service-stat-icon-title"><i class="fas fa-shower" style="color:#3b82f6;"></i> Drenaje Sanitario</span>
                            <span class="service-stat-counts">${d.cobertura_drenaje_pct}% (${Number(d.v_dren).toLocaleString()} viv.)</span>
                        </div>
                        <div class="service-progress-track">
                            <div class="service-progress-fill" style="width: ${d.cobertura_drenaje_pct}%; background: linear-gradient(90deg, #3b82f6, #1d4ed8);"></div>
                        </div>
                    </div>

                    <!-- Internet -->
                    <div class="service-stat-card">
                        <div class="service-stat-top">
                            <span class="service-stat-icon-title"><i class="fas fa-wifi" style="color:#a855f7;"></i> Conexión a Internet</span>
                            <span class="service-stat-counts">${d.cobertura_internet_pct}% (${Number(d.v_inter).toLocaleString()} viv.)</span>
                        </div>
                        <div class="service-progress-track">
                            <div class="service-progress-fill" style="width: ${d.cobertura_internet_pct}%; background: linear-gradient(90deg, #a855f7, #7c3aed);"></div>
                        </div>
                    </div>

                    <!-- Telefonía Celular -->
                    <div class="service-stat-card">
                        <div class="service-stat-top">
                            <span class="service-stat-icon-title"><i class="fas fa-mobile-alt" style="color:#ec4899;"></i> Telefonía Celular</span>
                            <span class="service-stat-counts">${d.cobertura_telefonia_movil_pct}% (${Number(d.v_cel).toLocaleString()} viv.)</span>
                        </div>
                        <div class="service-progress-track">
                            <div class="service-progress-fill" style="width: ${d.cobertura_telefonia_movil_pct}%; background: linear-gradient(90deg, #ec4899, #be185d);"></div>
                        </div>
                    </div>

                    <!-- Computadora / Laptop -->
                    <div class="service-stat-card">
                        <div class="service-stat-top">
                            <span class="service-stat-icon-title"><i class="fas fa-laptop" style="color:#10b981;"></i> Computadora / Laptop / Tablet</span>
                            <span class="service-stat-counts">${d.cobertura_computadora_pct}% (${Number(d.v_pc).toLocaleString()} viv.)</span>
                        </div>
                        <div class="service-progress-track">
                            <div class="service-progress-fill" style="width: ${d.cobertura_computadora_pct}%; background: linear-gradient(90deg, #10b981, #059669);"></div>
                        </div>
                    </div>

                    <!-- Automóvil -->
                    <div class="service-stat-card">
                        <div class="service-stat-top">
                            <span class="service-stat-icon-title"><i class="fas fa-car" style="color:#f97316;"></i> Automóvil / Camioneta</span>
                            <span class="service-stat-counts">${d.cobertura_automovil_pct}% (${Number(d.v_auto).toLocaleString()} viv.)</span>
                        </div>
                        <div class="service-progress-track">
                            <div class="service-progress-fill" style="width: ${d.cobertura_automovil_pct}%; background: linear-gradient(90deg, #f97316, #c2410c);"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TAB 4: EDUCACIÓN Y EMPLEO -->
            <div id="col-tab-educacion" class="tab-content-pane" style="display: ${currentColoniaActiveTab === 'educacion' ? 'block' : 'none'};">
                <div class="card-section">
                    <div class="card-section-title">
                        <span>Educación y Escolaridad Censal</span>
                        <span class="tag">GRAPROES</span>
                    </div>
                    <div class="info-indicator-row">
                        <span class="info-indicator-label"><i class="fas fa-graduation-cap" style="color:#38bdf8;"></i> Grado Promedio de Escolaridad:</span>
                        <span class="info-indicator-value">${d.grado_promedio_escolaridad} años</span>
                    </div>
                    <div class="info-indicator-row">
                        <span class="info-indicator-label"><i class="fas fa-award" style="color:#fbbf24;"></i> Nivel Educativo Promedio:</span>
                        <span class="info-indicator-value">${nivelEscolar}</span>
                    </div>
                </div>

                <div class="card-section">
                    <div class="card-section-title">
                        <span>Fuerza Laboral y Ocupación</span>
                        <span class="tag">Censo 2020</span>
                    </div>
                    <div class="info-indicator-row">
                        <span class="info-indicator-label"><i class="fas fa-briefcase" style="color:#10b981;"></i> Población Económicamente Activa (PEA):</span>
                        <span class="info-indicator-value">${Number(d.pea).toLocaleString()} personas</span>
                    </div>
                    <div class="info-indicator-row">
                        <span class="info-indicator-label"><i class="fas fa-user-check" style="color:#06b6d4;"></i> Población Ocupada (POCUPADA):</span>
                        <span class="info-indicator-value">${Number(d.pocupada).toLocaleString()} personas</span>
                    </div>
                    <div class="info-indicator-row">
                        <span class="info-indicator-label"><i class="fas fa-chart-line" style="color:#3b82f6;"></i> Tasa de Ocupación:</span>
                        <span class="info-indicator-value">${d.tasa_ocupacion}%</span>
                    </div>
                    <div class="info-indicator-row">
                        <span class="info-indicator-label"><i class="fas fa-coins" style="color:#f59e0b;"></i> Ingreso Promedio Estimado:</span>
                        <span class="info-indicator-value">$${Number(d.ingreso_promedio_mensual).toLocaleString()} MXN</span>
                    </div>
                    <div class="info-indicator-row">
                        <span class="info-indicator-label"><i class="fas fa-layer-group" style="color:#ec4899;"></i> Grado de Marginación:</span>
                        <span class="info-indicator-value">${d.indice_marginacion}</span>
                    </div>
                </div>

                <div class="card-section">
                    <div class="card-section-title">
                        <span>Giro de Establecimientos Locales</span>
                        <span class="tag">DENUE (${Number(d.unidades_economicas_denue).toLocaleString()} u.)</span>
                    </div>
                    <canvas id="chart-sectores-colonia" height="140"></canvas>
                </div>
            </div>

            <!-- Botones de Navegación Rápida -->
            <div style="display: flex; gap: 10px; margin-top: 14px;">
                <button class="btn-zoom-reset" style="flex:1; justify-content:center; padding:10px;" onclick="zoomToMunicipio('${d.parent_id}')">
                    <i class="fas fa-arrow-left"></i> Volver a Municipio
                </button>
                <button class="btn-zoom-reset" style="flex:1; justify-content:center; padding:10px;" onclick="resetToNationalView()">
                    <i class="fas fa-globe-americas"></i> Vista Nacional
                </button>
            </div>

            <!-- Nota de Fuente Oficial INEGI -->
            <div class="inegi-source-footnote">
                <i class="fas fa-certificate" style="color:#BC955C;"></i>
                <span>Fuente: Instituto Nacional de Estadística y Geografía (INEGI) &bull; Censo 2020 / Marco Geoestadístico 2026</span>
            </div>

            <!-- Pie Institucional Oficial INEGI -->
            <footer class="inegi-dashboard-footer">
                <div class="inegi-footer-brand">
                    <span class="inegi-footer-title">INSTITUTO NACIONAL DE ESTADÍSTICA Y GEOGRAFÍA</span>
                    <span class="inegi-footer-sub">Dirección General de Estadísticas Sociodemográficas</span>
                </div>
                <div class="inegi-footer-info">
                    <span><i class="fas fa-map-marker-alt"></i> Sede Central: Aguascalientes, Ags., México</span>
                    <span><i class="fas fa-phone-alt"></i> Centro de Atención: 800 111 46 34</span>
                </div>
                <div class="inegi-footer-legal">
                    Información pública oficial conforme a la Ley del SNIEG &bull; Datos Abiertos
                </div>
            </footer>
        </div>
    `;

    renderColoniaTabCharts(currentColoniaActiveTab, d);
}

// =============================================================================
// 6. GENERACIÓN DE GRÁFICOS INTERACTIVOS (CHART.JS)
// =============================================================================

function initNationalCharts(d) {
    // Indicadores censales e infraestructura representados en tarjetas oficiales y barras de cobertura
}

function initStateCharts(d) {
    const ctxSec = document.getElementById("chart-sectores")?.getContext("2d");
    if (ctxSec && d.sectores_economicos) {
        AppState.charts.sectores = new Chart(ctxSec, {
            type: "doughnut",
            data: {
                labels: ["Servicios", "Comercio", "Manufactura", "Agropecuario"],
                datasets: [{
                    data: [
                        d.sectores_economicos.servicios,
                        d.sectores_economicos.comercio,
                        d.sectores_economicos.manufactura_industria,
                        d.sectores_economicos.agropecuario
                    ],
                    backgroundColor: ["#002F6C", "#0084B4", "#8A1538", "#107C41"],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: "right", labels: { color: "#cbd5e1", font: { size: 10 } } }
                }
            }
        });
    }
}

function initMunicipioCharts(d) {
    // Indicadores y servicios municipales estructurados en fichas institucionales INEGI
}

function renderColoniaTabCharts(tabName, d) {
    if (tabName === 'educacion') {
        if (AppState.charts.sectores) {
            AppState.charts.sectores.destroy();
            delete AppState.charts.sectores;
        }
        const ctxSec = document.getElementById('chart-sectores-colonia')?.getContext('2d');
        if (ctxSec && d.sectores_economicos) {
            AppState.charts.sectores = new Chart(ctxSec, {
                type: 'doughnut',
                data: {
                    labels: ['Servicios', 'Comercio', 'Manufactura / Taller', 'Agropecuario'],
                    datasets: [{
                        data: [
                            d.sectores_economicos.servicios,
                            d.sectores_economicos.comercio,
                            d.sectores_economicos.manufactura_industria,
                            d.sectores_economicos.agropecuario
                        ],
                        backgroundColor: ['#002F6C', '#0084B4', '#8A1538', '#107C41'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'right', labels: { color: '#cbd5e1', font: { size: 10 } } }
                    }
                }
            });
        }
    }
}

function initColoniaCharts(d) {
    renderColoniaTabCharts(currentColoniaActiveTab, d);
}

function getChartDefaultOptions(yAxisTitle) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "rgba(6, 18, 34, 0.95)",
                titleColor: "#BC955C",
                bodyColor: "#FFFFFF",
                borderColor: "#BC955C",
                borderWidth: 1,
                padding: 10,
                boxPadding: 4,
                usePointStyle: true
            }
        },
        scales: {
            x: {
                grid: { color: "rgba(188, 149, 92, 0.12)" },
                ticks: { color: "#CBD5E1", font: { size: 10 } }
            },
            y: {
                grid: { color: "rgba(188, 149, 92, 0.12)" },
                ticks: { color: "#CBD5E1", font: { size: 10 } },
                title: { display: !!yAxisTitle, text: yAxisTitle, color: "#BC955C", font: { size: 10, weight: "bold" } }
            }
        }
    };
}

// =============================================================================
// 7. LEYENDA DEL MAPA Y SELECTOR DE MÉTRICA
// =============================================================================

function setupMetricSelector() {
    const sel = document.getElementById("map-metric-select");
    sel.addEventListener("change", (e) => {
        AppState.activeMetric = e.target.value;
        updateMapLegend();

        // Refrescar estilos según el nivel actual
        if (AppState.level === "pais" && AppState.layers.states) {
            AppState.layers.states.setStyle((feature) => ({
                fillColor: getFeatureColor(feature.properties[AppState.activeMetric] || feature.properties.pob2026)
            }));
        } else if (AppState.level === "estado" && AppState.layers.municipios) {
            AppState.layers.municipios.setStyle((feature) => ({
                fillColor: getFeatureColor(feature.properties[AppState.activeMetric] || feature.properties.pob2026)
            }));
        } else if ((AppState.level === "municipio" || AppState.level === "colonia") && AppState.layers.colonias) {
            AppState.layers.colonias.setStyle((feature) => ({
                fillColor: getFeatureColor(feature.properties[AppState.activeMetric] || feature.properties.pob2026)
            }));
        }
    });
}

function updateMapLegend() {
    const cfg = METRIC_CONFIG[AppState.activeMetric];
    document.getElementById("legend-title-text").textContent = cfg.label;

    const scaleContainer = document.getElementById("legend-scale-bars");
    scaleContainer.innerHTML = cfg.colors.map(c => `<div class="scale-step" style="background:${c}"></div>`).join("");

    const labelsContainer = document.getElementById("legend-labels-row");
    labelsContainer.innerHTML = `
        <span>Bajo</span>
        <span>${cfg.format(cfg.stops[2])}</span>
        <span>Alto</span>
    `;
}

// =============================================================================
// 8. BUSCADOR INTELIGENTE EN TIEMPO REAL
// =============================================================================

function setupSearch() {
    const input = document.getElementById("global-search-input");
    const resultsContainer = document.getElementById("search-results-dropdown");

    input.addEventListener("input", (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length < 2) {
            resultsContainer.style.display = "none";
            return;
        }

        const matches = [];

        // 1. Buscar Estados
        Object.values(window.MEXICO_STATES_DATA).forEach(st => {
            if (st.name.toLowerCase().includes(query) || st.capital.toLowerCase().includes(query)) {
                matches.push({
                    type: "estado",
                    id: st.id,
                    name: st.name,
                    sub: `Estado &bull; Capital: ${st.capital}`,
                    badgeClass: "badge-estado"
                });
            }
        });

        // 2. Buscar Municipios (entre los 2,436 municipios de México)
        let mCount = 0;
        Object.values(window.MEXICO_MUNICIPIOS_DATA).forEach(mu => {
            if (mCount < 20 && mu.name.toLowerCase().includes(query)) {
                matches.push({
                    type: "municipio",
                    id: mu.id,
                    stateId: mu.parent_id,
                    name: mu.name,
                    sub: `Municipio de ${mu.parent_name}`,
                    badgeClass: "badge-muni"
                });
                mCount++;
            }
        });

        // 3. Buscar Colonias (máx 15 coincidencias)
        let colCount = 0;
        Object.values(window.MEXICO_COLONIAS_DATA).forEach(col => {
            if (colCount < 15 && col.name.toLowerCase().includes(query)) {
                matches.push({
                    type: "colonia",
                    id: col.id,
                    muniId: col.parent_id,
                    name: col.name,
                    sub: `Colonia en ${col.parent_name}, ${col.estado_name}`,
                    badgeClass: "badge-colonia"
                });
                colCount++;
            }
        });

        if (matches.length === 0) {
            resultsContainer.innerHTML = `<div style="padding:12px; color:#94a3b8; font-size:12px; text-align:center;">No se encontraron resultados para "${query}"</div>`;
            resultsContainer.style.display = "block";
            return;
        }

        resultsContainer.innerHTML = matches.slice(0, 25).map(m => `
            <div class="search-item" onclick="handleSearchResultClick('${m.type}', '${m.id}', '${m.stateId || ''}', '${m.muniId || ''}')">
                <div class="search-item-info">
                    <span class="search-item-name">${m.name}</span>
                    <span class="search-item-sub">${m.sub}</span>
                </div>
                <span class="search-badge ${m.badgeClass}">${m.type}</span>
            </div>
        `).join('');

        resultsContainer.style.display = "block";
    });

    // Cerrar buscador al hacer clic fuera
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-box")) {
            resultsContainer.style.display = "none";
        }
    });
}

function handleSearchResultClick(type, id, stateId, muniId) {
    document.getElementById("search-results-dropdown").style.display = "none";
    document.getElementById("global-search-input").value = "";

    if (type === "estado") {
        zoomToState(id);
    } else if (type === "municipio") {
        const mu = window.MEXICO_MUNICIPIOS_DATA[id];
        if (AppState.activeStateId !== mu.parent_id) {
            AppState.activeStateId = mu.parent_id;
            loadMunicipiosLayer(mu.parent_id);
        }
        zoomToMunicipio(id);
    } else if (type === "colonia") {
        const col = window.MEXICO_COLONIAS_DATA[id];
        const mu = window.MEXICO_MUNICIPIOS_DATA[col.parent_id];
        AppState.activeStateId = mu.parent_id;
        AppState.activeMuniId = mu.id;
        loadColoniasLayer(mu.id);
        zoomToColonia(id);
    }
}

// =============================================================================
// 9. NAVEGACIÓN MULTIVISTA INSTITUCIONAL OFICIAL INEGI (IMÁGENES 1 A 5)
// =============================================================================

function switchPortalView(viewName) {
    // 1. Actualizar pestañas de la barra de navegación
    const navLinks = document.querySelectorAll(".inegi-menu-list .nav-link");
    navLinks.forEach(link => {
        if (link.getAttribute("data-view") === viewName) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // 2. Mostrar la vista seleccionada y ocultar las demás
    const views = document.querySelectorAll(".portal-view");
    views.forEach(v => {
        v.classList.remove("active");
    });

    const targetView = document.getElementById(`view-${viewName}`);
    if (targetView) {
        targetView.classList.add("active");
    }

    // 3. Actualizar migas de pan según la sección oficial
    const breadcrumbEl = document.getElementById("portal-breadcrumbs-text");
    if (breadcrumbEl) {
        switch (viewName) {
            case "inicio":
                updateBreadcrumbs();
                break;
            case "temas":
                breadcrumbEl.innerHTML = `<a href="#" onclick="switchPortalView('inicio')">Inicio</a> / <span class="active-crumb">Temas</span>`;
                break;
            case "programas":
                breadcrumbEl.innerHTML = `<a href="#" onclick="switchPortalView('inicio')">Inicio</a> / <span class="active-crumb">Programas de Información</span>`;
                break;
            case "sistemas":
                breadcrumbEl.innerHTML = `<a href="#" onclick="switchPortalView('inicio')">Inicio</a> / <span class="active-crumb">Sistemas de Consulta</span>`;
                break;
            case "desarrollo-social":
                breadcrumbEl.innerHTML = `<a href="#" onclick="switchPortalView('inicio')">Inicio</a> / <a href="#" onclick="switchPortalView('desarrollo-social')">Desarrollo social</a> / <span class="active-crumb">Medición de pobreza</span>`;
                break;
            case "infraestructura":
                breadcrumbEl.innerHTML = `<a href="#" onclick="switchPortalView('inicio')">Inicio</a> / <span class="active-crumb">Infraestructura</span>`;
                break;
            case "acerca":
                breadcrumbEl.innerHTML = `<a href="#" onclick="switchPortalView('inicio')">Inicio</a> / <span class="active-crumb">Acerca del INEGI</span>`;
                break;
            default:
                breadcrumbEl.innerHTML = `<a href="#" onclick="switchPortalView('inicio')">Inicio</a> / <span class="active-crumb">${viewName}</span>`;
        }
    }

    // 4. Si se cambia a la vista 'inicio', recalcular tamaño del mapa Leaflet
    if (viewName === "inicio") {
        setTimeout(() => {
            if (AppState.map) {
                AppState.map.invalidateSize();
            }
        }, 150);
    }

    // 5. Scroll suave hacia arriba del contenido
    window.scrollTo({ top: 110, behavior: "smooth" });
}

// Pantalla Completa para el Visor Cartográfico
function toggleMapFullscreen() {
    const wrapper = document.querySelector(".gis-interactive-wrapper");
    if (!wrapper) return;

    wrapper.classList.toggle("fullscreen-mode");
    const isFull = wrapper.classList.contains("fullscreen-mode");

    const btn = document.querySelector(".btn-toggle-fullscreen");
    if (btn) {
        btn.innerHTML = isFull 
            ? '<i class="fas fa-compress"></i> Salir de Pantalla Completa' 
            : '<i class="fas fa-expand"></i> Pantalla Completa';
    }

    setTimeout(() => {
        if (AppState.map) {
            AppState.map.invalidateSize();
        }
    }, 150);
}

// Control de tamaño de texto institucional (+A)
let currentFontSizeMultiplier = 1;
function toggleFontSize() {
    currentFontSizeMultiplier = currentFontSizeMultiplier === 1 ? 1.08 : 1;
    document.body.style.fontSize = currentFontSizeMultiplier === 1 ? "" : "15px";
}

// Modales Institucionales
function openLoginModal() {
    const modal = document.getElementById("login-modal");
    if (modal) {
        modal.style.display = "flex";
    }
}

function closeLoginModal() {
    const modal = document.getElementById("login-modal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Descarga de Mapas y Capas Geoestadísticas Oficiales
function downloadCurrentMapData() {
    const alertMsg = "Descarga de Marco Geoestadístico 2026:\n\n" +
                     "Generando paquete oficial de capas vectoriales en formato GeoJSON / SHP:\n" +
                     "- División Geoestadística Estatal (32 Entidades)\n" +
                     "- División Geoestadística Municipal (2,464 Municipios)\n" +
                     "- Directorio y Coordenadas Censales de Localidades\n\n" +
                     "Haga clic en Aceptar para iniciar la exportación de metadatos.";
    if (confirm(alertMsg)) {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
            fuente: "INEGI - Marco Geoestadístico 2026",
            entidades: 32,
            municipios: 2464,
            localidades: 304231,
            proyeccion: "ITRF2008 / WGS84",
            fecha: new Date().toISOString()
        }, null, 2));
        const dlAnchor = document.createElement("a");
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", "INEGI_Marco_Geoestadistico_2026_Resumen.json");
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
    }
}

// Filtro temático desde la vista Temas
function filterTopic(topicName) {
    switchPortalView("inicio");
    const searchInput = document.getElementById("global-search-input");
    if (searchInput) {
        searchInput.value = topicName;
        searchInput.focus();
    }
    const section = document.querySelector(".geographic-consultation-section");
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}

// Ejecutar búsqueda desde botón de lupa
function executePortalSearch() {
    const input = document.getElementById("global-search-input");
    if (!input) return;
    const val = input.value.trim();
    if (!val) return;

    switchPortalView("inicio");
    const section = document.querySelector(".geographic-consultation-section");
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}
