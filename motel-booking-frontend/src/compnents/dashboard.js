// Dashboard.js
import React, { useContext } from 'react';
import Navbar from './navbar'; // Component for navigation
import AdminNavbar from '../admincomponents/adminnavbar';
import RoomFilterBar from './roommgmt';
import { AuthContext } from './authContext';
function Dashboard() {
  const {userRole}=useContext(AuthContext);
  
  console.log(true,true);
  const renderNavbar = () => {
    switch(userRole) {
      case 'GenesisAdmin':
        return <AdminNavbar />;
      case 'Admin':
        return <AdminNavbar />;
      default:
        return <Navbar />;
    }
  };
  return (
    <div className="dashboard-container">
      {renderNavbar()}
      <div className="content">
      <RoomFilterBar/>
        
        {/* Add other components as needed */}
      </div>
    </div>
  );
}

export default Dashboard;
