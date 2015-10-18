var game_15 = (function() {
  var counter = 0;
  var game = new Matrix(4, 4, function(x, y) {
    this.set(x, y, counter++);
  });

  game.reset = function() {
  };

  game.move = function(dx, dy) {
    var cx, cy, tx, ty, value;

    this.traverse(function(x, y) {
      if (this.get(x, y) === 0) {
        cx = x;
        cy = y;
        return true;
      }
    });

    tx = cx + dx;
    ty = cy + dy;

    if (!this.isValidCoords(tx, ty)) {
      return;
    }

    value = this.get(cx, cy);
    this.set(cx, cy, this.get(tx, ty));
    this.set(tx, ty, value);
  };

  return game;
})();
