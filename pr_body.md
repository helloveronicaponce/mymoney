## Summary

This PR completes the MyMoney financial dashboard integration with Supabase:

- **Integrated Edge Function** for fetching all financial data (transactions, credit cards, debts, investments)
- **Fixed dynamic imports** that were preventing data loading in production
- **Migrated real data** from nosso_lar and amanda_contas tables
- **Added visual testing** with Puppeteer to verify data rendering

## What Changed

1. **Edge Function Integration** (lib/supabase.ts)
   - Created fetchDataFromEdgeFunction() to call the Supabase Edge Function
   - All three tabs now fetch data from a single source

2. **Fixed Import Issues** (all tabs)
   - Changed from dynamic await import() to static imports
   - Ensures Edge Function is properly accessible in client components

3. **Data Migration**
   - 10 transactions (4 school fees, 6 household/health expenses)
   - 2 credit cards (Inter Empresas, Banco Pan)
   - 1 debt (Empréstimo Pessoal)
   - 2 investments (Fundo de Renda Fixa, Ações)

4. **Added Diagnostics**
   - Puppeteer-based visual testing to verify data rendering
   - Automated checks for transaction, credit card, debt, and investment visibility

## Test Plan

- Edge Function returns all data correctly (verified via curl)
- CORS is properly enabled (verified headers)
- Components import the fetch function statically
- Data loads and renders visually (visual testing in progress)

Generated with Claude Code
