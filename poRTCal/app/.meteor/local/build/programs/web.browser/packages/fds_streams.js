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
var _ = Package.underscore._;

/* Package-scope variables */
var EV;

(function () {

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
// packages/fds:streams/lib/ev.js                                               //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
                                                                                //
function _EV() {                                                                // 1
  var self = this;                                                              // 2
  var handlers = {};                                                            // 3
                                                                                // 4
  self.emit = function emit(event) {                                            // 5
    var args = Array.prototype.slice.call(arguments, 1);                        // 6
                                                                                // 7
    if(handlers[event]) {                                                       // 8
      for(var lc=0; lc<handlers[event].length; lc++) {                          // 9
        var handler = handlers[event][lc];                                      // 10
        handler.apply(this, args);                                              // 11
      }                                                                         // 12
    }                                                                           // 13
  };                                                                            // 14
                                                                                // 15
  self.on = function on(event, callback) {                                      // 16
    if(!handlers[event]) {                                                      // 17
      handlers[event] = [];                                                     // 18
    }                                                                           // 19
    handlers[event].push(callback);                                             // 20
  };                                                                            // 21
                                                                                // 22
  self.once = function once(event, callback) {                                  // 23
    self.on(event, function onetimeCallback() {                                 // 24
      callback.apply(this, arguments);                                          // 25
      self.removeListener(event, onetimeCallback);                              // 26
    });                                                                         // 27
  };                                                                            // 28
                                                                                // 29
  self.removeListener = function removeListener(event, callback) {              // 30
    if(handlers[event]) {                                                       // 31
      var index = handlers[event].indexOf(callback);                            // 32
      handlers[event].splice(index, 1);                                         // 33
    }                                                                           // 34
  };                                                                            // 35
                                                                                // 36
  self.removeAllListeners = function removeAllListeners(event) {                // 37
    handlers[event] = undefined;                                                // 38
  };                                                                            // 39
}                                                                               // 40
                                                                                // 41
EV = _EV;                                                                       // 42
//////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
// packages/fds:streams/lib/client.js                                           //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
                                                                                //
Meteor.Stream = function Stream(name, _callback, _options) {                    // 1
  EV.call(this);                                                                // 2
                                                                                // 3
  var callback;                                                                 // 4
  var options;                                                                  // 5
  var connection;                                                               // 6
                                                                                // 7
  if (typeof _callback === 'function') {                                        // 8
    callback = _callback;                                                       // 9
    if (typeof _options === 'object') {                                         // 10
      options = _options;                                                       // 11
    }                                                                           // 12
  } else if (typeof _callback === 'object') {                                   // 13
    options = _callback;                                                        // 14
  }                                                                             // 15
                                                                                // 16
  if (options && options.connection) {                                          // 17
    connection = options.connection;                                            // 18
  }                                                                             // 19
                                                                                // 20
  var self = this;                                                              // 21
  var streamName = 'stream-' + name;                                            // 22
                                                                                // 23
  var collectionOptions = {}                                                    // 24
  if (connection) {                                                             // 25
    collectionOptions.connection = connection;                                  // 26
  }                                                                             // 27
  var collection = new Meteor.Collection(streamName, collectionOptions);        // 28
                                                                                // 29
  var subscription;                                                             // 30
  var subscriptionId;                                                           // 31
                                                                                // 32
  var connected = false;                                                        // 33
  var pendingEvents = [];                                                       // 34
                                                                                // 35
  self._emit = self.emit;                                                       // 36
                                                                                // 37
  collection.find({}).observe({                                                 // 38
    "added": function(item) {                                                   // 39
      if(item.type == 'subscriptionId') {                                       // 40
        subscriptionId = item._id;                                              // 41
        connected = true;                                                       // 42
        pendingEvents.forEach(function(args) {                                  // 43
          self.emit.apply(self, args);                                          // 44
        });                                                                     // 45
        pendingEvents = [];                                                     // 46
      } else {                                                                  // 47
        var context = {};                                                       // 48
        context.subscriptionId = item.subscriptionId;                           // 49
        context.userId = item.userId;                                           // 50
        self._emit.apply(context, item.args);                                   // 51
      }                                                                         // 52
    }                                                                           // 53
  });                                                                           // 54
                                                                                // 55
                                                                                // 56
  // By using Meteor.subscribe, Meteor.call etc. we use the default connection, // 57
  // if a connection was specified in the options we use that instead.          // 58
  var ddpConnection = Meteor;                                                   // 59
  if (connection) {                                                             // 60
    ddpConnection = connection;                                                 // 61
  }                                                                             // 62
                                                                                // 63
  subscription = ddpConnection.subscribe(streamName, callback);                 // 64
                                                                                // 65
  self.emit = function emit() {                                                 // 66
    if(connected) {                                                             // 67
      ddpConnection.call(streamName, subscriptionId, arguments);                // 68
    } else {                                                                    // 69
      pendingEvents.push(arguments);                                            // 70
    }                                                                           // 71
  };                                                                            // 72
                                                                                // 73
  self.close = function close() {                                               // 74
    subscription.stop();                                                        // 75
  };                                                                            // 76
}                                                                               // 77
                                                                                // 78
_.extend(Meteor.Stream.prototype, EV.prototype);                                // 79
                                                                                // 80
//////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['fds:streams'] = {};

})();
