// @flow

import React from 'react';
import classnames from 'classnames';

import './scoreboard.css';

type Props = {
  highScore: number,
  currentScore: number,
  canMove: boolean,
  onReset: () => void
};

export default class ScoreBoard extends React.Component<Props> {
  scoreFor(score: number) {
    return (
      <span className={classnames('score', 'color' + score)}>{score}</span>
    );
  }

  render() {
    const score = this.props.canMove ? (
      <p className="scores">
        Current Score: {this.scoreFor(this.props.currentScore)}
      </p>
    ) : (
      <p className="scores warning">
        No more moves! Score: {this.scoreFor(this.props.currentScore)}
      </p>
    );

    return (
      <div className="scoreboard">
        {score}
        <p className="text scores">
          High Score: {this.scoreFor(this.props.highScore)}
        </p>
        <p className="scores">
          <button onClick={() => this.props.onReset()}>reset</button>
        </p>
      </div>
    );
  }
}
