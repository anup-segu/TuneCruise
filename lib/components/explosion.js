var Particles = require("./particles.js");

var Explosion = function (xPos, yPos, ctx) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.ctx = ctx;

  this.ctx.fillStyle = "#ffc100";
  this.ctx.shadowBlur = 25;
  this.ctx.shadowColor = "#ffc100";

  this.particles = new Particles (xPos, yPos, this.ctx);

  var numParticles = Math.floor(Math.random()*25) + 5;
  for (var i = 0; i < numParticles; i++) {
    this.particles.create(xPos, yPos, ctx);
  }
};

Explosion.prototype.render = function() {
  this.particles.render();
};

module.exports = Explosion;
