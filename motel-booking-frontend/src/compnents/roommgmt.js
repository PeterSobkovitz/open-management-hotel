import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useNavigate} from 'react-router-dom';
function RoomFilterBar() {
  const navigate=useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [maxOccupancy, setMaxOccupancy] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rooms, setRooms] = useState([]);

  const handleRoomClick = (roomId) => {
    navigate(`/rooms/${roomId}?startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`);
  };

  const fetchRooms = async () => {
    let url = 'http:localhost:3001/rooms';
    const params = new URLSearchParams();
    if (startDate && endDate) {
      params.append('startDate', startDate.toISOString().split('T')[0]); // Format the date to YYYY-MM-DD
      params.append('endDate', endDate.toISOString().split('T')[0]); // Format the date to YYYY-MM-DD
      url = 'http://localhost:3001/rooms_filter';
    }
    if (maxOccupancy) params.maxOccupancy = maxOccupancy;
    if (minPrice && maxPrice) params.priceRange = `${minPrice},${maxPrice}`;
    const params1={"startDate":'2024-01-17',"endDate":'2024-01-25','maxOccupancy':2,'minPrice':100,maxPrice:500}

    if(Object.keys(params1).length===0){
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
        
        console.log(params)
        const response = await axios.get(url, {params:params1} );
        
        setRooms(response.data);
        
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }

    }
    
  };

  return (
    <div className="room-filter-bar"  style={{ background: 'white' }}>
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
          
          <div key={room._id} onClick={()=>handleRoomClick(room._id)} className="room-card bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
            <img src={room.images[0]} alt={room.name} className="w-full h-64 object-cover rounded-t-lg"/>
         
            <div className="p-4">
              <h3 className="font-bold text-lg">{room.name}</h3>
              <p className="text-gray-600">{room.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold">${room.pricePerNight} per night</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomFilterBar;
