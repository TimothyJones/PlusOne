// @flow
import { getMin } from '.';
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
