import * as actionTypes from '../actions/actionTypes';
import {authStart, authSuccess, authFailed} from '../actions/auth';
import { fromJS } from 'immutable';


const initialState = fromJS({
    token: null,
    error: null,
    loading: false,
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILED: return authFailed(state, action);
        default: return state;
    }
};
export default reducer;
