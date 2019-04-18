import React, { useState } from 'react';
import classes from './UserAvatar.module.css'
import ReactDOM from 'react-dom';


export const UserAvatar = () => {

    const shadowStyle = {
        zIndex: 3,
        position: 'fixed',
        height: '100%',
        width: '100%',
        backgroundColor: '#222f3e',
        opacity: 0.5,
        top: 0,
};

    const [clicked, setClicked] = useState(false);
    const shad = <div style={shadowStyle}></div>;

    return (
        <div>
            {clicked && <div>{ReactDOM.createPortal(shad, document.body)}</div>}
            <img onClick={() => setClicked(!clicked)} alt="noav" src={'https://api.adorable.io/avatars/220/abott@adorable.png'} className={clicked ? classes.avatarSelected : classes.avatar}></img>
        </div>

    )

}
