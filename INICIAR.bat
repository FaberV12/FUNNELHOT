@echo off
echo ========================================
echo   FUNNELHOT - Gestión de Asistentes IA
echo ========================================
echo.
echo Iniciando servidor...
echo.

REM Verificar si node_modules existe
if not exist "node_modules" (
    echo Instalando dependencias por primera vez...
    echo Esto puede tardar unos minutos...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo ERROR: No se pudieron instalar las dependencias.
        echo Por favor, verifica que tengas Node.js instalado.
        pause
        exit /b 1
    )
    echo.
    echo Dependencias instaladas correctamente.
    echo.
)

REM Iniciar el servidor
echo Abriendo en el navegador...
timeout /t 2 /nobreak >nul
start http://localhost:3000

echo.
echo Servidor iniciado en http://localhost:3000
echo.
echo Presiona Ctrl+C para detener el servidor.
echo.

call npm run dev

pause

