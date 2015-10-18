(function() {
  var game = game_2048;
  var container = document.getElementById('container');
  var colors = {
    purple: 2048,
    red: 256,
    yellow: 64,
    green: 16,
    blue: 0,
  };

  function updateContainer() {
    var text = '';
    game.traverseRows(function(row) {
      row.forEach(function(value) {
        var color;
        for (name in colors) {
          if (value > colors[name]) {
            color = name;
            break;
          }
        }
        text += '<div class="ui ' + color + ' square">' + value + '</div>';
      });
      text += '<br>';
    });
    container.innerHTML = text;
  }

  game.reset();
  updateContainer();

  // Bind event handlers
  document.onkeyup = function(event) {
    var dx = 0, dy = 0;
    switch (event.keyIdentifier) {
      case 'Left':
        dx--;
        break;
      case 'Right':
        dx++;
        break;
      case 'Up':
        dy--;
        break;
      case 'Down':
        dy++;
        break;
      default:
        return;
    }
    game.move(dx, dy);
    updateContainer();
  };

  document.getElementById('reset').onclick = function() {
    game.reset();
    updateContainer();
  };
})();
