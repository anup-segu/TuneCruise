function Ship (canvas, ctx) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.xPos = this.canvas.width / 2;
  this.yPos = this.canvas.height - 5;
  this.shipWidth = 20;
  this.shipHeight = 20;
  this.directions = {};
  this.touchingOrb = false;
  this.boosted = false;
}

Ship.prototype.moveLeft = function() {
  this.directions["horizontal"] = [-3, 0];
};

Ship.prototype.moveRight = function() {
  this.directions["horizontal"] = [3, 0];
};

Ship.prototype.moveUp = function() {
  this.directions["vertical"] = [0, -3];
};

Ship.prototype.moveDown = function() {
  this.directions["vertical"] = [0, 3];
};

Ship.prototype.clearVerticalDirections = function() {
  delete this.directions["vertical"];
};

Ship.prototype.clearHorizontalDirections = function() {
  delete this.directions["horizontal"];
};

Ship.prototype.inBounds = function (vector) {
  var newXPos = this.xPos + vector[0];
  var newYPos = this.yPos + vector[1];

  var xInBounds = ( 0 < newXPos && newXPos < this.canvas.width );
  var yInBounds =
    ( this.shipHeight < newYPos && newYPos < this.canvas.height );

  return (xInBounds && yInBounds);
};

Ship.prototype.isTouchingOrb = function() {
  this.touchingOrb = true;

  setTimeout(function() {
    this.touchingOrb = false;
  }.bind(this), 250);
};

Ship.prototype.boost = function() {
  this.boosted = true;

  setTimeout(function() {
    this.boosted = false;
  }.bind(this), 2000);
};

Ship.prototype.move = function (vector) {
  if (this.inBounds(vector)) {
    this.xPos += vector[0];
    this.yPos += vector[1];
  }
};

Ship.prototype.reset = function (xPos) {
  this.xPos = xPos || this.canvas.width / 2;
  this.yPos = this.canvas.height - 5;
};

Ship.prototype.render = function () {
  Object.keys(this.directions).forEach(function (dir) {
    this.move(this.directions[dir]);
  }.bind(this));

  if (this.touchingOrb) {
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.shadowBlur = 25;
    this.ctx.shadowColor = "#FFFFFF";
  } else {
    this.ctx.fillStyle = "#7bff14";
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = "#7bff14";
  }

  this.ctx.beginPath();
  this.ctx.moveTo(this.xPos - this.shipWidth/2, this.yPos);
  this.ctx.lineTo(this.xPos, this.yPos - this.shipHeight);
  this.ctx.lineTo(this.xPos + this.shipWidth/2, this.yPos);
  this.ctx.fill();

  if (this.boosted) {
    for (var i = 0; i < 6; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.xPos - this.shipWidth/2 + i, this.yPos + (1.5*i));
      this.ctx.lineTo(this.xPos, this.yPos - this.shipHeight);
      this.ctx.lineTo(this.xPos + this.shipWidth/2 - i, this.yPos + (1.5*i));
      this.ctx.fill();
    }
  }
};

module.exports = Ship;
