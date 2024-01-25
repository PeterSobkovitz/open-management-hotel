import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './compnents/dashboard';
import Register from './compnents/register';
import {AuthProvider} from './compnents/authContext';
import RoomsDashboard from './compnents/rooms'; // Correct path as necessary

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'tailwindcss/tailwind.css';
const App = () => {
    // const [isLoggedIn,setIsLoggedIn]=useState(false);
    // useEffect(()=>{
    //     const token=localStorage.getItem('token');
    //     if (token){
    //         setIsLoggedIn(true);
    //     }
    // },[])
    return (
        <AuthProvider>
        <Router>
            <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/rooms" element={<RoomsDashboard/>}></Route>

            
            </Routes>
        </Router>
        </AuthProvider>
    );
};

export default App;
