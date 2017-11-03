'use strict';

const database = require('./../database/database');
const server =  require('./../server');
const webSocket = require('./../web-socket/socket-io');
const options = {
  SERVER_PORT: process.env.SERVER_PORT || 3000
};

server.start(database);

webSocket.connect(options)(server.instance());
