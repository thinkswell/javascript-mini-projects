import { Link } from 'react-router-dom'
import './App.css'
import CustomRoutes from './routes/CustomRoutes'
function App() {

  // If we want Something common to be used 
  // So we can add thoose components outside the CustomRoutes Components 
  return (
    <div className="main-wrapper" >
      
    <h1 id="pokedex-hadding" > 
      <Link to="/" >
          Pokedex
      </Link>  
    </h1>
     <CustomRoutes/>
    </div>
  )
}

export default App
