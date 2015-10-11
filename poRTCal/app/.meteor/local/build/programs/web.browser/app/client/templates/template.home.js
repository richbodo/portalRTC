(function(){
Template.__checkName("home");
Template["home"] = new Template("Template.home", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "row"
  }, "\n    ", HTML.DIV({
    "class": "col-md-12"
  }, "\n      ", HTML.Raw("<h1>WebRTC Signalling with Meteor demo</h1>"), "\n      ", HTML.Raw("<p>To start the chat open another browser window or go on your phone/tablet or get friend to go to this same address</p>"), "\n      ", HTML.P("Specifically open in another device/window ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("roomName"));
    },
    target: "_blank"
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("roomName"));
  }))), "\n      ", HTML.Raw("<p>This demo sets up a video and audio call with one other person on who is at the same URL</p>"), "\n      ", HTML.BUTTON(HTML.Attrs({
    "class": "btn btn-info",
    name: "call"
  }, function() {
    return Spacebars.attrMustache(view.lookup("canCall"));
  }), Blaze.View(function() {
    return Spacebars.mustache(view.lookup("callText"));
  })), "\n    "), "\n  "), "\n  ", HTML.DIV({
    "class": "row"
  }, "\n    ", HTML.DIV({
    "class": "col-xs-6"
  }, "\n      ", HTML.DIV({
    "class": "stream local-stream"
  }, "\n        ", HTML.Raw("<h2>Local GetUserMedia Video</h2>"), "\n        ", HTML.VIDEO({
    id: "local-stream",
    src: function() {
      return Spacebars.mustache(view.lookup("localStream"));
    },
    autoplay: "",
    muted: ""
  }), "\n      "), "\n    "), "\n    ", HTML.DIV({
    "class": "col-xs-6"
  }, "\n      ", HTML.DIV({
    "class": "stream remote-stream"
  }, "\n        ", HTML.Raw("<h2>Remote WebRTC Video Stream</h2>"), "\n        ", HTML.VIDEO({
    src: function() {
      return Spacebars.mustache(view.lookup("remoteStream"));
    },
    autoplay: ""
  }), "\n      "), "\n    "), "\n  ") ];
}));

})();
