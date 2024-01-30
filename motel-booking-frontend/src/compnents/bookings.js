import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { jwtDecode } from "jwt-decode";
function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem('token');
  const [tempStartDate, setTempStartDate] = useState(null);
  const [tempEndDate, setTempEndDate] = useState(null);
  const [activeBookingId, setActiveBookingId] = useState(null);

  const initiateModifyBooking = (bookingId, startDate, endDate) => {
    setTempStartDate(new Date(startDate));
    setTempEndDate(new Date(endDate));
    setActiveBookingId(bookingId);
  };

  const confirmModifyBooking = () => {
    if(activeBookingId) {
      handleModifyBooking(activeBookingId, tempStartDate, tempEndDate);
      setActiveBookingId(null); // Reset after modification
    }
  };
  
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
      console.log(bookingId);
      await axios.patch(`http://localhost:3001/bookings/${bookingId}/cancel`,{},{
        headers:{'Authorization':`Bearer ${token}`}
      });
      setBookings(bookings.filter(booking => booking._id !== bookingId));

    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const handleModifyBooking = async (bookingId, newStartDate, newEndDate) => {
    try {
      await axios.patch(`http://localhost:3001/bookings/${bookingId}`, {
        newStartDate,
        newEndDate
      },{
        headers:{'Authorization':`Bearer ${token}`}
      });
      setBookings(currentBookings => currentBookings.map(booking => {
        if (booking._id === bookingId) {
          // Update the specific booking with new dates
          return { ...booking, startDate: newStartDate.toISOString().split('T')[0], endDate: newEndDate.toISOString().split('T')[0] };
        }
        return booking;
      }));
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
          <button onClick={() => initiateModifyBooking(booking._id, booking.startDate, booking.endDate)}>
            Change Dates
          </button>
          <DatePicker
            selected={tempStartDate}
            onChange={(date) => setTempStartDate(date)}
            showTimeSelect
          />
          <DatePicker
            selected={tempEndDate}
            onChange={(date) => setTempEndDate(date)}
            showTimeSelect
          />
          {activeBookingId === booking._id && (
            <button onClick={confirmModifyBooking}>Confirm Modification</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default ManageBookings;
