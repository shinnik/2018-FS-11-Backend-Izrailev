import * as actions from './actions';
import getPosition from '../../../src/lib/components/utils/geolocation';
import React from "react";
import { setEndOfContenteditable } from '../../lib/components/utils/CaretControl';

const initialState = {
  messages: [],
  emojiCounter: 0,
};

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
            let newMessages = [...state.messages];
            if (action.payload.event.target.innerHTML !== '') {
                let content = action.payload.event.target.innerHTML;
                console.log(content, typeof content);
                let message = {
                    value: content,
                    my: "yes"
                };
                newMessages.push(message);
                action.payload.event.target.innerHTML = '';
            }
            return {
                ...state,
                messages: newMessages
            };
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

            let messagesWithGeo = [...state.messages];

            getPosition(geoOptions).then(position => {
                userPosition.latitude = position.coords.latitude.toFixed(5);
                userPosition.longitude = position.coords.longitude.toFixed(5);
                let geoMessage = 'Latitude: ' + userPosition.latitude + '\nLongitude: ' + userPosition.longitude;
                let message = {
                    value: geoMessage,
                    my: "yes"
                };
                messagesWithGeo.push(message);
            });
            return {
                ...state,
                messages: messagesWithGeo
            };
        case actions.ADD_FILE:
            let filelist = action.event.target.files;
            let blobFileList = [];
            for (let i = 0; i < filelist.length; i++) {
                let blobFile = URL.createObjectURL(filelist[i]);
                blobFileList.push(blobFile);
            }
            let messagesWithFiles = [...state.messages];
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
            console.log(arrayToConcat);
            let message = {
                value: arrayToConcat,
                my: "yes"
            };
            messagesWithFiles.push(message);
            action.event.target.value = '';
            return {
                ...state,
                messages: messagesWithFiles
            };
        case actions.ADD_BY_CLICK:
            let newMessagesAfterClick = [...state.messages];
            action.payload.worker.then((worker) => worker.port.postMessage({
                apiName: 'send_message',
                data: {
                    user_id: '4',
                    chat_id: '2',
                    content: action.payload.input.value
                }
            }))
            if (action.payload.input.innerHTML !== '') {
                let content = action.payload.input.innerHTML;
                let message = {
                    value: content,
                    my: "yes"
                };
                newMessagesAfterClick.push(message);
                action.payload.input.innerHTML = '';
            }
            return {
                ...state,
                messages: newMessagesAfterClick
            };
        case actions.ADD_EMOJI:
            let cnt = state.emojiCounter + 1;
            let input = document.querySelector('span#input');
            if (input !== document.activeElement) {
                input.focus();
                setEndOfContenteditable(input);
            }
            let iconElementId = action.event.target.getAttribute('class');
            console.log(iconElementId);
            let ele = "<span contenteditable=false";
            // +  " title=emoji" + ` class=${iconElementId}` + ` id=${cnt}` + "></span>"; //&#8203;
            // let ele = "<span contenteditable=false title=emoji" + ` class=${iconElementId}` + ` id=${cnt}` + "></span>"
            let el = ele.concat(" title=emoji", ` class=${iconElementId}`, ` id=${cnt}`, "></span>");
            document.execCommand('insertHTML', false, el);
            return {
                ...state,
                emojiCounter: cnt
            };
        case actions.MESSAGE_RECEIVED:
            let messagesWithFromCompanionOne = [...state.messages];
            message = {
                value: action.payload.data.text,
                my: "no"
            };
            messagesWithFromCompanionOne.push(message);
            return {
                ...state,
                messages: messagesWithFromCompanionOne
            };
        default:
            return {
                ...state
            }

    }
}

export default messagesReducer;
