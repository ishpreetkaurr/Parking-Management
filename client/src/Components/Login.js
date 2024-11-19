import React, { useState } from 'react';
import "../Styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;

    // Basic validation
    if (!username || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    // Send POST request to the backend
    fetch('http://localhost:5000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: username, password }), // Assuming 'email' is the username
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          setMessage('Login successful!');
          // Handle successful login here, e.g., store token and redirect
        } else {
          setMessage(data.message || 'Invalid credentials.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('An error occurred. Please try again.');
      });
  };

  return (
    <div>
      <form className="login" onSubmit={handleSubmit}>
        <h2>Welcome, User!</h2>
        <p>Please log in</p>
        <input
          type="text"
          placeholder="User Name"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input type="submit" value="Log In" />
        {message && <div className="message">{message}</div>}
        <div className="links">
          <a href="#">Forgot password</a>
          <a href="#">Register</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
