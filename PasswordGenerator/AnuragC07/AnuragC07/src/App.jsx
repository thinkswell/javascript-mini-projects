import { useCallback, useEffect, useState, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [charAllowed, setCharAllowed] = useState(false)
  const [symbolAllowed, setSymbolAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "0123456789"
    // "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(charAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(symbolAllowed) str += "!@#$%^&*()_+`~"

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)

    }

    setPassword(pass)

  }, [length, charAllowed, symbolAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password]) 



  useEffect(() => {
    passwordGenerator()
  }, [length, charAllowed, symbolAllowed, passwordGenerator])

  return (
    <>
     <div className='w-full b-5 max-w-md mx-auto shadow-md rounded-lg px-4 py-8 my-8 bg-amber-200  border-solid border-2  border-black text-blue-900'>
        <h1 className='text-black font-bold text-xl text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg font-semibold overflow-hidden mb-4'>
            <input
              type="text"
              value={password}
              className='outline-none w-full py-1 px-3'
              placeholder='Password'
              readOnly
              ref={passwordRef}
            />
            <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0'>
              Copy
            </button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
            type='range'
            min={6}
            max={40}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            defaultChecked={charAllowed}
            id='charInput'
            onChange={() => {
              setCharAllowed((prev) => !prev);
          }}
          />
          <label htmlFor='charInput'>Characters</label>
        </div>
        <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={symbolAllowed}
              id='symbolInput'
              onChange={() => {
                setSymbolAllowed((prev) => !prev);
            }}
          />
          <label htmlFor='symbolInput'>Symbols</label>
        </div>
        </div>

     </div>
      
    </>
  )
}

export default App
