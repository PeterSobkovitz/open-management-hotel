import React, { useState, useContext } from 'react';
import lobby from '../images/spa.png';
import { Link } from 'react-router-dom';
import LoginModal from './loginmodal';
import { AuthContext } from './authContext';

function MembershipHero() {
    return (
        <div className="py-10 relative bg-cover bg-center" style={{ backgroundImage: `url(${lobby})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-wrap items-center justify-between">
                    <div className="w-full md:w-2/3 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-white md:text-left">Become a Marriott Bonvoy Member</h2>
                        <p className="text-white mt-4 md:text-left" >Get exclusive rates, earn points towards free nights and more.</p>
                        <div className="mt-6 flex justify-center md:justify-start space-x-6">
                            <Link to="/register" className="bg-white text-blue-700 py-2 px-4 rounded-full mr-4 hover:bg-gray-100 transition duration-300 ease-in-out inline-block">Join</Link>
                            <Link to="/login" className="border border-white text-white py-2 px-4 rounded-full hover:bg-white hover:text-blue-700 transition duration-300 ease-in-out inline-block">Sign in</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Optionally, add an overlay for better text readability */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
    );
}
  
export default MembershipHero;