import React, { Component } from 'react';
import classes from './Keyboard.module.css'
import { SharedWorkerContext } from '../../../sharedWorkerContext';

const EMOJIS = [
    {
        name: 'smiling_face',
        code: '::):'
    },
    {
        name: 'raised_hand',
        code: ':rh:'
    },
    {
        name: 'frowning_face',
        code: '::(:'
    },
    {
        name: 'raised_fist',
        code: ':fist:'
    },
    {
        name: 'writing_hand',
        code: ':writh:'
    },
    {
        name: 'victory_hand',
        code: ':vic:'
    },
    {
        name: 'pointing_up',
        code: ':pu:'
    }
];

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
