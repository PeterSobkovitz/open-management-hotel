import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './compnents/auth';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<AuthForm register={true}/>}></Route>
                <Route path="/login"element={<AuthForm register={false}/>}>
                    
                </Route>
                {/* Other routes */}
            </Routes>
        </Router>
    );
};

export default App;
