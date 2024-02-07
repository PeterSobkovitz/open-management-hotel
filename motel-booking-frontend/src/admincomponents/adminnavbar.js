// Navbar.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../compnents/authContext';
import LoginModal from '../compnents/loginmodal';
import Logout from '../compnents/logout';
import { Link } from 'react-router-dom';

function AdminNavbar() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <nav className="bg-white shadow">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <a className="font-bold text-xl text-blue-600" href="/">Brand</a>
          <ul className='flex items-center space-x-4'>
            <Link to='/rooms' className="text-blue-600 hover:text-blue-800">Rooms</Link>
          </ul>
          {isLoggedIn ? (
            <ul className="flex items-center space-x-4">
              
             
              <li><Logout>Logout</Logout></li>
            </ul>
          ) : (
            <ul className="flex items-center space-x-4">
           
              <button onClick={() => setModalOpen(true)}>Sign In</button>
            </ul>
          )}
        </div>
      </nav>
      <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default AdminNavbar;
