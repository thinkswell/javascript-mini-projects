
const projectName = "mnk17arts' Quote machine";
let quotesData;


var colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857',
  '#000000',
  '#6A0572',
  '#EA0599',
];
var currentQuote = '',
  currentAuthor = '';

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url:
      "https://raw.githubusercontent.com/mnk17arts/myWebProjects/main/quote-machine/mnk17arts'-Quote-machine.json",
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
        console.log('quotesData');
        console.log(quotesData);
      }
    }
  });
}

function getRandomQuote() {
  return quotesData.quotes[
    Math.floor(Math.random() * quotesData.quotes.length)
  ];
}

function getQuote() {
  let randomQuote = getRandomQuote();

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes,mnk17arts&related=mnk17arts&text=' +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );

  $('#tumblr-quote').attr(
    'href',
    'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
      encodeURIComponent(currentAuthor) +
      '&content=' +
      encodeURIComponent(currentQuote) +
      '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
  );
  $('#fb-quote').attr(
    'href',
    'https://www.facebook.com/sharer.php?u=https://codepen.io/mnk17arts/pen/PopaWgN?editors=1010&quote= ' +
      encodeURIComponent(currentQuote) +
      '   -'+
      encodeURIComponent(currentAuthor)
  );
   $('#wa-quote').attr(
    'href',
    'whatsapp://send?text="' +
      encodeURIComponent(currentQuote) +
      '" -'+
      encodeURIComponent(currentAuthor) + '  for more visit :https://codepen.io/mnk17arts/full/PopaWgN'
  );
  

  $('#quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(randomQuote.quote);
  });

  $('#quote-author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').html(randomQuote.author);
  });

  var color = Math.floor(Math.random() * colors.length);

  $('html body').animate(
    {
      backgroundColor: colors[color],
      color: colors[color]
    },
    1000
  );
  $('.btn').animate(
    {
      backgroundColor: colors[color]
    },
    1000
  );
  
}

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $('#new-quote').on('click', getQuote);
  setInterval ( "$('#new-quote').click()", 60000 );
});
