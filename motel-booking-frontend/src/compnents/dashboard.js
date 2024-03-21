// Dashboard.js
import React, { useContext ,useState} from 'react';
import Navbar from './navbar';
import AdminNavbar from '../admincomponents/adminnavbar';

import { AuthContext } from './authContext';

import RoomCard from './roomcard';
import axios from 'axios';

import HotelCarousel from './carousel';
import FeaturedRooms from './featuredrooms';
import FeaturesBar from './featuresbar';
import RelaxationBanner from './roombanner';
function Dashboard() {
    const { userRole } = useContext(AuthContext);


    const renderNavbar = () => {
        switch(userRole) {
            case 'GenesisAdmin':
            case 'Admin':
                return <AdminNavbar />;
            default:
                return <Navbar />;
        }
    };
 
  

    return (
        <div className="min-h-screen flex flex-col" style={{'overflow-y':'auto'}}>
            {renderNavbar()}
            <HotelCarousel/>
          
            <FeaturedRooms/>
            <FeaturesBar/>
            <RelaxationBanner/>
        
  
       
            
        </div>
        
    );
}

export default Dashboard;
