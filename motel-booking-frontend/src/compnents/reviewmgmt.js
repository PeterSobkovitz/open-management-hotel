import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from './authContext';
import LoadingSpinner from './LoadingSpinner'; // Import a loading spinner component
import ErrorAlert from './ErrorAlert'; // Import an error alert component

function ReviewManagement() {
 
    const token = localStorage.getItem('token');
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReviews = async () => {
         
            setError('');
            try {
                 await axios.get(`http://localhost:3001/reviews/user`,{
                    headers: { 'Authorization': `Bearer ${token}` }
                  })
                .then(response => setReviews(response.data))
                
            } catch (error) {
                setError('Failed to fetch reviews.');
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    });

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

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorAlert message={error} />;
    }

    return (
        <div>
            <h2>Your Reviews</h2>
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <div key={review._id} className="review-card">
                        <h3>{review.room.name}</h3>
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
