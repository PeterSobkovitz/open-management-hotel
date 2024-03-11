// SimpleNavbar.js


// Navbar.js
import React from 'react';

import { Link } from 'react-router-dom';
import './Navbar.css';

// Icons (You might need to install react-icons or similar package)
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';


function SimpleNavbar() {

  // Define the style for the navbar container
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '10vh',
    backgroundColor: '#231f20',
    padding: '0 10%',
    color: 'white',
  };

  // Style for the hotel name in the center
  const hotelNameStyle = {
    flex:2,
    textAlign: 'center',
    fontFamily: '"Great Vibes"',
    color: 'white',
    margin: '0 20%',
    fontSize:"25px",
    

  };

  // Style for the social media icons
  const socialIconsStyle = {
    display: 'flex',
    gap: '10px',
  };

  // Style for the buttons
  const buttonStyle = {
    padding: '5px 15px',
    borderRadius: '7px',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    backgroundColor: '#be955b',
    marginLeft: '15px', // Spacing between buttons and social icons
  };

  return (
    <div style={navbarStyle}>
      {/* Links on the left */}
      <div>
        <Link to="/"style={{ color: 'white', marginRight: '10px' }} >Home</Link>
        <Link to="/rooms"style={{ color: 'white', marginRight: '10px' }}>Rooms</Link>
        
        <a href="/about" style={{ color: 'white', marginRight: '10px' }}>About</a>
       
      </div>

      {/* Hotel name in the center */}
      <h1 style={hotelNameStyle}>Hotel Eclair</h1>

      {/* Right section */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={socialIconsStyle}>
              <FaFacebookF />
              <FaTiktok />
              <FaInstagram />
            </div>
    
      </div>
    
    </div>
    
  );
}

export default SimpleNavbar;

