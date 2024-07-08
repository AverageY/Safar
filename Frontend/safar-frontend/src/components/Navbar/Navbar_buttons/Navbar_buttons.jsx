import React, { useState, useEffect, useRef } from 'react';

import { FaCar } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { GoSignIn } from "react-icons/go";
import { FaCircleUser } from "react-icons/fa6";
import { FaBars } from 'react-icons/fa6';







const Navbar_buttons = ({activeTab, setActiveTab}) => {
  

 
  
 

 return(
  
     <div>
      <ul>
       
      
       <button onClick={()=> {setActiveTab('signup')  }} id ='user_icon_button' className='navbar_button'> 


        <li><FaCircleUser id='user_icon' className='user_icon navbar_icon'/></li>
       </button>
     
      
     
    
       <button onClick={()=> {setActiveTab('login')  }} id ='sign_in_button' className='navbar_button'>
         
         <li><GoSignIn id='sign_in_icon' className='sign_in_icon navbar_icon'/></li>
       </button>
       
    
       <button onClick={()=> {setActiveTab('ride')  }} id ='ride_button' className='navbar_button'>
       
        <li> <FaCar id='ride_icon' className='Ride_icon navbar_icon'/></li>
       </button>
      


       <button onClick={()=> {setActiveTab('settings')  }} id ='settings_button' className='navbar_button'>
        <li><IoSettingsSharp  id='settings_icon' className='settings_icon navbar_icon'/></li>
        </button>
       
      
            

     </ul>
   </div>
    

 )
};


export default Navbar_buttons;

