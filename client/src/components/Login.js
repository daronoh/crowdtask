import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setError('');
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, { formData });
      const { token, user } = response.data;
      login(user.username, token);
      setError('');
      navigate('/user');
    } catch (err) {
      if (err.status === 401) {
        setError(`${err.response.data.message}`);
      } else {
        setError('Unknown error occurred');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        {/* Password Field */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className='submit-button' style={{marginBottom: '10px'}}>Login</button>
        <Link to="/register">
          <button className='navButton'>Go to Registration Page</button>
        </Link>
      </form>
      {/* Error Box */}
      {error && (
        <div className="error-box">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default Login
