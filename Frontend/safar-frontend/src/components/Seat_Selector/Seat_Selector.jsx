import React from 'react';
import './Seat_Selector.css'
import { SiApachecouchdb } from 'react-icons/si';
import { GiSteeringWheel } from 'react-icons/gi';
import car_sedan_image from '../../assets/Screenshot 2024-07-04 at 2.38.36 PM.png'



const Seat_Selector = () => {


  return(
  <div>
    <br></br>
    <label>Select Your Preferred Seat:</label>
  <div  className='seatselectorbox'>
    <div className='car'>
    <div className='row frontseat'>
       <div className='col-lg-3'>
        </div>
        <div className='col-lg-2'>
           <SiApachecouchdb className='seatselectoricon' />
        </div>
        <div className='col-lg-2'>
        </div>
        <div className='col-lg-2'>
           <GiSteeringWheel className='seatselectoricon'/>
        </div>
        <div className='col-lg-3'>
        </div>
    
    </div>
    <div className='row middleseat'>
        <div className='col-lg-3'>
        </div>
        <div className='col-lg-2'>
           <SiApachecouchdb className='seatselectoricon'/>
        </div>
        <div className='col-lg-2'>
           <SiApachecouchdb className='seatselectoricon'/>
        </div>
        <div className='col-lg-2'>
           <SiApachecouchdb className='seatselectoricon'/>
        </div>
        <div className='col-lg-3'>
        </div>
    
    </div>
    </div>
    
  </div>
  </div>
  )
};

export default Seat_Selector;
