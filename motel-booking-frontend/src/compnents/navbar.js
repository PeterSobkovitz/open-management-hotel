// Navbar.js
import React, { useState, useContext } from 'react';
import { AuthContext } from './authContext';
import LoginModal from './loginmodal';
import Logout from './logout';
import { Link } from 'react-router-dom';
import './Navbar.css';

// Icons (You might need to install react-icons or similar package)
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';


function Navbar() {
    const [isModalOpen, setModalOpen] = useState(false);
    const { isLoggedIn } = useContext(AuthContext);
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
        {isLoggedIn && (
          <>
        <Link to="/review" style={{ color: 'white', marginRight: '10px' }}>Leave a Review</Link>
        <Link to="/booking_list" style={{ color: 'white', marginRight: '10px' }}>My Bookings</Link>
        <Link to="/inquiry" style={{ color: 'white', marginRight: '10px' }}>Inquiry</Link>

            
          </>
        )}
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
        {!isLoggedIn ? (
          <>
         
           
            {/* Sign in and Sign up buttons */}
            <Link to="/register" style= {{ ...buttonStyle, backgroundColor: 'white', color: '#231f20' }}>Join</Link>
            <button onClick={() => setModalOpen(true)} style={{ ...buttonStyle, backgroundColor: '#be955b' }}>Sign In</button>
            
            
          </>
        ) : (
          <>
            {/* Logout button */}
           
            <Logout style={buttonStyle}/>
          </>
        )}
      </div>
      <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
    
  );
}

export default Navbar;

