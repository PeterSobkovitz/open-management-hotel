import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { jwtDecode } from "jwt-decode";
function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem('token');
  
  console.log(token);
  useEffect(() => {
    axios.get('http://localhost:3001/bookings/user', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => setBookings(response.data))
      .catch(error => console.error('Error fetching bookings:', error));
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.patch(`http://localhost:3001/bookings/${bookingId}/cancel`);
      // Update the bookings state to reflect the cancellation
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const handleModifyBooking = async (bookingId, newStartDate, newEndDate) => {
    try {
      await axios.patch(`http://localhost:3001/bookings/${bookingId}`, {
        newStartDate,
        newEndDate
      });
      // Update the bookings state to reflect the modification
    } catch (error) {
      console.error('Error modifying booking:', error);
    }
  };

  return (
    <div>
      {bookings.map(booking => (
        <div key={booking._id}>
          <h3>Booking for {booking.room.name}</h3>
          <p>From: {booking.startDate} To: {booking.endDate}</p>
          <button onClick={() => handleCancelBooking(booking._id)}>Cancel Booking</button>
          <DatePicker
            selected={new Date(booking.startDate)}
            onChange={(date) => handleModifyBooking(booking._id, date, booking.endDate)}
          />
          <DatePicker
            selected={new Date(booking.endDate)}
            onChange={(date) => handleModifyBooking(booking._id, booking.startDate, date)}
          />
        </div>
      ))}
    </div>
  );
}

export default ManageBookings;
