// Dashboard.js
import React from 'react';
import Navbar from './navbar'; // Component for navigation
import RoomFilterBar from './roommgmt';
function Dashboard() {
  return (
    <div className="dashboard-container">
      <Navbar/>
      <div className="content">
      <RoomFilterBar/>
        
        {/* Add other components as needed */}
      </div>
    </div>
  );
}

export default Dashboard;
