/* global google */

import React, { useRef, useEffect, useState } from 'react';
import { useJsApiLoader, GoogleMap, Autocomplete, DirectionsRenderer, MarkerF } from '@react-google-maps/api';
import { Button } from 'react-bootstrap';
import './Ride_Page.css';
import Lottie from 'lottie-react';
import sedan_animation from '../../../../assets/sedan_animation.json';
import suv_animation from '../../../../assets/suv_animation.json';
import { FaCircleInfo } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import Seat_Selector from '../../../Seat_Selector/Seat_Selector';
import { useCallback } from 'react';
import Seat_Selector_Suv from '../../../Seat_Selector_Suv/Seat_Selector_Suv';
import Axios from 'axios';

const Ride_Page = () => {
  const url = 'http://localhost:4000/trip/add'
  const center = { lat: 28.584, lng: 77.2945 };
  const [seatSelection, setSeatSelection] = useState('');
  const [infoPopUpSedan, setInfoPopUpSedan] = useState(false);
  const [infoPopUpSuv, setInfoPopUpSuv] = useState(false);
  const [carType, setCarType] = useState('option1');
  const [markerPosition, setMarkerPosition] = useState(() => {
    const savedPosition = localStorage.getItem('markerPosition');
    return savedPosition ? JSON.parse(savedPosition) : null;
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_TOKEN,
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [destinationCoords, setDestinationCoords] = useState(null);

  const [tripData, setTripData] = useState({
    tripPickuplocation: '',
    tripPickuppoint: '',
    tripDroplocation: '',
    tripDistance: '',
    tripDeparturetime: '',
    tripDate: '',
    tripCabtype: carType,
    tripSeat: '',
  });

  const handleInputChange = (e) => {
    setTripData({
      ...tripData,
      [e.target.id]: e.target.value,
    });
    console.log(tripData)
  };

  const originRef = useRef(null);
  const destinationRef = useRef(null);
  const autocompleteOriginRef = useRef(null);
  const autocompleteDestinationRef = useRef(null);

  useEffect(() => {
    if (isLoaded) {
      const autocompleteOrigin = autocompleteOriginRef.current;
      const autocompleteDestination = autocompleteDestinationRef.current;

      if (autocompleteOrigin) {
        autocompleteOrigin.addListener('place_changed', () => {
          const place = autocompleteOrigin.getPlace();
          if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(14);
          }
        });
      }

      if (autocompleteDestination) {
        autocompleteDestination.addListener('place_changed', () => {
          const place = autocompleteDestination.getPlace();
          if (place.geometry) {
            setDestinationCoords({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            });
          }
        });
      }
    }

    const savedPosition = localStorage.getItem('markerPosition');
    if (savedPosition) {
      setMarkerPosition(JSON.parse(savedPosition));
    }
  }, [isLoaded, map]);

  const onMapClick = useCallback((event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    console.log(newPosition)
    setMarkerPosition(newPosition);
    localStorage.setItem('markerPosition', JSON.stringify(newPosition));
  }, [isLoaded, map]);

  async function calculateRoute(e) {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);

    const numericDistance = parseFloat(results.routes[0].legs[0].distance.text.replace(/[^\d.-]/g, ''));
    const travel_Date = parseInt(tripData.tripDate.replace(/-/g, ''))

    const destinationLocation = results.routes[0].legs[0].end_location;
    const destinationLatLng = {
      lat: destinationLocation.lat(),
      lng: destinationLocation.lng(),
    };
    setDestinationCoords(destinationLatLng);
    console.log(destinationLocation)
    console.log(destinationLatLng)

    e.preventDefault();
    try {
      const response = await Axios.post(url, {
        tripPickuplocation: tripData.tripPickuplocation,
        trippickup: markerPosition,
        tripDroplocation: tripData.tripDroplocation,
        tripdrop: destinationLatLng,
        tripDate: travel_Date,
        tripDistance: numericDistance,
        tripDeparturetime: tripData.tripDeparturetime,
        tripCabtype: carType,
        tripSeat: 'SEAT1',
      }, { withCredentials: true });
      console.log(response)
      if (response.status === 201) {
        console.log(response.status)
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
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
    setTripData({
      ...tripData,
      tripCabtype: value,
    });
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
          onClick={onMapClick}
        >
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
          {markerPosition && <MarkerF position={markerPosition}></MarkerF>}
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
              <input className='mapinput' onChange={handleInputChange} id="tripPickuplocation" value={tripData.tripPickuplocation} placeholder='Origin' ref={originRef}></input>
            </Autocomplete>
            <label>Select Your Destination:</label>
            <Autocomplete onLoad={(autocomplete) => (autocompleteDestinationRef.current = autocomplete)}>
              <input className='mapinput' placeholder='Destination' ref={destinationRef} onChange={handleInputChange} id="tripDroplocation" value={tripData.tripDroplocation}></input>
            </Autocomplete>
            <label>Select Your Departure Time:</label>
            <input className='mapinput' type='time' placeholder='' onChange={handleInputChange} id="tripDeparturetime" value={tripData.tripDeparturetime}></input>
            <label>Select Your Travel Date:</label>
            <input className='mapinput' type='date' placeholder='' onChange={handleInputChange} id="tripDate" value={tripData.tripDate}></input>
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
                  <input type='radio' value='SEDAN' id='SEDAN' checked={carType === 'SEDAN'} onClick={() => setSeatSelection('SEDAN')} onChange={() => handleRadioChange('SEDAN')}></input>
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
                  <input type='radio' value='SUV' id='SUV' checked={carType === 'SUV'} onClick={() => setSeatSelection('SUV')} onChange={() => handleRadioChange('SUV')}></input>
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
    case 'SEDAN':
      return <Seat_Selector />;
    case 'SUV':
      return <Seat_Selector_Suv />;
    default:
      return null;
  }
};

export default Ride_Page;
