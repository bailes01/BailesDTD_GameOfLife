class Grid {
  constructor(cols, rows) {
    this.iarr = [-1, -1, -1, 0, 0, +1, +1, +1];
    this.jarr = [-1, 0, +1, -1, +1, -1, 0, +1];
    this.cols = cols;
    this.rows = rows;
    this.cellWidth = width / cols;
    this.cellHeight = height / rows;
    this.cells = [];
    for (var i = 0; i < cols; i++) {
      var col = [];
      for (var j = 0; j < rows; j++) {
        // col.push(round(random()));
        col.push(0);
      }
      this.cells.push(col);
    }
  }

  getNeighbours(i, j) {
    var neighbours = [];
    var neighbourSum = 0;
    for (var k = 0; k < 8; k++) {
      var Iindex = i + this.iarr[k];
      var Jindex = j + this.jarr[k];
      // if (Iindex >= 0 && Iindex < this.cols && Jindex >= 0 && Jindex < this.rows) {
      if (Iindex >= this.cols) {
        Iindex = 0;
      }
      if (Jindex >= this.rows) {
        Jindex = 0;
      }
      if (Iindex < 0) {
        Iindex = this.cols - 1;
      }
      if (Jindex < 0) {
        Jindex = this.rows - 1;
      }
      neighbours.push(this.cells[Iindex][Jindex]);
      neighbourSum += this.cells[Iindex][Jindex];
    }
    return neighbourSum;
  }
  randomGrid() {
    this.cells = [];
    for (var i = 0; i < this.cols; i++) {
      var col = [];
      for (var j = 0; j < this.rows; j++) {
        col.push(round(random()));
      }
      this.cells.push(col);
    }
  }
  nextGen() {
    var nextCells = [];
    for (var i = 0; i < this.cols; i++) {
      var nextRow = [];
      for (var j = 0; j < this.rows; j++) {
        var cell = this.cells[i][j];
        var neighbours = this.getNeighbours(i, j);
        if (cell == 1) {
          if (neighbours < 2 || neighbours > 3) {
            nextRow.push(0);
          } else {
            nextRow.push(1);
          }
        } else if (neighbours == 3) {
          nextRow.push(1);
        } else {
          nextRow.push(0);
        }
      }
      nextCells.push(nextRow);
    }
    this.cells = nextCells;
  }
  render() {
    if (paused) {
      stroke(50);
    } else {
      stroke(20);
    }
    if (this.cols > width / 4) {
      noStroke();
    }
    for (var i = 0; i < this.cells.length; i++) {
      for (var j = 0; j < this.cells[i].length; j++) {
        if (this.cells[i][j] == 0) {
          fill(0);
        } else {
          fill(200, 0, 200);
        }
        rect(
          i * this.cellWidth,
          j * this.cellHeight,
          this.cellWidth,
          this.cellHeight
        );
        // fill(255);
        // text(this.getNeighbours(i, j).toString(), i * this.cellWidth + this.cellWidth/2, j * this.cellHeight + this.cellHeight/2);
      }
    }
  }
}
