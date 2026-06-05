@echo off
REM MyMoney - Push to GitHub Script
echo.
echo ========================================
echo MyMoney - Push to GitHub
echo ========================================
echo.
cd /d "C:\Users\veron\OneDrive\Desktop\mymoney"
echo Current directory: %cd%
echo.

echo Configurando Git remote...
git remote remove origin 2>nul
git remote add origin https://github.com/helloveroponce/mymoney.git

echo Renomeando branch para main...
git branch -M main

echo.
echo Fazendo push para GitHub...
echo Nota: Se pedir autenticacao, use seu Personal Access Token (nao senha)
echo.
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCESSO! Push completo.
    echo ========================================
    echo.
    echo Proximo passo: Ativar GitHub Pages
    echo Acesse: https://github.com/helloveroponce/mymoney/settings/pages
    echo.
    pause
) else (
    echo.
    echo ERRO no push. Verifique:
    echo 1. O repositorio foi criado em GitHub?
    echo 2. Seu usuario e credentials estao corretos?
    echo 3. Voce tem acesso a internet?
    echo.
    pause
)
