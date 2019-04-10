import React from 'react';
import classes from './SendButton.module.css'

const SendButton = ({worker, onButtonClick}) => {

    const onMiddlewareButtonClick = (event) => {
        let payload = {
            worker: worker,
            event: event
        };
        onButtonClick(payload)
    };

    return (
        <label className={classes.SendButton} onClick={onMiddlewareButtonClick}>
            <i className={classes.MaterialIcons}>send</i>
        </label>
    )
}

export default SendButton;
