import React from 'react';
import { useEffect } from 'react';
import { AboutUs, Chef, FindUs, Footer, Gallery, Header, Intro, Laurels, SpecialMenu } from './container';
import { Navbar, Landing_Page, Navbar_2, HomePage, Image_Picker, Map_Ride } from './components';
import {SignUp} from './components'
import { useState } from 'react';
import './App.css';

const App = () => {


  const [theme, setTheme] = useState('light')
  return(
  <div>
    <HomePage />
  </div>
  )
};

export default App;
