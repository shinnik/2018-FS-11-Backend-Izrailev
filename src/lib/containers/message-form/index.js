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
import {SharedWorkerContext} from "../../../sharedWorkerContext";

class MessageForm extends Component {

    handleResp = (event) => {
        console.log(event.data)
    }

    componentWillMount() {
        this.consoleWorker = this.context(this.handleResp);
        this.props.onPreloadMessages(this.consoleWorker)
    }

    componentWillUnmount() {
        this.consoleWorker.then((worker) => {worker.port.postMessage('disconnect')})
    }

    render() {
        return (
            //<style>${styles.toString()}</style>
            <div className={classes.FooterContainer}>
                <MessageList messages={this.props.messages}></MessageList>
                {/*<DropZone></DropZone>*/}
                <span className={classes.FormContainer}>
                    <GeoForm worker={this.consoleWorker} onSendGeo={this.props.onGeoMessage}></GeoForm>
                    <FormInput worker={this.consoleWorker} placeholder="Cообщение"
                               onMessageCommit={this.props.onHandleMessage}>
                    </FormInput>
                    {/*<div className={classes.KeyboardContainer}><Keyboard/></div>*/}
                    <Keyboard onEmojiClick={this.props.onEmojiClick}/>
                    <SendButton worker={this.consoleWorker} onButtonClick={this.props.onSendButtonClick}></SendButton>
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
        onPreloadMessages: (loadWorker) => {
            dispatch({type: actions.PRELOAD_MESSAGES, loadWorker: loadWorker})
        },
        onHandleMessage: (pld) => {
            if (pld.event.which === 13) {
                pld.event.preventDefault();
                dispatch({type: actions.ADD_TEXT, payload: pld})
            }
        },
        onGeoMessage: (pld) => {
            pld.event.preventDefault();
            dispatch({type: actions.ADD_LOCATION, event: pld.event})
        },
        onFileMessage: (e) => {
           e.preventDefault();
           dispatch({type: actions.ADD_FILE, event: e})
        },
        onSendButtonClick: (pld) => {
            pld.event.preventDefault();
            let input = document.querySelector('span#input');
            pld["input"] = input;
            dispatch({type: actions.ADD_BY_CLICK, payload: pld})
        },
        onEmojiClick: (e) => {
            e.preventDefault();
            dispatch({type: actions.ADD_EMOJI, event: e})
        }
    }
};

MessageForm.contextType = SharedWorkerContext;
export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
