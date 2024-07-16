import React from "react";
import './Loged_In_Landing_Page.css'
import Axios from "axios";
import Trips from "../../Trips/Trips";

const Loged_In_Landing_Page = () =>{


    const getUserData = async ()=>{
        const response = await Axios.get('http://localhost:4000/trips', {withCredentials:true})
        console.log(response)
    }

    return(
        <div className="row">
            <div className="col-lg-3" >
                <div className="side_bar">
                  <div className="side_bar_search">
                   <p>Search a Cab</p>
                  </div>  
                </div>
            </div>
            <div className="col-lg-9">
                 <p>Up Comming Cabs</p>
                 <button onClick={getUserData}>user data</button>
                 <Trips />
            </div>
        </div>
    )

}


export default Loged_In_Landing_Page