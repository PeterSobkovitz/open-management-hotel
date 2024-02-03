// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');


 
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role=localStorage.getItem('role');
    
    setIsLoggedIn(!!token);
    setUserRole(role);
    
    console.log(userRole);
    
  }, []);
  useEffect(() => {
    console.log("Updated role:", userRole);
  }, [userRole]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn,userRole,setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
