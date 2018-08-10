// @flow

import React from 'react';
import classnames from 'classnames';

import config from '../../../../config';
import './scoreboard.css';

type Props = {
  highScore: number,
  currentScore: number,
  currentScoreReachedBy: ?number,
  globalHighScore: ?number,
  canMove: boolean,
  onReset: () => void
};

export default class ScoreBoard extends React.Component<Props> {
  static scoreFor(score: number) {
    return (
      <span className={classnames('score', `color${score}`)}>{score}</span>
    );
  }

  reachedBy() {
    if (config.features.ScoreServer) {
      if (this.props.currentScoreReachedBy && this.props.currentScore !== 6) {
        return (
          <p className="reachedBy">
            {this.props.currentScoreReachedBy > 1
              ? `reached ${this.props.currentScoreReachedBy} times`
              : 'reached only by you!'}
          </p>
        );
      }
      return (
        <p className="reachedBy">
          {this.props.currentScore === 6
            ? 'reached by everyone'
            : '...connecting'}
        </p>
      );
    }
    return '';
  }

  render() {
    const scoresClasses = config.features.ScoreServer
      ? ['scores', 'withScoreServer']
      : 'scores';

    const score = this.props.canMove ? (
      <p className={classnames(scoresClasses)}>
        Current score: {ScoreBoard.scoreFor(this.props.currentScore)}
      </p>
    ) : (
      <p className={classnames(scoresClasses, 'warning')}>
        No more moves! Score: {ScoreBoard.scoreFor(this.props.currentScore)}
      </p>
    );

    const reachedBy = this.reachedBy();

    const globalHighScore =
      config.features.ScoreServer && this.props.globalHighScore ? (
        <p className="text scores">
          Global high score: {ScoreBoard.scoreFor(this.props.globalHighScore)}
        </p>
      ) : (
        ''
      );

    return (
      <div className="scoreboard">
        {score}
        {reachedBy}
        <p className="text scores">
          Your high score: {ScoreBoard.scoreFor(this.props.highScore)}
        </p>
        {globalHighScore}
        <p className="scores">
          <button onClick={() => this.props.onReset()} type="button">
            reset
          </button>
        </p>
      </div>
    );
  }
}
