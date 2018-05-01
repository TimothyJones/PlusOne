import {
  getMax,
  getMin,
  refill,
  killMinimum,
  drop,
  canMove,
  collapse,
  toggleChanges
} from './board.js';

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

describe('getMax function', () => {
  var board;
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

describe('getMin function', () => {
  var board;
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

describe('refill function', () => {
  var board;
  beforeEach(() => {
    board = createBoard();
  });

  function check(cell) {
    expect(cell.value).toBeGreaterThan(0);
    expect(cell.value).toBeLessThan(10);
    expect(cell.drop).toBeGreaterThan(0);
    expect(cell.toggle).toBe(true);
  }

  test('Fills when everything is null', () => {
    const filled = refill(
      [
        [
          { value: null, drop: 0, toggle: true },
          { value: null, drop: 0, toggle: true },
          { value: null, drop: 0, toggle: true }
        ],
        [
          { value: null, drop: 0, toggle: true },
          { value: null, drop: 0, toggle: true },
          { value: null, drop: 0, toggle: true }
        ]
      ],
      10
    );

    filled.map(arr => {
      arr.map(cell => {
        check(cell);
      });
    });
  });

  test('Fills when only something is null', () => {
    const filled = refill(
      [
        [
          { value: null, drop: 0, toggle: true },
          { value: null, drop: 0, toggle: true },
          { value: 2, drop: 0, toggle: true }
        ],
        [
          { value: 3, drop: 0, toggle: true },
          { value: 4, drop: 0, toggle: true },
          { value: 5, drop: 0, toggle: true }
        ]
      ],
      10
    );
    check(filled[0][0]);
    check(filled[0][1]);
    expect(filled[0][2]).toEqual({ value: 2, drop: 0, toggle: true });
    expect(filled[1]).toEqual([
      { value: 3, drop: 0, toggle: true },
      { value: 4, drop: 0, toggle: true },
      { value: 5, drop: 0, toggle: true }
    ]);
  });
});

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

describe('drop function ', () => {
  test('No empty cells', () => {
    const board = [
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

    const newBoard = drop(board);
    expect(newBoard).toEqual(board);
  });

  test('No drop', () => {
    const board = [
      [
        { value: null, drop: 0, toggle: true },
        { value: null, drop: 0, toggle: true },
        { value: 2, drop: 0, toggle: true }
      ],
      [
        { value: 2, drop: 0, toggle: true },
        { value: 2, drop: 0, toggle: true },
        { value: 2, drop: 0, toggle: true }
      ]
    ];

    const newBoard = drop(board);
    expect(newBoard).toEqual(board);
  });

  test('Some drop', () => {
    const board = [
      [
        { value: 2, drop: 0, toggle: true },
        { value: null, drop: 0, toggle: true },
        { value: 2, drop: 0, toggle: true }
      ],
      [
        { value: null, drop: 0, toggle: true },
        { value: 2, drop: 0, toggle: true },
        { value: null, drop: 0, toggle: true }
      ]
    ];

    const newBoard = drop(board);
    expect(newBoard).toEqual([
      [
        { value: null, drop: 0, toggle: true },
        { value: 2, drop: 1, toggle: true },
        { value: 2, drop: 0, toggle: true }
      ],
      [
        { value: null, drop: 0, toggle: true },
        { value: null, drop: 0, toggle: true },
        { value: 2, drop: 1, toggle: true }
      ]
    ]);
  });
});

describe('can move function ', () => {
  test("Can't move", () => {
    expect(
      canMove([
        [
          { value: 2, drop: 0, toggle: true },
          { value: 1, drop: 0, toggle: true },
          { value: 2, drop: 0, toggle: true }
        ],
        [
          { value: 1, drop: 0, toggle: true },
          { value: 2, drop: 0, toggle: true },
          { value: 1, drop: 0, toggle: true }
        ]
      ])
    ).toEqual(false);
  });

  test('Can move sideways', () => {
    expect(
      canMove([
        [
          { value: 3, drop: 0, toggle: true },
          { value: 3, drop: 0, toggle: true },
          { value: 2, drop: 0, toggle: true }
        ],
        [
          { value: 1, drop: 0, toggle: true },
          { value: 2, drop: 0, toggle: true },
          { value: 1, drop: 0, toggle: true }
        ]
      ])
    ).toEqual(true);
  });

  test('Can move down', () => {
    expect(
      canMove([
        [
          { value: 2, drop: 0, toggle: true },
          { value: 1, drop: 0, toggle: true },
          { value: 3, drop: 0, toggle: true }
        ],
        [
          { value: 1, drop: 0, toggle: true },
          { value: 2, drop: 0, toggle: true },
          { value: 3, drop: 0, toggle: true }
        ]
      ])
    ).toEqual(true);
  });
});

describe('collapse function', () => {
  test('Will collapse a section', () => {
    expect(
      collapse(0, 0, [
        [
          { value: 3, drop: 0, toggle: true },
          { value: 3, drop: 0, toggle: true },
          { value: 5, drop: 0, toggle: true }
        ],
        [
          { value: 3, drop: 0, toggle: true },
          { value: 2, drop: 0, toggle: true },
          { value: 3, drop: 0, toggle: true }
        ]
      ])
    ).toEqual([
      [
        { value: 4, drop: 0, toggle: true },
        { value: null, drop: 0, toggle: true },
        { value: 5, drop: 0, toggle: true }
      ],
      [
        { value: null, drop: 0, toggle: true },
        { value: 2, drop: 0, toggle: true },
        { value: 3, drop: 0, toggle: true }
      ]
    ]);
  });

  test('Will collapse a section and remove minimums', () => {
    expect(
      collapse(0, 0, [
        [
          { value: 3, drop: 0, toggle: true },
          { value: 3, drop: 0, toggle: true },
          { value: 1, drop: 0, toggle: true }
        ],
        [
          { value: 3, drop: 0, toggle: true },
          { value: 2, drop: 0, toggle: true },
          { value: 3, drop: 0, toggle: true }
        ]
      ])
    ).toEqual([
      [
        { value: 4, drop: 0, toggle: true },
        { value: null, drop: 0, toggle: true },
        { value: null, drop: 0, toggle: true }
      ],
      [
        { value: null, drop: 0, toggle: true },
        { value: 2, drop: 0, toggle: true },
        { value: 3, drop: 0, toggle: true }
      ]
    ]);
  });

  test("Won't collapse single numbers", () => {
    expect(
      collapse(0, 2, [
        [
          { value: 3, drop: 0, toggle: true },
          { value: 3, drop: 0, toggle: true },
          { value: 1, drop: 0, toggle: true }
        ],
        [
          { value: 3, drop: 0, toggle: true },
          { value: 2, drop: 0, toggle: true },
          { value: 3, drop: 0, toggle: true }
        ]
      ])
    ).toEqual([
      [
        { value: 3, drop: 0, toggle: true },
        { value: 3, drop: 0, toggle: true },
        { value: 1, drop: 0, toggle: true }
      ],
      [
        { value: 3, drop: 0, toggle: true },
        { value: 2, drop: 0, toggle: true },
        { value: 3, drop: 0, toggle: true }
      ]
    ]);
  });
});

describe('toggleChanges function', () => {
  test('Toggles drops', () => {
    expect(
      toggleChanges(
        [
          [
            { value: 3, drop: 0, toggle: true },
            { value: 3, drop: 0, toggle: true },
            { value: 1, drop: 0, toggle: true }
          ],
          [
            { value: 3, drop: 0, toggle: true },
            { value: 2, drop: 0, toggle: true },
            { value: 3, drop: 0, toggle: true }
          ]
        ],
        [
          [
            { value: 4, drop: 3, toggle: true },
            { value: 1, drop: 3, toggle: true },
            { value: 2, drop: 3, toggle: true }
          ],
          [
            { value: 4, drop: 1, toggle: true },
            { value: 2, drop: 0, toggle: true },
            { value: 3, drop: 0, toggle: true }
          ]
        ]
      )
    ).toEqual([
      [
        { value: 4, drop: 3, toggle: false },
        { value: 1, drop: 3, toggle: false },
        { value: 2, drop: 3, toggle: false }
      ],
      [
        { value: 4, drop: 1, toggle: false },
        { value: 2, drop: 0, toggle: true },
        { value: 3, drop: 0, toggle: true }
      ]
    ]);
  });
  test('Toggles single changes', () => {
    expect(
      toggleChanges(
        [
          [
            { value: 3, drop: 0, toggle: true },
            { value: 3, drop: 0, toggle: true },
            { value: 1, drop: 0, toggle: true }
          ],
          [
            { value: 3, drop: 0, toggle: true },
            { value: 2, drop: 0, toggle: true },
            { value: 3, drop: 0, toggle: true }
          ]
        ],
        [
          [
            { value: 4, drop: 3, toggle: true },
            { value: 1, drop: 3, toggle: true },
            { value: 2, drop: 3, toggle: true }
          ],
          [
            { value: 4, drop: 0, toggle: true },
            { value: 2, drop: 0, toggle: true },
            { value: 3, drop: 0, toggle: true }
          ]
        ]
      )
    ).toEqual([
      [
        { value: 4, drop: 3, toggle: false },
        { value: 1, drop: 3, toggle: false },
        { value: 2, drop: 3, toggle: false }
      ],
      [
        { value: 4, drop: 0, toggle: false },
        { value: 2, drop: 0, toggle: true },
        { value: 3, drop: 0, toggle: true }
      ]
    ]);
  });
});
