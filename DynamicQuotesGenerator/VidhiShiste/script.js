const quotes = [
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
    "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success. - James Cameron",
    "Life is what happens when you're busy making other plans. - John Lennon",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
];

const quoteText = document.getElementById("quote-text");
const generateBtn = document.getElementById("generate-btn");
const twitterBtn = document.getElementById("twitter-btn");

generateBtn.addEventListener("click", generateQuote);

function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteText.textContent = randomQuote;
    
    // Encode the quote for the Twitter share button
    const encodedQuote = encodeURIComponent(randomQuote);
    twitterBtn.href = `https://twitter.com/intent/tweet?text=${encodedQuote}`;
    twitterBtn.style.display = "inline-block";
}

// Initial quote generation
generateQuote();
