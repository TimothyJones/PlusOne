// @flow

import React from 'react';
import classnames from 'classnames';

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

  boardState(squares: BoardState) {
    const max = getMax(squares);
    return {
      squares: squares,
      canMove: canMove(squares),
      max: max,
      highScore:
        this.state !== undefined ? Math.max(this.state.highScore, max) : max
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

    const moves = this.state.canMove ? (
      <div />
    ) : (
      <div>
        <p class="warning"> There are no move moves!</p>
        <p class={'color' + this.state.max}>
          Your score is <span>{this.state.max}</span>
        </p>
      </div>
    );

    return (
      <div>
        {' '}
        <div class="scoreboard">
          <p class="text scores">
            High Score:{' '}
            <span
              className={classnames('score', 'color' + this.state.highScore)}
            >
              {this.state.highScore}
            </span>
          </p>
          <p class="text scores">
            Current Score:{' '}
            <span className={classnames('score', 'color' + this.state.max)}>
              {this.state.max}
            </span>
          </p>
        </div>
        <div>{rows}</div>
        {moves}
      </div>
    );
  }
}
