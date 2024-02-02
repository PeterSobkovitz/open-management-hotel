import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './authContext'; // Assume this context provides the logged-in user's info

function SubmitReview({ bookings }) { // Accept bookings as a prop

  const [selectedBookingId, setSelectedBookingId] = useState(bookings.length > 0 ? bookings[0]._id : ''); // Default to the first booking's ID
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [type, setType] = useState('review');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    if (!token) {
      alert('You need to be logged in to submit a review.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/reviews', {
        booking: selectedBookingId, // Use the selected booking ID
        rating,
        comment,
        type,
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit a Review</h2>
      <div>
        <label>Booking:</label>
        <select value={selectedBookingId} onChange={e => setSelectedBookingId(e.target.value)}>
          {bookings.map(booking => (
            <option key={booking._id} value={booking._id}>{booking.name /* Assume each booking has a name or similar identifier */}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Rating:</label>
        <select value={rating} onChange={e => setRating(e.target.value)}>
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Comment:</label>
        <textarea value={comment} onChange={e => setComment(e.target.value)}></textarea>
      </div>
      <div>
        <label>Type:</label>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="review">Review</option>
          <option value="feedback">Feedback</option>
        </select>
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default SubmitReview;
