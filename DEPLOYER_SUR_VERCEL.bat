@echo off
title Deploiement Vercel - Ahmed Boutaba
echo ====================================================
echo   Deploiement de votre Portfolio sur Vercel (Gratuit)
echo ====================================================
echo.
echo 1. Compilation des derniers fichiers de production...
call node ./node_modules/vite/bin/vite.js build

echo.
echo 2. Lancement du deploiement en ligne...
echo (Si c'est votre premiere fois, Vercel ouvrira votre navigateur pour vous connecter)
echo.
cd /d "%~dp0"
call npx vercel --prod

echo.
echo ====================================================
echo   Deploiement termine ! Votre site est en ligne.
echo ====================================================
pause
