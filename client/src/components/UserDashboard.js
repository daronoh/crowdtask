import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';

function UserDashboard() {
  const { auth, logout } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/dashboard`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          }
        });
        setUserData(response.data);
      } catch (err) {
        console.log("Error fetching user data:", err);
      }
    };

    fetchData();
  }, [auth]);

  const handleLogout = () => {
    logout();
  }

  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>
      <div className="user-info">
        <p><strong>NRIC:</strong> {userData.nric}</p>
        <p><strong>First Name:</strong> {userData.firstName}</p>
        <p><strong>Last Name:</strong> {userData.lastName}</p>
        <p><strong>Date of Birth:</strong> {userData.dob}</p>
        <p><strong>Gender:</strong> {userData.gender}</p>
        <p><strong>Address:</strong> {userData.address}</p>
      </div>
      <button className='logout-button' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default UserDashboard;
