var $ = require("jquery");
var CLIENT_ID = "8d709b750624924561c9e60f8b478795";
var soundCloudResolve = "//api.soundcloud.com/resolve.json?url="; //might need to kill http:

var MP3Player = function (audio, score) {
  this.audio = audio;
  this.score = score;
  this.track = null;
  this.set = [];
  this.currentType = null;
};

MP3Player.prototype.initMusicPlayer = function() {
  document.getElementById('audio_box').appendChild(this.audio);
};

MP3Player.prototype.getMusic = function (Url) {
  $.get(
    soundCloudResolve + Url + '&client_id=' + CLIENT_ID,
    function (result) {
      console.log(result);
      $(".nav-bar").addClass("hide");
      if (result.kind === "track") {
        this.currentType = "track";
        this.launchTrack(result);
      } else if (result.kind === "playlist") {
        this.currentType = "playlist";
        this.launchPlayList(result);
      }
    }.bind(this)
  );
};

MP3Player.prototype.setDemoMusic = function() {
  this.audio.src = "./audio_files/dont_stop.mp3";
  this.track = null;
  this.set = [];
};

MP3Player.prototype.setTrack = function (track) {
  this.track = track;
  if (this.currentType === "track") {
    this.set = [];
  }

  this.audio.src = this.track.stream_url + '?client_id=' + CLIENT_ID;
  // this.audio.autoplay = true;
  this.audio.crossOrigin = "anonymous";
  $(".game-background").css("background-image", "url("+ this.track.artwork_url +")");
};

MP3Player.prototype.setPlayList = function (list) {
  this.set = list.tracks;
};

MP3Player.prototype.playPlayList = function() {
  var i = 0;
  this.launchTrack(this.set[i]);

  $(this.audio).on("ended", function() {
    if (i + 1 < this.set.length) {
      i += 1;
      this.launchTrack(this.set[i], "list");
    } else {
      this.showScore(true);
      this.set = [];
    }
  }.bind(this));
};

MP3Player.prototype.showScore = function() {
  $(this.audio).on("ended", function() {
    $("#final-score-stat").html(this.score.count);
    $("#final-score").removeClass("hide");
  }.bind(this));

  $(".replay-button").click(function() {
    $("#final-score").addClass("hide");
    $(".game-overlay").addClass("hide");
    this.score.reset();

    if (this.currentType === "track") {
      this.launchTrack(this.track);
    } else {
      this.launchDemo();
    }

  }.bind(this));
};

MP3Player.prototype.launch = function (callback) {

  $("#start-3").removeClass("hide");
  setTimeout(function() {
    $("#start-3").addClass("hide");
    $("#start-2").removeClass("hide");
  }, 1000);
  setTimeout(function() {
    $("#start-2").addClass("hide");
    $("#start-1").removeClass("hide");
  }, 2000);
  setTimeout(function() {
    $("#start-1").addClass("hide");
    $("#start-go").removeClass("hide");
  }, 3000);
  setTimeout(callback, 3250);
};

MP3Player.prototype.launchDemo = function() {
  this.currentType = "demo";
  this.launch(function() {
    $(".game-overlay").removeClass("hide");
    $("#start-go").addClass("hide");
    this.initMusicPlayer();
    this.setDemoMusic();
    this.audio.play();
  }.bind(this));

  this.showScore();
};

MP3Player.prototype.launchTrack = function (track) {
  this.launch(function() {
    $(".game-overlay").removeClass("hide");
    $("#start-go").addClass("hide");
    $("#track-name").html(track.title);
    $("#track-artist").html(track.user.username);
    this.initMusicPlayer();
    this.setTrack(track);
    this.audio.play();
  }.bind(this));

  if (this.currentType === "track") {
    this.showScore();
  }
};

MP3Player.prototype.launchPlayList = function (list) {
  this.setPlayList(list);
  this.playPlayList();
};



module.exports = MP3Player;
