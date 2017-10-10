/* eslint-disable no-console */
'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const database = require('./config/db');
const routeModule = require('./components/main');
const cors = require('cors');

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const corsOptions = {
  origin: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'x-access-token', 'Content-Type', 'Accept'],
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS']
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

routeModule.routes(app);

mongoose.Promise = global.Promise;
mongoose.connect(database.url);

app.listen(SERVER_PORT, err => {
  if (err) {
    console.log(`Can not listen on port ${SERVER_PORT}`);
    return;
  }
  console.log(`Server listening on port ${SERVER_PORT}`);
});
