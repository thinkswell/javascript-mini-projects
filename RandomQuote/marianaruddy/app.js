const quotes = [
    {
        text: 'Be yourself; everyone else is already taken.',
        author: '― Oscar Wilde',
    },
    {
        text: 'So many books, so little time.',
        author: '― Frank Zappa',
    },
    {
        text: 'Be who you are and say what you feel, because those who mind do not matter, and those who matter do not mind.',
        author: '― Bernard M. Baruch',
    },
    {
        text: 'A room without books is like a body without a soul.',
        author: '― Marcus Tullius Cicero',
    },
    {
        text: 'You only live once, but if you do it right, once is enough.',
        author: '― Mae West',
    },
    {
        text: 'Be the change that you wish to see in the world.',
        author: '― Mahatma Gandhi',
    },
    {
        text: 'In three words I can sum up everything I have learned about life: it goes on.',
        author: '― Robert Frost',
    },
    {
        text: 'If you want to know what a man is like, take a good look at how he treats his inferiors, not his equals.',
        author: '― J.K. Rowling, Harry Potter and the Goblet of Fire',
    },
    {
        text: 'No one can make you feel inferior without your consent.',
        author: '― Eleanor Roosevelt, This is My Story',
    },
];

document.getElementById("quote").innerHTML = quotes[0].text;
document.getElementById("author").innerHTML = quotes[0].author;

function generateQuote() {
    
    const randomPosition = Math.floor(Math.random() * Math.floor(quotes.length));

    document.getElementById("quote").innerHTML = quotes[randomPosition].text;
    document.getElementById("author").innerHTML = quotes[randomPosition].author;
}
