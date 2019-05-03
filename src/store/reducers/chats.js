import * as actions from './actions';
import { fromJS } from 'immutable';

const initialState = fromJS({
    name: 'Asya',
    numOfMessages: 1,
    chat_id: 1
});

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.LOAD_CHATS:
            action.loadWorker.then((worker) => worker.port.postMessage({
                apiName: 'list_chats',
                fetch: false,
                data: {
                    user_id: '2'
                }
            }));
            return state;
        default:
            return state
    }
};

export default chatReducer;
