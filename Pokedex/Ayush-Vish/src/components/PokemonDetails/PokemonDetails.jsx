

import { useParams } from "react-router-dom"
// import "./PokemonDetails.css"
import usePokemonDetails from "../../hooks/usePokemonDetails"

function PokemonDetails ({ pokemonName }) {
    const {id  } = useParams() 
    const [pokemon]  = usePokemonDetails(id ,pokemonName)
    return (
        <div className="pokemon-details-wrapper" >   
            <div className="pokemon-name"  >Name : <span> {pokemon.name}</span> </div>
            <img src={pokemon.image} alt="" /> 
            <div  className="pokemon-name" > Weight :   {pokemon.weight} </div>
            <div  className="pokemon-name" >  Height :  {pokemon.height} </div>
            <div className="pokemon-types" >
                 {
                    pokemon &&  pokemon.types ? pokemon.types.map((t) =>  <div key={t} > {t}</div>  ) : <div> Loading ...  </div>
                }
            </div>
            {pokemon.types && 
                <div>
                    More {pokemon.types && pokemon.types[0]} Type Pokemons     
                    <ul>
                        {pokemon?.similarPokemons?.map((p)=> <li  key={p.pokemon.name}  >  {p.pokemon.name} </li>)}
                    </ul>
                </div>
            }
        </div>
    )

}
export default PokemonDetails 