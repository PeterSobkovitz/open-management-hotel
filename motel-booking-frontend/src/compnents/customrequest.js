import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './authContext'; // Assuming this context provides access to the auth token

function ServiceRequestForm() {
  const { token } = useContext(AuthContext); // Use the token for authorization in the request
  const [requestDetails, setRequestDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await axios.post('http://yourapi.com/service-requests', 
        { requestDetails },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess('Service request submitted successfully.');
      setRequestDetails(''); // Reset form
    } catch (err) {
      console.error('Error submitting service request:', err);
      setError('Failed to submit service request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Submit a Service Request</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="requestDetails">Request Details:</label>
        <textarea
          id="requestDetails"
          value={requestDetails}
          onChange={(e) => setRequestDetails(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
}

export default ServiceRequestForm;
