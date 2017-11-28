'use strict';
const JwtStrategy = require('passport-jwt').Strategy;
const UserModel = require('../components/user/user.model');
const constantVariables = require('./constant-variables');

module.exports = function (passport) {
  const opts = {};
  opts.secretOrKey = constantVariables.secret;
  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    UserModel.findOne({ id: jwtPayload.id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};
