const jokeText = document.getElementById('joke-text');
const btnNext = document.getElementById('btn-next');
const url = 'https://v2.jokeapi.dev/joke/Any?type=single';


async function getJoke() {
  await fetch(url)
  .then(value => value.json())
  .then(data => {
    jokeText.innerText = `${data.joke}`;
  });
}

getJoke();

btnNext.addEventListener('click', getJoke);