import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './authContext'; // Import the context

function Logout() {
  const { setIsLoggedIn } = useContext(AuthContext); // Use the context
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/logout", {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      localStorage.removeItem('token');
      setIsLoggedIn(false); // Update global state
      navigate('/');
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
