/* global google */
import React from 'react';
import './Landing_Page_Side1.css'
import logo_light_theme from '../../../../../assets/logo-light-theme.png'
import { easeOut, motion } from 'framer-motion';
import { Autocomplete } from '@react-google-maps/api';

const Landing_Page_Side1 = () => {

return(

  <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:5, ease: easeOut}} className='left'>
    <div className="row ">
      <p className='search_heading'> Search Cabs</p>
    </div>
    <div className='row'>
      <p>An Online Platform to Book, Add, Share a Cab at Minnimum Prices</p>
    </div>
    <div className='row'>
      <Autocomplete>
      <input className='mapinput'></input>
      </Autocomplete>
      <Autocomplete>
      <input className='mapinput'></input>
      </Autocomplete>
    </div>
      <button className='search_button'>
        Search
      </button>

  

  </motion.div>
)
};

export default Landing_Page_Side1;
