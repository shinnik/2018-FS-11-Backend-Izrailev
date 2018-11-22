import * as actions from './actions';
import getPosition from '../../../src/lib/components/utils/geolocation';
import React from "react";

const initialState = {
  messages: []
};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_TEXT:
            let text = action.event.target[0].value;
            let newMessages = [...state.messages];
            newMessages.push(text);
            action.event.target[0].value = '';
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
            getPosition(geoOptions).then(position => {
                userPosition.latitude = position.coords.latitude.toFixed(5);
                userPosition.longitude = position.coords.longitude.toFixed(5);
                var geoMessage = 'Latitude: ' + userPosition.latitude + '\n' + 'Longitude: ' + userPosition.longitude;
                let messagesWithGeo = [...state.messages];
                messagesWithGeo.push(geoMessage);
                return {
                    ...state,
                    messages: messagesWithGeo
                };
            });
            return {
                ...state
            };
        case actions.ADD_FILE:
            let filelist = action.event.target.files;
            let blobFileList = [];
            for (let i = 0; i < filelist.length; i++) {
                let blobFile = URL.createObjectURL(filelist[i]);
                blobFileList.push(blobFile);
            }
            let messagesWithFiles = [...state.messages];
            let arrayToConcat = blobFileList.map((el, index) => (filelist[blobFileList.indexOf(el)].type !== 'image/png' && filelist[blobFileList.indexOf(el)].type !== 'image/jpeg') ? <div key={el.id}><a key={index} href={el}>{filelist[blobFileList.indexOf(el)].name}</a><br/> </div>: <div key={el.id}><img src={el}></img><br /></div>);
            messagesWithFiles.push(arrayToConcat);
            action.event.target.value = '';
            return {
                ...state,
                messages: messagesWithFiles
            };
        case actions.ADD_BY_CLICK:
            let newMessagesAfterClick = [...state.messages];
            text = action.input.value;
            newMessagesAfterClick.push(text);
            action.input.value = '';
            return {
                ...state,
                messages: newMessagesAfterClick
            };
        default:
            return {
                ...state
            }

    }
}

export default messagesReducer;
