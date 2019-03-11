import React from 'react';
import classes from './GeoForm.module.css';

const GeoForm = ({onSendGeo, worker}) => {

    const onMiddlewareSendGeo = (event) => {
        let payload = {
            worker: worker,
            event: event
        };
        onSendGeo(payload)
    };

    return (
        <label className={classes.GeoButton} onClick={onMiddlewareSendGeo}>
            <i className={classes.MaterialIcons}>map</i>
        </label>
    );
}

export default GeoForm;
