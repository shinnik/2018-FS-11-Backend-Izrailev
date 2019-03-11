import React, { Component } from 'react';
// import emojis from 'emojis';
import classes from './Keyboard.module.css'
import connect from "react-redux/es/connect/connect";
import * as actions from '../../../store/reducers/actions';
import { SharedWorkerContext } from '../../../sharedWorkerContext';


const URL = "./png/labeled/32/people";

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

    constructor(props) {
        super(props);
    }

    render() {
        // const emojiList = EMOJIS.map((emoji, i) => <span key={i} style={{background: url(`${URL}/${emoji.name}.png?sprite`)}}/>);
        // const emojiList = EMOJIS.map((emoji, i) => <span key={i} className={classes.emoji} onClick={(emoji) => this.handleEmoji(emoji)} id={emoji.name}/>)
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
// const mapDispatchToProps = (dispatch) => {
//     return {
//         onEmojiClick: (event) => {
//             dispatch({type: actions.ADD_EMOJI, event: event})
//         }
//     }
// }
//
// export default connect(null, mapDispatchToProps)(Keyboard);
