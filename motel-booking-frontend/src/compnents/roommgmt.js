import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function RoomFilterBar() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [maxOccupancy, setMaxOccupancy] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    let url = 'http:localhost:3001/rooms';
    const params = new URLSearchParams();
    if (startDate && endDate) {
      params.append('startDate', startDate.toISOString().split('T')[0]); // Format the date to YYYY-MM-DD
      params.append('endDate', endDate.toISOString().split('T')[0]); // Format the date to YYYY-MM-DD
      url = 'http://localhost:3001/rooms/filter';
    }
    if (maxOccupancy) params.maxOccupancy = maxOccupancy;
    if (minPrice && maxPrice) params.priceRange = `${minPrice},${maxPrice}`;
   
    if(Object.keys(params).length===0){
      console.log("no params")
      try {
        const response = await axios.get(url);
        setRooms(response.data);
        
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    }
    else{
      try {
      
        const response = await axios.get(url, {params:params} );
        setRooms(response.data);
        
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }

    }
    
  };

  return (
    <div className="room-filter-bar" style={{ background: 'white' }}>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      <select value={maxOccupancy} onChange={(e) => setMaxOccupancy(e.target.value)}>
        <option value="">Select Occupancy</option>
        {[1,2,3,4,5,6,7].map(num => <option key={num} value={num}>{num}</option>)}
      </select>
      <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min Price"/>
      <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max Price"/>
      <button onClick={fetchRooms} style={{ background: 'darkblue', color: 'white' }}>Search</button>
      <div>
        {rooms.map(room => (
          <div key={room._id}>
            <h3>{room.name}</h3>
            {/* Display other room details */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomFilterBar;
