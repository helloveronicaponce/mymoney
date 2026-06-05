# 💰 MyMoney - Painel Financeiro

Plataforma completa de gestão financeira pessoal com integração Supabase, desenvolvida com Next.js, React e Tailwind CSS.

## ✨ Funcionalidades

### 📊 Aba Lançamentos
- Visualização de todas as transações do mês
- Edição inline de data, descrição, valor e status
- Saldos (atual, inicial, projetado)
- Filtro por mês/ano
- Integração automática com cartões e dívidas

### 💳 Aba Cartões
- Visualização de cartões de crédito com cores customizáveis
- Histórico de faturas
- Transações por fatura com categorização
- Gráfico de consumo mensal
- Gastos por categoria

### 📈 Aba Visão Geral
- Resumo financeiro (receitas, despesas, saldo)
- Gerenciamento de dívidas com progresso
- Acompanhamento de investimentos
- Projeção de fluxo de caixa para próximos meses
- Recomendações inteligentes

## 🚀 Começando

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta Supabase

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/mymoney.git
cd mymoney
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Copie `.env.local.example` para `.env.local` e preenchacom suas credenciais:
```bash
cp .env.local.example .env.local
```

Edite `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

4. **Configure o banco de dados**
Execute os scripts SQL no seu projeto Supabase (em `scripts/database-setup.sql`)

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📊 Estrutura do Banco de Dados

### Tabelas principais:
- `transactions` - Lançamentos (receitas/despesas)
- `credit_cards` - Cartões de crédito
- `credit_card_statements` - Faturas de cartão
- `credit_card_transactions` - Transações das faturas
- `debts` - Dívidas e financiamentos
- `debt_payments` - Histórico de pagamentos
- `investments` - Investimentos
- `investment_contributions` - Aportes
- `transaction_categories` - Categorias de gastos

## 🔗 Integrações

### Sincronização Bidirecional
- **Cartões ↔ Lançamentos**: Faturas criam lançamentos automaticamente
- **Dívidas ↔ Lançamentos**: Pagamentos sincronizam em tempo real
- **Investimentos ↔ Lançamentos**: Aportes registrados automaticamente

## 🛠️ Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilos
- **Supabase** - Backend/Database
- **Recharts** - Gráficos
- **@supabase/supabase-js** - Cliente Supabase

## 📦 Build e Deploy

### Fazer build
```bash
npm run build
```

### Deploy no GitHub Pages
```bash
npm run export
# Commit e push a pasta 'out' para gh-pages branch
```

### Configurar GitHub Pages
1. Vá para Settings → Pages
2. Selecione `gh-pages` como branch
3. Salve e aguarde o deploy

## 🔐 Segurança

- Chaves do Supabase são públicas (para uso no frontend)
- Implemente Row Level Security (RLS) no Supabase para dados específicos de usuário
- Adicione autenticação quando necessário

## 📝 Estrutura de Arquivos

```
mymoney/
├── app/
│   ├── page.tsx          # Página principal
│   ├── layout.tsx        # Layout raiz
│   └── globals.css       # Estilos globais
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── TabNavigation.tsx
│   ├── tabs/
│   │   ├── LaunchesTab.tsx
│   │   ├── CardsTab.tsx
│   │   └── OverviewTab.tsx
│   └── common/
│       └── MonthSelector.tsx
├── lib/
│   ├── supabase.ts       # Cliente Supabase
│   └── types.ts          # Tipos TypeScript
├── public/               # Arquivos estáticos
└── package.json
```

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Desenvolvido com ❤️ por

[Seu Nome]

## 📞 Suporte

Abra uma issue no GitHub para reportar bugs ou sugerir features.

---

**Próximas Features:**
- ✅ Autenticação de usuários
- ✅ Sincronização em tempo real
- ✅ Gráficos avançados
- ✅ Importação de CSV/OFX
- ✅ Notificações
