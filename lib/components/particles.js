var Particle = require("./particle.js");

var Particles = function() {
  this.particles = {};
  this.count = 0;
};

Particles.prototype.create = function (xPos, yPos, ctx) {
  var key = this.count.toString();

  this.particles[key] = new Particle(xPos, yPos, ctx);
  this.count += 1;

  setTimeout(function() {
    delete this.particles[key];
  }.bind(this), 300);
};

Particles.prototype.render = function (boosted) {
  Object.keys(this.particles).forEach(function (key) {
    this.particles[key].render(boosted);
  }.bind(this));
};

module.exports = Particles;
