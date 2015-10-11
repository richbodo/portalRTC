(function(){__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Template.Nav.helpers({
  currentRouteParams: function() {
    return Router.current().params;
  }
});

})();
