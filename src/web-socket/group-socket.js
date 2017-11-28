'use strict';
const GroupEventEmitter = require('./../events/group-event-emitter');

module.exports = io => {
  GroupEventEmitter.on('GroupSaved', item => {
    io.to(item.retrospective).emit('onGroupSaved', { data: item });
  });

  GroupEventEmitter.on('GroupUpdated', item => {
    io.to(item.retrospective).emit('onGroupUpdated', { data: item });
  });
};
