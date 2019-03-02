import React, { Component } from 'react';
import classes from './MessageList.module.css';

class MessageList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let date = new Date();
        let time = date.getHours() + ':' + date.getMinutes();
        let preparedMessages = this.props.messages.map((el, index) => {
            let innHTML = [el.value, `<div class=${classes.time}>${time}</div>`].join(' ');
            let comp = <li dangerouslySetInnerHTML={{__html: innHTML}} className={el.my === "yes" ? classes.yes : classes.no}
                key={index}></li>
            return comp
        }).reverse();

        return (
            <div>
                <ul className={classes.result}>{preparedMessages}</ul>
            </div>
        )
    }


    };

export default MessageList;
