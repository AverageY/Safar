import React from "react";
import driver_passenger_image from '../../../../../assets/driver-pasenger-image.jpg'
import './Signup_Page_SideL.css'
import { easeOut, motion } from 'framer-motion';
const Signup_Page_SideL = ()=>{
    return (
        <div  style = {{width: '100%', height: '100%'}}>
          <img src={driver_passenger_image} className = 'driverimage' style={{width: '100%', height: '100%'}}></img>
        </div>
    )
}

export default Signup_Page_SideL