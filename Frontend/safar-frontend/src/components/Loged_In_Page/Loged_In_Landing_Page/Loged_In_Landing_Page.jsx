import React, { useState, useEffect } from "react";
import './Loged_In_Landing_Page.css';
import Axios from "axios";
import Trips from "../../Trips/Trips";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion' 
const Loged_In_Landing_Page = () => {
    const [cabs, setCabs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserTrips = async () => {
            try {
                const response = await Axios.get('https://safar-ffzg.onrender.com/trip/usertrips', { withCredentials: true });
                if (response.status === 200) {
                    setCabs(response.data);
                }
            } catch (error) {
                console.error('Error fetching cabs:', error);
            }
        };

        fetchUserTrips();
    }, []);

    const handleDeleteTrip = async (tripId) => {
        try {
            const response = await Axios.delete(`https://safar-ffzg.onrender.com/trip/delete/${tripId}`, { withCredentials: true });
            if (response.status === 200) {
                setCabs(cabs.filter(trip => trip.tripId !== tripId));
            }
        } catch (error) {
            console.error('Error deleting trip:', error);
        }
    };

    const handleUpdateTrip = () => {
        // The modal handling is within the Trips component
    };

    return (
        <div className="row">
            <div className="col-lg-3">
                <motion.div initial={{ x: -500 }} animate={{ x: 0 }} transition={{ duration: 1.3 }} className="side_bar">
                    <div className="side_bar_search">
                        <p>Search a Trip</p>
                        <input className='mapinput' id="origin" placeholder="Origin" />
                        <input className='mapinput' id="destination" placeholder="Destination" />
                        <input className='mapinput' id="tripDate" type="date" />
                        <input className='mapinput' id="tripDeparturetime" type="time" />
                    </div>
                </motion.div>
            </div>
            <div className="col-lg-9">
                <p>Trips</p>
                {cabs.length > 0 ? (
                    cabs.map((trip) => (
                        <Trips
                            key={trip.tripId}
                            tripPickuplocation={trip.tripPickuplocation}
                            tripDroplocation={trip.tripDroplocation}
                            tripDeparturetime={trip.tripDeparturetime}
                            tripCabtype={trip.tripCabtype}
                            tripId={trip.tripId}
                            tripPrice={trip.tripPrice}
                            tripDate={trip.tripDate}
                            tripOtp={trip.tripOtp}
                            tripDistance={trip.tripDistance}
                            tripStatus={trip.tripStatus}
                            onDelete={handleDeleteTrip}
                            onUpdate={handleUpdateTrip}
                        />
                    ))
                ) : (
                    <p>No trips found.</p>
                )}
            </div>
        </div>
    );
}

export default Loged_In_Landing_Page;
