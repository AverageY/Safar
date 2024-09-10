
import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import { UserContext } from '../../context/userContext';
import Select_Cab from '../Select_Cab/Select_Cab';
const Driver_Cabs = ()=>{
const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isDriver } = useContext(UserContext);

    useEffect(() => {
        const fetchCabs = async () => {
          try {
            const response = await Axios.get('https://safar-ffzg.onrender.com/driver/getcabs', { withCredentials: true });
            if (response.status === 200) {
              setCabs(response.data);
              console.log(cabs)
            }
          } catch (error) {
            setError('Error fetching cabs. Please try again later.');
            console.error('Error fetching cabs:', error);
          } finally {
            setLoading(false);
          }
        };
    
        if (isDriver === true) {
          fetchCabs();
        } else {
          setLoading(false);
        }
      }, [isDriver]);


  return (
    
    <div>
      <h1>Select Cab</h1>
      {cabs.map((cabs) => (
        <Select_Cab key={cabs.cabId}   />
      ))}
    </div>
  )
}

export default Driver_Cabs