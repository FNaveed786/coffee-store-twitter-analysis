import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import thunkMiddleware from 'redux-thunk';

import App from './App';

import './index.css';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise, thunkMiddleware)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>
    , document.getElementById('root'));
