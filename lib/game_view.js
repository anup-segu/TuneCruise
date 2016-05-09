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
        ship.move(this.MOVES["w"]);
        break;
      //left
      case 65:
        ship.move(this.MOVES["a"]);
        break;
      //down
      case 83:
        ship.move(this.MOVES["s"]);
        break;
      //right
      case 68:
        ship.move(this.MOVES["d"]);
        break;
    }
  }.bind(this));
};

GameControls.prototype.start = function() {
  this.bindKeyHandlers();
};


module.exports = GameControls;
