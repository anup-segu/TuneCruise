// Soundcloud Client Id: 8d709b750624924561c9e60f8b478795
// client secret: acd66bfac20b68bf3bc521d3298fbc06

// Audio_files
// 1. XESSIV - Around You - ./audio_files/around_you.mp3
// 2. stefan - Take Control - ./audio_files/take_control.mp3
// 3. RAWD - The Fire - ./audio_files/the_fire.mp3
// 4. Azeailia Banks - Chasing Time - ./audio_files/chasing_time.wav
// 5. Young Franco & Feki - Don't Stop - ./audio_files/dont_stop.mp3

var SC = window.SC;

var $ = require("jquery");
var MP3Player = require("./utils/mp3_player.js");
var Path = require("./components/path.js");
var Ship = require("./components/ship.js");
var Orb = require("./components/orb.js");
var Explosion = require("./components/explosion.js");
var explosion = null;

var GameControls = require("./utils/game_controls.js");
var Score = require("./utils/score.js");

window.addEventListener("load", function() {

  // var track_url = 'https://soundcloud.com/deepsounds/thief-crazy-lost-kings-remix';
  // var track_url = 'https://soundcloud.com/deepsounds/kandy-titus-doubetter';
  // var track_url = 'https://soundcloud.com/deepsounds/instatic-burning-for-you';
  // var track_url = 'https://soundcloud.com/brynnny/took-a-pill-in-ibiza-brynny-press-play-bootleg';


  //playlists
  // var track_url = 'https://soundcloud.com/deepsounds/sets/poolside-dance-party';
  var track_url = 'https://soundcloud.com/deepsounds/sets/ocean-tide';

  // Set up audio

  var audio = new Audio();
  var score = new Score();
  var musicPlayer = new MP3Player(audio, score);

  var soundCloudResolve = "//api.soundcloud.com/resolve.json?url=";
  var CLIENT_ID = "8d709b750624924561c9e60f8b478795";

  // audio.src = "./audio_files/dont_stop.mp3";
  audio.controls = true;
  audio.loop = false;
  audio.autoplay = false;

  $(".start-button").click(function() {
    // Change to launch default playlist
    musicPlayer.getMusic(track_url);
    $(".welcome-message").addClass("hide");
  });

  $("#demo-link").click(function() {
    //click to launch demo content
    musicPlayer.launchDemo();
    $(".welcome-message").addClass("hide");
  });

  $("#play-track").click(function() {
    var Url = $("#sc-url").val();
    console.log(Url);

    if (Url) {
      if (!$(".welcome-message").hasClass("hide")) {
        $(".welcome-message").addClass("hide");
      }
      musicPlayer.getMusic(Url);
      $("#sc-url").val("");
    }
  });

  $(".nav-toggle").click(function() {
    // if (!audio.paused) {
    //   audio.pause();
    // } else {
    //   audio.play();
    // }

    if ($(".nav-bar").hasClass("hide")) {
      // console.log("hello");
      audio.pause();
      $(".nav-bar").removeClass("hide");
    } else {
      audio.play();
    }

    $(".nav-bar").toggleClass("dropdown");
    $(".nav-bar").toggleClass("rollup");

    if ($("input#sc-url").hasClass("hide")) {
      setTimeout(function() {
        $("input#sc-url").toggleClass("hide");
      }, 200);
    } else {
      $("input#sc-url").toggleClass("hide");
    }

    if ($("button#play-track").hasClass("hide")) {
      setTimeout(function() {
        $("button#play-track").toggleClass("hide");
      }, 200);
    } else {
      $("button#play-track").toggleClass("hide");
    }

  });

  var context = new window.AudioContext();
  var analyzer = context.createAnalyser();

  // Set up canvas for game
  var canvas = document.getElementById('game');
  canvas.width = $(window).width()*.8;
  canvas.height = $(window).height()*.8;
  var ctx = canvas.getContext('2d');

  // Set up canvas for ship
  var shipCanvas = document.getElementById('game-ship');
  shipCanvas.width = $(window).width()*.8;
  shipCanvas.height = $(window).height()*.8;
  var shipCtx = shipCanvas.getContext('2d');

  // Set up canvas for orbs
  var orbCanvas = document.getElementById('game-orb');
  orbCanvas.width = $(window).width()*.8;
  orbCanvas.height = $(window).height()*.8;
  var orbCtx = orbCanvas.getContext('2d');

  // Set up Audio analyzer
  var source = context.createMediaElementSource(audio);
  source.connect(analyzer);
  analyzer.connect(context.destination);

  // Set up game components
  var ship = new Ship(shipCanvas, shipCtx, score);
  var orb = new Orb(orbCanvas, orbCtx, Path.BARS, score);
  var orb2 = new Orb(orbCanvas, orbCtx, Path.BARS, score);
  new GameControls(ship, score, Path).start();

  var updateStats = function() {
    $("#score").html("Score: " + score.current());
    $("#combo").html("Combo: " + score.currentCombo() + "x");
    if (score.getBoostMessage()) {
      $("#track-content").addClass("hide");
    } else {
      $("#track-content").removeClass("hide");
    }
    $("#boost-message").html(score.getBoostMessage());

  };

  var frame = 0;

  var frameLooper = function() {
    // Render game based on browser refresh rate
    window.requestAnimationFrame(frameLooper);
    var fbcArray = new window.Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteFrequencyData(fbcArray);

    var baseArray = fbcArray.slice(0, 25);
    var trebArray = fbcArray.slice(75, 100);

    if (audio.duration > 0 && !audio.paused) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shipCtx.clearRect(0, 0, shipCanvas.width, shipCanvas.height);
      orbCtx.clearRect(0, 0, orbCanvas.width, orbCanvas.height);

      // ship.render();

      Path.render(fbcArray, canvas, ctx, frame);

      orb.render(
        Path.middleFromPos(orb.yPos),
        fbcArray,
        Path.oscillationDir,
        Path.boosted,
        frame
      );

      // Reset score and ship if ship touching path
      if (Path.checkShipInPath(ship.xPos, ship.yPos)) {
        score.increment();
      } else if (!audio.paused) {
        explosion = new Explosion(ship.xPos, ship.yPos, ship.ctx);

        setTimeout(function() {
          explosion = null;
        }, 325);

        score.reset();
        ship.reset(Path.bottomMiddle());
      }

      if (explosion) {
        explosion.render();
      }

      // update score and reset orb if orb touching ship
      var touching = orb.touchingShip(
          ship.xPos,
          ship.yPos,
          ship.shipHeight,
          ship.shipWidth
      );

      if (touching) {
        orb.reset(Path.middle(0));
        score.addOrb();
        ship.isTouchingOrb();
      }

      ship.render(fbcArray);

      updateStats();

      frame = (frame + 1) % 60;
    }

  };


  frameLooper();

});
