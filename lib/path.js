module.exports = {
  BARS: 100,
  BUFFER: 20,
  FILL_STYLE: '#00CCFF',

  offset: 0,

  clearPath: function (canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },

  render: function (fbcArray, canvas, ctx) {
    this.clearPath(canvas, ctx);
    ctx.fillStyle = this.FILL_STYLE;
    var barThickness = canvas.height / this.BARS;

    for (var i = 0; i < this.BARS; i++) {
      var barYPosition = ((i+this.offset)%this.BARS) * barThickness;
      var barWidth = (fbcArray[i]/2);
      var barWidth = (barWidth / 255) * canvas.width;
      var barHeight = barThickness;

  		// ctx.fillRect(barXPosition, canvas.height, barWidth, barHeight);
      ctx.fillRect(0, barYPosition, barWidth-this.BUFFER, barHeight);
      ctx.fillRect(canvas.width, barYPosition, -(canvas.width-barWidth-(canvas.width/2)+this.BUFFER), barHeight);
  	}

    this.offset = (this.offset + 1)%this.BARS;
  },
};
