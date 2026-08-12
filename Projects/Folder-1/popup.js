const readBtn = document.getElementById("readBtn");
const output = document.getElementById("output");

readBtn.addEventListener("click", () => {
  output.textContent = "Reading page...";

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "GET_TEXT" },
      (response) => {
        if (response && response.text) {
          output.textContent = response.text;
        } else {
          output.textContent = "Could not read page text.";
        }
      }
    );
  });
});
