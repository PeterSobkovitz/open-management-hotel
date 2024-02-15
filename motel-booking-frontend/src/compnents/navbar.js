// Navbar.js
import React, { useState, useContext } from 'react';
import { AuthContext } from './authContext';
import LoginModal from './loginmodal';
import Logout from './logout';
import { Link } from 'react-router-dom';
import { ReactComponent as ShoppingBagIcon } from '../images/cart.svg'; // Ensure you have an SVG for cart icon
import { ReactComponent as SearchIcon } from '../images/search.svg'; // Ensure you have an SVG for search icon

function Navbar() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <nav className="relative bg-transparent">
        <div className="absolute inset-0 z-0">
          <img src="your-hotel-background-image.jpg" alt="Hotel" className="w-full h-full object-cover" />
          <div className="bg-black bg-opacity-50"></div>
        </div>
        <div className="container mx-auto px-6 py-3 flex justify-between items-center relative z-10">
          <Link to="/" className="font-bold text-2xl text-white">New Sarvia Hotel</Link>
          <ul className='flex items-center space-x-4'>
            <Link to='/rooms' className="text-white hover:text-gray-300">Rooms</Link>
            {isLoggedIn && <Link to='/review' className="text-white hover:text-gray-300">Leave a Review</Link>}
            {/* ... other links ... */}
          </ul>
          <div className="flex items-center space-x-4">
            {/* ... user-related links ... */}
            <SearchIcon className="h-6 w-6 text-white cursor-pointer" />
            <ShoppingBagIcon className="h-6 w-6 text-white cursor-pointer" />
            {/* ... sign in / sign out buttons ... */}
          </div>
        </div>
      </nav>
      <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default Navbar;
