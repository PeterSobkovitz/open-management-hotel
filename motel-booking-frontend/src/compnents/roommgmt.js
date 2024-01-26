import React, { useState,useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import axios from 'axios';
function RoomManagementBar() {
    const [allRooms, setAllRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
  
    // State for filters
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [maxOccupancy, setMaxOccupancy] = useState(1);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
  
    // Fetch all rooms on component mount
    useEffect(() => {
      axios.get('http://localhost:3001/rooms')
        .then(response => setAllRooms(response.data))
        .catch(error => console.error('Error fetching rooms:', error));
    }, []);
  
    // Function to search filtered rooms
    const searchFilteredRooms = async () => {
      try {
        const response = await axios.get('http://localhost:3001/rooms/filter', {
          params: {
            maxOccupancy,
            priceRange: `${minPrice},${maxPrice}`,
            // Include date filters if your API supports them
          }
        });
        setFilteredRooms(response.data);
      } catch (error) {
        console.error('Error fetching filtered rooms:', error);
      }
    };
  
    return (
      <div className="bg-gray-200 text-dark-blue p-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* List All Rooms */}
          <button onClick={() => setFilteredRooms(allRooms)} className="bg-white px-4 py-2 rounded shadow">
            Room List
          </button>
          {/* Date Pickers */}
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
          {/* Filters */}
          <input
            type="number"
            value={maxOccupancy}
            onChange={(e) => setMaxOccupancy(e.target.value)}
            className="border rounded p-2"
            placeholder="Max Occupancy"
          />
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border rounded p-2"
            placeholder="Min Price"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border rounded p-2"
            placeholder="Max Price"
          />
          {/* Search Button */}
          <button onClick={searchFilteredRooms} className="bg-blue-600 text-white px-4 py-2 rounded shadow">
            Search
          </button>
        </div>
        <div>
          {/* Display filtered rooms here */}
        </div>
      </div>
    );
    }
    


export default RoomManagementBar;
