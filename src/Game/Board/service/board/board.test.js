import { stripMerge, getMax, getMin, canMove, killMinimum } from './index';

function createBoard() {
  return [
    [
      { value: 1, drop: 0, toggle: true, merged: false },
      { value: 2, drop: 0, toggle: true, merged: false },
      { value: 3, drop: 0, toggle: true, merged: false }
    ],
    [
      { value: 4, drop: 0, toggle: true, merged: false },
      { value: 5, drop: 0, toggle: true, merged: false },
      { value: 6, drop: 0, toggle: true, merged: false }
    ]
  ];
}

describe('killMinimum function ', () => {
  let board;
  beforeEach(() => {
    board = createBoard();
  });
  test('Minimum value in first place', () => {
    const newBoard = killMinimum(board);
    expect(newBoard[0][0].value).toBeNull();
    expect(newBoard[0][1].value).toEqual(2);
  });

  test('Minimum value in last place', () => {
    board[1][2].value = 1;
    const newBoard = killMinimum(board);
    expect(newBoard[1][2].value).toBeNull();
    expect(newBoard[0][1].value).toEqual(2);
  });
  test('Minimum value in first place', () => {
    board[1][2].value = 1;
    const newBoard = killMinimum(board);
    expect(newBoard[1][2].value).toBeNull();
    expect(newBoard[0][1].value).toEqual(2);
  });
  test('All minimums', () => {
    const newBoard = killMinimum([
      [
        { value: 2, drop: 0, toggle: true },
        { value: 2, drop: 0, toggle: true },
        { value: 2, drop: 0, toggle: true }
      ],
      [
        { value: 2, drop: 0, toggle: true },
        { value: 2, drop: 0, toggle: true },
        { value: 2, drop: 0, toggle: true }
      ]
    ]);
    newBoard.forEach(arr => {
      arr.forEach(cell => {
        expect(cell.value).toBeNull();
      });
    });
    expect(newBoard.length).toEqual(2);
    expect(newBoard[0].length).toEqual(3);
  });
});

describe('stripMerge function', () => {
  expect(
    stripMerge([
      [
        { value: 1, drop: 0, toggle: true, merged: true },
        { value: 2, drop: 0, toggle: false, merged: true },
        { value: 3, drop: 4, toggle: true, merged: true }
      ],
      [
        { value: 4, drop: 0, toggle: false, merged: true },
        { value: 5, drop: 2, toggle: true, merged: true },
        { value: 6, drop: 0, toggle: true, merged: true }
      ]
    ])
  ).toEqual([
    [
      { value: 1, drop: 0, toggle: true, merged: false },
      { value: 2, drop: 0, toggle: false, merged: false },
      { value: 3, drop: 4, toggle: true, merged: false }
    ],
    [
      { value: 4, drop: 0, toggle: false, merged: false },
      { value: 5, drop: 2, toggle: true, merged: false },
      { value: 6, drop: 0, toggle: true, merged: false }
    ]
  ]);
});

describe('getMax function', () => {
  let board;
  beforeEach(() => {
    board = createBoard();
  });

  test('Maximum value on board', () => {
    expect(getMax(board)).toEqual(6);
  });

  test('Maximum value in last place', () => {
    board[1][2].value = 10;
    expect(getMax(board)).toEqual(10);
  });
  test('Maximum value in first place', () => {
    board[0][0].value = 10;
    expect(getMax(board)).toEqual(10);
  });
  test('Maximum value in middle', () => {
    board[1][1].value = 10;
    expect(getMax(board)).toEqual(10);
  });
});

describe('can move function ', () => {
  test("Can't move", () => {
    expect(
      canMove([
        [
          { value: 2, drop: 0, toggle: true, merged: false },
          { value: 1, drop: 0, toggle: true, merged: false },
          { value: 2, drop: 0, toggle: true, merged: false }
        ],
        [
          { value: 1, drop: 0, toggle: true, merged: false },
          { value: 2, drop: 0, toggle: true, merged: false },
          { value: 1, drop: 0, toggle: true, merged: false }
        ]
      ])
    ).toEqual(false);
  });

  test('Can move sideways', () => {
    expect(
      canMove([
        [
          { value: 3, drop: 0, toggle: true, merged: false },
          { value: 3, drop: 0, toggle: true, merged: false },
          { value: 2, drop: 0, toggle: true, merged: false }
        ],
        [
          { value: 1, drop: 0, toggle: true, merged: false },
          { value: 2, drop: 0, toggle: true, merged: false },
          { value: 1, drop: 0, toggle: true, merged: false }
        ]
      ])
    ).toEqual(true);
  });

  test('Can move down', () => {
    expect(
      canMove([
        [
          { value: 2, drop: 0, toggle: true, merged: false },
          { value: 1, drop: 0, toggle: true, merged: false },
          { value: 3, drop: 0, toggle: true, merged: false }
        ],
        [
          { value: 1, drop: 0, toggle: true, merged: false },
          { value: 2, drop: 0, toggle: true, merged: false },
          { value: 3, drop: 0, toggle: true, merged: false }
        ]
      ])
    ).toEqual(true);
  });
});

describe('getMin function', () => {
  let board;
  beforeEach(() => {
    board = createBoard();
  });
  test('Minimum value on board', () => {
    expect(getMin(board)).toEqual(1);
  });

  test('Minimum value in last place', () => {
    board[1][2].value = 0;
    expect(getMin(board)).toEqual(0);
  });
  test('Minimum value in first place', () => {
    board[0][0].value = 0;
    expect(getMin(board)).toEqual(0);
  });
  test('Minimum value in middle', () => {
    board[1][1].value = 0;
    expect(getMin(board)).toEqual(0);
  });
});
