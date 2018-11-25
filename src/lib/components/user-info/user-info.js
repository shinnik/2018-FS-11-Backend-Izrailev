import React from 'react';
import classes from "../../containers/Header/Header.module.css";

const UserInfo = (props) => {
    let icon;
    if (props.isAuthorized === true) {
        icon = 'thumb_up'
    }
    else {
        icon = 'thumb_down'
    }
    return (
        <div className={classes.userInfo}>
            <div className={classes.name}>{props.name}</div>
            <i className={classes.MaterialIconsForOnlineStatus}>{icon}</i>
        </div>
    )
};

export default UserInfo;
