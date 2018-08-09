// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import Game from './Game';
import config from './config';
import './index.css';

/* global document */

const root = document.getElementById('root');
if (root === null) {
  throw new Error('no root element');
}
ReactDOM.render(<Game />, root);
registerServiceWorker();
console.info(`Running Plus One Game ${config.version}`);
console.info(
  `  Settings: range ${
    config.generator.usualRange
  }, score server ${config.features.ScoreServer.toString()}`
);

// ========================================
