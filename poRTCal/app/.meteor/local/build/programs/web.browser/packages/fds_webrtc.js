//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Random = Package.random.Random;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var _ = Package.underscore._;
var Mongo = Package.mongo.Mongo;

/* Package-scope variables */
var __coffeescriptShare;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/fds:webrtc/lib/client/shim.coffee.js                                                                   //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this.RTCPeerConnection = window.mozRTCPeerConnection || window.PeerConnection || window.RTCPeerConnection || window.webkitPeerConnection00 || window.webkitRTCPeerConnection;

this.IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;

this.SessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;

this.MediaStream = window.MediaStream || window.webkitMediaStream;

navigator.getUserMedia = navigator.mozGetUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia;

this.URL = window.URL || window.webkitURL || window.msURL || window.oURL;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/fds:webrtc/lib/client/image_streamer.coffee.js                                                         //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
'use strict';  __coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var byteLength,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

byteLength = function(str) {
  return encodeURI(str).split(/%..|./).length - 1;
};

this.ImageVideoUserMediaGetter = (function() {
  function ImageVideoUserMediaGetter(mediaConfig) {
    if (mediaConfig == null) {
      mediaConfig = {};
    }
    this._gUMError = __bind(this._gUMError, this);
    this._gUMSuccess = __bind(this._gUMSuccess, this);
    this._gotMediaSources = __bind(this._gotMediaSources, this);
    this.stop = __bind(this.stop, this);
    this._localStreamUrl = new ReactiveVar;
    this._mediaConfig = _.defaults(mediaConfig, {
      audio: false,
      video: {
        mandatory: {
          maxWidth: 320,
          maxHeight: 240,
          minWidth: 320,
          minHeight: 240
        }
      }
    });
  }

  ImageVideoUserMediaGetter.prototype.start = function() {
    return MediaStreamTrack.getSources(this._gotMediaSources);
  };

  ImageVideoUserMediaGetter.prototype.stop = function() {
    var _ref;
    if ((_ref = this._stream) != null) {
      _ref.stop();
    }
    return this._localStreamUrl.set(null);
  };

  ImageVideoUserMediaGetter.prototype._gotMediaSources = function(sources) {
    var source, _base, _i, _len;
    for (_i = 0, _len = sources.length; _i < _len; _i++) {
      source = sources[_i];
      if (source.kind === 'video' && source.facing === 'user') {
        if ((_base = this._mediaConfig.video).optional == null) {
          _base.optional = [];
        }
        this._mediaConfig.video.optional.push;
        break;
      }
    }
    return navigator.getUserMedia(this._mediaConfig, this._gUMSuccess, this._gUMError);
  };

  ImageVideoUserMediaGetter.prototype.getStreamUrl = function() {
    return this._localStreamUrl.get();
  };

  ImageVideoUserMediaGetter.prototype._gUMSuccess = function(_stream) {
    this._stream = _stream;
    return this._localStreamUrl.set(URL.createObjectURL(this._stream));
  };

  ImageVideoUserMediaGetter.prototype._gUMError = function(error) {
    return console.error(error);
  };

  return ImageVideoUserMediaGetter;

})();

this.ImageStreamer = (function() {
  function ImageStreamer(options) {
    if (options == null) {
      options = {};
    }
    this._update = __bind(this._update, this);
    this.setShouldSendVideo = __bind(this.setShouldSendVideo, this);
    this.setFps = __bind(this.setFps, this);
    this.setHeight = __bind(this.setHeight, this);
    this.setWidth = __bind(this.setWidth, this);
    this.getShouldSendVideo = __bind(this.getShouldSendVideo, this);
    this.getFps = __bind(this.getFps, this);
    this.getHeight = __bind(this.getHeight, this);
    this.getWidth = __bind(this.getWidth, this);
    this.setQuality = __bind(this.setQuality, this);
    this.getQuality = __bind(this.getQuality, this);
    this.getOtherVideo = __bind(this.getOtherVideo, this);
    this.getLocalImageBytesPerSecond = __bind(this.getLocalImageBytesPerSecond, this);
    this.getLocalImageByteLength = __bind(this.getLocalImageByteLength, this);
    this.getLocalImageDataUrl = __bind(this.getLocalImageDataUrl, this);
    this.ready = __bind(this.ready, this);
    this.stop = __bind(this.stop, this);
    this.start = __bind(this.start, this);
    this.init = __bind(this.init, this);
    _.defaults(options, {
      quality: 0.5,
      width: 200,
      height: 150,
      fps: 30,
      shouldSendVideo: true,
      dataUrlType: 'image/webp'
    });
    this._dataUrlType = options.dataUrlType;
    this._ready = new ReactiveVar(false);
    this._quality = new ReactiveVar(options.quality);
    this._localImageDataUrl = new ReactiveVar;
    this._localImageByteLength = new ReactiveVar;
    this._localImageBytesPerSecond = new ReactiveVar;
    this._lastUpdatedTime = null;
    this._sumOfBytesSinceLastTime = 0;
    this._width = new ReactiveVar(options.width);
    this._height = new ReactiveVar(options.height);
    this._fps = new ReactiveVar(options.fps);
    this._timeSinceLastFrame = Infinity;
    this._lastFrameAt = 0;
    this._shoulSendVideo = new ReactiveVar(options.shouldSendVideo);
    this._otherVideo = new ReactiveVar(null);
    this._canvas = document.createElement('canvas');
    this._ctx = this._canvas.getContext('2d');
  }

  ImageStreamer.prototype.init = function(_dataChannel, _videoEl, _imgEl) {
    this._dataChannel = _dataChannel;
    this._videoEl = _videoEl;
    this._imgEl = _imgEl;
    this._ready.set(true);
    this._sendNextVideo = true;
    return this._dataChannel.addOnMessageListener((function(_this) {
      return function(data) {
        var message;
        message = JSON.parse(data);
        if (message == null) {
          return;
        }
        switch (message.type) {
          case 'send':
            _this._otherVideo.set(message.dataUrl);
            return _this._dataChannel.sendData(JSON.stringify({
              type: 'ack'
            }));
          case 'ack':
            return _this._sendNextVideo = true;
        }
      };
    })(this));
  };

  ImageStreamer.prototype.start = function() {
    return this._nextAnimationFrame = requestAnimationFrame(this._update);
  };

  ImageStreamer.prototype.stop = function() {
    return cancelAnimationFrame(this._nextAnimationFrame);
  };

  ImageStreamer.prototype.ready = function() {
    return this._ready.get();
  };

  ImageStreamer.prototype.getLocalImageDataUrl = function() {
    return this._localImageDataUrl.get();
  };

  ImageStreamer.prototype.getLocalImageByteLength = function() {
    return this._localImageByteLength.get();
  };

  ImageStreamer.prototype.getLocalImageBytesPerSecond = function() {
    return this._localImageBytesPerSecond.get();
  };

  ImageStreamer.prototype.getOtherVideo = function() {
    return this._otherVideo.get();
  };

  ImageStreamer.prototype.getQuality = function() {
    return this._quality.get();
  };

  ImageStreamer.prototype.setQuality = function(value) {
    return this._quality.set(value);
  };

  ImageStreamer.prototype.getWidth = function() {
    return this._width.get();
  };

  ImageStreamer.prototype.getHeight = function() {
    return this._height.get();
  };

  ImageStreamer.prototype.getFps = function() {
    return this._fps.get();
  };

  ImageStreamer.prototype.getShouldSendVideo = function() {
    return this._shoulSendVideo.get();
  };

  ImageStreamer.prototype.setWidth = function(width) {
    return this._width.set(width);
  };

  ImageStreamer.prototype.setHeight = function(height) {
    return this._height.set(height);
  };

  ImageStreamer.prototype.setFps = function(fps) {
    return this._fps.set(fps);
  };

  ImageStreamer.prototype.setShouldSendVideo = function(state) {
    return this._shoulSendVideo.set(state);
  };

  ImageStreamer.prototype._update = function() {
    var data, dataBytesLength, height, now, timeDiff, width;
    now = Date.now();
    if (!this._shoulSendVideo.get() || now - this._lastFrameAt < 1000 / this._fps.get()) {
      requestAnimationFrame(this._update);
      return;
    }
    this._lastFrameAt = now;
    width = this._width.get();
    height = this._height.get();
    this._canvas.width = width;
    this._canvas.height = height;
    this._ctx.drawImage(this._videoEl, 0, 0, width, height);
    data = this._canvas.toDataURL(this._dataUrlType, this._quality.get());
    dataBytesLength = byteLength(data);
    this._localImageByteLength.set(dataBytesLength);
    this._localImageDataUrl.set(data);
    if (this._dataChannel.isOpen() && this._sendNextVideo) {
      if (this._lastUpdatedTime != null) {
        timeDiff = now - this._lastUpdatedTime;
        if (timeDiff > 1000) {
          this._localImageBytesPerSecond.set(1000 / timeDiff * this._sumOfBytesSinceLastTime);
          this._lastUpdatedTime = now;
          this._sumOfBytesSinceLastTime = 0;
        } else {
          this._sumOfBytesSinceLastTime += dataBytesLength;
        }
      } else {
        this._lastUpdatedTime = now;
        this._sumOfBytesSinceLastTime += dataBytesLength;
      }
      this._dataChannel.sendData(JSON.stringify({
        type: 'send',
        dataUrl: data
      }));
      this._sendNextVideo = true;
    }
    return requestAnimationFrame(this._update);
  };

  return ImageStreamer;

})();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/fds:webrtc/lib/client/message_stream_proxy.coffee.js                                                   //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
share.MessageStreamProxy = (function() {
  function MessageStreamProxy(_stream, _channelName, _to) {
    this._stream = _stream;
    this._channelName = _channelName;
    this._to = _to;
  }

  MessageStreamProxy.prototype.emit = function(message) {
    message._to = this._to;
    return this._stream.emit(this._channelName, message);
  };

  return MessageStreamProxy;

})();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/fds:webrtc/lib/client/multi_webrtc_signaller_manager.coffee.js                                         //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

this.MultiWebRTCSignallerManager = (function() {
  function MultiWebRTCSignallerManager(_stream, _channelName, _id, _servers, _config, mediaConfig) {
    this._stream = _stream;
    this._channelName = _channelName;
    this._id = _id;
    this._servers = _servers;
    this._config = _config;
    this._handleMessage = __bind(this._handleMessage, this);
    this._connectionMap = {};
    this.setMediaConfig(mediaConfig);
    this._stream.on(this._channelName, this._handleMessage);
    this._data = new ReactiveVar();
  }

  MultiWebRTCSignallerManager.prototype.setMediaConfig = function(_mediaConfig) {
    this._mediaConfig = _mediaConfig;
  };

  MultiWebRTCSignallerManager.prototype.getData = function() {
    return this._data.get();
  };

  MultiWebRTCSignallerManager.prototype.requestCall = function() {
    return this._stream.emit(this._channelName, {
      callMe: true
    });
  };

  MultiWebRTCSignallerManager.prototype._handleMessage = function(message) {
    var signaller, signallerConnection;
    signallerConnection = this._connectionMap[message.from];
    if (signallerConnection == null) {
      signaller = new WebRTCSignaller(new share.MessageStreamProxy(this._stream, this._channelName, message.from), this._id, this._servers, this._config, this._mediaConfig);
      signallerConnection = {
        signaller: signaller,
        dataChannels: {}
      };
      this._connectionMap[message.from] = signallerConnection;
      Tracker.autorun((function(_this) {
        return function() {
          var dataChannel, dataChannels, _i, _len, _results;
          dataChannels = signaller.getDataChannels();
          _results = [];
          for (_i = 0, _len = dataChannels.length; _i < _len; _i++) {
            dataChannel = dataChannels[_i];
            if (signallerConnection[dataChannel.getLabel()] == null) {
              _results.push(Tracker.autorun(function() {
                return _this._data.set(dataChannel.getData());
              }));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        };
      })(this));
    }
    signaller = signallerConnection.signaller;
    return signaller.handleMessage(message);
  };

  return MultiWebRTCSignallerManager;

})();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/fds:webrtc/lib/client/reactive_data_channel_factory.coffee.js                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var ReactiveDataChannel,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ReactiveDataChannel = (function() {
  function ReactiveDataChannel() {
    this._handleStateChange = __bind(this._handleStateChange, this);
    this._handleOnClose = __bind(this._handleOnClose, this);
    this.addOnMessageListener = __bind(this.addOnMessageListener, this);
    this._handleMessage = __bind(this._handleMessage, this);
    this._isOpen = new ReactiveVar(false);
    this._data = new ReactiveVar(null);
    this._listeners = [];
  }

  ReactiveDataChannel.prototype.getLabel = function() {
    return this._label;
  };

  ReactiveDataChannel.prototype.setLabelAndConfig = function(_label, _config) {
    this._label = _label;
    this._config = _config != null ? _config : {};
    if (this._dataChannel != null) {
      throw new Error('Unable to set label and config, a data channel has aleady been set');
    }
  };

  ReactiveDataChannel.prototype.setDataChannel = function(rtcDataChannel) {
    if (this._rtcDataChannel != null) {
      this.close();
    }
    return this._setRtcDataChannel(rtcDataChannel);
  };

  ReactiveDataChannel.prototype.create = function(rtcPeerConnection) {
    var error, rtcDataChannel;
    try {
      rtcDataChannel = rtcPeerConnection.createDataChannel(this._label, this._config);
    } catch (_error) {
      error = _error;
      console.error("Unable to create data channel:" + error);
      return;
    }
    return this._setRtcDataChannel(rtcDataChannel);
  };

  ReactiveDataChannel.prototype.isOpen = function() {
    return this._isOpen.get();
  };

  ReactiveDataChannel.prototype.getData = function() {
    return this._data.get();
  };

  ReactiveDataChannel.prototype.sendData = function(data) {
    var error;
    if (this._rtcDataChannel == null) {
      throw new Error('No data channel set');
    }
    if (!this.isOpen()) {
      throw new Error('Data channel is not open');
    }
    if (this._rtcDataChannel.readyState === 'open') {
      try {
        return this._rtcDataChannel.send(data);
      } catch (_error) {
        error = _error;
        return console.error(error);
      }
    }
  };

  ReactiveDataChannel.prototype.close = function() {
    var _ref;
    if ((_ref = this._rtcDataChannel) != null) {
      _ref.close();
    }
    this._rtcDataChannel = null;
    return this._isOpen.set(false);
  };

  ReactiveDataChannel.prototype._setRtcDataChannel = function(_rtcDataChannel) {
    this._rtcDataChannel = _rtcDataChannel;
    this._rtcDataChannel.onmessage = this._handleMessage;
    this._rtcDataChannel.onopen = this._handleStateChange;
    return this._rtcDataChannel.onclose = this._handleOnClose;
  };

  ReactiveDataChannel.prototype._handleMessage = function(event) {
    var listener, _i, _len, _ref, _results;
    this._data.set(event.data);
    _ref = this._listeners;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      listener = _ref[_i];
      _results.push(listener(event.data));
    }
    return _results;
  };

  ReactiveDataChannel.prototype.addOnMessageListener = function(listener) {
    return this._listeners.push(listener);
  };

  ReactiveDataChannel.prototype._handleOnClose = function() {
    this.close();
    return this._handleStateChange.apply(this, arguments);
  };

  ReactiveDataChannel.prototype._handleStateChange = function() {
    var readyState, _ref;
    readyState = (_ref = this._rtcDataChannel) != null ? _ref.readyState : void 0;
    return this._isOpen.set(readyState === 'open');
  };

  return ReactiveDataChannel;

})();

this.ReactiveDataChannelFactory = (function() {
  function ReactiveDataChannelFactory() {}

  ReactiveDataChannelFactory.fromLabelAndConfig = function(label, config) {
    var dataChannel;
    dataChannel = new ReactiveDataChannel();
    dataChannel.setLabelAndConfig(label, config);
    return dataChannel;
  };

  ReactiveDataChannelFactory.fromRtcDataChannel = function(rtcDataChannel) {
    var dataChannel;
    dataChannel = new ReactiveDataChannel();
    dataChannel.setDataChannel(rtcDataChannel);
    return dataChannel;
  };

  return ReactiveDataChannelFactory;

})();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/fds:webrtc/lib/client/single_web_rtc_signaller_factory.coffee.js                                       //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this.SingleWebRTCSignallerFactory = (function() {
  function SingleWebRTCSignallerFactory() {}

  SingleWebRTCSignallerFactory.create = function(stream, channelName, id, servers, config, mediaConfig, options) {
    var signaller;
    signaller = new WebRTCSignaller(new share.MessageStreamProxy(stream, channelName, 'master'), id, servers, config, mediaConfig, options);
    stream.on(channelName, function(message) {
      if (message._to === id || message.callMe) {
        return signaller.handleMessage(message);
      }
    });
    return signaller;
  };

  return SingleWebRTCSignallerFactory;

})();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/fds:webrtc/lib/client/webrtc_signaller.coffee.js                                                       //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var counter, sessionId,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

counter = 0;

sessionId = Random.hexString(20);

this.WebRTCSignaller = (function() {
  function WebRTCSignaller(_messageStream, _id, _servers, _config, mediaConfig, options) {
    this._messageStream = _messageStream;
    this._id = _id;
    this._servers = _servers;
    this._config = _config;
    if (options == null) {
      options = {};
    }
    this._createAnswer = __bind(this._createAnswer, this);
    this._onRemoteDescriptionSet = __bind(this._onRemoteDescriptionSet, this);
    this._onLocalDescriptionSet = __bind(this._onLocalDescriptionSet, this);
    this._localDescriptionCreated = __bind(this._localDescriptionCreated, this);
    this._onAddStream = __bind(this._onAddStream, this);
    this._onDataChannel = __bind(this._onDataChannel, this);
    this._createOffer = __bind(this._createOffer, this);
    this._onIceCandidate = __bind(this._onIceCandidate, this);
    this._handleIceCandidate = __bind(this._handleIceCandidate, this);
    this._handleSDP = __bind(this._handleSDP, this);
    this.handleMessage = __bind(this.handleMessage, this);
    _.defaults(options, {
      audioBandwidth: null,
      videoBandwidth: null
    });
    this._audioBandwidth = options.audioBandwidth;
    this._videoBandwidth = options.videoBandwidth;
    this.setMediaConfig(mediaConfig);
    this._started = new ReactiveVar(false);
    this._waitingForResponse = new ReactiveVar(false);
    this._waitingForUserMedia = new ReactiveVar(false);
    this._waitingToCreateAnswer = new ReactiveVar(false);
    this._inCall = new ReactiveVar(false);
    this._lastGetUserMediaError = new ReactiveVar(null);
    this._localStreamUrl = new ReactiveVar(null);
    this._remoteStream = new ReactiveVar(null);
    this._dataChannels = [];
    this._pendingDataChannels = [];
    this._dataChannelsMap = {};
    this._numberOfDataChannels = new ReactiveVar(this._dataChannels.length);
    counter += 1;
    this._currentConnectionId = {
      sessionId: sessionId,
      counter: counter
    };
  }

  WebRTCSignaller.prototype.started = function() {
    return this._started.get();
  };

  WebRTCSignaller.prototype.inCall = function() {
    return this._inCall.get();
  };

  WebRTCSignaller.prototype.waitingForUserMedia = function() {
    return this._waitingForUserMedia.get();
  };

  WebRTCSignaller.prototype.waitingForResponse = function() {
    return this._waitingForResponse.get();
  };

  WebRTCSignaller.prototype.waitingToCreateAnswer = function() {
    return this._waitingToCreateAnswer.get();
  };

  WebRTCSignaller.prototype.lastGetUserMediaError = function() {
    return this._lastGetUserMediaError.get();
  };

  WebRTCSignaller.prototype.getLocalStream = function() {
    return this._localStreamUrl.get();
  };

  WebRTCSignaller.prototype.getRemoteStream = function() {
    return this._remoteStream.get();
  };

  WebRTCSignaller.prototype.getDataChannels = function() {
    this._numberOfDataChannels.get();
    return this._dataChannels;
  };

  WebRTCSignaller.prototype.setMediaConfig = function(mediaConfig) {
    this.mediaConfig = mediaConfig;
  };

  WebRTCSignaller.prototype.start = function() {
    return this._createRtcPeerConnection();
  };

  WebRTCSignaller.prototype.addDataChannel = function(dataChannel) {
    if (this._rtcPeerConnection != null) {
      dataChannel.create(this._rtcPeerConnection);
    } else {
      this._pendingDataChannels.push(dataChannel);
    }
    return this._addDataChannel(dataChannel);
  };

  WebRTCSignaller.prototype.createOffer = function() {
    this._createLocalStream(this._createOffer);
    return this._waitingForResponse.set(true);
  };

  WebRTCSignaller.prototype.requestCall = function() {
    return this._sendMessage({
      callMe: true
    });
  };

  WebRTCSignaller.prototype.stop = function() {
    var dataChannel, _i, _len, _ref;
    _ref = this._dataChannels;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      dataChannel = _ref[_i];
      dataChannel.close();
    }
    if (this._rtcPeerConnection != null) {
      this._rtcPeerConnection.close();
      this._rtcPeerConnection = null;
    }
    if (this._localStream != null) {
      this._localStream.stop();
      this._localStream = null;
    }
    this._started.set(false);
    return this._changeInCall(false);
  };

  WebRTCSignaller.prototype.ignoreMessages = function() {
    return this._ignoreMessages = true;
  };

  WebRTCSignaller.prototype._addDataChannel = function(dataChannel) {
    this._dataChannels.push(dataChannel);
    this._dataChannelsMap[dataChannel.getLabel()] = dataChannel;
    return this._numberOfDataChannels.set(this._dataChannels.length);
  };

  WebRTCSignaller.prototype._sendMessage = function(message) {
    message.from = this._id;
    message.connectionId = this._currentConnectionId;
    message.toConnectionId = this._currentToConnectionId;
    return this._messageStream.emit(message);
  };

  WebRTCSignaller.prototype._connectionIdsEqual = function(connectionA, connectionB) {
    if (!((connectionA != null) && (connectionB != null))) {
      return true;
    }
    return connectionA.counter === connectionB.counter && connectionA.sessionId === connectionB.sessionId;
  };

  WebRTCSignaller.prototype.handleMessage = function(message) {
    if (this._ignoreMessages) {
      console.log('ignoring message');
      return;
    }
    if ((this._currentToConnectionId == null) || message.connectionId.counter > this._currentToConnectionId.counter || message.connectionId.sessionId !== this._currentToConnectionId.sessionId) {
      this._currentToConnectionId = message.connectionId;
    }
    if (message.callMe) {
      this.stop();
      this.start();
      this.createOffer();
    } else if (message.sdp != null) {
      if (this._currentToConnectionId != null) {
        if (!this._connectionIdsEqual(message.toConnectionId, this._currentConnectionId)) {
          console.log('SDP no for me');
          return;
        }
      }
      this._handleSDP(JSON.parse(message.sdp));
    } else if (message.candidate != null) {
      if (this._currentToConnectionId != null) {
        if (!this._connectionIdsEqual(message.toConnectionId, this._currentConnectionId)) {
          console.log('ICE not for me');
          return;
        }
      }
      this._handleIceCandidate(JSON.parse(message.candidate));
    } else {
      this._logError('Unknown message', meesage);
    }
    return this._changeInCall(true);
  };

  WebRTCSignaller.prototype._changeInCall = function(state) {
    this._inCall.set(state);
    if (state) {
      return this._waitingForResponse.set(false);
    }
  };

  WebRTCSignaller.prototype._handleSDP = function(sdp) {
    var remoteDescription;
    remoteDescription = new SessionDescription(sdp);
    if (remoteDescription.type === 'offer') {
      if (this._rtcPeerConnection != null) {
        this.stop();
      }
      this._createRtcPeerConnection();
    }
    return this._rtcPeerConnection.setRemoteDescription(remoteDescription, this._onRemoteDescriptionSet, this._logError);
  };

  WebRTCSignaller.prototype._handleIceCandidate = function(candidate) {
    var iceCandidate;
    iceCandidate = new IceCandidate(candidate);
    return this._rtcPeerConnection.addIceCandidate(iceCandidate, this._iceSuccess, this._iceFailure);
  };

  WebRTCSignaller.prototype._iceSuccess = function() {
    return console.log('added ice candidiate');
  };

  WebRTCSignaller.prototype._iceFailure = function() {
    return console.error('Failed to add ice candidate', arguments);
  };

  WebRTCSignaller.prototype._onIceCandidate = function(event) {
    if (!event.candidate) {
      return;
    }
    return this._sendMessage({
      candidate: JSON.stringify(event.candidate)
    });
  };

  WebRTCSignaller.prototype._createOffer = function() {
    this._rtcPeerConnection.createOffer(this._localDescriptionCreated, this._logError);
    return this._changeInCall(true);
  };

  WebRTCSignaller.prototype._onDataChannel = function(event) {
    var dataChannel;
    dataChannel = this._dataChannelsMap[event.channel.label];
    if (dataChannel != null) {
      return dataChannel.setDataChannel(event.channel);
    } else {
      dataChannel = ReactiveDataChannelFactory.fromRtcDataChannel(event.channel);
      return this._addDataChannel(dataChannel);
    }
  };

  WebRTCSignaller.prototype._onAddStream = function(event) {
    return this._remoteStream.set(URL.createObjectURL(event.stream));
  };

  WebRTCSignaller.prototype._createLocalStream = function(callback) {
    var addStreamToRtcPeerConnection;
    if (this.mediaConfig == null) {
      return callback();
    }
    addStreamToRtcPeerConnection = (function(_this) {
      return function() {
        return _this._rtcPeerConnection.addStream(_this._localStream);
      };
    })(this);
    if ((this._localStream != null) && _.isEqual(this.mediaConfig, this._lastMediaConfig)) {
      addStreamToRtcPeerConnection();
      return callback();
    }
    this._lastMediaConfig = _.clone(this.mediaConfig);
    this._waitingForUserMedia.set(true);
    return navigator.getUserMedia(this.mediaConfig, (function(_this) {
      return function(stream) {
        _this._localStream = stream;
        addStreamToRtcPeerConnection();
        _this._localStreamUrl.set(URL.createObjectURL(stream));
        if (callback != null) {
          callback();
        }
        return _this._waitingForUserMedia.set(false);
      };
    })(this), (function(_this) {
      return function(error) {
        _this._waitingForUserMedia.set(false);
        _this._lastGetUserMediaError.set(error);
        return _this._logError(error);
      };
    })(this));
  };

  WebRTCSignaller.prototype._localDescriptionCreated = function(description) {
    description.sdp = this._maybeSetBandwidthLimits(description.sdp);
    return this._rtcPeerConnection.setLocalDescription(description, this._onLocalDescriptionSet, this._logError);
  };

  WebRTCSignaller.prototype._onLocalDescriptionSet = function() {
    return this._sendMessage({
      sdp: JSON.stringify(this._rtcPeerConnection.localDescription)
    });
  };

  WebRTCSignaller.prototype._onRemoteDescriptionSet = function() {
    if (this._rtcPeerConnection.remoteDescription.type !== 'offer') {
      return;
    }
    this._waitingToCreateAnswer.set(true);
    return this._createLocalStream(this._createAnswer);
  };

  WebRTCSignaller.prototype._createAnswer = function() {
    this._rtcPeerConnection.createAnswer(this._localDescriptionCreated, this._logError);
    return this._waitingToCreateAnswer.set(false);
  };

  WebRTCSignaller.prototype._createRtcPeerConnection = function() {
    var dataChannel, _i, _len, _ref;
    this._rtcPeerConnection = new RTCPeerConnection(this._servers, this._config);
    this._rtcPeerConnection.onicecandidate = this._onIceCandidate;
    this._rtcPeerConnection.ondatachannel = this._onDataChannel;
    this._rtcPeerConnection.onaddstream = this._onAddStream;
    _ref = this._dataChannels;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      dataChannel = _ref[_i];
      dataChannel.create(this._rtcPeerConnection);
    }
    return this._started.set(true);
  };

  WebRTCSignaller.prototype._logError = function(message) {
    return console.error(message);
  };

  WebRTCSignaller.prototype._maybeSetBandwidthLimits = function(sdp) {
    if (this._audioBandwidth != null) {
      sdp = sdp.replace(/a=mid:audio\r\n/g, "a=mid:audio\r\nb=AS:" + this._audioBandwidth + "\r\n");
    }
    if (this._videoBandwidth != null) {
      sdp = sdp.replace(/a=mid:video\r\n/g, "a=mid:video\r\nb=AS:" + this._videoBandwidth + "\r\n");
    }
    return sdp;
  };

  return WebRTCSignaller;

})();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['fds:webrtc'] = {};

})();
