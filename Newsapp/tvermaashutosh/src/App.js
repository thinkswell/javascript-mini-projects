import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import About from './components/About'
import Navbar from './components/Navbar'
import TopStories from './components/TopStories'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import Search from './components/Search'

function App() {
  const apiKey = "Put Your Own";
  const [categories] = useState(["Arts", "Automobiles", "Books", "Business", "Fashion", "Food", "Health", "Insider", "Magazine", "Movies", "Nyregion", "Obituaries", "Opinion", "Politics", "RealEstate", "Science", "Sports", "Sundayreview", "Technology", "Theater", "T-magazine", "Travel", "Upshot", "Us", "World"])

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<TopStories apiKey={apiKey} section="home" />}></Route>
          <Route exact path='/about' element={<About />}></Route>
          <Route exact path='*' element={<NotFound />}></Route>
          <Route exact path='/search' element={<Search />}></Route>
          {
            categories.map((e) => {
              return <Route key={e} exact path={`/categories/${e.toLowerCase()}`} element={<TopStories apiKey={apiKey} section={e.toLowerCase()} />}></Route>
            })
          }
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
