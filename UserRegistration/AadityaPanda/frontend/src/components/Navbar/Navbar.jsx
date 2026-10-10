import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '/assets/logo.svg';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const handleLogout = async () => {
    // End the server session too, not just the local copy
    await fetch('http://localhost:3000/logout', { method: 'POST', credentials: 'include' }).catch(() => {});
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="User Registration" className="logo" />
        </Link>
        <div className="navbar-buttons">
          {isHomePage ? (
            <>
              <Link className="btn btn-primary" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-primary" to="/signup">
                Signup
              </Link>
            </>
          ) : (
            <button className="btn btn-logout" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;