var BARS = 50;

function Orb (canvas, ctx) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.radius = 8;
  this.count = 0;
}

Orb.prototype.increment = function() {
  this.count = (this.count + 1)%BARS;
};

Orb.prototype.render = function() {
  var barThickness = this.canvas.height / BARS;

  var xPos = this.canvas.width / 2;
  var yPos = this.count * barThickness;

  console.log(xPos, yPos);

  this.ctx.beginPath();
  this.ctx.arc(xPos, yPos, this.radius, 0, 2*Math.PI);
  this.ctx.stroke();
  this.ctx.fill();

  this.increment();
};

module.exports = Orb;
