import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './authContext';
function RoomsGrid({ rooms }) {
  const { isLoggedIn, userId } = useContext(AuthContext); // Assuming your AuthContext provides these
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  console.log(token);
  console.log("!@!!!!!!!!!!!!!!!!!!!!!!!!!!")
  const bookRoom = async (roomId) => {
    if (!isLoggedIn) {
      navigate('/register'); // Redirect non-logged-in users to the register page
      return;
    }
    const bookingDetails = {
        roomId,
        userId,
        newStartDate: new Date().toISOString(), // Placeholder start date. You should get these dates from the user.
        newEndDate: new Date().toISOString(), // Placeholder end date. Adjust accordingly.
      };
      try {
        const response = await fetch('http://localhost:3001/bookings', { // Adjust your API endpoint as needed
          method: 'POST',
          
            headers:{'Authorization':`Bearer ${token}`},
            // Add any required headers, like an Authorization token
          
          body: JSON.stringify(bookingDetails),
        });
  
        if (!response.ok) {
          throw new Error('Booking failed');
        }
  
        alert('Room booked successfully!');
        // Handle success (e.g., show a confirmation message)
      } catch (error) {
        console.error('Failed to book the room:', error);
        // Handle error (e.g., show an error message)
      }
    };
    return (
        <div style={styles.gridContainer}>
        {rooms.map((room, index) => (
          <div key={index} style={styles.roomCard}>
            <img src={room.images[0]} alt={room.name} style={styles.image} />
            <div style={styles.roomDetails}>
              <h2 style={styles.roomName}>{room.name}</h2>
              <p style={styles.price}>${room.pricePerNight} per night</p>
              <div style={styles.amenities}>
                {room.amenities.map((amenity, index) => (
                  <span key={index} style={styles.amenity}>{amenity}</span>
                ))}
              </div>
              <button style={styles.bookNowButton} onClick={() => bookRoom(room._id)}>Book Now</button>
            </div>
          </div>
        ))}
      </div>
  );
}

const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
  roomCard: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  roomDetails: {
    padding: '15px',
    backgroundColor: 'lightgray',
  },
  roomName: {
    margin: '0',
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  price: {
    margin: '10px 0',
    fontSize: '1rem',
  },
  amenities: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  amenity: {
    fontSize: '0.875rem',
    backgroundColor: '#eeeeee',
    borderRadius: '15px',
    padding: '5px 10px',
  },
  bookNowButton: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    textAlign: 'center',
    display: 'block',
    width: '100%',
  }
};

export default RoomsGrid;
