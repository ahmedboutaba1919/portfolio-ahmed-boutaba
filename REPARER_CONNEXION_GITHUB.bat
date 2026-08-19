@echo off
title Reparation Connexion GitHub - Ahmed Boutaba
echo ====================================================
echo   Suppression automatique de l'ancien compte fakhri126
echo   et Envoi vers ahmedboutaba1919...
echo ====================================================
echo.
cmdkey /delete:git:https://github.com 2>nul
cd /d "%~dp0"
git config --global credential.helper manager
git config user.name "ahmedboutaba1919"
git config user.email "ahmedboutaba7171@gmail.com"
git remote set-url origin https://github.com/ahmedboutaba1919/portfolio-ahmed-boutaba.git

echo.
echo Envoi des fichiers corriges (sans page noire)...
git add .
git commit -m "Correction totale de la page noire et PortfolioProvider"
git push -f -u origin main

echo.
if %errorlevel% neq 0 (
    echo.
    echo ----------------------------------------------------
    echo Si une fenetre s'ouvre :
    echo Cliquez sur "Sign in with your browser" pour valider.
    echo ----------------------------------------------------
) else (
    echo.
    echo ====================================================
    echo   BRAVO ! Tout est envoye avec succes sur GitHub !
    echo   Vercel est en train de mettre votre site a jour.
    echo ====================================================
)
pause
