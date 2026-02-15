import { dropBoard } from '.';

describe('drop function ', () => {
  test('No empty cells', () => {
    const board = [
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

    const newBoard = dropBoard(board);
    expect(newBoard).toEqual(board);
  });

  test('No drop', () => {
    const board = [
      [
        { value: null, drop: 0, toggle: true, merged: false },
        { value: null, drop: 0, toggle: true, merged: false },
        { value: 2, drop: 0, toggle: true, merged: false }
      ],
      [
        { value: 2, drop: 0, toggle: true, merged: false },
        { value: 2, drop: 0, toggle: true, merged: false },
        { value: 2, drop: 0, toggle: true, merged: false }
      ]
    ];

    const newBoard = dropBoard(board);
    expect(newBoard).toEqual(board);
  });

  test('Some drop', () => {
    const board = [
      [
        { value: 2, drop: 0, toggle: true, merged: true },
        { value: null, drop: 0, toggle: true, merged: false },
        { value: 2, drop: 0, toggle: true, merged: false }
      ],
      [
        { value: null, drop: 0, toggle: true, merged: false },
        { value: 2, drop: 0, toggle: true, merged: false },
        { value: null, drop: 0, toggle: true, merged: false }
      ]
    ];

    const newBoard = dropBoard(board);
    expect(newBoard).toEqual([
      [
        { value: null, drop: 0, toggle: true, merged: false },
        { value: 2, drop: 1, toggle: true, merged: true },
        { value: 2, drop: 0, toggle: true, merged: false }
      ],
      [
        { value: null, drop: 0, toggle: true, merged: false },
        { value: null, drop: 0, toggle: true, merged: false },
        { value: 2, drop: 1, toggle: true, merged: false }
      ]
    ]);
  });
});
