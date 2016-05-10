function Orb (canvas, ctx, bars) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.xPos = this.canvas.width * .5;
  this.yPos = 0;

  this.bars = bars;
  this.dropSpeed = this.canvas.height / (2 * this.bars);
  this.radius = 8;
  this.count = 0;
}

Orb.prototype.drop = function(xPos) {
  if (this.yPos > this.canvas.height) {
    this.xPos = xPos;
    this.yPos = 0;
  } else {
    this.yPos += this.dropSpeed;
  }
};

Orb.prototype.render = function(xPos, baseArray, dir) {
  var lowNote = baseArray.every(function (num) {
    return num > 140;
  });

  if (lowNote) {
    this.ctx.fillStyle = "#ffd961";
    var radius = this.radius * 1.5;
  } else {
    this.ctx.fillStyle = "#FF0000";
    radius = this.radius;
  }

  if (dir === "left") {
    this.xPos -= 2;
  } else if (dir === "right") {
    this.xPos += 2;
  }

  this.ctx.beginPath();
  this.ctx.arc(
    this.xPos,
    this.yPos,
    radius, 0, 2*Math.PI);
  this.ctx.stroke();
  this.ctx.fill();

  this.drop(xPos);
};

module.exports = Orb;
