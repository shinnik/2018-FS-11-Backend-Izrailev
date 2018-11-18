import React from 'react';
import ReactDOM from 'react-dom';
import classes from './MessageList.module.css';

const MessageList = ({messages}) => {

    var ID = function () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    //let preparedMessages = messages.map((el) => <li key={ID()}>{el}</li>).reverse();


     let constructList = (messages) => {
        let preparedMessages = [];
        for (let i = 0; i < messages.length; i++) {
            let listElem = React.createElement('li', {key: ID()}, messages[i]);
            preparedMessages.push(listElem);
            }
        return preparedMessages;
        };

    let preparedMessages = constructList(messages).reverse();

    return (
        <div>
            <ul className={classes.result}>{preparedMessages}</ul>
        </div>
    )
};

export default MessageList;
