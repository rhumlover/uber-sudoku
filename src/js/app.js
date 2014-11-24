function App() {
  var self = this;

  this.Router = Router({
    '/': self.route_home(),
    '/play': {
      '/resume': self.route_play('resume'),
      '/new': self.route_play('new')
    }
  });

  this.Router.notfound = function() {
    self.Router.setRoute('/');
  };

  PubSub.subscribe('router.goto', function(evt, data) {
    self.Router.setRoute(data.route);
  });
}

App.prototype.start = function() {
  require('./screen-start')();

  this.Router.init();

  if (_.isEmpty(location.hash)) {
    this.Router.setRoute('/');
  }
};

App.prototype.route_home = function() {
  return function() {
    PubSub.publish('start-screen.activate');
  }.bind(this);
};

App.prototype.route_play = function(type) {
  return function() {
    PubSub.publish('board-screen.activate', { type: type });
  }.bind(this);
};

module.exports = App;
