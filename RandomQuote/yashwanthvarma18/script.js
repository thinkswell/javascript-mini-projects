const quoteText = document.getElementById('quoteText');
const generateQuoteButton = document.getElementById('generateQuote');

generateQuoteButton.addEventListener('click', getQuote);

function getQuote() {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://type.fit/api/quotes",
    "method": "GET"
  };

  $.ajax(settings).done(function (response) {
    const data = JSON.parse(response);
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomQuote = data[randomIndex].text;
    quoteText.innerText = `"${randomQuote}"`; // Add double quotation marks around the quote
  });
}
