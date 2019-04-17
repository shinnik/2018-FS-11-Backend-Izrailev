import React, { Component } from 'react';
import classes from './Keyboard.module.css'
import { SharedWorkerContext } from '../../../sharedWorkerContext';
import { EMOJIS } from "./emojis";

class Keyboard extends Component {

    render() {
        const emojiList = EMOJIS.map((emoji, i) => <span title="emoji" key={i} className={emoji.name} onMouseDown={event => event.preventDefault()} onClick={this.props.onEmojiClick}></span>)
        return (
            <label className={classes.EmojiButton}>
                <i className={classes.MaterialIcons}>sentiment_satisfied_alt</i>
                <div className={classes.KeyboardContainer}>
                    {emojiList}
                </div>
            </label>
        )
    }
}

Keyboard.contextType = SharedWorkerContext;
export default Keyboard
