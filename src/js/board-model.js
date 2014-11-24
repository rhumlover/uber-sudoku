var ROW_SUM = 1+2+3+4+5+6+7+8+9;

function Board(matrix) {
  this.matrix = matrix;
}

Board.prototype.isSolved = function() {
  return false;
};

Board.prototype.set = function(row, cell, value) {
  this.matrix[row][cell] = value;
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
