import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import './app/style/global.css';
import { App } from './app/App';

// Inicia o uso a fonte roboto no projeto
require('typeface-roboto');

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
