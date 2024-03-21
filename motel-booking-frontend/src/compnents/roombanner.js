import React from 'react';
import { useNavigate } from 'react-router-dom';
import concierge from '../images/concierge.png';
function RelaxationBanner() {
    const navigate = useNavigate();

    const bannerStyles = {
        backgroundImage: `url(${concierge})`, // Replace 'Your-Photo-URL-Here' with your actual photo URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '60vh', // Adjust the height as needed
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white', // Assuming the text should be white for contrast against a likely dark photo background
        gap: '20px', // Adjust the space between elements as needed
    };

    const mainTextStyles = {
        fontSize: '2.5rem', // Big font size for the main text
        fontWeight: 'bold',
    };

    const secondaryTextStyles = {
        fontSize: '1.5rem', // Smaller font size for the secondary text
    };

    const buttonStyles = {
        backgroundColor: 'white', // White button background
        color: 'black', // Black text on the button
        border: 'none',
        padding: '10px 20px',
        borderRadius: '25px', // Rounded edges for the button
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
    };

    return (
        <div style={bannerStyles}>
            <div style={mainTextStyles}>It's time for relaxation</div>
            <div style={secondaryTextStyles}>Your paradise vacation in just a few minutes</div>
            <button style={buttonStyles} onClick={() => navigate('/rooms')}>
                Book now
            </button>
        </div>
    );
}

export default RelaxationBanner;
