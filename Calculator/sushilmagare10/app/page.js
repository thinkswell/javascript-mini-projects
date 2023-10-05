"use client"

import Calculator from './components/Calculator'
import { motion as m } from 'framer-motion';


export default function Home() {
  return (
    <main className="flex justify-center items-center h-[100vh] w-[100vw] bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <div>
          <m.h1 
          className='text-center text-4xl leading-5 font-bold text-white'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1, cursor: 'pointer' }}
        >
          Calculator
        </m.h1>
        <Calculator />
      </div>
    </main>
  )
}
