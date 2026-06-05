# MyMoney - GitHub Setup Automatizado
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "MyMoney - GitHub Deploy Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Abrir navegador para criar repositório
Write-Host "PASSO 1: Abrindo GitHub para criar repositorio..." -ForegroundColor Yellow
Start-Process "https://github.com/new"
Write-Host ""
Write-Host "Uma janela do navegador foi aberta." -ForegroundColor Cyan
Write-Host "Preencha com os seguintes dados:" -ForegroundColor White
Write-Host "  - Repository name: mymoney" -ForegroundColor White
Write-Host "  - Description: MyMoney - Painel Financeiro" -ForegroundColor White
Write-Host "  - Public: SIM (marque o checkbox)" -ForegroundColor White
Write-Host "  - Add .gitignore: NO" -ForegroundColor White
Write-Host "  - Add a license: NO" -ForegroundColor White
Write-Host ""
Write-Host "Depois clique em 'Create repository'" -ForegroundColor Green
Write-Host ""
Write-Host "Pressione ENTER quando o repositorio tiver sido criado..." -ForegroundColor Yellow
$null = Read-Host

# Step 2: Configurar e fazer push
Write-Host ""
Write-Host "PASSO 2: Fazendo push do codigo..." -ForegroundColor Yellow
cd "C:\Users\veron\OneDrive\Desktop\mymoney"

git remote remove origin 2>$null
git remote add origin "https://github.com/helloveroponce/mymoney.git"
git branch -M main
Write-Host "Fazendo push..." -ForegroundColor Cyan
git push -u origin main

if ($?) {
    Write-Host ""
    Write-Host "✓ Push concluido com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "PASSO 3: Ativar GitHub Pages..." -ForegroundColor Yellow
    Start-Process "https://github.com/helloveroponce/mymoney/settings/pages"
    Write-Host ""
    Write-Host "Na pagina que se abriu:" -ForegroundColor White
    Write-Host "  1. Em 'Source': Selecione 'Deploy from a branch'" -ForegroundColor White
    Write-Host "  2. Branch: Selecione 'gh-pages'" -ForegroundColor White
    Write-Host "  3. Clique em 'Save'" -ForegroundColor White
    Write-Host ""
    Write-Host "Pressione ENTER quando tiver feito..." -ForegroundColor Yellow
    $null = Read-Host

    Write-Host ""
    Write-Host "======================================" -ForegroundColor Green
    Write-Host "✓ SETUP COMPLETO!" -ForegroundColor Green
    Write-Host "======================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Seu site estara em:" -ForegroundColor Cyan
    Write-Host "https://helloveroponce.github.io/mymoney/" -ForegroundColor Green
    Write-Host ""
    Write-Host "O GitHub Actions fara o deploy automaticamente!" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "! Erro no push. Verifique e tente novamente." -ForegroundColor Red
}

Write-Host ""
Read-Host "Pressione ENTER para fechar"
