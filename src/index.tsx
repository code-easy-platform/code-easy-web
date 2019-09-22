import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

setInterval(() => {
    ReactDOM.render(<App />, document.getElementById('root'));
}, 200);

serviceWorker.unregister();
