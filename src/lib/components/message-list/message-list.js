import React, { Component } from 'react';
import classes from './MessageList.module.css';

class MessageList extends Component {

    myOrNot(message) {
        if (message.my === "yes")
            return classes.yes;
        else {
            return classes.no;
        }
    }

    render() {
        // console.log(this.props.messages);
        let date = new Date();
        let time = date.getHours() + ':' + date.getMinutes();

        let preparedMessages = this.props.messages.map((el, index) => {
            // console.log(el); dangerouslySetInnerHTML={{__html: innHTML}}
            // console.log();
            if (typeof el.value === "string") {
                let innHTML = `${el.value} <div class=${classes.time}>${time}</div>`;
                let comp = <li dangerouslySetInnerHTML={{__html: innHTML}} className={this.myOrNot(el)}
                               key={index}></li>
                return comp
            }
            //image gained
            if (typeof el.value === "object") {
                let comp = <li className={this.myOrNot(el)} key={index}>{el.value.map((elem, i) => <div key={i}>{elem}</div>)}<div className={classes.time}>{time}</div></li>;
                return comp;
            }}).reverse();

        return (
            <div>
                <ul className={classes.result}>{preparedMessages}</ul>
            </div>
        )
    }


}

export default MessageList;
