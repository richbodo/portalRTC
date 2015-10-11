(function(){
Template.__checkName("layout");
Template["layout"] = new Template("Template.layout", (function() {
  var view = this;
  return [ HTML.TITLE("WebRTC signalling with Meteor Demo"), HTML.Raw('\n  <meta name="mobile-web-app-capable" content="yes">\n  <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">\n  '), HTML.BODY("\n    ", HTML.DIV({
    "class": "container-fluid"
  }, "\n      ", Spacebars.include(view.lookupTemplate("Nav")), "\n      ", Spacebars.include(view.lookupTemplate("yield")), "\n    "), "\n  ") ];
}));

})();
