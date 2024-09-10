import React, { useState } from "react";
import Axios from "axios";

const UpdateTrip = ({ trip, onClose, onUpdate }) => {
    const [updatedTrip, setUpdatedTrip] = useState(trip);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTrip({ ...updatedTrip, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const response = await Axios.put(`https://safar-ffzg.onrender.com/trip/${trip.tripId}`, updatedTrip, { withCredentials: true });
            if (response.status === 200) {
                onUpdate(updatedTrip);
                onClose();
            }
        } catch (error) {
            console.error('Error updating trip:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Update Trip</h2>
                <label>Origin:</label>
                <input type="text" name="tripPickuplocation" value={updatedTrip.tripPickuplocation} onChange={handleChange} />
                <label>Destination:</label>
                <input type="text" name="tripDroplocation" value={updatedTrip.tripDroplocation} onChange={handleChange} />
                <label>Departure Date:</label>
                <input type="date" name="tripDate" value={updatedTrip.tripDate} onChange={handleChange} />
                <label>Departure Time:</label>
                <input type="time" name="tripDeparturetime" value={updatedTrip.tripDeparturetime} onChange={handleChange} />
                <label>Car Type:</label>
                <input type="text" name="tripCabtype" value={updatedTrip.tripCabtype} onChange={handleChange} />
                <label>Price:</label>
                <input type="number" name="tripPrice" value={updatedTrip.tripPrice} onChange={handleChange} />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default UpdateTrip;
