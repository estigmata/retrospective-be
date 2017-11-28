'use strict';
const Event = require('events');
const RetrospectiveEventEmitter = new Event.EventEmitter();

module.exports = RetrospectiveEventEmitter;
