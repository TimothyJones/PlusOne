import { collapse } from './index';

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
