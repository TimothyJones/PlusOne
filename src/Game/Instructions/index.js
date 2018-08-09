// @flow

import React from 'react';

export default () => (
  <div>
    <h1>PlusOne</h1>
    <p>
      The cell with the highest number is white. This is your score, and bigger
      is better.
    </p>
    <p>
      You can merge cells that share the same number as long as they&apos;re
      touching. Merged cells increase their number by one.
    </p>
    <p>
      Bonus: Each time you merge white cells, the lowest numbered cells also
      fall off the board.
    </p>
    <p>Good luck!</p>
  </div>
);
