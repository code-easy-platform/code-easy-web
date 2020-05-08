import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import './app/style/global.css';
import App from './app/App';

setInterval(() => {
    ReactDOM.render(<App />, document.getElementById('root'));
}, 200);

serviceWorker.register();
