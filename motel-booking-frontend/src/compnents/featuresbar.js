import React from 'react';

function FeaturesBar() {
    const featureContainerStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    };

    const iconStyles = {
        background: 'darkgoldenrod',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '10px', // Add some space between the icon and the text
    };

    const featureStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        height: '100%',
        width: '33.33%',
        color: 'white',
        fontSize: '1rem',
    };

    return (
        <div style={{ width: '100%', height: '8vh', backgroundColor: '#4a392b', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ ...featureStyles }}>
                <div style={{ ...iconStyles }}>🏰</div>
                <h1>Historical Palace</h1>
            </div>
            <div style={{ ...featureStyles }}>
                <div style={{ ...iconStyles }}>$</div>
                <h1>Affordable Luxury</h1>
            </div>
            <div style={{ ...featureStyles }}>
                <div style={{ ...iconStyles }}>🦋</div>
                <h1>Spa at Your Service</h1>
            </div>
        </div>
    );
}

export default FeaturesBar;
