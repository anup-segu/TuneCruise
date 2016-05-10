var $ = require("jquery");

var GameControls = function (ship, score, Path) {
  this.ship = ship;
  this.score = score;
  this.Path = Path;
};

GameControls.prototype.MOVES = {
  "w": [ 0, -20], //87 w
  "a": [-20,  0], //65 a
  "s": [ 0,  20], //83 s
  "d": [20,  0], //68 d
};

GameControls.prototype.bindKeyHandlers = function (){
  var ship = this.ship;
  var Path = this.Path;
  var score = this.score;

  $(window).keydown(function (event) {
    switch(event.which) {
      //up w
      case 87:
        ship.moveUp();
        break;
      //left a
      case 65:
        ship.moveLeft();
        break;
      //down s
      case 83:
        ship.moveDown();
        break;
      //right d
      case 68:
        ship.moveRight();
        break;
      //boost q
      case 81:
        //boost
        if (score.hasBoost) {
          Path.boost();
          score.resetOrbcount();
        }
        break;
    }
  });

  $(window).keyup(function (event) {
    // ship.clearDirections();

    switch(event.which) {
      //up w
      case 87:
        ship.clearVerticalDirections();
        break;
      //left a
      case 65:
        ship.clearHorizontalDirections();
        break;
      //down s
      case 83:
        ship.clearVerticalDirections();
        break;
      //right d
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
