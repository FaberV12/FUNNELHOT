@echo off
echo Deteniendo servidor de FUNNELHOT...
taskkill /F /IM node.exe /FI "WINDOWTITLE eq npm*" 2>nul
taskkill /F /IM node.exe 2>nul
echo Servidor detenido.
timeout /t 2 /nobreak >nul

