const userInput = document.querySelector('#userInput')
const search_btn = document.querySelector('#search-btn');
const get_hero_btn = document.querySelector('#getNewHero-btn')
const img_container = document.querySelector('.img-container');

const name_div = document.querySelector('#name')
const stats_div = document.querySelector('#stats')

const heroSearch = () => {
    const heroName = userInput.value;
    let url = `https://www.superheroapi.com/api.php/115259207977830/search/${heroName}`;
    return url;
}

const randomHeroURL = () => {
    const ID = Math.ceil(Math.random() * 731);
    let url = `https://www.superheroapi.com/api.php/115259207977830/${ID}`;
    return url;
}

// Get Hero from API
const getRandomSuperHero = () => {
    fetch(randomHeroURL())
        .then(response => response.json())
        .then(hero_data => {
            base = hero_data;
            showHero(base);
        })
}

const searchSuperHero = () => {
    fetch(heroSearch())
        .then(response => response.json())
        .then(hero_data => {
            try {
                base = hero_data.results[0]
            }
            catch {
                alert(`No "${userInput.value}" exists in the database.`);
            }
            showHero(base);
        })
}


getRandomSuperHero();

search_btn.addEventListener('click', searchSuperHero)
get_hero_btn.addEventListener('click', getRandomSuperHero);


// EMOJIS
const statToEmoji = {
    intelligence: '🧠',
    strength: '💪🏽',
    speed: '💨',
    durability: '🏋🏽',
    power: '👊🏽',
    combat: '🥷🏽'
}

// DOM STUFFS
const showHero = (base) => {
    imageUrl = base.image.url;
    img_container.innerHTML = `<img src="${imageUrl}" alt="HERO_POSTER">`
    name_div.textContent = base.name;

    let stats = base.powerstats;
    let all_stats = '';
    console.log(stats);
    for (each in stats) {
        if (stats[each] !== 'null') {
            all_stats += `<p>${statToEmoji[each]} ${each} : ${stats[each]}<br></p>`;
        };
        stats_div.innerHTML = all_stats;
        userInput.value = '';
    };
}
