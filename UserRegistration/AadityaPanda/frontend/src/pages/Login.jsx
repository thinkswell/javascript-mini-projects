import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/Login.css';
import logo from '/assets/logo.svg';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Result of clicking the email verification link (?verified=success|expired|invalid)
  useEffect(() => {
    const verified = searchParams.get('verified');
    if (verified === 'success') toast.success('Email verified! You can log in now.');
    else if (verified === 'expired') toast.error('Verification link has expired. Ask the admin to resend it.');
    else if (verified) toast.error('Invalid verification link.');
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (data.user) {
          // Store the complete user data in localStorage
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        if (data.user.isAdmin) {
          setUsername(''); 
          setPassword(''); 
          localStorage.setItem('admin', JSON.stringify(data.user)); 
          navigate('/admin');
          toast.success('Login successful! Welcome, Admin.');
        } else {
          navigate('/dashboard');
          toast.success('Login successful! Welcome to your dashboard.');
        }
      } else {
        toast.error(data.error || 'Invalid username or password. Please try again.');
      }
    } catch (error) {
      console.error('Login failed', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-page-app">
      <div className="container login-container-app">
        <Link to="/" className="logo-link-app">
          <img src={logo} alt="User Registration" className="logo-app" />
        </Link>
        <h1 className="login-title-app">Login</h1>
        <form onSubmit={handleSubmit} className="form-login-app">
          <div className="form-group-app">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control-app"
            />
          </div>
          <div className="form-group-app">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control-app"
            />
          </div>
          <button type="submit" className="btn btn-primary-app btn-block-app">
            Login
          </button>
        </form>
        <div className="signup-link-app">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;