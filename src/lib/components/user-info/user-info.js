import React from 'react';
import classes from "../../containers/Header/Header.module.css";

const UserInfo = (props) => {
    if (props.isAuthorized === true) {
        var icon = 'thumb_up'
    }
    else {
        var icon = 'thumb_down'
    }
    return (
        <div className={classes.userInfo}>
            <div className={classes.name}>{props.name}</div>
            <i className={classes.MaterialIconsForOnlineStatus}>{icon}</i>
        </div>
    )
};

export default UserInfo;
