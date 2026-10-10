// AdminSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminSidebar.css';

function AdminSidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-logo">
        <img src="/assets/logo.svg" alt="User Registration" className="logo" />
      </div>
      <Link to="/admin" className="sidebar-menu-item">Home</Link>
      <Link to="/admin/user" className="sidebar-menu-item">Manage Users</Link>
      <Link to="/admin/create" className="sidebar-menu-item">Create User</Link>
    </div>
  );
}

export default AdminSidebar;