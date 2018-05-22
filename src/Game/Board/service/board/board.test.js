import {
  stripMerge,
  getMax,
  getMin,
  refill,
  drop,
  canMove,
  collapse,
  toggleChanges
} from './index.js';

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
          { value: null, drop: 0, toggle: true, merged: false },
          { value: null, drop: 0, toggle: true, merged: false },
          { value: null, drop: 0, toggle: true, merged: false }
        ],
        [
          { value: null, drop: 0, toggle: true, merged: false },
          { value: null, drop: 0, toggle: true, merged: false },
          { value: null, drop: 0, toggle: true, merged: false }
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

  test("Fills when everything is null, and doesn't include forbidden numbers", () => {
    const filled = refill(
      [
        [
          { value: null, drop: 0, toggle: true, merged: false },
          { value: null, drop: 0, toggle: true, merged: false },
          { value: null, drop: 0, toggle: true, merged: false }
        ],
        [
          { value: null, drop: 0, toggle: true, merged: false },
          { value: null, drop: 0, toggle: true, merged: false },
          { value: null, drop: 0, toggle: true, merged: false }
        ]
      ],
      10,
      [1, 2, 3, 4, 5, 6, 7, 8]
    );

    filled.map(arr => {
      arr.map(cell => {
        check(cell);
        expect(cell.value).toBe(9);
      });
    });
  });

  test('Fills when everything is null, even if there are no allowed numbers', () => {
    const filled = refill(
      [
        [
          { value: null, drop: 0, toggle: true, merged: false },
          { value: null, drop: 0, toggle: true, merged: false },
          { value: null, drop: 0, toggle: true, merged: false }
        ],
        [
          { value: null, drop: 0, toggle: true, merged: false },
          { value: null, drop: 0, toggle: true, merged: false },
          { value: null, drop: 0, toggle: true, merged: false }
        ]
      ],
      10,
      [1, 2, 3, 4, 5, 6, 7, 8, 9]
    );

    filled.map(arr => {
      arr.map(cell => {
        check(cell);
        expect(cell.value).toBe(1);
      });
    });
  });

  test('Fills when only something is null', () => {
    const filled = refill(
      [
        [
          { value: null, drop: 0, toggle: true, merged: false },
          { value: null, drop: 0, toggle: true, merged: false },
          { value: 2, drop: 0, toggle: true, merged: false }
        ],
        [
          { value: 3, drop: 0, toggle: true, merged: false },
          { value: 4, drop: 0, toggle: true, merged: false },
          { value: 5, drop: 0, toggle: true, merged: false }
        ]
      ],
      10
    );
    check(filled[0][0]);
    check(filled[0][1]);
    expect(filled[0][2]).toEqual({
      value: 2,
      drop: 0,
      toggle: true,
      merged: false
    });
    expect(filled[1]).toEqual([
      { value: 3, drop: 0, toggle: true, merged: false },
      { value: 4, drop: 0, toggle: true, merged: false },
      { value: 5, drop: 0, toggle: true, merged: false }
    ]);
  });
});

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

    const newBoard = drop(board);
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

    const newBoard = drop(board);
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

    const newBoard = drop(board);
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

describe('collapse function', () => {
  test('Will collapse a section', () => {
    expect(
      collapse(0, 0, [
        [
          { value: 3, drop: 0, toggle: true, merged: false },
          { value: 3, drop: 0, toggle: true, merged: false },
          { value: 5, drop: 0, toggle: true, merged: false }
        ],
        [
          { value: 3, drop: 0, toggle: true, merged: false },
          { value: 2, drop: 0, toggle: true, merged: false },
          { value: 3, drop: 0, toggle: true, merged: false }
        ]
      ])
    ).toEqual([
      [
        { value: 4, drop: 0, toggle: true, merged: true },
        { value: null, drop: 0, toggle: true, merged: false },
        { value: 5, drop: 0, toggle: true, merged: false }
      ],
      [
        { value: null, drop: 0, toggle: true, merged: false },
        { value: 2, drop: 0, toggle: true, merged: false },
        { value: 3, drop: 0, toggle: true, merged: false }
      ]
    ]);
  });

  test('Will collapse a section and remove minimums', () => {
    expect(
      collapse(0, 0, [
        [
          { value: 3, drop: 0, toggle: true, merged: false },
          { value: 3, drop: 0, toggle: true, merged: false },
          { value: 1, drop: 0, toggle: true, merged: false }
        ],
        [
          { value: 3, drop: 0, toggle: true, merged: false },
          { value: 2, drop: 0, toggle: true, merged: false },
          { value: 3, drop: 0, toggle: true, merged: false }
        ]
      ])
    ).toEqual([
      [
        { value: 4, drop: 0, toggle: true, merged: true },
        { value: null, drop: 0, toggle: true, merged: false },
        { value: null, drop: 0, toggle: true, merged: false }
      ],
      [
        { value: null, drop: 0, toggle: true, merged: false },
        { value: 2, drop: 0, toggle: true, merged: false },
        { value: 3, drop: 0, toggle: true, merged: false }
      ]
    ]);
  });

  test("Won't collapse single numbers", () => {
    expect(
      collapse(0, 2, [
        [
          { value: 3, drop: 0, toggle: true, merged: false },
          { value: 3, drop: 0, toggle: true, merged: false },
          { value: 1, drop: 0, toggle: true, merged: false }
        ],
        [
          { value: 3, drop: 0, toggle: true, merged: false },
          { value: 2, drop: 0, toggle: true, merged: false },
          { value: 3, drop: 0, toggle: true, merged: false }
        ]
      ])
    ).toEqual([
      [
        { value: 3, drop: 0, toggle: true, merged: false },
        { value: 3, drop: 0, toggle: true, merged: false },
        { value: 1, drop: 0, toggle: true, merged: false }
      ],
      [
        { value: 3, drop: 0, toggle: true, merged: false },
        { value: 2, drop: 0, toggle: true, merged: false },
        { value: 3, drop: 0, toggle: true, merged: false }
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
            { value: 3, drop: 0, toggle: true, merged: false },
            { value: 3, drop: 0, toggle: true, merged: false },
            { value: 1, drop: 0, toggle: true, merged: false }
          ],
          [
            { value: 3, drop: 0, toggle: true, merged: false },
            { value: 2, drop: 0, toggle: true, merged: false },
            { value: 3, drop: 0, toggle: true, merged: false }
          ]
        ],
        [
          [
            { value: 4, drop: 3, toggle: true, merged: false },
            { value: 1, drop: 3, toggle: true, merged: false },
            { value: 2, drop: 3, toggle: true, merged: false }
          ],
          [
            { value: 4, drop: 1, toggle: true, merged: false },
            { value: 2, drop: 0, toggle: true, merged: false },
            { value: 3, drop: 0, toggle: true, merged: false }
          ]
        ]
      )
    ).toEqual([
      [
        { value: 4, drop: 3, toggle: false, merged: false },
        { value: 1, drop: 3, toggle: false, merged: false },
        { value: 2, drop: 3, toggle: false, merged: false }
      ],
      [
        { value: 4, drop: 1, toggle: false, merged: false },
        { value: 2, drop: 0, toggle: true, merged: false },
        { value: 3, drop: 0, toggle: true, merged: false }
      ]
    ]);
  });
  test('Toggles single changes', () => {
    expect(
      toggleChanges(
        [
          [
            { value: 3, drop: 0, toggle: true, merged: false },
            { value: 3, drop: 0, toggle: true, merged: false },
            { value: 1, drop: 0, toggle: true, merged: false }
          ],
          [
            { value: 3, drop: 0, toggle: true, merged: false },
            { value: 2, drop: 0, toggle: true, merged: false },
            { value: 3, drop: 0, toggle: true, merged: false }
          ]
        ],
        [
          [
            { value: 4, drop: 3, toggle: true, merged: false },
            { value: 1, drop: 3, toggle: true, merged: false },
            { value: 2, drop: 3, toggle: true, merged: false }
          ],
          [
            { value: 4, drop: 0, toggle: true, merged: false },
            { value: 2, drop: 0, toggle: true, merged: false },
            { value: 3, drop: 0, toggle: true, merged: false }
          ]
        ]
      )
    ).toEqual([
      [
        { value: 4, drop: 3, toggle: false, merged: false },
        { value: 1, drop: 3, toggle: false, merged: false },
        { value: 2, drop: 3, toggle: false, merged: false }
      ],
      [
        { value: 4, drop: 0, toggle: false, merged: false },
        { value: 2, drop: 0, toggle: true, merged: false },
        { value: 3, drop: 0, toggle: true, merged: false }
      ]
    ]);
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
});
