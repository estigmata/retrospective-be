'use strict';
const ItemEventEmitter = require('./../events/item-event-emitter');

module.exports = io => {
  ItemEventEmitter.on('ItemSaved', item => {
    io.to(item.retrospective).emit('onItemSaved', { data: item });
  });

  ItemEventEmitter.on('ItemUpdated', item => {
    io.to(item.retrospective).emit('onUpdateItem', { data: item });
  });

  ItemEventEmitter.on('ItemDeleted', item => {
    io.to(item.retrospective).emit('onDeleteItem', { data: item });
  });
};
