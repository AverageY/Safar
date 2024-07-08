import React, { useState, useEffect, useRef } from 'react';
import logo_light_theme from '../../assets/logo-light-theme.png'
import { FaCar } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { GoSignIn } from "react-icons/go";
import { FaCircleUser } from "react-icons/fa6";
import { FaBars } from 'react-icons/fa6';
import Settings_DropDown from '../Settings_DropDown/Settings_DropDown';
import SignUp from '../Sign_Up/SignUp';
import LogIn from '../Log_In/LogIn';
import Navbar_buttons from '../Navbar/Navbar_buttons/Navbar_buttons'



import './Navbar.css';


const Navbar = ({activeTab, setActiveTab}) => {
  

  const [displayClose, setDisplayClose] = useState()
  
 

 return(
    <div className='navbar '>
     <div>
      <img src = {logo_light_theme} alt = "" className='logo' />
     </div>
     <div>
      {
        (activeTab != 'animation')&& <button onClick={()=>{setActiveTab('animation')}}>close</button>
      }
     {
        (activeTab == 'animation') && <Navbar_buttons activeTab={activeTab} setActiveTab = {setActiveTab} />
     }
     
   </div>
    


    
</div>
 )
};


export default Navbar;


