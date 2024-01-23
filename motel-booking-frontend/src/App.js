import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './compnents/auth';
import Dashboard from './compnents/dashboard';
import Register from './compnents/register';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'tailwindcss/tailwind.css';
const App = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Dashboard />} />
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
