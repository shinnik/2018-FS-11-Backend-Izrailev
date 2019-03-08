import * as actions from './actions';
import getPosition from '../../../src/lib/components/utils/geolocation';
import React from "react";
import { setEndOfContenteditable, placeCaretAfterNode } from '../../lib/components/utils/CaretControl';

const initialState = {
  messages: [],
  emojiCounter: 0
};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_TEXT:
            let newMessages = [...state.messages];
            if (action.event.target.innerHTML !== '') {
                let content = action.event.target.innerHTML;
                console.log(content, typeof content);
                let message = {
                    value: content,
                    my: "yes"
                };
                newMessages.push(message);
                action.event.target.innerHTML = '';
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
            let arrayToConcat = blobFileList.map((el, index) => (filelist[blobFileList.indexOf(el)].type !== 'image/png' && filelist[blobFileList.indexOf(el)].type !== 'image/jpeg') ? <div key={el.id}><a key={index} href={el}>{filelist[blobFileList.indexOf(el)].name}</a><br/> </div>: <div key={el.id}><img src={el} alt="nopic"></img><br /></div>);
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
            if (action.input.innerHTML !== '') {
                let content = action.input.innerHTML;
                let message = {
                    value: content,
                    my: "yes"
                };
                newMessagesAfterClick.push(message);
                action.input.innerHTML = '';
            }
            return {
                ...state,
                messages: newMessagesAfterClick
            };
        case actions.ADD_EMOJI:
            let cnt = state.emojiCounter + 1;
            let input = document.querySelector('span#input');
            input.focus();
            if (input !== document.activeElement) {
                setEndOfContenteditable(input);
            }
            let iconElementId = action.event.target.getAttribute('class');
            console.log(iconElementId);
            // let rng = document.createRange();
            // let sel = document.getSelection();
            // rng.selectNodeContents(input);
            // rng.collapse();
            // sel.addRange(rng);
            // // sel.addRange(rng);
            // console.log(input.selectionStart);
            let el = "<span contenteditable=false" +  " title=emoji" + ` class=${iconElementId}` + ` id=${cnt}` + "></span>"; //&#8203;
            console.log(el);
            if (input.childNodes.length) {
                // placeCaretAfterNode(input.childNodes[input.childNodes.length - 1], input);
            }
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
            console.log(messagesWithFromCompanionOne);
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
