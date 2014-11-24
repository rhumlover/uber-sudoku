function App() {
  var self = this;

  this.Router = Router({
    '/': self.route_home(),
    '/play': {
      '/resume': self.route_play('resume'),
      '/new': self.route_play('new')
    }
  });
}

App.prototype.start = function() {
  this.Router.init();
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
