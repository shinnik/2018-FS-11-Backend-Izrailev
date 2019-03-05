import * as actions from './actions';
import getPosition from '../../../src/lib/components/utils/geolocation';
import React from "react";

const initialState = {
  messages: []
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
            document.querySelector('span#input').focus();
            let iconElementId = action.event.target.id;
            let el = "<span" +  " class=Keyboard_emoji__3YzE4" + ` id=${iconElementId}` + "></span>&#8203;";
            document.execCommand('insertHTML', false, el);
            return state;
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
