import React from 'react';
import { FaCar } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { GoSignIn } from "react-icons/go";
import { FaCircleUser } from "react-icons/fa6";
import  Axios  from 'axios';
import { useNavigate } from "react-router-dom";

const Navbar_buttons = ({activeTab, setActiveTab, isLogedIn, setIsLogedIn}) => {
  
  const navigate = useNavigate();
  const LogOut = async()=>{
    const response = await Axios.get('https://safar-ffzg.onrender.com/logout', {withCredentials: true})
    console.log(response)
    setIsLogedIn(false)
    navigate('/')

  }


  return (
    <div>
      <ul>
        {
        !isLogedIn && <button onClick={() => { setActiveTab('signup') }} id='user_icon_button' className='navbar_button'>
          <li><FaCircleUser id='user_icon' className='user_icon navbar_icon' /></li>
        </button>
        }
        {
        !isLogedIn && <button onClick={() => { setActiveTab('login') }} id='sign_in_button' className='navbar_button'>
          <li><GoSignIn id='sign_in_icon' className='sign_in_icon navbar_icon' /></li>
        </button>
        } 
        {
          isLogedIn && <button onClick={() => { setActiveTab('ride') }} id='ride_button' className='navbar_button'>
            <li><FaCar id='ride_icon' className='Ride_icon navbar_icon' /></li>
          </button>       
        } 
        {
        isLogedIn && <button onClick={() => { setActiveTab('settings') }} id='settings_button' className='navbar_button'>
          <li><IoSettingsSharp id='settings_icon' className='settings_icon navbar_icon' /></li>
        </button>
        }
        {
        isLogedIn && <button onClick={LogOut}>LogOut</button>
        }
      </ul>
    </div>
  );
};

export default Navbar_buttons;
