import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { useLocation } from 'react-router-dom';
import Landing_Page from '../Homepage/Homepage_Screens/Landing_Page/Landing_Page';
import Signup_Page from '../Homepage/Homepage_Screens/Signup_Page/Signup_Page';
import Login_page from '../Homepage/Homepage_Screens/Login_Page/Login_Page';
import Image_Picker from '../Image_Picker/Image_Picker';
import Ride_Page from '../Homepage/Homepage_Screens/Ride_Page/Ride_Page';
import Landing_Page_Side1 from '../Homepage/Homepage_Screens/Landing_Page/Landing_Page_Side1/Landing_Page_Side1';
import LogIn from '../Log_In/LogIn';
import Axios from 'axios';
import Loged_In_Landing_Page from './Loged_In_Landing_Page/Loged_In_Landing_Page';

function Loged_In_Page({activeTab, setActiveTab, isLogedIn, setIsLogedIn}) {
  
  
  setIsLogedIn(true)

  return (
    <div>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} />
      <div className='row'>
        <div className='col-lg-12'>
        {getScreens(activeTab)}
        </div>
      </div>
    </div>
  );
}

const getScreens = (tab) =>{

  switch(tab){
      case 'animation':
      return <Loged_In_Landing_Page />
      case 'signup':
      return <Signup_Page />
      case 'login':
      return <Image_Picker/>
      case 'ride':
      return <Ride_Page />
      case 'settings':
      return <LogIn />
      default:
          return <Landing_Page_Side1 /> 
  }
}

export default Loged_In_Page;
