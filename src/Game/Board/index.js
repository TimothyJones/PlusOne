// @flow

import React from 'react';
import store from 'store';
import uuidv4 from 'uuid/v4';

import './board.css';

import Square from './components/Square';
import ScoreBoard from './components/ScoreBoard';
import {
  getMax,
  getMin,
  refill,
  drop,
  canMove,
  collapse,
  toggleChanges
} from './service/board';
import api from './service/api';
import config from '../../config.js';
import type { BoardState } from './service/board';

type Props = {
  x: number,
  y: number,
  maxInitial: number
};

type State = {
  max: number,
  highScore: number,
  canMove: boolean,
  squares: BoardState,
  currentScoreReachedBy: ?number
};

export default class Board extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = this.boardState(this.newSquares());
  }

  newSquares(): BoardState {
    const squares = Array.from(Array(this.props.x), () =>
      new Array(this.props.y).fill(null).map(() => ({
        value: config.features.StartWithOnesOnly
          ? 1
          : Math.round(Math.random() * (this.props.maxInitial - 2)) + 1,
        drop: this.props.y,
        toggle: false,
        merged: false
      }))
    );

    squares[Math.floor(Math.random() * this.props.x)][
      Math.floor(Math.random() * this.props.y)
    ].value = this.props.maxInitial;

    return squares;
  }

  reset() {
    this.setState(
      this.boardState(toggleChanges(this.state.squares, this.newSquares()))
    );
  }

  handleClick(i: number, j: number) {
    const collapsedBoard = collapse(i, j, this.state.squares);
    const newMax = getMax(collapsedBoard);
    const forbiddenSquares = [];

    if (newMax > this.state.max) {
      forbiddenSquares.push(getMin(this.state.squares));
    }

    this.setState(
      this.boardState(
        toggleChanges(
          this.state.squares,
          refill(drop(collapsedBoard), this.state.max, forbiddenSquares)
        )
      )
    );
  }

  getUserId(): string {
    const storedUserId: ?string = store.get('user');
    if (storedUserId === undefined || storedUserId === null) {
      store.set('user', uuidv4());
    }
    return store.get('user');
  }

  determineHighScore(max: number): number {
    const storedHighScore: ?number = store.get('highScore');
    if (
      storedHighScore === undefined ||
      storedHighScore === null ||
      max > storedHighScore
    ) {
      store.set('highScore', max);
    }
    return store.get('highScore');
  }

  boardState(squares: BoardState) {
    const max = getMax(squares);
    const highScore = this.determineHighScore(max);
    const ableToMove = canMove(squares);
    const scoreServer = api(config.providerUrl, this.getUserId());

    if (this.state && max !== this.state.max) {
      scoreServer.finalScore(max).then((x: ?number) => {
        if (x !== undefined) {
          this.setState((state, props) => ({
            ...state,
            currentScoreReachedBy: x
          }));
        }
      });
    }
    if (
      this.state &&
      config.features.ScoreServer &&
      this.state.canMove &&
      !ableToMove
    ) {
      scoreServer.finalScore(max);
    }

    return {
      squares,
      max,
      highScore,
      canMove: ableToMove,
      currentScoreReachedBy: this.state
        ? this.state.currentScoreReachedBy
        : undefined
    };
  }

  renderSquare(i: number, j: number) {
    const x = this.props.x;
    const y = this.props.y;
    const squares = this.state.squares;

    const { value, drop, toggle, merged } = squares[i][j];

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
      noRightBorder: !borderWith(i + 1, j),
      topBorder: borderWith(i, j - 1),
      noTopBorder: !borderWith(i, j - 1),
      bottomBorder: borderWith(i, j + 1),
      merged: merged,
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

    return (
      <div>
        {' '}
        <div className="game-board">{rows}</div>
        <ScoreBoard
          currentScore={this.state.max}
          currentScoreReachedBy={this.state.currentScoreReachedBy}
          highScore={this.state.highScore}
          canMove={this.state.canMove}
          onReset={() => this.reset()}
        />
      </div>
    );
  }
}
