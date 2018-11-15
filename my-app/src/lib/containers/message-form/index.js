import React, { Component } from 'react';
import styles from './styles.css';
import FormInput from './form-input/form-input';
import classes from './MessageForm.module.css';
import GeoForm from '../../components/geo-form/geo-form';
import AttachForm from '../../components/attach-form/attach-form';
import SendButton from '../../components/send-button/send-button';
import MessageList from '../../components/message-list/message-list';


export default class MessageForm extends Component {

    constructor(props) {
        super(props);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleSendButton = this.handleSendButton.bind(this);
        this.state = { messages: [], isSendButtonClicked: false };
    }

    handleMessage = function (newMessage) {
        //console.log(newMessage);
        let refreshedMessages = [...this.state.messages];
        refreshedMessages.push(newMessage);
        this.setState({messages: refreshedMessages, isSendButtonClicked: false});
    };

    handleSendButton = function (e) {
        console.log('before', this.state.isSendButtonClicked);
        let clicked = true;
        this.setState({isSendButtonClicked: clicked});
    };

    render() {
        return (
            //<style>${styles.toString()}</style>
            <div className={classes.FooterContainer}>
                <MessageList messages={this.state.messages}></MessageList>
                {/*<DropZone></DropZone>*/}
                <span className={classes.FormContainer}>
                    <GeoForm onSendGeo={this.handleMessage}></GeoForm>
                    <FormInput placeholder="Cообщение"
                               onMessageCommit={this.handleMessage}
                               isButtonTriggered={this.state.isSendButtonClicked}>
                    </FormInput>
                    <SendButton onButtonClick={this.handleSendButton}></SendButton>
                    <AttachForm onSendFile={this.handleMessage}></AttachForm>
                </span>
            </div>
         );
    }
}
