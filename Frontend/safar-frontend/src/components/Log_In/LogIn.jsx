import React from 'react';
import { GoSignIn } from "react-icons/go";
import './LogIn.css';
import { easeOut, motion } from 'framer-motion';
import Text_Input from '../Text_Inputs/Text_inputs';

const LogIn = () => {


  return(

  <motion.div animate={{ x: 50}}  transition= {{duration: 2.8,}} className='sign_up_container'>
    <div className='sign_up_inside_container'>
      <Text_Input placeholder="Email"/>
      <Text_Input placeholder="Password"/>

    
        
   
    </div>
       
  </motion.div>
  )
};

export default LogIn;
