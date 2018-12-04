import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {token},
    }
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error
    }
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        fetch('http://127.0.0.1:5050/check_auth',{
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "Origin": "http://127.0.0.1:3000"
            },
            body: JSON.stringify({email: email, password: password}),
            mode: "cors"
        }).then(res => res.json())
            .then(data => {
            console.log(data);
            localStorage.setItem('access_token', data.token);
            dispatch(authSuccess(data.token));
        }).catch(err => {
                console.log(err);
                dispatch(authFailed(err))
            });
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('access_token');
        if(token) {
            dispatch(authSuccess(token));
        }
    }
}
