// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Game from './Game';

var root = document.getElementById('root');
if (root === null) {
  throw new Error('no root element');
}
ReactDOM.render(<Game />, root);
registerServiceWorker();
console.log('Running Plus One game ' + process.env.APP_VERSION);
// ========================================
