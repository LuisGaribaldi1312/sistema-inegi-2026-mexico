@echo off
title Sistema Geografico INEGI 2026
echo ================================================================
echo   INICIANDO PLATAFORMA GEOGRAFICA Y ESTADISTICA INEGI 2026
echo ================================================================
echo.
echo Credenciales de Acceso:
echo   Usuario:    admin.inegi@mexico.gob.mx
echo   Contrasena: Inegi2026*GeoData
echo.
echo Abriendo servidor multi-hilo y cargando el mapa de Google Maps...
python server.py
pause
