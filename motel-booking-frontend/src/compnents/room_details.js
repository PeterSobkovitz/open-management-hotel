// RoomDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const RoomDetail = ({ match }) => {
  const [room, setRoom] = useState(null);
  console.log(match);
  const {id:roomId} = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/rooms/${roomId}`)
      .then(response => setRoom(response.data))
      .catch(error => console.error('Error fetching room details:', error));
  }, [roomId]);

  const handleBooking = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to book a room.');
      return;
    }
  
    const bookingData = {
      roomId: room._id,
      userId: 1,
      newStartDate: 1,
      newEndDate: 1,
    };
  
    axios.post('http://localhost:3001/bookings', bookingData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => console.log('Booking successful:', response.data))
      .catch(error => console.error('Error booking room:', error));
  };

  if (!room) return <div>Loading...</div>;

  return (
    <div>
      <h2>{room.name}</h2>
      {/* other room details */}
      <button onClick={handleBooking}>Book Room</button>
    </div>
  );
};

export default RoomDetail;
