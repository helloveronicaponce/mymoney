# 🚀 Guia de Deploy - MyMoney

## ⚠️ Importante
O repositório precisa ser criado manualmente no GitHub uma única vez.

---

## PASSO 1: Criar Repositório no GitHub (2 minutos)

1. Acesse: **https://github.com/new**

2. Preencha com:
   - **Repository name**: `mymoney` (exatamente assim)
   - **Description**: `MyMoney - Painel Financeiro`
   - **Public** ✓ (marque)
   - **Add a README file**: ☐ (desmarque)
   - **Add .gitignore**: ☐ (desmarque)
   - **Add a license**: ☐ (desmarque)

3. Clique: **Create repository**

---

## PASSO 2: Fazer Push do Código (5 minutos)

Abra **PowerShell** e execute:

```powershell
cd "C:\Users\veron\OneDrive\Desktop\mymoney"
git remote add origin https://github.com/helloveroponce/mymoney.git
git branch -M main
git push -u origin main
```

Se pedir autenticação:
- **Login**: helloveroponce
- **Senha**: Use seu token pessoal do GitHub (não senha normal)
  - Para criar um token: https://github.com/settings/tokens (scope: repo)

**Resultado esperado:**
```
Enumerating objects: 35, done.
...
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## PASSO 3: Ativar GitHub Pages (1 minuto)

1. Acesse: **https://github.com/helloveroponce/mymoney/settings/pages**

2. Em **"Build and deployment"**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `gh-pages` / `/(root)`

3. Clique: **Save**

---

## PRONTO! ✅

Seu site estará em: **https://helloveroponce.github.io/mymoney/**

### Automação Futura
Toda vez que você fizer:
```powershell
git push origin main
```

O GitHub Actions fará o deploy automaticamente em segundos!

---

## Troubleshooting

**Erro: "Repository not found"**
- Verifique se o repositório foi criado em https://github.com/helloveroponce/mymoney
- Verifique se está logado com a conta correta

**Erro: "Authentication failed"**
- Use um Personal Access Token (PAT), não senha
- Crie em: https://github.com/settings/tokens
- Scope necessário: `repo`

**GitHub Pages não aparece**
- Verifique se o repositório é público
- Aguarde 1-2 minutos após o primeiro push
- Verifique a aba "Actions" para erros no build
