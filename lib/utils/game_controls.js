var $ = require("jquery");

var GameControls = function (ship) {
  this.ship = ship;
};

GameControls.prototype.MOVES = {
  "w": [ 0, -10], //87 w
  "a": [-10,  0], //65 a
  "s": [ 0,  10], //83 s
  "d": [10,  0], //68 d
};

GameControls.prototype.bindKeyHandlers = function (){
  var ship = this.ship;

  $(window).keydown(function (event) {
    switch(event.which) {
      //up
      case 87:
        ship.moveUp();
        break;
      //left
      case 65:
        ship.moveLeft();
        break;
      //down
      case 83:
        ship.moveDown();
        break;
      //right
      case 68:
        ship.moveRight();
        break;
    }
  });

  $(window).keyup(function (event) {
    // ship.clearDirections();

    switch(event.which) {
      //up
      case 87:
        ship.clearVerticalDirections();
        break;
      //left
      case 65:
        ship.clearHorizontalDirections();
        break;
      //down
      case 83:
        ship.clearVerticalDirections();
        break;
      //right
      case 68:
        ship.clearHorizontalDirections();
        break;
    }
  });
};

GameControls.prototype.start = function() {
  this.bindKeyHandlers();
};


module.exports = GameControls;
