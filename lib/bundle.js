/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// Soundcloud Client Id: 8d709b750624924561c9e60f8b478795
	// client secret: acd66bfac20b68bf3bc521d3298fbc06
	
	var SC = __webpack_require__(2);
	var soundManager = __webpack_require__(3);
	
	window.addEventListener("load", function() {
	  var MP3Player = __webpack_require__(1);
	  var audio = new Audio();
	
	  audio.src = "around_you.mp3";
	  audio.controls = true;
	  audio.loop = true;
	  audio.autoplay = true;
	
	  var context = new window.AudioContext();
	  var analyzer = context.createAnalyser();
	
	  var canvas = document.getElementById('game');
	  canvas.width = 500;
	  canvas.hegith = 30;
	  var ctx = canvas.getContext('2d');
	
	  var source = context.createMediaElementSource(audio);
	  source.connect(analyzer);
	  analyzer.connect(context.destination);
	  MP3Player.initMusicPlayer(audio, analyzer);
	
	  var frameLooper = function() {
	    window.requestAnimationFrame(frameLooper);
	    var fbcArray = new window.Uint8Array(analyzer.frequencyBinCount);
	    analyzer.getByteFrequencyData(fbcArray);
	    console.log(fbcArray);
	    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
	  	ctx.fillStyle = '#00CCFF'; // Color of the bars
	  	var bars = 100;
	  	for (var i = 0; i < bars; i++) {
	  		var barXPosition = i * 3;
	  		var barWidth = 2;
	  		var barHeight = -(fbcArray[i] / 2);
	  		//  fillRect( x, y, width, height ) // Explanation of the parameters below
	  		ctx.fillRect(barXPosition, canvas.height, barWidth, barHeight);
	  	}
	  };
	
	  frameLooper();
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
	  initMusicPlayer: function (audio, analyzer) {
	    document.getElementById('audio_box').appendChild(audio);
	  },
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	!function(t,e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var i in n)("object"==typeof exports?exports:t)[i]=n[i]}}(this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return t[i].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){(function(e){"use strict";var i=n(4),r=n(9),o=n(2),s=n(10),a=n(1).Promise,u=n(16),l=n(17);t.exports=e.SC={initialize:function(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];o.set("oauth_token",t.oauth_token),o.set("client_id",t.client_id),o.set("redirect_uri",t.redirect_uri),o.set("baseURL",t.baseURL),o.set("connectURL",t.connectURL)},get:function(t,e){return i.request("GET",t,e)},post:function(t,e){return i.request("POST",t,e)},put:function(t,e){return i.request("PUT",t,e)},"delete":function(t){return i.request("DELETE",t)},upload:function(t){return i.upload(t)},connect:function(t){return s(t)},isConnected:function(){return void 0!==o.get("oauth_token")},oEmbed:function(t,e){return i.oEmbed(t,e)},resolve:function(t){return i.resolve(t)},Recorder:u,Promise:a,stream:function(t,e){return l(t,e)},connectCallback:function(){r.notifyDialog(this.location)}}}).call(e,function(){return this}())},function(t,e,n){var i;(function(t,r,o,s){/*!
		 * @overview es6-promise - a tiny implementation of Promises/A+.
		 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
		 * @license   Licensed under MIT license
		 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
		 * @version   2.3.0
		 */
	(function(){"use strict";function a(t){return"function"==typeof t||"object"==typeof t&&null!==t}function u(t){return"function"==typeof t}function l(t){return"object"==typeof t&&null!==t}function c(t){$=t}function h(t){J=t}function d(){var e=t.nextTick,n=t.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);return Array.isArray(n)&&"0"===n[1]&&"10"===n[2]&&(e=r),function(){e(m)}}function f(){return function(){q(m)}}function p(){var t=0,e=new et(m),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function _(){var t=new MessageChannel;return t.port1.onmessage=m,function(){t.port2.postMessage(0)}}function g(){return function(){setTimeout(m,1)}}function m(){for(var t=0;Q>t;t+=2){var e=rt[t],n=rt[t+1];e(n),rt[t]=void 0,rt[t+1]=void 0}Q=0}function y(){try{var t=n(26);return q=t.runOnLoop||t.runOnContext,f()}catch(e){return g()}}function v(){}function A(){return new TypeError("You cannot resolve a promise with itself")}function E(){return new TypeError("A promises callback cannot return that same promise.")}function S(t){try{return t.then}catch(e){return ut.error=e,ut}}function T(t,e,n,i){try{t.call(e,n,i)}catch(r){return r}}function b(t,e,n){J(function(t){var i=!1,r=T(n,e,function(n){i||(i=!0,e!==n?L(t,n):I(t,n))},function(e){i||(i=!0,D(t,e))},"Settle: "+(t._label||" unknown promise"));!i&&r&&(i=!0,D(t,r))},t)}function w(t,e){e._state===st?I(t,e._result):e._state===at?D(t,e._result):M(e,void 0,function(e){L(t,e)},function(e){D(t,e)})}function P(t,e){if(e.constructor===t.constructor)w(t,e);else{var n=S(e);n===ut?D(t,ut.error):void 0===n?I(t,e):u(n)?b(t,e,n):I(t,e)}}function L(t,e){t===e?D(t,A()):a(e)?P(t,e):I(t,e)}function O(t){t._onerror&&t._onerror(t._result),k(t)}function I(t,e){t._state===ot&&(t._result=e,t._state=st,0!==t._subscribers.length&&J(k,t))}function D(t,e){t._state===ot&&(t._state=at,t._result=e,J(O,t))}function M(t,e,n,i){var r=t._subscribers,o=r.length;t._onerror=null,r[o]=e,r[o+st]=n,r[o+at]=i,0===o&&t._state&&J(k,t)}function k(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var i,r,o=t._result,s=0;s<e.length;s+=3)i=e[s],r=e[s+n],i?N(n,i,r,o):r(o);t._subscribers.length=0}}function R(){this.error=null}function x(t,e){try{return t(e)}catch(n){return lt.error=n,lt}}function N(t,e,n,i){var r,o,s,a,l=u(n);if(l){if(r=x(n,i),r===lt?(a=!0,o=r.error,r=null):s=!0,e===r)return void D(e,E())}else r=i,s=!0;e._state!==ot||(l&&s?L(e,r):a?D(e,o):t===st?I(e,r):t===at&&D(e,r))}function C(t,e){try{e(function(e){L(t,e)},function(e){D(t,e)})}catch(n){D(t,n)}}function U(t,e){var n=this;n._instanceConstructor=t,n.promise=new t(v),n._validateInput(e)?(n._input=e,n.length=e.length,n._remaining=e.length,n._init(),0===n.length?I(n.promise,n._result):(n.length=n.length||0,n._enumerate(),0===n._remaining&&I(n.promise,n._result))):D(n.promise,n._validationError())}function F(t){return new ct(this,t).promise}function H(t){function e(t){L(r,t)}function n(t){D(r,t)}var i=this,r=new i(v);if(!z(t))return D(r,new TypeError("You must pass an array to race.")),r;for(var o=t.length,s=0;r._state===ot&&o>s;s++)M(i.resolve(t[s]),void 0,e,n);return r}function B(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(v);return L(n,t),n}function j(t){var e=this,n=new e(v);return D(n,t),n}function G(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function Y(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function V(t){this._id=_t++,this._state=void 0,this._result=void 0,this._subscribers=[],v!==t&&(u(t)||G(),this instanceof V||Y(),C(this,t))}function K(){var t;if("undefined"!=typeof o)t=o;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;(!n||"[object Promise]"!==Object.prototype.toString.call(n.resolve())||n.cast)&&(t.Promise=gt)}var W;W=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var q,$,X,z=W,Q=0,J=({}.toString,function(t,e){rt[Q]=t,rt[Q+1]=e,Q+=2,2===Q&&($?$(m):X())}),Z="undefined"!=typeof window?window:void 0,tt=Z||{},et=tt.MutationObserver||tt.WebKitMutationObserver,nt="undefined"!=typeof t&&"[object process]"==={}.toString.call(t),it="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,rt=new Array(1e3);X=nt?d():et?p():it?_():void 0===Z?y():g();var ot=void 0,st=1,at=2,ut=new R,lt=new R;U.prototype._validateInput=function(t){return z(t)},U.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")},U.prototype._init=function(){this._result=new Array(this.length)};var ct=U;U.prototype._enumerate=function(){for(var t=this,e=t.length,n=t.promise,i=t._input,r=0;n._state===ot&&e>r;r++)t._eachEntry(i[r],r)},U.prototype._eachEntry=function(t,e){var n=this,i=n._instanceConstructor;l(t)?t.constructor===i&&t._state!==ot?(t._onerror=null,n._settledAt(t._state,e,t._result)):n._willSettleAt(i.resolve(t),e):(n._remaining--,n._result[e]=t)},U.prototype._settledAt=function(t,e,n){var i=this,r=i.promise;r._state===ot&&(i._remaining--,t===at?D(r,n):i._result[e]=n),0===i._remaining&&I(r,i._result)},U.prototype._willSettleAt=function(t,e){var n=this;M(t,void 0,function(t){n._settledAt(st,e,t)},function(t){n._settledAt(at,e,t)})};var ht=F,dt=H,ft=B,pt=j,_t=0,gt=V;V.all=ht,V.race=dt,V.resolve=ft,V.reject=pt,V._setScheduler=c,V._setAsap=h,V._asap=J,V.prototype={constructor:V,then:function(t,e){var n=this,i=n._state;if(i===st&&!t||i===at&&!e)return this;var r=new this.constructor(v),o=n._result;if(i){var s=arguments[i-1];J(function(){N(i,r,s,o)})}else M(n,r,t,e);return r},"catch":function(t){return this.then(null,t)}};var mt=K,yt={Promise:gt,polyfill:mt};n(23).amd?(i=function(){return yt}.call(e,n,e,s),!(void 0!==i&&(s.exports=i))):"undefined"!=typeof s&&s.exports?s.exports=yt:"undefined"!=typeof this&&(this.ES6Promise=yt),mt()}).call(this)}).call(e,n(6),n(3).setImmediate,function(){return this}(),n(24)(t))},function(t,e){"use strict";var n={oauth_token:void 0,baseURL:"https://api.soundcloud.com",connectURL:"//connect.soundcloud.com",client_id:void 0,redirect_uri:void 0};t.exports={get:function(t){return n[t]},set:function(t,e){e&&(n[t]=e)}}},function(t,e,n){(function(t,i){function r(t,e){this._id=t,this._clearFn=e}var o=n(6).nextTick,s=Function.prototype.apply,a=Array.prototype.slice,u={},l=0;e.setTimeout=function(){return new r(s.call(setTimeout,window,arguments),clearTimeout)},e.setInterval=function(){return new r(s.call(setInterval,window,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t.close()},r.prototype.unref=r.prototype.ref=function(){},r.prototype.close=function(){this._clearFn.call(window,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},e.setImmediate="function"==typeof t?t:function(t){var n=l++,i=arguments.length<2?!1:a.call(arguments,1);return u[n]=!0,o(function(){u[n]&&(i?t.apply(null,i):t.call(null),e.clearImmediate(n))}),n},e.clearImmediate="function"==typeof i?i:function(t){delete u[t]}}).call(e,n(3).setImmediate,n(3).clearImmediate)},function(t,e,n){(function(e){"use strict";var i=n(2),r=n(21),o=n(1).Promise,s=function(t,n,i,r){var s=void 0,a=new o(function(o){var a=e.FormData&&i instanceof FormData;s=new XMLHttpRequest,s.upload&&s.upload.addEventListener("progress",r),s.open(t,n,!0),a||s.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),s.onreadystatechange=function(){4===s.readyState&&o({responseText:s.responseText,request:s})},s.send(i)});return a.request=s,a},a=function(t){var e=t.responseText,n=t.request,i=void 0,r=void 0;try{r=JSON.parse(e)}catch(o){}return r?r.errors&&(i={message:""},r.errors[0]&&r.errors[0].error_message&&(i={message:r.errors[0].error_message})):i=n?{message:"HTTP Error: "+n.status}:{message:"Unknown error"},i&&(i.status=n.status),{json:r,error:i}},u=function c(t,e,n,i){var r=s(t,e,n,i),o=r.then(function(t){var e=t.responseText,n=t.request,i=a({responseText:e,request:n});if(i.json&&"302 - Found"===i.json.status)return c("GET",i.json.location,null);if(200!==n.status&&i.error)throw i.error;return i.json});return o.request=r.request,o},l=function(t,e,n){Object.keys(e).forEach(function(i){n?t.append(i,e[i]):t[i]=e[i]})};t.exports={request:function(t,n){var o=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],s=arguments.length<=3||void 0===arguments[3]?function(){}:arguments[3],a=i.get("oauth_token"),c=i.get("client_id"),h={},d=e.FormData&&o instanceof FormData,f=void 0,p=void 0;return h.format="json",a?h.oauth_token=a:h.client_id=c,l(o,h,d),"GET"!==t&&(f=d?o:r.encode(o),o={oauth_token:a}),n="/"!==n[0]?"/"+n:n,p=""+i.get("baseURL")+n+"?"+r.encode(o),u(t,p,f,s)},oEmbed:function(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],n=e.element;delete e.element,e.url=t;var i="https://soundcloud.com/oembed.json?"+r.encode(e);return u("GET",i,null).then(function(t){return n&&t.html&&(n.innerHTML=t.html),t})},upload:function(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=t.asset_data||t.file,n=i.get("oauth_token")&&t.title&&e;if(!n)return new o(function(t,e){e({status:0,error_message:"oauth_token needs to be present and title and asset_data / file passed as parameters"})});var r=Object.keys(t),s=new FormData;return r.forEach(function(e){var n=t[e];"file"===e&&(e="asset_data",n=t.file),s.append("track["+e+"]",n)}),this.request("POST","/tracks",s,t.progress)},resolve:function(t){return this.request("GET","/resolve",{url:t})}}}).call(e,function(){return this}())},function(t,e){"use strict";var n={};t.exports={get:function(t){return n[t]},set:function(t,e){n[t]=e}}},function(t,e){function n(){l=!1,s.length?u=s.concat(u):c=-1,u.length&&i()}function i(){if(!l){var t=setTimeout(n);l=!0;for(var e=u.length;e;){for(s=u,u=[];++c<e;)s&&s[c].run();c=-1,e=u.length}s=null,l=!1,clearTimeout(t)}}function r(t,e){this.fun=t,this.array=e}function o(){}var s,a=t.exports={},u=[],l=!1,c=-1;a.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];u.push(new r(t,e)),1!==u.length||l||setTimeout(i,0)},r.prototype.run=function(){this.fun.apply(null,this.array)},a.title="browser",a.browser=!0,a.env={},a.argv=[],a.version="",a.versions={},a.on=o,a.addListener=o,a.once=o,a.off=o,a.removeListener=o,a.removeAllListeners=o,a.emit=o,a.binding=function(t){throw new Error("process.binding is not supported")},a.cwd=function(){return"/"},a.chdir=function(t){throw new Error("process.chdir is not supported")},a.umask=function(){return 0}},function(t,e,n){"use strict";var i=n(22);e.extract=function(t){return t.split("?")[1]||""},e.parse=function(t){return"string"!=typeof t?{}:(t=t.trim().replace(/^(\?|#|&)/,""),t?t.split("&").reduce(function(t,e){var n=e.replace(/\+/g," ").split("="),i=n.shift(),r=n.length>0?n.join("="):void 0;return i=decodeURIComponent(i),r=void 0===r?null:decodeURIComponent(r),t.hasOwnProperty(i)?Array.isArray(t[i])?t[i].push(r):t[i]=[t[i],r]:t[i]=r,t},{}):{})},e.stringify=function(t){return t?Object.keys(t).sort().map(function(e){var n=t[e];return Array.isArray(n)?n.sort().map(function(t){return i(e)+"="+i(t)}).join("&"):i(e)+"="+i(n)}).filter(function(t){return t.length>0}).join("&"):""}},function(t,e,n){"use strict";t.exports=function(){return n(25)('!function(t){function n(r){if(e[r])return e[r].exports;var a=e[r]={exports:{},id:r,loaded:!1};return t[r].call(a.exports,a,a.exports,n),a.loaded=!0,a.exports}var e={};return n.m=t,n.c=e,n.p="",n(0)}([function(t,n){(function(t){function n(t){h=t.sampleRate,v=t.numChannels,s()}function e(t){for(var n=0;v>n;n++)p[n].push(t[n]);g+=t[0].length}function r(t){for(var n=[],e=0;v>e;e++)n.push(i(p[e],g));if(2===v)var r=f(n[0],n[1]);else var r=n[0];var a=l(r),o=new Blob([a],{type:t});this.postMessage(o)}function a(){for(var t=[],n=0;v>n;n++)t.push(i(p[n],g));this.postMessage(t)}function o(){g=0,p=[],s()}function s(){for(var t=0;v>t;t++)p[t]=[]}function i(t,n){for(var e=new Float32Array(n),r=0,a=0;a<t.length;a++)e.set(t[a],r),r+=t[a].length;return e}function f(t,n){for(var e=t.length+n.length,r=new Float32Array(e),a=0,o=0;e>a;)r[a++]=t[o],r[a++]=n[o],o++;return r}function c(t,n,e){for(var r=0;r<e.length;r++,n+=2){var a=Math.max(-1,Math.min(1,e[r]));t.setInt16(n,0>a?32768*a:32767*a,!0)}}function u(t,n,e){for(var r=0;r<e.length;r++)t.setUint8(n+r,e.charCodeAt(r))}function l(t){var n=new ArrayBuffer(44+2*t.length),e=new DataView(n);return u(e,0,"RIFF"),e.setUint32(4,36+2*t.length,!0),u(e,8,"WAVE"),u(e,12,"fmt "),e.setUint32(16,16,!0),e.setUint16(20,1,!0),e.setUint16(22,v,!0),e.setUint32(24,h,!0),e.setUint32(28,4*h,!0),e.setUint16(32,2*v,!0),e.setUint16(34,16,!0),u(e,36,"data"),e.setUint32(40,2*t.length,!0),c(e,44,t),e}var h,v,g=0,p=[];t.onmessage=function(t){switch(t.data.command){case"init":n(t.data.config);break;case"record":e(t.data.buffer);break;case"exportWAV":r(t.data.type);break;case"getBuffer":a();break;case"clear":o()}}}).call(n,function(){return this}())}]);',n.p+"9f9aac32c9a7432b5555.worker.js")}},function(t,e,n){"use strict";var i=n(7),r=n(5);t.exports={notifyDialog:function(t){var e=i.parse(t.search),n=i.parse(t.hash),o={oauth_token:e.access_token||n.access_token,dialog_id:e.state||n.state,error:e.error||n.error,error_description:e.error_description||n.error_description},s=r.get(o.dialog_id);s&&s.handleConnectResponse(o)}}},function(t,e,n){"use strict";var i=n(2),r=n(12),o=n(1).Promise,s=function(t){return i.set("oauth_token",t.oauth_token),t};t.exports=function(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=i.get("oauth_token");if(e)return new o(function(t){t({oauth_token:e})});var n={client_id:t.client_id||i.get("client_id"),redirect_uri:t.redirect_uri||i.get("redirect_uri"),response_type:"code_and_token",scope:t.scope||"non-expiring",display:"popup"};if(!n.client_id||!n.redirect_uri)throw new Error("Options client_id and redirect_uri must be passed");var a=new r(n);return a.open().then(s)}},function(t,e,n){"use strict";var i=n(1).Promise;t.exports=function(){var t={};return t.promise=new i(function(e,n){t.resolve=e,t.reject=n}),t}},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=n(11),s=n(5),a=n(13),u=n(7),l="SoundCloud_Dialog",c=function(){return[l,Math.ceil(1e6*Math.random()).toString(16)].join("_")},h=function(t){return"https://soundcloud.com/connect?"+u.stringify(t)},d=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];i(this,t),this.id=c(),this.options=e,this.options.state=this.id,this.width=456,this.height=510,this.deferred=o()}return r(t,[{key:"open",value:function(){var t=h(this.options);return this.popup=a.open(t,this.width,this.height),s.set(this.id,this),this.deferred.promise}},{key:"handleConnectResponse",value:function(t){var e=t.error;e?this.deferred.reject(t):this.deferred.resolve(t),this.popup.close()}}]),t}();t.exports=d},function(t,e){"use strict";t.exports={open:function(t,e,n){var i={},r=void 0;return i.location=1,i.width=e,i.height=n,i.left=window.screenX+(window.outerWidth-e)/2,i.top=window.screenY+(window.outerHeight-n)/2,i.toolbar="no",i.scrollbars="yes",r=Object.keys(i).map(function(t){return t+"="+i[t]}).join(", "),window.open(t,i.name,r)}}},function(t,e){(function(e){"use strict";var n=e.AudioContext||e.webkitAudioContext,i=null;t.exports=function(){return i?i:i=new n}}).call(e,function(){return this}())},function(t,e){(function(e){"use strict";var n=e.navigator.getUserMedia||e.navigator.webkitGetUserMedia||e.navigator.mozGetUserMedia;t.exports=function(t,i,r){n.call(e.navigator,t,i,r)}}).call(e,function(){return this}())},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=n(14),s=n(15),a=n(1).Promise,u=n(19),l=function(){var t=this,e=this.context;return new a(function(n,i){t.source?t.source instanceof AudioNode?n(t.source):i(new Error("source needs to be an instance of AudioNode")):s({audio:!0},function(i){t.stream=i,t.source=e.createMediaStreamSource(i),n(t.source)}.bind(t),i)})},c=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];i(this,t),this.context=e.context||o(),this._recorder=null,this.source=e.source,this.stream=null}return r(t,[{key:"start",value:function(){var t=this;return l.call(this).then(function(e){return t._recorder=new u(e),t._recorder.record(),e})}},{key:"stop",value:function(){if(this._recorder&&this._recorder.stop(),this.stream)if(this.stream.stop)this.stream.stop();else if(this.stream.getTracks){var t=this.stream.getTracks()[0];t&&t.stop()}}},{key:"getBuffer",value:function(){var t=this;return new a(function(e,n){t._recorder?t._recorder.getBuffer(function(n){var i=t.context.sampleRate,r=t.context.createBuffer(2,n[0].length,i);r.getChannelData(0).set(n[0]),r.getChannelData(1).set(n[1]),e(r)}.bind(t)):n(new Error("Nothing has been recorded yet."))})}},{key:"getWAV",value:function(){var t=this;return new a(function(e,n){t._recorder?t._recorder.exportWAV(function(t){e(t)}):n(new Error("Nothing has been recorded yet."))})}},{key:"play",value:function(){var t=this;return this.getBuffer().then(function(e){var n=t.context.createBufferSource();return n.buffer=e,n.connect(t.context.destination),n.start(0),n})}},{key:"saveAs",value:function(t){return this.getWAV().then(function(e){u.forceDownload(e,t)})}},{key:"delete",value:function(){this._recorder&&(this._recorder.stop(),this._recorder.clear(),this._recorder=null),this.stream&&this.stream.stop()}}]),t}();t.exports=c},function(t,e,n){"use strict";var i=n(4),r=n(18),o=new r({flashAudioPath:"https://connect.soundcloud.com/sdk/flashAudio.swf"}),s=n(2),a=n(20);t.exports=function(t,e){var n=e?{secret_token:e}:{};return i.request("GET",t,n).then(function(t){var n=s.get("baseURL"),i=s.get("client_id"),r=n+"/tracks/"+t.id+"/streams?client_id="+i,u=n+"/tracks/"+t.id+"/plays?client_id="+i;return e&&(r+="&secret_token="+e,u+="&secret_token="+e),new a(o,{soundId:t.id,duration:t.duration,streamUrlsEndpoint:r,registerEndpoint:u})})}},function(t,e){"use strict";t.exports=function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return t[i].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}(function(t){for(var e in t)if(Object.prototype.hasOwnProperty.call(t,e))switch(typeof t[e]){case"function":break;case"object":t[e]=function(e){var n=e.slice(1),i=t[e[0]];return function(t,e,r){i.apply(this,[t,e,r].concat(n))}}(t[e]);break;default:t[e]=t[t[e]]}return t}([function(t,e,n){var i,r=n(37),o=n(22),s=n(3),a=n(1),u=n(6);t.exports=i=function(t){t=t||{},this._players={},this._volume=1,this._mute=!1,this.States=s,this.Errors=a,this._settings=r(t,i.defaults)},i.States=s,i.Errors=a,i.BrowserUtils=u,i.defaults={flashAudioPath:"flashAudio.swf",flashLoadTimeout:2e3,flashObjectID:"flashAudioObject",audioObjectID:"html5AudioObject",updateInterval:300,bufferTime:8e3,bufferingDelay:800,debug:!1},i.prototype.getAudioPlayer=function(t){return this._players[t]},i.prototype.hasAudioPlayer=function(t){return void 0!==this._players[t]},i.prototype.removeAudioPlayer=function(t){this.hasAudioPlayer(t)&&delete this._players[t]},i.prototype.setVolume=function(t){t=Math.min(1,t),this._volume=Math.max(0,t);for(var e in this._players)this._players.hasOwnProperty(e)&&this._players[e].setVolume(this._volume)},i.prototype.getVolume=function(){return this._volume},i.prototype.setMute=function(t){this._muted=t;for(var e in this._players)this._players.hasOwnProperty(e)&&this._players[e].setMute(this._muted)},i.prototype.getMute=function(){return this._muted},i.prototype.createAudioPlayer=function(t){var e,t;if(t.id||(t.id=Math.floor(1e10*Math.random()).toString()+(new Date).getTime().toString()),!t.src)throw new Error("AudioManager: You need to pass a valid media source URL");if(!this._players[t.id]){if(e=o.createAudioPlayer(t,this._settings),!e)throw new Error("AudioManager: No player could be created from the given descriptor");this._players[t.id]=e}return this._players[t.id].setVolume(this._volume),this._players[t.id].setMute(this._muted),this._players[t.id].on("stateChange",this._onStateChange,this),this._players[t.id]},i.prototype._onStateChange=function(t,e){e.getState()===s.DEAD&&this.removeAudioPlayer(e.getId())}},function(t,e){t.exports={FLASH_HLS_PLAYLIST_NOT_FOUND:"HLS_PLAYLIST_NOT_FOUND",FLASH_HLS_PLAYLIST_SECURITY_ERROR:"HLS_SECURITY_ERROR",FLASH_HLS_NOT_VALID_PLAYLIST:"HLS_NOT_VALID_PLAYLIST",FLASH_HLS_NO_TS_IN_PLAYLIST:"HLS_NO_TS_IN_PLAYLIST",FLASH_HLS_NO_PLAYLIST_IN_MANIFEST:"HLS_NO_PLAYLIST_IN_MANIFEST",FLASH_HLS_TS_IS_CORRUPT:"HLS_TS_IS_CORRUPT",FLASH_HLS_FLV_TAG_CORRUPT:"HLS_FLV_TAG_CORRUPT",FLASH_HTTP_FILE_NOT_FOUND:"HTTP_FILE_NOT_FOUND",FLASH_RTMP_CONNECT_FAILED:"RTMP_CONNECT_FAILED",FLASH_RTMP_CONNECT_CLOSED:"RTMP_CONNECT_CLOSED",FLASH_RTMP_CANNOT_PLAY_STREAM:"RTMP_CANNOT_PLAY_STREAM",FLASH_PROXY_CANT_LOAD_FLASH:"CANT_LOAD_FLASH",FLASH_PROXY_FLASH_BLOCKED:"FLASH_PROXY_FLASH_BLOCKED",HTML5_AUDIO_ABORTED:"HTML5_AUDIO_ABORTED",HTML5_AUDIO_NETWORK:"HTML5_AUDIO_NETWORK",HTML5_AUDIO_DECODE:"HTML5_AUDIO_DECODE",HTML5_AUDIO_SRC_NOT_SUPPORTED:"HTML5_AUDIO_SRC_NOT_SUPPORTED",HTML5_AUDIO_ENDED_EARLY:"HTML5_AUDIO_ENDED_EARLY",HTML5_AUDIO_OVERRUN:"HTML5_AUDIO_OVERRUN",MSE_BAD_OBJECT_STATE:"MSE_BAD_OBJECT_STATE",MSE_NOT_SUPPORTED:"MSE_NOT_SUPPORTED",MSE_MP3_NOT_SUPPORTED:"MSE_MP3_NOT_SUPPORTED",MSE_HLS_NOT_VALID_PLAYLIST:"MSE_HLS_NOT_VALID_PLAYLIST",MSE_HLS_PLAYLIST_NOT_FOUND:"MSE_HLS_PLAYLIST_NOT_FOUND",MSE_HLS_SEGMENT_NOT_FOUND:"MSE_HLS_SEGMENT_NOT_FOUND"}},function(t,e,n){function i(t,e,n){for(var i=-1,r=s(e),o=r.length;++i<o;){var a=r[i],u=t[a],l=n(u,e[a],a,t,e);(l===l?l===u:u!==u)&&(void 0!==u||a in t)||(t[a]=l)}return t}var r=n(23),o=n(25),s=n(13),a=o(function(t,e,n){return n?i(t,e,n):r(t,e)});t.exports=a},function(t,e){t.exports={PLAYING:"playing",LOADING:"loading",SEEKING:"seeking",PAUSED:"paused",ERROR:"error",IDLE:"idle",INITIALIZE:"initialize",ENDED:"ended",DEAD:"dead"}},function(t,e,n){var i=n(56),r=n(70),o=[],s=(o.push,o.slice),a=(o.splice,/\s+/),u=function d(t,e,n,i){if(!n)return!0;if("object"==typeof n)for(var r in n)t[e].apply(t,[r,n[r]].concat(i));else{if(!a.test(n))return!0;for(var o=n.split(a),s=0,d=o.length;d>s;s++)t[e].apply(t,[o[s]].concat(i))}},l=function(t,e){var n,i=-1,r=t.length;switch(e.length){case 0:for(;++i<r;)n=t[i],n.callback.call(n.ctx);return;case 1:for(;++i<r;)(n=t[i]).callback.call(n.ctx,e[0]);return;case 2:for(;++i<r;)(n=t[i]).callback.call(n.ctx,e[0],e[1]);return;case 3:for(;++i<r;)(n=t[i]).callback.call(n.ctx,e[0],e[1],e[2]);return;default:for(;++i<r;)(n=t[i]).callback.apply(n.ctx,e)}},c={on:function(t,e,n){if(!u(this,"on",t,[e,n])||!e)return this;this._events||(this._events={});var i=this._events[t]||(this._events[t]=[]);return i.push({callback:e,context:n,ctx:n||this}),this},once:function(t,e,n){if(!u(this,"once",t,[e,n])||!e)return this;var r=this,o=i(function(){r.off(t,o),e.apply(this,arguments)});return o._callback=e,this.on(t,o,n)},off:function(t,e,n){var i,r,o,s,a,l,c,h;if(!this._events||!u(this,"off",t,[e,n]))return this;if(!t&&!e&&!n)return this._events={},this;for(s=t?[t]:Object.keys(this._events),a=0,l=s.length;l>a;a++)if(t=s[a],o=this._events[t]){if(this._events[t]=i=[],e||n)for(c=0,h=o.length;h>c;c++)r=o[c],(e&&e!==r.callback&&e!==r.callback._callback||n&&n!==r.context)&&i.push(r);i.length||delete this._events[t]}return this},trigger:function(t,e){if(!this._events)return this;var e=s.call(arguments,1);if(!u(this,"trigger",t,e))return this;var n=this._events[t],i=this._events.all;return n&&l(n,e),i&&l(i,arguments),this},stopListening:function(t,e,n){var i=this._listeners;if(!i)return this;var r=!e&&!n;"object"==typeof e&&(n=this),t&&((i={})[t._listenerId]=t);for(var o in i)i[o].off(e,n,this),r&&delete this._listeners[o];return this}},h={listenTo:"on",listenToOnce:"once"};Object.keys(h).forEach(function(t){var e=h[t];c[t]=function(t,n,i){var o=this._listeners||(this._listeners={}),s=t._listenerId||(t._listenerId=r("l"));return o[s]=t,"object"==typeof n&&(i=this),t[e](n,i,this),this}}),c.bind=c.on,c.unbind=c.off,t.exports=c},function(t,e){var n;t.exports=n=function(t,e,n){this.enabled=n.debug,this.type=t,this.id=e},n.prototype.log=function(t){this.enabled&&window.console.log((new Date).toString()+" | "+this.type+" ("+this.id+"): "+t)}},function(t,e){t.exports={supportHTML5Audio:function(){var t;try{if(window.HTMLAudioElement&&"undefined"!=typeof Audio)return t=new Audio,!0}catch(e){return!1}},createAudioElement:function(){var t=document.createElement("audio");return t.setAttribute("msAudioCategory","BackgroundCapableMedia"),t.mozAudioChannelType="content",t},supportSourceSwappingWithPreload:function(){return/Firefox/i.test(navigator.userAgent)},isMobile:function(t){var e=window.navigator.userAgent,n=["mobile","iPhone","iPad","iPod","Android","Skyfire"];return n.some(function(t){return t=new RegExp(t,"i"),t.test(e)})},isIE10Mobile:function(){return/IEmobile\/10\.0/gi.test(navigator.userAgent)},canPlayType:function(t){var e=document.createElement("audio");return e&&e.canPlayType&&e.canPlayType(t).match(/maybe|probably/i)?!0:!1},isNativeHlsSupported:function(){var t,e,n,i=navigator.userAgent,r=["iPhone","iPad","iPod"];return t=function(t){return t.test(i)},e=!t(/chrome/i)&&!t(/opera/i)&&t(/safari/i),n=r.some(function(e){return t(new RegExp(e,"i"))}),n||e},isMSESupported:function(){return!(!window.MediaSource&&!window.WebKitMediaSource)},isMSESupportMPEG:function(){var t=window.MediaSource||window.WebKitMediaSource;return t?t.isTypeSupported("audio/mpeg"):!1}}},function(t,e,n){var i,r=n(2),o=n(11).bindAll,s=n(4),a=n(3),u=n(1),l=n(5),c=n(6),h=.3;t.exports=i=function(t,e){this._id=t.id,this._descriptor=t,this._isLoaded=!1,this._settings=e,this._bufferingTimeout=null,this._currentPosition=0,this._loadedPosition=0,this._prevCurrentPosition=0,this._prevCheckTime=0,this._positionUpdateTimer=0,this._playRequested=!1,this._startFromPosition=0,this._waitingToPause=!1,t.duration&&(this._duration=t.duration),this._bindHandlers(),this._init(),this._toggleEventListeners(!0),this._descriptor.preload&&this._preload(),t.autoPlay?this.play():this._setState(a.IDLE)},r(i.prototype,s),i.MediaAPIEvents=["ended","play","playing","pause","seeking","waiting","seeked","error","loadeddata","loadedmetadata"],i.prototype.getId=function(){return this._id},i.prototype.getType=function(){return"HTML5 audio"},i.prototype.play=function(t){return this._isInOneOfStates(a.ERROR,a.DEAD)?void this._logger.log("play called but state is ERROR or DEAD"):this._isInOneOfStates(a.PAUSED,a.ENDED)?void this.resume():(this._logger.log("play"),this._startFromPosition=t||0,this._setState(a.LOADING),this._playRequested=!0,void(this._isLoaded?this._playAfterLoaded():(this._preload(),this.once("loaded",this._playAfterLoaded))))},i.prototype.pause=function(){this._playRequested=!1,this._isInOneOfStates(a.ERROR,a.DEAD)||(this._logger.log("pause"),this._waitingToPause=!0,this._html5Audio.pause(),clearTimeout(this._bufferingTimeout),clearInterval(this._positionUpdateTimer))},i.prototype.seek=function(t){var e,n=!1,i=t/1e3,r=this._html5Audio.seekable;if(!this._isInOneOfStates(a.ERROR,a.DEAD)){if(!this._isLoaded)return void this.once("loaded",function(){this.seek(t)});if(c.isIE10Mobile)n=!0;else for(e=0;e<r.length;e++)if(i<=r.end(e)&&i>=r.start(e)){n=!0;break}n&&(this._logger.log("seek"),this._setState(a.SEEKING),this._html5Audio.currentTime=i,this._currentPosition=t,this._clearBufferingTimeout())}},i.prototype.resume=function(){return this._isInOneOfStates(a.ERROR,a.DEAD)?void this._logger.log("resume called but state is ERROR or DEAD"):(this._logger.log("resume"),this.getState()===a.PAUSED?(this._setState(a.LOADING),this._html5Audio.play(this._html5Audio.currentTime)):this.getState()===a.ENDED&&(this._setState(a.LOADING),this._html5Audio.play(0)),void(this._positionUpdateTimer=setInterval(this._onPositionChange,this._settings.updateInterval)))},i.prototype.setVolume=function(t){this._html5Audio&&(this._html5Audio.volume=t)},i.prototype.getVolume=function(){return this._html5Audio?this._html5Audio.volume:1},i.prototype.setMute=function(t){this._html5Audio&&(this._html5Audio.muted=t)},i.prototype.getMute=function(){return this._html5Audio?this._html5Audio.muted:!1},i.prototype.getState=function(){return this._state},i.prototype.getCurrentPosition=function(){return this._currentPosition},i.prototype.getLoadedPosition=function(){return this._loadedPosition},i.prototype.getDuration=function(){return this._duration},i.prototype.kill=function(){this._state!==a.DEAD&&(clearInterval(this._positionUpdateTimer),clearTimeout(this._bufferingTimeout),this._playRequested=!1,this._toggleEventListeners(!1),this._html5Audio.pause(),delete this._html5Audio,this._setState(a.DEAD))},i.prototype.getErrorMessage=function(){return this._errorMessage},i.prototype.getErrorID=function(){return this._errorID},i.prototype._bindHandlers=function(){o(this,["_onPositionChange","_onHtml5AudioStateChange","_onLoaded","_onLoadedMetadata","_onBuffering"])},i.prototype._init=function(){this._html5Audio=c.createAudioElement(),this._html5Audio.id=this._settings.audioObjectID+"_"+this._descriptor.id,this._html5Audio.preload="none",this._logger=new l(this.getType(),this._id,this._settings)},i.prototype._preload=function(){"auto"!==this._html5Audio.preload&&(this._logger.log("setting up preload"),this._html5Audio.preload="auto",this._html5Audio.type=this._descriptor.mimeType,this._html5Audio.src=this._descriptor.src,this._html5Audio.load())},i.prototype._playAfterLoaded=function(){this._playRequested&&(this._trySeekToStartPosition(),this._html5Audio.play(),this._positionUpdateTimer=setInterval(this._onPositionChange,this._settings.updateInterval))},i.prototype._setState=function(t){this._state!==t&&(this._logger.log('state changed "'+t+'"'),this._logger.log("currentPosition = "+this._currentPosition+", loadedPosition = "+this._loadedPosition),this._state=t,this.trigger("stateChange",t,this))},i.prototype._isInOneOfStates=function(){for(var t in arguments)if(arguments[t]===this._state)return!0;return!1},i.prototype._toggleEventListeners=function(t){if(this._html5Audio){var e=t?"addEventListener":"removeEventListener";i.MediaAPIEvents.forEach(function(t){switch(t){case"loadeddata":this._html5Audio[e]("loadeddata",this._onLoaded);break;case"loadedmetadata":this._html5Audio[e]("loadedmetadata",this._onLoadedMetadata);break;case"timeupdate":default:this._html5Audio[e](t,this._onHtml5AudioStateChange)}},this)}},i.prototype._trySeekToStartPosition=function(){var t;return this._startFromPosition>0&&(this._logger.log("seek to start position="+this._startFromPosition),t=this._startFromPosition/1e3,this._html5Audio.currentTime=t,this._html5Audio.currentTime===t)?(this._currentPosition=this._startFromPosition,this._startFromPosition=0,!0):!1},i.prototype._onBuffering=function(){this._isInOneOfStates(a.PAUSED,a.LOADING)||(this._logger.log("buffering detection timeout"),
	this._setState(a.LOADING))},i.prototype._onLoaded=function(t){this._logger.log('html5 audio event (loaded handler) "'+t.type+'"'),(void 0===this._duration||0===this._duration)&&(this._duration=1e3*this._html5Audio.duration),this._loadedPosition=this._duration,this._isLoaded=!0,this.trigger("loaded",this)},i.prototype._onLoadedMetadata=function(t){this._logger.log('html5 audio event (loadedmetadata handler) "'+t.type+'"'),this.trigger("loadedmetadata",this)},i.prototype._clearBufferingTimeout=function(){clearTimeout(this._bufferingTimeout),this._bufferingTimeout=null},i.prototype._onPositionChange=function(t){var e,n,i,r=Date.now();if(this._currentPosition=1e3*this._html5Audio.currentTime,this.trigger("positionChange",this.getCurrentPosition(),this._loadedPosition,this._duration,this),e=this._currentPosition-this._prevCurrentPosition,!this._isInOneOfStates(a.PLAYING,a.LOADING))return void(this._state===a.SEEKING&&e>0&&this._setState(a.PLAYING));if(0!==this._duration&&(this._currentPosition>this._duration||this._currentPosition>this._loadedPosition&&!c.isIE10Mobile)&&this._onHtml5AudioStateChange({type:"ended"}),this._settings.bufferingDelay>=0){if(n=r-this._prevCheckTime,0===n)return;i=e/n,i>1-h?(this._clearBufferingTimeout(),this.getState()!==a.PLAYING&&this._setState(a.PLAYING)):this._waitingToPause||this._state!==a.PLAYING||null!=this._bufferingTimeout||(this._bufferingTimeout=setTimeout(this._onBuffering,this._settings.bufferingDelay))}this._prevCurrentPosition=this._currentPosition,this._prevCheckTime=r},i.prototype._onHtml5AudioStateChange=function(t){switch(this._logger.log('html5 audio event (state change handler) "'+t.type+'"'),this._waitingToPause=!1,this._clearBufferingTimeout(),t.type){case"playing":if(this._trySeekToStartPosition())return;this._setState(a.PLAYING),this._onPositionChange(t);break;case"pause":this._onPositionChange(t),this._setState(a.PAUSED);break;case"ended":this._currentPosition=this._loadedPosition=this._duration,this.trigger("positionChange",this.getCurrentPosition(),this._loadedPosition,this._duration,this),clearInterval(this._positionUpdateTimer),this._setState(a.ENDED);break;case"waiting":if(this.getState()===a.SEEKING)break;this._setState(a.LOADING);break;case"seeking":this._setState(a.SEEKING);break;case"seeked":this._html5Audio.paused?this._setState(a.PAUSED):this._setState(a.PLAYING),this._onPositionChange(t);break;case"error":this._error(this._html5AudioErrorCodeToErrorId(),!0)}},i.prototype._html5AudioErrorCodeToErrorId=function(){return{1:u.HTML5_AUDIO_ABORTED,2:u.HTML5_AUDIO_NETWORK,3:u.HTML5_AUDIO_DECODE,4:u.HTML5_AUDIO_SRC_NOT_SUPPORTED}[this._html5Audio.error.code]},i.prototype._error=function(t,e){var n="error: ";e&&(n="error (native): "),this._errorID=t,this._errorMessage=this._getErrorMessage(this._errorID),this._logger.log(n+this._errorID+" "+this._errorMessage),this._setState(a.ERROR),this._toggleEventListeners(!1)},i.prototype._getErrorMessage=function(t){var e={};return e[u.HTML5_AUDIO_ABORTED]="The fetching process was aborted by the user.",e[u.HTML5_AUDIO_NETWORK]="A network connection lost.",e[u.HTML5_AUDIO_DECODE]="An error occurred while decoding the media resource.",e[u.HTML5_AUDIO_SRC_NOT_SUPPORTED]="The media resource is not suitable.",e[u.HTML5_AUDIO_ENDED_EARLY]="Audio playback ended before the indicated duration of the track.",e[u.HTML5_AUDIO_OVERRUN]="Audio playback continued past end of the track.",e[t]}},function(t,e){function n(t){return!!t&&"object"==typeof t}function i(t,e){var n=null==t?void 0:t[e];return a(n)?n:void 0}function r(t){return"number"==typeof t&&t>-1&&t%1==0&&m>=t}function o(t){return s(t)&&p.call(t)==l}function s(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function a(t){return null==t?!1:o(t)?_.test(d.call(t)):n(t)&&c.test(t)}var u="[object Array]",l="[object Function]",c=/^\[object .+?Constructor\]$/,h=Object.prototype,d=Function.prototype.toString,f=h.hasOwnProperty,p=h.toString,_=RegExp("^"+d.call(f).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),g=i(Array,"isArray"),m=9007199254740991,y=g||function(t){return n(t)&&r(t.length)&&p.call(t)==u};t.exports=y},function(t,e,n){var i,r=n(2),o=n(1),s=(n(4),n(7)),a=(n(5),n(3)),u=1;t.exports=i=function(t,e){s.apply(this,arguments),this._seekPosition=0},r(i.prototype,s.prototype),i.prototype.getType=function(){return"HTML5 HLS audio"},i.prototype.seek=function(t){s.prototype.seek.apply(this,arguments),this._isInOneOfStates(a.LOADING,a.SEEKING)&&(this._seekPosition=t)},i.prototype.getCurrentPosition=function(){if(this._isInOneOfStates(a.LOADING)&&this._seekPosition>0)return this._seekPosition;if(this._isInOneOfStates(a.PLAYING,a.SEEKING)){if(this._seekPosition>=this._currentPosition)return this._seekPosition;this._seekPosition=0}return s.prototype.getCurrentPosition.apply(this,arguments)},i.prototype._onStateChange=function(t){switch(this._logger.log('hls html5 audio event "'+t.type+'"'),clearTimeout(this._bufferingTimeout),t.type){case"playing":if(this._trySeekToStartPosition())return;this.updatePositions(),this._setState(a.PLAYING);break;case"pause":this._setState(a.PAUSED);break;case"ended":if(this._currentPosition+u<this._duration){this._errorID=o.HTML5_AUDIO_ENDED_EARLY,this._errorMessage=this._getErrorMessage(this._errorID),this._logger.log("hls html5 audio error: "+this._errorID+" "+this._errorMessage),this._setState(a.ERROR),this.toggleEventListeners(!1);break}this._currentPosition=this._loadedPosition=this._duration,this.trigger("positionChange",this._currentPosition,this._loadedPosition,this._duration,this),this._setState(a.ENDED),clearInterval(this._positionUpdateTimer);break;case"waiting":if(this.getState()===a.SEEKING)break;this._setState(a.LOADING);break;case"seeking":this._setState(a.SEEKING);break;case"seeked":this.updatePositions(),this._html5Audio.paused&&this._setState(a.PAUSED);break;case"error":this._errorID={1:o.HTML5_AUDIO_ABORTED,2:o.HTML5_AUDIO_NETWORK,3:o.HTML5_AUDIO_DECODE,4:o.HTML5_AUDIO_SRC_NOT_SUPPORTED}[this._html5Audio.error.code],this._errorMessage=this._getErrorMessage(this._errorID),this._logger.log("hls html5 audio error: "+this._errorID+" "+this._errorMessage),this._setState(a.ERROR),this.toggleEventListeners(!1)}}},function(t,e,n){var i,r=n(2),o=n(6),s=(n(1),n(4),n(7)),a=n(5),u=n(3),l={};t.exports=i=function(t,e){s.apply(this,arguments)},r(i.prototype,s.prototype),i._pauseOthersAndForwardEvent=function(t,e){var n=l[i._html5Audio._playerId];Object.keys(l).forEach(function(t){var e=l[t];e!==n&&e.pause()}),n&&n[t](e)},i.prototype._init=function(){if(!i._html5Audio){var t=o.createAudioElement();t.id=this._settings.audioObjectID+"_Single",t.preload="none",i._html5Audio=t,this._preloadAudio=t,this._addGlobalListeners()}this._html5Audio=i._html5Audio,this._playRequested=!1,this._logger=new a(this.getType(),this._id,this._settings)},i.prototype._toggleEventListeners=function(t){t?l[this._id]=this:delete l[this._id]},i.prototype._addGlobalListeners=function(){s.MediaAPIEvents.forEach(function(t){switch(t){case"loadeddata":i._html5Audio.addEventListener("loadeddata",i._pauseOthersAndForwardEvent.bind(null,"_onLoaded"));break;case"loadedmetadata":i._html5Audio.addEventListener("loadedmetadata",i._pauseOthersAndForwardEvent.bind(null,"_onLoadedMetadata"));break;default:i._html5Audio.addEventListener(t,i._pauseOthersAndForwardEvent.bind(null,"_onHtml5AudioStateChange"))}})},i.prototype.getType=function(){return"HTML5 single audio"},i.prototype.play=function(t){if(this._playRequested=!0,this._html5Audio._playerId===this._descriptor.id&&this._isInOneOfStates(u.PAUSED,u.ENDED))return void s.prototype.resume.apply(this,arguments);this._isInOneOfStates(u.PAUSED)&&(t=this._currentPosition),this._startFromPosition=t||0,this._html5Audio._playerId=this._descriptor.id,this._toggleEventListeners(!0),this._setState(u.LOADING);var e=function(){this._playRequested&&(this._logger.log("play after loaded"),this._trySeekToStartPosition(),this._html5Audio.play(),clearInterval(this._positionUpdateTimer),this._positionUpdateTimer=setInterval(this._onPositionChange,this._settings.updateInterval))};this._html5Audio.readyState>0&&this._descriptor.src===this._html5Audio.src?e.apply(this):(this.once("loaded",e),this._html5Audio.type=this._descriptor.mimeType,this._html5Audio.src=this._descriptor.src,this._html5Audio.preload="auto",this._html5Audio.load())},i.prototype.pause=function(){this._playRequested=!1,this._isInOneOfStates(u.ERROR,u.DEAD)||(this._logger.log("pause"),this._html5Audio._playerId===this._descriptor.id?this._html5Audio.pause():(this._toggleEventListeners(!1),this._isInOneOfStates(u.PAUSED)||this._setState(u.PAUSED)),clearTimeout(this._bufferingTimeout),clearInterval(this._positionUpdateTimer))},i.prototype.seek=function(t){return this._html5Audio._playerId!==this._descriptor.id?(this._currentPosition=t,void this.trigger("positionChange",this._currentPosition,this._loadedPosition,this._duration,this)):void s.prototype.seek.apply(this,arguments)},i.prototype.kill=function(){this._state!==u.DEAD&&(this._playRequested=!1,clearInterval(this._positionUpdateTimer),clearTimeout(this._bufferingTimeout),this._toggleEventListeners(!1),this._setState(u.DEAD))},i.prototype.resume=function(){return this._isInOneOfStates(u.ERROR,u.DEAD)?void 0:this._html5Audio._playerId!==this._descriptor.id?void this.play(this._currentPosition):void s.prototype.resume.apply(this,arguments)},i.prototype.preload=function(){!this._preloadAudio&&o.supportSourceSwappingWithPreload()&&(this._preloadAudio=new Audio,this._preloadAudio.preload="none");var t=this._preloadAudio;t&&"auto"!==t.preload&&(this._logger.log("preload"),t.preload="auto",t._playerId=this._id,t.type=this._descriptor.mimeType,t.src=this._descriptor.src,t.load())}},function(t,e){t.exports={bindAll:function(t,e){e.forEach(function(e){t[e]=t[e].bind(t)})}}},function(t,e){function n(){if(!$&&document.getElementsByTagName("body")[0]){try{var t,e=v("span");e.style.display="none",t=j.getElementsByTagName("body")[0].appendChild(e),t.parentNode.removeChild(t),t=null,e=null}catch(n){return}$=!0;for(var i=V.length,r=0;i>r;r++)V[r]()}}function i(t){$?t():V[V.length]=t}function r(t){if(typeof B.addEventListener!=R)B.addEventListener("load",t,!1);else if(typeof j.addEventListener!=R)j.addEventListener("load",t,!1);else if(typeof B.attachEvent!=R)E(B,"onload",t);else if("function"==typeof B.onload){var e=B.onload;B.onload=function(){e(),t()}}else B.onload=t}function o(){var t=j.getElementsByTagName("body")[0],e=v(x);e.setAttribute("style","visibility: hidden;"),e.setAttribute("type",U);var n=t.appendChild(e);if(n){var i=0;!function r(){if(typeof n.GetVariable!=R)try{var o=n.GetVariable("$version");o&&(o=o.split(" ")[1].split(","),J.pv=[A(o[0]),A(o[1]),A(o[2])])}catch(a){J.pv=[8,0,0]}else if(10>i)return i++,void setTimeout(r,10);t.removeChild(e),n=null,s()}()}else s()}function s(){var t=K.length;if(t>0)for(var e=0;t>e;e++){var n=K[e].id,i=K[e].callbackFn,r={success:!1,id:n};if(J.pv[0]>0){var o=y(n);if(o)if(!S(K[e].swfVersion)||J.wk&&J.wk<312)if(K[e].expressInstall&&u()){var s={};s.data=K[e].expressInstall,s.width=o.getAttribute("width")||"0",s.height=o.getAttribute("height")||"0",o.getAttribute("class")&&(s.styleclass=o.getAttribute("class")),o.getAttribute("align")&&(s.align=o.getAttribute("align"));for(var h={},d=o.getElementsByTagName("param"),f=d.length,p=0;f>p;p++)"movie"!=d[p].getAttribute("name").toLowerCase()&&(h[d[p].getAttribute("name")]=d[p].getAttribute("value"));l(s,h,n,i)}else c(o),i&&i(r);else b(n,!0),i&&(r.success=!0,r.ref=a(n),r.id=n,i(r))}else if(b(n,!0),i){var _=a(n);_&&typeof _.SetVariable!=R&&(r.success=!0,r.ref=_,r.id=_.id),i(r)}}}function a(t){var e=null,n=y(t);return n&&"OBJECT"===n.nodeName.toUpperCase()&&(e=typeof n.SetVariable!==R?n:n.getElementsByTagName(x)[0]||n),e}function u(){return!X&&S("6.0.65")&&(J.win||J.mac)&&!(J.wk&&J.wk<312)}function l(t,e,n,i){var r=y(n);if(n=m(n),X=!0,I=i||null,D={success:!1,id:n},r){"OBJECT"==r.nodeName.toUpperCase()?(L=h(r),O=null):(L=r,O=n),t.id=F,(typeof t.width==R||!/%$/.test(t.width)&&A(t.width)<310)&&(t.width="310"),(typeof t.height==R||!/%$/.test(t.height)&&A(t.height)<137)&&(t.height="137");var o=J.ie?"ActiveX":"PlugIn",s="MMredirectURL="+encodeURIComponent(B.location.toString().replace(/&/g,"%26"))+"&MMplayerType="+o+"&MMdoctitle="+encodeURIComponent(j.title.slice(0,47)+" - Flash Player Installation");if(typeof e.flashvars!=R?e.flashvars+="&"+s:e.flashvars=s,J.ie&&4!=r.readyState){var a=v("div");n+="SWFObjectNew",a.setAttribute("id",n),r.parentNode.insertBefore(a,r),r.style.display="none",_(r)}f(t,e,n)}}function c(t){if(J.ie&&4!=t.readyState){t.style.display="none";var e=v("div");t.parentNode.insertBefore(e,t),e.parentNode.replaceChild(h(t),e),_(t)}else t.parentNode.replaceChild(h(t),t)}function h(t){var e=v("div");if(J.win&&J.ie)e.innerHTML=t.innerHTML;else{var n=t.getElementsByTagName(x)[0];if(n){var i=n.childNodes;if(i)for(var r=i.length,o=0;r>o;o++)1==i[o].nodeType&&"PARAM"==i[o].nodeName||8==i[o].nodeType||e.appendChild(i[o].cloneNode(!0))}}return e}function d(t,e){var n=v("div");return n.innerHTML="<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'><param name='movie' value='"+t+"'>"+e+"</object>",n.firstChild}function f(t,e,n){var i,r=y(n);if(n=m(n),J.wk&&J.wk<312)return i;if(r){var o,s,a,u=v(J.ie?"div":x);typeof t.id==R&&(t.id=n);for(a in e)e.hasOwnProperty(a)&&"movie"!==a.toLowerCase()&&p(u,a,e[a]);J.ie&&(u=d(t.data,u.innerHTML));for(o in t)t.hasOwnProperty(o)&&(s=o.toLowerCase(),"styleclass"===s?u.setAttribute("class",t[o]):"classid"!==s&&"data"!==s&&u.setAttribute(o,t[o]));J.ie?W[W.length]=t.id:(u.setAttribute("type",U),u.setAttribute("data",t.data)),r.parentNode.replaceChild(u,r),i=u}return i}function p(t,e,n){var i=v("param");i.setAttribute("name",e),i.setAttribute("value",n),t.appendChild(i)}function _(t){var e=y(t);e&&"OBJECT"==e.nodeName.toUpperCase()&&(J.ie?(e.style.display="none",function n(){if(4==e.readyState){for(var t in e)"function"==typeof e[t]&&(e[t]=null);e.parentNode.removeChild(e)}else setTimeout(n,10)}()):e.parentNode.removeChild(e))}function g(t){return t&&t.nodeType&&1===t.nodeType}function m(t){return g(t)?t.id:t}function y(t){if(g(t))return t;var e=null;try{e=j.getElementById(t)}catch(n){}return e}function v(t){return j.createElement(t)}function A(t){return parseInt(t,10)}function E(t,e,n){t.attachEvent(e,n),q[q.length]=[t,e,n]}function S(t){t+="";var e=J.pv,n=t.split(".");return n[0]=A(n[0]),n[1]=A(n[1])||0,n[2]=A(n[2])||0,e[0]>n[0]||e[0]==n[0]&&e[1]>n[1]||e[0]==n[0]&&e[1]==n[1]&&e[2]>=n[2]?!0:!1}function T(t,e,n,i){var r=j.getElementsByTagName("head")[0];if(r){var o="string"==typeof n?n:"screen";if(i&&(M=null,k=null),!M||k!=o){var s=v("style");s.setAttribute("type","text/css"),s.setAttribute("media",o),M=r.appendChild(s),J.ie&&typeof j.styleSheets!=R&&j.styleSheets.length>0&&(M=j.styleSheets[j.styleSheets.length-1]),k=o}M&&(typeof M.addRule!=R?M.addRule(t,e):typeof j.createTextNode!=R&&M.appendChild(j.createTextNode(t+" {"+e+"}")))}}function b(t,e){if(z){var n=e?"visible":"hidden",i=y(t);$&&i?i.style.visibility=n:"string"==typeof t&&T("#"+t,"visibility:"+n)}}function w(t){var e=/[\\\"<>\.;]/,n=null!=e.exec(t);return n&&typeof encodeURIComponent!=R?encodeURIComponent(t):t}/*!    SWFObject v2.3.20130521 <http://github.com/swfobject/swfobject>
		   is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
		   */
	var P,L,O,I,D,M,k,R="undefined",x="object",N="Shockwave Flash",C="ShockwaveFlash.ShockwaveFlash",U="application/x-shockwave-flash",F="SWFObjectExprInst",H="onreadystatechange",B=window,j=document,G=navigator,Y=!1,V=[],K=[],W=[],q=[],$=!1,X=!1,z=!0,Q=!1,J=function(){var t=typeof j.getElementById!=R&&typeof j.getElementsByTagName!=R&&typeof j.createElement!=R,e=G.userAgent.toLowerCase(),n=G.platform.toLowerCase(),i=n?/win/.test(n):/win/.test(e),r=n?/mac/.test(n):/mac/.test(e),o=/webkit/.test(e)?parseFloat(e.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):!1,s="Microsoft Internet Explorer"===G.appName,a=[0,0,0],u=null;if(typeof G.plugins!=R&&typeof G.plugins[N]==x)u=G.plugins[N].description,u&&typeof G.mimeTypes!=R&&G.mimeTypes[U]&&G.mimeTypes[U].enabledPlugin&&(Y=!0,s=!1,u=u.replace(/^.*\s+(\S+\s+\S+$)/,"$1"),a[0]=A(u.replace(/^(.*)\..*$/,"$1")),a[1]=A(u.replace(/^.*\.(.*)\s.*$/,"$1")),a[2]=/[a-zA-Z]/.test(u)?A(u.replace(/^.*[a-zA-Z]+(.*)$/,"$1")):0);else if(typeof B.ActiveXObject!=R)try{var l=new ActiveXObject(C);l&&(u=l.GetVariable("$version"),u&&(s=!0,u=u.split(" ")[1].split(","),a=[A(u[0]),A(u[1]),A(u[2])]))}catch(c){}return{w3:t,pv:a,wk:o,ie:s,win:i,mac:r}}();!function(){J.w3&&((typeof j.readyState!=R&&("complete"===j.readyState||"interactive"===j.readyState)||typeof j.readyState==R&&(j.getElementsByTagName("body")[0]||j.body))&&n(),$||(typeof j.addEventListener!=R&&j.addEventListener("DOMContentLoaded",n,!1),J.ie&&(j.attachEvent(H,function t(){"complete"==j.readyState&&(j.detachEvent(H,t),n())}),B==top&&!function e(){if(!$){try{j.documentElement.doScroll("left")}catch(t){return void setTimeout(e,0)}n()}}()),J.wk&&!function i(){return $?void 0:/loaded|complete/.test(j.readyState)?void n():void setTimeout(i,0)}()))}(),V[0]=function(){Y?o():s()},function(){J.ie&&window.attachEvent("onunload",function(){for(var t=q.length,e=0;t>e;e++)q[e][0].detachEvent(q[e][1],q[e][2]);for(var n=W.length,i=0;n>i;i++)_(W[i]);for(var r in J)J[r]=null;J=null;for(var o in P)P[o]=null;P=null})}(),t.exports=P={registerObject:function(t,e,n,i){if(J.w3&&t&&e){var r={};r.id=t,r.swfVersion=e,r.expressInstall=n,r.callbackFn=i,K[K.length]=r,b(t,!1)}else i&&i({success:!1,id:t})},getObjectById:function(t){return J.w3?a(t):void 0},embedSWF:function(t,e,n,r,o,s,a,c,h,d){var p=m(e),_={success:!1,id:p};J.w3&&!(J.wk&&J.wk<312)&&t&&e&&n&&r&&o?(b(p,!1),i(function(){n+="",r+="";var i={};if(h&&typeof h===x)for(var g in h)i[g]=h[g];i.data=t,i.width=n,i.height=r;var m={};if(c&&typeof c===x)for(var y in c)m[y]=c[y];if(a&&typeof a===x)for(var v in a)if(a.hasOwnProperty(v)){var A=Q?encodeURIComponent(v):v,E=Q?encodeURIComponent(a[v]):a[v];typeof m.flashvars!=R?m.flashvars+="&"+A+"="+E:m.flashvars=A+"="+E}if(S(o)){var T=f(i,m,e);i.id==p&&b(p,!0),_.success=!0,_.ref=T,_.id=T.id}else{if(s&&u())return i.data=s,void l(i,m,e,d);b(p,!0)}d&&d(_)})):d&&d(_)},switchOffAutoHideShow:function(){z=!1},enableUriEncoding:function(t){Q=typeof t===R?!0:t},ua:J,getFlashPlayerVersion:function(){return{major:J.pv[0],minor:J.pv[1],release:J.pv[2]}},hasFlashPlayerVersion:S,createSWF:function(t,e,n){return J.w3?f(t,e,n):void 0},showExpressInstall:function(t,e,n,i){J.w3&&u()&&l(t,e,n,i)},removeSWF:function(t){J.w3&&_(t)},createCSS:function(t,e,n,i){J.w3&&T(t,e,n,i)},addDomLoadEvent:i,addLoadEvent:r,getQueryParamValue:function(t){var e=j.location.search||j.location.hash;if(e){if(/\?/.test(e)&&(e=e.split("?")[1]),null==t)return w(e);for(var n=e.split("&"),i=0;i<n.length;i++)if(n[i].substring(0,n[i].indexOf("="))==t)return w(n[i].substring(n[i].indexOf("=")+1))}return""},expressInstallCallback:function(){if(X){var t=y(F);t&&L&&(t.parentNode.replaceChild(L,t),O&&(b(O,!0),J.ie&&(L.style.display="block")),I&&I(D)),X=!1}},version:"2.3"}},[78,29,30,31],function(t,e){function n(t,e){for(var n=-1,r=t.length,o=-1,s=[];++n<r;)t[n]===e&&(t[n]=i,s[++o]=n);return s}var i="__lodash_placeholder__";t.exports=n},8,function(t,e,n){var i,r=n(6),o=n(17),s=n(9),a=n(20),u=n(7),l=n(21),c=n(10),h=n(19);n(12),t.exports=i=function(){},i.createAudioPlayer=function(t,e){var n,d;if(n=t.src.split(":")[0],"rtmp"!==n&&"rtmpt"!==n&&!t.forceFlash||t.forceHTML5)if(t.mimeType=i.getMimeType(t),t.mimeType===l.M3U8)d=r.isNativeHlsSupported()&&!t.forceCustomHLS?r.isMobile()||t.forceSingle?new a(t,e):new s(t,e):r.isMSESupported()&&r.isMSESupportMPEG()?new h(t,e):new o(t,e);else if(r.supportHTML5Audio()&&r.canPlayType(t.mimeType)||t.forceHTML5)d=r.isMobile()||t.forceSingle?new c(t,e):new u(t,e);else{if(t.mimeType!==l.MPEG)return null;d=new o(t,e)}else d=new o(t,e);return d},i.getMimeType=function(t){if(t.mimeType)return t.mimeType;var e=t.src.split("?")[0];return e=e.substring(e.lastIndexOf(".")+1,e.length),l.getTypeByExtension(e)}},function(t,e,n){var i,r=n(2),o=n(46),s=n(72),a=n(1),u=n(4),l=n(5),c=n(3),h=n(12);t.exports=i=function(t,e){this._descriptor=t,this._id=t.id,this._autoPlay=t.autoPlay||!1,i.players[t.id]=this,this._errorMessage=null,this._errorID=null,this._state=c.INITIALIZE,this._settings=e,this._volume=1,this._muted=!1,this._logger=new l(this.getType(),this._id,e),i.creatingFlashAudio||(i.flashAudio?this._createFlashAudio():i.createFlashObject(e))},i.createFlashObject=function(t){i.creatingFlashAudio=!0,i.containerElement=document.createElement("div"),i.containerElement.setAttribute("id",t.flashObjectID+"-container"),i.flashElementTarget=document.createElement("div"),i.flashElementTarget.setAttribute("id",t.flashObjectID+"-target"),i.containerElement.appendChild(i.flashElementTarget),document.body.appendChild(i.containerElement);var e=function(e){if(e.success)i.flashAudio=document.getElementById(t.flashObjectID),setTimeout(function(){if(i.flashAudio&&!("PercentLoaded"in i.flashAudio))for(var t in i.players)i.players.hasOwnProperty(t)&&(i.players[t]._errorID=a.FLASH_PROXY_FLASH_BLOCKED,i.players[t]._errorMessage="Flash object blocked",i.players[t]._setState(c.ERROR),i.players[t]._logger.type=i.players[t].getType(),i.players[t]._logger.log(i.players[t]._errorMessage))},t.flashLoadTimeout),i.flashAudio.triggerEvent=function(t,e){i.players[t]._triggerEvent(e)},i.flashAudio.onPositionChange=function(t,e,n,r){i.players[t]._onPositionChange(e,n,r)},i.flashAudio.onDebug=function(t,e,n){i.players[t]._logger.type=e,i.players[t]._logger.log(n)},i.flashAudio.onStateChange=function(t,e){i.players[t]._setState(e),e===c.DEAD&&delete i.players[t]},i.flashAudio.onInit=function(t){i.creatingFlashAudio=!1,o(s(i.players),"_createFlashAudio")};else for(var n in i.players)i.players.hasOwnProperty(n)&&(i.players[n]._errorID=a.FLASH_PROXY_CANT_LOAD_FLASH,i.players[n]._errorMessage="Cannot create flash object",i.players[n]._setState(c.ERROR))};document.getElementById(t.flashObjectID)||h.embedSWF(t.flashAudioPath,t.flashObjectID+"-target","1","1","9.0.24","",{json:encodeURIComponent(JSON.stringify(t))},{allowscriptaccess:"always"},{id:t.flashObjectID,tabIndex:"-1"},e)},i._ready=function(){return i.flashAudio&&!i.creatingFlashAudio},r(i.prototype,u),i.players={},i.prototype._createFlashAudio=function(){i.flashAudio.createAudio(this._descriptor),this._state=i.flashAudio.getState(this._id),this.setVolume(this._volume),this.setMute(this._muted),this._autoPlay&&this.play()},i.prototype._triggerEvent=function(t){this._logger.log("Flash element triggered event: "+t),this.trigger(t,this)},i.prototype._setState=function(t){this._state!==t&&(this._state=t,this.trigger("stateChange",t,this))},i.prototype._onPositionChange=function(t,e,n){this.trigger("positionChange",t,e,n,this)},i.prototype.getId=function(){return this._id},i.prototype.getType=function(){return i._ready()?i.flashAudio.getType(this._id):"Flash ..."},i.prototype.getContainerElement=function(){return i.containerElement},i.prototype.play=function(t){if(i._ready()){if(this.getState()===c.PAUSED)return void this.resume();t=void 0===t?0:t,i.flashAudio.playAudio(this._id,t)}},i.prototype.pause=function(){i._ready()&&i.flashAudio.pauseAudio(this._id)},i.prototype.seek=function(t){i._ready()&&i.flashAudio.seekAudio(this._id,t)},i.prototype.resume=function(){i._ready()&&i.flashAudio.resumeAudio(this._id)},i.prototype.setVolume=function(t){this._volume=t,i._ready()&&i.flashAudio.setVolume(this._id,t)},i.prototype.getVolume=function(){return i._ready()?i.flashAudio.getVolume(this._id):this._volume},i.prototype.setMute=function(t){this._muted=t,i._ready()&&i.flashAudio.setMute(this._id,t)},i.prototype.getMute=function(){return i._ready()?i.flashAudio.getMute(this._id):this._muted},i.prototype.getState=function(){return this._state},i.prototype.getCurrentPosition=function(){return i._ready()?i.flashAudio.getCurrentPosition(this._id):0},i.prototype.getLoadedPosition=function(){return i._ready()?i.flashAudio.getLoadedPosition(this._id):0},i.prototype.getDuration=function(){return i._ready()?i.flashAudio.getDuration(this._id):0},i.prototype.kill=function(){return i._ready()?void i.flashAudio.killAudio(this._id):0},i.prototype.getErrorMessage=function(){return this._errorMessage?this._errorMessage:i.flashAudio.getErrorMessage(this._id)},i.prototype.getErrorID=function(){return this._errorID?this._errorID:i.flashAudio.getErrorID(this._id)},i.prototype.getLevelNum=function(){return i._ready()?i.flashAudio.getLevelNum(this._id):0},i.prototype.getLevel=function(){return i._ready()?i.flashAudio.getLevel(this._id):0},i.prototype.setLevel=function(t){return i._ready()?i.flashAudio.setLevel(this._id,t):0},i.prototype.preload=function(){return!1}},function(t,e,n){var i,r=n(2),o=n(32),s=n(39),a=null,u=n(4),l=n(1),c={NEW:0,REQUESTED:1,COMPLETE:2,FAILED:400},h={FIRST:"#EXTM3U",PLAYLIST:"#EXT-X-STREAM-INF:",SEGMENT:"#EXTINF:",END_TAG:"#EXT-X-ENDLIST",ENCRYPTION:"#EXT-X-KEY:"};t.exports=i=function(t,e){var n;this._descriptor=t,this._logger=e,n=t.src,n.indexOf("?")>-1&&(n=n.substr(0,n.indexOf("?"))),this._baseURI=n.substr(0,n.lastIndexOf("/")+1)},r(i.prototype,u),i.Segment=function(t,e,n,i){r(this,{uri:t,startPosition:e,endPosition:e+n,duration:n,index:i,data:null,status:c.NEW})},i.Segment.prototype.containsTime=function(t){return t>=this.startPosition&&t<=this.endPosition},i.prototype.updatePlaylist=function(){var t=new XMLHttpRequest;t.open("GET",this._descriptor.src,!0),t.responseType="text",t.send(),this._logger.log("Downloading playlist"),t.onload=o(function(e){return 200!==t.status?void this.trigger("playlist_failed",l.MSE_HLS_PLAYLIST_NOT_FOUND):(this._segments=[],this._parsePlaylist(t.responseText),void(this._segments.length>0?(this._logger.log("Playlist download complete"),this._retrieveEncryptionKey(function(){this.trigger("playlist_complete",this._segments)})):this.trigger("playlist_failed",l.MSE_HLS_NOT_VALID_PLAYLIST)))},this),t.onerror=o(function(t){this.trigger("playlist_failed",l.MSE_HLS_PLAYLIST_NOT_FOUND)},this)},i.prototype._parsePlaylist=function(t){var e,n,r,o=t.split("\n"),s=0,a=0;for(this._duration=0;s<o.length;)e=o[s++],0===e.indexOf(h.SEGMENT)?(r=1e3*Number(e.substr(8,e.indexOf(",")-8)),n=this._createSegmentURL(o[s]),this._appendSegment(new i.Segment(n,this._duration,r,a++)),s++):0===e.indexOf(h.ENCRYPTION)&&this._parsePlaylistEncryptionHeader(e)},i.prototype._appendSegment=function(t){this._segments.push(t),this._duration+=t.duration},i.prototype._parsePlaylistEncryptionHeader=function(t){var e,n,i,r=t.substr(h.ENCRYPTION.length).split(",");if(s(r,function(t){t.indexOf("METHOD")>=0?n=t.split("=")[1]:t.indexOf("URI")>=0?e=t.split("=")[1]:t.indexOf("IV")>=0&&(i=t.split("=")[1])}),!(n&&e&&n.length&&e.length))throw new Error("Failed to parse M3U8 encryption header");n=n.trim(),e=e.trim().replace(/"/g,""),this._encryptionMethod=n,this._encryptionKeyUri=e,i&&i.length?(this._encryptionIvHexString=i.trim(),this._parseEncryptionIvHexString()):this._encryptionIv=null},i.prototype._parseEncryptionIvHexString=function(){var t,e=this._encryptionIvHexString.replace("0x",""),n=new Uint16Array(8),i=0;if(e.length%4!==0)throw new Error("Failed to parse M3U8 encryption IV (length is not multiple of 4)");for(;i<e.length;i+=4){if(t=parseInt(e.substr(i,4),16),isNaN(t))throw new Error("Failed to parse hex number in IV string");n[i/4]=t}this._encryptionIv=n},i.prototype._encryptionIvForSegment=function(t){var e=new DataView(new ArrayBuffer(16));return e.setUint32(0,t.index,!0),e.buffer},i.prototype._retrieveEncryptionKey=function(t){if(t){if(!this._encryptionKeyUri)return void t.call(this);var e=this._encryptionKeyUri,n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="arraybuffer",n.onload=o(function(i){200===n.status?this._encryptionKey=new Uint8Array(n.response):this._logger.log("Failed to retrieve encryption key from "+e+", returned status "+n.status),t.call(this)},this),n.send(),this._logger.log("Downloading encryption key from "+e)}},i.prototype._removeEncryptionPaddingBytes=function(t){var e=t.data[t.data.byteLength-1];e?(this._logger.log("Detected PKCS7 padding length of "+e+" bytes, slicing segment."),t.data=t.data.subarray(0,t.data.byteLength-e)):this._logger.log("No padding detected (last byte is zero)")},i.prototype.decryptSegmentAES128=function(t){if(this._logger.log("Decrypting AES-128 cyphered segment ..."),!a)throw new Error("AES decryption not built-in");var e,n=a.cipher.createDecipher("AES-CBC",a.util.createBuffer(this._encryptionKey)),i=0,r=t.data.byteLength;for(e=this._encryptionIv?this._encryptionIv:this._encryptionIvForSegment(t),this._logger.log("Using IV ->"),n.start({iv:a.util.createBuffer(e)}),n.update(a.util.createBuffer(t.data)),n.finish(),t.data=new Uint8Array(r);r>i;i++)t.data[i]=n.output.getByte();this._removeEncryptionPaddingBytes(t)},i.prototype.isAES128Encrypted=function(){return"AES-128"===this._encryptionMethod},i.prototype.getEncryptionKeyUri=function(){return this._encryptionKeyUri},i.prototype.getEncryptionIv=function(){return this._encryptionIv},i.prototype.getEncryptionKey=function(){return this._encryptionKey},i.prototype.getSegmentIndexForTime=function(t){var e,n;if(t>this._duration||0>t||!this._segments||0===this._segments.length)return-1;for(e=Math.floor(this._segments.length*(t/this._duration)),n=this._segments[e];!(n.startPosition<=t&&n.startPosition+n.duration>t);)n.startPosition+n.duration>=t?e--:e++,n=this._segments[e];return e},i.prototype.getSegmentForTime=function(t){var e=this.getSegmentIndexForTime(t);return e>=0?this._segments[e]:null},i.prototype._createSegmentURL=function(t){return"http://"===t.substr(0,7)||"https://"===t.substr(0,8)||"/"===t.substr(0,1)?t:this._baseURI+t},i.prototype.loadSegment=function(t){var e,n,i;i=this._segments[t],i.status!==c.REQUESTED&&i.status!==c.COMPLETE&&(n=i.uri,e=new XMLHttpRequest,e.open("GET",n,!0),e.responseType="arraybuffer",e.send(),this._logger.log("Downloading segment "+t+" from "+n),i.downloadStartTime=Date.now(),i.status=c.REQUESTED,e.onload=o(function(n){return 200!==e.status?(this.trigger("segment_failed",l.MSE_HLS_SEGMENT_NOT_FOUND),void(i.status=c.FAILED)):(this._logger.log("Download of segment "+t+" complete"),i.data=new Uint8Array(e.response),i.downloadTime=Date.now()-i.downloadStartTime,i.status=c.COMPLETE,void this.trigger("segment_complete",i))},this),e.onerror=o(function(t){i.status=c.FAILED,this.trigger("segment_failed",l.MSE_HLS_SEGMENT_NOT_FOUND)},this))},i.prototype.getSegment=function(t){return this._segments&&this._segments[t]?this._segments[t]:null},i.prototype.getDuration=function(){return this._duration?this._duration:0},i.prototype.getNumSegments=function(){return this._segments.length}},function(t,e,n){var i,r=n(2),o=n(11).bindAll,s=n(6),a=(n(4),n(1)),u=n(5),l=n(7),c=n(18),h=n(3);t.exports=i=function(t,e){var n;return this._id=t.id,this._descriptor=t,this._isPlaylistLoaded=!1,this._settings=r(e,{}),this._currentPositionInternal=0,this._loadedPosition=0,this._startFromPosition=0,this._sourceBufferPtsOffset=0,this._state=h.INITIALIZE,this._minPreBufferLengthForPlayback=5e3,this._maxBufferLength=3e4,this._segmentsDownloading=[],this._segmentsAwaitingAppendance=[],this._lastSegmentRequested=null,this._isBufferPrepared=!1,this._html5Audio=s.createAudioElement(),this._logger=new u(this.getType(),this._id,this._settings),(n=window.MediaSource||window.WebKitMediaSource)?(this._bindHandlers(),o(this,["_onPositionChange","_onPlaylistLoaded","_onMSEInit","_onMSEDispose","_onSegmentLoaded","_onLoadedMetadata","_onSourceBufferUpdate","_onSourceBufferUpdateLastSegment","_checkForNextSegmentToLoad"]),this._toggleEventListeners(!0),this._setState(h.INITIALIZE),this._isNotReady=!0,this._sourceBuffer=null,this._mediaSource=new n,this._mediaSource.addEventListener("sourceopen",this._onMSEInit,!1),this._mediaSource.addEventListener("webkitsourceopen",this._onMSEInit,!1),this._mediaSource.addEventListener("sourceended",this._onMSEDispose,!1),this._mediaSource.addEventListener("sourceclose",this._onMSEDispose,!1),this._html5Audio.src=window.URL.createObjectURL(this._mediaSource),this._hls_toolkit=new c(t,this._logger),this._hls_toolkit.on("segment_complete",this._onSegmentLoaded),void(this._loadOnInit=!1)):void this._error(a.MSE_NOT_SUPPORTED)},r(i.prototype,l.prototype),i.prototype._onMSEInit=function(){return this._logger.log("source open handler"),this._isNotReady=!1,this._mediaSource.removeEventListener("sourceopen",this._onMSEInit,!1),this._mediaSource.removeEventListener("webkitsourceopen",this._onMSEInit,!1),this._sourceBuffer=this._mediaSource.addSourceBuffer("audio/mpeg"),this._descriptor.duration&&(this._setDuration(this._descriptor.duration),this._logger.log("duration set from descriptor metadata to "+this._duration)),this._sourceBuffer.addEventListener("update",this._onSourceBufferUpdate),this._setState(h.IDLE),this._descriptor.preload&&this._preload(),this._descriptor.autoPlay?void this.play():void(this._loadOnInit&&this._loadInitialPlaylist())},i.prototype._onMSEDispose=function(){this._logger.log("source dispose handler"),this._mediaSource.removeEventListener("sourceended",this._onMSEDispose,!1),this._mediaSource.removeEventListener("sourceclose",this._onMSEDispose,!1),this._isNotReady=!0},i.prototype.getType=function(){return"HLS MSE audio"},i.prototype.play=function(t){return this._isInOneOfStates(h.PAUSED,h.SEEKING,h.ENDED)?void this.resume():this._isInOneOfStates(h.IDLE,h.INITIALIZE)?(this._logger.log("play"),this._currentPositionInternal=this._startFromPosition=t||0,clearInterval(this._positionUpdateTimer),this._positionUpdateTimer=setInterval(this._onPositionChange,this._settings.updateInterval),this._isNotReady?void(this._loadOnInit=!0):void this._loadInitialPlaylist()):void 0},i.prototype._loadInitialPlaylist=function(){this._isInOneOfStates(h.LOADING)||(this._setState(h.LOADING),this._hls_toolkit.once("playlist_complete",this._onPlaylistLoaded),this._hls_toolkit.updatePlaylist())},i.prototype._inspectEncryptionData=function(){this._hls_toolkit.isAES128Encrypted()&&(this._logger.log("got key of byte length "+this._hls_toolkit.getEncryptionKey().byteLength),this._hls_toolkit.getEncryptionIv()?this._logger.log("got IV of byte length "+this._hls_toolkit.getEncryptionIv().byteLength):this._logger.log("no IV found in header, will use per-segment-index IV"))},i.prototype._onLoadedMetadata=function(){this._logger.log("HTML5 loadedmetadata event handler")},i.prototype._onPlaylistLoaded=function(){return this._logger.log("playlist loaded handler"),this._isNotReady?void this._logger.log("we have been disposed while loading the playlist, noop"):(this._isPlaylistLoaded=!0,this._inspectEncryptionData(),this._setDuration(this._hls_toolkit.getDuration()),this._logger.log("duration set from playlist info to "+this._duration),this.trigger("loadedmetadata",this),void this._requestSegment(this._hls_toolkit.getSegmentForTime(this._startFromPosition)))},i.prototype._setDuration=function(t){this._duration=t;try{this._mediaSource.duration=this._duration/1e3}catch(e){this._logger.log("MediaSource API error: "+e.message),this._error(a.MSE_BAD_OBJECT_STATE),this.kill()}},i.prototype._onSegmentLoaded=function(t){return this._isNotReady?void this._logger.log("we have been disposed while loading a segment, noop"):void this._appendSegments()},i.prototype._appendSegments=function(){var t=!0;this._segmentsDownloading.slice().forEach(function(e){e.data&&t?(this._segmentsDownloading.shift(),this._decryptSegment(e),this._appendNextSegment(e)):t=!1},this)},i.prototype._appendNextSegment=function(t){return this._logger.log("Trying to append ..."),this._tryAppendNextSegment(t)?(t.endPosition===this._duration&&(this._logger.log("Appended the very last segment"),this._sourceBuffer.addEventListener("update",this._onSourceBufferUpdateLastSegment)),this._state===h.LOADING&&this._isTimeBuffered(this._currentPositionInternal+this._minPreBufferLengthForPlayback)&&(this._logger.log("Triggering playback after appending enough segments"),this._html5Audio.play()),void this._checkForNextSegmentToLoad()):(this._error(a.MSE_BAD_OBJECT_STATE),void this.kill())},i.prototype._decryptSegment=function(t){this._hls_toolkit.isAES128Encrypted()&&this._hls_toolkit.decryptSegmentAES128(t)},i.prototype._tryAppendNextSegment=function(t){try{return this._sourceBuffer.updating?(this._logger.log("Source buffer is busy updating already, enqueuing data for later appending"),this._segmentsAwaitingAppendance.unshift(t),!0):(this._logger.log("Source buffer is ready to take data, lets append now"),t.index>0&&!this._isBufferPrepared&&t.containsTime(this._startFromPosition)?(this._prepareBuffer(t),!0):(this._logger.log("Appending data now"),this._sourceBuffer.timestampOffset=t.startPosition/1e3,this._sourceBuffer.appendBuffer(t.data),!0))}catch(e){return this._logger.log("Was trying to append but seems like SourceBuffer is not in valid state anymore, dropping segment data (error: "+e.message+")"),!1}this._logger.log("Appended segment "+t.index)},i.prototype._onSourceBufferUpdateLastSegment=function(){return this._sourceBuffer.updating?void this._logger.log("SourceBuffer still updating"):(this._sourceBuffer.removeEventListener("update",this._onSourceBufferUpdateLastSegment),void this._mediaSource.endOfStream())},i.prototype._onSourceBufferUpdate=function(){this.trigger("loadeddata",this),this._segmentsAwaitingAppendance.length&&this._appendNextSegment(this._segmentsAwaitingAppendance.pop())},i.prototype._prepareBufferUpdate=function(t){try{if(this._sourceBuffer.updating)return void this._logger.log("SourceBuffer still updating");if(this._sourceBuffer.timestampOffset<t.startPosition)return this._sourceBuffer.timestampOffset=this._prepareBufferUpdatePts,this._sourceBuffer.appendBuffer(t.data),this._prepareBufferUpdatePts+=t.duration,void this._logger.log("Appended dummy fill data to buffer in media-interval: "+this._sourceBuffer.timestampOffset+" - "+this._prepareBufferUpdatePts);this._isBufferPrepared=!0,this._sourceBuffer.removeEventListener("update",this._prepareBufferUpdate),this._logger.log("Will append initial segment "+t.index+" now"),this._appendNextSegment(t)}catch(e){this._logger.log("SourceBuffer might be in invalid state (could not prepare it correctly). Error: "+e.message)}},i.prototype._prepareBuffer=function(t){this._logger.log("Preparing buffer for non-zero timestamp offset ..."),this._prepareBufferUpdatePts=0,this._prepareBufferUpdate=this._prepareBufferUpdate.bind(this,t),this._sourceBuffer.addEventListener("update",this._prepareBufferUpdate),this._prepareBufferUpdate(t)},i.prototype.pause=function(){l.prototype.pause.call(this)},i.prototype.seek=function(t){if(this._html5Audio.seekable,!this._isInOneOfStates(h.ERROR,h.DEAD)){if(!this._isPlaylistLoaded)return void this.once("loadedmetadata",function(){this.seek(t)});if(t>this._duration)return void this._logger.log("can not seek to position over duration");this._logger.log("seek to "+t+" ms"),this._setState(h.SEEKING),this._requestSegment(this._hls_toolkit.getSegmentForTime(t)),this._html5Audio.currentTime=t/1e3,this._currentPosition=this._currentPositionInternal=t,this._checkForNextSegmentToLoad()}},i.prototype.resume=function(){l.prototype.resume.call(this)},i.prototype.kill=function(){l.prototype.kill.call(this)},i.prototype._checkForNextSegmentToLoad=function(){var t,e,n,i=this._currentPosition+this._maxBufferLength;if(this._logger.log("checking if we can download next segment"),!this._lastSegmentRequested||this._lastSegmentRequested.endPosition<i){do{if(e=this._lastSegmentRequested?this._lastSegmentRequested.index+1:0,t=this._hls_toolkit.getSegment(e),!t)break;this._logger.log("will try to request segment "+e),this._requestSegment(t)}while(t.endPosition<i)}else n=this._lastSegmentRequested.duration,this._logger.log("not necessary to request more data yet, scheduling next check in "+n+" ms"),clearTimeout(this._nextCheckTimeout),this._nextCheckTimeout=setTimeout(this._checkForNextSegmentToLoad,n)},i.prototype._requestSegment=function(t){return this._lastSegmentRequested=t,this._segmentsDownloading.push(t),t.data?(this._logger.log("requested data is already loaded"),void this._onSegmentLoaded(t)):void this._hls_toolkit.loadSegment(t.index)},i.prototype._onPositionChange=function(t){l.prototype._onPositionChange.apply(this,arguments),this._lastSegmentRequested||this._checkForNextSegmentToLoad()},i.prototype._onBuffering=function(){this._logger.log("buffering detection timeout"),this.getState()!==h.PAUSED&&this._setState(h.LOADING)},i.prototype._getErrorMessage=function(t){var e={};return e[a.MSE_NOT_SUPPORTED]="The browsed does not support Media Source Extensions yet",e[a.MSE_HLS_NOT_VALID_PLAYLIST]="Playlist is invalid",e[a.MSE_HLS_SEGMENT_NOT_FOUND]="Failed to load media segment",e[a.MSE_HLS_PLAYLIST_NOT_FOUND]="Failed to load HLS playlist",e[a.MSE_MP3_NOT_SUPPORTED]="Browser does not support MPEG streams in Media Source Extension",e[t]?e[t]:l.prototype._getErrorMessage.apply(this,arguments)},i.prototype._isTimeBuffered=function(t){var e,n=this._html5Audio?this._html5Audio.buffered:[];for(t/=1e3,e=0;e<n.length;e++)if(t<n.end(e)&&t>=n.start(e))return!0;return this._logger.log("requested data is already buffered"),!1}},function(t,e,n){var i,r=n(2),o=n(58),s=(n(1),n(4),n(9)),a=(n(5),n(10)),u=n(3);t.exports=i=function(t,e){a.apply(this,arguments)},r(i.prototype,a.prototype),r(i.prototype,o(s.prototype,"_seekPosition","getCurrentPosition","_onStateChange")),i.prototype.seek=function(t){a.prototype.seek.apply(this,arguments),this._isInOneOfStates(u.LOADING,u.SEEKING)&&(this._seekPosition=t)},i.prototype.getType=function(){return"HTML5 HLS single audio"}},function(t,e){t.exports={AAC:"audio/aac",M3U8:"application/x-mpegURL",MP4:"audio/mp4",MPEG:"audio/mpeg",OGG:"audio/ogg",WAV:"audio/wav",WEBM:"audio/webm",getTypeByExtension:function(t){var e={mp1:this.MPEG,mp2:this.MPEG,mp3:this.MPEG,mpeg:this.MPEG,mpg:this.MPEG,aac:this.AAC,mp4:this.MP4,ogg:this.OGG,oga:this.OGG,opus:this.OGG,webm:this.WEBM,wav:this.WAV,m3u8:this.M3U8};return e[t]||null}}},function(t,e,n){t.exports=n(16)},function(t,e,n){function i(t,e){return null==e?t:r(e,o(e),t)}var r=n(24),o=n(13);t.exports=i},function(t,e){function n(t,e,n){n||(n={});for(var i=-1,r=e.length;++i<r;){var o=e[i];n[o]=t[o]}return n}t.exports=n},function(t,e,n){function i(t){return s(function(e,n){var i=-1,s=null==e?0:n.length,a=s>2?n[s-2]:void 0,u=s>2?n[2]:void 0,l=s>1?n[s-1]:void 0;for("function"==typeof a?(a=r(a,l,5),s-=2):(a="function"==typeof l?l:void 0,s-=a?1:0),u&&o(n[0],n[1],u)&&(a=3>s?void 0:a,s=1);++i<s;){var c=n[i];c&&t(e,c,a)}return e})}var r=n(26),o=n(27),s=n(28);t.exports=i},function(t,e){function n(t,e,n){if("function"!=typeof t)return i;if(void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 3:return function(n,i,r){return t.call(e,n,i,r)};case 4:return function(n,i,r,o){return t.call(e,n,i,r,o)};case 5:return function(n,i,r,o,s){return t.call(e,n,i,r,o,s)}}return function(){return t.apply(e,arguments)}}function i(t){return t}t.exports=n},function(t,e){function n(t){return function(e){return null==e?void 0:e[t]}}function i(t){return null!=t&&s(c(t))}function r(t,e){return t="number"==typeof t||u.test(t)?+t:-1,e=null==e?l:e,t>-1&&t%1==0&&e>t}function o(t,e,n){if(!a(n))return!1;var o=typeof e;if("number"==o?i(n)&&r(e,n.length):"string"==o&&e in n){var s=n[e];return t===t?t===s:s!==s}return!1}function s(t){return"number"==typeof t&&t>-1&&t%1==0&&l>=t}function a(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}var u=/^\d+$/,l=9007199254740991,c=n("length");t.exports=o},function(t,e){function n(t,e){if("function"!=typeof t)throw new TypeError(i);return e=r(void 0===e?t.length-1:+e||0,0),function(){for(var n=arguments,i=-1,o=r(n.length-e,0),s=Array(o);++i<o;)s[i]=n[e+i];switch(e){case 0:return t.call(this,s);case 1:return t.call(this,n[0],s);case 2:return t.call(this,n[0],n[1],s)}var a=Array(e+1);for(i=-1;++i<e;)a[i]=n[i];return a[e]=s,t.apply(this,a)}}var i="Expected a function",r=Math.max;t.exports=n},function(t,e){function n(t){return!!t&&"object"==typeof t}function i(t,e){var n=null==t?void 0:t[e];return s(n)?n:void 0}function r(t){return o(t)&&d.call(t)==a}function o(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function s(t){return null==t?!1:r(t)?f.test(c.call(t)):n(t)&&u.test(t)}var a="[object Function]",u=/^\[object .+?Constructor\]$/,l=Object.prototype,c=Function.prototype.toString,h=l.hasOwnProperty,d=l.toString,f=RegExp("^"+c.call(h).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");t.exports=i},function(t,e){function n(t){return!!t&&"object"==typeof t}function i(t){return function(e){return null==e?void 0:e[t]}}function r(t){return null!=t&&o(h(t))}function o(t){return"number"==typeof t&&t>-1&&t%1==0&&c>=t}function s(t){return n(t)&&r(t)&&u.call(t,"callee")&&!l.call(t,"callee")}var a=Object.prototype,u=a.hasOwnProperty,l=a.propertyIsEnumerable,c=9007199254740991,h=i("length");t.exports=s},8,function(t,e,n){var i=n(33),r=n(14),o=n(36),s=1,a=32,u=o(function(t,e,n){var o=s;if(n.length){var l=r(n,u.placeholder);o|=a}return i(t,o,e,n,l)});u.placeholder={},t.exports=u},function(t,e,n){(function(e){function i(t,e,n){for(var i=n.length,r=-1,o=P(t.length-i,0),s=-1,a=e.length,u=Array(a+o);++s<a;)u[s]=e[s];for(;++r<i;)u[n[r]]=t[r];for(;o--;)u[s++]=t[r++];return u}function r(t,e,n){for(var i=-1,r=n.length,o=-1,s=P(t.length-r,0),a=-1,u=e.length,l=Array(s+u);++o<s;)l[o]=t[o];for(var c=o;++a<u;)l[c+a]=e[a];for(;++i<r;)l[c+n[i]]=t[o++];return l}function o(t,n){function i(){var o=this&&this!==e&&this instanceof i?r:t;return o.apply(n,arguments)}var r=s(t);return i}function s(t){return function(){var e=arguments;switch(e.length){case 0:return new t;case 1:return new t(e[0]);case 2:return new t(e[0],e[1]);case 3:return new t(e[0],e[1],e[2]);case 4:return new t(e[0],e[1],e[2],e[3]);case 5:return new t(e[0],e[1],e[2],e[3],e[4]);case 6:return new t(e[0],e[1],e[2],e[3],e[4],e[5]);case 7:return new t(e[0],e[1],e[2],e[3],e[4],e[5],e[6])}var n=p(t.prototype),i=t.apply(n,e);return d(i)?i:n}}function a(t,n,o,u,l,c,d,p,b,w){function L(){for(var y=arguments.length,v=y,A=Array(y);v--;)A[v]=arguments[v];if(u&&(A=i(A,u,l)),c&&(A=r(A,c,d)),M||R){var T=L.placeholder,N=_(A,T);if(y-=N.length,w>y){var C=p?f(p):void 0,U=P(w-y,0),F=M?N:void 0,H=M?void 0:N,B=M?A:void 0,j=M?void 0:A;n|=M?E:S,n&=~(M?S:E),k||(n&=~(g|m));var G=a(t,n,o,B,F,j,H,C,b,U);return G.placeholder=T,G}}var Y=I?o:this,V=D?Y[t]:t;return p&&(A=h(A,p)),O&&b<A.length&&(A.length=b),this&&this!==e&&this instanceof L&&(V=x||s(t)),V.apply(Y,A)}var O=n&T,I=n&g,D=n&m,M=n&v,k=n&y,R=n&A,x=D?void 0:s(t);return L}function u(t,n,i,r){function o(){for(var n=-1,s=arguments.length,l=-1,c=r.length,h=Array(c+s);++l<c;)h[l]=r[l];for(;s--;)h[l++]=arguments[++n];var d=this&&this!==e&&this instanceof o?u:t;return d.apply(a?i:this,h)}var a=n&g,u=s(t);return o}function l(t,e,n,i,r,s,l,c){var h=e&m;if(!h&&"function"!=typeof t)throw new TypeError(b);var d=i?i.length:0;if(d||(e&=~(E|S),i=r=void 0),d-=r?r.length:0,e&S){var f=i,p=r;i=r=void 0}var _=[t,e,n,i,r,f,p,s,l,c];if(_[9]=null==c?h?0:t.length:P(c-d,0)||0,e==g)var y=o(_[0],_[2]);else y=e!=E&&e!=(g|E)||_[4].length?a.apply(void 0,_):u.apply(void 0,_);
	return y}function c(t,e){return t="number"==typeof t||w.test(t)?+t:-1,e=null==e?O:e,t>-1&&t%1==0&&e>t}function h(t,e){for(var n=t.length,i=L(e.length,n),r=f(t);i--;){var o=e[i];t[i]=c(o,n)?r[o]:void 0}return t}function d(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}var f=n(34),p=n(35),_=n(14),g=1,m=2,y=4,v=8,A=16,E=32,S=64,T=128,b="Expected a function",w=/^\d+$/,P=Math.max,L=Math.min,O=9007199254740991;t.exports=l}).call(e,function(){return this}())},function(t,e){function n(t,e){var n=-1,i=t.length;for(e||(e=Array(i));++n<i;)e[n]=t[n];return e}t.exports=n},function(t,e){function n(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}var i=function(){function t(){}return function(e){if(n(e)){t.prototype=e;var i=new t;t.prototype=void 0}return i||{}}}();t.exports=i},28,function(t,e,n){function i(t,e){return void 0===t?e:t}function r(t,e){return s(function(n){var i=n[0];return null==i?i:(n.push(e),t.apply(void 0,n))})}var o=n(2),s=n(38),a=r(o,i);t.exports=a},28,function(t,e,n){function i(t,e){return function(n,i,r){return"function"==typeof i&&void 0===r&&a(n)?t(n,i):e(n,s(i,r,3))}}var r=n(40),o=n(41),s=n(45),a=n(15),u=i(r,o);t.exports=u},function(t,e){function n(t,e){for(var n=-1,i=t.length;++n<i&&e(t[n],n,t)!==!1;);return t}t.exports=n},[79,42],[78,43,44,15],29,30,26,function(t,e,n){function i(t){return function(e){return null==e?void 0:e[t]}}function r(t){return null!=t&&s(g(t))}function o(t,e){var n=typeof t;if("string"==n&&p.test(t)||"number"==n)return!0;if(h(t))return!1;var i=!f.test(t);return i||null!=e&&t in a(e)}function s(t){return"number"==typeof t&&t>-1&&t%1==0&&_>=t}function a(t){return u(t)?t:Object(t)}function u(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}var l=n(47),c=n(51),h=n(8),d=n(55),f=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,p=/^\w*$/,_=9007199254740991,g=i("length"),m=d(function(t,e,n){var i=-1,s="function"==typeof e,a=o(e),u=r(t)?Array(t.length):[];return l(t,function(t){var r=s?e:a&&null!=t?t[e]:void 0;u[++i]=r?r.apply(t,n):c(t,e,n)}),u});t.exports=m},[79,48],[78,49,50,8],29,30,function(t,e,n){function i(t,e,n){null==t||r(e,t)||(e=c(e),t=1==e.length?t:u(t,l(e,0,-1)),e=s(e));var i=null==t?t:t[e];return null==i?void 0:i.apply(t,n)}function r(t,e){var n=typeof t;if("string"==n&&f.test(t)||"number"==n)return!0;if(h(t))return!1;var i=!d.test(t);return i||null!=e&&t in o(e)}function o(t){return a(t)?t:Object(t)}function s(t){var e=t?t.length:0;return e?t[e-1]:void 0}function a(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}var u=n(52),l=n(53),c=n(54),h=n(8),d=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,f=/^\w*$/;t.exports=i},function(t,e){function n(t,e,n){if(null!=t){void 0!==n&&n in i(t)&&(e=[n]);for(var r=0,o=e.length;null!=t&&o>r;)t=t[e[r++]];return r&&r==o?t:void 0}}function i(t){return r(t)?t:Object(t)}function r(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}t.exports=n},function(t,e){function n(t,e,n){var i=-1,r=t.length;e=null==e?0:+e||0,0>e&&(e=-e>r?0:r+e),n=void 0===n||n>r?r:+n||0,0>n&&(n+=r),r=e>n?0:n-e>>>0,e>>>=0;for(var o=Array(r);++i<r;)o[i]=t[i+e];return o}t.exports=n},function(t,e,n){function i(t){return null==t?"":t+""}function r(t){if(o(t))return t;var e=[];return i(t).replace(s,function(t,n,i,r){e.push(i?r.replace(a,"$1"):n||t)}),e}var o=n(8),s=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,a=/\\(\\)?/g;t.exports=r},28,function(t,e,n){function i(t){return r(2,t)}var r=n(57);t.exports=i},function(t,e){function n(t,e){var n;if("function"!=typeof e){if("function"!=typeof t)throw new TypeError(i);var r=t;t=e,e=r}return function(){return--t>0&&(n=e.apply(this,arguments)),1>=t&&(e=void 0),n}}var i="Expected a function";t.exports=n},function(t,e,n){var i=n(59),r=n(62),o=n(63),s=n(64),a=n(69),u=a(function(t,e){return null==t?{}:"function"==typeof e[0]?s(t,r(e[0],e[1],3)):o(t,i(e))});t.exports=u},function(t,e,n){function i(t){return!!t&&"object"==typeof t}function r(t,e){for(var n=-1,i=e.length,r=t.length;++n<i;)t[r+n]=e[n];return t}function o(t,e,n,s){s||(s=[]);for(var u=-1,h=t.length;++u<h;){var d=t[u];i(d)&&a(d)&&(n||c(d)||l(d))?e?o(d,e,n,s):r(s,d):n||(s[s.length]=d)}return s}function s(t){return function(e){return null==e?void 0:e[t]}}function a(t){return null!=t&&u(d(t))}function u(t){return"number"==typeof t&&t>-1&&t%1==0&&h>=t}var l=n(60),c=n(61),h=9007199254740991,d=s("length");t.exports=o},30,8,26,function(t,e){function n(t,e){t=i(t);for(var n=-1,r=e.length,o={};++n<r;){var s=e[n];s in t&&(o[s]=t[s])}return o}function i(t){return r(t)?t:Object(t)}function r(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}t.exports=n},function(t,e,n){function i(t,e){return o(t,e,s)}function r(t,e){var n={};return i(t,function(t,i,r){e(t,i,r)&&(n[i]=t)}),n}var o=n(65),s=n(66);t.exports=r},function(t,e){function n(t){return function(e,n,r){for(var o=i(e),s=r(e),a=s.length,u=t?a:-1;t?u--:++u<a;){var l=s[u];if(n(o[l],l,o)===!1)break}return e}}function i(t){return r(t)?t:Object(t)}function r(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}var o=n();t.exports=o},function(t,e,n){function i(t,e){return t="number"==typeof t||l.test(t)?+t:-1,e=null==e?d:e,t>-1&&t%1==0&&e>t}function r(t){return"number"==typeof t&&t>-1&&t%1==0&&d>=t}function o(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function s(t){if(null==t)return[];o(t)||(t=Object(t));var e=t.length;e=e&&r(e)&&(u(t)||a(t))&&e||0;for(var n=t.constructor,s=-1,l="function"==typeof n&&n.prototype===t,c=Array(e),d=e>0;++s<e;)c[s]=s+"";for(var f in t)d&&i(f,e)||"constructor"==f&&(l||!h.call(t,f))||c.push(f);return c}var a=n(67),u=n(68),l=/^\d+$/,c=Object.prototype,h=c.hasOwnProperty,d=9007199254740991;t.exports=s},30,8,28,function(t,e,n){function i(t){var e=++o;return r(t)+e}var r=n(71),o=0;t.exports=i},function(t,e){function n(t){return null==t?"":t+""}t.exports=n},function(t,e,n){function i(t){return r(t,o(t))}var r=n(73),o=n(74);t.exports=i},function(t,e){function n(t,e){for(var n=-1,i=e.length,r=Array(i);++n<i;)r[n]=t[e[n]];return r}t.exports=n},[78,75,76,77],29,30,8,function(t,e,n,i,r,o){function s(t){return function(e){return null==e?void 0:e[t]}}function a(t){return null!=t&&l(E(t))}function u(t,e){return t="number"==typeof t||g.test(t)?+t:-1,e=null==e?A:e,t>-1&&t%1==0&&e>t}function l(t){return"number"==typeof t&&t>-1&&t%1==0&&A>=t}function c(t){for(var e=d(t),n=e.length,i=n&&t.length,r=!!i&&l(i)&&(_(t)||p(t)),o=-1,s=[];++o<n;){var a=e[o];(r&&u(a,i)||y.call(t,a))&&s.push(a)}return s}function h(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function d(t){if(null==t)return[];h(t)||(t=Object(t));var e=t.length;e=e&&l(e)&&(_(t)||p(t))&&e||0;for(var n=t.constructor,i=-1,r="function"==typeof n&&n.prototype===t,o=Array(e),s=e>0;++i<e;)o[i]=i+"";for(var a in t)s&&u(a,e)||"constructor"==a&&(r||!y.call(t,a))||o.push(a);return o}var f=n(i),p=n(r),_=n(o),g=/^\d+$/,m=Object.prototype,y=m.hasOwnProperty,v=f(Object,"keys"),A=9007199254740991,E=s("length"),S=v?function(t){var e=null==t?void 0:t.constructor;return"function"==typeof e&&e.prototype===t||"function"!=typeof t&&a(t)?c(t):h(t)?v(t):[]}:c;t.exports=S},function(t,e,n,i){function r(t,e){return p(t,e,h)}function o(t){return function(e){return null==e?void 0:e[t]}}function s(t,e){return function(n,i){var r=n?_(n):0;if(!u(r))return t(n,i);for(var o=e?r:-1,s=l(n);(e?o--:++o<r)&&i(s[o],o,s)!==!1;);return n}}function a(t){return function(e,n,i){for(var r=l(e),o=i(e),s=o.length,a=t?s:-1;t?a--:++a<s;){var u=o[a];if(n(r[u],u,r)===!1)break}return e}}function u(t){return"number"==typeof t&&t>-1&&t%1==0&&d>=t}function l(t){return c(t)?t:Object(t)}function c(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}var h=n(i),d=9007199254740991,f=s(r),p=a(),_=o("length");t.exports=f}]))},function(t,e,n){"use strict";var i=n(8),r=function(t,e){var n=e||{},r=n.bufferLen||4096,o=n.numChannels||2;this.context=t.context,this.node=(this.context.createScriptProcessor||this.context.createJavaScriptNode).call(this.context,r,o,o);var s=new i;s.postMessage({command:"init",config:{sampleRate:this.context.sampleRate,numChannels:o}});var a,u=!1;this.node.onaudioprocess=function(t){if(u){for(var e=[],n=0;o>n;n++)e.push(t.inputBuffer.getChannelData(n));s.postMessage({command:"record",buffer:e})}},this.configure=function(t){for(var e in t)t.hasOwnProperty(e)&&(n[e]=t[e])},this.record=function(){u=!0},this.stop=function(){u=!1},this.clear=function(){s.postMessage({command:"clear"})},this.getBuffer=function(t){a=t||n.callback,s.postMessage({command:"getBuffer"})},this.exportWAV=function(t,e){if(a=t||n.callback,e=e||n.type||"audio/wav",!a)throw new Error("Callback not set");s.postMessage({command:"exportWAV",type:e})},s.onmessage=function(t){var e=t.data;a(e)},t.connect(this.node),this.node.connect(this.context.destination)};r.forceDownload=function(t,e){var n=(window.URL||window.webkitURL).createObjectURL(t),i=window.document.createElement("a");i.href=n,i.download=e||"output.wav";var r=document.createEvent("Event");r.initEvent("click",!0,!0),i.dispatchEvent(r)},t.exports=r},function(t,e){"use strict";t.exports=function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return t[i].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){function i(t){var e=t.resource_id||t.id||t.cid;if(!e)throw new Error("Your model should have a unique `id`, `cid` or `resource_id` property");return e}function r(t){D=t,t&&(I.AudioManagerStates=t.States,this.toggleMute(V.muted),this.setVolume(V.volume))}function o(t){var e,n=this.options;return e={id:this.getId(),src:t.url,duration:R.result(n.duration),mimeType:t.mimeType,forceSingle:n.useSinglePlayer},D.createAudioPlayer(e)}function s(t,e){var n=e?"on":"off";t[n]("stateChange",w,this)[n]("positionChange",u,this)[n]("loadedmetadata",a,this)}function a(){this.trigger(U.METADATA)}function u(){this._prevPosition!==this.currentTime()&&(this.trigger(U.TIME),this._prevPosition=this.currentTime())}function l(){this._initAudioDefer&&(this._initAudioDefer.reject(),this._initAudioDefer=null,this.streamInfo=null)}function c(){l.call(this),this.controller&&(this._storedPosition=this.currentTime(),this.controller.kill(),this.controller=null,this.trigger(U.RESET))}function h(){this._registerPlays=!0,this.pause(),this.trigger(U.FINISH)}function d(){var t=M();return this.streamInfo?t.resolve(this.streamInfo):f.call(this).then(function(e){var n=x.choosePreferredStream(e,this.options);n?t.resolve(n):(this.trigger(U.NO_PROTOCOL),this.options.debug&&window.console.warn(L("SCAudio (%s): Could not match a protocol of given media descriptor to one of the supported protocols ("+this.options.protocols+"), aborting attempt to play."),this.getId()),t.reject())}.bind(this)).fail(function(e){this.options.debug&&window.console.warn(L("Stream request failed with status: %d"),e.status),p.call(this,e),_.call(this,e),t.reject()}.bind(this)),t.promise()}function f(){if(this.options.streamUrls&&!this._usedPrefetchUrls){var t=M();this._usedPrefetchUrls=!0;var e="function"==typeof this.options.streamUrls?this.options.streamUrls():this.options.streamUrls;return t.resolve(e),t.promise()}return this.ajax({type:"GET",url:R.result(this.options.streamUrlsEndpoint),dataType:"json",async:this.options.asyncFetch,timeout:this.options.asyncFetch?q:W})}function p(t){var e=t.status>=400&&-1!==(t.responseText||"").indexOf("geo_blocked");e&&this.trigger(U.GEO_BLOCKED)}function _(t){0===t.status&&this.trigger(U.NO_CONNECTION)}function g(t){var e=this._initAudioDefer&&this._initAudioDefer.state(),n=x.streamValidForPlayingFrom(this.streamInfo,t);return e&&("pending"===e||"resolved"===e&&n)}function m(t){t&&!this._bufferingTimeout?this._bufferingTimeout=setTimeout(function(){this._isBuffering=!0,this.trigger(U.BUFFERRING_START)}.bind(this),$):t||(this._bufferingTimeout&&(clearTimeout(this._bufferingTimeout),this._bufferingTimeout=null),this._isBuffering&&(this._isBuffering=!1,this.trigger(U.BUFFERRING_END)))}function y(){this.off(U.TIME,this.seekTimeEventHandler),this.trigger(U.SEEKED),this.seekTimeEventHandler=null}function v(){this._errorRecoveryFlagsResetTimeout=setTimeout(function(){this._errorRecoveryTime=null,this._errorRecoveryCounts=0}.bind(this),J)}function A(){this._errorRecoveryFlagsResetTimeout&&clearTimeout(this._errorRecoveryFlagsResetTimeout)}function E(){var t=this.isPlaying(),e=Date.now();return A.call(this),this._errorRecoveryTime&&this._errorRecoveryTime+z>e&&this._errorRecoveryCounts>Q?void this.trigger(U.AUDIO_ERROR,this):(this._errorRecoveryTime=Date.now(),this._errorRecoveryCounts++,c.call(this),void(t&&this.play({seek:this.currentTime()})))}function S(t){this.logAudioError({error_id:t,has_flash:k.supportsFlash(),flash_plugin:k.flashPlugin(),playertype:this.controller?this.controller.getType():void 0,protocol:this.streamInfo?this.streamInfo.protocol:void 0,host:this.streamInfo?G.getUrlHost(this.streamInfo.url):void 0,media_uri:this.streamInfo?this.streamInfo.url:void 0})}function T(){var t,e=D.Errors;if(!this.controller)return this.options.debug&&window.console.error(L("SCAudio: controller is null, aborting error handler ("+this.getId()+")."),this),S.call(this,null),void E.call(this);switch(t=this.controller&&this.controller.getErrorID(),this.options.debug&&("undefined"!=typeof this.controller.getErrorMessage?window.console.error(L("SCAudio error ("+this.getId()+"): "+this.controller.getErrorMessage())):window.console.error(L("SCAudio error ("+this.getId()+"): controller implementation lacks getErrorMessage function!"))),S.call(this,t),t){case e.FLASH_PROXY_CANT_LOAD_FLASH:this.trigger(U.FLASH_NOT_LOADED);break;case e.FLASH_PROXY_FLASH_BLOCKED:this.trigger(U.FLASH_BLOCK);break;case e.FLASH_RTMP_CONNECT_FAILED:R.without(this.options.protocols,B.RTMP);case e.FLASH_RTMP_CANNOT_PLAY_STREAM:case e.FLASH_RTMP_CONNECT_CLOSED:case e.HTML5_AUDIO_NETWORK:case e.HTML5_AUDIO_ABORTED:case e.HTML5_AUDIO_DECODE:case e.HTML5_AUDIO_SRC_NOT_SUPPORTED:case e.HTML5_AUDIO_ENDED_EARLY:E.call(this);break;case e.HTML5_AUDIO_OVERRUN:h.call(this);break;default:window.console.error(L("SCAudio ("+this.getId()+") does not handle audio error code: "+t),this)}}function b(t){switch(this.options.debug&&P.call(this,t),t){case U.PAUSE:this._isPlaying=!1,this._isPlayActionQueued=!1;break;case U.PLAY:this._isPlaying=!1,this._isPlayActionQueued=!0;break;case U.PLAY_START:this._isPlaying=!0,this._isPlayActionQueued=!1,this._registerPlays&&this.registerPlay();break;case U.BUFFERRING_START:case U.SEEK:this._isPlaying&&(this._isPlaying=!1,this._isPlayActionQueued=!0);break;case U.BUFFERRING_END:case U.SEEKED:this._isPlayActionQueued&&(this._isPlaying=!0,this._isPlayActionQueued=!1)}}function w(t){var e=D.States,n=D.Errors;switch(t){case e.IDLE:O.call(this),this.controller&&this.controller.getErrorID()===n.FLASH_PROXY_FLASH_BLOCKED&&this.trigger(U.FLASH_UNBLOCK);break;case e.PAUSED:O.call(this),m.call(this,!1),this.seekTimeEventHandler&&this.isPaused()&&y.call(this);break;case e.PLAYING:O.call(this),m.call(this,!1),v.call(this),this.trigger(U.PLAY_RESUME);break;case e.LOADING:case e.SEEKING:O.call(this),m.call(this,!0);break;case e.ENDED:O.call(this),h.call(this);break;case e.ERROR:m.call(this,!1),T.call(this)}this.trigger(U.STATE_CHANGE,t)}function P(t){var e,n=window.console.log;t!==U.TIME?(e=[L("SCAudio event ("+this.getId()+"):")],e.push.apply(e,arguments),n.apply(window.console,e),this._loggedTime=!1):this._loggedTime||(n.call(window.console,L("SCAudio time (%s): %d ms"),this.getId(),this.currentTime()),this._loggedTime=!0)}function L(t){return(new Date).toString()+" | "+t}function O(){this._initAudioDefer&&this._initAudioDefer.resolve()}var I,D,M=n(4).Deferred,k=n(5),R=n(3),x=n(15),N=n(11),C=n(12),U=n(1),F=n(13),H=n(6),B=n(2),j=n(14),G=n(7),Y={},V={muted:!1,volume:1},K={soundId:Y,duration:Y,registerEndpoint:Y,streamUrlsEndpoint:Y,resourceId:!1,debug:!1,asyncFetch:!0,useSinglePlayer:!0,protocols:[B.HLS,B.RTMP,B.HTTP],extensions:[F.MP3],maxBitrate:1/0,mediaSourceEnabled:!1,eventLogger:null,logErrors:!0,logPerformance:!0,ajax:null},W=6e3,q=6e3,$=400,X=6e4,z=6e3,Q=3,J=3e4,Z=[];I=t.exports=function(t,e){if(1===arguments.length?e=t:I.setAudioManager(t),!D)throw new Error("SCAudio: AudioManager instance must be set with `SCAudio.setAudioManager()` or passed via the constructor");this.options=R.extend({},K,e);var n=Object.keys(this.options).filter(function(t){return this.options[t]===Y},this);if(n.length)throw new Error("SCAudio: pass into constructor the following options: "+n.join(", "));j.prioritizeAndFilter(this.options),this.controller=null,this.streamInfo=null,this._registerPlays=!0,this._registerCounts=this._errorRecoveryCounts=0,this._isPlayActionQueued=this._usedPrefetchUrls=this._isPlaying=this._isBuffering=!1,this._initAudioDefer=this._expirationTimeout=this._bufferingTimeout=this._errorRecoveryTime=this._errorRecoveryFlagsResetTimeout=this._storedPosition=this._prevPosition=null,this.options.debug&&(this._loggedTime=!1),this._modelListeners={},this.on("all",b,this),this.audioPerfMonitor=new C(this,this.logAudioPerformance.bind(this)),this.audioLogger=new N(this)},R.extend(I.prototype,H,{constructor:I,initAudio:function(){return this._initAudioDefer||(this._initAudioDefer=M(),d.call(this).then(function(t){var e=!0;this.streamInfo&&(e=!1),this.streamInfo=t,e&&this.trigger(U.STREAMS),this.controller=o.call(this,t),s.call(this,this.controller,!0),w.call(this,this.controller.getState())}.bind(this)).fail(function(){this.trigger(U.NO_STREAMS)}.bind(this)),this._initAudioDefer.done(function(){this.trigger(U.CREATED)}.bind(this))),this._initAudioDefer.promise()},registerPlay:function(){var t=this.options.soundId,e=!1;return-1===Z.indexOf(t)&&(Z.push(t),setTimeout(function(){var e=Z.indexOf(t);e>-1&&Z.splice(e,1)},X),this.ajax({type:"POST",url:R.result(this.options.registerEndpoint),dataType:"json"}),this._registerCounts++,this._registerPlays=!1,this.trigger(U.REGISTERED),e=!0),e},toggle:function(){this[this.isPaused()?"play":"pause"]()},play:function(t){var e=t&&null!=t.seek?t.seek:this.currentTime();t=R.extend({},t,{position:e}),this.trigger(U.PLAY,t),g.call(this,e)||c.call(this),this.initAudio().then(function(){this._isPlayActionQueued&&(this._storedPosition=null,this.trigger(U.PLAY_START,t),this.controller&&this.controller.play(e))}.bind(this)),m.call(this,!0)},pause:function(t){this.isPaused()||(t=R.extend({},t,{position:this.currentTime()}),this.trigger(U.PAUSE,t),this.controller&&this.controller.pause(),m.call(this,!1))},getListenTime:function(){return this.audioLogger?this.audioLogger.getListenTime():0},dispose:function(){this.audioLogger=null,this.audioPerfMonitor=null,R.without(Z,this.options.soundId),clearTimeout(this._bufferingTimeout),l.call(this),this.controller&&(this.controller.kill(),this.controller=null),delete this.controller,this.trigger(U.DESTROYED),this.off()},seek:function(t){return this.controller?t>=R.result(this.options.duration)?void h.call(this):(this.seekTimeEventHandler&&this.off(U.TIME,this.seekTimeEventHandler),this.seekTimeEventHandler=R.after(2,function(){y.call(this)}.bind(this)),this.on(U.TIME,this.seekTimeEventHandler),this.trigger(U.SEEK,{from:this.currentTime(),to:t}),this.isPlaying()&&!g.call(this,t)?(c.call(this),void this.play({seek:t})):void this.controller.seek(t)):void 0},seekRelative:function(t){this.controller&&this.seek(this.currentTime()+t)},currentTime:function(){return this._storedPosition?this._storedPosition:this.controller?this.controller.getCurrentPosition():0},loadProgress:function(){var t=0;return this.controller&&(t=this.controller.getLoadedPosition()/this.controller.getDuration(),t=t>=.99?1:t),t},buffered:function(){return this.controller&&this.controller.getDuration()||0},isPaused:function(){return!this.isPlaying()},isBuffering:function(){return this._isBuffering},isPlaying:function(){return this._isPlayActionQueued||this._isPlaying},isLoading:function(){return!(!this.controller||this.controller.getState()!==D.States.LOADING)},toggleMute:function(t){I.toggleMute(t)},isMuted:function(){return I.isMuted()},setVolume:function(t){I.setVolume(t)},getVolume:function(){return I.getVolume()},logAudioPerformance:function(t){this.getEventLogger()&&this.options.logPerformance&&this.getEventLogger().audioPerformance(t)},logAudioError:function(t){this.getEventLogger()&&this.options.logErrors&&this.getEventLogger().audioError(t)},getAudioManagerStates:function(){return D.States},getId:function(){return this.options.resourceId||this.options.soundId},getEventLogger:function(){return this.options.eventLogger},registerModelEventListener:function(t,e){var n=i(t);if(this._modelListeners[n])throw new Error("Data model is already registered (forgot to unregister it or registering twice?)");this._modelListeners[n]=e=e.bind(this,t),this.on("all",e)},unregisterModelEventListener:function(t){var e=i(t);this._modelListeners[e]&&(this.off("all",this._modelListeners[e]),delete this._modelListeners[e])},ajax:function(t){return this.options.ajax?this.options.ajax(t):R.ajax(t)}}),R.extend(I,{extend:R.inherits,getSettings:function(){return V},setSettings:function(t){R.extend(V,t)},setAudioManager:r,setAudioManagerOnce:R.once(r),toggleMute:function(t){V.muted=void 0===t?!V.muted:!!t,D&&D.setVolume(V.muted?0:1)},isMuted:function(){return V.muted},setVolume:function(t){V.volume=void 0===t?1:t,D&&D.setVolume(V.volume)},getVolume:function(){return V.volume},Extensions:F,Protocols:B,Events:U,BUFFER_DELAY:$,PLAY_REGISTRATION_TIMEOUT:X})},function(t,e){var n={CREATED:"created",STATE_CHANGE:"state-change",DESTROYED:"destroyed",PLAY:"play",PLAY_START:"play-start",PLAY_RESUME:"play-resume",METADATA:"metadata",PAUSE:"pause",FINISH:"finish",RESET:"reset",SEEK:"seek",SEEKED:"seeked",GEO_BLOCKED:"geo_blocked",BUFFERRING_START:"buffering_start",BUFFERRING_END:"buffering_end",FLASH_NOT_LOADED:"flash_not_loaded",FLASH_BLOCK:"flash_blocked",FLASH_UNBLOCK:"flash_unblocked",AUDIO_ERROR:"audio_error",TIME:"time",NO_STREAMS:"no_streams",STREAMS:"streams",NO_PROTOCOL:"no_protocol",NO_CONNECTION:"no_connection",REGISTERED:"registered"};t.exports=n},function(t,e){var n={HTTP:"http",RTMP:"rtmp",HLS:"hls"};t.exports=n},function(t,e,n){var i=n(4).Deferred,r={ajax:function(t){var e,n,r,o,s,a;r=t.data||null,n=t.url,e=t.type,o=t.dataType,s=t.async,a=t.timeout;var u,l,c,h=i();return void 0===s&&(s=!0),u=new XMLHttpRequest,u.open(e,n,s),s&&(u.responseType="text"),u.onreadystatechange=function(){return 4==u.readyState?(clearTimeout(c),0!=u.status&&u.status<400?(l="json"==o?JSON.parse(u.responseText):u.responseText,void h.resolve(l)):void h.reject(u)):void 0},void 0!==a&&(c=setTimeout(function(){4!=u.readyState&&(u.abort(),h.reject(u))},a)),u.send(r),h.promise()},extend:function(t){var e=Array.prototype.slice.call(arguments,1);return e.forEach(function(e){if(e)for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])}),t},each:function(t,e,n){Object.keys(t).forEach(function(i){e.call(n||null,t[i],i)})},find:function(t,e,n){var i;return t.some(function(t){return e.call(n,t)?(i=t,!0):void 0}),i},has:function(t,e){return Object.keys(t).indexOf(e)>-1},inherits:function(t,e){var n,i=this;n=t&&r.has(t,"constructor")?t.constructor:function(){return i.apply(this,arguments)},r.extend(n,i,e);var o=function(){this.constructor=n};return o.prototype=i.prototype,n.prototype=new o,t&&r.extend(n.prototype,t),n.__super__=i.prototype,n},without:function(t,e){var n=t.indexOf(e);n>-1&&t.splice(n,1)},result:function(t){var e=t;return r.isFunction(e)&&(e=t()),e},isFunction:function(t){return"function"==typeof t},after:function(t,e){return function(){return--t<1?e.apply(this,arguments):void 0}},isNull:function(t){return null===t},once:function(t){var e,n=!1;return function(){return n?e:(n=!0,void(e=t.apply(this,arguments)))}}};t.exports=r},function(t,e,n){t.exports=n(10)},function(t,e){function n(t){return t.test(window.navigator.userAgent.toLowerCase())}function i(t,e){try{return window.navigator.userAgent.toLowerCase().match(t)[e]}catch(n){return null}}function r(){try{return parseInt(i(/chrom(e|ium)\/([0-9]+)\./,2))}catch(t){return NaN}}function o(){return!u()&&n(/safari/)}function s(){return o()&&n(/version\/7\.1/)}function a(){return o()&&n(/version\/8/)}function u(){return n(/chrom(e|ium)/)}function l(){return n(/firefox/)}function c(){try{return window.hasOwnProperty("Audio")&&!!(new window.Audio).canPlayType("audio/mpeg")}catch(t){return!1}}function h(){try{var t=o()&&n(/version\/5\.0/),e=window.hasOwnProperty("Audio")&&(!!(new window.Audio).canPlayType('audio/x-mpegURL; codecs="mp3"')||!!(new window.Audio).canPlayType('vnd.apple.mpegURL; codecs="mp3"'));return!t&&e}catch(i){return!1}}function d(){return p(f())>=g}function f(){var t,e,n,i;if("undefined"!=typeof window.ActiveXObject)try{i=new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash"),i&&(t=i.GetVariable("$version"))}catch(r){}else window.navigator&&window.navigator.plugins&&window.navigator.plugins.length>0&&(n="application/x-shockwave-flash",e=window.navigator.mimeTypes,e&&e[n]&&e[n].enabledPlugin&&e[n].enabledPlugin.description&&(t=e[n].enabledPlugin.description));return t}function p(t){if(!t)return 0;var e=t.match(/\d\S+/)[0].replace(/,/g,".").split(".");return parseFloat([e[0],e[1]].join("."))||0}var _,g=9;_={flashPlugin:f,isSafari:o,isSafari71:s,isSafari8:a,isChrome:u,getChromeVersion:r,isFirefox:l,supportsHLSAudio:h,supportsHTML5Audio:c,supportsFlash:d},t.exports=_},function(t,e){function n(t,e,n,i){if(!n)return!0;if("object"==typeof n)for(var o in n)n.hasOwnProperty(o)&&t[e].apply(t,[o,n[o]].concat(i));else{if(!r.test(n))return!0;for(var s=n.split(r),a=0,u=s.length;u>a;a++)t[e].apply(t,[s[a]].concat(i))}}function i(t,e){var n,i=-1,r=t.length;switch(e.length){case 0:for(;++i<r;)n=t[i],n.callback.call(n.ctx);return;case 1:for(;++i<r;)(n=t[i]).callback.call(n.ctx,e[0]);return;case 2:for(;++i<r;)(n=t[i]).callback.call(n.ctx,e[0],e[1]);return;case 3:for(;++i<r;)(n=t[i]).callback.call(n.ctx,e[0],e[1],e[2]);return;default:for(;++i<r;)(n=t[i]).callback.apply(n.ctx,e)}}var r=/\s+/,o={on:function(t,e,i){if(!n(this,"on",t,[e,i])||!e)return this;this._events||(this._events={});var r=this._events[t]||(this._events[t]=[]);return r.push({callback:e,context:i,ctx:i||this}),this},off:function(t,e,i){var r,o,s,a,u,l,c,h;if(!this._events||!n(this,"off",t,[e,i]))return this;if(!t&&!e&&!i)return this._events={},this;for(a=t?[t]:Object.keys(this._events),u=0,l=a.length;l>u;u++)if(t=a[u],s=this._events[t]){if(this._events[t]=r=[],e||i)for(c=0,h=s.length;h>c;c++)o=s[c],(e&&e!==o.callback&&e!==o.callback._callback||i&&i!==o.context)&&r.push(o);r.length||delete this._events[t]}return this},trigger:function(t){if(!this._events)return this;var e=Array.prototype.slice.call(arguments,1);if(!n(this,"trigger",t,e))return this;var r=this._events[t],o=this._events.all;return r&&i(r,e),o&&i(o,arguments),this}};t.exports=o},function(t,e){var n={getUrlParams:function(t){var e={},n=t.indexOf("?");return n>-1&&t.substr(n+1).split("&").forEach(function(t){var n=t.split("=");e[n[0]]=n[1]}),e},getUrlHost:function(t){var e,n=t.split("//");return e=n[0]===t?n[0].split("/")[0]:n[1]?n[1].split("/")[0]:""}};t.exports=n},function(t,e,n){function i(t){var e=s[t]={};return r.each(t.split(o),function(t,n){e[n]=!0}),e}var r=t.exports=n(9),o=/\s+/,s={};r.Callbacks=function(t){t="string"==typeof t?s[t]||i(t):r.extend({},t);var e,n,o,a,u,l,c=[],h=!t.once&&[],d=function p(i){for(e=t.memory&&i,n=!0,l=a||0,a=0,u=c.length,o=!0;c&&u>l;l++)if(c[l].apply(i[0],i[1])===!1&&t.stopOnFalse){e=!1;break}o=!1,c&&(h?h.length&&p(h.shift()):e?c=[]:f.disable())},f={add:function(){if(c){var n=c.length;!function i(e){r.each(e,function(e,n){var o=r.type(n);"function"===o?t.unique&&f.has(n)||c.push(n):n&&n.length&&"string"!==o&&i(n)})}(arguments),o?u=c.length:e&&(a=n,d(e))}return this},remove:function(){return c&&r.each(arguments,function(t,e){for(var n;(n=r.inArray(e,c,n))>-1;)c.splice(n,1),o&&(u>=n&&u--,l>=n&&l--)}),this},has:function(t){return r.inArray(t,c)>-1},empty:function(){return c=[],this},disable:function(){return c=h=e=void 0,this},disabled:function(){return!c},lock:function(){return h=void 0,e||f.disable(),this},locked:function(){return!h},fireWith:function(t,e){return e=e||[],e=[t,e.slice?e.slice():e],!c||n&&!h||(o?h.push(e):d(e)),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!n}};return f}},function(t,e){function n(t){return null==t?String(t):c[l.call(t)]||"object"}function i(t){return"function"===u.type(t)}function r(t){return"array"===u.type(t)}function o(t,e,n){var r,o=0,s=t.length,a=void 0===s||i(t);if(n)if(a){for(r in t)if(e.apply(t[r],n)===!1)break}else for(;s>o&&e.apply(t[o++],n)!==!1;);else if(a){for(r in t)if(e.call(t[r],r,t[r])===!1)break}else for(;s>o&&e.call(t[o],o,t[o++])!==!1;);return t}function s(t){return t&&"object"===u.type(t)?!0:!1}function a(){var t,e,n,i,r,o,s=arguments[0]||{},a=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},a=2),"object"==typeof s||u.isFunction(s)||(s={}),l===a&&(s=this,--a);l>a;a++)if(null!=(t=arguments[a]))for(e in t)n=s[e],i=t[e],s!==i&&(c&&i&&(u.isPlainObject(i)||(r=u.isArray(i)))?(r?(r=!1,o=n&&u.isArray(n)?n:[]):o=n&&u.isPlainObject(n)?n:{},s[e]=u.extend(c,o,i)):void 0!==i&&(s[e]=i));return s}var u=t.exports={type:n,isArray:r,isFunction:i,isPlainObject:s,each:o,extend:a,noop:function(){}},l=Object.prototype.toString,c={};"Boolean Number String Function Array Date RegExp Object".split(" ").forEach(function(t){c["[object "+t+"]"]=t.toLowerCase()})},function(t,e,n){/*!
		 * jquery-deferred
		 * Copyright(c) 2011 Hidden <zzdhidden@gmail.com>
		 * MIT Licensed
		 */
	var i=t.exports=n(8),r=Array.prototype.slice;i.extend({Deferred:function(t){var e=[["resolve","done",i.Callbacks("once memory"),"resolved"],["reject","fail",i.Callbacks("once memory"),"rejected"],["notify","progress",i.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return o.done(arguments).fail(arguments),this},then:function(){var t=arguments;return i.Deferred(function(n){i.each(e,function(e,r){var s=r[0],a=t[e];o[r[1]](i.isFunction(a)?function(){var t=a.apply(this,arguments);t&&i.isFunction(t.promise)?t.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===o?n:this,[t])}:n[s])}),t=null}).promise()},promise:function(t){return null!=t?i.extend(t,r):r}},o={};return r.pipe=r.then,i.each(e,function(t,i){var s=i[2],a=i[3];r[i[1]]=s.add,a&&s.add(function(){n=a},e[1^t][2].disable,e[2][2].lock),o[i[0]]=s.fire,o[i[0]+"With"]=s.fireWith}),r.promise(o),t&&t.call(o,o),o},when:function(t){var e,n,o,s=0,a=r.call(arguments),u=a.length,l=1!==u||t&&i.isFunction(t.promise)?u:0,c=1===l?t:i.Deferred(),h=function(t,n,i){return function(o){n[t]=this,i[t]=arguments.length>1?r.call(arguments):o,i===e?c.notifyWith(n,i):--l||c.resolveWith(n,i)}};if(u>1)for(e=new Array(u),n=new Array(u),o=new Array(u);u>s;s++)a[s]&&i.isFunction(a[s].promise)?a[s].promise().done(h(s,o,a)).fail(c.reject).progress(h(s,n,e)):--l;return l||c.resolveWith(o,a),c.promise()}})},function(t,e,n){function i(t){this.listenTime+=t.from-this.currentTime,this.currentTime=t.to}function r(t){this.listenTime+=t.position-this.currentTime,this.currentTime=t.position}function o(t){this.currentTime=t.position}var s,a=n(1);s=t.exports=function(t){this.scAudio=t,this.listenTime=0,this.currentTime=0,this.scAudio.on(a.SEEK,i,this).on(a.PLAY_START,o,this).on(a.PAUSE,r,this)},s.prototype={constructor:s,getListenTime:function(){return this.listenTime+this.scAudio.currentTime()-this.currentTime}}},function(t,e,n){function i(t){return"AudioPerfMonitor ("+this.scAudio.getId()+") : "+t}function r(){return this.scAudio.controller?this.controller?void this.printWarning(i.call(this,"Setup was called while it was already initialized (returned with a no-op)")):(this.scAudio.options.debug&&window.console.info(i.call(this,"Initialized for instance %s"),this.scAudio.getId()),this.controller=this.scAudio.controller,this.protocol=this.scAudio.streamInfo.protocol,void(this.host=A.getUrlHost(this.scAudio.streamInfo.url))):void this.printWarning("Can´t initialize when controller is null")}function o(){return this.controller?(this.scAudio.options.debug&&window.console.info(i.call(this,"Reset for instance %s"),this.scAudio.getId()),this.controller=null,this.protocol=null,this.host=null,void(this.timeToPlayMeasured=!1)):void this.printWarning(i.call(this,"Reset was called while it was already de-initialized (returned with a no-op)"))}function s(t){var e=this.scAudio.getAudioManagerStates();t===e.LOADING?this.timeToPlayMeasured&&f.call(this):E.isNull(this.bufferingStartTime)||p.call(this)}function a(){this.metadataLoadStartTime=Date.now()}function u(){return E.isNull(this.metadataLoadStartTime)?void this.printWarning(i.call(this,"onMetadataEnd was called without onMetadataStart being called before.")):(this.log({type:"metadata",latency:Date.now()-this.metadataLoadStartTime}),void(this.metadataLoadStartTime=null))}function l(){this.playClickTime=Date.now()}function c(){if(!this.timeToPlayMeasured){if(E.isNull(this.playClickTime))return void this.printWarning(i.call(this,"onPlayResume was called without onPlayStart being called before."));this.log({type:"play",latency:Date.now()-this.playClickTime}),this.playClickTime=null,this.timeToPlayMeasured=!0}}function h(){this.scAudio.isPaused()||(this.seekStartTime=Date.now())}function d(){if(!this.scAudio.isPaused()){if(E.isNull(this.seekStartTime))return void this.printWarning(i.call(this,"onSeekEnd was called without onSeekStart being called before."));this.log({type:"seek",latency:Date.now()-this.seekStartTime}),this.seekStartTime=null}}function f(){this.bufferingStartTime||(this.bufferingStartTime=Date.now())}function p(){return E.isNull(this.bufferingStartTime)?void this.printWarning(i.call(this,"onBufferingEnd was called without onBufferingStart being called before.")):(_.call(this),void(this.bufferingStartTime=null))}function _(){E.isNull(this.bufferingStartTime)||(E.isNull(this.bufferingTimeAccumulated)&&(this.bufferingTimeAccumulated=0),this.bufferingTimeAccumulated+=Date.now()-this.bufferingStartTime)}function g(){_.call(this),E.isNull(this.bufferingTimeAccumulated)||(this.log({type:"buffer",latency:this.bufferingTimeAccumulated}),this.bufferingStartTime=this.bufferingTimeAccumulated=null)}var m,y=n(1),v=n(6),A=n(7),E=n(3);m=t.exports=function(t,e){this.scAudio=t,this.logFn=e,this.controller=null,this.reset(),t.on(y.CREATED,r,this).on(y.RESET,o,this).on(y.DESTROYED,o,this).on(y.SEEK,h,this).on(y.SEEKED,d,this).on(y.PLAY,l,this).on(y.PLAY_START,a,this).on(y.PLAY_RESUME,c,this).on(y.PAUSE,g,this).on(y.FINISH,g,this).on(y.STATE_CHANGE,s,this).on(y.METADATA,u,this)},E.extend(m.prototype,v,{constructor:m,log:function(t){return this.controller?(E.extend(t,{protocol:this.protocol,host:this.host,playertype:this.controller.getType()}),this.scAudio.options.debug&&window.console.info(i.call(this,"%s latency: %d protocol: %s host: %s playertype: %s"),t.type,t.latency,t.protocol,t.host,t.playertype),void this.logFn(t)):void this.printWarning(i.call(this,"Monitor log was called while controller is null (returned with a no-op)"))},reset:function(){this.bufferingStartTime=this.bufferingTimeAccumulated=this.playClickTime=this.seekStartTime=this.metadataLoadStartTime=null,this.timeToPlayMeasured=!1},printWarning:function(t){this.scAudio.options.debug&&window.console.warn(t)}})},function(t,e){var n={AAC:"aac",MP3:"mp3",OGG:"ogg",OPUS:"opus",WAV:"wav"};t.exports=n},function(t,e,n){function i(t){return l.isChrome()&&l.getChromeVersion()>=35&&t.mediaSourceEnabled||l.isSafari()&&l.supportsHLSAudio()}function r(t){return function(e){var n=!1;switch(e){case u.RTMP:n=l.supportsFlash();break;case u.HTTP:n=l.supportsHTML5Audio()||l.supportsFlash();break;case u.HLS:n=i(t)}return n}}function o(t){return(l.isSafari71()||l.isSafari8()||l.isFirefox())&&(t=[u.HTTP,u.HLS,u.RTMP]),t}function s(t){t.protocols=o(t.protocols).filter(r(t))}var a,u=n(2),l=n(5);a={prioritizeAndFilter:s},t.exports=a},function(t,e,n){function i(t,e){if(!t)return!1;var n=t.issuedAt+r(t.protocol,t.duration);return o(t.protocol)?Date.now()+t.duration-(e||0)<n:Date.now()<n}function r(t,e){var n=o(t);return h+(n?l.result(e):0)}function o(t){return t===u.HTTP||t===u.HLS}function s(t,e){function n(t,e){return Math.abs(e-_)-Math.abs(t-_)}function i(t){return-1*t}var r,o,s,a,u,c,h,d,f,p={},_=e.maxBitrate,g=e.protocols,m=e.extensions;for(l.each(t,function(t,e){var n=e.split("_"),i=n[0],r=n[1],o=n[2];p[i]=p[i]||{},p[i][r]=p[i][r]||{},p[i][r][o]=t}),u=0,c=g.length;c>u;++u)for(a=g[u],d=0,f=m.length;f>d;++d)if(h=m[d],p[a]&&p[a][h])return r=Object.keys(p[a][h]).map(Number).sort(i),o=_===1/0,s=_===-(1/0),_=o||s?r[o?"pop":"shift"]():r.sort(n).pop(),{url:p[a][h][_],bitrate:_,protocol:a,extension:h,issuedAt:Date.now(),duration:l.result(e.duration)};return null}var a,u=n(2),l=n(3),c=.9,h=Math.floor(12e4*c);a=t.exports={choosePreferredStream:s,streamValidForPlayingFrom:i},t.exports=a}])},function(t,e){t.exports={encode:function(t,e){function n(t){return t.filter(function(t){return"string"==typeof t&&t.length}).join("&")}function i(t){var e=Object.keys(t);return h?e.sort():e}function r(t,e){var r=":name[:prop]";return n(i(e).map(function(n){return s(r.replace(/:name/,t).replace(/:prop/,n),e[n])}))}function o(t,e){var i=":name[]";return n(e.map(function(e){return s(i.replace(/:name/,t),e)}))}function s(t,e){var n=/%20/g,i=encodeURIComponent,s=typeof e,a=null;return Array.isArray(e)?a=o(t,e):"string"===s?a=i(t)+"="+u(e):"number"===s?a=i(t)+"="+i(e).replace(n,"+"):"boolean"===s?a=i(t)+"="+e:"object"===s&&(null!==e?a=r(t,e):c||(a=i(t)+"=null")),a}function a(t){return"%"+("0"+t.charCodeAt(0).toString(16)).slice(-2).toUpperCase()}function u(t){return t.replace(/[^ !'()~\*]*/g,encodeURIComponent).replace(/ /g,"+").replace(/[!'()~\*]/g,a)}var l="object"==typeof e?e:{},c=l.ignorenull||!1,h=l.sorted||!1;return n(i(t).map(function(e){return s(e,t[e])}))}}},function(t,e){"use strict";t.exports=function(t){return encodeURIComponent(t).replace(/[!'()*]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}},function(t,e){t.exports=function(){throw new Error("define cannot be used indirect")}},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children=[],t.webpackPolyfill=1),t}},function(t,e){var n=window.URL||window.webkitURL;t.exports=function(t,e){try{try{var i;try{var r=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder;i=new r,i.append(t),i=i.getBlob()}catch(o){i=new Blob([t])}return new Worker(n.createObjectURL(i))}catch(o){return new Worker("data:application/javascript,"+encodeURIComponent(t))}}catch(o){return new Worker(e)}}},function(t,e){}])});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/** @license
	 *
	 * SoundManager 2: JavaScript Sound for the Web
	 * ----------------------------------------------
	 * http://schillmania.com/projects/soundmanager2/
	 *
	 * Copyright (c) 2007, Scott Schiller. All rights reserved.
	 * Code provided under the BSD License:
	 * http://schillmania.com/projects/soundmanager2/license.txt
	 *
	 * V2.97a.20150601
	 */
	
	/*global window, SM2_DEFER, sm2Debugger, console, document, navigator, setTimeout, setInterval, clearInterval, Audio, opera, module, define */
	/*jslint regexp: true, sloppy: true, white: true, nomen: true, plusplus: true, todo: true */
	
	/**
	 * About this file
	 * -------------------------------------------------------------------------------------
	 * This is the fully-commented source version of the SoundManager 2 API,
	 * recommended for use during development and testing.
	 *
	 * See soundmanager2-nodebug-jsmin.js for an optimized build (~11KB with gzip.)
	 * http://schillmania.com/projects/soundmanager2/doc/getstarted/#basic-inclusion
	 * Alternately, serve this file with gzip for 75% compression savings (~30KB over HTTP.)
	 *
	 * You may notice <d> and </d> comments in this source; these are delimiters for
	 * debug blocks which are removed in the -nodebug builds, further optimizing code size.
	 *
	 * Also, as you may note: Whoa, reliable cross-platform/device audio support is hard! ;)
	 */
	
	(function(window, _undefined) {
	
	"use strict";
	
	if (!window || !window.document) {
	
	  // Don't cross the [environment] streams. SM2 expects to be running in a browser, not under node.js etc.
	  // Additionally, if a browser somehow manages to fail this test, as Egon said: "It would be bad."
	
	  throw new Error('SoundManager requires a browser with window and document objects.');
	
	}
	
	var soundManager = null;
	
	/**
	 * The SoundManager constructor.
	 *
	 * @constructor
	 * @param {string} smURL Optional: Path to SWF files
	 * @param {string} smID Optional: The ID to use for the SWF container element
	 * @this {SoundManager}
	 * @return {SoundManager} The new SoundManager instance
	 */
	
	function SoundManager(smURL, smID) {
	
	  /**
	   * soundManager configuration options list
	   * defines top-level configuration properties to be applied to the soundManager instance (eg. soundManager.flashVersion)
	   * to set these properties, use the setup() method - eg., soundManager.setup({url: '/swf/', flashVersion: 9})
	   */
	
	  this.setupOptions = {
	
	    'url': (smURL || null),             // path (directory) where SoundManager 2 SWFs exist, eg., /path/to/swfs/
	    'flashVersion': 8,                  // flash build to use (8 or 9.) Some API features require 9.
	    'debugMode': true,                  // enable debugging output (console.log() with HTML fallback)
	    'debugFlash': false,                // enable debugging output inside SWF, troubleshoot Flash/browser issues
	    'useConsole': true,                 // use console.log() if available (otherwise, writes to #soundmanager-debug element)
	    'consoleOnly': true,                // if console is being used, do not create/write to #soundmanager-debug
	    'waitForWindowLoad': false,         // force SM2 to wait for window.onload() before trying to call soundManager.onload()
	    'bgColor': '#ffffff',               // SWF background color. N/A when wmode = 'transparent'
	    'useHighPerformance': false,        // position:fixed flash movie can help increase js/flash speed, minimize lag
	    'flashPollingInterval': null,       // msec affecting whileplaying/loading callback frequency. If null, default of 50 msec is used.
	    'html5PollingInterval': null,       // msec affecting whileplaying() for HTML5 audio, excluding mobile devices. If null, native HTML5 update events are used.
	    'flashLoadTimeout': 1000,           // msec to wait for flash movie to load before failing (0 = infinity)
	    'wmode': null,                      // flash rendering mode - null, 'transparent', or 'opaque' (last two allow z-index to work)
	    'allowScriptAccess': 'always',      // for scripting the SWF (object/embed property), 'always' or 'sameDomain'
	    'useFlashBlock': false,             // *requires flashblock.css, see demos* - allow recovery from flash blockers. Wait indefinitely and apply timeout CSS to SWF, if applicable.
	    'useHTML5Audio': true,              // use HTML5 Audio() where API is supported (most Safari, Chrome versions), Firefox (MP3/MP4 support varies.) Ideally, transparent vs. Flash API where possible.
	    'forceUseGlobalHTML5Audio': false,  // if true, a single Audio() object is used for all sounds - and only one can play at a time.
	    'ignoreMobileRestrictions': false,  // if true, SM2 will not apply global HTML5 audio rules to mobile UAs. iOS > 7 and WebViews may allow multiple Audio() instances.
	    'html5Test': /^(probably|maybe)$/i, // HTML5 Audio() format support test. Use /^probably$/i; if you want to be more conservative.
	    'preferFlash': false,               // overrides useHTML5audio, will use Flash for MP3/MP4/AAC if present. Potential option if HTML5 playback with these formats is quirky.
	    'noSWFCache': false,                // if true, appends ?ts={date} to break aggressive SWF caching.
	    'idPrefix': 'sound'                 // if an id is not provided to createSound(), this prefix is used for generated IDs - 'sound0', 'sound1' etc.
	
	  };
	
	  this.defaultOptions = {
	
	    /**
	     * the default configuration for sound objects made with createSound() and related methods
	     * eg., volume, auto-load behaviour and so forth
	     */
	
	    'autoLoad': false,        // enable automatic loading (otherwise .load() will be called on demand with .play(), the latter being nicer on bandwidth - if you want to .load yourself, you also can)
	    'autoPlay': false,        // enable playing of file as soon as possible (much faster if "stream" is true)
	    'from': null,             // position to start playback within a sound (msec), default = beginning
	    'loops': 1,               // how many times to repeat the sound (position will wrap around to 0, setPosition() will break out of loop when >0)
	    'onid3': null,            // callback function for "ID3 data is added/available"
	    'onload': null,           // callback function for "load finished"
	    'whileloading': null,     // callback function for "download progress update" (X of Y bytes received)
	    'onplay': null,           // callback for "play" start
	    'onpause': null,          // callback for "pause"
	    'onresume': null,         // callback for "resume" (pause toggle)
	    'whileplaying': null,     // callback during play (position update)
	    'onposition': null,       // object containing times and function callbacks for positions of interest
	    'onstop': null,           // callback for "user stop"
	    'onfailure': null,        // callback function for when playing fails
	    'onfinish': null,         // callback function for "sound finished playing"
	    'multiShot': true,        // let sounds "restart" or layer on top of each other when played multiple times, rather than one-shot/one at a time
	    'multiShotEvents': false, // fire multiple sound events (currently onfinish() only) when multiShot is enabled
	    'position': null,         // offset (milliseconds) to seek to within loaded sound data.
	    'pan': 0,                 // "pan" settings, left-to-right, -100 to 100
	    'stream': true,           // allows playing before entire file has loaded (recommended)
	    'to': null,               // position to end playback within a sound (msec), default = end
	    'type': null,             // MIME-like hint for file pattern / canPlay() tests, eg. audio/mp3
	    'usePolicyFile': false,   // enable crossdomain.xml request for audio on remote domains (for ID3/waveform access)
	    'volume': 100             // self-explanatory. 0-100, the latter being the max.
	
	  };
	
	  this.flash9Options = {
	
	    /**
	     * flash 9-only options,
	     * merged into defaultOptions if flash 9 is being used
	     */
	
	    'isMovieStar': null,      // "MovieStar" MPEG4 audio mode. Null (default) = auto detect MP4, AAC etc. based on URL. true = force on, ignore URL
	    'usePeakData': false,     // enable left/right channel peak (level) data
	    'useWaveformData': false, // enable sound spectrum (raw waveform data) - NOTE: May increase CPU load.
	    'useEQData': false,       // enable sound EQ (frequency spectrum data) - NOTE: May increase CPU load.
	    'onbufferchange': null,   // callback for "isBuffering" property change
	    'ondataerror': null       // callback for waveform/eq data access error (flash playing audio in other tabs/domains)
	
	  };
	
	  this.movieStarOptions = {
	
	    /**
	     * flash 9.0r115+ MPEG4 audio options,
	     * merged into defaultOptions if flash 9+movieStar mode is enabled
	     */
	
	    'bufferTime': 3,          // seconds of data to buffer before playback begins (null = flash default of 0.1 seconds - if AAC playback is gappy, try increasing.)
	    'serverURL': null,        // rtmp: FMS or FMIS server to connect to, required when requesting media via RTMP or one of its variants
	    'onconnect': null,        // rtmp: callback for connection to flash media server
	    'duration': null          // rtmp: song duration (msec)
	
	  };
	
	  this.audioFormats = {
	
	    /**
	     * determines HTML5 support + flash requirements.
	     * if no support (via flash and/or HTML5) for a "required" format, SM2 will fail to start.
	     * flash fallback is used for MP3 or MP4 if HTML5 can't play it (or if preferFlash = true)
	     */
	
	    'mp3': {
	      'type': ['audio/mpeg; codecs="mp3"', 'audio/mpeg', 'audio/mp3', 'audio/MPA', 'audio/mpa-robust'],
	      'required': true
	    },
	
	    'mp4': {
	      'related': ['aac','m4a','m4b'], // additional formats under the MP4 container
	      'type': ['audio/mp4; codecs="mp4a.40.2"', 'audio/aac', 'audio/x-m4a', 'audio/MP4A-LATM', 'audio/mpeg4-generic'],
	      'required': false
	    },
	
	    'ogg': {
	      'type': ['audio/ogg; codecs=vorbis'],
	      'required': false
	    },
	
	    'opus': {
	      'type': ['audio/ogg; codecs=opus', 'audio/opus'],
	      'required': false
	    },
	
	    'wav': {
	      'type': ['audio/wav; codecs="1"', 'audio/wav', 'audio/wave', 'audio/x-wav'],
	      'required': false
	    }
	
	  };
	
	  // HTML attributes (id + class names) for the SWF container
	
	  this.movieID = 'sm2-container';
	  this.id = (smID || 'sm2movie');
	
	  this.debugID = 'soundmanager-debug';
	  this.debugURLParam = /([#?&])debug=1/i;
	
	  // dynamic attributes
	
	  this.versionNumber = 'V2.97a.20150601';
	  this.version = null;
	  this.movieURL = null;
	  this.altURL = null;
	  this.swfLoaded = false;
	  this.enabled = false;
	  this.oMC = null;
	  this.sounds = {};
	  this.soundIDs = [];
	  this.muted = false;
	  this.didFlashBlock = false;
	  this.filePattern = null;
	
	  this.filePatterns = {
	    'flash8': /\.mp3(\?.*)?$/i,
	    'flash9': /\.mp3(\?.*)?$/i
	  };
	
	  // support indicators, set at init
	
	  this.features = {
	    'buffering': false,
	    'peakData': false,
	    'waveformData': false,
	    'eqData': false,
	    'movieStar': false
	  };
	
	  // flash sandbox info, used primarily in troubleshooting
	
	  this.sandbox = {
	    // <d>
	    'type': null,
	    'types': {
	      'remote': 'remote (domain-based) rules',
	      'localWithFile': 'local with file access (no internet access)',
	      'localWithNetwork': 'local with network (internet access only, no local access)',
	      'localTrusted': 'local, trusted (local+internet access)'
	    },
	    'description': null,
	    'noRemote': null,
	    'noLocal': null
	    // </d>
	  };
	
	  /**
	   * format support (html5/flash)
	   * stores canPlayType() results based on audioFormats.
	   * eg. { mp3: boolean, mp4: boolean }
	   * treat as read-only.
	   */
	
	  this.html5 = {
	    'usingFlash': null // set if/when flash fallback is needed
	  };
	
	  // file type support hash
	  this.flash = {};
	
	  // determined at init time
	  this.html5Only = false;
	
	  // used for special cases (eg. iPad/iPhone/palm OS?)
	  this.ignoreFlash = false;
	
	  /**
	   * a few private internals (OK, a lot. :D)
	   */
	
	  var SMSound,
	  sm2 = this, globalHTML5Audio = null, flash = null, sm = 'soundManager', smc = sm + ': ', h5 = 'HTML5::', id, ua = navigator.userAgent, wl = window.location.href.toString(), doc = document, doNothing, setProperties, init, fV, on_queue = [], debugOpen = true, debugTS, didAppend = false, appendSuccess = false, didInit = false, disabled = false, windowLoaded = false, _wDS, wdCount = 0, initComplete, mixin, assign, extraOptions, addOnEvent, processOnEvents, initUserOnload, delayWaitForEI, waitForEI, rebootIntoHTML5, setVersionInfo, handleFocus, strings, initMovie, domContentLoaded, winOnLoad, didDCLoaded, getDocument, createMovie, catchError, setPolling, initDebug, debugLevels = ['log', 'info', 'warn', 'error'], defaultFlashVersion = 8, disableObject, failSafely, normalizeMovieURL, oRemoved = null, oRemovedHTML = null, str, flashBlockHandler, getSWFCSS, swfCSS, toggleDebug, loopFix, policyFix, complain, idCheck, waitingForEI = false, initPending = false, startTimer, stopTimer, timerExecute, h5TimerCount = 0, h5IntervalTimer = null, parseURL, messages = [],
	  canIgnoreFlash, needsFlash = null, featureCheck, html5OK, html5CanPlay, html5Ext, html5Unload, domContentLoadedIE, testHTML5, event, slice = Array.prototype.slice, useGlobalHTML5Audio = false, lastGlobalHTML5URL, hasFlash, detectFlash, badSafariFix, html5_events, showSupport, flushMessages, wrapCallback, idCounter = 0, didSetup, msecScale = 1000,
	  is_iDevice = ua.match(/(ipad|iphone|ipod)/i), isAndroid = ua.match(/android/i), isIE = ua.match(/msie/i),
	  isWebkit = ua.match(/webkit/i),
	  isSafari = (ua.match(/safari/i) && !ua.match(/chrome/i)),
	  isOpera = (ua.match(/opera/i)),
	  mobileHTML5 = (ua.match(/(mobile|pre\/|xoom)/i) || is_iDevice || isAndroid),
	  isBadSafari = (!wl.match(/usehtml5audio/i) && !wl.match(/sm2\-ignorebadua/i) && isSafari && !ua.match(/silk/i) && ua.match(/OS X 10_6_([3-7])/i)), // Safari 4 and 5 (excluding Kindle Fire, "Silk") occasionally fail to load/play HTML5 audio on Snow Leopard 10.6.3 through 10.6.7 due to bug(s) in QuickTime X and/or other underlying frameworks. :/ Confirmed bug. https://bugs.webkit.org/show_bug.cgi?id=32159
	  hasConsole = (window.console !== _undefined && console.log !== _undefined),
	  isFocused = (doc.hasFocus !== _undefined ? doc.hasFocus() : null),
	  tryInitOnFocus = (isSafari && (doc.hasFocus === _undefined || !doc.hasFocus())),
	  okToDisable = !tryInitOnFocus,
	  flashMIME = /(mp3|mp4|mpa|m4a|m4b)/i,
	  emptyURL = 'about:blank', // safe URL to unload, or load nothing from (flash 8 + most HTML5 UAs)
	  emptyWAV = 'data:audio/wave;base64,/UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAD//w==', // tiny WAV for HTML5 unloading
	  overHTTP = (doc.location ? doc.location.protocol.match(/http/i) : null),
	  http = (!overHTTP ? 'http:/'+'/' : ''),
	  // mp3, mp4, aac etc.
	  netStreamMimeTypes = /^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i,
	  // Flash v9.0r115+ "moviestar" formats
	  netStreamTypes = ['mpeg4', 'aac', 'flv', 'mov', 'mp4', 'm4v', 'f4v', 'm4a', 'm4b', 'mp4v', '3gp', '3g2'],
	  netStreamPattern = new RegExp('\\.(' + netStreamTypes.join('|') + ')(\\?.*)?$', 'i');
	
	  this.mimePattern = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i; // default mp3 set
	
	  // use altURL if not "online"
	  this.useAltURL = !overHTTP;
	
	  swfCSS = {
	    'swfBox': 'sm2-object-box',
	    'swfDefault': 'movieContainer',
	    'swfError': 'swf_error', // SWF loaded, but SM2 couldn't start (other error)
	    'swfTimedout': 'swf_timedout',
	    'swfLoaded': 'swf_loaded',
	    'swfUnblocked': 'swf_unblocked', // or loaded OK
	    'sm2Debug': 'sm2_debug',
	    'highPerf': 'high_performance',
	    'flashDebug': 'flash_debug'
	  };
	
	  /**
	   * basic HTML5 Audio() support test
	   * try...catch because of IE 9 "not implemented" nonsense
	   * https://github.com/Modernizr/Modernizr/issues/224
	   */
	
	  this.hasHTML5 = (function() {
	    try {
	      // new Audio(null) for stupid Opera 9.64 case, which throws not_enough_arguments exception otherwise.
	      return (Audio !== _undefined && (isOpera && opera !== _undefined && opera.version() < 10 ? new Audio(null) : new Audio()).canPlayType !== _undefined);
	    } catch(e) {
	      return false;
	    }
	  }());
	
	  /**
	   * Public SoundManager API
	   * -----------------------
	   */
	
	  /**
	   * Configures top-level soundManager properties.
	   *
	   * @param {object} options Option parameters, eg. { flashVersion: 9, url: '/path/to/swfs/' }
	   * onready and ontimeout are also accepted parameters. call soundManager.setup() to see the full list.
	   */
	
	  this.setup = function(options) {
	
	    var noURL = (!sm2.url);
	
	    // warn if flash options have already been applied
	
	    if (options !== _undefined && didInit && needsFlash && sm2.ok() && (options.flashVersion !== _undefined || options.url !== _undefined || options.html5Test !== _undefined)) {
	      complain(str('setupLate'));
	    }
	
	    // TODO: defer: true?
	
	    assign(options);
	
	    if (!useGlobalHTML5Audio) {
	
	      if (mobileHTML5) {
	
	        // force the singleton HTML5 pattern on mobile, by default.
	        if (!sm2.setupOptions.ignoreMobileRestrictions || sm2.setupOptions.forceUseGlobalHTML5Audio) {
	          messages.push(strings.globalHTML5);
	          useGlobalHTML5Audio = true;
	        }
	
	      } else {
	
	        // only apply singleton HTML5 on desktop if forced.
	        if (sm2.setupOptions.forceUseGlobalHTML5Audio) {
	          messages.push(strings.globalHTML5);
	          useGlobalHTML5Audio = true;
	        }
	
	      }
	
	    }
	
	    if (!didSetup && mobileHTML5) {
	
	      if (sm2.setupOptions.ignoreMobileRestrictions) {
	        
	        messages.push(strings.ignoreMobile);
	      
	      } else {
	
	        // prefer HTML5 for mobile + tablet-like devices, probably more reliable vs. flash at this point.
	
	        // <d>
	        if (!sm2.setupOptions.useHTML5Audio || sm2.setupOptions.preferFlash) {
	          // notify that defaults are being changed.
	          sm2._wD(strings.mobileUA);
	        }
	        // </d>
	
	        sm2.setupOptions.useHTML5Audio = true;
	        sm2.setupOptions.preferFlash = false;
	
	        if (is_iDevice) {
	
	          // no flash here.
	          sm2.ignoreFlash = true;
	
	        } else if ((isAndroid && !ua.match(/android\s2\.3/i)) || !isAndroid) {
	        
	          /**
	           * Android devices tend to work better with a single audio instance, specifically for chained playback of sounds in sequence.
	           * Common use case: exiting sound onfinish() -> createSound() -> play()
	           * Presuming similar restrictions for other mobile, non-Android, non-iOS devices.
	           */
	
	          // <d>
	          sm2._wD(strings.globalHTML5);
	          // </d>
	
	          useGlobalHTML5Audio = true;
	
	        }
	
	      }
	
	    }
	
	    // special case 1: "Late setup". SM2 loaded normally, but user didn't assign flash URL eg., setup({url:...}) before SM2 init. Treat as delayed init.
	
	    if (options) {
	
	      if (noURL && didDCLoaded && options.url !== _undefined) {
	        sm2.beginDelayedInit();
	      }
	
	      // special case 2: If lazy-loading SM2 (DOMContentLoaded has already happened) and user calls setup() with url: parameter, try to init ASAP.
	
	      if (!didDCLoaded && options.url !== _undefined && doc.readyState === 'complete') {
	        setTimeout(domContentLoaded, 1);
	      }
	
	    }
	
	    didSetup = true;
	
	    return sm2;
	
	  };
	
	  this.ok = function() {
	
	    return (needsFlash ? (didInit && !disabled) : (sm2.useHTML5Audio && sm2.hasHTML5));
	
	  };
	
	  this.supported = this.ok; // legacy
	
	  this.getMovie = function(smID) {
	
	    // safety net: some old browsers differ on SWF references, possibly related to ExternalInterface / flash version
	    return id(smID) || doc[smID] || window[smID];
	
	  };
	
	  /**
	   * Creates a SMSound sound object instance. Can also be overloaded, e.g., createSound('mySound', '/some.mp3');
	   *
	   * @param {object} oOptions Sound options (at minimum, url parameter is required.)
	   * @return {object} SMSound The new SMSound object.
	   */
	
	  this.createSound = function(oOptions, _url) {
	
	    var cs, cs_string, options, oSound = null;
	
	    // <d>
	    cs = sm + '.createSound(): ';
	    cs_string = cs + str(!didInit ? 'notReady' : 'notOK');
	    // </d>
	
	    if (!didInit || !sm2.ok()) {
	      complain(cs_string);
	      return false;
	    }
	
	    if (_url !== _undefined) {
	      // function overloading in JS! :) ... assume simple createSound(id, url) use case.
	      oOptions = {
	        'id': oOptions,
	        'url': _url
	      };
	    }
	
	    // inherit from defaultOptions
	    options = mixin(oOptions);
	
	    options.url = parseURL(options.url);
	
	    // generate an id, if needed.
	    if (options.id === _undefined) {
	      options.id = sm2.setupOptions.idPrefix + (idCounter++);
	    }
	
	    // <d>
	    if (options.id.toString().charAt(0).match(/^[0-9]$/)) {
	      sm2._wD(cs + str('badID', options.id), 2);
	    }
	
	    sm2._wD(cs + options.id + (options.url ? ' (' + options.url + ')' : ''), 1);
	    // </d>
	
	    if (idCheck(options.id, true)) {
	      sm2._wD(cs + options.id + ' exists', 1);
	      return sm2.sounds[options.id];
	    }
	
	    function make() {
	
	      options = loopFix(options);
	      sm2.sounds[options.id] = new SMSound(options);
	      sm2.soundIDs.push(options.id);
	      return sm2.sounds[options.id];
	
	    }
	
	    if (html5OK(options)) {
	
	      oSound = make();
	      // <d>
	      if (!sm2.html5Only) {
	        sm2._wD(options.id + ': Using HTML5');
	      }
	      // </d>
	      oSound._setup_html5(options);
	
	    } else {
	
	      if (sm2.html5Only) {
	        sm2._wD(options.id + ': No HTML5 support for this sound, and no Flash. Exiting.');
	        return make();
	      }
	
	      // TODO: Move HTML5/flash checks into generic URL parsing/handling function.
	
	      if (sm2.html5.usingFlash && options.url && options.url.match(/data\:/i)) {
	        // data: URIs not supported by Flash, either.
	        sm2._wD(options.id + ': data: URIs not supported via Flash. Exiting.');
	        return make();
	      }
	
	      if (fV > 8) {
	        if (options.isMovieStar === null) {
	          // attempt to detect MPEG-4 formats
	          options.isMovieStar = !!(options.serverURL || (options.type ? options.type.match(netStreamMimeTypes) : false) || (options.url && options.url.match(netStreamPattern)));
	        }
	        // <d>
	        if (options.isMovieStar) {
	          sm2._wD(cs + 'using MovieStar handling');
	          if (options.loops > 1) {
	            _wDS('noNSLoop');
	          }
	        }
	        // </d>
	      }
	
	      options = policyFix(options, cs);
	      oSound = make();
	
	      if (fV === 8) {
	        flash._createSound(options.id, options.loops || 1, options.usePolicyFile);
	      } else {
	        flash._createSound(options.id, options.url, options.usePeakData, options.useWaveformData, options.useEQData, options.isMovieStar, (options.isMovieStar ? options.bufferTime : false), options.loops || 1, options.serverURL, options.duration || null, options.autoPlay, true, options.autoLoad, options.usePolicyFile);
	        if (!options.serverURL) {
	          // We are connected immediately
	          oSound.connected = true;
	          if (options.onconnect) {
	            options.onconnect.apply(oSound);
	          }
	        }
	      }
	
	      if (!options.serverURL && (options.autoLoad || options.autoPlay)) {
	        // call load for non-rtmp streams
	        oSound.load(options);
	      }
	
	    }
	
	    // rtmp will play in onconnect
	    if (!options.serverURL && options.autoPlay) {
	      oSound.play();
	    }
	
	    return oSound;
	
	  };
	
	  /**
	   * Destroys a SMSound sound object instance.
	   *
	   * @param {string} sID The ID of the sound to destroy
	   */
	
	  this.destroySound = function(sID, _bFromSound) {
	
	    // explicitly destroy a sound before normal page unload, etc.
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	
	    var oS = sm2.sounds[sID], i;
	
	    oS.stop();
	    
	    // Disable all callbacks after stop(), when the sound is being destroyed
	    oS._iO = {};
	    
	    oS.unload();
	
	    for (i = 0; i < sm2.soundIDs.length; i++) {
	      if (sm2.soundIDs[i] === sID) {
	        sm2.soundIDs.splice(i, 1);
	        break;
	      }
	    }
	
	    if (!_bFromSound) {
	      // ignore if being called from SMSound instance
	      oS.destruct(true);
	    }
	
	    oS = null;
	    delete sm2.sounds[sID];
	
	    return true;
	
	  };
	
	  /**
	   * Calls the load() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @param {object} oOptions Optional: Sound options
	   */
	
	  this.load = function(sID, oOptions) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	    return sm2.sounds[sID].load(oOptions);
	
	  };
	
	  /**
	   * Calls the unload() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   */
	
	  this.unload = function(sID) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	    return sm2.sounds[sID].unload();
	
	  };
	
	  /**
	   * Calls the onPosition() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @param {number} nPosition The position to watch for
	   * @param {function} oMethod The relevant callback to fire
	   * @param {object} oScope Optional: The scope to apply the callback to
	   * @return {SMSound} The SMSound object
	   */
	
	  this.onPosition = function(sID, nPosition, oMethod, oScope) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	    return sm2.sounds[sID].onposition(nPosition, oMethod, oScope);
	
	  };
	
	  // legacy/backwards-compability: lower-case method name
	  this.onposition = this.onPosition;
	
	  /**
	   * Calls the clearOnPosition() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @param {number} nPosition The position to watch for
	   * @param {function} oMethod Optional: The relevant callback to fire
	   * @return {SMSound} The SMSound object
	   */
	
	  this.clearOnPosition = function(sID, nPosition, oMethod) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	    return sm2.sounds[sID].clearOnPosition(nPosition, oMethod);
	
	  };
	
	  /**
	   * Calls the play() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @param {object} oOptions Optional: Sound options
	   * @return {SMSound} The SMSound object
	   */
	
	  this.play = function(sID, oOptions) {
	
	    var result = null,
	        // legacy function-overloading use case: play('mySound', '/path/to/some.mp3');
	        overloaded = (oOptions && !(oOptions instanceof Object));
	
	    if (!didInit || !sm2.ok()) {
	      complain(sm + '.play(): ' + str(!didInit?'notReady':'notOK'));
	      return false;
	    }
	
	    if (!idCheck(sID, overloaded)) {
	
	      if (!overloaded) {
	        // no sound found for the given ID. Bail.
	        return false;
	      }
	
	      if (overloaded) {
	        oOptions = {
	          url: oOptions
	        };
	      }
	
	      if (oOptions && oOptions.url) {
	        // overloading use case, create+play: .play('someID', {url:'/path/to.mp3'});
	        sm2._wD(sm + '.play(): Attempting to create "' + sID + '"', 1);
	        oOptions.id = sID;
	        result = sm2.createSound(oOptions).play();
	      }
	
	    } else if (overloaded) {
	
	      // existing sound object case
	      oOptions = {
	        url: oOptions
	      };
	
	    }
	
	    if (result === null) {
	      // default case
	      result = sm2.sounds[sID].play(oOptions);
	    }
	
	    return result;
	
	  };
	
	  // just for convenience
	  this.start = this.play;
	
	  /**
	   * Calls the setPosition() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @param {number} nMsecOffset Position (milliseconds)
	   * @return {SMSound} The SMSound object
	   */
	
	  this.setPosition = function(sID, nMsecOffset) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	    return sm2.sounds[sID].setPosition(nMsecOffset);
	
	  };
	
	  /**
	   * Calls the stop() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @return {SMSound} The SMSound object
	   */
	
	  this.stop = function(sID) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	
	    sm2._wD(sm + '.stop(' + sID + ')', 1);
	    return sm2.sounds[sID].stop();
	
	  };
	
	  /**
	   * Stops all currently-playing sounds.
	   */
	
	  this.stopAll = function() {
	
	    var oSound;
	    sm2._wD(sm + '.stopAll()', 1);
	
	    for (oSound in sm2.sounds) {
	      if (sm2.sounds.hasOwnProperty(oSound)) {
	        // apply only to sound objects
	        sm2.sounds[oSound].stop();
	      }
	    }
	
	  };
	
	  /**
	   * Calls the pause() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @return {SMSound} The SMSound object
	   */
	
	  this.pause = function(sID) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	    return sm2.sounds[sID].pause();
	
	  };
	
	  /**
	   * Pauses all currently-playing sounds.
	   */
	
	  this.pauseAll = function() {
	
	    var i;
	    for (i = sm2.soundIDs.length - 1; i >= 0; i--) {
	      sm2.sounds[sm2.soundIDs[i]].pause();
	    }
	
	  };
	
	  /**
	   * Calls the resume() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @return {SMSound} The SMSound object
	   */
	
	  this.resume = function(sID) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	    return sm2.sounds[sID].resume();
	
	  };
	
	  /**
	   * Resumes all currently-paused sounds.
	   */
	
	  this.resumeAll = function() {
	
	    var i;
	    for (i = sm2.soundIDs.length- 1 ; i >= 0; i--) {
	      sm2.sounds[sm2.soundIDs[i]].resume();
	    }
	
	  };
	
	  /**
	   * Calls the togglePause() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @return {SMSound} The SMSound object
	   */
	
	  this.togglePause = function(sID) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	    return sm2.sounds[sID].togglePause();
	
	  };
	
	  /**
	   * Calls the setPan() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @param {number} nPan The pan value (-100 to 100)
	   * @return {SMSound} The SMSound object
	   */
	
	  this.setPan = function(sID, nPan) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	    return sm2.sounds[sID].setPan(nPan);
	
	  };
	
	  /**
	   * Calls the setVolume() method of a SMSound object by ID
	   * Overloaded case: pass only volume argument eg., setVolume(50) to apply to all sounds.
	   *
	   * @param {string} sID The ID of the sound
	   * @param {number} nVol The volume value (0 to 100)
	   * @return {SMSound} The SMSound object
	   */
	
	  this.setVolume = function(sID, nVol) {
	
	    // setVolume(50) function overloading case - apply to all sounds
	
	    var i, j;
	
	    if (sID !== _undefined && !isNaN(sID) && nVol === _undefined) {
	      for (i = 0, j = sm2.soundIDs.length; i < j; i++) {
	        sm2.sounds[sm2.soundIDs[i]].setVolume(sID);
	      }
	      return;
	    }
	
	    // setVolume('mySound', 50) case
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	
	    return sm2.sounds[sID].setVolume(nVol);
	
	  };
	
	  /**
	   * Calls the mute() method of either a single SMSound object by ID, or all sound objects.
	   *
	   * @param {string} sID Optional: The ID of the sound (if omitted, all sounds will be used.)
	   */
	
	  this.mute = function(sID) {
	
	    var i = 0;
	
	    if (sID instanceof String) {
	      sID = null;
	    }
	
	    if (!sID) {
	
	      sm2._wD(sm + '.mute(): Muting all sounds');
	      for (i = sm2.soundIDs.length - 1; i >= 0; i--) {
	        sm2.sounds[sm2.soundIDs[i]].mute();
	      }
	      sm2.muted = true;
	
	    } else {
	
	      if (!idCheck(sID)) {
	        return false;
	      }
	      sm2._wD(sm + '.mute(): Muting "' + sID + '"');
	      return sm2.sounds[sID].mute();
	
	    }
	
	    return true;
	
	  };
	
	  /**
	   * Mutes all sounds.
	   */
	
	  this.muteAll = function() {
	
	    sm2.mute();
	
	  };
	
	  /**
	   * Calls the unmute() method of either a single SMSound object by ID, or all sound objects.
	   *
	   * @param {string} sID Optional: The ID of the sound (if omitted, all sounds will be used.)
	   */
	
	  this.unmute = function(sID) {
	
	    var i;
	
	    if (sID instanceof String) {
	      sID = null;
	    }
	
	    if (!sID) {
	
	      sm2._wD(sm + '.unmute(): Unmuting all sounds');
	      for (i = sm2.soundIDs.length - 1; i >= 0; i--) {
	        sm2.sounds[sm2.soundIDs[i]].unmute();
	      }
	      sm2.muted = false;
	
	    } else {
	
	      if (!idCheck(sID)) {
	        return false;
	      }
	      sm2._wD(sm + '.unmute(): Unmuting "' + sID + '"');
	      return sm2.sounds[sID].unmute();
	
	    }
	
	    return true;
	
	  };
	
	  /**
	   * Unmutes all sounds.
	   */
	
	  this.unmuteAll = function() {
	
	    sm2.unmute();
	
	  };
	
	  /**
	   * Calls the toggleMute() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @return {SMSound} The SMSound object
	   */
	
	  this.toggleMute = function(sID) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	    return sm2.sounds[sID].toggleMute();
	
	  };
	
	  /**
	   * Retrieves the memory used by the flash plugin.
	   *
	   * @return {number} The amount of memory in use
	   */
	
	  this.getMemoryUse = function() {
	
	    // flash-only
	    var ram = 0;
	
	    if (flash && fV !== 8) {
	      ram = parseInt(flash._getMemoryUse(), 10);
	    }
	
	    return ram;
	
	  };
	
	  /**
	   * Undocumented: NOPs soundManager and all SMSound objects.
	   */
	
	  this.disable = function(bNoDisable) {
	
	    // destroy all functions
	    var i;
	
	    if (bNoDisable === _undefined) {
	      bNoDisable = false;
	    }
	
	    if (disabled) {
	      return false;
	    }
	
	    disabled = true;
	    _wDS('shutdown', 1);
	
	    for (i = sm2.soundIDs.length - 1; i >= 0; i--) {
	      disableObject(sm2.sounds[sm2.soundIDs[i]]);
	    }
	
	    // fire "complete", despite fail
	    initComplete(bNoDisable);
	    event.remove(window, 'load', initUserOnload);
	
	    return true;
	
	  };
	
	  /**
	   * Determines playability of a MIME type, eg. 'audio/mp3'.
	   */
	
	  this.canPlayMIME = function(sMIME) {
	
	    var result;
	
	    if (sm2.hasHTML5) {
	      result = html5CanPlay({
	        type: sMIME
	      });
	    }
	
	    if (!result && needsFlash) {
	      // if flash 9, test netStream (movieStar) types as well.
	      result = (sMIME && sm2.ok() ? !!((fV > 8 ? sMIME.match(netStreamMimeTypes) : null) || sMIME.match(sm2.mimePattern)) : null); // TODO: make less "weird" (per JSLint)
	    }
	
	    return result;
	
	  };
	
	  /**
	   * Determines playability of a URL based on audio support.
	   *
	   * @param {string} sURL The URL to test
	   * @return {boolean} URL playability
	   */
	
	  this.canPlayURL = function(sURL) {
	
	    var result;
	
	    if (sm2.hasHTML5) {
	      result = html5CanPlay({
	        url: sURL
	      });
	    }
	
	    if (!result && needsFlash) {
	      result = (sURL && sm2.ok() ? !!(sURL.match(sm2.filePattern)) : null);
	    }
	
	    return result;
	
	  };
	
	  /**
	   * Determines playability of an HTML DOM &lt;a&gt; object (or similar object literal) based on audio support.
	   *
	   * @param {object} oLink an HTML DOM &lt;a&gt; object or object literal including href and/or type attributes
	   * @return {boolean} URL playability
	   */
	
	  this.canPlayLink = function(oLink) {
	
	    if (oLink.type !== _undefined && oLink.type) {
	      if (sm2.canPlayMIME(oLink.type)) {
	        return true;
	      }
	    }
	
	    return sm2.canPlayURL(oLink.href);
	
	  };
	
	  /**
	   * Retrieves a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @return {SMSound} The SMSound object
	   */
	
	  this.getSoundById = function(sID, _suppressDebug) {
	
	    if (!sID) {
	      return null;
	    }
	
	    var result = sm2.sounds[sID];
	
	    // <d>
	    if (!result && !_suppressDebug) {
	      sm2._wD(sm + '.getSoundById(): Sound "' + sID + '" not found.', 2);
	    }
	    // </d>
	
	    return result;
	
	  };
	
	  /**
	   * Queues a callback for execution when SoundManager has successfully initialized.
	   *
	   * @param {function} oMethod The callback method to fire
	   * @param {object} oScope Optional: The scope to apply to the callback
	   */
	
	  this.onready = function(oMethod, oScope) {
	
	    var sType = 'onready',
	        result = false;
	
	    if (typeof oMethod === 'function') {
	
	      // <d>
	      if (didInit) {
	        sm2._wD(str('queue', sType));
	      }
	      // </d>
	
	      if (!oScope) {
	        oScope = window;
	      }
	
	      addOnEvent(sType, oMethod, oScope);
	      processOnEvents();
	
	      result = true;
	
	    } else {
	
	      throw str('needFunction', sType);
	
	    }
	
	    return result;
	
	  };
	
	  /**
	   * Queues a callback for execution when SoundManager has failed to initialize.
	   *
	   * @param {function} oMethod The callback method to fire
	   * @param {object} oScope Optional: The scope to apply to the callback
	   */
	
	  this.ontimeout = function(oMethod, oScope) {
	
	    var sType = 'ontimeout',
	        result = false;
	
	    if (typeof oMethod === 'function') {
	
	      // <d>
	      if (didInit) {
	        sm2._wD(str('queue', sType));
	      }
	      // </d>
	
	      if (!oScope) {
	        oScope = window;
	      }
	
	      addOnEvent(sType, oMethod, oScope);
	      processOnEvents({type:sType});
	
	      result = true;
	
	    } else {
	
	      throw str('needFunction', sType);
	
	    }
	
	    return result;
	
	  };
	
	  /**
	   * Writes console.log()-style debug output to a console or in-browser element.
	   * Applies when debugMode = true
	   *
	   * @param {string} sText The console message
	   * @param {object} nType Optional log level (number), or object. Number case: Log type/style where 0 = 'info', 1 = 'warn', 2 = 'error'. Object case: Object to be dumped.
	   */
	
	  this._writeDebug = function(sText, sTypeOrObject) {
	
	    // pseudo-private console.log()-style output
	    // <d>
	
	    var sDID = 'soundmanager-debug', o, oItem;
	
	    if (!sm2.setupOptions.debugMode) {
	      return false;
	    }
	
	    if (hasConsole && sm2.useConsole) {
	      if (sTypeOrObject && typeof sTypeOrObject === 'object') {
	        // object passed; dump to console.
	        console.log(sText, sTypeOrObject);
	      } else if (debugLevels[sTypeOrObject] !== _undefined) {
	        console[debugLevels[sTypeOrObject]](sText);
	      } else {
	        console.log(sText);
	      }
	      if (sm2.consoleOnly) {
	        return true;
	      }
	    }
	
	    o = id(sDID);
	
	    if (!o) {
	      return false;
	    }
	
	    oItem = doc.createElement('div');
	
	    if (++wdCount % 2 === 0) {
	      oItem.className = 'sm2-alt';
	    }
	
	    if (sTypeOrObject === _undefined) {
	      sTypeOrObject = 0;
	    } else {
	      sTypeOrObject = parseInt(sTypeOrObject, 10);
	    }
	
	    oItem.appendChild(doc.createTextNode(sText));
	
	    if (sTypeOrObject) {
	      if (sTypeOrObject >= 2) {
	        oItem.style.fontWeight = 'bold';
	      }
	      if (sTypeOrObject === 3) {
	        oItem.style.color = '#ff3333';
	      }
	    }
	
	    // top-to-bottom
	    // o.appendChild(oItem);
	
	    // bottom-to-top
	    o.insertBefore(oItem, o.firstChild);
	
	    o = null;
	    // </d>
	
	    return true;
	
	  };
	
	  // <d>
	  // last-resort debugging option
	  if (wl.indexOf('sm2-debug=alert') !== -1) {
	    this._writeDebug = function(sText) {
	      window.alert(sText);
	    };
	  }
	  // </d>
	
	  // alias
	  this._wD = this._writeDebug;
	
	  /**
	   * Provides debug / state information on all SMSound objects.
	   */
	
	  this._debug = function() {
	
	    // <d>
	    var i, j;
	    _wDS('currentObj', 1);
	
	    for (i = 0, j = sm2.soundIDs.length; i < j; i++) {
	      sm2.sounds[sm2.soundIDs[i]]._debug();
	    }
	    // </d>
	
	  };
	
	  /**
	   * Restarts and re-initializes the SoundManager instance.
	   *
	   * @param {boolean} resetEvents Optional: When true, removes all registered onready and ontimeout event callbacks.
	   * @param {boolean} excludeInit Options: When true, does not call beginDelayedInit() (which would restart SM2).
	   * @return {object} soundManager The soundManager instance.
	   */
	
	  this.reboot = function(resetEvents, excludeInit) {
	
	    // reset some (or all) state, and re-init unless otherwise specified.
	
	    // <d>
	    if (sm2.soundIDs.length) {
	      sm2._wD('Destroying ' + sm2.soundIDs.length + ' SMSound object' + (sm2.soundIDs.length !== 1 ? 's' : '') + '...');
	    }
	    // </d>
	
	    var i, j, k;
	
	    for (i = sm2.soundIDs.length- 1 ; i >= 0; i--) {
	      sm2.sounds[sm2.soundIDs[i]].destruct();
	    }
	
	    // trash ze flash (remove from the DOM)
	
	    if (flash) {
	
	      try {
	
	        if (isIE) {
	          oRemovedHTML = flash.innerHTML;
	        }
	
	        oRemoved = flash.parentNode.removeChild(flash);
	
	      } catch(e) {
	
	        // Remove failed? May be due to flash blockers silently removing the SWF object/embed node from the DOM. Warn and continue.
	
	        _wDS('badRemove', 2);
	
	      }
	
	    }
	
	    // actually, force recreate of movie.
	
	    oRemovedHTML = oRemoved = needsFlash = flash = null;
	
	    sm2.enabled = didDCLoaded = didInit = waitingForEI = initPending = didAppend = appendSuccess = disabled = useGlobalHTML5Audio = sm2.swfLoaded = false;
	
	    sm2.soundIDs = [];
	    sm2.sounds = {};
	
	    idCounter = 0;
	    didSetup = false;
	
	    if (!resetEvents) {
	      // reset callbacks for onready, ontimeout etc. so that they will fire again on re-init
	      for (i in on_queue) {
	        if (on_queue.hasOwnProperty(i)) {
	          for (j = 0, k = on_queue[i].length; j < k; j++) {
	            on_queue[i][j].fired = false;
	          }
	        }
	      }
	    } else {
	      // remove all callbacks entirely
	      on_queue = [];
	    }
	
	    // <d>
	    if (!excludeInit) {
	      sm2._wD(sm + ': Rebooting...');
	    }
	    // </d>
	
	    // reset HTML5 and flash canPlay test results
	
	    sm2.html5 = {
	      'usingFlash': null
	    };
	
	    sm2.flash = {};
	
	    // reset device-specific HTML/flash mode switches
	
	    sm2.html5Only = false;
	    sm2.ignoreFlash = false;
	
	    window.setTimeout(function() {
	
	      // by default, re-init
	
	      if (!excludeInit) {
	        sm2.beginDelayedInit();
	      }
	
	    }, 20);
	
	    return sm2;
	
	  };
	
	  this.reset = function() {
	
	    /**
	     * Shuts down and restores the SoundManager instance to its original loaded state, without an explicit reboot. All onready/ontimeout handlers are removed.
	     * After this call, SM2 may be re-initialized via soundManager.beginDelayedInit().
	     * @return {object} soundManager The soundManager instance.
	     */
	
	    _wDS('reset');
	    return sm2.reboot(true, true);
	
	  };
	
	  /**
	   * Undocumented: Determines the SM2 flash movie's load progress.
	   *
	   * @return {number or null} Percent loaded, or if invalid/unsupported, null.
	   */
	
	  this.getMoviePercent = function() {
	
	    /**
	     * Interesting syntax notes...
	     * Flash/ExternalInterface (ActiveX/NPAPI) bridge methods are not typeof "function" nor instanceof Function, but are still valid.
	     * Additionally, JSLint dislikes ('PercentLoaded' in flash)-style syntax and recommends hasOwnProperty(), which does not work in this case.
	     * Furthermore, using (flash && flash.PercentLoaded) causes IE to throw "object doesn't support this property or method".
	     * Thus, 'in' syntax must be used.
	     */
	
	    return (flash && 'PercentLoaded' in flash ? flash.PercentLoaded() : null); // Yes, JSLint. See nearby comment in source for explanation.
	
	  };
	
	  /**
	   * Additional helper for manually invoking SM2's init process after DOM Ready / window.onload().
	   */
	
	  this.beginDelayedInit = function() {
	
	    windowLoaded = true;
	    domContentLoaded();
	
	    setTimeout(function() {
	
	      if (initPending) {
	        return false;
	      }
	
	      createMovie();
	      initMovie();
	      initPending = true;
	
	      return true;
	
	    }, 20);
	
	    delayWaitForEI();
	
	  };
	
	  /**
	   * Destroys the SoundManager instance and all SMSound instances.
	   */
	
	  this.destruct = function() {
	
	    sm2._wD(sm + '.destruct()');
	    sm2.disable(true);
	
	  };
	
	  /**
	   * SMSound() (sound object) constructor
	   * ------------------------------------
	   *
	   * @param {object} oOptions Sound options (id and url are required attributes)
	   * @return {SMSound} The new SMSound object
	   */
	
	  SMSound = function(oOptions) {
	
	    var s = this, resetProperties, add_html5_events, remove_html5_events, stop_html5_timer, start_html5_timer, attachOnPosition, onplay_called = false, onPositionItems = [], onPositionFired = 0, detachOnPosition, applyFromTo, lastURL = null, lastHTML5State, urlOmitted;
	
	    lastHTML5State = {
	      // tracks duration + position (time)
	      duration: null,
	      time: null
	    };
	
	    this.id = oOptions.id;
	
	    // legacy
	    this.sID = this.id;
	
	    this.url = oOptions.url;
	    this.options = mixin(oOptions);
	
	    // per-play-instance-specific options
	    this.instanceOptions = this.options;
	
	    // short alias
	    this._iO = this.instanceOptions;
	
	    // assign property defaults
	    this.pan = this.options.pan;
	    this.volume = this.options.volume;
	
	    // whether or not this object is using HTML5
	    this.isHTML5 = false;
	
	    // internal HTML5 Audio() object reference
	    this._a = null;
	
	    // for flash 8 special-case createSound() without url, followed by load/play with url case
	    urlOmitted = (this.url ? false : true);
	
	    /**
	     * SMSound() public methods
	     * ------------------------
	     */
	
	    this.id3 = {};
	
	    /**
	     * Writes SMSound object parameters to debug console
	     */
	
	    this._debug = function() {
	
	      // <d>
	      sm2._wD(s.id + ': Merged options:', s.options);
	      // </d>
	
	    };
	
	    /**
	     * Begins loading a sound per its *url*.
	     *
	     * @param {object} oOptions Optional: Sound options
	     * @return {SMSound} The SMSound object
	     */
	
	    this.load = function(oOptions) {
	
	      var oSound = null, instanceOptions;
	
	      if (oOptions !== _undefined) {
	        s._iO = mixin(oOptions, s.options);
	      } else {
	        oOptions = s.options;
	        s._iO = oOptions;
	        if (lastURL && lastURL !== s.url) {
	          _wDS('manURL');
	          s._iO.url = s.url;
	          s.url = null;
	        }
	      }
	
	      if (!s._iO.url) {
	        s._iO.url = s.url;
	      }
	
	      s._iO.url = parseURL(s._iO.url);
	
	      // ensure we're in sync
	      s.instanceOptions = s._iO;
	
	      // local shortcut
	      instanceOptions = s._iO;
	
	      sm2._wD(s.id + ': load (' + instanceOptions.url + ')');
	
	      if (!instanceOptions.url && !s.url) {
	        sm2._wD(s.id + ': load(): url is unassigned. Exiting.', 2);
	        return s;
	      }
	
	      // <d>
	      if (!s.isHTML5 && fV === 8 && !s.url && !instanceOptions.autoPlay) {
	        // flash 8 load() -> play() won't work before onload has fired.
	        sm2._wD(s.id + ': Flash 8 load() limitation: Wait for onload() before calling play().', 1);
	      }
	      // </d>
	
	      if (instanceOptions.url === s.url && s.readyState !== 0 && s.readyState !== 2) {
	        _wDS('onURL', 1);
	        // if loaded and an onload() exists, fire immediately.
	        if (s.readyState === 3 && instanceOptions.onload) {
	          // assume success based on truthy duration.
	          wrapCallback(s, function() {
	            instanceOptions.onload.apply(s, [(!!s.duration)]);
	          });
	        }
	        return s;
	      }
	
	      // reset a few state properties
	
	      s.loaded = false;
	      s.readyState = 1;
	      s.playState = 0;
	      s.id3 = {};
	
	      // TODO: If switching from HTML5 -> flash (or vice versa), stop currently-playing audio.
	
	      if (html5OK(instanceOptions)) {
	
	        oSound = s._setup_html5(instanceOptions);
	
	        if (!oSound._called_load) {
	
	          s._html5_canplay = false;
	
	          // TODO: review called_load / html5_canplay logic
	
	          // if url provided directly to load(), assign it here.
	
	          if (s.url !== instanceOptions.url) {
	
	            sm2._wD(_wDS('manURL') + ': ' + instanceOptions.url);
	
	            s._a.src = instanceOptions.url;
	
	            // TODO: review / re-apply all relevant options (volume, loop, onposition etc.)
	
	            // reset position for new URL
	            s.setPosition(0);
	
	          }
	
	          // given explicit load call, try to preload.
	
	          // early HTML5 implementation (non-standard)
	          s._a.autobuffer = 'auto';
	
	          // standard property, values: none / metadata / auto
	          // reference: http://msdn.microsoft.com/en-us/library/ie/ff974759%28v=vs.85%29.aspx
	          s._a.preload = 'auto';
	
	          s._a._called_load = true;
	
	        } else {
	
	          sm2._wD(s.id + ': Ignoring request to load again');
	
	        }
	
	      } else {
	
	        if (sm2.html5Only) {
	          sm2._wD(s.id + ': No flash support. Exiting.');
	          return s;
	        }
	
	        if (s._iO.url && s._iO.url.match(/data\:/i)) {
	          // data: URIs not supported by Flash, either.
	          sm2._wD(s.id + ': data: URIs not supported via Flash. Exiting.');
	          return s;
	        }
	
	        try {
	          s.isHTML5 = false;
	          s._iO = policyFix(loopFix(instanceOptions));
	          // if we have "position", disable auto-play as we'll be seeking to that position at onload().
	          if (s._iO.autoPlay && (s._iO.position || s._iO.from)) {
	            sm2._wD(s.id + ': Disabling autoPlay because of non-zero offset case');
	            s._iO.autoPlay = false;
	          }
	          // re-assign local shortcut
	          instanceOptions = s._iO;
	          if (fV === 8) {
	            flash._load(s.id, instanceOptions.url, instanceOptions.stream, instanceOptions.autoPlay, instanceOptions.usePolicyFile);
	          } else {
	            flash._load(s.id, instanceOptions.url, !!(instanceOptions.stream), !!(instanceOptions.autoPlay), instanceOptions.loops || 1, !!(instanceOptions.autoLoad), instanceOptions.usePolicyFile);
	          }
	        } catch(e) {
	          _wDS('smError', 2);
	          debugTS('onload', false);
	          catchError({
	            type: 'SMSOUND_LOAD_JS_EXCEPTION',
	            fatal: true
	          });
	        }
	
	      }
	
	      // after all of this, ensure sound url is up to date.
	      s.url = instanceOptions.url;
	
	      return s;
	
	    };
	
	    /**
	     * Unloads a sound, canceling any open HTTP requests.
	     *
	     * @return {SMSound} The SMSound object
	     */
	
	    this.unload = function() {
	
	      // Flash 8/AS2 can't "close" a stream - fake it by loading an empty URL
	      // Flash 9/AS3: Close stream, preventing further load
	      // HTML5: Most UAs will use empty URL
	
	      if (s.readyState !== 0) {
	
	        sm2._wD(s.id + ': unload()');
	
	        if (!s.isHTML5) {
	
	          if (fV === 8) {
	            flash._unload(s.id, emptyURL);
	          } else {
	            flash._unload(s.id);
	          }
	
	        } else {
	
	          stop_html5_timer();
	
	          if (s._a) {
	
	            s._a.pause();
	
	            // update empty URL, too
	            lastURL = html5Unload(s._a);
	
	          }
	
	        }
	
	        // reset load/status flags
	        resetProperties();
	
	      }
	
	      return s;
	
	    };
	
	    /**
	     * Unloads and destroys a sound.
	     */
	
	    this.destruct = function(_bFromSM) {
	
	      sm2._wD(s.id + ': Destruct');
	
	      if (!s.isHTML5) {
	
	        // kill sound within Flash
	        // Disable the onfailure handler
	        s._iO.onfailure = null;
	        flash._destroySound(s.id);
	
	      } else {
	
	        stop_html5_timer();
	
	        if (s._a) {
	          s._a.pause();
	          html5Unload(s._a);
	          if (!useGlobalHTML5Audio) {
	            remove_html5_events();
	          }
	          // break obvious circular reference
	          s._a._s = null;
	          s._a = null;
	        }
	
	      }
	
	      if (!_bFromSM) {
	        // ensure deletion from controller
	        sm2.destroySound(s.id, true);
	      }
	
	    };
	
	    /**
	     * Begins playing a sound.
	     *
	     * @param {object} oOptions Optional: Sound options
	     * @return {SMSound} The SMSound object
	     */
	
	    this.play = function(oOptions, _updatePlayState) {
	
	      var fN, allowMulti, a, onready,
	          audioClone, onended, oncanplay,
	          startOK = true,
	          exit = null;
	
	      // <d>
	      fN = s.id + ': play(): ';
	      // </d>
	
	      // default to true
	      _updatePlayState = (_updatePlayState === _undefined ? true : _updatePlayState);
	
	      if (!oOptions) {
	        oOptions = {};
	      }
	
	      // first, use local URL (if specified)
	      if (s.url) {
	        s._iO.url = s.url;
	      }
	
	      // mix in any options defined at createSound()
	      s._iO = mixin(s._iO, s.options);
	
	      // mix in any options specific to this method
	      s._iO = mixin(oOptions, s._iO);
	
	      s._iO.url = parseURL(s._iO.url);
	
	      s.instanceOptions = s._iO;
	
	      // RTMP-only
	      if (!s.isHTML5 && s._iO.serverURL && !s.connected) {
	        if (!s.getAutoPlay()) {
	          sm2._wD(fN +' Netstream not connected yet - setting autoPlay');
	          s.setAutoPlay(true);
	        }
	        // play will be called in onconnect()
	        return s;
	      }
	
	      if (html5OK(s._iO)) {
	        s._setup_html5(s._iO);
	        start_html5_timer();
	      }
	
	      if (s.playState === 1 && !s.paused) {
	
	        allowMulti = s._iO.multiShot;
	
	        if (!allowMulti) {
	
	          sm2._wD(fN + 'Already playing (one-shot)', 1);
	
	          if (s.isHTML5) {
	            // go back to original position.
	            s.setPosition(s._iO.position);
	          }
	
	          exit = s;
	
	        } else {
	          sm2._wD(fN + 'Already playing (multi-shot)', 1);
	        }
	
	      }
	
	      if (exit !== null) {
	        return exit;
	      }
	
	      // edge case: play() with explicit URL parameter
	      if (oOptions.url && oOptions.url !== s.url) {
	
	        // special case for createSound() followed by load() / play() with url; avoid double-load case.
	        if (!s.readyState && !s.isHTML5 && fV === 8 && urlOmitted) {
	
	          urlOmitted = false;
	
	        } else {
	
	          // load using merged options
	          s.load(s._iO);
	
	        }
	
	      }
	
	      if (!s.loaded) {
	
	        if (s.readyState === 0) {
	
	          sm2._wD(fN + 'Attempting to load');
	
	          // try to get this sound playing ASAP
	          if (!s.isHTML5 && !sm2.html5Only) {
	
	            // flash: assign directly because setAutoPlay() increments the instanceCount
	            s._iO.autoPlay = true;
	            s.load(s._iO);
	
	          } else if (s.isHTML5) {
	
	            // iOS needs this when recycling sounds, loading a new URL on an existing object.
	            s.load(s._iO);
	
	          } else {
	
	            sm2._wD(fN + 'Unsupported type. Exiting.');
	            exit = s;
	
	          }
	
	          // HTML5 hack - re-set instanceOptions?
	          s.instanceOptions = s._iO;
	
	        } else if (s.readyState === 2) {
	
	          sm2._wD(fN + 'Could not load - exiting', 2);
	          exit = s;
	
	        } else {
	
	          sm2._wD(fN + 'Loading - attempting to play...');
	
	        }
	
	      } else {
	
	        // "play()"
	        sm2._wD(fN.substr(0, fN.lastIndexOf(':')));
	
	      }
	
	      if (exit !== null) {
	        return exit;
	      }
	
	      if (!s.isHTML5 && fV === 9 && s.position > 0 && s.position === s.duration) {
	        // flash 9 needs a position reset if play() is called while at the end of a sound.
	        sm2._wD(fN + 'Sound at end, resetting to position: 0');
	        oOptions.position = 0;
	      }
	
	      /**
	       * Streams will pause when their buffer is full if they are being loaded.
	       * In this case paused is true, but the song hasn't started playing yet.
	       * If we just call resume() the onplay() callback will never be called.
	       * So only call resume() if the position is > 0.
	       * Another reason is because options like volume won't have been applied yet.
	       * For normal sounds, just resume.
	       */
	
	      if (s.paused && s.position >= 0 && (!s._iO.serverURL || s.position > 0)) {
	
	        // https://gist.github.com/37b17df75cc4d7a90bf6
	        sm2._wD(fN + 'Resuming from paused state', 1);
	        s.resume();
	
	      } else {
	
	        s._iO = mixin(oOptions, s._iO);
	
	        /**
	         * Preload in the event of play() with position under Flash,
	         * or from/to parameters and non-RTMP case
	         */
	        if (((!s.isHTML5 && s._iO.position !== null && s._iO.position > 0) || (s._iO.from !== null && s._iO.from > 0) || s._iO.to !== null) && s.instanceCount === 0 && s.playState === 0 && !s._iO.serverURL) {
	
	          onready = function() {
	            // sound "canplay" or onload()
	            // re-apply position/from/to to instance options, and start playback
	            s._iO = mixin(oOptions, s._iO);
	            s.play(s._iO);
	          };
	
	          // HTML5 needs to at least have "canplay" fired before seeking.
	          if (s.isHTML5 && !s._html5_canplay) {
	
	            // this hasn't been loaded yet. load it first, and then do this again.
	            sm2._wD(fN + 'Beginning load for non-zero offset case');
	
	            s.load({
	              // note: custom HTML5-only event added for from/to implementation.
	              _oncanplay: onready
	            });
	
	            exit = false;
	
	          } else if (!s.isHTML5 && !s.loaded && (!s.readyState || s.readyState !== 2)) {
	
	            // to be safe, preload the whole thing in Flash.
	
	            sm2._wD(fN + 'Preloading for non-zero offset case');
	
	            s.load({
	              onload: onready
	            });
	
	            exit = false;
	
	          }
	
	          if (exit !== null) {
	            return exit;
	          }
	
	          // otherwise, we're ready to go. re-apply local options, and continue
	
	          s._iO = applyFromTo();
	
	        }
	
	        // sm2._wD(fN + 'Starting to play');
	
	        // increment instance counter, where enabled + supported
	        if (!s.instanceCount || s._iO.multiShotEvents || (s.isHTML5 && s._iO.multiShot && !useGlobalHTML5Audio) || (!s.isHTML5 && fV > 8 && !s.getAutoPlay())) {
	          s.instanceCount++;
	        }
	
	        // if first play and onposition parameters exist, apply them now
	        if (s._iO.onposition && s.playState === 0) {
	          attachOnPosition(s);
	        }
	
	        s.playState = 1;
	        s.paused = false;
	
	        s.position = (s._iO.position !== _undefined && !isNaN(s._iO.position) ? s._iO.position : 0);
	
	        if (!s.isHTML5) {
	          s._iO = policyFix(loopFix(s._iO));
	        }
	
	        if (s._iO.onplay && _updatePlayState) {
	          s._iO.onplay.apply(s);
	          onplay_called = true;
	        }
	
	        s.setVolume(s._iO.volume, true);
	        s.setPan(s._iO.pan, true);
	
	        if (!s.isHTML5) {
	
	          startOK = flash._start(s.id, s._iO.loops || 1, (fV === 9 ? s.position : s.position / msecScale), s._iO.multiShot || false);
	
	          if (fV === 9 && !startOK) {
	            // edge case: no sound hardware, or 32-channel flash ceiling hit.
	            // applies only to Flash 9, non-NetStream/MovieStar sounds.
	            // http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/media/Sound.html#play%28%29
	            sm2._wD(fN + 'No sound hardware, or 32-sound ceiling hit', 2);
	            if (s._iO.onplayerror) {
	              s._iO.onplayerror.apply(s);
	            }
	
	          }
	
	        } else {
	
	          if (s.instanceCount < 2) {
	
	            // HTML5 single-instance case
	
	            start_html5_timer();
	
	            a = s._setup_html5();
	
	            s.setPosition(s._iO.position);
	
	            a.play();
	
	          } else {
	
	            // HTML5 multi-shot case
	
	            sm2._wD(s.id + ': Cloning Audio() for instance #' + s.instanceCount + '...');
	
	            audioClone = new Audio(s._iO.url);
	
	            onended = function() {
	              event.remove(audioClone, 'ended', onended);
	              s._onfinish(s);
	              // cleanup
	              html5Unload(audioClone);
	              audioClone = null;
	            };
	
	            oncanplay = function() {
	              event.remove(audioClone, 'canplay', oncanplay);
	              try {
	                audioClone.currentTime = s._iO.position/msecScale;
	              } catch(err) {
	                complain(s.id + ': multiShot play() failed to apply position of ' + (s._iO.position/msecScale));
	              }
	              audioClone.play();
	            };
	
	            event.add(audioClone, 'ended', onended);
	
	            // apply volume to clones, too
	            if (s._iO.volume !== _undefined) {
	              audioClone.volume = Math.max(0, Math.min(1, s._iO.volume/100));
	            }
	
	            // playing multiple muted sounds? if you do this, you're weird ;) - but let's cover it.
	            if (s.muted) {
	              audioClone.muted = true;
	            }
	
	            if (s._iO.position) {
	              // HTML5 audio can't seek before onplay() event has fired.
	              // wait for canplay, then seek to position and start playback.
	              event.add(audioClone, 'canplay', oncanplay);
	            } else {
	              // begin playback at currentTime: 0
	              audioClone.play();
	            }
	
	          }
	
	        }
	
	      }
	
	      return s;
	
	    };
	
	    // just for convenience
	    this.start = this.play;
	
	    /**
	     * Stops playing a sound (and optionally, all sounds)
	     *
	     * @param {boolean} bAll Optional: Whether to stop all sounds
	     * @return {SMSound} The SMSound object
	     */
	
	    this.stop = function(bAll) {
	
	      var instanceOptions = s._iO,
	          originalPosition;
	
	      if (s.playState === 1) {
	
	        sm2._wD(s.id + ': stop()');
	
	        s._onbufferchange(0);
	        s._resetOnPosition(0);
	        s.paused = false;
	
	        if (!s.isHTML5) {
	          s.playState = 0;
	        }
	
	        // remove onPosition listeners, if any
	        detachOnPosition();
	
	        // and "to" position, if set
	        if (instanceOptions.to) {
	          s.clearOnPosition(instanceOptions.to);
	        }
	
	        if (!s.isHTML5) {
	
	          flash._stop(s.id, bAll);
	
	          // hack for netStream: just unload
	          if (instanceOptions.serverURL) {
	            s.unload();
	          }
	
	        } else {
	
	          if (s._a) {
	
	            originalPosition = s.position;
	
	            // act like Flash, though
	            s.setPosition(0);
	
	            // hack: reflect old position for onstop() (also like Flash)
	            s.position = originalPosition;
	
	            // html5 has no stop()
	            // NOTE: pausing means iOS requires interaction to resume.
	            s._a.pause();
	
	            s.playState = 0;
	
	            // and update UI
	            s._onTimer();
	
	            stop_html5_timer();
	
	          }
	
	        }
	
	        s.instanceCount = 0;
	        s._iO = {};
	
	        if (instanceOptions.onstop) {
	          instanceOptions.onstop.apply(s);
	        }
	
	      }
	
	      return s;
	
	    };
	
	    /**
	     * Undocumented/internal: Sets autoPlay for RTMP.
	     *
	     * @param {boolean} autoPlay state
	     */
	
	    this.setAutoPlay = function(autoPlay) {
	
	      sm2._wD(s.id + ': Autoplay turned ' + (autoPlay ? 'on' : 'off'));
	      s._iO.autoPlay = autoPlay;
	
	      if (!s.isHTML5) {
	        flash._setAutoPlay(s.id, autoPlay);
	        if (autoPlay) {
	          // only increment the instanceCount if the sound isn't loaded (TODO: verify RTMP)
	          if (!s.instanceCount && s.readyState === 1) {
	            s.instanceCount++;
	            sm2._wD(s.id + ': Incremented instance count to '+s.instanceCount);
	          }
	        }
	      }
	
	    };
	
	    /**
	     * Undocumented/internal: Returns the autoPlay boolean.
	     *
	     * @return {boolean} The current autoPlay value
	     */
	
	    this.getAutoPlay = function() {
	
	      return s._iO.autoPlay;
	
	    };
	
	    /**
	     * Sets the position of a sound.
	     *
	     * @param {number} nMsecOffset Position (milliseconds)
	     * @return {SMSound} The SMSound object
	     */
	
	    this.setPosition = function(nMsecOffset) {
	
	      if (nMsecOffset === _undefined) {
	        nMsecOffset = 0;
	      }
	
	      var position, position1K,
	          // Use the duration from the instance options, if we don't have a track duration yet.
	          // position >= 0 and <= current available (loaded) duration
	          offset = (s.isHTML5 ? Math.max(nMsecOffset, 0) : Math.min(s.duration || s._iO.duration, Math.max(nMsecOffset, 0)));
	
	      s.position = offset;
	      position1K = s.position/msecScale;
	      s._resetOnPosition(s.position);
	      s._iO.position = offset;
	
	      if (!s.isHTML5) {
	
	        position = (fV === 9 ? s.position : position1K);
	
	        if (s.readyState && s.readyState !== 2) {
	          // if paused or not playing, will not resume (by playing)
	          flash._setPosition(s.id, position, (s.paused || !s.playState), s._iO.multiShot);
	        }
	
	      } else if (s._a) {
	
	        // Set the position in the canplay handler if the sound is not ready yet
	        if (s._html5_canplay) {
	
	          if (s._a.currentTime !== position1K) {
	
	            /**
	             * DOM/JS errors/exceptions to watch out for:
	             * if seek is beyond (loaded?) position, "DOM exception 11"
	             * "INDEX_SIZE_ERR": DOM exception 1
	             */
	            sm2._wD(s.id + ': setPosition(' + position1K + ')');
	
	            try {
	              s._a.currentTime = position1K;
	              if (s.playState === 0 || s.paused) {
	                // allow seek without auto-play/resume
	                s._a.pause();
	              }
	            } catch(e) {
	              sm2._wD(s.id + ': setPosition(' + position1K + ') failed: ' + e.message, 2);
	            }
	
	          }
	
	        } else if (position1K) {
	
	          // warn on non-zero seek attempts
	          sm2._wD(s.id + ': setPosition(' + position1K + '): Cannot seek yet, sound not ready', 2);
	          return s;
	
	        }
	
	        if (s.paused) {
	
	          // if paused, refresh UI right away by forcing update
	          s._onTimer(true);
	
	        }
	
	      }
	
	      return s;
	
	    };
	
	    /**
	     * Pauses sound playback.
	     *
	     * @return {SMSound} The SMSound object
	     */
	
	    this.pause = function(_bCallFlash) {
	
	      if (s.paused || (s.playState === 0 && s.readyState !== 1)) {
	        return s;
	      }
	
	      sm2._wD(s.id + ': pause()');
	      s.paused = true;
	
	      if (!s.isHTML5) {
	        if (_bCallFlash || _bCallFlash === _undefined) {
	          flash._pause(s.id, s._iO.multiShot);
	        }
	      } else {
	        s._setup_html5().pause();
	        stop_html5_timer();
	      }
	
	      if (s._iO.onpause) {
	        s._iO.onpause.apply(s);
	      }
	
	      return s;
	
	    };
	
	    /**
	     * Resumes sound playback.
	     *
	     * @return {SMSound} The SMSound object
	     */
	
	    /**
	     * When auto-loaded streams pause on buffer full they have a playState of 0.
	     * We need to make sure that the playState is set to 1 when these streams "resume".
	     * When a paused stream is resumed, we need to trigger the onplay() callback if it
	     * hasn't been called already. In this case since the sound is being played for the
	     * first time, I think it's more appropriate to call onplay() rather than onresume().
	     */
	
	    this.resume = function() {
	
	      var instanceOptions = s._iO;
	
	      if (!s.paused) {
	        return s;
	      }
	
	      sm2._wD(s.id + ': resume()');
	      s.paused = false;
	      s.playState = 1;
	
	      if (!s.isHTML5) {
	
	        if (instanceOptions.isMovieStar && !instanceOptions.serverURL) {
	          // Bizarre Webkit bug (Chrome reported via 8tracks.com dudes): AAC content paused for 30+ seconds(?) will not resume without a reposition.
	          s.setPosition(s.position);
	        }
	
	        // flash method is toggle-based (pause/resume)
	        flash._pause(s.id, instanceOptions.multiShot);
	
	      } else {
	
	        s._setup_html5().play();
	        start_html5_timer();
	
	      }
	
	      if (!onplay_called && instanceOptions.onplay) {
	
	        instanceOptions.onplay.apply(s);
	        onplay_called = true;
	
	      } else if (instanceOptions.onresume) {
	
	        instanceOptions.onresume.apply(s);
	
	      }
	
	      return s;
	
	    };
	
	    /**
	     * Toggles sound playback.
	     *
	     * @return {SMSound} The SMSound object
	     */
	
	    this.togglePause = function() {
	
	      sm2._wD(s.id + ': togglePause()');
	
	      if (s.playState === 0) {
	        s.play({
	          position: (fV === 9 && !s.isHTML5 ? s.position : s.position / msecScale)
	        });
	        return s;
	      }
	
	      if (s.paused) {
	        s.resume();
	      } else {
	        s.pause();
	      }
	
	      return s;
	
	    };
	
	    /**
	     * Sets the panning (L-R) effect.
	     *
	     * @param {number} nPan The pan value (-100 to 100)
	     * @return {SMSound} The SMSound object
	     */
	
	    this.setPan = function(nPan, bInstanceOnly) {
	
	      if (nPan === _undefined) {
	        nPan = 0;
	      }
	
	      if (bInstanceOnly === _undefined) {
	        bInstanceOnly = false;
	      }
	
	      if (!s.isHTML5) {
	        flash._setPan(s.id, nPan);
	      } // else { no HTML5 pan? }
	
	      s._iO.pan = nPan;
	
	      if (!bInstanceOnly) {
	        s.pan = nPan;
	        s.options.pan = nPan;
	      }
	
	      return s;
	
	    };
	
	    /**
	     * Sets the volume.
	     *
	     * @param {number} nVol The volume value (0 to 100)
	     * @return {SMSound} The SMSound object
	     */
	
	    this.setVolume = function(nVol, _bInstanceOnly) {
	
	      /**
	       * Note: Setting volume has no effect on iOS "special snowflake" devices.
	       * Hardware volume control overrides software, and volume
	       * will always return 1 per Apple docs. (iOS 4 + 5.)
	       * http://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/HTML-canvas-guide/AddingSoundtoCanvasAnimations/AddingSoundtoCanvasAnimations.html
	       */
	
	      if (nVol === _undefined) {
	        nVol = 100;
	      }
	
	      if (_bInstanceOnly === _undefined) {
	        _bInstanceOnly = false;
	      }
	
	      if (!s.isHTML5) {
	
	        flash._setVolume(s.id, (sm2.muted && !s.muted) || s.muted ? 0 : nVol);
	
	      } else if (s._a) {
	
	        if (sm2.muted && !s.muted) {
	          s.muted = true;
	          s._a.muted = true;
	        }
	
	        // valid range for native HTML5 Audio(): 0-1
	        s._a.volume = Math.max(0, Math.min(1, nVol/100));
	
	      }
	
	      s._iO.volume = nVol;
	
	      if (!_bInstanceOnly) {
	        s.volume = nVol;
	        s.options.volume = nVol;
	      }
	
	      return s;
	
	    };
	
	    /**
	     * Mutes the sound.
	     *
	     * @return {SMSound} The SMSound object
	     */
	
	    this.mute = function() {
	
	      s.muted = true;
	
	      if (!s.isHTML5) {
	        flash._setVolume(s.id, 0);
	      } else if (s._a) {
	        s._a.muted = true;
	      }
	
	      return s;
	
	    };
	
	    /**
	     * Unmutes the sound.
	     *
	     * @return {SMSound} The SMSound object
	     */
	
	    this.unmute = function() {
	
	      s.muted = false;
	      var hasIO = (s._iO.volume !== _undefined);
	
	      if (!s.isHTML5) {
	        flash._setVolume(s.id, hasIO ? s._iO.volume : s.options.volume);
	      } else if (s._a) {
	        s._a.muted = false;
	      }
	
	      return s;
	
	    };
	
	    /**
	     * Toggles the muted state of a sound.
	     *
	     * @return {SMSound} The SMSound object
	     */
	
	    this.toggleMute = function() {
	
	      return (s.muted ? s.unmute() : s.mute());
	
	    };
	
	    /**
	     * Registers a callback to be fired when a sound reaches a given position during playback.
	     *
	     * @param {number} nPosition The position to watch for
	     * @param {function} oMethod The relevant callback to fire
	     * @param {object} oScope Optional: The scope to apply the callback to
	     * @return {SMSound} The SMSound object
	     */
	
	    this.onPosition = function(nPosition, oMethod, oScope) {
	
	      // TODO: basic dupe checking?
	
	      onPositionItems.push({
	        position: parseInt(nPosition, 10),
	        method: oMethod,
	        scope: (oScope !== _undefined ? oScope : s),
	        fired: false
	      });
	
	      return s;
	
	    };
	
	    // legacy/backwards-compability: lower-case method name
	    this.onposition = this.onPosition;
	
	    /**
	     * Removes registered callback(s) from a sound, by position and/or callback.
	     *
	     * @param {number} nPosition The position to clear callback(s) for
	     * @param {function} oMethod Optional: Identify one callback to be removed when multiple listeners exist for one position
	     * @return {SMSound} The SMSound object
	     */
	
	    this.clearOnPosition = function(nPosition, oMethod) {
	
	      var i;
	
	      nPosition = parseInt(nPosition, 10);
	
	      if (isNaN(nPosition)) {
	        // safety check
	        return false;
	      }
	
	      for (i=0; i < onPositionItems.length; i++) {
	
	        if (nPosition === onPositionItems[i].position) {
	          // remove this item if no method was specified, or, if the method matches
	          
	          if (!oMethod || (oMethod === onPositionItems[i].method)) {
	            
	            if (onPositionItems[i].fired) {
	              // decrement "fired" counter, too
	              onPositionFired--;
	            }
	            
	            onPositionItems.splice(i, 1);
	          
	          }
	        
	        }
	
	      }
	
	    };
	
	    this._processOnPosition = function() {
	
	      var i, item, j = onPositionItems.length;
	
	      if (!j || !s.playState || onPositionFired >= j) {
	        return false;
	      }
	
	      for (i = j - 1; i >= 0; i--) {
	        
	        item = onPositionItems[i];
	        
	        if (!item.fired && s.position >= item.position) {
	        
	          item.fired = true;
	          onPositionFired++;
	          item.method.apply(item.scope, [item.position]);
	        
	          //  reset j -- onPositionItems.length can be changed in the item callback above... occasionally breaking the loop.
			      j = onPositionItems.length;
	        
	        }
	      
	      }
	
	      return true;
	
	    };
	
	    this._resetOnPosition = function(nPosition) {
	
	      // reset "fired" for items interested in this position
	      var i, item, j = onPositionItems.length;
	
	      if (!j) {
	        return false;
	      }
	
	      for (i = j - 1; i >= 0; i--) {
	        
	        item = onPositionItems[i];
	        
	        if (item.fired && nPosition <= item.position) {
	          item.fired = false;
	          onPositionFired--;
	        }
	      
	      }
	
	      return true;
	
	    };
	
	    /**
	     * SMSound() private internals
	     * --------------------------------
	     */
	
	    applyFromTo = function() {
	
	      var instanceOptions = s._iO,
	          f = instanceOptions.from,
	          t = instanceOptions.to,
	          start, end;
	
	      end = function() {
	
	        // end has been reached.
	        sm2._wD(s.id + ': "To" time of ' + t + ' reached.');
	
	        // detach listener
	        s.clearOnPosition(t, end);
	
	        // stop should clear this, too
	        s.stop();
	
	      };
	
	      start = function() {
	
	        sm2._wD(s.id + ': Playing "from" ' + f);
	
	        // add listener for end
	        if (t !== null && !isNaN(t)) {
	          s.onPosition(t, end);
	        }
	
	      };
	
	      if (f !== null && !isNaN(f)) {
	
	        // apply to instance options, guaranteeing correct start position.
	        instanceOptions.position = f;
	
	        // multiShot timing can't be tracked, so prevent that.
	        instanceOptions.multiShot = false;
	
	        start();
	
	      }
	
	      // return updated instanceOptions including starting position
	      return instanceOptions;
	
	    };
	
	    attachOnPosition = function() {
	
	      var item,
	          op = s._iO.onposition;
	
	      // attach onposition things, if any, now.
	
	      if (op) {
	
	        for (item in op) {
	          if (op.hasOwnProperty(item)) {
	            s.onPosition(parseInt(item, 10), op[item]);
	          }
	        }
	
	      }
	
	    };
	
	    detachOnPosition = function() {
	
	      var item,
	          op = s._iO.onposition;
	
	      // detach any onposition()-style listeners.
	
	      if (op) {
	
	        for (item in op) {
	          if (op.hasOwnProperty(item)) {
	            s.clearOnPosition(parseInt(item, 10));
	          }
	        }
	
	      }
	
	    };
	
	    start_html5_timer = function() {
	
	      if (s.isHTML5) {
	        startTimer(s);
	      }
	
	    };
	
	    stop_html5_timer = function() {
	
	      if (s.isHTML5) {
	        stopTimer(s);
	      }
	
	    };
	
	    resetProperties = function(retainPosition) {
	
	      if (!retainPosition) {
	        onPositionItems = [];
	        onPositionFired = 0;
	      }
	
	      onplay_called = false;
	
	      s._hasTimer = null;
	      s._a = null;
	      s._html5_canplay = false;
	      s.bytesLoaded = null;
	      s.bytesTotal = null;
	      s.duration = (s._iO && s._iO.duration ? s._iO.duration : null);
	      s.durationEstimate = null;
	      s.buffered = [];
	
	      // legacy: 1D array
	      s.eqData = [];
	
	      s.eqData.left = [];
	      s.eqData.right = [];
	
	      s.failures = 0;
	      s.isBuffering = false;
	      s.instanceOptions = {};
	      s.instanceCount = 0;
	      s.loaded = false;
	      s.metadata = {};
	
	      // 0 = uninitialised, 1 = loading, 2 = failed/error, 3 = loaded/success
	      s.readyState = 0;
	
	      s.muted = false;
	      s.paused = false;
	
	      s.peakData = {
	        left: 0,
	        right: 0
	      };
	
	      s.waveformData = {
	        left: [],
	        right: []
	      };
	
	      s.playState = 0;
	      s.position = null;
	
	      s.id3 = {};
	
	    };
	
	    resetProperties();
	
	    /**
	     * Pseudo-private SMSound internals
	     * --------------------------------
	     */
	
	    this._onTimer = function(bForce) {
	
	      /**
	       * HTML5-only _whileplaying() etc.
	       * called from both HTML5 native events, and polling/interval-based timers
	       * mimics flash and fires only when time/duration change, so as to be polling-friendly
	       */
	
	      var duration, isNew = false, time, x = {};
	
	      if (s._hasTimer || bForce) {
	
	        // TODO: May not need to track readyState (1 = loading)
	
	        if (s._a && (bForce || ((s.playState > 0 || s.readyState === 1) && !s.paused))) {
	
	          duration = s._get_html5_duration();
	
	          if (duration !== lastHTML5State.duration) {
	
	            lastHTML5State.duration = duration;
	            s.duration = duration;
	            isNew = true;
	
	          }
	
	          // TODO: investigate why this goes wack if not set/re-set each time.
	          s.durationEstimate = s.duration;
	
	          time = (s._a.currentTime * msecScale || 0);
	
	          if (time !== lastHTML5State.time) {
	
	            lastHTML5State.time = time;
	            isNew = true;
	
	          }
	
	          if (isNew || bForce) {
	
	            s._whileplaying(time, x, x, x, x);
	
	          }
	
	        }/* else {
	
	          // sm2._wD('_onTimer: Warn for "'+s.id+'": '+(!s._a?'Could not find element. ':'')+(s.playState === 0?'playState bad, 0?':'playState = '+s.playState+', OK'));
	
	          return false;
	
	        }*/
	
	        return isNew;
	
	      }
	
	    };
	
	    this._get_html5_duration = function() {
	
	      var instanceOptions = s._iO,
	          // if audio object exists, use its duration - else, instance option duration (if provided - it's a hack, really, and should be retired) OR null
	          d = (s._a && s._a.duration ? s._a.duration * msecScale : (instanceOptions && instanceOptions.duration ? instanceOptions.duration : null)),
	          result = (d && !isNaN(d) && d !== Infinity ? d : null);
	
	      return result;
	
	    };
	
	    this._apply_loop = function(a, nLoops) {
	
	      /**
	       * boolean instead of "loop", for webkit? - spec says string. http://www.w3.org/TR/html-markup/audio.html#audio.attrs.loop
	       * note that loop is either off or infinite under HTML5, unlike Flash which allows arbitrary loop counts to be specified.
	       */
	
	      // <d>
	      if (!a.loop && nLoops > 1) {
	        sm2._wD('Note: Native HTML5 looping is infinite.', 1);
	      }
	      // </d>
	
	      a.loop = (nLoops > 1 ? 'loop' : '');
	
	    };
	
	    this._setup_html5 = function(oOptions) {
	
	      var instanceOptions = mixin(s._iO, oOptions),
	          a = useGlobalHTML5Audio ? globalHTML5Audio : s._a,
	          dURL = decodeURI(instanceOptions.url),
	          sameURL;
	
	      /**
	       * "First things first, I, Poppa..." (reset the previous state of the old sound, if playing)
	       * Fixes case with devices that can only play one sound at a time
	       * Otherwise, other sounds in mid-play will be terminated without warning and in a stuck state
	       */
	
	      if (useGlobalHTML5Audio) {
	
	        if (dURL === decodeURI(lastGlobalHTML5URL)) {
	          // global HTML5 audio: re-use of URL
	          sameURL = true;
	        }
	
	      } else if (dURL === decodeURI(lastURL)) {
	
	        // options URL is the same as the "last" URL, and we used (loaded) it
	        sameURL = true;
	
	      }
	
	      if (a) {
	
	        if (a._s) {
	
	          if (useGlobalHTML5Audio) {
	
	            if (a._s && a._s.playState && !sameURL) {
	
	              // global HTML5 audio case, and loading a new URL. stop the currently-playing one.
	              a._s.stop();
	
	            }
	
	          } else if (!useGlobalHTML5Audio && dURL === decodeURI(lastURL)) {
	
	            // non-global HTML5 reuse case: same url, ignore request
	            s._apply_loop(a, instanceOptions.loops);
	
	            return a;
	
	          }
	
	        }
	
	        if (!sameURL) {
	
	          // don't retain onPosition() stuff with new URLs.
	
	          if (lastURL) {
	            resetProperties(false);
	          }
	
	          // assign new HTML5 URL
	
	          a.src = instanceOptions.url;
	
	          s.url = instanceOptions.url;
	
	          lastURL = instanceOptions.url;
	
	          lastGlobalHTML5URL = instanceOptions.url;
	
	          a._called_load = false;
	
	        }
	
	      } else {
	
	        if (instanceOptions.autoLoad || instanceOptions.autoPlay) {
	
	          s._a = new Audio(instanceOptions.url);
	          s._a.load();
	
	        } else {
	
	          // null for stupid Opera 9.64 case
	          s._a = (isOpera && opera.version() < 10 ? new Audio(null) : new Audio());
	
	        }
	
	        // assign local reference
	        a = s._a;
	
	        a._called_load = false;
	
	        if (useGlobalHTML5Audio) {
	
	          globalHTML5Audio = a;
	
	        }
	
	      }
	
	      s.isHTML5 = true;
	
	      // store a ref on the track
	      s._a = a;
	
	      // store a ref on the audio
	      a._s = s;
	
	      add_html5_events();
	
	      s._apply_loop(a, instanceOptions.loops);
	
	      if (instanceOptions.autoLoad || instanceOptions.autoPlay) {
	
	        s.load();
	
	      } else {
	
	        // early HTML5 implementation (non-standard)
	        a.autobuffer = false;
	
	        // standard ('none' is also an option.)
	        a.preload = 'auto';
	
	      }
	
	      return a;
	
	    };
	
	    add_html5_events = function() {
	
	      if (s._a._added_events) {
	        return false;
	      }
	
	      var f;
	
	      function add(oEvt, oFn, bCapture) {
	        return s._a ? s._a.addEventListener(oEvt, oFn, bCapture || false) : null;
	      }
	
	      s._a._added_events = true;
	
	      for (f in html5_events) {
	        if (html5_events.hasOwnProperty(f)) {
	          add(f, html5_events[f]);
	        }
	      }
	
	      return true;
	
	    };
	
	    remove_html5_events = function() {
	
	      // Remove event listeners
	
	      var f;
	
	      function remove(oEvt, oFn, bCapture) {
	        return (s._a ? s._a.removeEventListener(oEvt, oFn, bCapture || false) : null);
	      }
	
	      sm2._wD(s.id + ': Removing event listeners');
	      s._a._added_events = false;
	
	      for (f in html5_events) {
	        if (html5_events.hasOwnProperty(f)) {
	          remove(f, html5_events[f]);
	        }
	      }
	
	    };
	
	    /**
	     * Pseudo-private event internals
	     * ------------------------------
	     */
	
	    this._onload = function(nSuccess) {
	
	      var fN,
	          // check for duration to prevent false positives from flash 8 when loading from cache.
	          loadOK = !!nSuccess || (!s.isHTML5 && fV === 8 && s.duration);
	
	      // <d>
	      fN = s.id + ': ';
	      sm2._wD(fN + (loadOK ? 'onload()' : 'Failed to load / invalid sound?' + (!s.duration ? ' Zero-length duration reported.' : ' -') + ' (' + s.url + ')'), (loadOK ? 1 : 2));
	
	      if (!loadOK && !s.isHTML5) {
	        if (sm2.sandbox.noRemote === true) {
	          sm2._wD(fN + str('noNet'), 1);
	        }
	        if (sm2.sandbox.noLocal === true) {
	          sm2._wD(fN + str('noLocal'), 1);
	        }
	      }
	      // </d>
	
	      s.loaded = loadOK;
	      s.readyState = (loadOK ? 3 : 2);
	      s._onbufferchange(0);
	
	      if (s._iO.onload) {
	        wrapCallback(s, function() {
	          s._iO.onload.apply(s, [loadOK]);
	        });
	      }
	
	      return true;
	
	    };
	
	    this._onbufferchange = function(nIsBuffering) {
	
	      if (s.playState === 0) {
	        // ignore if not playing
	        return false;
	      }
	
	      if ((nIsBuffering && s.isBuffering) || (!nIsBuffering && !s.isBuffering)) {
	        return false;
	      }
	
	      s.isBuffering = (nIsBuffering === 1);
	      
	      if (s._iO.onbufferchange) {
	        sm2._wD(s.id + ': Buffer state change: ' + nIsBuffering);
	        s._iO.onbufferchange.apply(s, [nIsBuffering]);
	      }
	
	      return true;
	
	    };
	
	    /**
	     * Playback may have stopped due to buffering, or related reason.
	     * This state can be encountered on iOS < 6 when auto-play is blocked.
	     */
	
	    this._onsuspend = function() {
	
	      if (s._iO.onsuspend) {
	        sm2._wD(s.id + ': Playback suspended');
	        s._iO.onsuspend.apply(s);
	      }
	
	      return true;
	
	    };
	
	    /**
	     * flash 9/movieStar + RTMP-only method, should fire only once at most
	     * at this point we just recreate failed sounds rather than trying to reconnect
	     */
	
	    this._onfailure = function(msg, level, code) {
	
	      s.failures++;
	      sm2._wD(s.id + ': Failure (' + s.failures + '): ' + msg);
	
	      if (s._iO.onfailure && s.failures === 1) {
	        s._iO.onfailure(msg, level, code);
	      } else {
	        sm2._wD(s.id + ': Ignoring failure');
	      }
	
	    };
	
	    /**
	     * flash 9/movieStar + RTMP-only method for unhandled warnings/exceptions from Flash
	     * e.g., RTMP "method missing" warning (non-fatal) for getStreamLength on server
	     */
	
	    this._onwarning = function(msg, level, code) {
	
	      if (s._iO.onwarning) {
	        s._iO.onwarning(msg, level, code);
	      }
	
	    };
	
	    this._onfinish = function() {
	
	      // store local copy before it gets trashed...
	      var io_onfinish = s._iO.onfinish;
	
	      s._onbufferchange(0);
	      s._resetOnPosition(0);
	
	      // reset some state items
	      if (s.instanceCount) {
	
	        s.instanceCount--;
	
	        if (!s.instanceCount) {
	
	          // remove onPosition listeners, if any
	          detachOnPosition();
	
	          // reset instance options
	          s.playState = 0;
	          s.paused = false;
	          s.instanceCount = 0;
	          s.instanceOptions = {};
	          s._iO = {};
	          stop_html5_timer();
	
	          // reset position, too
	          if (s.isHTML5) {
	            s.position = 0;
	          }
	
	        }
	
	        if (!s.instanceCount || s._iO.multiShotEvents) {
	          // fire onfinish for last, or every instance
	          if (io_onfinish) {
	            sm2._wD(s.id + ': onfinish()');
	            wrapCallback(s, function() {
	              io_onfinish.apply(s);
	            });
	          }
	        }
	
	      }
	
	    };
	
	    this._whileloading = function(nBytesLoaded, nBytesTotal, nDuration, nBufferLength) {
	
	      var instanceOptions = s._iO;
	
	      s.bytesLoaded = nBytesLoaded;
	      s.bytesTotal = nBytesTotal;
	      s.duration = Math.floor(nDuration);
	      s.bufferLength = nBufferLength;
	
	      if (!s.isHTML5 && !instanceOptions.isMovieStar) {
	
	        if (instanceOptions.duration) {
	          // use duration from options, if specified and larger. nobody should be specifying duration in options, actually, and it should be retired.
	          s.durationEstimate = (s.duration > instanceOptions.duration) ? s.duration : instanceOptions.duration;
	        } else {
	          s.durationEstimate = parseInt((s.bytesTotal / s.bytesLoaded) * s.duration, 10);
	        }
	
	      } else {
	
	        s.durationEstimate = s.duration;
	
	      }
	
	      // for flash, reflect sequential-load-style buffering
	      if (!s.isHTML5) {
	        s.buffered = [{
	          'start': 0,
	          'end': s.duration
	        }];
	      }
	
	      // allow whileloading to fire even if "load" fired under HTML5, due to HTTP range/partials
	      if ((s.readyState !== 3 || s.isHTML5) && instanceOptions.whileloading) {
	        instanceOptions.whileloading.apply(s);
	      }
	
	    };
	
	    this._whileplaying = function(nPosition, oPeakData, oWaveformDataLeft, oWaveformDataRight, oEQData) {
	
	      var instanceOptions = s._iO,
	          eqLeft;
	
	      if (isNaN(nPosition) || nPosition === null) {
	        // flash safety net
	        return false;
	      }
	
	      // Safari HTML5 play() may return small -ve values when starting from position: 0, eg. -50.120396875. Unexpected/invalid per W3, I think. Normalize to 0.
	      s.position = Math.max(0, nPosition);
	
	      s._processOnPosition();
	
	      if (!s.isHTML5 && fV > 8) {
	
	        if (instanceOptions.usePeakData && oPeakData !== _undefined && oPeakData) {
	          s.peakData = {
	            left: oPeakData.leftPeak,
	            right: oPeakData.rightPeak
	          };
	        }
	
	        if (instanceOptions.useWaveformData && oWaveformDataLeft !== _undefined && oWaveformDataLeft) {
	          s.waveformData = {
	            left: oWaveformDataLeft.split(','),
	            right: oWaveformDataRight.split(',')
	          };
	        }
	
	        if (instanceOptions.useEQData) {
	          if (oEQData !== _undefined && oEQData && oEQData.leftEQ) {
	            eqLeft = oEQData.leftEQ.split(',');
	            s.eqData = eqLeft;
	            s.eqData.left = eqLeft;
	            if (oEQData.rightEQ !== _undefined && oEQData.rightEQ) {
	              s.eqData.right = oEQData.rightEQ.split(',');
	            }
	          }
	        }
	
	      }
	
	      if (s.playState === 1) {
	
	        // special case/hack: ensure buffering is false if loading from cache (and not yet started)
	        if (!s.isHTML5 && fV === 8 && !s.position && s.isBuffering) {
	          s._onbufferchange(0);
	        }
	
	        if (instanceOptions.whileplaying) {
	          // flash may call after actual finish
	          instanceOptions.whileplaying.apply(s);
	        }
	
	      }
	
	      return true;
	
	    };
	
	    this._oncaptiondata = function(oData) {
	
	      /**
	       * internal: flash 9 + NetStream (MovieStar/RTMP-only) feature
	       *
	       * @param {object} oData
	       */
	
	      sm2._wD(s.id + ': Caption data received.');
	
	      s.captiondata = oData;
	
	      if (s._iO.oncaptiondata) {
	        s._iO.oncaptiondata.apply(s, [oData]);
	      }
	
	    };
	
	    this._onmetadata = function(oMDProps, oMDData) {
	
	      /**
	       * internal: flash 9 + NetStream (MovieStar/RTMP-only) feature
	       * RTMP may include song title, MovieStar content may include encoding info
	       *
	       * @param {array} oMDProps (names)
	       * @param {array} oMDData (values)
	       */
	
	      sm2._wD(s.id + ': Metadata received.');
	
	      var oData = {}, i, j;
	
	      for (i = 0, j = oMDProps.length; i < j; i++) {
	        oData[oMDProps[i]] = oMDData[i];
	      }
	
	      s.metadata = oData;
	
	      if (s._iO.onmetadata) {
	        s._iO.onmetadata.call(s, s.metadata);
	      }
	
	    };
	
	    this._onid3 = function(oID3Props, oID3Data) {
	
	      /**
	       * internal: flash 8 + flash 9 ID3 feature
	       * may include artist, song title etc.
	       *
	       * @param {array} oID3Props (names)
	       * @param {array} oID3Data (values)
	       */
	
	      sm2._wD(s.id + ': ID3 data received.');
	
	      var oData = [], i, j;
	
	      for (i = 0, j = oID3Props.length; i < j; i++) {
	        oData[oID3Props[i]] = oID3Data[i];
	      }
	
	      s.id3 = mixin(s.id3, oData);
	
	      if (s._iO.onid3) {
	        s._iO.onid3.apply(s);
	      }
	
	    };
	
	    // flash/RTMP-only
	
	    this._onconnect = function(bSuccess) {
	
	      bSuccess = (bSuccess === 1);
	      sm2._wD(s.id + ': ' + (bSuccess ? 'Connected.' : 'Failed to connect? - ' + s.url), (bSuccess ? 1 : 2));
	      s.connected = bSuccess;
	
	      if (bSuccess) {
	
	        s.failures = 0;
	
	        if (idCheck(s.id)) {
	          if (s.getAutoPlay()) {
	            // only update the play state if auto playing
	            s.play(_undefined, s.getAutoPlay());
	          } else if (s._iO.autoLoad) {
	            s.load();
	          }
	        }
	
	        if (s._iO.onconnect) {
	          s._iO.onconnect.apply(s, [bSuccess]);
	        }
	
	      }
	
	    };
	
	    this._ondataerror = function(sError) {
	
	      // flash 9 wave/eq data handler
	      // hack: called at start, and end from flash at/after onfinish()
	      if (s.playState > 0) {
	        sm2._wD(s.id + ': Data error: ' + sError);
	        if (s._iO.ondataerror) {
	          s._iO.ondataerror.apply(s);
	        }
	      }
	
	    };
	
	    // <d>
	    this._debug();
	    // </d>
	
	  }; // SMSound()
	
	  /**
	   * Private SoundManager internals
	   * ------------------------------
	   */
	
	  getDocument = function() {
	
	    return (doc.body || doc.getElementsByTagName('div')[0]);
	
	  };
	
	  id = function(sID) {
	
	    return doc.getElementById(sID);
	
	  };
	
	  mixin = function(oMain, oAdd) {
	
	    // non-destructive merge
	    var o1 = (oMain || {}), o2, o;
	
	    // if unspecified, o2 is the default options object
	    o2 = (oAdd === _undefined ? sm2.defaultOptions : oAdd);
	
	    for (o in o2) {
	
	      if (o2.hasOwnProperty(o) && o1[o] === _undefined) {
	
	        if (typeof o2[o] !== 'object' || o2[o] === null) {
	
	          // assign directly
	          o1[o] = o2[o];
	
	        } else {
	
	          // recurse through o2
	          o1[o] = mixin(o1[o], o2[o]);
	
	        }
	
	      }
	
	    }
	
	    return o1;
	
	  };
	
	  wrapCallback = function(oSound, callback) {
	
	    /**
	     * 03/03/2013: Fix for Flash Player 11.6.602.171 + Flash 8 (flashVersion = 8) SWF issue
	     * setTimeout() fix for certain SMSound callbacks like onload() and onfinish(), where subsequent calls like play() and load() fail when Flash Player 11.6.602.171 is installed, and using soundManager with flashVersion = 8 (which is the default).
	     * Not sure of exact cause. Suspect race condition and/or invalid (NaN-style) position argument trickling down to the next JS -> Flash _start() call, in the play() case.
	     * Fix: setTimeout() to yield, plus safer null / NaN checking on position argument provided to Flash.
	     * https://getsatisfaction.com/schillmania/topics/recent_chrome_update_seems_to_have_broken_my_sm2_audio_player
	     */
	    if (!oSound.isHTML5 && fV === 8) {
	      window.setTimeout(callback, 0);
	    } else {
	      callback();
	    }
	
	  };
	
	  // additional soundManager properties that soundManager.setup() will accept
	
	  extraOptions = {
	    'onready': 1,
	    'ontimeout': 1,
	    'defaultOptions': 1,
	    'flash9Options': 1,
	    'movieStarOptions': 1
	  };
	
	  assign = function(o, oParent) {
	
	    /**
	     * recursive assignment of properties, soundManager.setup() helper
	     * allows property assignment based on whitelist
	     */
	
	    var i,
	        result = true,
	        hasParent = (oParent !== _undefined),
	        setupOptions = sm2.setupOptions,
	        bonusOptions = extraOptions;
	
	    // <d>
	
	    // if soundManager.setup() called, show accepted parameters.
	
	    if (o === _undefined) {
	
	      result = [];
	
	      for (i in setupOptions) {
	
	        if (setupOptions.hasOwnProperty(i)) {
	          result.push(i);
	        }
	
	      }
	
	      for (i in bonusOptions) {
	
	        if (bonusOptions.hasOwnProperty(i)) {
	
	          if (typeof sm2[i] === 'object') {
	            result.push(i + ': {...}');
	          } else if (sm2[i] instanceof Function) {
	            result.push(i + ': function() {...}');
	          } else {
	            result.push(i);
	          }
	
	        }
	
	      }
	
	      sm2._wD(str('setup', result.join(', ')));
	
	      return false;
	
	    }
	
	    // </d>
	
	    for (i in o) {
	
	      if (o.hasOwnProperty(i)) {
	
	        // if not an {object} we want to recurse through...
	
	        if (typeof o[i] !== 'object' || o[i] === null || o[i] instanceof Array || o[i] instanceof RegExp) {
	
	          // check "allowed" options
	
	          if (hasParent && bonusOptions[oParent] !== _undefined) {
	
	            // valid recursive / nested object option, eg., { defaultOptions: { volume: 50 } }
	            sm2[oParent][i] = o[i];
	
	          } else if (setupOptions[i] !== _undefined) {
	
	            // special case: assign to setupOptions object, which soundManager property references
	            sm2.setupOptions[i] = o[i];
	
	            // assign directly to soundManager, too
	            sm2[i] = o[i];
	
	          } else if (bonusOptions[i] === _undefined) {
	
	            // invalid or disallowed parameter. complain.
	            complain(str((sm2[i] === _undefined ? 'setupUndef' : 'setupError'), i), 2);
	
	            result = false;
	
	          } else {
	
	            /**
	             * valid extraOptions (bonusOptions) parameter.
	             * is it a method, like onready/ontimeout? call it.
	             * multiple parameters should be in an array, eg. soundManager.setup({onready: [myHandler, myScope]});
	             */
	
	            if (sm2[i] instanceof Function) {
	
	              sm2[i].apply(sm2, (o[i] instanceof Array ? o[i] : [o[i]]));
	
	            } else {
	
	              // good old-fashioned direct assignment
	              sm2[i] = o[i];
	
	            }
	
	          }
	
	        } else {
	
	          // recursion case, eg., { defaultOptions: { ... } }
	
	          if (bonusOptions[i] === _undefined) {
	
	            // invalid or disallowed parameter. complain.
	            complain(str((sm2[i] === _undefined ? 'setupUndef' : 'setupError'), i), 2);
	
	            result = false;
	
	          } else {
	
	            // recurse through object
	            return assign(o[i], i);
	
	          }
	
	        }
	
	      }
	
	    }
	
	    return result;
	
	  };
	
	  function preferFlashCheck(kind) {
	
	    // whether flash should play a given type
	    return (sm2.preferFlash && hasFlash && !sm2.ignoreFlash && (sm2.flash[kind] !== _undefined && sm2.flash[kind]));
	
	  }
	
	  /**
	   * Internal DOM2-level event helpers
	   * ---------------------------------
	   */
	
	  event = (function() {
	
	    // normalize event methods
	    var old = (window.attachEvent),
	    evt = {
	      add: (old ? 'attachEvent' : 'addEventListener'),
	      remove: (old ? 'detachEvent' : 'removeEventListener')
	    };
	
	    // normalize "on" event prefix, optional capture argument
	    function getArgs(oArgs) {
	
	      var args = slice.call(oArgs),
	          len = args.length;
	
	      if (old) {
	        // prefix
	        args[1] = 'on' + args[1];
	        if (len > 3) {
	          // no capture
	          args.pop();
	        }
	      } else if (len === 3) {
	        args.push(false);
	      }
	
	      return args;
	
	    }
	
	    function apply(args, sType) {
	
	      // normalize and call the event method, with the proper arguments
	      var element = args.shift(),
	          method = [evt[sType]];
	
	      if (old) {
	        // old IE can't do apply().
	        element[method](args[0], args[1]);
	      } else {
	        element[method].apply(element, args);
	      }
	
	    }
	
	    function add() {
	      apply(getArgs(arguments), 'add');
	    }
	
	    function remove() {
	      apply(getArgs(arguments), 'remove');
	    }
	
	    return {
	      'add': add,
	      'remove': remove
	    };
	
	  }());
	
	  /**
	   * Internal HTML5 event handling
	   * -----------------------------
	   */
	
	  function html5_event(oFn) {
	
	    // wrap html5 event handlers so we don't call them on destroyed and/or unloaded sounds
	
	    return function(e) {
	
	      var s = this._s,
	          result;
	
	      if (!s || !s._a) {
	        // <d>
	        if (s && s.id) {
	          sm2._wD(s.id + ': Ignoring ' + e.type);
	        } else {
	          sm2._wD(h5 + 'Ignoring ' + e.type);
	        }
	        // </d>
	        result = null;
	      } else {
	        result = oFn.call(this, e);
	      }
	
	      return result;
	
	    };
	
	  }
	
	  html5_events = {
	
	    // HTML5 event-name-to-handler map
	
	    abort: html5_event(function() {
	
	      sm2._wD(this._s.id + ': abort');
	
	    }),
	
	    // enough has loaded to play
	
	    canplay: html5_event(function() {
	
	      var s = this._s,
	          position1K;
	
	      if (s._html5_canplay) {
	        // this event has already fired. ignore.
	        return true;
	      }
	
	      s._html5_canplay = true;
	      sm2._wD(s.id + ': canplay');
	      s._onbufferchange(0);
	
	      // position according to instance options
	      position1K = (s._iO.position !== _undefined && !isNaN(s._iO.position) ? s._iO.position/msecScale : null);
	
	      // set the position if position was provided before the sound loaded
	      if (this.currentTime !== position1K) {
	        sm2._wD(s.id + ': canplay: Setting position to ' + position1K);
	        try {
	          this.currentTime = position1K;
	        } catch(ee) {
	          sm2._wD(s.id + ': canplay: Setting position of ' + position1K + ' failed: ' + ee.message, 2);
	        }
	      }
	
	      // hack for HTML5 from/to case
	      if (s._iO._oncanplay) {
	        s._iO._oncanplay();
	      }
	
	    }),
	
	    canplaythrough: html5_event(function() {
	
	      var s = this._s;
	
	      if (!s.loaded) {
	        s._onbufferchange(0);
	        s._whileloading(s.bytesLoaded, s.bytesTotal, s._get_html5_duration());
	        s._onload(true);
	      }
	
	    }),
	
	    durationchange: html5_event(function() {
	
	      // durationchange may fire at various times, probably the safest way to capture accurate/final duration.
	
	      var s = this._s,
	          duration;
	
	      duration = s._get_html5_duration();
	
	      if (!isNaN(duration) && duration !== s.duration) {
	
	        sm2._wD(this._s.id + ': durationchange (' + duration + ')' + (s.duration ? ', previously ' + s.duration : ''));
	
	        s.durationEstimate = s.duration = duration;
	
	      }
	
	    }),
	
	    // TODO: Reserved for potential use
	    /*
	    emptied: html5_event(function() {
	
	      sm2._wD(this._s.id + ': emptied');
	
	    }),
	    */
	
	    ended: html5_event(function() {
	
	      var s = this._s;
	
	      sm2._wD(s.id + ': ended');
	
	      s._onfinish();
	
	    }),
	
	    error: html5_event(function() {
	
	      sm2._wD(this._s.id + ': HTML5 error, code ' + this.error.code);
	      /**
	       * HTML5 error codes, per W3C
	       * Error 1: Client aborted download at user's request.
	       * Error 2: Network error after load started.
	       * Error 3: Decoding issue.
	       * Error 4: Media (audio file) not supported.
	       * Reference: http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#error-codes
	       */
	      // call load with error state?
	      this._s._onload(false);
	
	    }),
	
	    loadeddata: html5_event(function() {
	
	      var s = this._s;
	
	      sm2._wD(s.id + ': loadeddata');
	
	      // safari seems to nicely report progress events, eventually totalling 100%
	      if (!s._loaded && !isSafari) {
	        s.duration = s._get_html5_duration();
	      }
	
	    }),
	
	    loadedmetadata: html5_event(function() {
	
	      sm2._wD(this._s.id + ': loadedmetadata');
	
	    }),
	
	    loadstart: html5_event(function() {
	
	      sm2._wD(this._s.id + ': loadstart');
	      // assume buffering at first
	      this._s._onbufferchange(1);
	
	    }),
	
	    play: html5_event(function() {
	
	      // sm2._wD(this._s.id + ': play()');
	      // once play starts, no buffering
	      this._s._onbufferchange(0);
	
	    }),
	
	    playing: html5_event(function() {
	
	      sm2._wD(this._s.id + ': playing ' + String.fromCharCode(9835));
	      // once play starts, no buffering
	      this._s._onbufferchange(0);
	
	    }),
	
	    progress: html5_event(function(e) {
	
	      // note: can fire repeatedly after "loaded" event, due to use of HTTP range/partials
	
	      var s = this._s,
	          i, j, progStr, buffered = 0,
	          isProgress = (e.type === 'progress'),
	          ranges = e.target.buffered,
	          // firefox 3.6 implements e.loaded/total (bytes)
	          loaded = (e.loaded || 0),
	          total = (e.total || 1);
	
	      // reset the "buffered" (loaded byte ranges) array
	      s.buffered = [];
	
	      if (ranges && ranges.length) {
	
	        // if loaded is 0, try TimeRanges implementation as % of load
	        // https://developer.mozilla.org/en/DOM/TimeRanges
	
	        // re-build "buffered" array
	        // HTML5 returns seconds. SM2 API uses msec for setPosition() etc., whether Flash or HTML5.
	        for (i = 0, j = ranges.length; i < j; i++) {
	          s.buffered.push({
	            'start': ranges.start(i) * msecScale,
	            'end': ranges.end(i) * msecScale
	          });
	        }
	
	        // use the last value locally
	        buffered = (ranges.end(0) - ranges.start(0)) * msecScale;
	
	        // linear case, buffer sum; does not account for seeking and HTTP partials / byte ranges
	        loaded = Math.min(1, buffered / (e.target.duration * msecScale));
	
	        // <d>
	        if (isProgress && ranges.length > 1) {
	          progStr = [];
	          j = ranges.length;
	          for (i = 0; i < j; i++) {
	            progStr.push((e.target.buffered.start(i) * msecScale) + '-' + (e.target.buffered.end(i) * msecScale));
	          }
	          sm2._wD(this._s.id + ': progress, timeRanges: ' + progStr.join(', '));
	        }
	
	        if (isProgress && !isNaN(loaded)) {
	          sm2._wD(this._s.id + ': progress, ' + Math.floor(loaded * 100) + '% loaded');
	        }
	        // </d>
	
	      }
	
	      if (!isNaN(loaded)) {
	
	        // TODO: prevent calls with duplicate values.
	        s._whileloading(loaded, total, s._get_html5_duration());
	        if (loaded && total && loaded === total) {
	          // in case "onload" doesn't fire (eg. gecko 1.9.2)
	          html5_events.canplaythrough.call(this, e);
	        }
	
	      }
	
	    }),
	
	    ratechange: html5_event(function() {
	
	      sm2._wD(this._s.id + ': ratechange');
	
	    }),
	
	    suspend: html5_event(function(e) {
	
	      // download paused/stopped, may have finished (eg. onload)
	      var s = this._s;
	
	      sm2._wD(this._s.id + ': suspend');
	      html5_events.progress.call(this, e);
	      s._onsuspend();
	
	    }),
	
	    stalled: html5_event(function() {
	
	      sm2._wD(this._s.id + ': stalled');
	
	    }),
	
	    timeupdate: html5_event(function() {
	
	      this._s._onTimer();
	
	    }),
	
	    waiting: html5_event(function() {
	
	      var s = this._s;
	
	      // see also: seeking
	      sm2._wD(this._s.id + ': waiting');
	
	      // playback faster than download rate, etc.
	      s._onbufferchange(1);
	
	    })
	
	  };
	
	  html5OK = function(iO) {
	
	    // playability test based on URL or MIME type
	
	    var result;
	
	    if (!iO || (!iO.type && !iO.url && !iO.serverURL)) {
	
	      // nothing to check
	      result = false;
	
	    } else if (iO.serverURL || (iO.type && preferFlashCheck(iO.type))) {
	
	      // RTMP, or preferring flash
	      result = false;
	
	    } else {
	
	      // Use type, if specified. Pass data: URIs to HTML5. If HTML5-only mode, no other options, so just give 'er
	      result = ((iO.type ? html5CanPlay({type:iO.type}) : html5CanPlay({url:iO.url}) || sm2.html5Only || iO.url.match(/data\:/i)));
	
	    }
	
	    return result;
	
	  };
	
	  html5Unload = function(oAudio) {
	
	    /**
	     * Internal method: Unload media, and cancel any current/pending network requests.
	     * Firefox can load an empty URL, which allegedly destroys the decoder and stops the download.
	     * https://developer.mozilla.org/En/Using_audio_and_video_in_Firefox#Stopping_the_download_of_media
	     * However, Firefox has been seen loading a relative URL from '' and thus requesting the hosting page on unload.
	     * Other UA behaviour is unclear, so everyone else gets an about:blank-style URL.
	     */
	
	    var url;
	
	    if (oAudio) {
	
	      // Firefox and Chrome accept short WAVe data: URIs. Chome dislikes audio/wav, but accepts audio/wav for data: MIME.
	      // Desktop Safari complains / fails on data: URI, so it gets about:blank.
	      url = (isSafari ? emptyURL : (sm2.html5.canPlayType('audio/wav') ? emptyWAV : emptyURL));
	
	      oAudio.src = url;
	
	      // reset some state, too
	      if (oAudio._called_unload !== _undefined) {
	        oAudio._called_load = false;
	      }
	
	    }
	
	    if (useGlobalHTML5Audio) {
	
	      // ensure URL state is trashed, also
	      lastGlobalHTML5URL = null;
	
	    }
	
	    return url;
	
	  };
	
	  html5CanPlay = function(o) {
	
	    /**
	     * Try to find MIME, test and return truthiness
	     * o = {
	     *  url: '/path/to/an.mp3',
	     *  type: 'audio/mp3'
	     * }
	     */
	
	    if (!sm2.useHTML5Audio || !sm2.hasHTML5) {
	      return false;
	    }
	
	    var url = (o.url || null),
	        mime = (o.type || null),
	        aF = sm2.audioFormats,
	        result,
	        offset,
	        fileExt,
	        item;
	
	    // account for known cases like audio/mp3
	
	    if (mime && sm2.html5[mime] !== _undefined) {
	      return (sm2.html5[mime] && !preferFlashCheck(mime));
	    }
	
	    if (!html5Ext) {
	      
	      html5Ext = [];
	      
	      for (item in aF) {
	      
	        if (aF.hasOwnProperty(item)) {
	      
	          html5Ext.push(item);
	      
	          if (aF[item].related) {
	            html5Ext = html5Ext.concat(aF[item].related);
	          }
	      
	        }
	      
	      }
	      
	      html5Ext = new RegExp('\\.('+html5Ext.join('|')+')(\\?.*)?$','i');
	    
	    }
	
	    // TODO: Strip URL queries, etc.
	    fileExt = (url ? url.toLowerCase().match(html5Ext) : null);
	
	    if (!fileExt || !fileExt.length) {
	      
	      if (!mime) {
	      
	        result = false;
	      
	      } else {
	      
	        // audio/mp3 -> mp3, result should be known
	        offset = mime.indexOf(';');
	      
	        // strip "audio/X; codecs..."
	        fileExt = (offset !== -1 ? mime.substr(0,offset) : mime).substr(6);
	      
	      }
	    
	    } else {
	    
	      // match the raw extension name - "mp3", for example
	      fileExt = fileExt[1];
	    
	    }
	
	    if (fileExt && sm2.html5[fileExt] !== _undefined) {
	    
	      // result known
	      result = (sm2.html5[fileExt] && !preferFlashCheck(fileExt));
	    
	    } else {
	    
	      mime = 'audio/' + fileExt;
	      result = sm2.html5.canPlayType({type:mime});
	    
	      sm2.html5[fileExt] = result;
	    
	      // sm2._wD('canPlayType, found result: ' + result);
	      result = (result && sm2.html5[mime] && !preferFlashCheck(mime));
	    }
	
	    return result;
	
	  };
	
	  testHTML5 = function() {
	
	    /**
	     * Internal: Iterates over audioFormats, determining support eg. audio/mp3, audio/mpeg and so on
	     * assigns results to html5[] and flash[].
	     */
	
	    if (!sm2.useHTML5Audio || !sm2.hasHTML5) {
	    
	      // without HTML5, we need Flash.
	      sm2.html5.usingFlash = true;
	      needsFlash = true;
	    
	      return false;
	    
	    }
	
	    // double-whammy: Opera 9.64 throws WRONG_ARGUMENTS_ERR if no parameter passed to Audio(), and Webkit + iOS happily tries to load "null" as a URL. :/
	    var a = (Audio !== _undefined ? (isOpera && opera.version() < 10 ? new Audio(null) : new Audio()) : null),
	        item, lookup, support = {}, aF, i;
	
	    function cp(m) {
	
	      var canPlay, j,
	          result = false,
	          isOK = false;
	
	      if (!a || typeof a.canPlayType !== 'function') {
	        return result;
	      }
	
	      if (m instanceof Array) {
	    
	        // iterate through all mime types, return any successes
	    
	        for (i = 0, j = m.length; i < j; i++) {
	    
	          if (sm2.html5[m[i]] || a.canPlayType(m[i]).match(sm2.html5Test)) {
	    
	            isOK = true;
	            sm2.html5[m[i]] = true;
	    
	            // note flash support, too
	            sm2.flash[m[i]] = !!(m[i].match(flashMIME));
	    
	          }
	    
	        }
	    
	        result = isOK;
	    
	      } else {
	    
	        canPlay = (a && typeof a.canPlayType === 'function' ? a.canPlayType(m) : false);
	        result = !!(canPlay && (canPlay.match(sm2.html5Test)));
	    
	      }
	
	      return result;
	
	    }
	
	    // test all registered formats + codecs
	
	    aF = sm2.audioFormats;
	
	    for (item in aF) {
	
	      if (aF.hasOwnProperty(item)) {
	
	        lookup = 'audio/' + item;
	
	        support[item] = cp(aF[item].type);
	
	        // write back generic type too, eg. audio/mp3
	        support[lookup] = support[item];
	
	        // assign flash
	        if (item.match(flashMIME)) {
	
	          sm2.flash[item] = true;
	          sm2.flash[lookup] = true;
	
	        } else {
	
	          sm2.flash[item] = false;
	          sm2.flash[lookup] = false;
	
	        }
	
	        // assign result to related formats, too
	
	        if (aF[item] && aF[item].related) {
	
	          for (i = aF[item].related.length - 1; i >= 0; i--) {
	
	            // eg. audio/m4a
	            support['audio/' + aF[item].related[i]] = support[item];
	            sm2.html5[aF[item].related[i]] = support[item];
	            sm2.flash[aF[item].related[i]] = support[item];
	
	          }
	
	        }
	
	      }
	
	    }
	
	    support.canPlayType = (a ? cp : null);
	    sm2.html5 = mixin(sm2.html5, support);
	
	    sm2.html5.usingFlash = featureCheck();
	    needsFlash = sm2.html5.usingFlash;
	
	    return true;
	
	  };
	
	  strings = {
	
	    // <d>
	    notReady: 'Unavailable - wait until onready() has fired.',
	    notOK: 'Audio support is not available.',
	    domError: sm + 'exception caught while appending SWF to DOM.',
	    spcWmode: 'Removing wmode, preventing known SWF loading issue(s)',
	    swf404: smc + 'Verify that %s is a valid path.',
	    tryDebug: 'Try ' + sm + '.debugFlash = true for more security details (output goes to SWF.)',
	    checkSWF: 'See SWF output for more debug info.',
	    localFail: smc + 'Non-HTTP page (' + doc.location.protocol + ' URL?) Review Flash player security settings for this special case:\nhttp://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html\nMay need to add/allow path, eg. c:/sm2/ or /users/me/sm2/',
	    waitFocus: smc + 'Special case: Waiting for SWF to load with window focus...',
	    waitForever: smc + 'Waiting indefinitely for Flash (will recover if unblocked)...',
	    waitSWF: smc + 'Waiting for 100% SWF load...',
	    needFunction: smc + 'Function object expected for %s',
	    badID: 'Sound ID "%s" should be a string, starting with a non-numeric character',
	    currentObj: smc + '_debug(): Current sound objects',
	    waitOnload: smc + 'Waiting for window.onload()',
	    docLoaded: smc + 'Document already loaded',
	    onload: smc + 'initComplete(): calling soundManager.onload()',
	    onloadOK: sm + '.onload() complete',
	    didInit: smc + 'init(): Already called?',
	    secNote: 'Flash security note: Network/internet URLs will not load due to security restrictions. Access can be configured via Flash Player Global Security Settings Page: http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html',
	    badRemove: smc + 'Failed to remove Flash node.',
	    shutdown: sm + '.disable(): Shutting down',
	    queue: smc + 'Queueing %s handler',
	    smError: 'SMSound.load(): Exception: JS-Flash communication failed, or JS error.',
	    fbTimeout: 'No flash response, applying .' + swfCSS.swfTimedout + ' CSS...',
	    fbLoaded: 'Flash loaded',
	    fbHandler: smc + 'flashBlockHandler()',
	    manURL: 'SMSound.load(): Using manually-assigned URL',
	    onURL: sm + '.load(): current URL already assigned.',
	    badFV: sm + '.flashVersion must be 8 or 9. "%s" is invalid. Reverting to %s.',
	    as2loop: 'Note: Setting stream:false so looping can work (flash 8 limitation)',
	    noNSLoop: 'Note: Looping not implemented for MovieStar formats',
	    needfl9: 'Note: Switching to flash 9, required for MP4 formats.',
	    mfTimeout: 'Setting flashLoadTimeout = 0 (infinite) for off-screen, mobile flash case',
	    needFlash: smc + 'Fatal error: Flash is needed to play some required formats, but is not available.',
	    gotFocus: smc + 'Got window focus.',
	    policy: 'Enabling usePolicyFile for data access',
	    setup: sm + '.setup(): allowed parameters: %s',
	    setupError: sm + '.setup(): "%s" cannot be assigned with this method.',
	    setupUndef: sm + '.setup(): Could not find option "%s"',
	    setupLate: sm + '.setup(): url, flashVersion and html5Test property changes will not take effect until reboot().',
	    noURL: smc + 'Flash URL required. Call soundManager.setup({url:...}) to get started.',
	    sm2Loaded: 'SoundManager 2: Ready. ' + String.fromCharCode(10003),
	    reset: sm + '.reset(): Removing event callbacks',
	    mobileUA: 'Mobile UA detected, preferring HTML5 by default.',
	    globalHTML5: 'Using singleton HTML5 Audio() pattern for this device.',
	    ignoreMobile: 'Ignoring mobile restrictions for this device.'
	    // </d>
	
	  };
	
	  str = function() {
	
	    // internal string replace helper.
	    // arguments: o [,items to replace]
	    // <d>
	
	    var args,
	        i, j, o,
	        sstr;
	
	    // real array, please
	    args = slice.call(arguments);
	
	    // first argument
	    o = args.shift();
	
	    sstr = (strings && strings[o] ? strings[o] : '');
	
	    if (sstr && args && args.length) {
	      for (i = 0, j = args.length; i < j; i++) {
	        sstr = sstr.replace('%s', args[i]);
	      }
	    }
	
	    return sstr;
	    // </d>
	
	  };
	
	  loopFix = function(sOpt) {
	
	    // flash 8 requires stream = false for looping to work
	    if (fV === 8 && sOpt.loops > 1 && sOpt.stream) {
	      _wDS('as2loop');
	      sOpt.stream = false;
	    }
	
	    return sOpt;
	
	  };
	
	  policyFix = function(sOpt, sPre) {
	
	    if (sOpt && !sOpt.usePolicyFile && (sOpt.onid3 || sOpt.usePeakData || sOpt.useWaveformData || sOpt.useEQData)) {
	      sm2._wD((sPre || '') + str('policy'));
	      sOpt.usePolicyFile = true;
	    }
	
	    return sOpt;
	
	  };
	
	  complain = function(sMsg) {
	
	    // <d>
	    if (hasConsole && console.warn !== _undefined) {
	      console.warn(sMsg);
	    } else {
	      sm2._wD(sMsg);
	    }
	    // </d>
	
	  };
	
	  doNothing = function() {
	
	    return false;
	
	  };
	
	  disableObject = function(o) {
	
	    var oProp;
	
	    for (oProp in o) {
	      if (o.hasOwnProperty(oProp) && typeof o[oProp] === 'function') {
	        o[oProp] = doNothing;
	      }
	    }
	
	    oProp = null;
	
	  };
	
	  failSafely = function(bNoDisable) {
	
	    // general failure exception handler
	
	    if (bNoDisable === _undefined) {
	      bNoDisable = false;
	    }
	
	    if (disabled || bNoDisable) {
	      sm2.disable(bNoDisable);
	    }
	
	  };
	
	  normalizeMovieURL = function(smURL) {
	
	    var urlParams = null, url;
	
	    if (smURL) {
	      
	      if (smURL.match(/\.swf(\?.*)?$/i)) {
	      
	        urlParams = smURL.substr(smURL.toLowerCase().lastIndexOf('.swf?') + 4);
	      
	        if (urlParams) {
	          // assume user knows what they're doing
	          return smURL;
	        }
	      
	      } else if (smURL.lastIndexOf('/') !== smURL.length - 1) {
	      
	        // append trailing slash, if needed
	        smURL += '/';
	      
	      }
	    
	    }
	
	    url = (smURL && smURL.lastIndexOf('/') !== - 1 ? smURL.substr(0, smURL.lastIndexOf('/') + 1) : './') + sm2.movieURL;
	
	    if (sm2.noSWFCache) {
	      url += ('?ts=' + new Date().getTime());
	    }
	
	    return url;
	
	  };
	
	  setVersionInfo = function() {
	
	    // short-hand for internal use
	
	    fV = parseInt(sm2.flashVersion, 10);
	
	    if (fV !== 8 && fV !== 9) {
	      sm2._wD(str('badFV', fV, defaultFlashVersion));
	      sm2.flashVersion = fV = defaultFlashVersion;
	    }
	
	    // debug flash movie, if applicable
	
	    var isDebug = (sm2.debugMode || sm2.debugFlash ? '_debug.swf' : '.swf');
	
	    if (sm2.useHTML5Audio && !sm2.html5Only && sm2.audioFormats.mp4.required && fV < 9) {
	      sm2._wD(str('needfl9'));
	      sm2.flashVersion = fV = 9;
	    }
	
	    sm2.version = sm2.versionNumber + (sm2.html5Only ? ' (HTML5-only mode)' : (fV === 9 ? ' (AS3/Flash 9)' : ' (AS2/Flash 8)'));
	
	    // set up default options
	    if (fV > 8) {
	    
	      // +flash 9 base options
	      sm2.defaultOptions = mixin(sm2.defaultOptions, sm2.flash9Options);
	      sm2.features.buffering = true;
	    
	      // +moviestar support
	      sm2.defaultOptions = mixin(sm2.defaultOptions, sm2.movieStarOptions);
	      sm2.filePatterns.flash9 = new RegExp('\\.(mp3|' + netStreamTypes.join('|') + ')(\\?.*)?$', 'i');
	      sm2.features.movieStar = true;
	    
	    } else {
	    
	      sm2.features.movieStar = false;
	    
	    }
	
	    // regExp for flash canPlay(), etc.
	    sm2.filePattern = sm2.filePatterns[(fV !== 8 ? 'flash9' : 'flash8')];
	
	    // if applicable, use _debug versions of SWFs
	    sm2.movieURL = (fV === 8 ? 'soundmanager2.swf' : 'soundmanager2_flash9.swf').replace('.swf', isDebug);
	
	    sm2.features.peakData = sm2.features.waveformData = sm2.features.eqData = (fV > 8);
	
	  };
	
	  setPolling = function(bPolling, bHighPerformance) {
	
	    if (!flash) {
	      return false;
	    }
	
	    flash._setPolling(bPolling, bHighPerformance);
	
	  };
	
	  initDebug = function() {
	
	    // starts debug mode, creating output <div> for UAs without console object
	
	    // allow force of debug mode via URL
	    // <d>
	    if (sm2.debugURLParam.test(wl)) {
	      sm2.setupOptions.debugMode = sm2.debugMode = true;
	    }
	
	    if (id(sm2.debugID)) {
	      return false;
	    }
	
	    var oD, oDebug, oTarget, oToggle, tmp;
	
	    if (sm2.debugMode && !id(sm2.debugID) && (!hasConsole || !sm2.useConsole || !sm2.consoleOnly)) {
	
	      oD = doc.createElement('div');
	      oD.id = sm2.debugID + '-toggle';
	
	      oToggle = {
	        'position': 'fixed',
	        'bottom': '0px',
	        'right': '0px',
	        'width': '1.2em',
	        'height': '1.2em',
	        'lineHeight': '1.2em',
	        'margin': '2px',
	        'textAlign': 'center',
	        'border': '1px solid #999',
	        'cursor': 'pointer',
	        'background': '#fff',
	        'color': '#333',
	        'zIndex': 10001
	      };
	
	      oD.appendChild(doc.createTextNode('-'));
	      oD.onclick = toggleDebug;
	      oD.title = 'Toggle SM2 debug console';
	
	      if (ua.match(/msie 6/i)) {
	        oD.style.position = 'absolute';
	        oD.style.cursor = 'hand';
	      }
	
	      for (tmp in oToggle) {
	        if (oToggle.hasOwnProperty(tmp)) {
	          oD.style[tmp] = oToggle[tmp];
	        }
	      }
	
	      oDebug = doc.createElement('div');
	      oDebug.id = sm2.debugID;
	      oDebug.style.display = (sm2.debugMode ? 'block' : 'none');
	
	      if (sm2.debugMode && !id(oD.id)) {
	        try {
	          oTarget = getDocument();
	          oTarget.appendChild(oD);
	        } catch(e2) {
	          throw new Error(str('domError') + ' \n' + e2.toString());
	        }
	        oTarget.appendChild(oDebug);
	      }
	
	    }
	
	    oTarget = null;
	    // </d>
	
	  };
	
	  idCheck = this.getSoundById;
	
	  // <d>
	  _wDS = function(o, errorLevel) {
	
	    return (!o ? '' : sm2._wD(str(o), errorLevel));
	
	  };
	
	  toggleDebug = function() {
	
	    var o = id(sm2.debugID),
	    oT = id(sm2.debugID + '-toggle');
	
	    if (!o) {
	      return false;
	    }
	
	    if (debugOpen) {
	      // minimize
	      oT.innerHTML = '+';
	      o.style.display = 'none';
	    } else {
	      oT.innerHTML = '-';
	      o.style.display = 'block';
	    }
	
	    debugOpen = !debugOpen;
	
	  };
	
	  debugTS = function(sEventType, bSuccess, sMessage) {
	
	    // troubleshooter debug hooks
	
	    if (window.sm2Debugger !== _undefined) {
	      try {
	        sm2Debugger.handleEvent(sEventType, bSuccess, sMessage);
	      } catch(e) {
	        // oh well
	        return false;
	      }
	    }
	
	    return true;
	
	  };
	  // </d>
	
	  getSWFCSS = function() {
	
	    var css = [];
	
	    if (sm2.debugMode) {
	      css.push(swfCSS.sm2Debug);
	    }
	
	    if (sm2.debugFlash) {
	      css.push(swfCSS.flashDebug);
	    }
	
	    if (sm2.useHighPerformance) {
	      css.push(swfCSS.highPerf);
	    }
	
	    return css.join(' ');
	
	  };
	
	  flashBlockHandler = function() {
	
	    // *possible* flash block situation.
	
	    var name = str('fbHandler'),
	        p = sm2.getMoviePercent(),
	        css = swfCSS,
	        error = {
	          type:'FLASHBLOCK'
	        };
	
	    if (sm2.html5Only) {
	      // no flash, or unused
	      return false;
	    }
	
	    if (!sm2.ok()) {
	
	      if (needsFlash) {
	        // make the movie more visible, so user can fix
	        sm2.oMC.className = getSWFCSS() + ' ' + css.swfDefault + ' ' + (p === null ? css.swfTimedout : css.swfError);
	        sm2._wD(name + ': ' + str('fbTimeout') + (p ? ' (' + str('fbLoaded') + ')' : ''));
	      }
	
	      sm2.didFlashBlock = true;
	
	      // fire onready(), complain lightly
	      processOnEvents({
	        type: 'ontimeout',
	        ignoreInit: true,
	        error: error
	      });
	
	      catchError(error);
	
	    } else {
	
	      // SM2 loaded OK (or recovered)
	
	      // <d>
	      if (sm2.didFlashBlock) {
	        sm2._wD(name + ': Unblocked');
	      }
	      // </d>
	
	      if (sm2.oMC) {
	        sm2.oMC.className = [getSWFCSS(), css.swfDefault, css.swfLoaded + (sm2.didFlashBlock ? ' ' + css.swfUnblocked : '')].join(' ');
	      }
	
	    }
	
	  };
	
	  addOnEvent = function(sType, oMethod, oScope) {
	
	    if (on_queue[sType] === _undefined) {
	      on_queue[sType] = [];
	    }
	
	    on_queue[sType].push({
	      'method': oMethod,
	      'scope': (oScope || null),
	      'fired': false
	    });
	
	  };
	
	  processOnEvents = function(oOptions) {
	
	    // if unspecified, assume OK/error
	
	    if (!oOptions) {
	      oOptions = {
	        type: (sm2.ok() ? 'onready' : 'ontimeout')
	      };
	    }
	
	    if (!didInit && oOptions && !oOptions.ignoreInit) {
	      // not ready yet.
	      return false;
	    }
	
	    if (oOptions.type === 'ontimeout' && (sm2.ok() || (disabled && !oOptions.ignoreInit))) {
	      // invalid case
	      return false;
	    }
	
	    var status = {
	          success: (oOptions && oOptions.ignoreInit ? sm2.ok() : !disabled)
	        },
	
	        // queue specified by type, or none
	        srcQueue = (oOptions && oOptions.type ? on_queue[oOptions.type] || [] : []),
	
	        queue = [], i, j,
	        args = [status],
	        canRetry = (needsFlash && !sm2.ok());
	
	    if (oOptions.error) {
	      args[0].error = oOptions.error;
	    }
	
	    for (i = 0, j = srcQueue.length; i < j; i++) {
	      if (srcQueue[i].fired !== true) {
	        queue.push(srcQueue[i]);
	      }
	    }
	
	    if (queue.length) {
	    
	      // sm2._wD(sm + ': Firing ' + queue.length + ' ' + oOptions.type + '() item' + (queue.length === 1 ? '' : 's')); 
	      for (i = 0, j = queue.length; i < j; i++) {
	      
	        if (queue[i].scope) {
	          queue[i].method.apply(queue[i].scope, args);
	        } else {
	          queue[i].method.apply(this, args);
	        }
	      
	        if (!canRetry) {
	          // useFlashBlock and SWF timeout case doesn't count here.
	          queue[i].fired = true;
	      
	        }
	      
	      }
	    
	    }
	
	    return true;
	
	  };
	
	  initUserOnload = function() {
	
	    window.setTimeout(function() {
	
	      if (sm2.useFlashBlock) {
	        flashBlockHandler();
	      }
	
	      processOnEvents();
	
	      // call user-defined "onload", scoped to window
	
	      if (typeof sm2.onload === 'function') {
	        _wDS('onload', 1);
	        sm2.onload.apply(window);
	        _wDS('onloadOK', 1);
	      }
	
	      if (sm2.waitForWindowLoad) {
	        event.add(window, 'load', initUserOnload);
	      }
	
	    }, 1);
	
	  };
	
	  detectFlash = function() {
	
	    /**
	     * Hat tip: Flash Detect library (BSD, (C) 2007) by Carl "DocYes" S. Yestrau
	     * http://featureblend.com/javascript-flash-detection-library.html / http://featureblend.com/license.txt
	     */
	
	    if (hasFlash !== _undefined) {
	      // this work has already been done.
	      return hasFlash;
	    }
	
	    var hasPlugin = false, n = navigator, nP = n.plugins, obj, type, types, AX = window.ActiveXObject;
	
	    if (nP && nP.length) {
	      
	      type = 'application/x-shockwave-flash';
	      types = n.mimeTypes;
	      
	      if (types && types[type] && types[type].enabledPlugin && types[type].enabledPlugin.description) {
	        hasPlugin = true;
	      }
	    
	    } else if (AX !== _undefined && !ua.match(/MSAppHost/i)) {
	    
	      // Windows 8 Store Apps (MSAppHost) are weird (compatibility?) and won't complain here, but will barf if Flash/ActiveX object is appended to the DOM.
	      try {
	        obj = new AX('ShockwaveFlash.ShockwaveFlash');
	      } catch(e) {
	        // oh well
	        obj = null;
	      }
	      
	      hasPlugin = (!!obj);
	      
	      // cleanup, because it is ActiveX after all
	      obj = null;
	    
	    }
	
	    hasFlash = hasPlugin;
	
	    return hasPlugin;
	
	  };
	
	featureCheck = function() {
	
	    var flashNeeded,
	        item,
	        formats = sm2.audioFormats,
	        // iPhone <= 3.1 has broken HTML5 audio(), but firmware 3.2 (original iPad) + iOS4 works.
	        isSpecial = (is_iDevice && !!(ua.match(/os (1|2|3_0|3_1)\s/i)));
	
	    if (isSpecial) {
	
	      // has Audio(), but is broken; let it load links directly.
	      sm2.hasHTML5 = false;
	
	      // ignore flash case, however
	      sm2.html5Only = true;
	
	      // hide the SWF, if present
	      if (sm2.oMC) {
	        sm2.oMC.style.display = 'none';
	      }
	
	    } else {
	
	      if (sm2.useHTML5Audio) {
	
	        if (!sm2.html5 || !sm2.html5.canPlayType) {
	          sm2._wD('SoundManager: No HTML5 Audio() support detected.');
	          sm2.hasHTML5 = false;
	        }
	
	        // <d>
	        if (isBadSafari) {
	          sm2._wD(smc + 'Note: Buggy HTML5 Audio in Safari on this OS X release, see https://bugs.webkit.org/show_bug.cgi?id=32159 - ' + (!hasFlash ? ' would use flash fallback for MP3/MP4, but none detected.' : 'will use flash fallback for MP3/MP4, if available'), 1);
	        }
	        // </d>
	
	      }
	
	    }
	
	    if (sm2.useHTML5Audio && sm2.hasHTML5) {
	
	      // sort out whether flash is optional, required or can be ignored.
	
	      // innocent until proven guilty.
	      canIgnoreFlash = true;
	
	      for (item in formats) {
	        
	        if (formats.hasOwnProperty(item)) {
	        
	          if (formats[item].required) {
	        
	            if (!sm2.html5.canPlayType(formats[item].type)) {
	        
	              // 100% HTML5 mode is not possible.
	              canIgnoreFlash = false;
	              flashNeeded = true;
	        
	            } else if (sm2.preferFlash && (sm2.flash[item] || sm2.flash[formats[item].type])) {
	        
	              // flash may be required, or preferred for this format.
	              flashNeeded = true;
	        
	            }
	        
	          }
	
	        }
	
	      }
	
	    }
	
	    // sanity check...
	    if (sm2.ignoreFlash) {
	      flashNeeded = false;
	      canIgnoreFlash = true;
	    }
	
	    sm2.html5Only = (sm2.hasHTML5 && sm2.useHTML5Audio && !flashNeeded);
	
	    return (!sm2.html5Only);
	
	  };
	
	  parseURL = function(url) {
	
	    /**
	     * Internal: Finds and returns the first playable URL (or failing that, the first URL.)
	     * @param {string or array} url A single URL string, OR, an array of URL strings or {url:'/path/to/resource', type:'audio/mp3'} objects.
	     */
	
	    var i, j, urlResult = 0, result;
	
	    if (url instanceof Array) {
	
	      // find the first good one
	      for (i = 0, j = url.length; i < j; i++) {
	
	        if (url[i] instanceof Object) {
	
	          // MIME check
	          if (sm2.canPlayMIME(url[i].type)) {
	            urlResult = i;
	            break;
	          }
	
	        } else if (sm2.canPlayURL(url[i])) {
	
	          // URL string check
	          urlResult = i;
	          break;
	
	        }
	
	      }
	
	      // normalize to string
	      if (url[urlResult].url) {
	        url[urlResult] = url[urlResult].url;
	      }
	
	      result = url[urlResult];
	
	    } else {
	
	      // single URL case
	      result = url;
	
	    }
	
	    return result;
	
	  };
	
	
	  startTimer = function(oSound) {
	
	    /**
	     * attach a timer to this sound, and start an interval if needed
	     */
	
	    if (!oSound._hasTimer) {
	
	      oSound._hasTimer = true;
	
	      if (!mobileHTML5 && sm2.html5PollingInterval) {
	
	        if (h5IntervalTimer === null && h5TimerCount === 0) {
	
	          h5IntervalTimer = setInterval(timerExecute, sm2.html5PollingInterval);
	
	        }
	
	        h5TimerCount++;
	
	      }
	
	    }
	
	  };
	
	  stopTimer = function(oSound) {
	
	    /**
	     * detach a timer
	     */
	
	    if (oSound._hasTimer) {
	
	      oSound._hasTimer = false;
	
	      if (!mobileHTML5 && sm2.html5PollingInterval) {
	
	        // interval will stop itself at next execution.
	
	        h5TimerCount--;
	
	      }
	
	    }
	
	  };
	
	  timerExecute = function() {
	
	    /**
	     * manual polling for HTML5 progress events, ie., whileplaying()
	     * (can achieve greater precision than conservative default HTML5 interval)
	     */
	
	    var i;
	
	    if (h5IntervalTimer !== null && !h5TimerCount) {
	
	      // no active timers, stop polling interval.
	
	      clearInterval(h5IntervalTimer);
	
	      h5IntervalTimer = null;
	
	      return false;
	
	    }
	
	    // check all HTML5 sounds with timers
	
	    for (i = sm2.soundIDs.length - 1; i >= 0; i--) {
	
	      if (sm2.sounds[sm2.soundIDs[i]].isHTML5 && sm2.sounds[sm2.soundIDs[i]]._hasTimer) {
	        sm2.sounds[sm2.soundIDs[i]]._onTimer();
	      }
	
	    }
	
	  };
	
	  catchError = function(options) {
	
	    options = (options !== _undefined ? options : {});
	
	    if (typeof sm2.onerror === 'function') {
	      sm2.onerror.apply(window, [{
	        type: (options.type !== _undefined ? options.type : null)
	      }]);
	    }
	
	    if (options.fatal !== _undefined && options.fatal) {
	      sm2.disable();
	    }
	
	  };
	
	  badSafariFix = function() {
	
	    // special case: "bad" Safari (OS X 10.3 - 10.7) must fall back to flash for MP3/MP4
	    if (!isBadSafari || !detectFlash()) {
	      // doesn't apply
	      return false;
	    }
	
	    var aF = sm2.audioFormats, i, item;
	
	    for (item in aF) {
	
	      if (aF.hasOwnProperty(item)) {
	
	        if (item === 'mp3' || item === 'mp4') {
	
	          sm2._wD(sm + ': Using flash fallback for ' + item + ' format');
	          sm2.html5[item] = false;
	
	          // assign result to related formats, too
	          if (aF[item] && aF[item].related) {
	            for (i = aF[item].related.length - 1; i >= 0; i--) {
	              sm2.html5[aF[item].related[i]] = false;
	            }
	          }
	
	        }
	
	      }
	
	    }
	
	  };
	
	  /**
	   * Pseudo-private flash/ExternalInterface methods
	   * ----------------------------------------------
	   */
	
	  this._setSandboxType = function(sandboxType) {
	
	    // <d>
	    // Security sandbox according to Flash plugin
	    var sb = sm2.sandbox;
	
	    sb.type = sandboxType;
	    sb.description = sb.types[(sb.types[sandboxType] !== _undefined?sandboxType : 'unknown')];
	
	    if (sb.type === 'localWithFile') {
	
	      sb.noRemote = true;
	      sb.noLocal = false;
	      _wDS('secNote', 2);
	
	    } else if (sb.type === 'localWithNetwork') {
	
	      sb.noRemote = false;
	      sb.noLocal = true;
	
	    } else if (sb.type === 'localTrusted') {
	
	      sb.noRemote = false;
	      sb.noLocal = false;
	
	    }
	    // </d>
	
	  };
	
	  this._externalInterfaceOK = function(swfVersion) {
	
	    // flash callback confirming flash loaded, EI working etc.
	    // swfVersion: SWF build string
	
	    if (sm2.swfLoaded) {
	      return false;
	    }
	
	    var e;
	
	    debugTS('swf', true);
	    debugTS('flashtojs', true);
	    sm2.swfLoaded = true;
	    tryInitOnFocus = false;
	
	    if (isBadSafari) {
	      badSafariFix();
	    }
	
	    // complain if JS + SWF build/version strings don't match, excluding +DEV builds
	    // <d>
	    if (!swfVersion || swfVersion.replace(/\+dev/i,'') !== sm2.versionNumber.replace(/\+dev/i, '')) {
	
	      e = sm + ': Fatal: JavaScript file build "' + sm2.versionNumber + '" does not match Flash SWF build "' + swfVersion + '" at ' + sm2.url + '. Ensure both are up-to-date.';
	
	      // escape flash -> JS stack so this error fires in window.
	      setTimeout(function versionMismatch() {
	        throw new Error(e);
	      }, 0);
	
	      // exit, init will fail with timeout
	      return false;
	
	    }
	    // </d>
	
	    // IE needs a larger timeout
	    setTimeout(init, isIE ? 100 : 1);
	
	  };
	
	  /**
	   * Private initialization helpers
	   * ------------------------------
	   */
	
	  createMovie = function(smID, smURL) {
	
	    if (didAppend && appendSuccess) {
	      // ignore if already succeeded
	      return false;
	    }
	
	    function initMsg() {
	
	      // <d>
	
	      var options = [],
	          title,
	          msg = [],
	          delimiter = ' + ';
	
	      title = 'SoundManager ' + sm2.version + (!sm2.html5Only && sm2.useHTML5Audio ? (sm2.hasHTML5 ? ' + HTML5 audio' : ', no HTML5 audio support') : '');
	
	      if (!sm2.html5Only) {
	
	        if (sm2.preferFlash) {
	          options.push('preferFlash');
	        }
	
	        if (sm2.useHighPerformance) {
	          options.push('useHighPerformance');
	        }
	
	        if (sm2.flashPollingInterval) {
	          options.push('flashPollingInterval (' + sm2.flashPollingInterval + 'ms)');
	        }
	
	        if (sm2.html5PollingInterval) {
	          options.push('html5PollingInterval (' + sm2.html5PollingInterval + 'ms)');
	        }
	
	        if (sm2.wmode) {
	          options.push('wmode (' + sm2.wmode + ')');
	        }
	
	        if (sm2.debugFlash) {
	          options.push('debugFlash');
	        }
	
	        if (sm2.useFlashBlock) {
	          options.push('flashBlock');
	        }
	
	      } else {
	
	        if (sm2.html5PollingInterval) {
	          options.push('html5PollingInterval (' + sm2.html5PollingInterval + 'ms)');
	        }
	
	      }
	
	      if (options.length) {
	        msg = msg.concat([options.join(delimiter)]);
	      }
	
	      sm2._wD(title + (msg.length ? delimiter + msg.join(', ') : ''), 1);
	
	      showSupport();
	
	      // </d>
	
	    }
	
	    if (sm2.html5Only) {
	
	      // 100% HTML5 mode
	      setVersionInfo();
	
	      initMsg();
	      sm2.oMC = id(sm2.movieID);
	      init();
	
	      // prevent multiple init attempts
	      didAppend = true;
	
	      appendSuccess = true;
	
	      return false;
	
	    }
	
	    // flash path
	    var remoteURL = (smURL || sm2.url),
	    localURL = (sm2.altURL || remoteURL),
	    swfTitle = 'JS/Flash audio component (SoundManager 2)',
	    oTarget = getDocument(),
	    extraClass = getSWFCSS(),
	    isRTL = null,
	    html = doc.getElementsByTagName('html')[0],
	    oEmbed, oMovie, tmp, movieHTML, oEl, s, x, sClass;
	
	    isRTL = (html && html.dir && html.dir.match(/rtl/i));
	    smID = (smID === _undefined ? sm2.id : smID);
	
	    function param(name, value) {
	      return '<param name="' + name + '" value="' + value + '" />';
	    }
	
	    // safety check for legacy (change to Flash 9 URL)
	    setVersionInfo();
	    sm2.url = normalizeMovieURL(overHTTP ? remoteURL : localURL);
	    smURL = sm2.url;
	
	    sm2.wmode = (!sm2.wmode && sm2.useHighPerformance ? 'transparent' : sm2.wmode);
	
	    if (sm2.wmode !== null && (ua.match(/msie 8/i) || (!isIE && !sm2.useHighPerformance)) && navigator.platform.match(/win32|win64/i)) {
	      /**
	       * extra-special case: movie doesn't load until scrolled into view when using wmode = anything but 'window' here
	       * does not apply when using high performance (position:fixed means on-screen), OR infinite flash load timeout
	       * wmode breaks IE 8 on Vista + Win7 too in some cases, as of January 2011 (?)
	       */
	      messages.push(strings.spcWmode);
	      sm2.wmode = null;
	    }
	
	    oEmbed = {
	      'name': smID,
	      'id': smID,
	      'src': smURL,
	      'quality': 'high',
	      'allowScriptAccess': sm2.allowScriptAccess,
	      'bgcolor': sm2.bgColor,
	      'pluginspage': http + 'www.macromedia.com/go/getflashplayer',
	      'title': swfTitle,
	      'type': 'application/x-shockwave-flash',
	      'wmode': sm2.wmode,
	      // http://help.adobe.com/en_US/as3/mobile/WS4bebcd66a74275c36cfb8137124318eebc6-7ffd.html
	      'hasPriority': 'true'
	    };
	
	    if (sm2.debugFlash) {
	      oEmbed.FlashVars = 'debug=1';
	    }
	
	    if (!sm2.wmode) {
	      // don't write empty attribute
	      delete oEmbed.wmode;
	    }
	
	    if (isIE) {
	
	      // IE is "special".
	      oMovie = doc.createElement('div');
	      movieHTML = [
	        '<object id="' + smID + '" data="' + smURL + '" type="' + oEmbed.type + '" title="' + oEmbed.title +'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">',
	        param('movie', smURL),
	        param('AllowScriptAccess', sm2.allowScriptAccess),
	        param('quality', oEmbed.quality),
	        (sm2.wmode? param('wmode', sm2.wmode): ''),
	        param('bgcolor', sm2.bgColor),
	        param('hasPriority', 'true'),
	        (sm2.debugFlash ? param('FlashVars', oEmbed.FlashVars) : ''),
	        '</object>'
	      ].join('');
	
	    } else {
	
	      oMovie = doc.createElement('embed');
	      for (tmp in oEmbed) {
	        if (oEmbed.hasOwnProperty(tmp)) {
	          oMovie.setAttribute(tmp, oEmbed[tmp]);
	        }
	      }
	
	    }
	
	    initDebug();
	    extraClass = getSWFCSS();
	    oTarget = getDocument();
	
	    if (oTarget) {
	
	      sm2.oMC = (id(sm2.movieID) || doc.createElement('div'));
	
	      if (!sm2.oMC.id) {
	
	        sm2.oMC.id = sm2.movieID;
	        sm2.oMC.className = swfCSS.swfDefault + ' ' + extraClass;
	        s = null;
	        oEl = null;
	
	        if (!sm2.useFlashBlock) {
	          if (sm2.useHighPerformance) {
	            // on-screen at all times
	            s = {
	              'position': 'fixed',
	              'width': '8px',
	              'height': '8px',
	              // >= 6px for flash to run fast, >= 8px to start up under Firefox/win32 in some cases. odd? yes.
	              'bottom': '0px',
	              'left': '0px',
	              'overflow': 'hidden'
	            };
	          } else {
	            // hide off-screen, lower priority
	            s = {
	              'position': 'absolute',
	              'width': '6px',
	              'height': '6px',
	              'top': '-9999px',
	              'left': '-9999px'
	            };
	            if (isRTL) {
	              s.left = Math.abs(parseInt(s.left, 10)) + 'px';
	            }
	          }
	        }
	
	        if (isWebkit) {
	          // soundcloud-reported render/crash fix, safari 5
	          sm2.oMC.style.zIndex = 10000;
	        }
	
	        if (!sm2.debugFlash) {
	          for (x in s) {
	            if (s.hasOwnProperty(x)) {
	              sm2.oMC.style[x] = s[x];
	            }
	          }
	        }
	
	        try {
	
	          if (!isIE) {
	            sm2.oMC.appendChild(oMovie);
	          }
	
	          oTarget.appendChild(sm2.oMC);
	
	          if (isIE) {
	            oEl = sm2.oMC.appendChild(doc.createElement('div'));
	            oEl.className = swfCSS.swfBox;
	            oEl.innerHTML = movieHTML;
	          }
	
	          appendSuccess = true;
	
	        } catch(e) {
	
	          throw new Error(str('domError') + ' \n' + e.toString());
	
	        }
	
	      } else {
	
	        // SM2 container is already in the document (eg. flashblock use case)
	        sClass = sm2.oMC.className;
	        sm2.oMC.className = (sClass ? sClass + ' ' : swfCSS.swfDefault) + (extraClass ? ' ' + extraClass : '');
	        sm2.oMC.appendChild(oMovie);
	
	        if (isIE) {
	          oEl = sm2.oMC.appendChild(doc.createElement('div'));
	          oEl.className = swfCSS.swfBox;
	          oEl.innerHTML = movieHTML;
	        }
	
	        appendSuccess = true;
	
	      }
	
	    }
	
	    didAppend = true;
	
	    initMsg();
	
	    // sm2._wD(sm + ': Trying to load ' + smURL + (!overHTTP && sm2.altURL ? ' (alternate URL)' : ''), 1);
	
	    return true;
	
	  };
	
	  initMovie = function() {
	
	    if (sm2.html5Only) {
	      createMovie();
	      return false;
	    }
	
	    // attempt to get, or create, movie (may already exist)
	    if (flash) {
	      return false;
	    }
	
	    if (!sm2.url) {
	
	      /**
	       * Something isn't right - we've reached init, but the soundManager url property has not been set.
	       * User has not called setup({url: ...}), or has not set soundManager.url (legacy use case) directly before init time.
	       * Notify and exit. If user calls setup() with a url: property, init will be restarted as in the deferred loading case.
	       */
	
	       _wDS('noURL');
	       return false;
	
	    }
	
	    // inline markup case
	    flash = sm2.getMovie(sm2.id);
	
	    if (!flash) {
	
	      if (!oRemoved) {
	
	        // try to create
	        createMovie(sm2.id, sm2.url);
	
	      } else {
	
	        // try to re-append removed movie after reboot()
	        if (!isIE) {
	          sm2.oMC.appendChild(oRemoved);
	        } else {
	          sm2.oMC.innerHTML = oRemovedHTML;
	        }
	
	        oRemoved = null;
	        didAppend = true;
	
	      }
	
	      flash = sm2.getMovie(sm2.id);
	
	    }
	
	    if (typeof sm2.oninitmovie === 'function') {
	      setTimeout(sm2.oninitmovie, 1);
	    }
	
	    // <d>
	    flushMessages();
	    // </d>
	
	    return true;
	
	  };
	
	  delayWaitForEI = function() {
	
	    setTimeout(waitForEI, 1000);
	
	  };
	
	  rebootIntoHTML5 = function() {
	
	    // special case: try for a reboot with preferFlash: false, if 100% HTML5 mode is possible and useFlashBlock is not enabled.
	
	    window.setTimeout(function() {
	
	      complain(smc + 'useFlashBlock is false, 100% HTML5 mode is possible. Rebooting with preferFlash: false...');
	
	      sm2.setup({
	        preferFlash: false
	      }).reboot();
	
	      // if for some reason you want to detect this case, use an ontimeout() callback and look for html5Only and didFlashBlock == true.
	      sm2.didFlashBlock = true;
	
	      sm2.beginDelayedInit();
	
	    }, 1);
	
	  };
	
	  waitForEI = function() {
	
	    var p,
	        loadIncomplete = false;
	
	    if (!sm2.url) {
	      // No SWF url to load (noURL case) - exit for now. Will be retried when url is set.
	      return false;
	    }
	
	    if (waitingForEI) {
	      return false;
	    }
	
	    waitingForEI = true;
	    event.remove(window, 'load', delayWaitForEI);
	
	    if (hasFlash && tryInitOnFocus && !isFocused) {
	      // Safari won't load flash in background tabs, only when focused.
	      _wDS('waitFocus');
	      return false;
	    }
	
	    if (!didInit) {
	      p = sm2.getMoviePercent();
	      if (p > 0 && p < 100) {
	        loadIncomplete = true;
	      }
	    }
	
	    setTimeout(function() {
	
	      p = sm2.getMoviePercent();
	
	      if (loadIncomplete) {
	        // special case: if movie *partially* loaded, retry until it's 100% before assuming failure.
	        waitingForEI = false;
	        sm2._wD(str('waitSWF'));
	        window.setTimeout(delayWaitForEI, 1);
	        return false;
	      }
	
	      // <d>
	      if (!didInit) {
	
	        sm2._wD(sm + ': No Flash response within expected time. Likely causes: ' + (p === 0 ? 'SWF load failed, ' : '') + 'Flash blocked or JS-Flash security error.' + (sm2.debugFlash ? ' ' + str('checkSWF') : ''), 2);
	
	        if (!overHTTP && p) {
	
	          _wDS('localFail', 2);
	
	          if (!sm2.debugFlash) {
	            _wDS('tryDebug', 2);
	          }
	
	        }
	
	        if (p === 0) {
	
	          // if 0 (not null), probably a 404.
	          sm2._wD(str('swf404', sm2.url), 1);
	
	        }
	
	        debugTS('flashtojs', false, ': Timed out' + (overHTTP ? ' (Check flash security or flash blockers)':' (No plugin/missing SWF?)'));
	
	      }
	      // </d>
	
	      // give up / time-out, depending
	
	      if (!didInit && okToDisable) {
	
	        if (p === null) {
	
	          // SWF failed to report load progress. Possibly blocked.
	
	          if (sm2.useFlashBlock || sm2.flashLoadTimeout === 0) {
	
	            if (sm2.useFlashBlock) {
	
	              flashBlockHandler();
	
	            }
	
	            _wDS('waitForever');
	
	          } else {
	
	            // no custom flash block handling, but SWF has timed out. Will recover if user unblocks / allows SWF load.
	
	            if (!sm2.useFlashBlock && canIgnoreFlash) {
	
	              rebootIntoHTML5();
	
	            } else {
	
	              _wDS('waitForever');
	
	              // fire any regular registered ontimeout() listeners.
	              processOnEvents({
	                type: 'ontimeout',
	                ignoreInit: true,
	                error: {
	                  type: 'INIT_FLASHBLOCK'
	                }
	              });
	
	            }
	
	          }
	
	        } else {
	
	          // SWF loaded? Shouldn't be a blocking issue, then.
	
	          if (sm2.flashLoadTimeout === 0) {
	
	            _wDS('waitForever');
	
	          } else {
	
	            if (!sm2.useFlashBlock && canIgnoreFlash) {
	
	              rebootIntoHTML5();
	
	            } else {
	
	              failSafely(true);
	
	            }
	
	          }
	
	        }
	
	      }
	
	    }, sm2.flashLoadTimeout);
	
	  };
	
	  handleFocus = function() {
	
	    function cleanup() {
	      event.remove(window, 'focus', handleFocus);
	    }
	
	    if (isFocused || !tryInitOnFocus) {
	      // already focused, or not special Safari background tab case
	      cleanup();
	      return true;
	    }
	
	    okToDisable = true;
	    isFocused = true;
	    _wDS('gotFocus');
	
	    // allow init to restart
	    waitingForEI = false;
	
	    // kick off ExternalInterface timeout, now that the SWF has started
	    delayWaitForEI();
	
	    cleanup();
	    return true;
	
	  };
	
	  flushMessages = function() {
	
	    // <d>
	
	    // SM2 pre-init debug messages
	    if (messages.length) {
	      sm2._wD('SoundManager 2: ' + messages.join(' '), 1);
	      messages = [];
	    }
	
	    // </d>
	
	  };
	
	  showSupport = function() {
	
	    // <d>
	
	    flushMessages();
	
	    var item, tests = [];
	
	    if (sm2.useHTML5Audio && sm2.hasHTML5) {
	      for (item in sm2.audioFormats) {
	        if (sm2.audioFormats.hasOwnProperty(item)) {
	          tests.push(item + ' = ' + sm2.html5[item] + (!sm2.html5[item] && needsFlash && sm2.flash[item] ? ' (using flash)' : (sm2.preferFlash && sm2.flash[item] && needsFlash ? ' (preferring flash)' : (!sm2.html5[item] ? ' (' + (sm2.audioFormats[item].required ? 'required, ' : '') + 'and no flash support)' : ''))));
	        }
	      }
	      sm2._wD('SoundManager 2 HTML5 support: ' + tests.join(', '), 1);
	    }
	
	    // </d>
	
	  };
	
	  initComplete = function(bNoDisable) {
	
	    if (didInit) {
	      return false;
	    }
	
	    if (sm2.html5Only) {
	      // all good.
	      _wDS('sm2Loaded', 1);
	      didInit = true;
	      initUserOnload();
	      debugTS('onload', true);
	      return true;
	    }
	
	    var wasTimeout = (sm2.useFlashBlock && sm2.flashLoadTimeout && !sm2.getMoviePercent()),
	        result = true,
	        error;
	
	    if (!wasTimeout) {
	      didInit = true;
	    }
	
	    error = {
	      type: (!hasFlash && needsFlash ? 'NO_FLASH' : 'INIT_TIMEOUT')
	    };
	
	    sm2._wD('SoundManager 2 ' + (disabled ? 'failed to load' : 'loaded') + ' (' + (disabled ? 'Flash security/load error' : 'OK') + ') ' + String.fromCharCode(disabled ? 10006 : 10003), disabled ? 2: 1);
	
	    if (disabled || bNoDisable) {
	
	      if (sm2.useFlashBlock && sm2.oMC) {
	        sm2.oMC.className = getSWFCSS() + ' ' + (sm2.getMoviePercent() === null ? swfCSS.swfTimedout : swfCSS.swfError);
	      }
	
	      processOnEvents({
	        type: 'ontimeout',
	        error: error,
	        ignoreInit: true
	      });
	
	      debugTS('onload', false);
	      catchError(error);
	
	      result = false;
	
	    } else {
	
	      debugTS('onload', true);
	
	    }
	
	    if (!disabled) {
	
	      if (sm2.waitForWindowLoad && !windowLoaded) {
	
	        _wDS('waitOnload');
	        event.add(window, 'load', initUserOnload);
	
	      } else {
	
	        // <d>
	        if (sm2.waitForWindowLoad && windowLoaded) {
	          _wDS('docLoaded');
	        }
	        // </d>
	
	        initUserOnload();
	
	      }
	
	    }
	
	    return result;
	
	  };
	
	  /**
	   * apply top-level setupOptions object as local properties, eg., this.setupOptions.flashVersion -> this.flashVersion (soundManager.flashVersion)
	   * this maintains backward compatibility, and allows properties to be defined separately for use by soundManager.setup().
	   */
	
	  setProperties = function() {
	
	    var i,
	        o = sm2.setupOptions;
	
	    for (i in o) {
	
	      if (o.hasOwnProperty(i)) {
	
	        // assign local property if not already defined
	
	        if (sm2[i] === _undefined) {
	
	          sm2[i] = o[i];
	
	        } else if (sm2[i] !== o[i]) {
	
	          // legacy support: write manually-assigned property (eg., soundManager.url) back to setupOptions to keep things in sync
	          sm2.setupOptions[i] = sm2[i];
	
	        }
	
	      }
	
	    }
	
	  };
	
	
	  init = function() {
	
	    // called after onload()
	
	    if (didInit) {
	      _wDS('didInit');
	      return false;
	    }
	
	    function cleanup() {
	      event.remove(window, 'load', sm2.beginDelayedInit);
	    }
	
	    if (sm2.html5Only) {
	
	      if (!didInit) {
	        // we don't need no steenking flash!
	        cleanup();
	        sm2.enabled = true;
	        initComplete();
	      }
	
	      return true;
	
	    }
	
	    // flash path
	    initMovie();
	
	    try {
	
	      // attempt to talk to Flash
	      flash._externalInterfaceTest(false);
	
	      /**
	       * Apply user-specified polling interval, OR, if "high performance" set, faster vs. default polling
	       * (determines frequency of whileloading/whileplaying callbacks, effectively driving UI framerates)
	       */
	      setPolling(true, (sm2.flashPollingInterval || (sm2.useHighPerformance ? 10 : 50)));
	
	      if (!sm2.debugMode) {
	        // stop the SWF from making debug output calls to JS
	        flash._disableDebug();
	      }
	
	      sm2.enabled = true;
	      debugTS('jstoflash', true);
	
	      if (!sm2.html5Only) {
	        // prevent browser from showing cached page state (or rather, restoring "suspended" page state) via back button, because flash may be dead
	        // http://www.webkit.org/blog/516/webkit-page-cache-ii-the-unload-event/
	        event.add(window, 'unload', doNothing);
	      }
	
	    } catch(e) {
	
	      sm2._wD('js/flash exception: ' + e.toString());
	
	      debugTS('jstoflash', false);
	
	      catchError({
	        type: 'JS_TO_FLASH_EXCEPTION',
	        fatal: true
	      });
	
	      // don't disable, for reboot()
	      failSafely(true);
	
	      initComplete();
	
	      return false;
	
	    }
	
	    initComplete();
	
	    // disconnect events
	    cleanup();
	
	    return true;
	
	  };
	
	  domContentLoaded = function() {
	
	    if (didDCLoaded) {
	      return false;
	    }
	
	    didDCLoaded = true;
	
	    // assign top-level soundManager properties eg. soundManager.url
	    setProperties();
	
	    initDebug();
	
	    if (!hasFlash && sm2.hasHTML5) {
	
	      sm2._wD('SoundManager 2: No Flash detected' + (!sm2.useHTML5Audio ? ', enabling HTML5.' : '. Trying HTML5-only mode.'), 1);
	
	      sm2.setup({
	        'useHTML5Audio': true,
	        // make sure we aren't preferring flash, either
	        // TODO: preferFlash should not matter if flash is not installed. Currently, stuff breaks without the below tweak.
	        'preferFlash': false
	      });
	
	    }
	
	    testHTML5();
	
	    if (!hasFlash && needsFlash) {
	
	      messages.push(strings.needFlash);
	
	      // TODO: Fatal here vs. timeout approach, etc.
	      // hack: fail sooner.
	      sm2.setup({
	        'flashLoadTimeout': 1
	      });
	
	    }
	
	    if (doc.removeEventListener) {
	      doc.removeEventListener('DOMContentLoaded', domContentLoaded, false);
	    }
	
	    initMovie();
	
	    return true;
	
	  };
	
	  domContentLoadedIE = function() {
	
	    if (doc.readyState === 'complete') {
	      domContentLoaded();
	      doc.detachEvent('onreadystatechange', domContentLoadedIE);
	    }
	
	    return true;
	
	  };
	
	  winOnLoad = function() {
	
	    // catch edge case of initComplete() firing after window.load()
	    windowLoaded = true;
	
	    // catch case where DOMContentLoaded has been sent, but we're still in doc.readyState = 'interactive'
	    domContentLoaded();
	
	    event.remove(window, 'load', winOnLoad);
	
	  };
	
	  // sniff up-front
	  detectFlash();
	
	  // focus and window load, init (primarily flash-driven)
	  event.add(window, 'focus', handleFocus);
	  event.add(window, 'load', delayWaitForEI);
	  event.add(window, 'load', winOnLoad);
	
	  if (doc.addEventListener) {
	
	    doc.addEventListener('DOMContentLoaded', domContentLoaded, false);
	
	  } else if (doc.attachEvent) {
	
	    doc.attachEvent('onreadystatechange', domContentLoadedIE);
	
	  } else {
	
	    // no add/attachevent support - safe to assume no JS -> Flash either
	    debugTS('onload', false);
	    catchError({
	      type: 'NO_DOM2_EVENTS',
	      fatal: true
	    });
	
	  }
	
	} // SoundManager()
	
	// SM2_DEFER details: http://www.schillmania.com/projects/soundmanager2/doc/getstarted/#lazy-loading
	
	if (window.SM2_DEFER === _undefined || !SM2_DEFER) {
	  soundManager = new SoundManager();
	}
	
	/**
	 * SoundManager public interfaces
	 * ------------------------------
	 */
	
	if (typeof module === 'object' && module && typeof module.exports === 'object') {
	
	  /**
	   * commonJS module
	   */
	
	  module.exports.SoundManager = SoundManager;
	  module.exports.soundManager = soundManager;
	
	} else if (true) {
	
	  /**
	   * AMD - requireJS
	   * basic usage:
	   * require(["/path/to/soundmanager2.js"], function(SoundManager) {
	   *   SoundManager.getInstance().setup({
	   *     url: '/swf/',
	   *     onready: function() { ... }
	   *   })
	   * });
	   *
	   * SM2_DEFER usage:
	   * window.SM2_DEFER = true;
	   * require(["/path/to/soundmanager2.js"], function(SoundManager) {
	   *   SoundManager.getInstance(function() {
	   *     var soundManager = new SoundManager.constructor();
	   *     soundManager.setup({
	   *       url: '/swf/',
	   *       ...
	   *     });
	   *     ...
	   *     soundManager.beginDelayedInit();
	   *     return soundManager;
	   *   })
	   * }); 
	   */
	
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    /**
	     * Retrieve the global instance of SoundManager.
	     * If a global instance does not exist it can be created using a callback.
	     *
	     * @param {Function} smBuilder Optional: Callback used to create a new SoundManager instance
	     * @return {SoundManager} The global SoundManager instance
	     */
	    function getInstance(smBuilder) {
	      if (!window.soundManager && smBuilder instanceof Function) {
	        var instance = smBuilder(SoundManager);
	        if (instance instanceof SoundManager) {
	          window.soundManager = instance;
	        }
	      }
	      return window.soundManager;
	    }
	    return {
	      constructor: SoundManager,
	      getInstance: getInstance
	    }
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	}
	
	// standard browser case
	
	// constructor
	window.SoundManager = SoundManager;
	
	/**
	 * note: SM2 requires a window global due to Flash, which makes calls to window.soundManager.
	 * Flash may not always be needed, but this is not known until async init and SM2 may even "reboot" into Flash mode.
	 */
	
	// public API, flash callbacks etc.
	window.soundManager = soundManager;
	
	}(window));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map