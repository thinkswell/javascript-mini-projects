const quoteElement = document.getElementById("quote");
const newQuoteButton = document.getElementById("new-quote");

async function getQuote() {
    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        quoteElement.textContent = data.content;
    } catch (error) {
        console.error("Error fetching quote:", error);
    }
}

newQuoteButton.addEventListener("click", getQuote);

// Initial quote load
getQuote();
