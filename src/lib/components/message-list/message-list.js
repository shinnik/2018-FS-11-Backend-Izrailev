import React from 'react';
import classes from './MessageList.module.css';

const MessageList = (props) => {

    let date = new Date();
    let time = date.getHours() + ':' + date.getMinutes();
    let preparedMessages = props.messages.map((el, index) => <li className={classes.message} key={index}>{el}<div className={classes.time}>{time}</div></li>).reverse();
    return (
            <div>
                <ul className={classes.result}>{preparedMessages}</ul>
            </div>
        )
    };

export default MessageList;
