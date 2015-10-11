(function(){__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var FIRST, SECOND, THIRD, getRandomRoomName;

FIRST = 'abcdefghijklmnopqrstuvwxyz';

SECOND = 'aeiou';

THIRD = FIRST;

getRandomRoomName = function() {
  var parts, wordArray, _i, _len, _ref;
  parts = [];
  _ref = [FIRST, SECOND, THIRD];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    wordArray = _ref[_i];
    parts.push(Random.choice(wordArray));
  }
  return parts.join('');
};

Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('root', {
    where: 'server',
    path: '/',
    action: function() {
      var newName;
      newName = getRandomRoomName();
      this.response.writeHead(307, {
        Location: Router.path('home', {
          roomName: newName
        })
      });
      return this.response.end();
    }
  });
  this.route('imageRoot', {
    where: 'server',
    path: '/image-stream',
    action: function() {
      var newName;
      newName = getRandomRoomName();
      this.response.writeHead(307, {
        Location: Router.path('ImageStream', {
          roomName: newName
        })
      });
      return this.response.end();
    }
  });
  this.route('multiDraw', {
    path: '/multi_draw'
  });
  this.route('drawer', {
    path: '/drawer'
  });
  this.route('home', {
    path: '/:roomName'
  });
  return this.route('ImageStream', {
    path: '/image-stream/:roomName'
  });
});

})();
