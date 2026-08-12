chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "GET_TEXT") {
    const pageText = document.body.innerText;
    sendResponse({ text: pageText.slice(0, 1500) });
  }
});
