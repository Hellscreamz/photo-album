import React from 'react';
import './UserProfile.css'; // Import the CSS file

function UserProfile({ user }) {
  return (
    <div className="user-profile-container">
      <h2 className="user-info-heading">User Information</h2>
      <p className="user-info-item">First Name: {user.firstName}</p>
      <p className="user-info-item">Last Name: {user.lastName}</p>
      <p className="user-info-item">Email: {user.email}</p>
      <p className="user-info-item">Phone Number: {user.phoneNumber}</p>
    </div>
  );
}

export default UserProfile;
