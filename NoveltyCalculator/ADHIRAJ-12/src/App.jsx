import { useState } from 'react'
import './App.css'
import NoveltyAgeCalculator from './components/NoveltyAgeCalculator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NoveltyAgeCalculator/>
        
    </>
  )
}

export default App
