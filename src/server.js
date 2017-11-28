'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routeModule = require('./components/main');
const passport = require('passport');
const cors = require('cors');
const UserDb = require('./components/user/user.db');
const LocalStrategy = require('passport-local').Strategy;

const corsOptions = {
  origin: '*',
  allowedHeaders: ['Origin', 'X-Requested-With', 'x-access-token', 'Content-Type', 'Accept', 'token'],
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
  exposedHeaders: ['token']
};

module.exports = {
  start (database) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors(corsOptions));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(UserDb.authenticate()));
    passport.serializeUser(UserDb.serializeUser());
    passport.deserializeUser(UserDb.deserializeUser());

    routeModule.routes(app);
    database();
  },

  instance () {
    return app;
  }
};
