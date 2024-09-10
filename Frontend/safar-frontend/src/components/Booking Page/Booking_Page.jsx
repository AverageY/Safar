import React from 'react';
import { useLocation } from 'react-router-dom';
import Trips from '../Trips/Trips';

const Booking_Page = ({})=>{

  const location = useLocation();
  const trips = location.state?.trips || [];
  console.log(trips)
 

  function searchedTrips(trips){
   return <Trips
     key= {trips.tripId}
     tripPickuplocation={trips.tripPickuplocation}
     tripDroplocation={trips.tripDroplocation}
     tripDeparturetime={trips.tripDeparturetime}
     tripId={trips.tripId}
     tripCabtype= {trips.tripCabtype}
     tripPrice ={trips.tripPrice}
   />
  }


   return(

    <div>
      <h1>Booking Page</h1>
      {trips.map(searchedTrips)}
      
    
    </div>
   )
}


export default Booking_Page