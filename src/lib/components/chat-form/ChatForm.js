import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import classes from './ChatForm.module.css'


export const ChatForm = ({chatName, unread, chatID}) => {

    const [clicked, setClicked] = useState(false);
    const pathToChat = `/list_chats/chat_id=${chatID}`;

    return (
        <div onClick={() => setClicked(!clicked)} className={classes.container}>
            <img src='https://joeschmoe.io/api/v1/female/random' className={classes.avatar}></img>
            <div className={classes.name}>{chatName}</div>
            <div className={classes.messCounter}>{unread} new messages</div>
            {clicked && <Redirect to={pathToChat} />}
        </div>
    )

}
