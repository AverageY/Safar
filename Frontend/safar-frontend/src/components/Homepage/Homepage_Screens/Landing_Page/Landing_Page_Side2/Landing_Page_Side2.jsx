import React from 'react';
import './Landing_Page_Side2.css'
import Lottie from 'lottie-react';
import animationData from '../../../../../assets/Landing_Page_Animation.json'
import { useState } from 'react';


const Landing_Page_Side2 = ({}) => {


return(

  <div className='cont_animation right '>
    <Lottie animationData={animationData}></Lottie>

  </div>
  
)
};

export default Landing_Page_Side2;
