# SISTEMA GEOGRÁFICO Y ESTADÍSTICO NACIONAL | INEGI 2026

Plataforma interactiva cartográfica y estadística de alta precisión para la República Mexicana, diseñada con capacidades multinivel de perforación territorial (**República > 32 Estados > Municipios > Colonias/Barrios/Delegaciones**), transiciones cinemáticas de zoom controlado, dashboards dinámicos con indicadores del INEGI proyectados al año **2026**, y control de acceso seguro mediante autenticación.

---

## 🔑 CREDENCIALES DE ACCESO

Para ingresar a la plataforma, utilice las siguientes credenciales autorizadas:

- **Usuario Oficial:** `admin.inegi@mexico.gob.mx`  *(o también el alias: `admin_inegi`)*
- **Contraseña:** `Inegi2026*GeoData`

---

## 🚀 CÓMO EJECUTAR EL SISTEMA

Dispone de dos formas sencillas e inmediatas para abrir la plataforma en su equipo Windows:

### Opción 1 (Recomendada - Con servidor local automático)
1. Haga doble clic en el archivo **`iniciar_sistema.bat`**.
2. Se abrirá automáticamente su navegador predeterminado (Google Chrome, Edge, etc.) en `http://localhost:8000/index.html`.

### Opción 2 (Apertura directa sin servidor)
1. Haga doble clic en el archivo **`index.html`** y se abrirá directamente en su navegador web.

---

## 🗺️ ESTRUCTURA Y NIVELES JERÁRQUICOS

1. **Nivel 0: República Mexicana (32 Estados)**
   - Mapa completo de la República Mexicana con sus 32 Entidades Federativas seccionadas.
   - Vista general del país (132.4 millones de habitantes al 2026, PIB, DENUE, cobertura digital).
   - Colores coropléticos dinámicos según la métrica seleccionada.

2. **Nivel 1: Nivel Estatal**
   - Al dar clic en cualquier Estado, la cámara realiza un **acercamiento controlado y fluido (`flyTo`)**.
   - Se dibuja la división seccionada de los **Municipios** que integran ese Estado.
   - El panel lateral derecho despliega el **Dashboard del Estado** con indicadores específicos (Población 2026, PEA, ingreso promedio mensual, actividad económica DENUE, pirámide de edad, servicios en viviendas y lista interactiva de municipios).

3. **Nivel 2: Nivel Municipal**
   - Al dar clic en cualquier Municipio, el mapa se acerca con una **transición suave de zoom** hacia el municipio seleccionado.
   - Se visualizan y seccionan las **Colonias, Barrios o Delegaciones** de dicho municipio.
   - Se abre el **Dashboard del Municipio** con estadísticas urbanas locales.

4. **Nivel 3: Nivel Colonia, Barrio o Delegación**
   - Al dar clic en una colonia, el mapa realiza un acercamiento de alta resolución resaltando su polígono con borde radiante.
   - Se carga el **Dashboard de la Colonia** con microdatos de población, ingreso de estrato, comercios locales DENUE y equipamiento urbano.

5. **Navegación y Retorno (Breadcrumbs)**
   - En la barra superior dispone de la ruta interactiva: `[México] > [Estado] > [Municipio] > [Colonia]`.
   - Puede hacer clic en cualquier nivel de la ruta o en el botón **"Vista Nacional"** para alejarse suavemente con una transición controlada.

---

## 📊 INDICADORES INEGI INTEGRADOS (2020 - 2026)

- **Demografía:** Censo de Población y Vivienda 2020 y proyecciones CONAPO/INEGI a 2024 y 2026. Distribución de hombres y mujeres, edad mediana y grupos etarios (0-14, 15-29, 30-59, 60+).
- **Economía y Empleo:** Población Económicamente Activa (PEA), Tasa de Ocupación, Ingreso promedio mensual por hogar (ENIGH), Unidades Económicas registradas en el Directorio DENUE.
- **Vivienda y Servicios Básicos:** Total de viviendas particulares habitadas, cobertura de agua entubada, drenaje, energía eléctrica.
- **Conectividad Digital:** Cobertura de Internet, tenencia de telefonía móvil inteligente y computadoras.
- **Educación y Salud:** Grado promedio de escolaridad en años, analfabetismo y afiliación a servicios de salud (IMSS, ISSSTE, IMSS-Bienestar, sector privado).
- **Índice de Marginación:** Grado de marginación territorial y densidad poblacional (hab/km²).

---

## 🔍 HERRAMIENTAS ADICIONALES

- **Buscador predictivo en tiempo real:** Escriba cualquier nombre (ej. *Guadalajara, Monterrey, Benito Juárez, Polanco, Cuauhtémoc, Puebla*) y el sistema lo llevará directamente volando con zoom al elemento correspondiente.
- **Selector de métrica de calor:** Cambie entre Población 2026, Ingreso Promedio, Cobertura de Internet o Escolaridad para recalcular en vivo los colores de todos los polígonos y la escala de la leyenda.
