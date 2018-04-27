import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import classnames from 'classnames';
import registerServiceWorker from './registerServiceWorker';

class Square extends React.Component {
  render() {
    return (
      <button
        className={classnames('square', this.props.style)}
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    const squares = Array.from(Array(props.x), () =>
      new Array(props.y).fill(null).map(() => Math.round(Math.random() * 4) + 1)
    );

    this.state = {
      squares: squares
    };
  }

  refill(squares) {
    const max = squares.reduce(function(m, arr) {
      const rowMax = arr.reduce(function(a, b) {
        return Math.max(a, b);
      }, 0);
      return Math.max(m, rowMax);
    }, 0);

    return squares.map(arr =>
      arr.map(val => {
        if (val === null) {
          return Math.round(Math.random() * (max - 2)) + 1;
        } else return val;
      })
    );
  }

  drop(squares) {
    for (var j = this.props.y - 1; j >= 0; j--) {
      for (var i = 0; i < this.props.x; i++) {
        if (squares[i][j] == null) {
          var next = j;
          while (next >= 0 && squares[i][next] == null) next--;
          if (next >= 0) {
            squares[i][j] = squares[i][next];
            squares[i][next] = null;
          }
        }
      }
    }
    return squares;
  }

  collapse(i, j, squares) {
    const x = this.props.x;
    const y = this.props.y;

    const value = squares[i][j];

    function update(i, j) {
      if (i < 0 || i >= x) return 0;
      if (j < 0 || j >= y) return 0;
      if (squares[i][j] !== value) return 0;
      else {
        squares[i][j] = null;
        return (
          1 +
          update(i + 1, j) +
          update(i - 1, j) +
          update(i, j + 1) +
          update(i, j - 1)
        );
      }
    }
    if (update(i, j) > 1) {
      squares[i][j] = value + 1;
    } else {
      // Still have to do this, because update replaces it with null
      squares[i][j] = value;
    }
    return this.refill(this.drop(squares));
  }

  handleClick(i, j) {
    const squares = this.state.squares.map(function(arr) {
      return arr.slice();
    });
    this.setState({ squares: this.collapse(i, j, squares) });
  }

  renderSquare(i, j) {
    const x = this.props.x;
    const y = this.props.y;

    const squares = this.state.squares;

    const value = squares[i][j];

    function borderWith(i, j) {
      if (i < 0 || i >= x) return true;
      if (j < 0 || j >= y) return true;
      if (squares[i][j] !== value) return true;
      return false;
    }

    const style = {
      leftBorder: borderWith(i - 1, j),
      rightBorder: borderWith(i + 1, j),
      topBorder: borderWith(i, j - 1),
      bottomBorder: borderWith(i, j + 1),
      ['color' + value]: true
    };

    return (
      <Square
        key={j}
        style={style}
        value={value}
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
        <div className="board-row" key={i}>
          {row}
        </div>
      );
    }

    return <div>{rows}</div>;
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board x={5} y={5} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById('root'));
registerServiceWorker();

// ========================================
