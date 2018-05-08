// @flow

import React from 'react';

import './game.css';
import Board from './Board';
import Instructions from './Instructions';

type Props = {};

export default class Game extends React.Component<Props> {
  render() {
    return (
      <div className="game">
        <Instructions />
        <div>
          <Board x={5} y={5} maxInitial={6} />
        </div>
      </div>
    );
  }
}
