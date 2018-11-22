import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './AppNavigated';
import * as serviceWorker from './serviceWorker';
import messagesReducer from './store/reducers/message-form';
import headerReducer from './store/reducers/header';



import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import chatReducer from "./store/reducers/chats";

let rootReducer = combineReducers({
    msg: messagesReducer,
    hdr: headerReducer,
    ch: chatReducer
});

let store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
