// @flow

import React from 'react';
import Board from './Board';

type Props = {};

export default class Game extends React.Component<Props> {
  render() {
    return (
      <div className="game">
        <div>
          <Board x={5} y={5} />
        </div>
      </div>
    );
  }
}
