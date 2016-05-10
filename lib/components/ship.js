function Ship (canvas, ctx) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.xPos = this.canvas.width / 2;
  this.yPos = this.canvas.height - 5;
  this.shipWidth = 20;
  this.shipHeight = 20;
}

Ship.prototype.inBounds = function (vector) {
  var newXPos = this.xPos + vector[0];
  var newYPos = this.yPos + vector[1];

  var xInBounds = ( 0 < newXPos && newXPos < this.canvas.width );
  var yInBounds =
    ( this.shipHeight < newYPos && newYPos < this.canvas.height );

  return (xInBounds && yInBounds);
};

Ship.prototype.move = function (vector) {
  if (this.inBounds(vector)) {
    this.xPos += vector[0];
    this.yPos += vector[1];
  }
};

Ship.prototype.render = function() {
  this.ctx.fillStyle = "#000000";

  this.ctx.beginPath();
  this.ctx.moveTo(this.xPos - this.shipWidth/2, this.yPos);
  this.ctx.lineTo(this.xPos, this.yPos - this.shipHeight);
  this.ctx.lineTo(this.xPos + this.shipWidth/2, this.yPos);
  this.ctx.fill();
};

module.exports = Ship;
