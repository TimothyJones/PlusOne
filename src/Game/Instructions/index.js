// @flow

import React from 'react';

type Props = {};

export default class ScoreBoard extends React.Component<Props> {
  render() {
    return (
      <div>
        <h1>PlusOne</h1>
        <p>Make the highest number you can!</p>
        <p>
          You can collapse connected cells that have the same value. Collapsed
          cells increase value by one.
        </p>
        <p>
          The highest value cell is white. Each time you merge white cells, the
          lowest value cells also fall off the board.
        </p>
        <p>Good luck!</p>
      </div>
    );
  }
}
