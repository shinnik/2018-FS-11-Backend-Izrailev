import React from 'react';
import classes from './MessageList.module.css';

const MessageList = (props) => {

    let date = new Date();
    let time = date.getHours() + ':' + date.getMinutes();
    // const elClasses = [classes.message];
    // if() {
    //     elClasses.push(classes.myMessage)
    // }
    let preparedMessages = props.messages.map((el, index) => <li className={el.my === "yes" ? classes.yes : classes.no} key={index}>{el.value}<div className={classes.time}>{time}</div></li>).reverse();
    return (
            <div>
                <ul className={classes.result}>{preparedMessages}</ul>
            </div>
        )
    };

export default MessageList;
