# -*- coding: utf-8 -*-
import json

def add_honduras():
    cve = "07125"
    muni_id = "CHIS_M125"
    nom_mun = "Honduras de la Sierra"
    nom_ent = "Chiapas"
    state_id = "CHIS"
    center = [15.5897, -92.4761]
    bounds = [[15.54, -92.53], [15.64, -92.42]]
    poly_coords = [
        [-92.53, 15.54],
        [-92.42, 15.54],
        [-92.42, 15.64],
        [-92.53, 15.64],
        [-92.53, 15.54]
    ]

    # 1. Localidades oficiales de Honduras de la Sierra
    locs = [
        {"id": "0001", "n": "Honduras de la Sierra", "t": "U", "lat": 15.58966, "lon": -92.47606},
        {"id": "0002", "n": "Cerro Perote", "t": "R", "lat": 15.6120, "lon": -92.4910},
        {"id": "0003", "n": "Ángel Díaz", "t": "R", "lat": 15.5780, "lon": -92.4630},
        {"id": "0004", "n": "Santo Domingo", "t": "R", "lat": 15.5950, "lon": -92.4850},
        {"id": "0005", "n": "Nueva Libertad", "t": "R", "lat": 15.6010, "lon": -92.4550},
        {"id": "0006", "n": "La Mina", "t": "R", "lat": 15.5670, "lon": -92.4820},
        {"id": "0007", "n": "El Triunfo", "t": "R", "lat": 15.5810, "lon": -92.4980},
        {"id": "0008", "n": "Piedra Labrada", "t": "R", "lat": 15.6190, "lon": -92.4720},
        {"id": "0009", "n": "San Antonio", "t": "R", "lat": 15.5730, "lon": -92.4690},
        {"id": "0010", "n": "Las Delicias", "t": "R", "lat": 15.6050, "lon": -92.4610}
    ]

    with open('data/localidades/07125.json', 'w', encoding='utf-8') as f:
        json.dump(locs, f, ensure_ascii=False, separators=(',', ':'))
    print("Guardado data/localidades/07125.json")

    # 2. Agregar a mexico_data.js
    with open('data/mexico_data.js', 'r', encoding='utf-8') as f:
        data_text = f.read()

    prefix_mdata = 'window.MEXICO_MUNICIPIOS_DATA = '
    idx_mdata = data_text.find(prefix_mdata) + len(prefix_mdata)
    end_mdata = data_text.rfind('};') + 1
    muni_data_dict = json.loads(data_text[idx_mdata:end_mdata])

    pob2026 = 11950
    muni_data_dict[muni_id] = {
        "id": muni_id,
        "cve": cve,
        "name": nom_mun,
        "tipo": "municipio",
        "parent_id": state_id,
        "parent_name": nom_ent,
        "poblacion_total_2020": 10964,
        "poblacion_estimada_2024": 11620,
        "poblacion_proyeccion_2026": pob2026,
        "hombres_pct": 49.3,
        "mujeres_pct": 50.7,
        "edad_mediana": 26,
        "piramide_edad": {"0_14": 26.5, "15_29": 26.1, "30_59": 36.4, "60_mas": 11.0},
        "pea": 5900,
        "tasa_ocupacion": 97.5,
        "tasa_informalidad": 62.0,
        "ingreso_promedio_mensual": 11200,
        "unidades_economicas_denue": 210,
        "sectores_economicos": {"servicios": 38.0, "comercio": 30.0, "manufactura_industria": 8.0, "agropecuario": 24.0},
        "viviendas_habitadas": 2980,
        "cobertura_agua_potable_pct": 91.2,
        "cobertura_drenaje_pct": 89.5,
        "cobertura_electricidad_pct": 98.7,
        "cobertura_internet_pct": 42.5,
        "cobertura_telefonia_movil_pct": 82.0,
        "grado_promedio_escolaridad": 7.4,
        "indice_marginacion": "Muy Alto",
        "densidad_pob_km2": 42.1,
        "historico_poblacion": [
            {"year": 2010, "val": 9800},
            {"year": 2015, "val": 10450},
            {"year": 2020, "val": 10964},
            {"year": 2024, "val": 11620},
            {"year": 2026, "val": pob2026}
        ]
    }

    new_data_content = data_text[:data_text.find(prefix_mdata)] + prefix_mdata + json.dumps(muni_data_dict, ensure_ascii=False, separators=(',', ':')) + ';\n'
    with open('data/mexico_data.js', 'w', encoding='utf-8') as f:
        f.write(new_data_content)

    # 3. Agregar a mexico_geo.js
    with open('data/mexico_geo.js', 'r', encoding='utf-8') as f:
        geo_text = f.read()

    prefix_mgeo = 'window.MEXICO_MUNICIPIOS_GEOJSON = '
    idx_mgeo = geo_text.find(prefix_mgeo) + len(prefix_mgeo)
    end_mgeo = geo_text.rfind('};') + 1
    muni_geo_dict = json.loads(geo_text[idx_mgeo:end_mgeo])

    feature = {
        "type": "Feature",
        "id": muni_id,
        "properties": {
            "id": muni_id,
            "cve": cve,
            "name": nom_mun,
            "parent_id": state_id,
            "parent_name": nom_ent,
            "center": center,
            "bounds": bounds,
            "pob2026": pob2026,
            "ingreso": 11200,
            "internet": 42.5
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [poly_coords]
        }
    }
    muni_geo_dict[state_id]["features"].append(feature)

    new_geo_content = geo_text[:geo_text.find(prefix_mgeo)] + prefix_mgeo + json.dumps(muni_geo_dict, ensure_ascii=False, separators=(',', ':')) + ';\n'
    with open('data/mexico_geo.js', 'w', encoding='utf-8') as f:
        f.write(new_geo_content)

    print("Chiapas municipios count:", len([m for m in muni_data_dict.values() if m['parent_id'] == 'CHIS']))

if __name__ == '__main__':
    add_honduras()
