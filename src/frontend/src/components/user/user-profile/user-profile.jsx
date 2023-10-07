import React from 'react';

function UserProfile({ user }) {
  return (
    <div>
      <h2>User Information</h2>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Phone Number: {user.phoneNumber}</p>
    </div>
  );
}

export default UserProfile;
