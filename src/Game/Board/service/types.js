// @flow

type SquareState = {
  value: number | null,
  drop: number,
  toggle: boolean,
  merged: boolean
};

export type BoardState = Array<Array<SquareState>>;
