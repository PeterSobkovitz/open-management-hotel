// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || '');

 
  useEffect(() => {
   
    
    setIsLoggedIn(!!token);
    setUserRole(userRole);
    setToken(token);

    
  }, [token]);
  useEffect(() => {
    console.log("Updated role:", userRole);
  }, [userRole]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn,userRole,setUserRole,token }}>
      {children}
    </AuthContext.Provider>
  );
};
