import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Signup.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '/assets/logo.svg';

function Signup() {
  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    username: '',
    password: '',
    verify_password: '',
    mobile_no: '',
    email: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || 'Signup successful! Please check your email for verification.');
        navigate('/login');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Signup failed', error);
    }
  };  

  return (
    <div className="signup-page-app">
      <div className="container signup-container-app">
        <Link to="/" className="logo-link-app">
          <img src={logo} alt="User Registration" className="logo-app" />
        </Link>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit} className="form-signup-app">
          <div className="form-group-app">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
              className="form-control-app"
            />
          </div>
          <div className="form-group-app">
            <input
              type="text"
              name="middlename"
              placeholder="Middle Name"
              value={formData.middlename}
              onChange={handleChange}
              className="form-control-app"
            />
          </div>
          <div className="form-group-app">
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
              className="form-control-app"
            />
          </div>
          <div className="form-group-app">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="form-control-app"
            />
          </div>
          <div className="form-group-app">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-control-app"
            />
          </div>
          <div className="form-group-app">
            <input
              type="password"
              name="verify_password"
              placeholder="Verify Password"
              value={formData.verify_password}
              onChange={handleChange}
              className="form-control-app"
            />
          </div>
          <div className="form-group-app">
            <input
              type="text"
              name="mobile_no"
              placeholder="Mobile Number"
              value={formData.mobile_no}
              onChange={handleChange}
              className="form-control-app"
              pattern="\d{10}"
              title="Mobile number must be exactly 10 digits"
            />
          </div>
          <div className="form-group-app">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="form-control-app"
            />
          </div>
          <button type="submit" className="btn btn-primary-app btn-block-app">
            Signup
          </button>
        </form>
        <div className="login-link-app">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;