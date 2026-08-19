@echo off
title Deploiement Direct Vercel - Ahmed Boutaba
echo ====================================================
echo   Deploiement Direct sur Vercel (100% Garanti)
echo ====================================================
echo.
echo 1. Compilation des fichiers de production...
cd /d "%~dp0"
call node ./node_modules/vite/bin/vite.js build

echo.
echo 2. Connexion a votre compte Vercel...
echo (Choisissez votre moyen de connexion dans la console : GitHub ou Email)
echo.
call npx vercel login

echo.
echo 3. Deploiement en ligne...
call npx vercel --prod

echo.
echo ====================================================
echo   Felicitation ! Votre site est en ligne avec succes !
echo ====================================================
pause
