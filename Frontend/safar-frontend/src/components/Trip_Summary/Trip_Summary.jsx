/* global google */
import React, { useState, useEffect } from "react";
import './Trip_Summary.css';
import { motion } from 'framer-motion';
import { useJsApiLoader, GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { useLocation } from "react-router-dom";

const Trip_Summary = (props) => {
  const location = useLocation();
  const trip = location.state?.trip || [];
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const center = { lat: 28.584, lng: 77.2945 };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_TOKEN,
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const origin = trip.tripPickuplocation;
  const destination = trip.tripDroplocation;

  const formatDate = (date) => {
    const dateString = date.toString();
    if (dateString.length !== 8) return dateString;
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}/${month}/${day}`;
  };


  useEffect(() => {
    if (origin && destination) {
      const directionsService = new window.google.maps.DirectionsService();
      console.log(trip.tripStatus)
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [origin, destination]);

  return (
    <div className="trip_summary row">
      <div className="col-lg-6">
        <motion.div initial={{ x: -500 }} animate={{ x: 0 }} transition={{ duration: 1.3 }}>
          {isLoaded ? (
            <GoogleMap
              center={center}
              zoom={14}
              mapContainerStyle={{ width: '100%', height: '400px' }}
              onLoad={(map) => setMap(map)}
            >
              {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
            </GoogleMap>
          ) : (
            <div>Loading...</div>
          )}
        </motion.div>
      </div>
      <div className="col-lg-6">
        <h1>Trip Summary:</h1>
        <label>Origin: {trip.tripPickuplocation}</label><br />
        <label>Destination: {trip.tripDroplocation}</label><br />
        <label>Trip Status: {trip.tripStatus ? 'Accepted' : 'Not Accepted'}</label><br />
        <label>Departure Time: {trip.tripDeparturetime}</label><br />
        <label>Travel Date: {formatDate(trip.tripDate)}</label><br />
        <label>Trip OTP: {trip.tripOtp}</label><br />
        <label>Trip Distance: {trip.tripDistance}</label>
      </div>
    </div>
  );
};

export default Trip_Summary;
