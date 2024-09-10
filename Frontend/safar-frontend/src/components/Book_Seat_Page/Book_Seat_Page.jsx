/* global google */

import React, { useRef, useEffect, useState } from 'react';
import { useJsApiLoader, GoogleMap, Autocomplete, DirectionsRenderer, MarkerF } from '@react-google-maps/api';
import Seat_Selector from '../Seat_Selector/Seat_Selector';
import Seat_Selector_Suv from '../Seat_Selector_Suv/Seat_Selector_Suv';
import './Book_Seat_Page.css'

import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';

import Axios from 'axios';

const Book_Seat_Page = ({selectSeat, setSelectSeat}) => {
  const  [text, setText]=useState(false)
  const center = { lat: 28.584, lng: 77.2945 };
  const { tripId } = useParams();
  const { tripCabtype } = useParams();
  console.log(tripCabtype)
  console.log(tripId)
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
  const [destinationCoords, setDestinationCoords] = useState(null);

 

  const autocompleteOriginRef = useRef(null);
  const autocompleteDestinationRef = useRef(null);

  const mapOptions = {
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false
};

   
  const onMapClick = useCallback((event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    console.log(newPosition)
    setMarkerPosition(newPosition);
    localStorage.setItem('markerPosition', JSON.stringify(newPosition));
  }, [isLoaded, map]);

  
  async function BookSeat(e) {
    
    

    e.preventDefault();
    /*
      
       tripSeat: 'SEAT1',
      }, { withCredentials: true });
      console.log(response)
      console.log(response.status)
     */
        setText(true)
    
    
  }

  

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!google || !google.maps) {
    console.error('Google Maps API not loaded');
    return;
  }

  return (
    <div className='map_seat_box row '>
      <p>hello</p>
   <motion.div initial={{ x: -500 }} animate={{ x: 0 }} transition={{ duration: 1.3 }} className='col-lg-6'>
        <GoogleMap
          center={center}
          zoom={14}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          onLoad={(map) => setMap(map)}
          onClick={onMapClick}
          options={mapOptions}
        >
          {markerPosition && <MarkerF position={markerPosition}></MarkerF>}
        </GoogleMap>
      </motion.div>
      <div className='col-lg-6' style={{ padding: '20px' }}>

        <div className='row'>
          {tripCabtype === 'SEDAN' && <Seat_Selector selectSeat={selectSeat} setSelectSeat={setSelectSeat}/>}
          {tripCabtype === 'SUV' && <Seat_Selector_Suv/>}
        </div>
        <button onClick={BookSeat} > Book Seat </button>
        {text && <p> Your Seat is Booked</p>}
      </div> 
  
    </div>
  );
};



export default Book_Seat_Page;
