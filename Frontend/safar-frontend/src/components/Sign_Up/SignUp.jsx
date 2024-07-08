import React from 'react';
import { useState, useRef } from 'react';
import { GoSignIn } from "react-icons/go";
import './SignUp.css';
import { easeOut, motion } from 'framer-motion';
import Text_Input from '../Text_Inputs/Text_inputs';
import Dropdown from '../DropDown/DropDown';
import Image_Picker_image from '../../assets/images.jpeg'
import { BiImageAdd } from "react-icons/bi";
import Axios from 'axios';
import { useEffect } from 'react';
import Image_Picker from '../Image_Picker/Image_Picker';

const SignUp = (value) => {
  
  const url = 'http://localhost:3000/?'
  const inputRef =  useRef("");
  const [image, setImage] = useState("");
  const [userData, setUserData]= useState({
    name: "",
    phoneNumber: "",
    password: "",
    type: "",
    profileImage: "",
 
  })

  const handleImageClick = ()=>{
    inputRef.current.click();
  }
  function handle(e){
    const newUserData ={...userData}
    newUserData[e.target.id] = e.target.value
    setUserData(newUserData)
    console.log(newUserData)

  }
  const handleImageChange = async(e)=>{
    const file = e.target.files[0];
    const imgname = e.target.files[0].name;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'safarpreset'); // Replace with your upload preset
    formData.append('cloud_name', 'dipzek90s'); // Replace with your Cloudinary cloud name

    try {
      const response = await Axios.post("https://api.cloudinary.com/v1_1/dipzek90s/image/upload", formData);
      const imageUrl = response.data.url;
      setImage(file);
      setUserData({ ...userData, profileImage: imageUrl });
      console.log(imageUrl);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const maxSize = Math.max(img.width, img.height);
            canvas.width = maxSize;
            canvas.height = maxSize;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(
                img,
                (maxSize - img.width)/2,
                (maxSize - img.height)/2
            );
            canvas.toBlob(
                (blob) =>{
                    const file = new File([blob], imgname, {
                        type: "image/png",
                        lastModified: Date.now(),
                    });

                    console.log(file);
                    setImage(file)
                },
                "image/jpeg",
                0.8
            );
        };
    };

    handle(e);


};

  async function submit(e){
    e.preventDefault()
   /* await Axios.post(url,{
      name: userData.name,
      phoneNumber: userData.phoneNumber,
      password: userData.password,
      type: userData.type,
      profileImage: userData.profileImage
    })
    .then(res=>{
      console.log(res.userData)
    })

    await Axios.get('https://api.artic.edu/api/v1/artworks/search?q=cats')
    .then( res=>{
      console.log(res)
    })
    */
  }




   

  
    
  return(

  <div  className='sign_up_container'>
      <div>
       <p className='signuptext'>Sign Up!</p>

      </div>
     <form onSubmit={(e)=>submit(e)} className='signupForm'>
      <div onClick={handleImageClick} className='image_picker'>
      {
           image ? <img className='img-display-after' src ={URL.createObjectURL(image)}/> : <img src={Image_Picker_image} className="img-display-before" alt="" />
        }
       <input type = 'file' className='signupinput'  id='profileImage' ref={inputRef} onChange={handleImageChange} style= {{display: "none"}}></input>
      </div>
      <label>Enter Your Name:</label><br></br>
      <input onChange={(e)=>handle(e)} className='signupinput' id ='name' value = {userData.name} placeholder='Name' type='text'></input><br></br>
      <label>Enter Your Phone Number:</label><br></br>
      <input onChange={(e)=>handle(e)} className='signupinput' id ='phoneNumber' value = {userData.phoneNumber} placeholder='Phone Number' type='tel'></input><br></br>
      <label>Enter a Password:</label><br></br>
      <input onChange={(e)=>handle(e)} className='signupinput' id ='password' value = {userData.password} placeholder='password' type='Password'></input><br></br>
      <label>Select your Role:</label><br></br>
      <select onChange={(e)=>handle(e)} className='signupinput' id ='type'> 
        <option  value ='Staff'>Staff</option>
        <option  value = 'Student'>Student</option>
        <option  value = 'Cab Driver'>Cab Driver</option>
      </select><br></br>
      <button className='user_form_submit_button' >Submit</button>
     </form>
     
   

    
    
        
   
    
       
  </div>
  )
};

export default SignUp;
