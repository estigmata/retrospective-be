'use strict';
/* eslint-disable no-console */

const http = require('http');
const itemSocket = require('./item-socket');
const groupSocket = require('./group-socket');
const retrospectiveSocket = require('./retrospective-socket');
const actionItemSocket = require('./action-item-socket');
const userSocket = require('./user-socket');
const messageSocket = require('./message-retrospective-socket');

module.exports = {
  connect: options => webServer => {
    const server = http.createServer(webServer);
    const io = require('socket.io')(server);

    itemSocket(io);
    groupSocket(io);
    retrospectiveSocket(io);
    actionItemSocket(io);
    userSocket(io);
    messageSocket(io);

    io.on('connection', socketClient => {
      socketClient.on('startSocketClient', retrospectiveId => {
        if (retrospectiveId) {
          socketClient.join(retrospectiveId);
        }
      });

      socketClient.on('disconnect', () => {
        socketClient.leave(socketClient.room);
      });
    });

    server.listen(options.SERVER_PORT, err => {
      if (err) {
        console.log(`Can not listen on port ${options.SERVER_PORT}`);
        return;
      }
      console.log(`Server listening on port ${options.SERVER_PORT}`);
    });
  }
};
