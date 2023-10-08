import axios from "axios"
import { useEffect, useState } from "react"


function usePokemonDetails( id , pokemonName ){ 

    const [pokemon ,setPokemon] = useState({})


    async function getPokemonDetails () {
        try {
            let response ; 
            if(pokemonName) { 
                console.log(pokemonName)
                response= await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            }
            else {
                response  = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            }
            console.log(response.data.types[0])
            const pokemonsOfSameType=   axios.get(`https://pokeapi.co/api/v2/type/${response?.data?.types[0]?.type.name}`)
    
            const data= await response.data 
            setPokemon( state => ( {
                ...state,
                name : data.name, 
                image : data.sprites.other.dream_world.front_default ,
                weight : data.weight, 
                height:  data.height,
                types : data.types.map((t)=> t.type.name ),
               
            }))
            pokemonsOfSameType.then((response) => {
                setPokemon(state  => ({
                    ...state ,
                    similarPokemons: response.data.pokemon
                }))
            })
            setPokemonListState({...pokemonListState, type: data.types ?data.types[0].type.name : ""   })
        } catch (e) {
            console.log("Somethig went Wrong ")
        }
        
    }
    const [pokemonListState ,setPokemonListState] = useState({})
    useEffect(()=>{
        try {
            getPokemonDetails()    
        } catch (e) {
            console.log(e.message)
        }
        
        console.log("List =>" , pokemonListState)
    },[ ])
    return [pokemon]
}



export default usePokemonDetails 