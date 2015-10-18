function Matrix(width, height, filler) {
  this.width = width;
  this.height = height;
  this._matrix = [];
  this.traverse(filler || function(x, y) {
    this.set(x, y, 0);
  });
}

Matrix.prototype.traverse = function(cb) {
  for (var y = 0; y < this.width; y++) {
    for (var x = 0; x < this.height; x++) {
      var result = cb.call(this, x, y);
      if (result) {
        return result;
      }
    }
  }
};

Matrix.prototype.traverseRows = function(cb) {
  for (var i = 0, len = this.width * this.height; i < len; i+= this.width) {
    var result = cb.call(
      this,
      this._matrix.slice(i, i + this.width),
      Math.floor(i / this.width)
    );
    if (result) {
      return result;
    }
  }
};

Matrix.prototype.traverseColumns = function(cb) {
  for (var x = 0; x < this.width; x++) {
    var column = [];
    for (var y = 0; y < this.height; y++) {
      column[y] = this.get(x, y);
    }
    var result = cb.call(this, column, x);
    if (result) {
      return result;
    }
  }
};

Matrix.prototype.isValidCoords = function(x, y) {
  return (x < this.width && y < this.height && x >= 0 && y >= 0);
};

Matrix.prototype._calcIndex = function(x, y) {
  return y * this.height + x;
};

Matrix.prototype.set = function(x, y, value) {
  return this.isValidCoords(x, y)
    ? this._matrix[this._calcIndex(x, y)] = value
    : null;
};

Matrix.prototype.get = function(x, y) {
  return this.isValidCoords(x, y)
    ? this._matrix[this._calcIndex(x, y)]
    : null;
};

Matrix.prototype.clone = function() {
  var self = this;
  return new Matrix(this.width, this.width, function(x, y) {
    this.set(x, y, self.get(x, y));
  });
};
