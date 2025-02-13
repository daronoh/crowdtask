import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const nricRegex = /^[STGF]\d{7}[A-Z]$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;


function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nric: '',
    firstName: '',
    lastName: '',
    dob: '',
    address: '',
    gender: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'nric' ? value.toUpperCase() : value;
    setError('');
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dobDate = new Date(formData.dob);
    const todayDate = new Date();

    if (!passwordRegex.test(formData.password)) {
      setError('Password must be at least 6 characters long and contain both letters and numbers.');
      return;
    } else if (!nricRegex.test(formData.nric)) {
      setError('Invalid NRIC format! Please enter a valid NRIC.');
      return;
    } else if (dobDate > todayDate) {
      setError('Date of Birth cannot be in the future!');
      return;
    }

    setError('');
    console.log('Form submitted with data:', formData);
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
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
        {/* NRIC Field */}
        <div>
          <label htmlFor="nric">NRIC</label>
          <input
            type="text"
            id="nric"
            name="nric"
            value={formData.nric}
            onChange={handleChange}
            required
          />
        </div>

        {/* First Name Field */}
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Last Name Field */}
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Date of Birth Field */}
        <div>
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address Field */}
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender Field */}
        <div>
          <label>Gender</label>
          <div className='radiogroup'>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === 'Other'}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
        </div>

        <button type="submit" className='submit-button' style={{marginBottom: '10px'}}>Register</button>
        <Link to="/login">
          <button className='navButton'>Go to Login Page</button>
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
};

export default Registration
