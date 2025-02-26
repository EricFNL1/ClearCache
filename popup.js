document.addEventListener("DOMContentLoaded", () => {
  const limparBtn = document.getElementById("limparCache");
  
  limparBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "clearCache" }, (response) => {
      document.getElementById("status").textContent = response.status;
    });
  });
});
