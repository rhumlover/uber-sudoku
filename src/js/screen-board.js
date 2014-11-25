var UIComponent = require('./lib/ui-component'),
  BoardModel = require('./board-model'),
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

      this.boardView = require('./board-view')();
      this.keyboardKeys = this.el.querySelectorAll('#keyboard .fab');
    },

    domEvents: {
      'click #keyboard .fab': function(e) {
        var value = parseInt(e.currentTarget.innerHTML, 10);
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
