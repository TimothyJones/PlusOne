// @flow

import React from 'react';
import classnames from 'classnames';

import './scoreboard.css';

type Props = {
  highScore: number,
  currentScore: number,
  currentScoreReachedBy: ?number,
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
        Current score: {this.scoreFor(this.props.currentScore)}
      </p>
    ) : (
      <p className="scores warning">
        No more moves! Score: {this.scoreFor(this.props.currentScore)}
      </p>
    );

    const reachedBy = this.props.currentScoreReachedBy ? (
      <p className="reachedBy">
        {this.props.currentScoreReachedBy > 1
          ? `reached by ${this.props.currentScoreReachedBy} users`
          : 'reached only by you!'}
      </p>
    ) : (
      <p className="reachedBy">
        {this.props.currentScore === 6
          ? 'reached by everyone'
          : '...connecting'}
      </p>
    );

    return (
      <div className="scoreboard">
        {score}
        {reachedBy}
        <p />
        <p className="text scores">
          Your high score: {this.scoreFor(this.props.highScore)}
        </p>
        <p className="scores">
          <button onClick={() => this.props.onReset()}>reset</button>
        </p>
      </div>
    );
  }
}
