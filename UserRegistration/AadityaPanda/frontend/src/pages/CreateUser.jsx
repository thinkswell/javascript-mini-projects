import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/CreateUser.css';
import { toast } from 'react-toastify';

function CreateUser() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstname: '',
    middlename: '',
    lastname: '',
    mobile_no: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/admin/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await response.json(); 

      if (response.ok) {
        toast.success(data.message); 
        navigate('/admin/user');
      } else {
        toast.error(data.message || 'Failed to create user');
      }
    } catch (error) {
      toast.error('An error occurred while creating user.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-user-container">
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Middle Name</label>
          <input
            type="text"
            name="middlename"
            value={formData.middlename}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobile_no"
            value={formData.mobile_no}
            onChange={handleChange}
            className="form-control"
            pattern="\d{10}"
            title="Mobile number must be exactly 10 digits"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create User'}
        </button>
        <Link to="/admin/user" className="btn btn-secondary ml-2">
          Back
        </Link>
      </form>
    </div>
  );
}

export default CreateUser;