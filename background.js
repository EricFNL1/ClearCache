chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Opção 1: Limpar apenas o site atual
  if (request.action === 'clearCacheSite') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        const url = new URL(tabs[0].url);

        chrome.browsingData.remove(
          {
            // 'since: 0' => limpa desde sempre
            // 'origins' => limpa só o domínio atual
            origins: [url.origin],
            since: 0
          },
          {
            cache: true,
            cookies: true,
            localStorage: true,
            indexedDB: true
          },
          () => {
            // Recarrega a aba ignorando o cache
            chrome.tabs.reload(tabs[0].id, { bypassCache: true });
            sendResponse({
              status: `Cache e dados removidos de ${url.origin}. Página recarregada!`
            });
          }
        );
      } else {
        sendResponse({ status: 'Nenhuma aba ativa encontrada.' });
      }
    });
    return true; // Mantém o service worker ativo até enviar a resposta

  // Opção 2: Limpar todo o navegador
  } else if (request.action === 'clearCacheAll') {
    chrome.browsingData.remove(
      {
        // since: 0 => limpa todo o histórico, desde o começo
        since: 0
      },
      {
        cache: true,
        cookies: true,
        localStorage: true,
        indexedDB: true
      },
      () => {
        // Se quiser recarregar a aba atual mesmo assim, pode fazer:
        if (sender.tab && sender.tab.id) {
          chrome.tabs.reload(sender.tab.id, { bypassCache: true });
        }

        sendResponse({
          status: 'Cache e dados de todos os sites foram removidos!'
        });
      }
    );
    return true;
  }
});
