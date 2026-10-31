# -*- coding: utf-8 -*-
import http.server
import socketserver
import webbrowser
import os
import sys

DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class DualStackServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def run_server():
    ports = [8000, 8080, 8888, 5000]
    httpd = None
    selected_port = None

    for port in ports:
        try:
            httpd = DualStackServer(("", port), Handler)
            selected_port = port
            break
        except Exception as e:
            print(f"Puerto {port} no disponible, intentando siguiente...")

    if not httpd:
        print("Error: No se pudo enlazar ningún puerto.")
        sys.exit(1)

    url = f"http://localhost:{selected_port}/index.html"
    print("=" * 66)
    print(f"  SISTEMA GEOGRÁFICO Y ESTADÍSTICO NACIONAL | INEGI 2026")
    print(f"  Servidor ACTIVO en: {url}")
    print(f"  Usuario:    admin.inegi@mexico.gob.mx")
    print(f"  Contraseña: Inegi2026*GeoData")
    print("=" * 66)

    try:
        webbrowser.open(url)
    except Exception:
        pass

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido por el usuario.")

if __name__ == "__main__":
    run_server()
