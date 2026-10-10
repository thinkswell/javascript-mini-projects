import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); 
    } else {
      navigate('/login'); 
    }
    setLoading(false);
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user data available. Please log in again.</div>;

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <div className="user-details">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>First Name:</strong> {user.firstname}</p>
          <p><strong>Middle Name:</strong> {user.middlename}</p>
          <p><strong>Last Name:</strong> {user.lastname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile Number:</strong> {user.mobile_no}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;