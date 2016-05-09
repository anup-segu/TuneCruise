function Ship (canvas, ctx) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.xPos = this.canvas.width / 2;
  this.yPos = this.canvas.height - 5;
  this.shipWidth = 20;
  this.shipHeight = 20;
}

Ship.prototype.move = function (xDif) {
  this.xPos += xDif;
};

Ship.prototype.render = function() {
  this.ctx.beginPath();
  this.ctx.moveTo(this.xPos - this.shipWidth/2, this.yPos);
  this.ctx.lineTo(this.xPos, this.yPos - this.shipHeight);
  this.ctx.lineTo(this.xPos + this.shipWidth/2, this.yPos);
  this.ctx.fill();
};

module.exports = Ship;
