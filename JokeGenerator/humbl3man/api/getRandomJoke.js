async function getRandomJoke() {
  const rawRes = fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json'
    }
  });
  const res = (await rawRes).json();
  return res;
}

export default getRandomJoke;
