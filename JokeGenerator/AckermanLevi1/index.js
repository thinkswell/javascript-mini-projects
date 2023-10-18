// grab a reference for necessary HTML elements
// .joke-text
const jokeText = document.querySelector('.joke-text');
// .new-joke-btn 
const newJokeBtn = document.querySelector('.new-joke-btn');
// .tweet-btn (link)
const tweetBtn = document.querySelector('.tweet-btn');

// add 'click' eventListener to .new-joke-btn
newJokeBtn.addEventListener('click', getJoke);

// immediately call getJoke()
getJoke();

// getJoke() function definition
function getJoke() {
  // make an API request to https://icanhazdadjoke.com/'
  fetch('https://icanhazdadjoke.com/', {
    headers: {
      'Accept': 'application/json'
    }
  }).then(function(response) {
    /* convert Stringified JSON response to Javascript Object */
    return response.json();
  }).then(function(data) {
    /* replace innerText of .joke-text with data.joke */
    // extract the joke text
    const joke = data.joke;
    // do the replacement
    jokeText.innerText = joke;

    /* make the tweetBtn(.tweet-btn link) work by setting href */
    // create tweet link with joke
    const tweetLink = `https://twitter.com/share?text=${joke}`;
    // set the href
    tweetBtn.setAttribute('href', tweetLink);
  }).catch(function(error) {
    // if some error occured
    jokeText.innerText = 'Oops! Some error happened :(';
    // removes the old href from .tweet-btn if found any
    tweetBtn.removeAttribute('href');
    // console log the error
    console.log(error);
  });
}