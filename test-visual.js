const puppeteer = require('puppeteer');

(async () => {
  let browser;
  try {
    console.log('\n🌐 Abrindo navegador headless...\n');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    console.log('📄 Carregando página MyMoney...');
    await page.goto('https://helloveronicaponce.github.io/mymoney/', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    console.log('⏳ Testando Edge Function no navegador...');

    // Teste direto da Edge Function
    const testResult = await page.evaluate(async () => {
      try {
        const response = await fetch('https://qwlegnebejakwwuntyrd.supabase.co/functions/v1/mymoney', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3bGVnbmViZWpha3d3dW50eXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2OTUxODYsImV4cCI6MjA5MTI3MTE4Nn0.lkYjF5xXwS_XW8Wi-p0YBBOxY7Bjs_HDw7PIWDTcPYQ',
          }
        });

        if (!response.ok) {
          return { error: `HTTP ${response.status}`, ok: false };
        }

        const data = await response.json();
        return {
          ok: true,
          transactions: data.transactions?.length || 0,
          cards: data.creditCards?.length || 0
        };
      } catch (e) {
        return { error: e.message, ok: false };
      }
    });

    console.log('Edge Function Test:', testResult);
    console.log('');

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Verificar erros no console
    const logs = [];
    page.on('console', msg => {
      logs.push(`[${msg.type().toUpperCase()}] ${msg.text()}`);
    });

    page.on('error', err => {
      console.error('Page error:', err);
    });

    // Verificar DOM
    // Tentar detectar erros
    const errors = [];
    page.on('error', err => errors.push(err.message));

    const pageContent = await page.evaluate(() => {
      return {
        htmlLength: document.documentElement.outerHTML.length,
        hasEscola: document.body.innerText.includes('Escola'),
        hasInter: document.body.innerText.includes('Inter Empresas'),
        hasEmprestimo: document.body.innerText.includes('Empréstimo'),
        hasFundo: document.body.innerText.includes('Fundo'),
        hasNenhum: document.body.innerText.includes('Nenhum lançamento'),
        bodyText: document.body.innerText.substring(0, 500),
        // Tentar pegar window.lastError se existir
        windowErrors: typeof window.lastError !== 'undefined' ? window.lastError : null
      };
    });

    if (pageContent.hasNenhum) {
      console.log('\n⚠️  PROBLEMA: A página está mostrando "Nenhum lançamento encontrado"');
      console.log('Isso significa que os dados NÃO foram carregados da Edge Function');
    }

    console.log('\n✅ RESULTADOS DA RENDERIZAÇÃO:\n');
    console.log('Status de Visibilidade:');
    console.log(`  ✅ Transações (Escola): ${pageContent.hasEscola ? 'VISÍVEL' : 'NÃO VISÍVEL'}`);
    console.log(`  ✅ Cartões (Inter): ${pageContent.hasInter ? 'VISÍVEL' : 'NÃO VISÍVEL'}`);
    console.log(`  ✅ Dívidas (Empréstimo): ${pageContent.hasEmprestimo ? 'VISÍVEL' : 'NÃO VISÍVEL'}`);
    console.log(`  ✅ Investimentos (Fundo): ${pageContent.hasFundo ? 'VISÍVEL' : 'NÃO VISÍVEL'}`);
    console.log(`\nTamanho HTML: ${pageContent.htmlLength} bytes`);
    console.log('\nPrimeiras 500 caracteres da página:');
    console.log('─'.repeat(50));
    console.log(pageContent.bodyText);
    console.log('─'.repeat(50));

    const allVisible = pageContent.hasEscola && pageContent.hasInter && pageContent.hasEmprestimo && pageContent.hasFundo;

    console.log(`\n${allVisible ? '🎉 SUCESSO: TODOS OS DADOS ESTÃO VISÍVEIS NO SITE!' : '⚠️  ALGUNS DADOS NÃO ESTÃO RENDERIZADOS'}\n`);

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    if (browser) await browser.close();
    process.exit(0);
  }
})();
