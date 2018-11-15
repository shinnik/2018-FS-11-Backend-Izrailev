import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.css'

const header = () => (
  <div className={classes.MenuContainer}>
    <div className="dropdown">
        <label className="menu-label">
            <i className={classes.MaterialIcons}>view_headline</i>
        </label>
      <ul className="dropdown-content">
        <Link to='/main'>Home</Link>
        <Link to='/list_chats'>Chats</Link>
      </ul>
    </div>
  </div>
);


export default header;
