'use strict';

const MessageEventEmitter = require('./../events/message-event-emitter');

function messageBroadcast (req, res, next) {
  res.status(200).send({ data: req.body });
  MessageEventEmitter.emit('SendMessage', req.body);
  next();
}

exports.messageBroadcast = messageBroadcast;
