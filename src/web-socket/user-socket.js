'use strict';
const UserEventEmitter = require('./../events/user-event-emitter');

module.exports = io => {
  UserEventEmitter.on('UserSaved', user => {
    io.sockets.emit('onUserSaved', { data: user });
  });
};
