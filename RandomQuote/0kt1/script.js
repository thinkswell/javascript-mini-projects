const quoteText = document.getElementById('quote-text');
const author = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const themeSelect = document.getElementById('theme-select');

let quoteChangeInterval;


async function getRandomQuote(theme) {
    try {
        const response = await fetch(`https://api.quotable.io/random?theme=${theme}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching quote:', error);
        return null;
    }
}


function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


async function displayNewQuote() {
    const selectedTheme = themeSelect.value;
    const newQuote = await getRandomQuote(selectedTheme);
    if (newQuote) {
        quoteText.textContent = newQuote.content;
        author.textContent = `- ${newQuote.author}`;
        document.body.style.backgroundColor = getRandomColor(); 
    }
}



function startAutoChangeInterval() {
    quoteChangeInterval = setInterval(displayNewQuote, 300000); 
}


function resetAutoChangeInterval() {
    clearInterval(quoteChangeInterval);
    startAutoChangeInterval();
}


newQuoteBtn.addEventListener('click', () => {
    displayNewQuote();
    resetAutoChangeInterval(); 
});


displayNewQuote();
startAutoChangeInterval(); 


themeSelect.addEventListener('change', () => {
    displayNewQuote();
    resetAutoChangeInterval();
});


document.addEventListener('keydown', resetAutoChangeInterval);


startAutoChangeInterval();
