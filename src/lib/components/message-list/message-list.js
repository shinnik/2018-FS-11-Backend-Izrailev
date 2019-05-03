import React, { PureComponent } from 'react';
import classes from './MessageList.module.css';

class MessageList extends PureComponent {

    myOrNot(message) {
        if (message.my === "yes")
            return classes.yes;
        else {
            return classes.no;
        }
    }

    render() {
        console.log('MESSAGES', this.props.messages);
        let date = new Date();
        let time = date.getHours() + ':' + date.getMinutes();

        let preparedMessages = this.props.messages.map((el, index) => {
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
            }
            return null}).reverse();

        return (
            <div>
                <ul className={classes.result}>{preparedMessages}</ul>
            </div>
        )
    }


}

export default MessageList;
