import React from 'react';
import classes from './GeoForm.module.css';
import getPosition from '../utils/geolocation'

const GeoForm = (props) => {

    const geoOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 36e5
    };

    const handleClick = (e) => {
        let userPosition = {
            latitude: null ,
            longitude: null
        }
        getPosition(geoOptions).then(position => {
            userPosition.latitude = position.coords.latitude.toFixed(5);
            userPosition.longitude = position.coords.longitude.toFixed(5);
            console.log(userPosition);
        });
    };

    return (
        <label className={classes.GeoButton} onClick={handleClick}>
            <i className={classes.MaterialIcons}>map</i>
        </label>
    );
}

export default GeoForm;
