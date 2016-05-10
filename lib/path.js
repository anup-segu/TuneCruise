module.exports = {
  BARS: 50,
  BUFFER: 50,
  BASE_WIDTH: 0.35,
  FILL_STYLE: '#9fdbff',
  BASE_OFFSET: 50,

  offset: 0,
  oscillation: 0,
  oscillationDir: "right",
  barPositions: {},
  boosted: false,
  boostAnimation: "odd",

  boost: function() {
    this.boosted = true;

    setTimeout(function(){
      this.resetBoost();
    }.bind(this), 2000);
  },

  resetBoost: function() {
    this.boosted = false;
  },

  checkShipInPath: function (xPos, yPos) {
    var key = 0;
    var yPositions = Object.keys(this.barPositions);

    for (var i = 0; i < this.BARS; i++) {
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

  middle: function (numBar) {
    var bars = Object.keys(this.barPositions);
    var bar = bars[numBar];
    var leftBar = this.barPositions[bar][0];
    var rightBar = this.barPositions[bar][1];

    return ((leftBar + rightBar) / 2);
  },

  middleFromPos: function (yPos) {
    var yPositions = Object.keys(this.barPositions);
    var key = 0;

    for (var i = 0; i < this.BARS; i++) {
      if (yPos > yPositions[i]) {
        key = yPositions[i];
      }
    }

    var left = this.barPositions[key][0];
    var right = this.barPositions[key][1];

    return (left + right) / 2;
  },

  bottomMiddle: function() {
    return this.middle(this.BARS - 1);
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

  toggleBoostAnimation: function() {
    if (this.boostAnimation === "odd") {
      this.boostAnimation = "even";
    } else {
      this.boostAnimation = "odd";
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

    if (this.boosted) {
      for (var i = 0; i < this.BARS; i++) {
        var barYPosition = ((i+this.offset)%this.BARS) * barThickness;
        var barWidth = canvas.width*this.BASE_WIDTH;

        var leftBar = this.barPositions["0"][0];
        var rightBar = this.barPositions["0"][1];

        this.barPositions[barYPosition.toString()] = [ leftBar, rightBar ];

        if (this.boostAnimation === "odd" && (i % 2 !== 0)) {
          leftBar += 5;
          rightBar += 5;
        } else if (this.boostAnimation === "even" && (i%2 === 0)) {
          leftBar -= 5;
          rightBar -= 5;
        }

    		// ctx.fillRect(barXPosition, canvas.height, barWidth, barHeight);
        ctx.fillRect(0, barYPosition, leftBar, barThickness);
        ctx.fillRect(
          canvas.width,
          barYPosition,
          -(canvas.width - rightBar),
          barThickness
        );
    	}
      this.toggleBoostAnimation();

    } else if (checkMusic) {
      for (i = 0; i < this.BARS; i++) {
        barYPosition = ((i+this.offset)%this.BARS) * barThickness;
        barWidth = canvas.width*this.BASE_WIDTH;

        leftBar = barWidth;
        rightBar = canvas.width-barWidth;
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
        // optimize to avoid excessively large jumps
        // if (this.barPositions[i]) {
        //   if (leftBar - this.barPositions[barYPosition.toString()][0] > 50 ||
        //         leftBar - this.barPositions[barYPosition.toString()][0] < -50 ) {
        //       leftBar = this.barPositions[barYPosition.toString()][0];
        //       console.log("reset left");
        //   }
        //
        //   if (rightBar - this.barPositions[barYPosition.toString()][1] > 50 ||
        //       rightBar - this.barPositions[barYPosition.toString()][1] < -50 ) {
        //       rightBar = this.barPositions[barYPosition.toString()][1];
        //       console.log("reset right");
        //   }
        // }


        this.barPositions[barYPosition.toString()] = [ leftBar, rightBar ];


    		// ctx.fillRect(barXPosition, canvas.height, barWidth, barHeight);

        // right bar width
        // -((2* canvas.width * this.BASE_WIDTH)-barWidth)
        ctx.fillRect(0, barYPosition, barWidth, barThickness);
        ctx.fillRect(
          canvas.width,
          barYPosition,
          -(canvas.width - rightBar),
          barThickness
        );
    	}
    }

    this.offset = (this.offset + 1)%this.BARS;
  },
};
