import React from 'react';
import { GoSignIn } from "react-icons/go";
import { easeOut, motion } from 'framer-motion';
import './Text_inputs.css'

const Text_Input = (props) => {

  return(

      <div>
        <div class="form-group">
			<input type="email" name="logemail" class="form-style" placeholder= {props.placeholder} id="logemail"  />
            <i className='fa fa-user input-icon uil uil-at' />
		</div>	
      </div>
        
    
  )
};

export default Text_Input;
