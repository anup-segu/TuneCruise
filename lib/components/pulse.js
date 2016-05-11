var Pulse = function(orb) {
  this.orb = orb;
  this.radius = this.orb.radius;
  this.ctx = this.orb.ctx;
};

Pulse.prototype.render = function (frame) {
  this.ctx.strokeStyle = this.ctx.fillStyle;
  this.ctx.beginPath();
  this.ctx.arc(
    this.orb.xPos,
    this.orb.yPos,
    this.radius*(2.5+frame/60), Math.random()*2*Math.PI, 2*Math.PI, false);
  this.ctx.stroke();

  this.ctx.strokeStyle = this.ctx.fillStyle;
  this.ctx.beginPath();
  this.ctx.arc(
    this.orb.xPos,
    this.orb.yPos,
    this.radius*(1.25+frame/60), Math.random()*2*Math.PI, 2*Math.PI, true);
  this.ctx.stroke();
};

module.exports = Pulse;
