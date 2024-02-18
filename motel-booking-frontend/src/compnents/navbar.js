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
            <nav className="bg-white shadow-md py-4">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold text-gray-800 hover:text-gray-600 transition duration-300">Brand</Link>
                    <div className="flex items-center space-x-6">
                        <Link to="/rooms" className="text-gray-600 hover:text-blue-500 transition duration-300">Rooms</Link>
                        {isLoggedIn ? (
                            <>
                                <Link to="/review" className="text-gray-600 hover:text-blue-500 transition duration-300">Leave a Review</Link>
                                <Link to="/booking_list" className="text-gray-600 hover:text-blue-500 transition duration-300">My Bookings</Link>
                                <Link to="/inquiry" className="text-gray-600 hover:text-blue-500 transition duration-300">Inquiry</Link>
                                <Logout />
                            </>
                        ) : (
                            <>
                                <Link to="/register" className="text-gray-600 hover:text-blue-500 transition duration-300">Join</Link>
                                <button onClick={() => setModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Sign In</button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
            <style jsx>{`
                /* Additional custom styles */
                .navbar-link:hover {
                    background-color: #f4f4f4; /* Example hover effect */
                }
            `}</style>
        </>
    );
}

export default Navbar;
