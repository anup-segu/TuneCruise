var Score = function() {
  this.count = 0;
  this.orbCount = 0;
  this.frameCount = 0;
  this.multiplier = 1;
  this.boostRequirement = 5;
  this.hasBoost = false;
};

Score.prototype.increment = function() {
  this.frameCount = (this.frameCount + 1) % 30;

  if (this.frameCount === 0) {
    this.count += 1 * Number(this.multiplier);
  }
};

Score.prototype.addOrb = function() {
  this.count += 50;
  this.orbCount += 1;
  this.multiplier += 1;

  if (this.orbCount % this.boostRequirement === 0 && this.orbCount > 0) {
    this.hasBoost = true;
  }
};

Score.prototype.resetOrbcount = function() {
  this.orbCount = 0;
  this.hasBoost = false;
};

Score.prototype.reset = function() {
  this.count = 0;
  this.orbCount  = 0;
  this.multiplier = 1;
  this.hasBoost = false;
};

Score.prototype.resetBoost = function() {
  this.hasBoost = false;
};

Score.prototype.current = function() {
  return this.count;
};

Score.prototype.currentCombo = function() {
  return this.orbCount;
};

Score.prototype.getBoostMessage = function() {
  if (this.hasBoost) {
    return "Press Q to boost!";
  } else {
    return "";
  }
};

module.exports = Score;
