// SimpleNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function SimpleNavbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-3">
        <Link to="/" className="font-bold text-xl text-blue-600">Brand</Link>
      </div>
    </nav>
  );
}

export default SimpleNavbar;
