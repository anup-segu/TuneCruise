module.exports = {
  BARS: 50,
  BUFFER: 50,
  BASE_WIDTH: 0.35,
  FILL_STYLE: '#00CCFF',
  BASE_OFFSET: 50,

  offset: 0,
  oscillation: 0,
  oscillationDir: "right",
  barPositions: {},

  checkShipInPath: function (xPos, yPos) {
    var key;

    var yPositions = Object.keys(this.barPositions);

    for (var i = 0; i < yPositions.length; i++) {
      if (yPos > yPositions[i]) {
        key = yPositions[i];
      }
    }

    var leftInBounds = (xPos > this.barPositions[key][0]);
    var rightInBounds = (xPos < this.barPositions[key][1]);

    if (yPositions.length > 0 && leftInBounds && rightInBounds) {
      return true;
    } else {
      return false;
    }
  },

  bottomMiddle: function() {
    var bars = Object.keys(this.barPositions);
    var barsLast = bars[this.BARS - 1];
    var leftBar = this.barPositions[barsLast][0];
    var rightBar = this.barPositions[barsLast][1];

    return ((leftBar + rightBar) / 2) ;
  },

  setOscillation: function (width) {
    // Add randomness to oscillation
    var randomNum =
      Math.floor(Math.random()*(2 * width * .25) - (width * .25));

    // Check if oscillation is at max (25% of game width)
    // or its the random number to switch directions
    if (this.oscillation >= (width *.25) ||
      (this.oscillation === randomNum && this.oscillationDir === "right")) {
      this.oscillationDir = "left";
    } else if (this.oscillation <= -(width * .25) ||
      (this.oscillation === randomNum && this.oscillationDir === "left")) {
      this.oscillationDir = "right";
    }

    if (this.oscillationDir === "left") {
      this.oscillation -= 2;
    } else if (this.oscillationDir === "right") {
      this.oscillation += 2;
    }

  },

  render: function (fbcArray, canvas, ctx) {
    ctx.fillStyle = this.FILL_STYLE;
    var barThickness = canvas.height / this.BARS;

    // if (this.offset % 25 === 0 && baseNums.some(function (el) {
    //   return el === 255;
    // })) {
    //   console.log("beat");
    //   var spawnOrb = true;
    // }

    var checkMusic = fbcArray.every(function (x) {
      return x === 0;
    });

    if (checkMusic) {
      for (var i = 0; i < this.BARS; i++) {
        var barYPosition = ((i+this.offset)%this.BARS) * barThickness;
        var barWidth = canvas.width*this.BASE_WIDTH;

        var leftBar = barWidth;
        var rightBar = canvas.width-barWidth;
        this.barPositions[barYPosition.toString()] = [ leftBar, rightBar ];

    		// ctx.fillRect(barXPosition, canvas.height, barWidth, barHeight);
        ctx.fillRect(0, barYPosition, barWidth, barThickness);
        ctx.fillRect(
          canvas.width,
          barYPosition,
          -(barWidth),
          barThickness
        );
    	}
    } else {
      this.setOscillation(canvas.width);

      for (i = 0; i < this.BARS; i++) {

        barYPosition = ((i+this.offset)%this.BARS) * barThickness;
        barWidth = (fbcArray[i+this.BASE_OFFSET]/2);
        var barWidthPercent = barWidth / 255;

        if (barWidthPercent >= .5) {
          barWidth = (1+(barWidthPercent)) * (canvas.width * this.BASE_WIDTH);
        } else {
          barWidth = (1-(barWidthPercent)) * (canvas.width * this.BASE_WIDTH);
        }

        barWidth += this.oscillation;

        leftBar = barWidth;
        rightBar = canvas.width -((2* canvas.width * this.BASE_WIDTH)-barWidth);
        this.barPositions[barYPosition.toString()] = [ leftBar, rightBar ];

    		// ctx.fillRect(barXPosition, canvas.height, barWidth, barHeight);
        ctx.fillRect(0, barYPosition, barWidth, barThickness);
        ctx.fillRect(
          canvas.width,
          barYPosition,
          -((2* canvas.width * this.BASE_WIDTH)-barWidth),
          barThickness
        );
    	}
    }
    this.offset = (this.offset + 1)%this.BARS;
  },
};
