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
          
            {/* <div className="flex-grow">
           
                <div className="hero bg-cover bg-center h-96 relative" style={{ backgroundImage: `url(${lobby})` }}>
               
                 
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="text-center text-white">
                            <h1 className="text-4xl font-bold mb-2">Discover Your Next Escape</h1>
                            <p className="mb-4">Luxury rooms & suites just a click away.</p>
                        </div>
                    </div>
                </div>
             
            </div>
          */}
            {/* <RoomFilterBar subs={fetchRooms} /> */}
        
      <div className="container mx-auto px-4 mt-8">
        {rooms.map(room => <RoomCard key={room._id} room={room} onRoomClick={() => {/* ... */}} />)}
      </div>
            <style jsx>{`
                /* Custom styles for specific adjustments */
                .hero::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5); /* Dark overlay for better text readability */
                }
            `}</style>
              <div className="mt-1"> {/* 5% spacing depending on the overall layout size */}</div>
                <MembershipHero/>
            
        </div>
    );
}

export default Dashboard;
