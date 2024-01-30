import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './compnents/dashboard';
import Register from './compnents/register';
import {AuthProvider} from './compnents/authContext';
import RoomsDashboard from './compnents/rooms'; // Correct path as necessary
import RoomManagementBar from './compnents/roommgmt';
import RoomDetail from './compnents/room_details';
import ManageBookings from './compnents/bookings';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'tailwindcss/tailwind.css';
const App = () => {

    return (
        <AuthProvider>
        <Router>
            <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/rooms" element={<RoomsDashboard/>}></Route>
            <Route path="/rooms/:id" element={<RoomDetail/>}></Route>
            <Route path="/booking_list" element={<ManageBookings/>}></Route>
            </Routes>
        </Router>
        </AuthProvider>
    );
};

export default App;
