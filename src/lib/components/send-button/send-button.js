import React from 'react';
import classes from './SendButton.module.css'

const SendButton = ({onButtonClick}) => {

    const handleClick = (e) => {
        onButtonClick(e);
    };

    return (
        <label className={classes.SendButton} onClick={handleClick}>
            <i className={classes.MaterialIcons}>send</i>
        </label>
    )
}

export default SendButton;
