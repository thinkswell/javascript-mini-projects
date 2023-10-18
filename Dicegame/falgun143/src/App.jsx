
import styled from "styled-components"
import EnterGame from "./Components/EnterGame"
import { useState } from "react"
import PlayGame from "./Components/PlayGame";


function App() {
  const[boolean,SetBoolean] =useState(true);

  const Toggle=(()=>{
      SetBoolean((prev)=>!prev)

  })

  return (
    <>
    {boolean?<PlayGame toggle={Toggle}></PlayGame>:<EnterGame ></EnterGame>}
      
    </>
  )
}

export default App
