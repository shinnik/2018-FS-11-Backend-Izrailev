import { fromJS } from 'immutable';

const initialState = fromJS({
    isAuthorized: true,
    name: 'Nikita'
});

const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
};

export default headerReducer;
