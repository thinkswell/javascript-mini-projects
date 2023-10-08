const container = document.querySelector('.container');

const apiKey = 'sqE8rPthrPxj2XGi/YfjEA==TFn7lWRN2r3uHsfy';

function handleClick() {
    console.log('handle');
    const joke = getJoke();
    joke.then((res) => container.textContent = res[0].joke).catch((err) => container.textContent = 'error');
}

async function getJoke() {
    const joke = await fetch('https://api.api-ninjas.com/v1/jokes?limit=1', {
        method  : 'GET',
        headers : {'X-Api-Key': apiKey},
        contentType : 'application/json'
    });
    
    return joke.json();
}
