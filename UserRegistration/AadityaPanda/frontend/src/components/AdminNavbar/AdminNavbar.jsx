import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './AdminNavbar.css';

function AdminNavbar({ handleLogout }) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Define breadcrumb navigation based on the current path
  const breadcrumb = () => {
    const editPageMatch = currentPath.match(/^\/admin\/edit\/(\d+)$/); // Regex to match /admin/edit/{id}

    if (currentPath === '/admin/user') {
      return 'Manage Users';
    } else if (currentPath === '/admin/create') {
      return 'Create User';
    } else if (editPageMatch) {
      const userId = editPageMatch[1]; // Get the user ID from the URL
      return (
        <>
          <Link to="/admin/user">Manage Users</Link> / Edit User {userId}
        </>
      );
    }

    return ''; 
  };

  return (
    <div className="navbar-container">
      <div className="navbar-breadcrumb">
        {/* Home is clickable and routes to the admin dashboard */}
        <Link to="/admin">Home</Link>

        {/* Ensure proper spacing between the breadcrumb items */}
        {currentPath !== '/admin' && (
          <>
            <span className="breadcrumb-separator"> / </span>
            {/* Display the current breadcrumb path based on the current URL */}
            {breadcrumb()}
          </>
        )}
      </div>

      {/* Logout Button */}
      <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
}

export default AdminNavbar;