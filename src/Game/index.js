// @flow

import React from 'react';

import './game.css';
import Board from './Board';
import Instructions from './Instructions';
import ShareCount from './ShareCount';
import config from '../config';
import VersionNumber from './VersionNumber';

export default () => (
  <div className="game">
    <Instructions />
    <div>
      <Board x={5} y={5} maxInitial={config.generator.maxInitial} />
    </div>
    <ShareCount url={config.homepage} />
    <VersionNumber />
  </div>
);
