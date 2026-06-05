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

    // Capturar erros de página
    page.on('error', err => console.error('Page error:', err));
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('[PAGE ERROR]', msg.text());
      }
    });

    await page.goto('https://helloveronicaponce.github.io/mymoney/', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    console.log('⏳ Testando Edge Function no navegador...');

    // Teste direto da Edge Function (agora pública, sem autenticação necessária)
    const testResult = await page.evaluate(async () => {
      try {
        console.log('Starting fetch to mymoney Edge Function...');
        const response = await fetch('https://qwlegnebejakwwuntyrd.supabase.co/functions/v1/mymoney', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        console.log('Response received:', response.status, response.statusText);

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
        console.error('Fetch error:', e.message, e.stack);
        return { error: e.message, ok: false };
      }
    });

    console.log('Edge Function Test:', testResult);
    console.log('');

    // Esperar a página carregar completamente
    await new Promise(resolve => setTimeout(resolve, 5000));

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

    // Check Lançamentos tab content first
    let pageContent = await page.evaluate(() => {
      return {
        htmlLength: document.documentElement.outerHTML.length,
        hasEscola: document.body.innerText.includes('Escola'),
        hasInter: document.body.innerText.includes('Inter Empresas'),
        hasEmprestimo: document.body.innerText.includes('Empréstimo'),
        hasFundo: document.body.innerText.includes('Fundo'),
        bodyText: document.body.innerText.substring(0, 500),
      };
    });

    // Try to click on Cartões tab (💳)
    const tabButtons = await page.$$('button');
    if (tabButtons.length > 1) {
      await tabButtons[1].click();
      await new Promise(resolve => setTimeout(resolve, 1000));
      const cardsContent = await page.evaluate(() => document.body.innerText);
      if (cardsContent.includes('Inter Empresas') || cardsContent.includes('Banco Pan')) {
        pageContent.hasInter = true;
      }
    }

    // Try to click on Visão Geral tab (📈)
    if (tabButtons.length > 2) {
      await tabButtons[2].click();
      await new Promise(resolve => setTimeout(resolve, 1000));
      const overviewContent = await page.evaluate(() => document.body.innerText);
      if (overviewContent.includes('Empréstimo')) {
        pageContent.hasEmprestimo = true;
      }
      if (overviewContent.includes('Fundo')) {
        pageContent.hasFundo = true;
      }
    }

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
