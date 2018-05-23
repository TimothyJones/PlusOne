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
    const scoresClasses = process.env.FEATURE.ScoreServer
      ? ['scores', 'withScoreServer']
      : 'scores';

    const score = this.props.canMove ? (
      <p className={classnames(scoresClasses)}>
        Current score: {this.scoreFor(this.props.currentScore)}
      </p>
    ) : (
      <p className={classnames(scoresClasses, 'warning')}>
        No more moves! Score: {this.scoreFor(this.props.currentScore)}
      </p>
    );

    const reachedBy = process.env.FEATURE.ScoreServer ? (
      this.props.currentScoreReachedBy ? (
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
      )
    ) : (
      '' // Scoreboard server feature disabled
    );

    return (
      <div className="scoreboard">
        {score}
        {reachedBy}
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
