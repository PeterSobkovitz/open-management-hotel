import React, { useState } from 'react';
import Navbar from './navbar';
import FilterBar from './roomfilter';
import RoomsGrid from './roomgrid'
function RoomsPage() {
  const [rooms, setRooms] = useState([]);

  const handleFilter = async (filters) => {
    const queryParams = new URLSearchParams({
      startDate: filters.startDate.toISOString(),
      endDate: filters.endDate.toISOString(),
      maxOccupancy: filters.maxOccupancy,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    }).toString();

    try {
      const response = await fetch(`http://localhost:3001/rooms_filter?${queryParams}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const filteredRooms = await response.json();
      setRooms(filteredRooms); // Update your state with the filtered rooms
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    }
  };

  return (
    <>
      <Navbar />
      <FilterBar onFilter={handleFilter} />
      <RoomsGrid rooms={rooms} />
    </>
  );
}

export default RoomsPage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SimpleNavbar from './simplenavbar';
// function RoomsDashboard() {
//   const [rooms, setRooms] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:3001/rooms')
//       .then(response => {
//         setRooms(response.data);
//       })
//       .catch(error => console.error('Error fetching rooms:', error));
//   }, []);

//   return (
//     <>
//     <SimpleNavbar/>
//     <div className="container mx-auto my-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {rooms.map(room => (
          
//           <div key={room._id} className="room-card bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
//             <img src={room.images[0]} alt={room.name} className="w-full h-64 object-cover rounded-t-lg"/>
         
//             <div className="p-4">
//               <h3 className="font-bold text-lg">{room.name}</h3>
//               <p className="text-gray-600">{room.description}</p>
//               <div className="flex justify-between items-center mt-4">
//                 <span className="font-bold">${room.pricePerNight} per night</span>
//                 <button className="bg-blue-500 text-white rounded px-4 py-2">Book Now</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//     </>
//   );
// }

// export default RoomsDashboard;
