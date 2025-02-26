chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "clearCache") {
    // Verifica qual aba está ativa
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        // Extrai a origem (domínio) da URL
        const url = new URL(tabs[0].url);
        
        chrome.browsingData.remove(
          {
            // 'since: 0' limpa desde o começo
            // 'origins' limpa apenas o site atual
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
            // Depois de limpar, recarrega a aba ignorando o cache
            chrome.tabs.reload(tabs[0].id, { bypassCache: true });
            sendResponse({
              status: `Cache e dados removidos de ${url.origin}. Página recarregada!`
            });
          }
        );
      }
    });
    
    // Importante para indicar que a resposta será enviada de forma assíncrona
    return true;
  }
});
