'use client'

import React, { useState, useEffect } from 'react'
import { motion as m } from 'framer-motion';


const Calculator = () => {

    const [result, setResult] = useState("")

    const handleClick = e => setResult(result.concat(e.target.id))
    const deleteEl = () => setResult(result.slice(0, -1))
    const clear =() => setResult('')
    
    const calculate = () => {
        try {
            setResult(eval(result).toString())
        } catch (error) {
            setResult("")
        }
    }

     const handleKeyPress = (e) => {
        const key = e.key;
        if (/[0-9.+\-*/]/.test(key)) {
            setResult(result.concat(key))
        } else if (key === 'Backspace') {
            deleteEl();
        } else if (key === 'Enter') {
            calculate();
        }
     }
    
     useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        }
    }, [result]);

  return (
      <m.div 
            className='calculator'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
        >
          
          <input type="text" className='input' value={result} disabled />
          <m.div
                className='buttons'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
          <button className='operator' onClick={clear}>AC</button>
          <button className='operator' onClick={deleteEl}>DE</button>
         
          <button id='.' className='operator' onClick={handleClick}>.</button>
          <button id='/' className='operator' onClick={handleClick}>/</button>
         
          <button id='7' className='number' onClick={handleClick}>7</button>
          <button id='8' className='number' onClick={handleClick}>8</button>
          <button id='9' className='number' onClick={handleClick}>9</button>

              <button id='*' className='operator' onClick={handleClick}>*</button>

          <button id='4' className='number' onClick={handleClick}>4</button>
          <button id='5' className='number' onClick={handleClick}>5</button>
          <button id='6' className='number' onClick={handleClick}>6</button>
          
              <button id='-' className='operator' onClick={handleClick}>-</button>

          <button id='1' className='number' onClick={handleClick}>1</button>
          <button id='2' className='number' onClick={handleClick}>2</button>
          <button id='3' className='number' onClick={handleClick}>3</button>
              
          <button id='+' className='operator' onClick={handleClick}>+</button>
          <button id='00' className='operator' onClick={handleClick}>00</button>
           <button id='0' className='operator' onClick={handleClick}>0</button>
              

            <button id='=' className='operator col-span-2 bg-pink-300' onClick={calculate}>=</button>
          </m.div>
      </m.div>
  )
}

export default Calculator