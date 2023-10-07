import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
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

      const response = await axios.post('http://localhost:3000/admin-login', formData);

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('admin-token', response.data.token);

        console.log('Admin login successful. Token:', token);
      } else {
        alert('Admin login failed');
      }
    } catch (error) {
      console.error('Error logging in as admin:', error);
      alert('Internal Server Error');
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
