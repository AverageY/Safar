/* global google */

import React, { useRef, useEffect, useState } from 'react';
import { useJsApiLoader, GoogleMap, Autocomplete, DirectionsRenderer, Marker } from '@react-google-maps/api';
import { Button } from 'react-bootstrap';
import './Ride_Page.css';
import Lottie from 'lottie-react';
import sedan_animation from '../../../../assets/sedan_animation.json';
import suv_animation from '../../../../assets/suv_animation.json';
import { FaCircleInfo } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import Seat_Selector from '../../../Seat_Selector/Seat_Selector';
import Seat_Selector_Suv from '../../../Seat_Selector_Suv/Seat_Selector_Suv';

const center = { lat: 28.584, lng: 77.2945 };

const Ride_Page = () => {
  const [seatSelection, setSeatSelection] = useState('');
  const [infoPopUpSedan, setInfoPopUpSedan] = useState(false);
  const [infoPopUpSuv, setInfoPopUpSuv] = useState(false);
  const [carType, setCarType] = useState('option1');
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_TOKEN,
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  let results;

  const originRef = useRef(null);
  const destinationRef = useRef(null);
  const autocompleteOriginRef = useRef(null);

  useEffect(() => {
    if (isLoaded && autocompleteOriginRef.current) {
      const autocomplete = autocompleteOriginRef.current;
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          map.panTo(place.geometry.location);
          map.setZoom(14);
        }
      });
    }
  }, [isLoaded, map]);

  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    console.log(results);
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destinationRef.current.value = '';
  }

  const handleRadioChange = (value) => {
    setCarType(value);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!google || !google.maps) {
    console.error('Google Maps API not loaded');
    return;
  }

  return (
    <div className='row mapridecontainer'>
      <motion.div initial={{ x: -500 }} animate={{ x: 0 }} transition={{ duration: 1.3 }} className='col-lg-6'>
        <GoogleMap
          center={center}
          zoom={14}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </motion.div>
      <div className='col-lg-6' style={{ padding: '20px' }}>
        <div>
          <div className='col-lg-12'>
            <p className='addCabText'>Add a Cab!</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6'>
            <label>Select Your Starting Point:</label>
            <Autocomplete onLoad={(autocomplete) => (autocompleteOriginRef.current = autocomplete)}>
              <input className='mapinput' placeholder='Origin' ref={originRef}></input>
            </Autocomplete>
            <label>Select Your Destination:</label>
            <Autocomplete>
              <input className='mapinput' placeholder='Destination' ref={destinationRef}></input>
            </Autocomplete>
            <label>Select Your Departure Time:</label>
            <input className='mapinput' type='time' placeholder=''></input>
            <label>Select Your Travel Date:</label>
            <input className='mapinput' type='date' placeholder=''></input>
            <label>Distance: {distance}</label>
            <br />
            <label>Duration: {duration}</label>
            <br />
            <button onClick={calculateRoute} className='book_button'>Book</button>
          </div>
          <div className='col-lg-6'>
            <label>Select Your Preferred Car-Type:</label>
            <div className='car_selection_box'>
              <div className='row '>
                <div className='col-lg-1 input_box'>
                  <input type='radio' value='sedan' id='sedan' checked={carType === 'sedan'} onClick={() => setSeatSelection('sedan')} onChange={() => handleRadioChange('sedan')}></input>
                </div>
                <motion.div initial={{ x: -500 }} animate={{ x: 0 }} transition={{ duration: 1.3 }} className='col-lg-6'>
                  <Lottie animationData={sedan_animation}></Lottie>
                </motion.div>
                <div className='col-lg-4 info_icon_box'>
                  <FaCircleInfo className='info_icon' onMouseEnter={() => setInfoPopUpSedan(true)} onMouseLeave={() => setInfoPopUpSedan(false)}></FaCircleInfo>
                  {infoPopUpSedan && <div className='infopopup'><p className='info_text'>The maximum Co-Passengers can be 4</p><div className='infopopupinside'></div></div>}
                </div>
              </div>
              <div className='row '>
                <div className='col-lg-1 input_box'>
                  <input type='radio' value='suv' id='suv' checked={carType === 'suv'} onClick={() => setSeatSelection('suv')} onChange={() => handleRadioChange('suv')}></input>
                </div>
                <motion.div initial={{ x: -500 }} animate={{ x: 0 }} transition={{ duration: 1.3 }} className='col-lg-6'>
                  <Lottie animationData={suv_animation}></Lottie>
                </motion.div>
                <div className='col-lg-4 info_icon_box'>
                  <FaCircleInfo className='info_icon' onMouseEnter={() => setInfoPopUpSuv(true)} onMouseLeave={() => setInfoPopUpSuv(false)}></FaCircleInfo>
                  {infoPopUpSuv && <div className='infopopup'><p className='info_text'>The maximum Co-Passengers can be 6</p><div className='infopopupinside'></div></div>}
                </div>
              </div>
            </div>
            <div className='row'>
              {getSeatSelection(seatSelection)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getSeatSelection = (cartype) => {
  switch (cartype) {
    case 'sedan':
      return <Seat_Selector />;
    case 'suv':
      return <Seat_Selector_Suv />;
    default:
      return null;
  }
};

export default Ride_Page;
