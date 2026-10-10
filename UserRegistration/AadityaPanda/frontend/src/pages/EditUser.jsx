import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/EditUser.css';
import { toast } from 'react-toastify';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    mobileNo: '',
    isAdmin: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data function
  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/admin/edit/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  
      });

      if (response.ok) {
        const responseText = await response.text();

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (err) {
          console.error("Error parsing JSON:", err);
          toast.error('Unexpected response format.');
          return;
        }
  
        setFormData({
          username: data.user.username,
          email: data.user.email,
          firstName: data.user.firstname,
          middleName: data.user.middlename || '',
          lastName: data.user.lastname,
          mobileNo: data.user.mobile_no,
          isAdmin: data.user.isAdmin || false,
        });
        toast.success('User data loaded successfully!');
      } else {
        const errorText = await response.text();
        console.error("Error Response Text:", errorText);
        toast.error('Failed to fetch user details.');
      }
    } catch (error) {
      console.error('Failed to fetch user', error);
      toast.error('An unexpected error occurred while fetching user details.');
    } finally {
      setIsLoading(false);
    }
  };    

  useEffect(() => {
    fetchUser();
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission to update user data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`http://localhost:3000/admin/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                username: formData.username,
                email: formData.email,
                firstname: formData.firstName,
                middlename: formData.middleName,
                lastname: formData.lastName,
                mobile_no: formData.mobileNo,
                isAdmin: formData.isAdmin,
            }),
        });

        if (response.ok) {
            toast.success('User updated successfully.');
            navigate('/admin/user');
        } else {
            toast.error('Failed to update user.');
        }
    } catch (error) {
        toast.error(`Error: ${error.message}`);
    }
};

return (
  <div className="edit-user-container">
    <h1>Edit User</h1>
    {isLoading ? (
      <p>Loading user details...</p>
    ) : (
      <form onSubmit={handleSubmit} className="edit-user-form">
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
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Middle Name</label>
        <input
          type="text"
          name="middleName"
          value={formData.middleName || ''}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Mobile Number</label>
        <input
          type="text"
          name="mobileNo"
          value={formData.mobileNo}
          onChange={handleChange}
          className="form-control"
          pattern="\d{10}"
          title="Mobile number must be exactly 10 digits"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Update User
      </button>
    </form>
    )}
  </div>
  );
}

export default EditUser;