'use strict';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_HOST = process.env.DB_HOST || 'localhost';

module.exports = { url: `mongodb://${DB_HOST}:${DB_PORT}/retroDB` };
