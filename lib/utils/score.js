var Score = function() {
  this.count = 0;
  this.frameCount = 0;
  this.multiplier = 1;
};

Score.prototype.increment = function() {
  this.frameCount = (this.frameCount + 1) % 30;

  if (this.frameCount === 0) {
    this.count += 1 * Number(this.multiplier);
  }
};

Score.prototype.addOrb = function() {
  this.count += 50;
  this.multiplier += 1;
};

Score.prototype.reset = function() {
  this.count = 0;
  this.multiplier = 1;
};

Score.prototype.current = function() {
  return this.count;
};

module.exports = Score;
