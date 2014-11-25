/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	module.exports = __webpack_require__(6);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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
	  __webpack_require__(6)();
	  __webpack_require__(5)();

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var ROW_SUM = 1+2+3+4+5+6+7+8+9;

	function Board(matrix) {
	  this.size = 9;
	  this.matrix = matrix;

	  this.remainingNumbers = (function(matrix) {
	    var remaining = 0,
	      _isZero = function(n) {
	        return n === 0;
	      };

	    matrix.forEach(function(row) {
	      remaining += row.filter(_isZero).length;
	    });

	    return remaining;
	  })(this.matrix);
	}


	// Private set of functions, manly helpers
	var _validate = function(array) {
	  var sum = _.flatten(array).reduce(function(prev, n, index, arr) {
	    return prev + n;
	  });
	  return sum === ROW_SUM;
	};


	// Starting creating our Board prototype
	Board.prototype.isSolved = function() {
	  var i = row = col = 0;

	  // We're gonna validte the board in 9*3 steps:
	  // 1) We check if each row's sum is correct
	  // 2) We check if each colmun's sum is correct
	  // 3) We check if each square's sum is correct
	  // Every falsy check breaks the loop and returns false
	  for (i; i < this.size; i++) {
	    if (!_validate(this.getRow(i))) return false;
	    if (!_validate(this.getColumn(i))) return false;

	    // Just a sweet tweak to get valid coordinates for each
	    // square on the board. With a 9-sized board, it will generate:
	    // 0x0, 3x0, 6x0, 0x3, 3x3, 6x3, 0x6, 3x6, 6x6
	    row = (i % 3) * 3;
	    col = ((i / 3) | 0) * 3;
	    if (!_validate(this.getSquare(row, col))) return false;
	  }
	  return true;
	};

	Board.prototype.set = function(row, cell, value) {
	  this.matrix[row][cell] = value;
	  this.remainingNumbers--;
	};

	Board.prototype.getRow = function(rowIndex) {
	  return this.matrix[rowIndex];
	};

	Board.prototype.getColumn = function(colIndex) {
	  return _.map(this.matrix, function(row) {
	    return row[colIndex];
	  });
	};

	Board.prototype.getSquare = function(rowIndex, colIndex) {
	  var squareX = rowIndex / 3 | 0,
	    squareY = colIndex / 3 | 0,
	    squareArr = [];

	  _.forEach(this.matrix, function(row, rowIndex) {
	    if ((rowIndex / 3 | 0) === squareX) {
	      var rowArr = [];
	      _.forEach(row, function(cell, cellIndex) {
	        if ((cellIndex / 3 | 0) === squareY) {
	          rowArr.push(cell);
	        }
	      });
	      squareArr.push(rowArr);
	    }
	  });

	  return squareArr;
	};

	Board.prototype.availableValuesForCell = function(row, cell) {
	  var available = [1, 2, 3, 4, 5, 6, 7, 8, 9],
	    cellValue = this.matrix[row][cell];

	  function removeExistants(arr) {
	    arr.forEach(function(n) {
	      if (n > 0 && available[n-1] !== null) {
	        available[n-1] = null;
	      }
	    });
	  }

	  removeExistants(this.getRow(row));
	  removeExistants(this.getColumn(cell));
	  removeExistants(_.flatten(this.getSquare(row, cell)));

	  return _.compact(available);
	};


	Board.create = function(options) {
	  var x = 0;
	  return new Board([
	    [5,3,x,x,7,x,x,x,x],
	    [6,x,x,1,9,5,x,x,x],
	    [x,9,8,x,x,x,x,6,x],
	    [8,x,x,x,6,x,x,x,3],
	    [4,x,x,8,x,3,x,x,1],
	    [7,x,x,x,2,x,x,x,6],
	    [x,6,x,x,x,x,2,8,x],
	    [x,x,x,4,1,9,x,x,5],
	    [x,x,x,x,8,x,x,7,9]
	  ]);
	};

	Board.load = function(matrix) {
	  return new Board(matrix);
	};

	module.exports = Board;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var UIComponent = __webpack_require__(7),
	  BoardView, instance;

	BoardView = function BoardView(options) {

	  if (instance) return instance;

	  instance = new UIComponent({
	    el: '#board-view',
	    template: JST['board-view'],

	    init: function() {
	      this.currentPosition = null;
	      this.currentCell = null;
	    },

	    render: function(data) {
	      this.el.innerHTML = this.template(data);
	    },

	    domEvents: {
	      'click .board__cell': 'onCellClicked'
	    },

	    externalEvents: {
	      'keyboard.tap': 'onKeyboardTapped'
	    },

	    onCellClicked: function(e) {
	      var cell = e.currentTarget,
	        position = cell.getAttribute('data-position').split('-');

	      if (this.currentCell) {
	        $(this.currentCell).removeClass('is-highlight');
	      }

	      this.currentCell = cell;
	      this.currentPosition = {
	        row: parseInt(position[0], 10),
	        cell: parseInt(position[1], 10)
	      };
	      $(this.currentCell).addClass('is-highlight');

	      PubSub.publish('board-view.cell-selected', this.currentPosition);
	    },

	    onKeyboardTapped: function(e, data) {
	      if (!this.currentCell) return;

	      this.currentCell.innerHTML = data.key;

	      PubSub.publish('board-view.cell-change', {
	        row: this.currentPosition.row,
	        cell: this.currentPosition.cell,
	        value: data.key
	      });
	    }

	  });

	  return instance;
	};

	module.exports = BoardView;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var App, app;

	App = __webpack_require__(1);
	app = new App();
	app.start();


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var UIComponent = __webpack_require__(7),
	  BoardModel = __webpack_require__(2),
	  BoardScreen, instance;

	BoardScreen = function BoardScreen() {

	  if (instance) return instance;

	  instance = new UIComponent({
	    el: '.screen--board',
	    template: JST['screen-board'],

	    init: function() {
	      this.boardModel = null;
	      this.render();
	    },

	    render: function() {
	      this.el.innerHTML = this.template({
	        buttons: [1, 2, 3, 4, 5, 6, 7, 8, 9 ]
	      });

	      this.boardView = __webpack_require__(3)();
	      this.keyboardKeys = this.el.querySelectorAll('#keyboard .fab');
	    },

	    domEvents: {
	      'click #keyboard .fab': function(e) {
	        var value = parseInt(e.currentTarget.innerText, 10);
	        PubSub.publish('keyboard.tap', { key: value });
	      },

	      'click header': function(e) {
	        PubSub.publish('router.goto', { route: '/' });
	      }
	    },

	    externalEvents: {
	      'start-screen.activate': function() {
	        this.deactivate();
	        this.highlightKeyboardKeys([]);
	      },

	      'board-screen.activate': function(e, data) {
	        var previousGame;

	        if (data.type === 'resume') {
	          previousGame = localStorage.getItem('uber-sudoku');
	          if (!!previousGame) {
	            this.boardModel = BoardModel.load(JSON.parse(previousGame));
	          }
	        }

	        if (!this.boardModel) {
	          this.boardModel = BoardModel.create();
	          this.saveGame();
	        }

	        this.boardView.render(this.boardModel.matrix);
	        this.activate();
	      },

	      /**
	       * A little helper, always nice to have
	       */
	      'board-view.cell-selected': function(e, data) {
	        var availableNumbers;

	        availableNumbers = this.boardModel.availableValuesForCell(data.row, data.cell);
	        this.highlightKeyboardKeys(availableNumbers);
	      },

	      'board-view.cell-change': function(e, data) {
	        this.boardModel.set(data.row, data.cell, data.value);
	        this.saveGame();

	        if (this.boardModel.remainingNumbers === 0 && this.boardModel.isSolved()) {
	          alert('Congratulations! You just won an awesome game of Sudoku!');
	        }
	      }
	    },

	    saveGame: function() {
	      localStorage.setItem('uber-sudoku', JSON.stringify(this.boardModel.matrix));
	    },

	    highlightKeyboardKeys: function(keys) {
	      _.forEach(this.keyboardKeys, function(button) {
	        var key = parseInt(button.getAttribute('data-key'), 10);

	        if (_.contains(keys, key)) {
	          $(button).addClass('is-highlight');
	        }
	        else {
	          $(button).removeClass('is-highlight');
	        }
	      });
	    }
	  });

	  return instance;
	};

	module.exports = BoardScreen;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var UIComponent = __webpack_require__(7),
	  StartScreen, instance;

	StartScreen = function StartScreen() {

	  if (instance) return instance;

	  instance = new UIComponent({
	    el: '.screen--start',

	    domEvents: {
	      'click .button': function(e) {
	        console.log(e);
	        var route = e.currentTarget.getAttribute('data-route');
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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ }
/******/ ])