# 🚀 GitHub Setup - MyMoney

## Passo 1: Criar Repositório (30 segundos)

Acesse: https://github.com/new

Preencha exatamente assim:
- **Repository name**: `mymoney`
- **Description**: `MyMoney - Painel Financeiro`
- **Public** ✓ (marque como público)
- **Uncheck** "Add a README file"
- **Uncheck** "Add .gitignore"
- Click: **Create repository**

---

## Passo 2: Fazer Push (automático)

Abra **PowerShell** na pasta do projeto e execute:

```powershell
cd "C:\Users\veron\OneDrive\Desktop\mymoney"
git remote add origin https://github.com/helloveroponce/mymoney.git
git branch -M main
git push -u origin main
```

Se pedir autenticação, use:
- **Usuário GitHub**: helloveroponce
- **Senha**: Use um Personal Access Token ou faça login no GitHub

---

## Passo 3: Ativar GitHub Pages (1 minuto)

1. Acesse: https://github.com/helloveroponce/mymoney
2. Vá em **Settings** → **Pages**
3. Em "Build and deployment":
   - Source: `Deploy from a branch`
   - Branch: `gh-pages` / `/(root)`
   - Click: **Save**

---

## Pronto! ✅

Seu site estará em: **https://helloveroponce.github.io/mymoney/**

O GitHub Actions fará o deploy automaticamente a cada push!
