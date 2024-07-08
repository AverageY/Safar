import React from "react";
import Signup_Page_SideR from './Signup_Page_SideR/Signup_Page_SideR'
import Signup_Page_SideL from './Signup_Page_SideL/Signup_Page_SideL'
import { motion } from 'framer-motion'
import './Signup_Page.css'

const Signup_Page = () => {
    
return(
    <motion.div initial={{x:-200}} animate={{x:0}} transition={{duration: 0.6}} className= "main row signupbox2 justify-content-center d-flex flex-row-reverse flex-md-row">
    <div className="col-lg-9 col-sm-12  ">
            <Signup_Page_SideL />
    </div>
        <div className="col-lg-3 col-sm-12 ">
            <Signup_Page_SideR />
        </div>
    </motion.div>
)

}

export default Signup_Page;
