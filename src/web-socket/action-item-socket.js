'use strict';
const ActionItemEventEmitter = require('./../events/action-item-event-emitter');

module.exports = io => {
  ActionItemEventEmitter.on('ActionItemSaved', actionItem => {
    io.to(actionItem.retrospectiveId).emit('onActionItemSaved', { data: actionItem });
  });

  ActionItemEventEmitter.on('ActionItemUpdated', actionItem => {
    io.to(actionItem.retrospectiveId).emit('onActionItemUpdated', { data: actionItem });
  });
};
