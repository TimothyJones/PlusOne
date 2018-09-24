// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import Game from './Game';
import './index.css';

/* global document */
const root = document.getElementById('root');
if (root === null) {
  throw new Error('no root element');
}
ReactDOM.render(<Game />, root);
registerServiceWorker();
