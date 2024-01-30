
import queryString from 'query-string';
// RoomDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
const RoomDetail = () => {
  const { id } = useParams();
  const roomId=id;
  const { search } = useLocation();
  const {startDate,endDate} = queryString.parse(search);
  const [bookingStartDate, setBookingStartDate] = useState(new Date(startDate || new Date()));
  const [bookingEndDate, setBookingEndDate] = useState(new Date(endDate || new Date()));

 
  const [room, setRoom] = useState(null);

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
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    const bookingData = {
      roomId: room._id,
      userId:userId,
      newStartDate: bookingStartDate.toISOString().split('T')[0],
      newEndDate: bookingEndDate.toISOString().split('T')[0],
    };

    axios.post('http://localhost:3001/bookings', bookingData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => console.log('Booking successful:', response.data))
      .catch(error => console.error('Error booking room:', error));
  };
  console.log(room);

  if (!room) return <div>Loading...</div>;

  return (
    <div>
      <h2>{room.name}</h2>
      {/* other room details */}
      <DatePicker selected={bookingStartDate} onChange={(date) => setBookingStartDate(date)} />
      <DatePicker selected={bookingEndDate} onChange={(date) => setBookingEndDate(date)} />
      <button onClick={handleBooking}>Book Room</button>
    </div>
  );
};

export default RoomDetail;
