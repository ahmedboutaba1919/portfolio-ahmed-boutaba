@echo off
title Espace Administrateur - Ahmed Boutaba
echo ====================================================
echo   Demarrage de votre Espace Admin Prive...
echo   Code PIN par defaut: 1234
echo   (Ne fermez pas cette fenetre tant que vous editez)
echo ====================================================
cd /d "%~dp0"
start http://localhost:5173/#/admin
node ./node_modules/vite/bin/vite.js --host 0.0.0.0 --port 5173
pause
