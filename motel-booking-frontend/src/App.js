import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './compnents/dashboard';
import Register from './compnents/register';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'tailwindcss/tailwind.css';
const App = () => {
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    useEffect(()=>{
        const token=localStorage.getItem('token');
        if (token){
            setIsLoggedIn(true);
        }
    },[])
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Dashboard isLoggedIn={isLoggedIn} />} />
            <Route path="/register" element={<Register/>}/>

                {/* <Route path="/register" element={<AuthForm register={true}/>}></Route>
                <Route path="/login"element={<AuthForm register={false}/>}>
                 */}
                    
                {/* </Route> */}
                {/* Other routes */}
            </Routes>
        </Router>
    );
};

export default App;
