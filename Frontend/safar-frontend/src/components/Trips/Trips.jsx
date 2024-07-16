import React, { useEffect, useState } from "react";
import './Trips.css';
import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const Trips = (props) => {
    const center = { lat: 28.584, lng: 77.2945 };
    const [map, setMap] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);

    const origin = props.tripPickuplocation; // Assume these values are passed as props from the backend
    const destination = props.tripDroplocation;

    useEffect(() => {
        if (origin && destination) {
            const directionsService = new window.google.maps.DirectionsService();

            directionsService.route(
                {
                    origin: origin,
                    destination: destination,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirectionsResponse(result);
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
        }
    }, [origin, destination]);

    const mapOptions = {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
    };

    return (
        <div className='trip row'>
            <div className="maparea col-lg-7">
                <GoogleMap
                    center={center}
                    zoom={14}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    onLoad={(map) => setMap(map)}
                    options={mapOptions}
                >
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                </GoogleMap>
            </div>
            <div className="col-lg-5">
                <label>Destination: {destination} </label>
                <br />
                <label>Origin: {origin} </label>
                <br/>
                <label>Departure Date: </label>
                <br/>
                <label>Departure Time: {props.tripDeparturetime} </label>
                <br/>
                <label>CarType: </label>
                <br/>
                <label>Price: </label>
                <br></br>
                <button className="book_trip_btn"> Book</button>
            </div>
        </div>
    );
}

export default Trips;
