import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FeaturedRooms() {
    const [rooms, setRooms] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/rooms?limit=3') // Fetch 3 random rooms
            .then(response => response.json())
            .then(data => setRooms(data))
            .catch(error => console.error("There was an error fetching the rooms: ", error));
    }, []);

    return (
        <div className="featured-rooms" style={{ height: '40vh', backgroundColor: 'white' }}>
            <h1 style={{ textAlign: 'center', marginTop: '5%' }}>Rooms</h1>
            <div className="room-images" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2%' }}>
                {rooms.map((room, index) => (
                    <div key={index} className="room" style={{ width: '25%', position: 'relative' }}>
                        <img src={room.images[0]} alt={room.name} style={{ width: '100%', height: '100%' }} />
                        <div className="overlay" style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            right: '0',
                            bottom: '0',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <p style={{ marginTop: '15%' }}>{room.price} per night</p>
                            <p>{room.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button
                style={{ 
                    display: 'block',
                    margin: '20px auto',
                    backgroundColor: 'darkbrown',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '20px',
                    cursor: 'pointer'
                }}
                onClick={() => history.push('/rooms')}
            >
                View All Rooms
            </button>
        </div>
    );
}

export default FeaturedRooms;
