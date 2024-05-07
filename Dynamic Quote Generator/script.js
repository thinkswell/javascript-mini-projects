const api_url = "https://api.quotable.io/random";
const quoteRandom = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const getQuote = async (url) => {
    const response = await fetch(url);
    var quote = await response.json();
    quoteRandom.innerHTML = quote.content;
    quoteAuthor.innerHTML = quote.author;

}

getQuote(api_url);

const newQ = document.getElementById('btn1');
newQ.addEventListener('click', () => {
    location.reload();
})
