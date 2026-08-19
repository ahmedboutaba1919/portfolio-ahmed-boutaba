@echo off
title Envoi Complet vers GitHub - Ahmed Boutaba
echo ====================================================
echo   Envoi de l'integralite du code et dossiers vers GitHub...
echo ====================================================
echo.
cd /d "%~dp0"
git add .
git commit -m "Correction et upload complet du code source et images"
git push -f -u origin main

echo.
if %errorlevel% neq 0 (
    echo.
    echo ----------------------------------------------------
    echo Note : Si GitHub vous demande de vous identifier :
    echo Cliquez sur "Sign in with your browser" pour valider.
    echo ----------------------------------------------------
) else (
    echo.
    echo ====================================================
    echo   SUCCES TOTAL ! Tout votre code est sur GitHub.
    echo   Vercel recompile et met votre site en ligne !
    echo ====================================================
)
pause
