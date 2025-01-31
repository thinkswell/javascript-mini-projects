chrome.commands.onCommand.addListener(function (command) {
    if (command === "openPopup") {
      const popupURL = chrome.extension.getURL('popup.html');
      chrome.windows.create({
        url: popupURL,
        type: 'popup', // This should open it as a browser popup
        width: 500,
        height: 180,
      });
    }
  });