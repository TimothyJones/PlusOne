// @flow

import React from 'react';

import './game.css';
import Board from './Board';
import Instructions from './Instructions';
import ShareCount from './ShareCount';
import config from '../config.js';
import VersionNumber from './VersionNumber';

type Props = {};

export default class Game extends React.Component<Props> {
  render() {
    return (
      <div className="game">
        <Instructions />
        <div>
          <Board x={5} y={5} maxInitial={config.generator.maxInitial} />
        </div>
        <ShareCount url={config.homepage} />
        <VersionNumber />
      </div>
    );
  }
}
