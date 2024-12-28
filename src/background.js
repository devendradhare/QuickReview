console.log("Background script is running....");

// if (import.meta.hot) {
//   console.log("import.meta.hot", import.meta.hot);
//   import.meta.hot.on("vite:beforeFullReload", () => {
//     chrome.runtime.reload();
//   });
// }

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(
    "message",
    message,
    "sender",
    sender,
    "sendResponse",
    sendResponse
  );

  if (message.action === "reloadExtension") {
    chrome.runtime.reload();
  }
});
