import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './Chat.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/reducers/actions'
import {SharedWorkerContext} from "../../../sharedWorkerContext";

class Chats extends Component {

    componentWillMount() {
        // console.log(this.context);
        this.consoleWorker = this.context(this.handleResp);
        this.props.onPreloadChats(this.consoleWorker)
    }

    handleResp = (event) => {
        console.log(event.data)
    }

    componentWillUnmount() {
        this.consoleWorker.then((worker) => {worker.port.postMessage('disconnect')})
    }

    render () {
        return (
            <div className={classes.chatListContainer}>
                <h1>Chats</h1>
                <ul className="chat-list">
                    <li className="linker"><Link to='/list_chats/chat_id=1'>{this.props.chatName + ' /- ' + this.props.unread.toString() + ' new messages.'}</Link></li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        chatName: state.ch.name,
        unread: state.ch.numOfMessages
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
