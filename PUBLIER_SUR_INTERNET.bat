@echo off
title Publication Automatique - GitHub & Vercel
echo ====================================================
echo   Publication de vos modifications vers Vercel
echo ====================================================
echo.
echo 1. Verification des nouveaux fichiers et photos...
git add .

echo.
echo 2. Enregistrement des modifications...
set /p msg="Entrez une description de la mise a jour (ou appuyez sur Entree pour 'Mise a jour portfolio') : "
if "%msg%"=="" set msg=Mise a jour du portfolio et des projets

git commit -m "%msg%"

echo.
echo 3. Envoi vers GitHub et Vercel...
git push origin main

echo.
echo ====================================================
echo   Termine avec succes !
echo   Vercel met a jour votre site en ligne en 20 secondes.
echo ====================================================
pause
