import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './Chat.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/reducers/actions'

class Chats extends Component {
    state = {
        chats: null
    };

      onLoad = () => {
        let params = {
            user_id: 10
        };
        fetch('http://127.0.0.1:5050',{
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "Origin": "http://127.0.0.1:3000"
            },
            body: JSON.stringify({method: "list_chats", params: params}),
            mode: "cors"
        }).then(res => res.json()).then(res => this.props.onGetChats(res))
    };

    render () {
        return (
            <div className={classes.chatListContainer}>
                <h1>Chats</h1>
                <ul className="chat-list">
                    <li onClick={this.onLoad} className="linker"><Link to='/list_chats/chat_id=1'>{this.props.chatName + ' /- ' + this.props.unread.toString() + ' new messages.'}</Link></li>
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
        onGetChats: (result) => {
            dispatch( {type: actions.LOAD_CHATS, payload: result} )
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Chats);
