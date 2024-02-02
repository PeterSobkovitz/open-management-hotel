import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from './authContext';
import LoadingSpinner from './LoadingSpinner'; // Import a loading spinner component
import ErrorAlert from './ErrorAlert'; // Import an error alert component
import SubmitReview from './createreview';
function ReviewManagement() {
 
    const token = localStorage.getItem('token');
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [bookings, setBookings] = useState([]);
    const [showSubmitForm, setShowSubmitForm] = useState(false); // State to control the visibility of the SubmitReview form
    useEffect(() => {
        fetchReviewsAndBookings();
        console.log(reviews);
    }, []);

    const fetchReviewsAndBookings = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://localhost:3001/reviews/user`, {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            setReviews(response.data);
            console.log(reviews);
            const bookingsResponse = await axios.get(`http://localhost:3001/bookings/user`, {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            setBookings(bookingsResponse.data);
        } catch (error) {
            setError('Failed to fetch data.');
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (reviewId) => {
        if (!window.confirm('Are you sure you want to delete this review?')) {
            return;
        }
        try {
            await axios.delete(`http://localhost:3001/reviews/${reviewId}`);
            setReviews(reviews.filter(review => review._id !== reviewId));
        } catch (error) {
            setError('Failed to delete review.');
            console.error('Error deleting review:', error);
        }
    };
    const toggleSubmitForm = () => {
        setShowSubmitForm(!showSubmitForm);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorAlert message={error} />;
    }

    return (
        <div>
            <h2>Your Reviews</h2>
            {bookings.length > 0 ? (
                <>
                    <button onClick={() => setShowSubmitForm(!showSubmitForm)}>
                        {showSubmitForm ? 'Hide Review Form' : 'Submit New Review'}
                    </button>
                    {showSubmitForm && <SubmitReview bookings={bookings} onReviewSubmitted={fetchReviewsAndBookings} />}
                </>
            ) : (
                <p>You have no bookings to review.</p>
            )}
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <div key={review._id} className="review-card">
                        <h3>{review.booking.room}</h3>
                        <p>{review.comment}</p>
                        <div>
                            <button onClick={() => handleDelete(review._id)}>Delete</button>
                            <Link to={`/edit-review/${review._id}`}>Edit</Link>
                        </div>
                    </div>
                ))
            ) : (
                <p>You have no reviews yet.</p>
            )}
        </div>
    );
}

export default ReviewManagement;
