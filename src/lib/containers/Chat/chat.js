import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './Chat.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/reducers/actions'
import {SharedWorkerContext} from "../../../sharedWorkerContext";
import { ChatForm } from '../../components/chat-form/ChatForm'

class Chats extends Component {

    componentWillMount() {
        // console.log(this.context);
        this.consoleWorker = this.context(this.handleResp);
        this.props.onPreloadChats(this.consoleWorker)
    }

    handleResp = (event) => {
        console.log(event.data)
    }

    componentDidMount() {
        this.consoleWorker.then((worker) => {worker.port.postMessage('disconnect')})
    }

    render () {
        return (
            <div className={classes.chatListContainer}>
                <h1>Chats</h1>
                <ul className="chat-list">
                    <li className={classes.linker}><ChatForm chatName={this.props.chatName} chatID={this.props.chatID} unread={this.props.unread} /></li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        chatName: state.ch.name,
        unread: state.ch.numOfMessages,
        chatID: state.ch.chat_id
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onPreloadChats: (loadWorker) => {
            dispatch( {type: actions.LOAD_CHATS, loadWorker: loadWorker} )
        }
    }
};

Chats.contextType = SharedWorkerContext;
export default connect(mapStateToProps, mapDispatchToProps)(Chats);
