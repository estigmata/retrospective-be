'use strict';

module.exports = io => {
  io.on('connection', socket => {
    socket.on('onSaveItem', item => {
      io.sockets.emit('itemSaved', item);
    });

    socket.on('onUpdateItem', item => {
      io.sockets.emit('itemUpdated', item);
    });

    socket.on('onDeleteItem', item => {
      io.sockets.emit('itemDeleted', item);
    });
  });
};
