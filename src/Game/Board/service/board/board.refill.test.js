import { refill } from './index';

describe('refill function', () => {
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

    filled.forEach(arr => {
      arr.forEach(cell => {
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

    filled.forEach(arr => {
      arr.forEach(cell => {
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

    filled.forEach(arr => {
      arr.forEach(cell => {
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
