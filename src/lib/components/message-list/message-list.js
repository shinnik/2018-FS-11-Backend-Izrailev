import React, { PureComponent } from 'react';
import classes from './MessageList.module.css';

class MessageList extends PureComponent {

    myOrNot(message) {
        if (message.getIn(['my']) === "yes")
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
            // console.log(el.getIn(['value']));
            if (typeof el.getIn(['value']) === "string") {
                let innHTML = `${el.getIn(['value'])} <div class=${classes.time}>${time}</div>`;
                let comp = <li dangerouslySetInnerHTML={{__html: innHTML}} className={this.myOrNot(el)}
                               key={index}></li>
                return comp
            }
            //image gained
            if (typeof el.getIn(['value']) === "object") {
                let comp = <li className={this.myOrNot(el)} key={index}>{el.getIn(['value']).map((elem, i) => <div key={i}>{elem}</div>)}<div className={classes.time}>{time}</div></li>;
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
