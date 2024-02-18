import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
function RoomCard({ room, onRoomClick }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigate=useNavigate();
  const handleRoomClick = (roomId) => {
    navigate(`/rooms/${roomId}?startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`);
  };

  return (
    <div onClick={() => handleRoomClick(room._id)} className="room-card bg-white rounded-lg shadow hover:shadow-lg transition duration-300 cursor-pointer">
      <img src={room.images[0]} alt={room.name} className="w-full h-64 object-cover rounded-t-lg"/>
      <div className="p-4">
        <h3 className="font-bold text-lg">{room.name}</h3>
        <p className="text-gray-600">{room.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold">${room.pricePerNight} per night</span>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
