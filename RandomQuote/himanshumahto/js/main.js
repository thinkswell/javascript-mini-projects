quotesData = [
    {
        quote : `There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.`,
        name : 'Albert Einstein '
    },
    {
        quote : `Good friends, good books, and a sleepy conscience: this is the ideal life.`,
        name : 'Mark Twain'
    },
    {
        quote : `Life is what happens to us while we are making other plans.`,
        name : 'Allen Saunders '
    },
    {
        quote : `It's not the load that breaks you down, it's the way you carry it.`,
        name : 'Lou Holt'
    },
    {
        quote : `Try not to become a man of success. Rather become a man of value.`,
        name : 'Albert Einstein '
    },   
]
/* important variables */ 
let currentQuote = 0;
const quoteText = document.getElementById('quote');
const quotebtn = document.getElementById('q-btn');
const quotespan = document.getElementById('q-span');

/* this the main function its usefulness is show a quote from quotesData evrey time you click on the button*/ 
function showQuote(){
    quoteText.innerText = quotesData[currentQuote].quote;
    quotespan.innerText = quotesData[currentQuote].name; 
    
    currentQuote = (currentQuote + 1 ) % quotesData.length;
};
showQuote()
quotebtn.addEventListener('click' , showQuote)
    