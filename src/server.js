'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routeModule = require('./components/main');
const cors = require('cors');

const corsOptions = {
  origin: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'x-access-token', 'Content-Type', 'Accept'],
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS']
};

module.exports = {
  start (database) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors(corsOptions));

    routeModule.routes(app);
    database();
  },

  instance () {
    return app;
  }
};
