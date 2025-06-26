import React from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const user = {
    name: "Jane Doe",
    email: "jane@example.com",
    role: "Administrator"
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p className="role">{user.role}</p>
        <button className="edit-btn">Edit Profile</button>
      </div>
    </div>
  );
};

export default UserProfile;
