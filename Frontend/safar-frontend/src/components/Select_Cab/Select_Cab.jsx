
import React, { useEffect, useState, useContext } from 'react';
import './Select_Cab.css'
import Axios from 'axios'
import animationData from '../../assets/sedan_animation.json'
import Lottie from 'lottie-react';
const Select_Cab = (props)=>{
  const [showConfirm, setShowConfirm]=useState(false)

 async function handleSelectCar(){
    setShowConfirm(true)
 }
  

    


  return (
    <div>
    <div className='selectCabbox row'>
        <div className='col-lg-6'>
          <Lottie animationData={animationData}></Lottie>
        </div>
        <div className='col-lg-6' >
        <label>Car Number: {props.cabNumber} </label>
      <label>Car Name: {props.cabName}</label>
      <label>Car Type:{props.cabType} </label>
      <label>Car Color:{props.cabColor} </label>
      <button onClick={handleSelectCar} >Select Car</button>
      {showConfirm && <p>You have Accepted this Cab</p>}
        </div>
     
    </div>
    </div>
  )
}

export default Select_Cab