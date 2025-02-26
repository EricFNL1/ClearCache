document.addEventListener('DOMContentLoaded', () => {
  // Botão: limpar só o site atual
  document.getElementById('limparSite').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'clearCacheSite' }, (response) => {
      document.getElementById('status').textContent = response.status;
    });
  });

  // Botão: limpar todo o navegador
  document.getElementById('limparTudo').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'clearCacheAll' }, (response) => {
      document.getElementById('status').textContent = response.status;
    });
  });
});