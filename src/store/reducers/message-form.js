import * as actions from './actions';
import getPosition from '../../../src/lib/components/utils/geolocation';
import React from "react";
import { setEndOfContenteditable } from '../../lib/components/utils/CaretControl';
import { Map } from 'immutable';

const initialState = Map({
  messages: [{
      value: 'Hello, Nikita!',
      my: "no"
  }],
  emojiCounter: 0,
});

const messagesReducer = (state = initialState, action) => {
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
            let newMessages = state.get('messages');
            if (action.payload.event.target.innerHTML !== '') {
                let content = action.payload.event.target.innerHTML;
                let message = {
                    value: content,
                    my: "yes"
                };
                newMessages = [...newMessages, message];
                action.payload.event.target.innerHTML = '';
            }
            return state.set('messages', newMessages);
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

            let messagesWithGeo = state.get('messages');

            getPosition(geoOptions).then(position => {
                userPosition.latitude = position.coords.latitude.toFixed(5);
                userPosition.longitude = position.coords.longitude.toFixed(5);
                let geoMessage = 'Latitude: ' + userPosition.latitude + '\nLongitude: ' + userPosition.longitude;
                let message = {
                    value: geoMessage,
                    my: "no"
                };
                messagesWithGeo = [...messagesWithGeo, message];
            });
            return state.set('messages', messagesWithGeo);
        case actions.ADD_FILE:
            let filelist = action.event.target.files;
            let blobFileList = [];
            for (let i = 0; i < filelist.length; i++) {
                let blobFile = URL.createObjectURL(filelist[i]);
                blobFileList.push(blobFile);
            }
            let messagesWithFiles = state.get('messages');
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
                            <img src={el} alt="nopic"/>
                            <br />
                        </div>
                    )
                }
            });
            let message = {
                value: arrayToConcat,
                my: "yes"
            };
            messagesWithFiles = [...messagesWithFiles, message];
            action.event.target.value = '';
            return state.set('messages', messagesWithFiles);
        case actions.ADD_BY_CLICK:
            let newMessagesAfterClick = state.get('messages');
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
                let message = {
                    value: content,
                    my: "yes"
                };
                newMessagesAfterClick = [...newMessagesAfterClick, message];
                action.payload.input.innerHTML = '';
            }
            return state.set('messages', newMessagesAfterClick);
        case actions.ADD_EMOJI:
            let cnt = state.emojiCounter + 1;
            let input = document.querySelector('span#input');
            if (input !== document.activeElement) {
                input.focus();
                setEndOfContenteditable(input);
            }
            let iconElementId = action.event.target.getAttribute('class');
            let ele = "<span contenteditable=false";
            //  the only one appropriate usage of template literal in my project
            let el = ele.concat(" title=emoji", ` class=${iconElementId}`, ` id=${cnt}`, "></span>");
            document.execCommand('insertHTML', false, el);
            return state.set('emojiCounter', cnt);
        case actions.MESSAGE_RECEIVED:
            let messagesWithFromCompanionOne = state.get('messages');
            message = {
                value: action.payload.data.text,
                my: "no"
            };
            messagesWithFromCompanionOne = [...messagesWithFromCompanionOne, message];
            return state.set('messages', messagesWithFromCompanionOne);
        default:
            return state;

    }
}

export default messagesReducer;
