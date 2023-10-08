// src/ProfileCard.js
import React, { useState } from 'react';
import '../App.css';

const ProfileCard = () => {
  const [formData, setFormData] = useState({
    name: '',
    profilePicture: '',
    address: '',
  });

  const [profile, setProfile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generateProfile = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Create the profile card based on user input
    const { name, profilePicture, address } = formData;

    if (name && profilePicture && address) {
      const newProfile = {
        name,
        profilePicture,
        address,
      };

      setProfile(newProfile);
    }
  };

  return (
    <div>
      <form onSubmit={generateProfile}>
        <div>
          <label htmlFor="name">Name:</label>
          <br/>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="profilePicture">Profile Picture URL:</label>
          <br/>
          <input
            type="url"
            id="profilePicture"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <br/>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Generate Profile</button>
      </form>

      {profile && (
        <div className="card">
          <h2>{profile.name}</h2>
          <img src={profile.profilePicture} alt="Profile" />
          <p>{profile.address}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
