import * as actions from './actions';

const initialState = {
    name: 'ChatDefaultName',
    numOfMessages: 0
};

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
            return {
                ...state,
            };
        default:
            return {
                ...state
            }
    }
};

export default chatReducer;
