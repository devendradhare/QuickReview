console.log("Background script is running.");

if (import.meta.hot) {
  import.meta.hot.on("vite:beforeFullReload", () => {
    chrome.runtime.reload();
  });
}
