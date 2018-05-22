import { killMinimum } from './board-private.js';

function createBoard() {
  return [
    [
      { value: 1, drop: 0, toggle: true },
      { value: 2, drop: 0, toggle: true },
      { value: 3, drop: 0, toggle: true }
    ],
    [
      { value: 4, drop: 0, toggle: true },
      { value: 5, drop: 0, toggle: true },
      { value: 6, drop: 0, toggle: true }
    ]
  ];
}

describe('killMinimum function ', () => {
  var board;
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
    newBoard.map(arr => {
      arr.map(cell => {
        expect(cell.value).toBeNull();
      });
    });
    expect(newBoard.length).toEqual(2);
    expect(newBoard[0].length).toEqual(3);
  });
});
