import { useState } from 'react'
import './App.css'

function App() {
  
  let [count, setCount] = useState(0)

  const addValue=()=>{
    if(count<20){setCount(count+1);}
    else{alert("cant go over 20")}
  }

  const decValue=()=>{
    if(count>0){setCount(count-1);}
    else{alert("cant go negative")}
  }


  return (
    <>
    <h1>Counter Project</h1>
    <h1>{count}</h1>
    <button onClick={addValue}>Increase</button>
    <button onClick={decValue}>Decrease</button>
    </>
  )
}

export default App
