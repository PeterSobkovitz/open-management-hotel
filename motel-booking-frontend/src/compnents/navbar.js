// Navbar.js
import React, { useState, useContext } from 'react';
import { AuthContext } from './authContext';
import LoginModal from './loginmodal';
import Logout from './logout';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <nav className="bg-white shadow">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <a className="font-bold text-xl text-blue-600" href="/">Brand</a>
          <ul className='flex items-center space-x-4'>
            <Link to='/rooms' className="text-blue-600 hover:text-blue-800">Rooms</Link>
            {isLoggedIn && <Link to='/review' className="text-blue-600 hover:text-blue-800">Leave a Review</Link>}
          </ul>
          {isLoggedIn ? (
            <ul className="flex items-center space-x-4">
              <li>Welcome Back</li>
              <li><Link to="/booking_list" className="text-blue-600 hover:text-blue-800">My Bookings</Link></li>
              <li><Link to="/inquiry" className="text-blue-600 hover:text-blue-800" >Create an inquiry</Link></li>
              <li><Link to="customer_request" className='text-blue-600 hover:text-blue-800'>Create a special request</Link></li>
              <li><Logout>Logout</Logout></li>
            </ul>
          ) : (
            <ul className="flex items-center space-x-4">
              <li><Link to="/register" className="text-blue-600 hover:text-blue-800">Join</Link></li>
              <button onClick={() => setModalOpen(true)}>Sign In</button>
            </ul>
          )}
        </div>
      </nav>
      <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default Navbar;
