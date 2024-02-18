import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import RoomCard  from './roomcard';
import './filterroom.css';
import {useNavigate} from 'react-router-dom';
function RoomFilterBar({subs}) {
  const navigate=useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [maxOccupancy, setMaxOccupancy] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  

  const handleRoomClick = (roomId) => {
    navigate(`/rooms/${roomId}?startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`);
  };
  const handleSubmit=()=>{
    const filterCriteria = {
      startDate: startDate && startDate.toISOString().split('T')[0],
      endDate: endDate && endDate.toISOString().split('T')[0],
      maxOccupancy: maxOccupancy,
      minPrice: minPrice,
      maxPrice: maxPrice
    };
  

    // Call the onSearch function, passing it the filter criteria
   subs(filterCriteria);
  }
  
  return (

    <div className="room-filter-bar absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center space-x-4 bg-white p-4 rounded-lg shadow-md">
            <DatePicker className="p-2 border rounded" selected={startDate} onChange={(date) => setStartDate(date)} />
            <DatePicker className="p-2 border rounded" selected={endDate} onChange={(date) => setEndDate(date)} />
            <select className="p-2 border rounded" value={maxOccupancy} onChange={(e) => setMaxOccupancy(e.target.value)}>
                <option value="">Occupancy</option>
                {[1,2,3,4,5,6,7].map(num => <option key={num} value={num}>{num}</option>)}
            </select>
            <input className="p-2 border rounded" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min Price"/>
            <input className="p-2 border rounded" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max Price"/>
            <button className="bg-darkblue text-blue p-2 rounded" onClick={handleSubmit}>Search</button>
        </div>
  );
}

export default RoomFilterBar;
