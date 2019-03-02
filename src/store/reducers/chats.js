import * as actions from './actions';

const initialState = {
    name: 'ChatDefaultName',
    numOfMessages: 0
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.LOAD_CHATS:
            // console.log(action.payload);
            return {
                ...state,
                name: action.payload
            };
        default:
            return {
                ...state
            }
    }
};

export default chatReducer;
