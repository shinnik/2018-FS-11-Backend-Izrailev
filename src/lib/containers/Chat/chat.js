import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './Chat.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/reducers/actions'
import {SharedWorkerContext} from "../../../sharedWorkerContext";

class Chats extends Component {

    constructor(props) {
        super(props);
        // this.onLoad();
        // console.log(this.props.chatName);
    }

    componentWillMount() {
        // console.log(this.context);
        this.consoleWorker = this.context(this.handleResp);
        this.props.onPreloadChats(this.consoleWorker)
    }

    handleResp = (event) => {
        console.log(event.data)
    }

    //   onLoad = () => {
    //     let params = {
    //         user_id: 4
    //     };
    //     fetch('http://127.0.0.1:5050',{
    //         method: 'POST',
    //         headers: {
    //             "Content-type": "application/json",
    //             "Origin": "http://127.0.0.1:3000"
    //         },
    //         body: JSON.stringify({method: "list_chats", params: params}),
    //         mode: "cors"
    //     }).then(res => res.json()).then(res => this.props.onGetChats(res))
    // };

    componentWillUnmount() {
        this.consoleWorker.then((worker) => {worker.port.postMessage('disconnect')})
    }

    render () {
        // console.log('asd');
        return (
            <div className={classes.chatListContainer}>
                <h1>Chats</h1>
                <ul className="chat-list">
                    <li className="linker"><Link to='/list_chats/chat_id=1'>{this.props.chatName + ' /- ' + this.props.unread.toString() + ' new messages.'}</Link></li>
                    {/*<li className="linker"><Link to='/list_chats/chat_id=2'>{this.props.chatName + ' /- ' + this.props.unread.toString() + ' new messages.'}</Link></li>*/}
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
