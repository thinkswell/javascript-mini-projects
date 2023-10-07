let quoteBody = document.getElementById("quote-body");
let generate = document.getElementById("btn");

let quotes = [
  {
    quote: "Be yourself; everyone else is already taken.",
    fig: "Oscar Wilde",
  },
  {
    quote:
      "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    fig: "Albert Einstein",
  },
  {
    quote: "So many books, so little time.",
    fig: "Frank Zappa",
  },
  {
    quote: "A room without books is like a body without a soul.",
    fig: "Marcus Tullius Cicero",
  },
  {
    quote: "You only live once, but if you do it right, once is enough.",
    fig: "Mae West",
  },
  {
    quote: "Be the change that you wish to see in the world.",
    fig: "Mahatma Gandhi",
  },
  {
    quote: "Try not to become a man of success. Rather become a man of value.",
    fig: "Albert Einstein",
  },
  {
    quote:
      "You can cut all the flowers but you cannot keep Spring from coming.",
    fig: "Pablo Neruda",
  },
  {
    quote: "Do what is right, not what is easy nor what is popular.",
    fig: "Roy T. Bennett",
  },
  {
    quote:
      "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
    fig: "Dr. Seuss",
  },
];

generate.onclick = function () {
  let randomNumber = Math.floor(Math.random() * quotes.length);

  if (localStorage.getItem("quote") == randomNumber) {
    randomNumber = Math.floor(Math.random() * quotes.length);

    if (randomNumber == localStorage.getItem("quote")) {
      if (randomNumber > 0) {
        randomNumber -= 1;
      } else {
        randomNumber += 1;
      }
    }

    quoteBody.innerHTML = `
    <q id="quote-space">
      ${quotes[randomNumber].quote}
    </q>
    <figcaption>
      &mdash;<span id="quote-fig">${quotes[randomNumber].fig}</span>
    </figcaption>
    `;
  } else {
    quoteBody.innerHTML = `
    <q id="quote-space">
      ${quotes[randomNumber].quote}
    </q>
    <figcaption>
      &mdash;<span id="quote-fig">${quotes[randomNumber].fig}</span>
    </figcaption>
    `;
  }

  localStorage.setItem("quote", quotes.indexOf(quotes[randomNumber]));
};
