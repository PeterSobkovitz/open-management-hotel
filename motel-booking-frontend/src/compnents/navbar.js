// Navbar.js
import React, { useState, useContext } from 'react';
import { AuthContext } from './authContext';
import LoginModal from './loginmodal';
import Logout from './logout';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Icons (You might need to install react-icons or similar package)
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';


function Navbar() {
    const [isModalOpen, setModalOpen] = useState(false);
    const { isLoggedIn } = useContext(AuthContext);
  // Define the style for the navbar container
  const navigation = [
    { name: 'Home', to: '/' },
    { name: 'Rooms', to: '/rooms' },
    { name: 'About', to: '/about' },
  ]
  
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
    
    <Disclosure as="nav" className="bg-gray-800">
    {({ open }) => (
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            
            {/* Links on the left */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                  {isLoggedIn && (
                    <>
                      <Link to="/review" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Leave a Review</Link>
                      <Link to="/booking_list" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">My Bookings</Link>
                      <Link to="/inquiry" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Inquiry</Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Hotel name in the center */}
            <h1 className="text-white font-semibold">Hotel Eclair</h1>

            {/* Right section */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="flex space-x-3 text-white">
                <FaFacebookF />
                <FaTiktok />
                <FaInstagram />
              </div>
              {!isLoggedIn ? (
                <>
                  <Link to="/register" className="ml-3 bg-white text-gray-800 px-3 py-1 rounded-md text-sm font-medium">Join</Link>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="ml-2 bg-amber-600 px-3 py-1 rounded-md text-white text-sm font-medium"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <button className="ml-3 bg-gray-800 px-3 py-1 rounded-md text-white text-sm font-medium">
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>

        <Disclosure.Panel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as={Link}
                to={item.to}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                {item.name}
              </Disclosure.Button>
            ))}
          </div>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>);
}

export default Navbar;

