module.exports = {
  BARS: 50,
  BUFFER: 50,
  BASE_WIDTH: 0.35,
  FILL_STYLE: '#00CCFF',
  BASE_OFFSET: 50,

  offset: 0,

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
      for (i = 0; i < this.BARS; i++) {

        barYPosition = ((i+this.offset)%this.BARS) * barThickness;
        barWidth = (fbcArray[i+this.BASE_OFFSET]/2);
        var barWidthPercent = barWidth / 255;

        if (barWidthPercent >= .5) {
          barWidth = (1+(barWidthPercent)) * (canvas.width * this.BASE_WIDTH);
        } else {
          barWidth = (1-(barWidthPercent)) * (canvas.width * this.BASE_WIDTH);
        }

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
