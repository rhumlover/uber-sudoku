var UIComponent = require('./lib/ui-component'),
  StartScreen, instance;

StartScreen = function StartScreen() {

  if (instance) return instance;

  instance = new UIComponent({
    el: '.screen--start',

    domEvents: {
      'click .button': function(e) {
        var route = e.srcElement.getAttribute('data-route');
        PubSub.publish('router.goto', {
          route: route
        });
      }
    },

    externalEvents: {
      'board-screen.activate': function(e) {
        this.deactivate();
      },
      'start-screen.activate': function(e) {
        this.activate();
      }
    }
  });

  return instance;
};

module.exports = StartScreen;
