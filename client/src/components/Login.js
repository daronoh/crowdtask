import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Login() {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');
    console.log('Form submitted with data:', formData);
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
        <Link to="/">
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
