const quotes = [
    {
      "quote" : "It is hard to fail, but it is worse never to have tried to succeed",
      "source" : "Theodore Roosevelt"
    },
    {
      "quote" : "It is our choices, that show what we truly are, far more than our abilities",
      "source" : "J. K Rowling"
    },
    {
      "quote" : "Finish each day and be done with it. You have done what you could. Some blunders and absurdities no doubt crept in; forget them as soon as you can. Tomorrow is a new day. You shall begin it serenely and with too high a spirit to be encumbered with your old nonsense",
      "source" : "Ralph Waldo Emerson"
    },
    {
      "quote" : "You're never beaten until you admit it",
      "source" : "General George S Patton"
    },
    {
      "quote" : "No matter how sophisticated the camera, the photographer is still the one that makes the picture",
      "source" : "Doug Bartlow"
    },
    {
      "quote" : "The world will not be destroyed by those who do evil, but by those who watch them without doing anything",
      "source" : "Albert Einstein"
    },
    {
      "quote" : "We are a work in progress with a lifetime contract",
      "source" : "Phyllis Koss"
    }
  ]
  
  function generateQuote() {
    let random = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.innerText = `“${random.quote}.”`;
    quoteAuthor.innerText = random.source;
    rawQuote = random.quote;
    setTweetButton(rawQuote);
  }
  
  //this doesn't really work as you need to reload the twitter button.
  function setTweetButton(){
    //get length of quote
    let quoteLength = rawQuote.length;
    //check quote length and change text based on that
    if (quoteLength > 100) {
      let twitterText = "For some wise words, go to:";
     document.getElementById("tweetBtn").setAttribute("data-text", twitterText);
    }else {
      let twitterText = rawQuote;
     document.getElementById("tweetBtn").setAttribute("data-text", twitterText);
    }
  }
  
  generateQuote();
  
  document.getElementById("regen").addEventListener("click", generateQuote);