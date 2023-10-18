
import { Link } from "react-router-dom"
import "./Pokemon.css"

function Pokemon (  {name ,image , id} )  {

    return (
        <Link to={`/pokemon/${id}` } >
            <div className="pokemon-wrapper-card" >
                <div className="pokemon-name" >{name}</div>
                <div><img src={image} alt="" /></div>
            </div>
        </Link>
        
    )

}

export default Pokemon 