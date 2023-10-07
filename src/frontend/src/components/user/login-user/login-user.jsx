import React, { useState } from 'react';
import axios from 'axios';
import './LoginUser.css'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login-user', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Login successful:', response.data);

      localStorage.setItem('token', response.data.token);

      // Hide the form after successful login
      setShowForm(false);

    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {!showForm ? (
        <button className="login-button" onClick={() => setShowForm(true)}>Login</button>
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button className="login-button" type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

export default Login;
