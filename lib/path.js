module.exports = {
  BARS: 100,
  FILL_STYLE: '#00CCFF',

  offset: 0,

  clearPath: function (canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },

  render: function (fbcArray, canvas, ctx) {
    this.clearPath(canvas, ctx);
    ctx.fillStyle = this.FILL_STYLE;

    for (var i = 0; i < this.BARS; i++) {
      var barYPosition = ((i+this.offset)%this.BARS) * 3;
      var barWidth = (fbcArray[i]/2);
      var barHeight = 3;

  		// ctx.fillRect(barXPosition, canvas.height, barWidth, barHeight);
      ctx.fillRect(0, barYPosition, barWidth-10, barHeight);
      ctx.fillRect(canvas.width, barYPosition, -(canvas.width-barWidth-(canvas.width/2)+10), barHeight);
  	}

    this.offset = (this.offset + 1)%this.BARS;
  },
};
