export function getMax(squares) {
  return squares.reduce(function(m, arr) {
    const rowMax = arr.reduce(function(a, b) {
      if (b.value === null) {
        return a;
      } else {
        return Math.max(a, b.value);
      }
    }, 0);
    return Math.max(m, rowMax);
  }, 0);
}

export function getMin(squares) {
  return squares.reduce(function(m, arr) {
    const rowMax = arr.reduce(function(a, b) {
      if (b.value === null) {
        return a;
      } else {
        return Math.min(a, b.value);
      }
    }, Number.MAX_SAFE_INTEGER);
    return Math.min(m, rowMax);
  }, Number.MAX_SAFE_INTEGER);
}

export function refill(squares, max) {
  squares = JSON.parse(JSON.stringify(squares));

  const min = Math.max(max - 7, 1);

  return squares.map((arr, j) =>
    arr.map(sq => {
      if (sq.value === null) {
        return {
          value: Math.floor(Math.random() * (max - min)) + min,
          drop: squares[0].length - j,
          toggle: !sq.toggle
        };
      } else return sq;
    })
  );
}

export function killMinimum(squares) {
  squares = JSON.parse(JSON.stringify(squares));

  const min = getMin(squares);

  return squares.map((arr, j) =>
    arr.map(sq => {
      if (sq.value === min) {
        return {
          value: null,
          drop: sq.drop,
          toggle: sq.toggle
        };
      } else return sq;
    })
  );
}

export function drop(squares) {
  squares = JSON.parse(JSON.stringify(squares));
  for (var j = squares[0].length - 1; j >= 0; j--) {
    for (var i = 0; i < squares.length; i++) {
      if (squares[i][j].value == null) {
        var next = j;
        while (next >= 0 && squares[i][next].value == null) next--;
        if (next >= 0) {
          squares[i][j] = {
            value: squares[i][next].value,
            drop: j - next,
            toggle: !squares[i][next].toggle
          };
          squares[i][next].value = null;
        }
      } else {
        squares[i][j].drop = 0;
      }
    }
  }
  return squares;
}

export function canMove(squares) {
  const x = squares.length;
  const y = squares[0].length;
  function possibleMoveWith(i, j, value) {
    if (i < 0 || i >= x) return false;
    if (j < 0 || j >= y) return false;
    if (squares[i][j].value === value) return true;
    return false;
  }

  for (var j = 0; j < y; j++) {
    for (var i = 0; i < x; i++) {
      const { value } = squares[i][j];
      if (
        possibleMoveWith(i - 1, j, value) ||
        possibleMoveWith(i + 1, j, value) ||
        possibleMoveWith(i, j - 1, value) ||
        possibleMoveWith(i, j + 1, value)
      )
        return true;
    }
  }
  return false;
}

export function collapse(i, j, squares) {
  squares = JSON.parse(JSON.stringify(squares));

  const x = squares.length;
  const y = squares[0].length;

  const value = squares[i][j].value;
  const max = getMax(squares);

  function update(i, j) {
    if (i < 0 || i >= x) return 0;
    if (j < 0 || j >= y) return 0;
    if (squares[i][j].value !== value) return 0;
    else {
      squares[i][j].value = null;
      return (
        1 +
        update(i + 1, j) +
        update(i - 1, j) +
        update(i, j + 1) +
        update(i, j - 1)
      );
    }
  }
  if (update(i, j) > 1) {
    squares[i][j].value = value + 1;
    if (squares[i][j].value > max) {
      squares = killMinimum(squares);
    }
  } else {
    // Still have to do this, because update replaces it with null
    squares[i][j].value = value;
  }
  return squares;
}
