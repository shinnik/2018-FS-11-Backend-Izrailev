import * as actions from './actions';
import React from "react";

const initialState = {
    name: 'ChatDefaultName',
    numOfMessages: 0
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return {
                ...state
            }
    }
};

export default chatReducer;
