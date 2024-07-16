import React, { useState } from "react";
import { motion } from "framer-motion";
import Axios from "axios";
import { Link } from "react-router-dom";
import Log_in_page_image from "../../../../assets/Log_in_page_2.jpg";
import "./Login_page.css";
import { useNavigate } from "react-router-dom";


const Login_page = ({activeTab, setActiveTab, isLogedIn, setIsLogedIn}) => {
  const navigate = useNavigate();

  const url = "http://localhost:4000/login";
  const [logInData, setLogInData] = useState({
    userName: "",
    pswd: "",
  });
  
  const handleInputChange = (e) => {
    setLogInData({
      ...logInData,
      [e.target.id]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming API call and response handling are similar as previously shown
      const response = await Axios.post(url, {
        userName: logInData.userName,
        pswd: logInData.pswd,
      }, {withCredentials: true});

      if (response.status === 200) {
        console.log(response)
        // Redirect to the next page upon successful login
        navigate("/Login");
        setActiveTab('animation')
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

 

  return (
    <motion.div
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6 }}
      className="row"
    >
      <div className="col-lg-9">
        <img
          src={Log_in_page_image}
          alt="Login Page Image"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="col-lg-3">
        <div className="row">
          <p className="welcometext">Welcome!</p>
          <br />
          <p className="log-in-by-line">
            Log in to share cabs at minimum prices
          </p>
        </div>
        <div className="row">
          <form onSubmit={handleSubmit}>
            <div className="loginformbox">
              <label>Enter Your Username:</label>
              <br />
              <input
                onChange={handleInputChange}
                id="userName"
                type="text"
                value={logInData.userName}
                className="logininput"
                placeholder="User Name"
                required
              />
              <br />
              <label>Enter Your Password:</label>
              <input
                onChange={handleInputChange}
                id="pswd"
                type="password"
                value={logInData.pswd}
                className="logininput"
                placeholder="Password"
                required
              />
              <label>Forgot Password?</label>
              <br />
              <button type="submit" className="Log_in_for_submit">
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Login_page;
