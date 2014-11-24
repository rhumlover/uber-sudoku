/**
 * A UI Component is a View layer, tied to the DOM by an element.
 * It can listen to its element interactions, and can receive events from
 * the main Facade, wich contains the Game/Domain logic.
 */
function UIComponent(options) {
  var self = this,
    rootEl = options.el;

  _.extend(this, options);

  if (!rootEl) {
    rootEl = document.createElement('div');
  }
  else if (typeof rootEl === 'string') {
    rootEl = document.querySelector(rootEl);
  }

  this.el = rootEl;
  this.$el = $(rootEl);
  this.active = !this.$el.hasClass('is-inactive');

  // DOM events
  (function(events) {
    if (!events) return;

    _.forEach(events, function(callback, key) {
      var firstSpace = key.indexOf(' '),
        eventType = key.slice(0, firstSpace),
        selector = key.slice(firstSpace);

      if (_.isString(callback)) {
        callback = self[callback];
      }

      self.$el.on(eventType, selector, callback.bind(self));
    });
  })(options.domEvents);

  // External events (from PubSub)
  (function(events) {
    if (!events) return;

    _.forEach(events, function(callback, key) {
      if (_.isString(callback)) {
        callback = self[callback];
      }
      PubSub.subscribe(key, callback.bind(self));
    });
  })(options.externalEvents);

  if (_.isFunction(options.init)) {
    options.init.call(this);
  }
}

// UI helpers: activate/deactivate element following the css convention
// that reacts to the presence of 'is-inactive' class
UIComponent.prototype.activate = function(selector, eventType, callback) {
  this.active = true;
  this.$el.removeClass('is-inactive');
};


UIComponent.prototype.deactivate = function(selector, eventType, callback) {
  this.active = false;
  this.$el.addClass('is-inactive');
};

module.exports = UIComponent;
