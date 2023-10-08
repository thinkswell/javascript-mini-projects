import { useState } from "react"
import "./Search.css"
import useDebounce from "../../hooks/useDebounce"
function Search (  {updateSearchTerm}) { 
    const debuoncedCallBack = useDebounce((e) => updateSearchTerm(e.target.value))
    return ( 
        <div  className="search-wrapper" > 

            <input
                id="pokemon-name-search"
                type="text" 
                placeholder="Pokemon name ... " 
                onChange={debuoncedCallBack}
            />

        </div>
    )
}

export default Search