import React from 'react';
import ReactDOM from 'react-dom';
import './index2.css';
import CommentApp from './containers/CommentApp';
import registerServiceWorker from './registerServiceWorker';
import commentsReducer from './reducers/comments';
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(commentsReducer)

ReactDOM.render(
    <Provider store={store}>
        <CommentApp />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
