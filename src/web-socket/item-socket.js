'use strict';
const EventEmitter = require('./../events/event-emitter');

module.exports = io => {
  io.on('connection', () => {

    EventEmitter.on('ItemSaved', item => {
      io.sockets.emit('onItemSaved', { data: item });
    });

    EventEmitter.on('ItemUpdated', item => {
      io.sockets.emit('onUpdateItem', { data: item });
    });

    EventEmitter.on('ItemDeleted', item => {
      io.sockets.emit('onDeleteItem', { data: item });
    });
  });
};
