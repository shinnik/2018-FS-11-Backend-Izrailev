import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './Chat.module.css';
import { connect } from 'react-redux';

class Chats extends Component {
    render () {
        return (
            <div className={classes.chatListContainer}>
                <h1>Chats</h1>
                <ul className="chat-list">
                    <li className="linker"><Link to='/list_chats/chat_id=1'>{this.props.chatName + ' /- ' + this.props.unread.toString() + ' new messages.'}</Link></li>
                    <li className="linker"><Link to='/list_chats/chat_id=2'>{this.props.chatName + ' /- ' + this.props.unread.toString() + ' new messages.'}</Link></li>
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

};


export default connect(mapStateToProps, mapDispatchToProps)(Chats);
