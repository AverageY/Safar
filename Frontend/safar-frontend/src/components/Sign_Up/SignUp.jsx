import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Image_Picker_image from '../../assets/images.jpeg';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const url = 'http://localhost:4000/safar/register';
  const inputRef = useRef('');
  const [image, setImage] = useState('');
  const [userData, setUserData] = useState({
    userName: '',
    mobileNum: '',
    profileImg: '',
    pswd: '',
    userType: '',
  });

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const imgname = e.target.files[0].name;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'safarpreset'); // Replace with your upload preset
    formData.append('cloud_name', 'dipzek90s'); // Replace with your Cloudinary cloud name

    try {
      const response = await Axios.post('https://api.cloudinary.com/v1_1/dipzek90s/image/upload', formData);
      const imageUrl = response.data.url;
      setImage(file);
      setUserData({ ...userData, profileImg: imageUrl });
      console.log(userData);
    } catch (error) {
      console.error('Error uploading image: ', error);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, (maxSize - img.width) / 2, (maxSize - img.height) / 2);
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: 'image/png',
              lastModified: Date.now(),
            });

            setImage(file);
          },
          'image/jpeg',
          0.8
        );
      };
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(url, {
        userName: userData.userName,
        mobileNum: userData.mobileNum,
        pswd: userData.pswd,
        userType: userData.userType,
        profileImg: userData.profileImg,
      });

      if (response.status === 201) {
        if (userData.userType === 'Cab Driver') {
          navigate('/signup/addCab'); // Redirect to driver signup page
        } else if (userData.userType === 'Student') {
          navigate('/signup/student'); // Redirect to student signup page
        }
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="sign_up_container">
      <div>
        <p className="signuptext">Sign Up!</p>
      </div>
      <form onSubmit={handleSubmit} className="signupForm">
        <div onClick={handleImageClick} className="image_picker">
          {image ? (
            <img className="img-display-after" src={URL.createObjectURL(image)} alt="Profile Preview" />
          ) : (
            <img src={Image_Picker_image} className="img-display-before" alt="Profile Placeholder" />
          )}
          <input type="file" className="signupinput" id="profileImg" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
        </div>
        <label>Enter Your Name:</label>
        <br />
        <input onChange={handleInputChange} className="signupinput" id="userName" value={userData.userName} placeholder="Name" type="text" />
        <br />
        <label>Enter Your Phone Number:</label>
        <br />
        <input onChange={handleInputChange} className="signupinput" id="mobileNum" value={userData.mobileNum} placeholder="Phone Number" type="tel" />
        <br />
        <label>Enter a Password:</label>
        <br />
        <input onChange={handleInputChange} className="signupinput" id="pswd" value={userData.pswd} placeholder="password" type="Password" />
        <br />
        <label>Select your Role:</label>
        <br />
        <select onChange={handleInputChange} className="signupinput" id="userType">
          <option value="Staff">Staff</option>
          <option value="Student">Student</option>
          <option value="Cab Driver">Cab Driver</option>
        </select>
        <br />
        <button type="submit" className="user_form_submit_button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
