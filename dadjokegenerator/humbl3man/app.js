import getRandomJoke from './api/getRandomJoke';

const jokeElem = document.getElementById('joke');
const generateBtn = document.getElementById('generate-btn');
const generateBtnTextElem = document.getElementById('generate-btn-txt');
const error = document.getElementById('error');

function setButtonLoading() {
  generateBtn.disabled = true;
  generateBtnTextElem.textContent = 'Loading...';
}

function unsetButtonLoading() {
  generateBtn.disabled = false;
  generateBtnTextElem.textContent = 'Get New Joke';
}

async function renderJoke() {
  try {
    setButtonLoading();
    const res = await getRandomJoke();
    const { status, joke } = res;
    if (status !== 200) {
      unsetButtonLoading();
      throw new Error('API error: unable to retrieve new joke.');
    }
    unsetButtonLoading();
    jokeElem.textContent = joke;
  } catch (err) {
    console.error(err.message);
  }
}

generateBtn.addEventListener('click', renderJoke);

renderJoke();
