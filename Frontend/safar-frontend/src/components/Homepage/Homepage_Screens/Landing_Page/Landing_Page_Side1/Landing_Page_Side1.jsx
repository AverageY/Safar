/* global google */
import React from 'react';
import './Landing_Page_Side1.css'
import logo_light_theme from '../../../../../assets/logo-light-theme.png'
import { easeOut, motion } from 'framer-motion';
import { useJsApiLoader, GoogleMap, Autocomplete, DirectionsRenderer, MarkerF } from '@react-google-maps/api';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';





const Landing_Page_Side1 = () => {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_TOKEN,
    libraries: ['places'],
  });
  const navigate = useNavigate();
  const url='https://safar-ffzg.onrender.com/trip/search'
  const autocompleteOriginRef = useRef(null);
  const autocompleteDestinationRef = useRef(null);
  const originRef = useRef(null);
  const destinationRef = useRef(null);
  const [searchData, setSearchData]=useState({
    origin: '',
    destination: '',
    tripDate: '',
    tripDeparturetime: '',
  })


  const handleInputChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.id]: e.target.value,
    });
    console.log(searchData)
  };


  useEffect(() => {
    if (isLoaded) {
      const autocompleteOrigin = autocompleteOriginRef.current;
      const autocompleteDestination = autocompleteDestinationRef.current;

      if (autocompleteOrigin) {
        autocompleteOrigin.addListener('place_changed', () => {
          const place = autocompleteOrigin.getPlace();
          if (place.geometry) {
           console.log(place);
          }
        });
      }

      if (autocompleteDestination) {
        autocompleteDestination.addListener('place_changed', () => {
          const place = autocompleteDestination.getPlace();
          if (place.geometry) {
            console.log(place)
          }
        });
      }
    }

    
  }, [isLoaded]);


  async function searchCab(e) {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    const destinationLocation = results.routes[0].legs[0].end_location;
    const destinationLatLng = {
      lat: destinationLocation.lat(),
      lng: destinationLocation.lng(),
    };

    const originLocation = results.routes[0].legs[0].start_location;
    const originLatLng = {
      lat: originLocation.lat(),
      lng: originLocation.lng(),
    };
    console.log(originLatLng)
    console.log(destinationLatLng)
    const travel_Date = parseInt(searchData.tripDate.replace(/-/g, ''))
    e.preventDefault();
    try {
      const response = await Axios.post(url, {
        trippickup: originLatLng,
        tripdrop: destinationLatLng,
        tripDeparturetime: searchData.tripDeparturetime,
        tripDate: travel_Date,
      }, { withCredentials: true });
      console.log(travel_Date)
      console.log(searchData.tripDeparturetime)
      console.log(response)
      if (response.status === 200) {
        navigate('/search', {state:{trips: response.data}});
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }

    
  }


  

return(

  <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:5, ease: easeOut}} className='left'>
    <div className="row ">
      <p className='search_heading'> Search Cabs</p>
    </div>
    <div className='row'>
      <p>An Online Platform to Book, Add, Share a Cab at Minnimum Prices</p>
    </div>
    <div className='row'>
      <div className='col-lg-6'>
      <Autocomplete>
      <input className='mapinput' id="origin" placeholder='Origin' value={searchData.origin} onChange={handleInputChange} ref={originRef}></input>
      </Autocomplete>
      </div>
      <div className='col-lg-6'>
      <Autocomplete>
      <input className='mapinput' id="destination" placeholder='Destination' value={searchData.destination} onChange={handleInputChange} ref={destinationRef}></input>
      </Autocomplete>
      </div>
     </div> 
     <div className='row'>
      <div className='col-lg-6'>
      <input type='date' id="tripDate" value={searchData.tripDate} onChange={handleInputChange} className='mapinput'></input>
      </div>
      <div className='col-lg-6'>
      <input type= 'time' id="tripDeparturetime" value={searchData.tripDeparturetime} onChange={handleInputChange} className='mapinput'></input>
      </div>
    </div>
      <button onClick={searchCab} className='search_button'>
        Search
      </button>

  

  </motion.div>
)
};

export default Landing_Page_Side1;
