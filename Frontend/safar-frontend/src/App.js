import React from 'react';
import { useEffect } from 'react';
import { AboutUs, Chef, FindUs, Footer, Gallery, Header, Intro, Laurels, SpecialMenu } from './container';
import { Navbar, Landing_Page, Loged_In_Page, HomePage, Image_Picker, Map_Ride, Booking_Page, Book_Seat_Page, Driver_Cabs, Trip_Summary } from './components';
import {SignUp} from './components'
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/userContext';
import './App.css';

const App = () => {

  const [activeTab, setActiveTab] = useState('animation')
  const [isLogedIn, setIsLogedIn] = useState(false)
  return(
  <UserProvider>
  <Routes>
    <Route path="/" element={<HomePage activeTab={activeTab} setActiveTab = {setActiveTab} isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} />} />
    <Route path="/Login" element={<Loged_In_Page activeTab={activeTab} setActiveTab = {setActiveTab} isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn}/>} />
    <Route path="/Signup/addCab" element={<Loged_In_Page activeTab={activeTab} setActiveTab = {setActiveTab} isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn}/>} />
    <Route path="/Signup/student" element={<Image_Picker />} />
    <Route path="/search" element={<Booking_Page />}/>
    <Route path="/booking/:tripId/:tripCabtype" element={<Book_Seat_Page />} />
    <Route path="/driverCabs/:tripId" element={<Driver_Cabs />}></Route>
    <Route path="/tripSummary" element={<Trip_Summary />}></Route>
  </Routes>
  </UserProvider>  
  )
};

export default App;
