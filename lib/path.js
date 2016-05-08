module.exports = {
  BARS: 50,
  BUFFER: 50,
  BASE_WIDTH: 0.35,
  FILL_STYLE: '#00CCFF',
  BASE_OFFSET: 50,

  offset: 0,

  clearPath: function (canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },

  render: function (fbcArray, canvas, ctx) {
    this.clearPath(canvas, ctx);
    ctx.fillStyle = this.FILL_STYLE;
    var barThickness = canvas.height / this.BARS;

    var checkMusic = fbcArray.reduce(function (x, y) {
      return x + y;
    });



    if (checkMusic === 0) {
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
      for (var i = 0; i < this.BARS; i++) {
        var barYPosition = ((i+this.offset)%this.BARS) * barThickness;
        var barWidth = (fbcArray[i+this.BASE_OFFSET]/2);
        // barWidth = (barWidth / 255) * canvas.width;
        var barWidthPercent = barWidth / 255;


        if (barWidthPercent >= .5) {
          // barWidth = (canvas.width * this.BASE_WIDTH) + (canvas.width * this.BASE_WIDTH * barWidth)
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
