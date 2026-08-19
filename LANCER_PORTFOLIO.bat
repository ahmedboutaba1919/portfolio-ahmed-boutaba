@echo off
title Portfolio Ahmed Boutaba - Serveur Actif
echo ====================================================
echo   Demarrage du Portfolio Ahmed Boutaba...
echo   Serveur: http://localhost:5173
echo   (Ne fermez pas cette fenetre tant que vous naviguez)
echo ====================================================
cd /d "%~dp0"
start http://localhost:5173
node ./node_modules/vite/bin/vite.js --host 0.0.0.0 --port 5173
pause
