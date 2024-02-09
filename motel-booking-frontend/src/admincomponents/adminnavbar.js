// Navbar.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../compnents/authContext';
import LoginModal from '../compnents/loginmodal';
import Logout from '../compnents/logout';
import { Link } from 'react-router-dom';
import AdminRegisterUser from './adminreguser';
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
              <li><Link to='/genesis_role_create' className="text-blue-600 hover:text-blue-800">Create New Role</Link></li>
              <li><Link to='/roles' className="text-blue-600 hover:text-blue-800">List Existing Roles</Link></li>
              <li><Link to='/create_staff' className="text-blue-600 hover:text-blue-800">Add New Staff</Link></li>
              
             
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
