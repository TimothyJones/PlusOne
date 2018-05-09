// @flow
import type { BoardState } from './index.js';

export function killMinimum(squares: BoardState): BoardState {
  squares = JSON.parse(JSON.stringify(squares));

  const min = getMin(squares);

  return squares.map((arr, j) =>
    arr.map(sq => {
      if (sq.value === min) {
        return {
          value: null,
          drop: sq.drop,
          toggle: sq.toggle,
          merged: false
        };
      } else return sq;
    })
  );
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
