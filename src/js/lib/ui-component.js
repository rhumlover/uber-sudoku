/**
 * A UI Component is a View layer, tied to the DOM by an element.
 * It can listen to its element interactions, and can receive events from
 * the main Facade, wich contains the Game/Domain logic.
 */
function UIComponent(options) {
  var self = this;

  this.el = null;
  this.domEvents = {};
  this.externalEvents = {};

  _.extend(this, options);

  // Root DOM Element
  this.assignTo(options.el);

  // DOM events
  this.listenDomEvents(options.domEvents);

  // External events (from PubSub)
  this.listenExternalEvents(options.externalEvents);

  if (_.isFunction(options.init)) {
    options.init.call(this);
  }
}

UIComponent.prototype.assignTo = function(elt) {
  try {
    if (!elt) {
      throw "UIComponent: no root element passed in options";
    }
    else if (_.isString(elt)) {
      elt = document.querySelector(elt);
      if (!elt) {
        throw "UIComponent: no DOM Node matches the given selector (" + options.el + ")";
      }
    }
    else if (!('nodeType' in elt) || elt.nodeType !== elt.ELEMENT_NODE) {
      throw "UIComponent: passed element isn't a DOM Node";
    }
  }
  catch (e) {
    elt = document.createElement('div');
  }
  this.el = elt;
  this.$el = $(elt);
  this.active = !this.$el.hasClass('is-inactive');
};

UIComponent.prototype.listenDomEvents = function(events) {
  if (_.isEmpty(events)) return;
  var self = this;

  _.forEach(events, function(callback, key) {
    var firstSpace = key.indexOf(' '),
      eventType = key.slice(0, firstSpace),
      selector = key.slice(firstSpace);

    if (_.isString(callback)) {
      callback = self[callback];
    }
    self.$el.on(eventType, selector, callback.bind(self));
  });
};

UIComponent.prototype.listenExternalEvents = function(events) {
  if (_.isEmpty(events)) return;
  var self = this;

  _.forEach(events, function(callback, key) {
    if (_.isString(callback)) {
      callback = self[callback];
    }
    PubSub.subscribe(key, callback.bind(self));
  });
};

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
