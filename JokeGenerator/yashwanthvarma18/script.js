const apiKey = 'b27527bd72mshb1130221132428bp13b2d2jsn3c6f2c71ffcf'; // Replace with your JokeAPI key
const jokeText = document.getElementById('jokeText');
const generateJokeButton = document.getElementById('generateJoke');

generateJokeButton.addEventListener('click', getJoke);

function getJoke() {
    fetch(`https://v2.jokeapi.dev/joke/Any?format=txt&key=${apiKey}`)
        .then(response => response.text())
        .then(data => {
   
            jokeText.innerText = data;
        })
        .catch(error => {
            jokeText.innerText = 'Failed to fetch a joke. Please try again later.';
        });
}
