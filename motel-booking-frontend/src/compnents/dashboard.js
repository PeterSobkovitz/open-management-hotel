// Dashboard.js
import React from 'react';
import Navbar from './navbar'; // Component for navigation
import RoomManagementBar from './roommgmt';
function Dashboard() {
  return (
    <div className="dashboard-container">
      <Navbar/>
      <div className="content">
      <RoomManagementBar/>
        
        {/* Add other components as needed */}
      </div>
    </div>
  );
}

export default Dashboard;
