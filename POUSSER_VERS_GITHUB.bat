@echo off
title Envoi vers GitHub - Ahmed Boutaba
echo ====================================================
echo   Envoi de vos fichiers vers GitHub...
echo ====================================================
echo.
cd /d "%~dp0"
git push -u origin main
echo.
if %errorlevel% neq 0 (
    echo.
    echo ----------------------------------------------------
    echo Si une fenetre s'est ouverte pour vous connecter :
    echo Cliquez sur "Sign in with your browser" pour valider.
    echo ----------------------------------------------------
) else (
    echo.
    echo ====================================================
    echo   BRAVO ! Vos fichiers sont maintenant sur GitHub.
    echo   Vercel est en train de deployer votre site !
    echo ====================================================
)
pause
