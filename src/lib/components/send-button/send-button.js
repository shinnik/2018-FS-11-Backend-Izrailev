import React from 'react';
import classes from './SendButton.module.css'

const SendButton = (props) => {

    const onMiddlewareButtonClick = (event) => {
        let payload = {
            worker: props.worker,
            event: event
        };
        props.onButtonClick(payload)
    };

    return (
        <label className={classes.SendButton} onClick={onMiddlewareButtonClick}>
            <i className={classes.MaterialIcons}>send</i>
        </label>
    )
}

export default SendButton;
