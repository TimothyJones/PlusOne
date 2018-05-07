// @flow

import React from 'react';
import classnames from 'classnames';
import store from 'store';

import Square from './components/Square';
import {
  getMax,
  refill,
  drop,
  canMove,
  collapse,
  toggleChanges
} from './service/board.js';
import type { BoardState } from './service/types.js';

type Props = {
  x: number,
  y: number
};

type State = {
  max: number,
  highScore: number,
  canMove: boolean,
  squares: BoardState
};

export default class Board extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const maxInitial = 6;

    const squares = Array.from(Array(props.x), () =>
      new Array(props.y).fill(null).map(() => ({
        value: Math.round(Math.random() * (maxInitial - 2)) + 1,
        drop: 5,
        toggle: false
      }))
    );

    squares[Math.floor(Math.random() * props.x)][
      Math.floor(Math.random() * props.y)
    ].value = maxInitial;

    this.state = this.boardState(squares);
  }

  handleClick(i: number, j: number) {
    this.setState(
      this.boardState(
        toggleChanges(
          this.state.squares,
          refill(drop(collapse(i, j, this.state.squares)), this.state.max)
        )
      )
    );
  }

  determineHighScore(max) {
    const storedHighScore = store.get('highScore');
    if (storedHighScore === undefined || max > storedHighScore) {
      store.set('highScore', max);
    }
    return store.get('highScore');
  }

  boardState(squares: BoardState) {
    const max = getMax(squares);
    const highScore = this.determineHighScore(max);

    return {
      squares: squares,
      canMove: canMove(squares),
      max: max,
      highScore: highScore
    };
  }

  renderSquare(i: number, j: number) {
    const x = this.props.x;
    const y = this.props.y;
    const squares = this.state.squares;

    const { value, drop, toggle } = squares[i][j];

    function borderWith(i, j) {
      if (i < 0 || i >= x) return true;
      if (j < 0 || j >= y) return true;
      if (squares[i][j].value !== value) return true;
      return false;
    }

    const style = {
      leftBorder: borderWith(i - 1, j),
      noLeftBorder: !borderWith(i - 1, j),
      rightBorder: borderWith(i + 1, j),
      topBorder: borderWith(i, j - 1),
      noTopBorder: !borderWith(i, j - 1),
      bottomBorder: borderWith(i, j + 1),
      ['color' + (value === null ? '' : value)]: true,
      maxNumber: this.state.max === value
    };

    return (
      <Square
        key={(j + 1) * (i + 1)}
        style={style}
        value={value === null ? 'X' : value}
        drop={drop}
        toggle={toggle}
        onClick={() => this.handleClick(i, j)}
      />
    );
  }

  render() {
    var rows = [];
    for (var j = 0; j < this.props.y; j++) {
      var row = [];
      for (var i = 0; i < this.props.x; i++) {
        row.push(this.renderSquare(i, j));
      }
      rows.push(
        <div className="board-row" key={j}>
          {row}
        </div>
      );
    }

    const scoreFor = score => (
      <span className={classnames('score', 'color' + score)}>{score}</span>
    );

    const score = this.state.canMove ? (
      <p className="text scores">Current Score: {scoreFor(this.state.max)}</p>
    ) : (
      <p className="text scores warning">
        No more moves! Score: {scoreFor(this.state.max)}
      </p>
    );

    return (
      <div>
        {' '}
        <div className="game-board">{rows}</div>
        <div className="scoreboard">
          {score}
          <p className="text scores">
            High Score: {scoreFor(this.state.highScore)}
          </p>
        </div>
      </div>
    );
  }
}
