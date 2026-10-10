// Admin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar/AdminSidebar';
import ManageUsers from './ManageUsers';
import CreateUser from './CreateUser';
import EditUser from './EditUser';
import '../styles/Admin.css';

function Admin() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle logout
  const handleLogout = async () => {
    // End the server session too, not just the local copy
    await fetch('http://localhost:3000/logout', { method: 'POST', credentials: 'include' }).catch(() => {});
    localStorage.clear();
    navigate('/');
  };

  // Check if admin is logged in
  useEffect(() => {
    const loggedInAdmin = localStorage.getItem('admin');
    if (loggedInAdmin) {
      setAdmin(JSON.parse(loggedInAdmin));
    } else {
      navigate('/login');
    }
    setLoading(false);
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (!admin) return <div>No admin data available. Please log in again.</div>;

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <AdminSidebar />
      
      <div className="main-content-area">
        {/* Navbar */}
        <AdminNavbar handleLogout={handleLogout} />
        
        <div className="content-section">
          <Routes>
            <Route path="/user" element={<ManageUsers />} />
            <Route path="/create" element={<CreateUser />} />
            <Route path="/edit/:id" element={<EditUser />} />
            <Route path="/" element={<div>
              <h1 className="page-header">Welcome, {admin.firstname}</h1>
              <p className="page-description">Here you can manage, create, edit, delete, activate and deactivate users.</p>
            </div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Admin;