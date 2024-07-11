import React from "react";
import './Loged_In_Landing_Page.css'


const Loged_In_Landing_Page = () =>{

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
            </div>
        </div>
    )

}


export default Loged_In_Landing_Page