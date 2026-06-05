# 🚀 Setup do GitHub - MyMoney

## Passo 1: Criar repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Preencha os dados:
   - **Repository name**: `mymoney`
   - **Description**: `MyMoney - Painel Financeiro`
   - **Public** ✓ (selecionado)
   - **Add .gitignore**: None (já temos)
   - **Add a license**: None (opcional)

3. Clique em **Create repository**

## Passo 2: Adicionar remote e fazer push

Abra PowerShell/Terminal na pasta `C:\Users\veron\OneDrive\Desktop\mymoney` e execute:

```bash
git remote add origin https://github.com/helloveroponce/mymoney.git
git branch -M main
git push -u origin main
```

## Passo 3: Configurar GitHub Pages

1. Vá para: **GitHub Repo → Settings → Pages**
2. Em **Build and deployment**:
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` / `/(root)`
   - Clique em **Save**

3. O GitHub Actions será acionado automaticamente!
   - Acompanhe em: **Actions → Deploy to GitHub Pages**

## Pronto! 🎉

Seu site será publicado em: **https://helloveroponce.github.io/mymoney/**

### O que acontece automaticamente:

- ✅ Quando você faz `git push` para `main`
- ✅ GitHub Actions executa `npm run build`
- ✅ Gera arquivos estáticos em `/out`
- ✅ Deploy automático para GitHub Pages
- ✅ Site ao vivo em segundos!

---

**Próximos Passos:**

1. Teste localmente: `npm run dev`
2. Faça commit de suas mudanças
3. Push para `main`
4. Acompanhe o deploy em **Actions**
5. Visite seu site!

