import React from 'react';
import ReactDOM from 'react-dom';
import './index2.css';
import CommentApp from './CommentApp'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<CommentApp />, document.getElementById('root'));
registerServiceWorker();
