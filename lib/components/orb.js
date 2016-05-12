var Pulse = require("./pulse.js");

function Orb (canvas, ctx, bars, score) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.score = score;
  this.xPos = this.canvas.width * .5;
  this.yPos = 0;

  this.bars = bars;
  this.dropSpeed = this.canvas.height / (2 * this.bars);
  this.radius = 8;
  this.count = 0;
  this.pulse = null;
}

Orb.prototype.drop = function(xPos, boosted) {
  if (this.yPos > this.canvas.height) {
    this.score.resetOrbcount();
    this.xPos = xPos;
    this.yPos = 0;
  } else if (boosted) {
    this.yPos += (this.dropSpeed * 3);
  } else {
    this.yPos += this.dropSpeed;
  }
};

Orb.prototype.move = function (dir, boosted) {
  if (boosted) {
    return;
  } else if (dir === "left") {
    this.xPos -= 2;
  } else if (dir === "right") {
    this.xPos += 2;
  } else {
    return;
  }
};

Orb.prototype.touchingShip = function (xPos, yPos, height, width) {
  var touchX = (Math.abs(this.xPos - xPos) <= (width/2 + this.radius));
  var touchY = (Math.abs(this.yPos - yPos) <= height + this.radius);

  return (touchX && touchY);
};

Orb.prototype.reset = function (xPos) {
  this.xPos = xPos;
  this.yPos = 0;
};

Orb.prototype.render = function(xPos, fbcArray, dir, boosted, frame) {
  var baseArray = fbcArray.slice(0,25);
  var trebArray = fbcArray.slice(75,100);

  var lowNote = baseArray.every(function (num) {
    return num > 140;
  });

  var highNote = trebArray.every(function (num) {
    return num > 140;
  });

  if (lowNote) {
    this.ctx.fillStyle = "#ffd961";
    var radius = this.radius * 1.25;
    this.ctx.shadowColor = "#ffd961";
  } else {
    this.ctx.fillStyle = "#fd917e";
    radius = this.radius;
    this.ctx.shadowColor = "#fd917e";
  }

  // var r = Math.floor(Math.random()*255);
  var r = fbcArray[0];
  // var g = Math.floor(Math.random()*255);
  var g = fbcArray[50];
  // var b = Math.floor(Math.random()*255);
  var b = fbcArray[100];

  this.ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";

  if (highNote) {
    this.pulse = new Pulse(this, this.ctx);
  }

  setTimeout(function(){
    this.pulse = null;
  }, 250);

  this.ctx.shadowBlur = 10;

  this.move(dir, boosted);

  if (this.pulse) {
    this.pulse.render(frame);
  }

  this.ctx.beginPath();
  this.ctx.arc(
    this.xPos,
    this.yPos,
    radius, 0, 2*Math.PI);
  this.ctx.stroke();
  this.ctx.fill();

  this.drop(xPos, boosted);
};

module.exports = Orb;
