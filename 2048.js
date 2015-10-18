var game_2048 = (function() {
  var width = 4;
  var height = 4;
  var game = new Matrix(width, height);

  function packArray(array, direction) {
    var i, j, from, to, step, result;

    if (direction > 0) {
      from = array.length - 1;
      to = -1;
      step = -1;
    } else {
      from = 0;
      to = array.length;
      step = 1;
    }

    for (i = from, j = from, result = []; i !== to; i += step) {
      if (array[i] === 0) {
        continue;
      } else if (result[j] === array[i]) {
        result[j] *= 2;
        j += step;
      } else {
        if (result[j]) {
          j += step;
        }
        result[j] = array[i];
      }
    }

    for (; j !== to; j += step) {
      if (result[j] === undefined) {
        result[j] = 0;
      }
    }

    return result;
  }

  window.pack = packArray;

  game._prayToHolyRandom = function() {
    // get array of empty cells
    var emptyCells = [];
    this.traverse(function(x, y) {
      if (this.get(x, y) === 0) {
        emptyCells.push({ x: x, y: y });
      }
    });
    // if there is no place to spawn new squares game is over
    if (emptyCells.length === 0) {
      return false;
    }
    // pick random empty cell
    var cell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    // place new square
    return this.set(cell.x, cell.y, 2);
  };

  game.reset = function() {
    this._prayToHolyRandom();
  };

  game.move = function(dx, dy) {
    var traverse = dx !== 0 ? this.traverseRows : this.traverseColumns;
    var direction = dx || dy;
    var self = this;
    traverse.call(this, function(array, i) {
      packArray(array, direction).forEach(function(value, j) {
        var x = dx !== 0 ? j : i;
        var y = dy !== 0 ? j : i;
        self.set(x, y, value);
      });
    });
    if(!this._prayToHolyRandom()) {
      alert('You lost!');
    };
  };

  return game;
})();
