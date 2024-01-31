import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditReview() {
    const { reviewId } = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState({ comment: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch review data here
    }, [reviewId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Make API call to update the review
            navigate('/reviews');
        } catch (error) {
            setError('Failed to update the review.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Review</h2>
            <textarea 
                value={review.comment} 
                onChange={(e) => setReview({ ...review, comment: e.target.value })} 
            />
            <button type="submit">Update Review</button>
        </form>
    );
}

export default EditReview;
