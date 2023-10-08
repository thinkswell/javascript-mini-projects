import { useEffect, useState } from "react"
import PokeMonList from "../PokemonList/PokenMonList"
import Search from "../Search/Search"
import "./Pokedex.css"
import PokemonDetails from "../PokemonDetails/PokemonDetails"
function Pokedex () {
    const [searchTerm , setSearchTerm] = useState("")
    useEffect (()=>{ 
        
    }, [setSearchTerm])
    return (
        <div className="pokedex-wrapper" >
             
            < Search updateSearchTerm = {setSearchTerm} />
            
           { (!searchTerm ) ? <PokeMonList/>  :  <PokemonDetails key={searchTerm} pokemonName={searchTerm} />}

        </div>
    )
}

export default Pokedex 