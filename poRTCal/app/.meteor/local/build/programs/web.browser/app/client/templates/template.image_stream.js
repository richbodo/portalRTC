(function(){
Template.__checkName("ImageStream");
Template["ImageStream"] = new Template("Template.ImageStream", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "row"
  }, "\n    ", HTML.DIV({
    "class": "col-md-12"
  }, "\n", Spacebars.include(view.lookupTemplate("markdown"), function() {
    return "\n#WebRTC Video via Image streaming\n\n__Stream video as a series of images via datachannels__\n\nQ. Why?\n\nA. It's an experiment for a very small use case (Streaming video over local networks for live performances) we want to be able to have greater\ncontrol over what video is displayed.\n";
  }), "\n      ", HTML.Raw("<p>To start the chat open another browser window or go on your phone/tablet or get friend to go to this same address</p>"), "\n      ", HTML.P("Specifically open in another device/window ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("roomName"));
    },
    target: "_blank"
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("roomName"));
  }))), "\n      ", HTML.BUTTON(HTML.Attrs({
    "class": "btn btn-info",
    name: "call"
  }, function() {
    return Spacebars.attrMustache(view.lookup("canCall"));
  }), Blaze.View(function() {
    return Spacebars.mustache(view.lookup("callText"));
  })), "\n    "), "\n  "), HTML.Raw('\n  <div class="row">\n    <div class="col-md-12">\n      <h2>Normal WebRTC video streams</h2>\n      <p>\n        This is the video that WebRTC sets up, using video codecs - smart things etc.\n      </p>\n    </div>\n  </div>\n  '), HTML.DIV({
    "class": "row"
  }, "\n    ", HTML.DIV({
    "class": "col-xs-6"
  }, "\n      ", HTML.DIV({
    "class": "stream local-stream"
  }, "\n        ", HTML.VIDEO({
    id: "local-stream",
    src: function() {
      return Spacebars.mustache(view.lookup("localStream"));
    },
    autoplay: "",
    muted: ""
  }), "\n        ", HTML.Raw("<p>Local video</p>"), "\n      "), "\n    "), "\n    ", HTML.DIV({
    "class": "col-xs-6"
  }, "\n      ", HTML.DIV({
    "class": "stream remote-stream"
  }, "\n        ", HTML.VIDEO({
    src: function() {
      return Spacebars.mustache(view.lookup("remoteStream"));
    },
    autoplay: ""
  }), "\n        ", HTML.Raw("<p>Remote video</p>"), "\n      "), "\n    "), "\n  "), "\n  ", HTML.DIV({
    "class": "row"
  }, "\n    ", HTML.DIV({
    "class": "col-md-12"
  }, "\n      ", HTML.Raw("<h2>Video created by sending a stream of individual images</h2>"), "\n", Spacebars.include(view.lookupTemplate("markdown"), function() {
    return "\n  Images from them local webcam video from a call to `getUserMedia` we get jpegs/webp images by copying the image\n  to a canvas and calling `toDataURL`.\n\n  This is sent down a datachannel and then set as the `src` of an image on the recieving end.\n\n  What's interesting is that we can change what the video on the fly (e.g. it's size and quality).\n\n  We also know when we last received a frame in our own code (rather than it be hidden \"under the hood\") - so can\n  do things like display a placeholder image when the video stream stalls.\n";
  }), "\n    "), "\n  "), "\n  ", HTML.DIV({
    "class": "row"
  }, "\n    ", HTML.DIV({
    "class": "col-xs-6"
  }, "\n      ", HTML.IMG({
    "class": "image-stream",
    id: "local-image-stream",
    src: function() {
      return Spacebars.mustache(view.lookup("localImageSrc"));
    }
  }), "\n      ", HTML.Raw("<p>Local image</p>"), "\n      ", HTML.P("\n        image size ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("localImageKB"));
  }), " KB / average transfer rate per second ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("localImageKBps"));
  }), " KB/s\n        / ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("localImageKbps"));
  }), " Kb/s\n      "), "\n      ", HTML.FORM({
    "class": "form-horizontal"
  }, "\n        ", HTML.DIV({
    "class": "form-group"
  }, "\n          ", HTML.Raw('<label for="image-quality" class="col-xs-2 control-label">\n            image quality\n          </label>'), "\n          ", HTML.DIV({
    "class": "col-xs-8"
  }, "\n            ", HTML.INPUT({
    "class": "form-control",
    type: "range",
    min: "0",
    max: "0.99",
    step: "0.01",
    id: "image-quality",
    value: function() {
      return Spacebars.mustache(view.lookup("imageQuality"));
    }
  }), "\n          "), "\n          ", HTML.DIV({
    "class": "col-xs-2"
  }, "\n            ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("imageQuality"));
  }), "\n          "), "\n        "), "\n        ", HTML.DIV({
    "class": "form-group"
  }, "\n          ", HTML.Raw('<label for="image-width" class="col-xs-2 control-label">\n            image width\n          </label>'), "\n          ", HTML.DIV({
    "class": "col-xs-8"
  }, "\n            ", HTML.INPUT({
    "class": "form-control",
    type: "range",
    min: "1",
    max: "400",
    step: "1",
    id: "image-width",
    value: function() {
      return Spacebars.mustache(view.lookup("imageWidth"));
    }
  }), "\n          "), "\n          ", HTML.DIV({
    "class": "col-xs-2"
  }, "\n            ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("imageWidth"));
  }), "px\n          "), "\n        "), "\n        ", HTML.DIV({
    "class": "form-group"
  }, "\n          ", HTML.Raw('<label for="image-height" class="col-xs-2 control-label">\n            image height\n          </label>'), "\n          ", HTML.DIV({
    "class": "col-xs-8"
  }, "\n            ", HTML.INPUT({
    "class": "form-control",
    type: "range",
    min: "1",
    max: "400",
    step: "1",
    id: "image-height",
    value: function() {
      return Spacebars.mustache(view.lookup("imageHeight"));
    }
  }), "\n          "), "\n          ", HTML.DIV({
    "class": "col-xs-2"
  }, "\n            ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("imageHeight"));
  }), "px\n          "), "\n        "), "\n        ", HTML.DIV({
    "class": "form-group"
  }, "\n          ", HTML.Raw('<label id="data-channel-fps" class="col-xs-2 control-label">\n            FPS\n          </label>'), "\n          ", HTML.DIV({
    "class": "col-xs-8"
  }, "\n            ", HTML.INPUT({
    "class": "form-control",
    type: "range",
    min: "1",
    max: "30",
    step: "1",
    id: "data-channel-fps",
    value: function() {
      return Spacebars.mustache(view.lookup("dataChannelFps"));
    }
  }), "\n          "), "\n          ", HTML.DIV({
    "class": "col-xs-2"
  }, "\n            ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("dataChannelFps"));
  }), "fps\n          "), "\n        "), "\n      "), "\n    "), "\n    ", HTML.DIV({
    "class": "col-xs-6"
  }, "\n      ", HTML.IMG({
    "class": "image-stream",
    id: "image-stream",
    src: function() {
      return Spacebars.mustache(view.lookup("imageSrc"));
    }
  }), "\n      ", HTML.Raw("<p>Remote image</p>"), "\n    "), "\n  ") ];
}));

})();
