import React, { useState } from 'react';
import axios from 'axios';
import './AdminRegistration.css';

const AdminRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/create-admin', formData);

      if (response.status === 201) {
        alert('Admin created successfully');

        setFormData({
          username: '',
          password: '',
        });
      } else {
        alert('Admin creation failed');
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      alert('Internal Server Error');
    }
  };

  return (
    <div className="admin-registration-container">
      <h3>Create Admin</h3>
      <form className="admin-registration-form" onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Admin</button>
      </form>
    </div>
  );
};

export default AdminRegistration;
