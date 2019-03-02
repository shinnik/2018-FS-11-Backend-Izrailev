import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from "./MessageForm.module.css";
import FormInput from "../../components/form-input/form-input";
import GeoForm from "../../components/geo-form/geo-form";
import MessageList from '../../components/message-list/message-list';
import AttachForm from '../../components/attach-form/attach-form'
import SendButton from '../../components/send-button/send-button'
import * as actions from '../../../store/reducers/actions'
import Keyboard from "../Keyboard/EmojiKeyboard";

class MessageForm extends Component {
    render() {
        return (
            //<style>${styles.toString()}</style>
            <div className={classes.FooterContainer}>
                <MessageList messages={this.props.messages}></MessageList>
                {/*<DropZone></DropZone>*/}
                <span className={classes.FormContainer}>
                    <GeoForm onSendGeo={this.props.onGeoMessage}></GeoForm>
                    <FormInput placeholder="Cообщение"
                               onMessageCommit={this.props.onHandleMessage}>
                    </FormInput>
                    {/*<div className={classes.KeyboardContainer}><Keyboard/></div>*/}
                    <Keyboard onEmojiClick={this.props.onEmojiClick}/>
                    <SendButton onButtonClick={this.props.onSendButtonClick}></SendButton>
                    <AttachForm onSendFile={this.props.onFileMessage}></AttachForm>
                </span>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        messages: state.msg.messages
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onHandleMessage: (e) => {
            if (e.which === 13) {
                e.preventDefault();
                dispatch({type: actions.ADD_TEXT, event: e})
            }
        },
        onGeoMessage: (e) => {
            e.preventDefault();
            dispatch({type: actions.ADD_LOCATION, event: e})
        },
        onFileMessage: (e) => {
           e.preventDefault();
           dispatch({type: actions.ADD_FILE, event: e})
        },
        onSendButtonClick: (e) => {
            e.preventDefault();
            let input = document.querySelector('div#input');
            console.log(input);
            dispatch({type: actions.ADD_BY_CLICK, input: input})
        },
        onEmojiClick: (e) => {
            e.preventDefault();
            dispatch({type: actions.ADD_EMOJI, event: e})
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
