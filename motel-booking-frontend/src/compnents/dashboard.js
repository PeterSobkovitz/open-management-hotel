// Dashboard.js
import React, { useContext ,useState} from 'react';
import Navbar from './navbar';
import AdminNavbar from '../admincomponents/adminnavbar';
import RoomFilterBar from './roommgmt';
import { AuthContext } from './authContext';
import lobby from '../images/lobby.png';
import RoomCard from './roomcard';
import axios from 'axios';
import MembershipHero from './memershib';
import HotelCarousel from './carousel';
import FeaturedRooms from './featuredrooms';
function Dashboard() {
    const { userRole } = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);

    const renderNavbar = () => {
        switch(userRole) {
            case 'GenesisAdmin':
            case 'Admin':
                return <AdminNavbar />;
            default:
                return <Navbar />;
        }
    };
    const fetchRooms = async (filterCriteria) => {
      const baseUrl = 'http://localhost:3001/rooms';
  
    // Prepare the filter criteria
    // const filterCriteria = {
    //   startDate: startDate && startDate.toISOString().split('T')[0],
    //   endDate: endDate && endDate.toISOString().split('T')[0],
    //   maxOccupancy: maxOccupancy,
    //   minPrice: minPrice,
    //   maxPrice: maxPrice
    // };
  
    // Determine the URL based on whether filters are applied
    const url = (filterCriteria.startDate && filterCriteria.endDate) ? `${baseUrl}_filter` : baseUrl;
  
    // Make the request to the server
    try {
  
      const response = await axios.get(url, filterCriteria);
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    };
      
    };
  

    return (
        <div className="min-h-screen flex flex-col">
            {renderNavbar()}
            <HotelCarousel/>
          
            <FeaturedRooms/>
        
  
       
            
        </div>
    );
}

export default Dashboard;
