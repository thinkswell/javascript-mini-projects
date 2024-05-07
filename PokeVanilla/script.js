let url = 'https://pokeapi.co/api/v2/pokemon?&limit=50'
let mainTable = document.querySelector('.table--body')
let searchBar = document.querySelector('.search__bar')
let fetchBtn = document.querySelector('.fetch--button')
let ascendingSort = document.querySelector('.ascendingSort')
let descendingSort = document.querySelector('.descendingSort')
let indexOfPokemon = 1
let pokemonArr = []
let filterArr = []
let delButton

const fetchPokemon = async () => {

    // Fetch Pokemon Function
    mainTable.innerHTML = `<p class = "load">Loading information...</p`
    let response = await fetch(url)
    let result = await response.json()
    mainTable.innerHTML = ''
    let pokemons = result.results
    pokemons.forEach((pokemon) => {
        let { name: pokemonName, url: pokemonUrl } = pokemon
        let pokemonID = Math.floor(Math.random() * 1500)
        pokemonArr.push({ 'pokemonName': pokemonName, 'pokemonUrl': pokemonUrl, 'pokemonID': pokemonID, 'indexOfPokemon': indexOfPokemon })
        let ihtml = `
        <div class = "mainDiv">
            <div class = "details">
                <p class="table--sn">${pokemonID}</p>
                <p class="table--name"><img src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${indexOfPokemon}.png" class ="pokemons--image" title =${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)} >${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</p>
                <a href = "${pokemonUrl}" target = "_blank"><p class="table--url">${pokemonUrl}</p></a>
                </div>
                <img src="images/trash.png" alt="" class="delete-img" />
        </div>
            `
        mainTable.innerHTML += ihtml
        indexOfPokemon++


        // Delete Function
        delButton = document.querySelectorAll('.delete-img')
        delButton.forEach((btn) => {
            btn.addEventListener('mouseenter', () => {
                btn.src = 'images/hover-trash.png'
            })

            btn.addEventListener('mouseleave', () => {
                btn.src = 'images/trash.png'
            })

            btn.addEventListener('click', () => {
                let element = btn.parentElement
                element.remove()
            })
        })
    })


    // Search Function
    searchBar.addEventListener('input', () => {
        filterArr = pokemonArr.filter((pokemon) => {
            return pokemon.pokemonName.startsWith(searchBar.value.toLowerCase())
        })
        mainTable.innerHTML = ''
        filterArr.forEach((arr) => {
            let ihtml2 = `
            <div class = "mainDiv">
                <div class = "details">
                    <p class="table--sn">${arr.pokemonID}</p>
                    <p class="table--name"><img src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${arr.indexOfPokemon}.png" class ="pokemons--image" title = ${arr.pokemonName.charAt(0).toUpperCase() + arr.pokemonName.slice(1)} >${arr.pokemonName.charAt(0).toUpperCase() + arr.pokemonName.slice(1)}</p>
                    <a href = "${arr.pokemonUrl}" target = "_blank"><p class="table--url">${arr.pokemonUrl}</p></a>
                    <p class = "hidden">${arr.indexOfPokemon}</p>
                </div>
                <img src="images/trash.png" alt="" class="delete-img" />
            </div>
            `
            mainTable.innerHTML += ihtml2


            // Delete Function
            delButton = document.querySelectorAll('.delete-img')
            delButton.forEach((btn) => {
                btn.addEventListener('mouseenter', () => {
                    btn.src = 'images/hover-trash.png'
                })

                btn.addEventListener('mouseleave', () => {
                    btn.src = 'images/trash.png'
                })

                btn.addEventListener('click', () => {
                    let element = btn.parentElement
                    element.remove()
                })
            })
        })
    })


    // <=================== Sort Function ======================>
    // Ascending Function
    ascendingSort.addEventListener('click', () => {
        mainTable.innerHTML = ''
        const sortFunc = (a, b) => { return (a.pokemonName < b.pokemonName) ? -1 : 1 }
        pokemonArr.sort(sortFunc)
        pokemonArr.forEach((arr) => {
            let ihtml2 = `
            <div class = "mainDiv">
                <div class = "details">
                    <p class="table--sn">${arr.pokemonID}</p>
                    <p class="table--name"><img src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${arr.indexOfPokemon}.png" class ="pokemons--image" title = ${arr.pokemonName.charAt(0).toUpperCase() + arr.pokemonName.slice(1)} >${arr.pokemonName.charAt(0).toUpperCase() + arr.pokemonName.slice(1)}</p>
                    <a href = "${arr.pokemonUrl}" target = "_blank"><p class="table--url">${arr.pokemonUrl}</p></a>
                </div>
                <img src="images/trash.png" alt="" class="delete-img" />
            </div>
                `
            mainTable.innerHTML += ihtml2


            // Delete Function
            delButton = document.querySelectorAll('.delete-img')
            delButton.forEach((btn) => {
                btn.addEventListener('mouseenter', () => {
                    btn.src = 'images/hover-trash.png'
                })

                btn.addEventListener('mouseleave', () => {
                    btn.src = 'images/trash.png'
                })

                btn.addEventListener('click', () => {
                    let element = btn.parentElement
                    element.remove()
                })
            })
        })

    })


    // Descending Function
    descendingSort.addEventListener('click', () => {
        mainTable.innerHTML = ''
        const sortFuncDesc = (a, b) => { return (a.pokemonName > b.pokemonName) ? -1 : 1 }
        pokemonArr.sort(sortFuncDesc)
        pokemonArr.forEach((arr) => {
            let ihtml2 = `
            <div class = "mainDiv">
                <div class = "details">
                    <p class="table--sn">${arr.pokemonID}</p>
                    <p class="table--name"><img src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${arr.indexOfPokemon}.png" class ="pokemons--image" title = ${arr.pokemonName.charAt(0).toUpperCase() + arr.pokemonName.slice(1)} >${arr.pokemonName.charAt(0).toUpperCase() + arr.pokemonName.slice(1)}</p>
                    <a href = "${arr.pokemonUrl}" target = "_blank"><p class="table--url">${arr.pokemonUrl}</p></a>
                </div>
                <img src="images/trash.png" alt="" class="delete-img" />
            </div
                `
            mainTable.innerHTML += ihtml2


            // Delete Function
            delButton = document.querySelectorAll('.delete-img')
            delButton.forEach((btn) => {
                btn.addEventListener('mouseenter', () => {
                    btn.src = 'images/hover-trash.png'
                })

                btn.addEventListener('mouseleave', () => {
                    btn.src = 'images/trash.png'
                })

                btn.addEventListener('click', () => {
                    let element = btn.parentElement
                    element.remove()
                })
            })
        })
    })

}

fetchBtn.addEventListener('click', fetchPokemon)