import React from 'react';
import classes from './GeoForm.module.css';
import getPosition from '../utils/geolocation'

const GeoForm = ({onSendGeo}) => {

    return (
        <label className={classes.GeoButton} onClick={onSendGeo}>
            <i className={classes.MaterialIcons}>map</i>
        </label>
    );
}

export default GeoForm;
