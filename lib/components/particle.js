var Particle = function (xPos, yPos, ctx) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.xDir = Math.random()*2 - 1;
  this.yDir = Math.random()*2 - 1;
  this.radius = Math.random()*1 + .25;
  this.speed = 2;
  this.ctx = ctx;
};

Particle.prototype.move = function(boosted) {
  this.xPos += this.xDir * this.speed;

  if (boosted) {
    this.yPos += 3 * this.speed;
  } else {
    this.yPos += this.yDir * this.speed;
  }
};

Particle.prototype.render = function(boosted) {
  this.ctx.shadowBlur = 30;
  this.ctx.shadowColor = this.ctx.fillStyle;
  this.ctx.strokeStyle = this.ctx.fillStyle;

  this.ctx.beginPath();
  this.ctx.arc(
    this.xPos,
    this.yPos,
    this.radius, 0, 2*Math.PI);
  this.ctx.stroke();
  this.ctx.fill();

  this.move(boosted);
};

module.exports = Particle;
