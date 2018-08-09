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
  dropBoard,
  canMove,
  collapse,
  toggleChanges
} from './service/board';
import api from './service/api';
import config from '../../config';
import type { BoardState } from './service/board';
import type { ScoreBoardFromServer } from './service/api';

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
  currentScoreReachedBy: ?number,
  globalHighScore: ?number
};

export default class Board extends React.Component<Props, State> {
  static determineHighScore(max: number): number {
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

  constructor(props: Props) {
    super(props);

    this.state = this.boardState(this.newSquares());
  }

  static getUserId(): string {
    const storedUserId: ?string = store.get('user');
    if (storedUserId === undefined || storedUserId === null) {
      store.set('user', uuidv4());
    }
    return store.get('user');
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
    this.setState(oldState =>
      this.boardState(toggleChanges(oldState.squares, this.newSquares()))
    );
  }

  handleClick(i: number, j: number) {
    const collapsedBoard = collapse(i, j, this.state.squares);
    const newMax = getMax(collapsedBoard);
    const forbiddenSquares = [];

    if (newMax > this.state.max) {
      forbiddenSquares.push(getMin(this.state.squares));
    }

    this.setState(oldState =>
      this.boardState(
        toggleChanges(
          oldState.squares,
          refill(dropBoard(collapsedBoard), oldState.max, forbiddenSquares)
        )
      )
    );
  }

  boardState(squares: BoardState) {
    const max = getMax(squares);
    const highScore = Board.determineHighScore(max);
    const ableToMove = canMove(squares);
    const scoreServer = api(config.providerUrl, Board.getUserId());

    if ((this.state && max !== this.state.max) || !this.state) {
      scoreServer.reachedScore(max).then((resp: ?ScoreBoardFromServer) => {
        this.setState(state => ({
          ...state,
          currentScoreReachedBy: resp ? resp.reachedBy : undefined,
          globalHighScore: resp ? resp.globalHighScore : undefined
        }));
      });
    }
    if (
      this.state &&
      config.features.ScoreServer &&
      this.state.canMove &&
      !ableToMove
    ) {
      scoreServer.reachedScore(max);
    }

    return {
      squares,
      max,
      highScore,
      canMove: ableToMove,
      currentScoreReachedBy: this.state
        ? this.state.currentScoreReachedBy
        : undefined,
      globalHighScore: this.state ? this.state.globalHighScore : undefined
    };
  }

  borderWith(i, j, value) {
    const { x, y } = this.props;
    if (i < 0 || i >= x) return true;
    if (j < 0 || j >= y) return true;
    if (this.state.squares[i][j].value !== value) return true;
    return false;
  }

  renderSquare(i: number, j: number) {
    const { squares } = this.state;
    const { value, drop, toggle, merged } = squares[i][j];

    const style = {
      leftBorder: this.borderWith(i - 1, j, value),
      noLeftBorder: !this.borderWith(i - 1, j, value),
      rightBorder: this.borderWith(i + 1, j, value),
      noRightBorder: !this.borderWith(i + 1, j, value),
      topBorder: this.borderWith(i, j - 1, value),
      noTopBorder: !this.borderWith(i, j - 1, value),
      bottomBorder: this.borderWith(i, j + 1, value),
      merged,
      [`color${value === null ? '' : value}`]: true,
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
    const rows = [];
    for (let j = 0; j < this.props.y; j += 1) {
      const row = [];
      for (let i = 0; i < this.props.x; i += 1) {
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
          globalHighScore={this.state.globalHighScore}
          highScore={this.state.highScore}
          canMove={this.state.canMove}
          onReset={() => this.reset()}
        />
      </div>
    );
  }
}
