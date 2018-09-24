import { toggleChanges } from './index';

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
});
