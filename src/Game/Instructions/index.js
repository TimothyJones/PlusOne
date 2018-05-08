// @flow

import React from 'react';

type Props = {};

export default class ScoreBoard extends React.Component<Props> {
  render() {
    return (
      <div>
        <h1>PlusOne</h1>
        <p>Your score is the highest number on the board.</p>
        <p>
          You can merge cells that share the same number as long as they're
          touching. Merged cells increase their number by one.
        </p>
        <p>
          The highest numbered cell is white. Each time you merge white cells,
          the lowest numbered cells also fall off the board.
        </p>
        <p>Good luck!</p>
      </div>
    );
  }
}
