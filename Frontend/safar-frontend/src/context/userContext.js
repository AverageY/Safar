import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isDriver, setDriver] = useState(false);

  // Function to fetch user data and update the state
  const fetchUserData = async () => {
    try {
      const response = await Axios.get('https://safar-ffzg.onrender.com/user', { withCredentials: true });
      console.log(response);

      if (response.status === 200) {
       if(response.data.userType === 'Driver'){
          setDriver(true)
       }else{
          setDriver(false)
       }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ isDriver, setDriver }}>
      {children}
    </UserContext.Provider>
  );
};
