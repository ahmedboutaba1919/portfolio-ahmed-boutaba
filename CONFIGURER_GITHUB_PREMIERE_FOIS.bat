@echo off
title Configuration Initiale GitHub - Ahmed Boutaba
echo ====================================================
echo   Configuration Initiale de votre Depot GitHub
echo ====================================================
echo.
echo Entrez l'URL de votre depot GitHub que vous venez de creer
echo Exemple : https://github.com/votre-nom/portfolio-boutaba.git
echo.
set /p giturl="Collez l'URL GitHub ici : "

if "%giturl%"=="" (
    echo Erreur : Vous n'avez pas colle d'URL GitHub.
    pause
    exit /b
)

git init
git branch -M main
git remote remove origin 2>nul
git remote add origin %giturl%
git add .
git commit -m "Premier deploiement Portfolio Ahmed Boutaba"
git push -u origin main

echo.
echo ====================================================
echo   Votre code est maintenant sur GitHub !
echo   Connectez simplement ce depot sur Vercel.com.
echo ====================================================
pause
