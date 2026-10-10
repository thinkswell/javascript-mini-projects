import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import '../styles/ManageUsers.css';
import { Link } from 'react-router-dom';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (query = '', pageNumber = 1) => {
    try {
      setIsLoading(true);

      const url = query
        ? `http://localhost:3000/admin/search?query=${encodeURIComponent(query)}&page=${pageNumber}`
        : `http://localhost:3000/admin/user?page=${pageNumber}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
        setTotalPages(data.pages);
        setPage(data.page);
      } else {
        toast.error('Failed to fetch users.');
      }
    } catch (error) {
      toast.error('An error occurred while fetching users.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(searchQuery, page);
  }, [searchQuery, page]);

  // Handle deleting a user
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/user/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
        toast.success('User deleted successfully.');
      } else {
        toast.error('Failed to delete user.');
      }
    } catch (error) {
      toast.error('An error occurred while deleting user.');
    }
  };

  // Handle activating a user
  const handleActivate = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/user/${id}/activate`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (response.ok) {
        // Optimistic UI update for activating a user
        setUsers(users.map((user) =>
          user.id === id ? { ...user, active: true } : user
        ));
        toast.success('User activated successfully.');
      } else {
        toast.error('Failed to activate user.');
      }
    } catch (error) {
      toast.error('An error occurred while activating user.');
    }
  };

  // Handle deactivating a user
  const handleDeactivate = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/user/${id}/deactivate`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (response.ok) {
        // Optimistic UI update for deactivating a user
        setUsers(users.map((user) =>
          user.id === id ? { ...user, active: false } : user
        ));
        toast.success('User deactivated successfully.');
      } else {
        toast.error('Failed to deactivate user.');
      }
    } catch (error) {
      toast.error('An error occurred while deactivating user.');
    }
  };

  // Handle verifying email
  const handleVerifyEmail = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/verify-email/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        toast.success('Verification email sent successfully!');
      } else {
        toast.error('Failed to send verification email.');
      }
    } catch (error) {
      toast.error('An error occurred while sending the verification email.');
    }
  };

  return (
    <div className="manage-users-container">
      <h1>Manage Users</h1>
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="form-control mb-3"
      />
      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>Mobile Number</th>
                <th>Status</th>
                <th>Active</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.firstname}</td>
                    <td>{user.middlename}</td>
                    <td>{user.lastname}</td>
                    <td>{user.mobile_no}</td>
                    <td style={{ color: user.verified ? 'green' : 'red', fontWeight: 'bold' }}>
                      {user.verified ? 'Verified' : 'Unverified'}
                    </td>
                    <td style={{ color: user.active ? 'blue' : 'orange', fontWeight: 'bold' }}>
                      {user.active ? 'Active' : 'Inactive'}
                    </td>
                    <td className="text-center">
                      {/* Dropdown menu for actions */}
                      <div className="dropdown">
                        <button
                          className="btn btn-link text-dark p-0"
                          type="button"
                          id={`dropdownMenuButton-${user.id}`}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fas fa-ellipsis-v" style={{ fontSize: '18px', color: 'black' }}></i>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton-${user.id}`} style={{ minWidth: '150px' }}>
                          <li><Link to={`/admin/edit/${user.id}`} className="dropdown-item">Edit</Link></li>
                          <li><button onClick={() => handleDelete(user.id)} className="dropdown-item">Delete</button></li>
                          {user.active ? (
                            <li><button onClick={() => handleDeactivate(user.id)} className="dropdown-item">Deactivate</button></li>
                          ) : (
                            <li><button onClick={() => handleActivate(user.id)} className="dropdown-item">Activate</button></li>
                          )}
                          {!user.verified && (
                            <li><button onClick={() => handleVerifyEmail(user.id)} className="dropdown-item">Verify Email</button></li>
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
  
          {/* Pagination Controls */}
          <div className="pagination-container">
            <button
              className="pagination-button"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="pagination-button"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );  
}

export default ManageUsers;