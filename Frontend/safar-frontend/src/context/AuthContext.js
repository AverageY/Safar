import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Function to check if user is logged in
  const checkAuth = async () => {
    try {
      const response = await axios.get('http://localhost:4000/safar/checkAuth', { withCredentials: true });
      if (response.status === 200) {
        setIsLoggedIn(true);
        setUser(response.data.user);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Function to log in
  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:4000/safar/login', credentials, { withCredentials: true });
      if (response.status === 200) {
        setIsLoggedIn(true);
        setUser(response.data.user);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
      throw error;
    }
  };

  // Function to log out
  const logout = async () => {
    try {
      await axios.post('http://localhost:4000/safar/logout', {}, { withCredentials: true });
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
