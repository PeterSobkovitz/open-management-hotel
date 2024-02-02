import React, { useState, useContext } from 'react';
import axios from 'axios';

function RequestForm() {
  
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:3001/inquiries', // Your API endpoint
        { subject, message}, // Assuming the backend needs user ID; remove if not
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the auth token in the request
            'Content-Type': 'application/json'
          }
        }
      );
      setSuccessMessage('Inquiry submitted successfully!');
      // Clear form fields
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setError('Failed to submit inquiry. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>
      <h2>Submit an Inquiry</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </form>
    </div>
  );
}

export default InquiryForm;
