import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './filterroom.css'
function FilterBar({ onFilter }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [maxOccupancy, setMaxOccupancy] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilter = () => {
    onFilter({ startDate, endDate, maxOccupancy, minPrice, maxPrice });
  };

  return (
    <div className="room-filter-bar flex  left-1/2  flex items-center justify-center space-x-4 bg-white p-4 rounded-lg shadow-md">
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="MM/dd/yyyy" className="date-picker" />
      <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} dateFormat="MM/dd/yyyy" className="date-picker" />
      <input type="number" placeholder="Max Occupancy" value={maxOccupancy} onChange={(e) => setMaxOccupancy(e.target.value)} className="input-field" />
      <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="input-field" />
      <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="input-field" />
      <button id='bookbut'className="focus:outline-none text-white bg-yellow-400  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900" onClick={handleFilter} >Filter</button>
    </div>
  );
}

export default FilterBar;
