var ROW_SUM = 1+2+3+4+5+6+7+8+9;

function Board(matrix) {
  this.size = 9;
  this.matrix = matrix;

  this.remainingNumbers = (function(matrix) {
    var remaining = 0,
      _isZero = function(n) {
        return n === 0;
      };

    matrix.forEach(function(row) {
      remaining += row.filter(_isZero).length;
    });

    return remaining;
  })(this.matrix);
}


// Private set of functions, manly helpers
var _validate = function(array) {
  var sum = _.flatten(array).reduce(function(prev, n, index, arr) {
    return prev + n;
  });
  return sum === ROW_SUM;
};


// Starting creating our Board prototype
Board.prototype.isSolved = function() {
  var i = row = col = 0;

  // We're gonna validte the board in 9*3 steps:
  // 1) We check if each row's sum is correct
  // 2) We check if each colmun's sum is correct
  // 3) We check if each square's sum is correct
  // Every falsy check breaks the loop and returns false
  for (i; i < this.size; i++) {
    if (!_validate(this.getRow(i))) return false;
    if (!_validate(this.getColumn(i))) return false;

    // Just a sweet tweak to get valid coordinates for each
    // square on the board. With a 9-sized board, it will generate:
    // 0x0, 3x0, 6x0, 0x3, 3x3, 6x3, 0x6, 3x6, 6x6
    row = (i % 3) * 3;
    col = ((i / 3) | 0) * 3;
    if (!_validate(this.getSquare(row, col))) return false;
  }
  return true;
};

Board.prototype.set = function(row, cell, value) {
  this.matrix[row][cell] = value;
  this.remainingNumbers--;
};

Board.prototype.getRow = function(rowIndex) {
  return this.matrix[rowIndex];
};

Board.prototype.getColumn = function(colIndex) {
  return _.map(this.matrix, function(row) {
    return row[colIndex];
  });
};

Board.prototype.getSquare = function(rowIndex, colIndex) {
  var squareX = rowIndex / 3 | 0,
    squareY = colIndex / 3 | 0,
    squareArr = [];

  _.forEach(this.matrix, function(row, rowIndex) {
    if ((rowIndex / 3 | 0) === squareX) {
      var rowArr = [];
      _.forEach(row, function(cell, cellIndex) {
        if ((cellIndex / 3 | 0) === squareY) {
          rowArr.push(cell);
        }
      });
      squareArr.push(rowArr);
    }
  });

  return squareArr;
};

Board.prototype.availableValuesForCell = function(row, cell) {
  var available = [1, 2, 3, 4, 5, 6, 7, 8, 9],
    cellValue = this.matrix[row][cell];

  function removeExistants(arr) {
    arr.forEach(function(n) {
      if (n > 0 && available[n-1] !== null) {
        available[n-1] = null;
      }
    });
  }

  removeExistants(this.getRow(row));
  removeExistants(this.getColumn(cell));
  removeExistants(_.flatten(this.getSquare(row, cell)));

  return _.compact(available);
};


Board.create = function(options) {
  var x = 0;
  return new Board([
    [5,3,x,x,7,x,x,x,x],
    [6,x,x,1,9,5,x,x,x],
    [x,9,8,x,x,x,x,6,x],
    [8,x,x,x,6,x,x,x,3],
    [4,x,x,8,x,3,x,x,1],
    [7,x,x,x,2,x,x,x,6],
    [x,6,x,x,x,x,2,8,x],
    [x,x,x,4,1,9,x,x,5],
    [x,x,x,x,8,x,x,7,9]
  ]);
};

Board.load = function(matrix) {
  return new Board(matrix);
};

module.exports = Board;
