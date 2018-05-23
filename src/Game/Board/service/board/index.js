// @flow

import { killMinimum } from './board-private.js';
import config from '../../../../config.js';

type SquareState = {
  value: number | null,
  drop: number,
  toggle: boolean,
  merged: boolean
};

export type BoardState = Array<Array<SquareState>>;

export function getMax(squares: BoardState): number {
  return squares.reduce(function(m, arr) {
    const rowMax = arr.reduce(function(a, b) {
      if (b.value === null) {
        return a;
      } else {
        return Math.max(a, b.value);
      }
    }, 0);
    return Math.max(m, rowMax);
  }, 0);
}

export function refill(
  board: BoardState,
  max: number,
  forbidden: Array<number> = []
): BoardState {
  const squares: BoardState = JSON.parse(JSON.stringify(board));

  const min = Math.min(
    Math.max(max - config.generator.usualRange, 1),
    getMin(squares)
  );

  const possibleNumbers = [];

  for (var i = min; i < max; i++) {
    if (!forbidden.includes(i)) {
      possibleNumbers.push(i);
    }
  }

  // Ensure that we can generate at least something
  if (possibleNumbers.length === 0) possibleNumbers.push(1);

  return squares.map((arr, j) =>
    arr.map(sq => {
      if (sq.value === null) {
        return {
          value:
            possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)],
          drop: 5,
          toggle: sq.toggle,
          merged: false
        };
      } else return sq;
    })
  );
}

export function drop(board: BoardState): BoardState {
  const squares: BoardState = JSON.parse(JSON.stringify(board));
  for (var j = squares[0].length - 1; j >= 0; j--) {
    for (var i = 0; i < squares.length; i++) {
      if (squares[i][j].value == null) {
        var next = j;
        while (next >= 0 && squares[i][next].value == null) next--;
        if (next >= 0) {
          squares[i][j] = {
            value: squares[i][next].value,
            drop: j - next,
            toggle: squares[i][j].toggle,
            merged: squares[i][next].merged
          };
          squares[i][next].merged = false;
          squares[i][next].value = null;
        }
      } else {
        squares[i][j].drop = 0;
      }
    }
  }
  return squares;
}

export function canMove(squares: BoardState): boolean {
  const x = squares.length;
  const y = squares[0].length;
  function possibleMoveWith(i, j, value) {
    if (i < 0 || i >= x) return false;
    if (j < 0 || j >= y) return false;
    if (squares[i][j].value === value) return true;
    return false;
  }

  for (var j = 0; j < y; j++) {
    for (var i = 0; i < x; i++) {
      const { value } = squares[i][j];
      if (
        possibleMoveWith(i - 1, j, value) ||
        possibleMoveWith(i + 1, j, value) ||
        possibleMoveWith(i, j - 1, value) ||
        possibleMoveWith(i, j + 1, value)
      )
        return true;
    }
  }
  return false;
}

export function toggleChanges(
  oldBoardState: BoardState,
  newBoardState: BoardState
): BoardState {
  const squares: BoardState = JSON.parse(JSON.stringify(newBoardState));
  const x = squares.length;
  const y = squares[0].length;

  for (var i = 0; i < x; i++) {
    for (var j = 0; j < y; j++) {
      if (
        oldBoardState[i][j].value !== newBoardState[i][j].value ||
        newBoardState[i][j].drop > 0
      ) {
        squares[i][j].toggle = !oldBoardState[i][j].toggle;
      }
    }
  }

  return squares;
}

export function stripMerge(board: BoardState) {
  const squares: BoardState = JSON.parse(JSON.stringify(board));
  const x = squares.length;
  const y = squares[0].length;
  for (var i = 0; i < x; i++) {
    for (var j = 0; j < y; j++) {
      squares[i][j].merged = false;
    }
  }
  return squares;
}

export function collapse(i: number, j: number, board: BoardState): BoardState {
  const squares: BoardState = stripMerge(JSON.parse(JSON.stringify(board)));

  const x = squares.length;
  const y = squares[0].length;

  const value = squares[i][j].value;
  const max = getMax(squares);

  function update(i, j) {
    if (i < 0 || i >= x) return 0;
    if (j < 0 || j >= y) return 0;
    if (squares[i][j].value !== value) return 0;
    else {
      squares[i][j].value = null;
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
    squares[i][j].value = value + 1;
    squares[i][j].merged = true;
    if (squares[i][j].value > max) {
      return killMinimum(squares);
    }
  } else {
    // Still have to do this, because update replaces it with null
    squares[i][j].value = value;
  }
  return squares;
}

export function getMin(squares: BoardState): number {
  return squares.reduce(function(m, arr) {
    const rowMax = arr.reduce(function(a, b) {
      if (b.value === null) {
        return a;
      } else {
        return Math.min(a, b.value);
      }
    }, Number.MAX_SAFE_INTEGER);
    return Math.min(m, rowMax);
  }, Number.MAX_SAFE_INTEGER);
}
