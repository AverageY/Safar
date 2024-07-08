import React from 'react';
import { GoSignIn } from "react-icons/go";
import { easeOut, motion } from 'framer-motion';
import Text_Input from '../Text_Inputs/Text_inputs';
import Dropdown from '../DropDown/DropDown';
import { BiImageAdd } from "react-icons/bi";
import Navbar from '../Navbar/Navbar'
import Landing_Page_Side2 from '../Homepage/Homepage_Screens/Landing_Page/Landing_Page_Side2/Landing_Page_Side2'
import Landing_Page_Side1 from '../Homepage/Homepage_Screens/Landing_Page/Landing_Page_Side1/Landing_Page_Side1'
import Landing_Page from './Homepage_Screens/Landing_Page/Landing_Page';
import Signup_Page from './Homepage_Screens/Signup_Page/Signup_Page';
import Login_Page from './Homepage_Screens/Login_Page/Login_Page'
import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/Landing_Page_Animation.json'
import SignUp from '../Sign_Up/SignUp';
import LogIn from '../Log_In/LogIn';
import Image_Picker from '../Image_Picker/Image_Picker';
import Ride_Page from './Homepage_Screens/Ride_Page/Ride_Page';

const HomePage = () => {


  const [activeTab, setActiveTab] = useState('animation')
 
 
 

  return(
   <div>
    <Navbar activeTab={activeTab} setActiveTab = {setActiveTab}  />
    <div className= "main row justify-content-center d-flex flex-row-reverse flex-md-row">
        <div className="col-lg-12 col-sm-12  ">
        {getScreens(activeTab)}
        </div>
    </div>

   </div>
 
  )
};

const getScreens = (tab) =>{

    switch(tab){
        case 'animation':
        return <Landing_Page />
        case 'signup':
        return <Signup_Page />
        case 'login':
        return <Login_Page/>
        case 'ride':
        return <Ride_Page />
        case 'settings':
        return <LogIn />
        default:
            return <Landing_Page_Side1 /> 
    }
}


export default HomePage;
