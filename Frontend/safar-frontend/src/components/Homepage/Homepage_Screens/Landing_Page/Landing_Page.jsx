import React from "react";
import Landing_Page_Side1 from './Landing_Page_Side1/Landing_Page_Side1'
import Landing_Page_Side2 from './Landing_Page_Side2/Landing_Page_Side2'

const Landing_Page = () => {
    
return(
    <div className= "main row justify-content-center d-flex flex-row-reverse flex-md-row">
        <div className="col-lg-6 col-sm-12 left ">
        <Landing_Page_Side2 />
        </div>
        <div className="col-lg-6 col-sm-12 right">
        <Landing_Page_Side1 />
        </div>
    </div>
)

}

export default Landing_Page;
