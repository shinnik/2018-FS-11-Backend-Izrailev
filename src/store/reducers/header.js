import * as actions from './actions';
import React from "react";

const initialState = {
    isAuthorized: true,
    name: 'Nikita'
};

const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return {
                ...state
            }
    }
};

export default headerReducer;
