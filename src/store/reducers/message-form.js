import * as actions from './actions';
import getPosition from '../../../src/lib/components/utils/geolocation';
import React from "react";
import { setEndOfContenteditable } from '../../lib/components/utils/CaretControl';
import {fromJS, Map} from 'immutable';

const initialState = fromJS({
  messages: [{
      value: 'Hello, Nikita!',
      my: 'no'
  }],
  emojiCounter: 0,
});

const messagesReducer = (state = initialState, action) => {
    console.log(initialState);
    switch (action.type) {
        case actions.PRELOAD_MESSAGES:
            action.loadWorker.then((worker) => worker.port.postMessage({
                apiName: 'list_messages',
                fetch: false,
                data: {
                    chat_id: '2',
                    limit: '30',
                }
            }));
            return state;
        case actions.ADD_TEXT:
            let content = action.payload.event.target.innerHTML;
            action.payload.worker.then((worker) => worker.port.postMessage({
                apiName: 'send_message',
                fetch: false,
                data: {
                    user_id: '4',
                    chat_id: '2',
                    content: content
                }
            }));
            // let newMessages = state.getIn(['messages'], ());
            if (action.payload.event.target.innerHTML !== '') {
                let content = action.payload.event.target.innerHTML;
                let message = Map({
                    value: content,
                    my: 'yes'
                });
                // newMessages = [...newMessages, message];
                state = state.updateIn(['messages'], list => list.push(message));
                action.payload.event.target.innerHTML = '';
            }
            return state;
        case actions.ADD_LOCATION:
            const geoOptions = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 36e5
            };

            let userPosition = {
                latitude: null ,
                longitude: null
            };

            getPosition(geoOptions).then(position => {
                userPosition.latitude = position.coords.latitude.toFixed(5);
                userPosition.longitude = position.coords.longitude.toFixed(5);
                let geoMessage = 'Latitude: ' + userPosition.latitude + '\nLongitude: ' + userPosition.longitude;
                let message = Map({
                    value: geoMessage,
                    my: 'no'
                });

                state = state.updateIn(['messages'], list => list.push(message));

            });
            return state;
        case actions.ADD_FILE:
            let filelist = action.event.target.files;
            let blobFileList = [];
            for (let i = 0; i < filelist.length; i++) {
                let blobFile = URL.createObjectURL(filelist[i]);
                blobFileList.push(blobFile);
            }
            console.log(blobFileList);
            let arrayToConcat = blobFileList.map((el, index) => {
                if ((filelist[blobFileList.indexOf(el)].type !== 'image/png') && (filelist[blobFileList.indexOf(el)].type !== 'image/jpeg')) {
                     return (
                    <div key={el.id}>
                        <a key={index} href={el}>{filelist[blobFileList.indexOf(el)].name}</a>
                        <br/>
                     </div>
                     )}
                else {
                    return (
                        <div key={el.id}>
                            <img src={el} alt='nopic'/>
                            <br />
                        </div>
                    )
                }
            });
            let message = Map({
                value: arrayToConcat,
                my: 'yes'
            });

            state = state.updateIn(['messages'], list => list.push(message));
            action.event.target.value = '';
            return state;
        case actions.ADD_BY_CLICK:
            action.payload.worker.then((worker) => worker.port.postMessage({
                apiName: 'send_message',
                data: {
                    user_id: '4',
                    chat_id: '2',
                    content: action.payload.input.value
                }
            }));
            if (action.payload.input.innerHTML !== '') {
                let content = action.payload.input.innerHTML;
                let message = Map({
                    value: content,
                    my: "yes"
                });
                // newMessagesAfterClick = [...newMessagesAfterClick, message];
                state = state.updateIn(['messages'], list => list.push(message));
                action.payload.input.innerHTML = '';
            }
            return state;
        case actions.ADD_EMOJI:
            let cnt = state.emojiCounter + 1;
            let input = document.querySelector('span#input');
            if (input !== document.activeElement) {
                input.focus();
                setEndOfContenteditable(input);
            }
            let iconElementId = action.event.target.getAttribute('class');
            let ele = '<span contenteditable=false';
            //  the only one appropriate usage of template literal in my project
            let el = ele.concat(' title=emoji', ` class=${iconElementId}`, ` id=${cnt}`, '></span>');
            document.execCommand('insertHTML', false, el);
            return state.set('emojiCounter', cnt);
        case actions.MESSAGE_RECEIVED:
            message = Map({
                value: action.payload.data.text,
                my: 'no'
            });
            state = state.updateIn(['messages'], list => list.push(message));
            return state;
        default:
            return state;

    }
}

export default messagesReducer;
