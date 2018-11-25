import React from 'react';
import classes from './SendButton.module.css'

const SendButton = (props) => {

    return (
        <label className={classes.SendButton} onClick={props.onButtonClick}>
            <i className={classes.MaterialIcons}>send</i>
        </label>
    )
}

export default SendButton;
