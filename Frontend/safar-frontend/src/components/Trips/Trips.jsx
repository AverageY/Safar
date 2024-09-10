import React, { useEffect, useState } from "react";
import './Trips.css';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import Modal from 'react-modal';
import Axios from 'axios';

const Trips = (props) => {
    const center = { lat: 28.584, lng: 77.2945 };
    const [map, setMap] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const navigate = useNavigate();
    const { isDriver } = useContext(UserContext);

    const origin = props.tripPickuplocation;
    const destination = props.tripDroplocation;
    const tripId = props.tripId;
    const tripCabtype = props.tripCabtype;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trip, setTrip] = useState({
        tripPickuplocation: origin,
        tripDroplocation: destination,
        tripDeparturetime: props.tripDeparturetime,
        tripCabtype: tripCabtype,
        tripDate: props.tripDate,
        tripPrice: props.tripPrice,
        tripOtp: props.tripOtp,
        tripDistance: props.tripDistance,
        tripStatus: props.tripStatus
    });

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

    const handleBookClick = () => {
        navigate(`/booking/${tripId}/${tripCabtype}`);
    };

    const handleAcceptClick = () => {
        navigate(`/driverCabs/${tripId}`);
    };

    const handleDelete = () => {
        props.onDelete(tripId);
    };

    const handleUpdate = () => {
        setIsModalOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrip((prevTrip) => ({
            ...prevTrip,
            [name]: value
        }));
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.put(`https://safar-ffzg.onrender.com/trip/update/${tripId}`, trip, { withCredentials: true });
            if (response.status === 200) {
                setIsModalOpen(false);
                window.location.reload(); // Reload the page to reflect the updated trip
            }
        } catch (error) {
            console.error('Error updating trip:', error);
        }
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
                    {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
                </GoogleMap>
            </div>
            <div className="col-lg-5">
                <label>Destination: {destination} </label><br />
                <label>Origin: {origin} </label><br />
                <label>Departure Date: {props.tripDate} </label><br />
                <label>Departure Time: {props.tripDeparturetime} </label><br />
                <label>CarType: {tripCabtype} </label><br />
                <label>Price: {props.tripPrice} </label><br />
                <label>Trip Otp: {props.tripOtp}</label><br />
                <label>Trip Distance: {props.tripDistance}</label><br />
                <label>Trip Status: {props.tripStatus ? 'Accepted' : 'Not Accepted'}</label><br />
                <button className="book_trip_btn" onClick={handleBookClick}>Book</button>
                <button className="book_trip_btn" onClick={handleDelete}>Delete</button>
                <button className="book_trip_btn" onClick={handleUpdate}>Update</button>
                {isDriver && <button onClick={handleAcceptClick}>Accept</button>}
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={handleModalClose} ariaHideApp={false}>
                <h2>Update Trip</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Pick Up Location:
                        <input type="text" name="tripPickuplocation" value={trip.tripPickuplocation} onChange={handleChange} />
                    </label><br/>
                    <label>
                        Drop Location:
                        <input type="text" name="tripDroplocation" value={trip.tripDroplocation} onChange={handleChange} />
                    </label><br/>
                    <label>
                        Departure Time:
                        <input type="time" name="tripDeparturetime" value={trip.tripDeparturetime} onChange={handleChange} />
                    </label><br/>
                    <label>
                        Car Type:
                        <input type="text" name="tripCabtype" value={trip.tripCabtype} onChange={handleChange} />
                    </label><br/>
                    <label>
                        Date:
                        <input type="date" name="tripDate" value={trip.tripDate} onChange={handleChange} />
                    </label><br/>
                    <button type="submit">Update Trip</button>
                    <button type="button" onClick={handleModalClose}>Cancel</button>
                </form>
            </Modal>
        </div>
    );
}

export default Trips;
