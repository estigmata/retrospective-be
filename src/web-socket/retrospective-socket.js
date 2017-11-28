'use strict';
const RetrospectiveEventEmitter = require('./../events/retrospective-event-emitter');

module.exports = io => {
  RetrospectiveEventEmitter.on('RetrospectiveUpdated', retrospective => {
    io.to(retrospective._id).emit('onRetrospectiveUpdated', { data: retrospective });
  });
};
