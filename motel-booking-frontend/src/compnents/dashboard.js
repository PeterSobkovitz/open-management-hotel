// Dashboard.js
import React from 'react';
import Navbar from './navbar'; // Component for navigation
// import RoomBookings from './RoomBookings'; // Component for room bookings
// import Reviews from './Reviews'; // Component for user reviews
// import Promotions from './Promotions'; // Component for promotions

function Dashboard({isLoggedIn}) {
  return (
    <div className="dashboard-container">
      <Navbar isLoggedIn={isLoggedIn}/>
      <div className="content">
        
        {/* Add other components as needed */}
      </div>
    </div>
  );
}

export default Dashboard;
