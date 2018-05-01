import React from 'react';
import Square from './components/Square';
import {
  getMax,
  refill,
  drop,
  canMove,
  collapse,
  toggleChanges
} from './service/board.js';

export default class Board extends React.Component {
  constructor(props) {
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

  handleClick(i, j) {
    this.setState(
      this.boardState(
        toggleChanges(
          this.state.squares,
          refill(drop(collapse(i, j, this.state.squares)), this.state.max)
        )
      )
    );
  }

  boardState(squares) {
    return {
      squares: squares,
      canMove: canMove(squares),
      max: getMax(squares)
    };
  }

  renderSquare(i, j) {
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
      rightBorder: borderWith(i + 1, j),
      topBorder: borderWith(i, j - 1),
      bottomBorder: borderWith(i, j + 1),
      ['color' + value]: true,
      maxNumber: this.state.max === value
    };

    return (
      <Square
        key={(j + 1) * (i + 1)}
        style={style}
        value={value}
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
        <div>{rows}</div>
        {moves}
      </div>
    );
  }
}
