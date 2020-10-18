function generateQuote() {
    const quotes = [
        'Be yourself; everyone else is already taken. ― Oscar Wilde',
        'So many books, so little time. ― Frank Zappa',
        'Be who you are and say what you feel, because those who mind do not matter, and those who matter do not mind. ― Bernard M. Baruch',
        'A room without books is like a body without a soul. ― Marcus Tullius Cicero',
        'You only live once, but if you do it right, once is enough. ― Mae West',
        'Be the change that you wish to see in the world. ― Mahatma Gandhi',
        'In three words I can sum up everything I have learned about life: it goes on. ― Robert Frost',
        'If you want to know what a man is like, take a good look at how he treats his inferiors, not his equals. ― J.K. Rowling, Harry Potter and the Goblet of Fire',
        'No one can make you feel inferior without your consent. ― Eleanor Roosevelt, This is My Story',
    ];
    
    const randomPosition = Math.floor(Math.random() * Math.floor(quotes.length));

    document.getElementById("quote").innerHTML = quotes[randomPosition];
}
