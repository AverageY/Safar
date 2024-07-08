import React from 'react';

import './Settings_DropDown.css';

const Settings_DropDown = () => {
  return(
   <div className='settings_dropdown'>
      <ul className='dropdown_list'>
        <div id='item1'>
        <li id='opt1'>Update Profile</li>
        </div>
        <div id ='item2'>
        <li id='opt1'>Toggle</li>
        </div>
      </ul>
   </div>
  )
  
};

export default Settings_DropDown;
