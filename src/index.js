import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './AppNavigated';
import messagesReducer from './store/reducers/message-form';
import headerReducer from './store/reducers/header';
import authReducer from './store/reducers/auth';

import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import chatReducer from "./store/reducers/chats";
import * as Sentry from "@sentry/browser";


Sentry.init({
    dsn: "https://c9f4a3821e94484fac2de845dbca0111@sentry.io/1451722"
});


let rootReducer = combineReducers({
    msg: messagesReducer,
    hdr: headerReducer,
    ch: chatReducer,
    auth: authReducer
});

console.log(React.version);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
