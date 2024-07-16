import React from 'react';
import { useEffect } from 'react';
import { AboutUs, Chef, FindUs, Footer, Gallery, Header, Intro, Laurels, SpecialMenu } from './container';
import { Navbar, Landing_Page, Loged_In_Page, HomePage, Image_Picker, Map_Ride, Booking_Page } from './components';
import {SignUp} from './components'
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

const App = () => {

  const [activeTab, setActiveTab] = useState('animation')
  const [isLogedIn, setIsLogedIn] = useState(false)
  return(
  <Routes>
    <Route path="/" element={<HomePage activeTab={activeTab} setActiveTab = {setActiveTab} isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} />} />
    <Route path="/Login" element={<Loged_In_Page activeTab={activeTab} setActiveTab = {setActiveTab} isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn}/>} />
    <Route path="/Signup/addCab" element={<Loged_In_Page/>} />
    <Route path="/Signup/student" element={<Image_Picker/>} />
    <Route path="/search" element={<Booking_Page/>}/>
  </Routes>
  )
};

export default App;
