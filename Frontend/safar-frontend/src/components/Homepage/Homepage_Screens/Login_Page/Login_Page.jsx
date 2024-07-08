import React from "react";
import Log_in_page_image from '../../../../assets/Log_in_page_2.jpg'
import './Login_page.css'
import { motion } from 'framer-motion'
const Login_page = ()=>{
    return(
        <motion.div initial={{x:-200}} animate={{x:0}} transition={{duration: 0.6}} className="row">
            <div className="col-lg-9">
              <img src={Log_in_page_image} style={{width: '100%', height: '100%'}} ></img>
            </div>
            <div className="col-lg-3">
                <div className="row ">
                    <p className="welcometext">Welcome!</p><br></br>
                    <p className="log-in-by-line">Log in to share cabs at minimum prices</p>
                </div>
                <div className="row">
                    <form>
                        <div className="loginformbox">
                        <label>Enter Your Phone Number:</label>
                        <br></br>
                        <input className="logininput" placeholder="Phone Number"></input>
                        <br></br>
                        <label>Enter Your Password:</label>
                        <input className="logininput" placeholder="Password"></input>
                        <label>Forgot Password?</label>
                        <br></br>
                        <button className="Log_in_for_submit">Log In</button>
                        </div>
                    </form>
                </div>
                
            </div>
        </motion.div>
    )
}

export default Login_page