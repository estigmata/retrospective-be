'use strict';
const MessageEventEmitter = require('./../events/message-event-emitter');

module.exports = io => {
  MessageEventEmitter.on('SendMessage', message => {
    io.to(message.retrospective).emit('onSendMessage', { data: message });
  });
};
