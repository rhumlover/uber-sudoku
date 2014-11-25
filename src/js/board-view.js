var UIComponent = require('./lib/ui-component'),
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
