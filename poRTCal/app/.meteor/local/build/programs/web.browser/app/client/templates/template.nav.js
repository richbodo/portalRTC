(function(){
Template.__checkName("Nav");
Template["Nav"] = new Template("Template.Nav", (function() {
  var view = this;
  return [ HTML.Raw('<a href="https://github.com/foxdog-studios/meteor-webrtc">\n    <img style="position: absolute; top: 0; right: 0; border: 0; z-index: 1;" src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png">\n  </a>\n  '), HTML.UL({
    "class": "nav nav-pills"
  }, "\n    ", HTML.LI({
    role: "presentation",
    "class": function() {
      return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({
        regex: "home"
      }));
    }
  }, "\n      ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), Spacebars.kw({
        route: "home",
        data: view.lookup("currentRouteParams")
      }));
    }
  }, "\n        Chat demo\n      "), "\n    "), "\n    ", HTML.LI({
    role: "presentation",
    "class": function() {
      return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({
        regex: "ImageStream"
      }));
    }
  }, "\n      ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), Spacebars.kw({
        route: "ImageStream",
        data: view.lookup("currentRouteParams")
      }));
    }
  }, "\n        Video Image stream\n      "), "\n    "), "\n  ") ];
}));

})();
