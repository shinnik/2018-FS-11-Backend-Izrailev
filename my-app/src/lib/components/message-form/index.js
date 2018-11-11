import React, { Component } from 'react';
import styles from './styles.css';
import FormInput from './form-input/form-input';
import classes from './MessageForm.module.css';
import GeoForm from '../geo-form/geo-form'


export default class MessageForm extends Component {

    state = {
        messages: []
    }

    constructor(props) {
        super(props);
        this.handleMessage = this.handleMessage.bind(this);
    }

    handleMessage = function (newMessage) {
        this.state.messages.push(newMessage);
    }

    render() {
        return (
            //<style>${styles.toString()}</style>
            <div className={classes.FooterContainer}>
                {/*<MessageList messages={this.state.messages}></MessageList>*/}
                {/*<DropZone></DropZone>*/}
                <span className={classes.FormContainer}>
                    <GeoForm></GeoForm>
                    <FormInput placeholder="Cообщение"
                               onMessageCommit={this.handleMessage}></FormInput>
                    {/*<AttachForm></AttachForm>*/}
                    {/*<SendButton></SendButton>*/}
                </span>
            </div>
         );
    }
}
