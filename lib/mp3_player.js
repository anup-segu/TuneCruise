module.exports = {
  initMusicPlayer: function (audio, analyzer) {
    document.getElementById('audio_box').appendChild(audio);

    // window.frameLooper = function (analyzerElement) {
    //   window.requestAnimationFrame(window.frameLooper);
  	//   var fbcArray = new window.Uint8Array(analyzerElement.frequencyBinCount);
    //   console.log(analyzerElement);
    //   analyzerElement.getByteFrequencyData(fbcArray);
    // };
    //
    // window.frameLooper(analyzer);
  },
};
