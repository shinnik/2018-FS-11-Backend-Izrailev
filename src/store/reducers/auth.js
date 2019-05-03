import * as actionTypes from '../actions/actionTypes';
import { fromJS } from 'immutable';

const initialState = fromJS({
    token: null,
    error: null,
    loading: false,
});

const authStart = (state, action) => {
    return state
        .set('error', null)
        .set('loading', true);
};

const authSuccess = (state, action) => {
    return state
        .set('token', action.payload.token)
        .set('error', null)
        .set('loading', false);
};

const authFail = (state, action) => {
    return state
        .set('error', action.error)
        .set('loading', false);
};

const logout = (state, action) => {
    return state
        .set('token', null)
        .set('error', null)
        .set('loading', false);
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILED: return authFail(state, action);
        case actionTypes.LOGOUT:
            window.localStorage.removeItem('access_token');
            return logout(state, action);
        default: return state;
    }
};
export default reducer;
