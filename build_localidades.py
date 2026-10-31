# -*- coding: utf-8 -*-
"""
Extrae y procesa todas las localidades oficiales de INEGI desde data.csv
y las organiza en data/localidades/{CVE_ENT}{CVE_MUN}.json
"""
import zipfile
import io
import csv
import json
import os
import time

def process():
    start_time = time.time()
    zip_path = 'data/raw_geo/localidades_repo.zip'
    out_dir = 'data/localidades'
    os.makedirs(out_dir, exist_ok=True)
    
    print(f"Abriendo {zip_path}...")
    with zipfile.ZipFile(zip_path, 'r') as z:
        csv_name = None
        for name in z.namelist():
            if name.endswith('data.csv'):
                csv_name = name
                break
        
        if not csv_name:
            print("Error: data.csv no encontrado en el zip")
            return
            
        print(f"Leyendo {csv_name}...")
        with z.open(csv_name) as f:
            reader = csv.DictReader(io.TextIOWrapper(f, encoding='utf-8', errors='replace'))
            
            # Agrupar por clave municipal (CVE_ENT + CVE_MUN, ej. '07106')
            munis = {}
            total_records = 0
            
            for row in reader:
                total_records += 1
                cve_ent = row.get('CVE_ENT', '').strip().zfill(2)
                cve_mun = row.get('CVE_MUN', '').strip().zfill(3)
                cve = f"{cve_ent}{cve_mun}"
                
                nom = row.get('NOM_LOC', '').strip()
                if not nom:
                    continue
                
                try:
                    lat = round(float(row.get('LAT_DEC', 0)), 5)
                    lon = round(float(row.get('LON_DEC', 0)), 5)
                except ValueError:
                    continue
                
                if lat == 0 or lon == 0:
                    continue
                    
                ambito = row.get('AMBITO', 'R').strip()
                cve_loc = row.get('CVE_LOC', '').strip()
                
                if cve not in munis:
                    munis[cve] = []
                    
                munis[cve].append({
                    "id": cve_loc,
                    "n": nom,
                    "t": ambito,
                    "lat": lat,
                    "lon": lon
                })
                
    print(f"Total registros leídos: {total_records}")
    print(f"Municipios agrupados: {len(munis)}")
    
    # Escribir archivos JSON por municipio
    print(f"Escribiendo archivos en {out_dir}...")
    count_written = 0
    for cve, locs in munis.items():
        file_path = os.path.join(out_dir, f"{cve}.json")
        with open(file_path, 'w', encoding='utf-8') as out_f:
            json.dump(locs, out_f, ensure_ascii=False, separators=(',', ':'))
        count_written += 1
        
    elapsed = time.time() - start_time
    print(f"Completado en {elapsed:.2f} s. {count_written} archivos creados.")

if __name__ == '__main__':
    process()
