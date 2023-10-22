import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { searchArticle } from '../state/action-creator/index'

function Navbar() {

  const close = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories] = useState(["Arts", "Automobiles", "Books", "Business", "Fashion", "Food", "Health", "Insider", "Magazine", "Movies", "Nyregion", "Obituaries", "Opinion", "Politics", "RealEstate", "Science", "Sports", "Sundayreview", "Technology", "Theater", "T-magazine", "Travel", "Upshot", "Us", "World"])

  const [query, setquery] = useState("")

  const handleChange = (e) => {
    setquery(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchArticle(query))
    close.current.click()
    navigate('/search')
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">News Wallah</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">News Wallah</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" ref={close}></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">About Us</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Categories
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    {
                      categories.map((e) => {
                        if (e === "RealEstate") {
                          return <li key={e}><a className="dropdown-item" href={`/categories/${e.toLowerCase()}`}>Real Estate</a></li>
                        }
                        else if (e === "Sundayreview") {
                          return <li key={e}><a className="dropdown-item" href={`/categories/${e.toLowerCase()}`}>Sunday Opinion</a></li>
                        }
                        return <li key={e}><a className="dropdown-item" href={`/categories/${e.toLowerCase()}`}>{e}</a></li>
                      })
                    }
                  </ul>
                </li>
              </ul>
              <form className="d-flex mt-3" role="search" onSubmit={handleSubmit}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name='search' onChange={handleChange} />
                <button className="btn btn-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar