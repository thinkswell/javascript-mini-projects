const poke_container = document.getElementById('poke_container');
const pokemons_number = 1000;
const colors = {
    fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const main_type = Object.keys(colors);

console.log(main_type);

const fetchPokemons = async () => {
    for(let i=1;i<=pokemons_number;i++){
        await getPokemon(i);
    }
}

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
    createPokemonCard(pokemon);
}



function createPokemonCard(pokemon){
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');
    const poke_types = pokemon.types.map(el => el.type.name);
    const type = main_type.find(
        type => poke_types.indexOf(type)> -1
    );

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    // name = name.substring(0,name.indexOf('-'));
    
    //const sm_name = name.slice(0,'name.lastIndexOf("-")');
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;
    const pokeInnerHtml = `
    <div class="img-container">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="Sorry!"/>
    </div>`
    const info = `<div class = "info">
        <span class="number">#${pokemon.id.toString().padStart(3,'0')}
        </span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
    </div>
    `;
	let abilities  = pokemon.abilities.length == 0 ?
		`
	<h3 class="name">No Abilities</h3>
	`:
		`
	<h3 class ="name">Abilities</h3>
	`;
	pokemon.abilities.forEach((abi, ind)=>{
//		console.log(abi.ability.name.split()
		abilities += `<br/><small class="type">${ind + 1}${". "}
		<span>${abi.ability.name.split('-').map(val => val.charAt(0).toUpperCase() + val.slice(1)).join(' ')}
			</span></small>`
	})

    pokemonEl.innerHTML = pokeInnerHtml + info;

    poke_container.appendChild(pokemonEl);

	pokemonEl.addEventListener('mouseenter', ()=>{
		pokemonEl.style.filter = 'brightness(110%)';
		pokemonEl.innerHTML = abilities;

	})
	pokemonEl.addEventListener('mouseleave', ()=>{
		pokemonEl.style.filter = 'none';
		pokemonEl.innerHTML = pokeInnerHtml + info;
	})

}
fetchPokemons();
