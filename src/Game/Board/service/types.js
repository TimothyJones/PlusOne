// @flow

type SquareState = {
  value: number | null,
  drop: number,
  toggle: boolean
};

export type BoardState = Array<Array<SquareState>>;
