import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RoomsDashboard() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch rooms from your API
    axios.get('http://localhost:3001/rooms')
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => console.error('Error fetching rooms:', error));
  }, []);

  return (
    <div className="container mx-auto my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => (
          <div key={room._id} className="room-card">
            <img src={room.imageUrl} alt={room.name} className="w-full h-64 object-cover"/>
            <div className="p-4">
              <h3 className="font-bold text-lg">{room.name}</h3>
              <p>{room.description}</p>
              {/* More room details */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomsDashboard;
