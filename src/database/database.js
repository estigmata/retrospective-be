'use strict';
/* eslint-disable no-console */

const mongoose = require('mongoose');
const database = require('./../config/db');

module.exports = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(database.url, err => {
    if (err) {
      throw new Error('Unable to connect to Mongo.');
    }
    console.log(`Mongoose default connection open to ${database.url}`);
  });
};
