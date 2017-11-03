'use strict';
/* eslint-disable no-console */

const http = require('http');
const itemSocket = require('./item-socket');

module.exports = {
  connect: options => webServer => {
    const server = http.createServer(webServer);
    const io = require('socket.io')(server);

    itemSocket(io);

    server.listen(options.SERVER_PORT, err => {
      if (err) {
        console.log(`Can not listen on port ${options.SERVER_PORT}`);
        return;
      }
      console.log(`Server listening on port ${options.SERVER_PORT}`);
    });
  }
};
