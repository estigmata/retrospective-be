'use strict';
/*eslint-disable no-use-before-define*/
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const constantVariables = require('../../helpers/constant-variables');
const bcrypt = require('bcrypt');
const passportLocalMongoose = require('passport-local-mongoose');
const JwtStrategy = require('passport-jwt').Strategy;
const passport = require('passport');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      enum: constantVariables.userRoles
    },
    password: {
      type: String,
      trim: true,
      required: true
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'team'
    }
  }
);

UserSchema.pre('save', function (next) {
  const saltRounds = 10;
  let user = this;
  if (this.isModified('password') || this.isNew) {
    return bcrypt.hash(user.password, saltRounds)
      .then(hash => {
        user.password = hash;
        return next();
      })
      .catch(next);
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (password, cb) {
  return bcrypt.compare(password, this.password)
    .then(cb)
    .catch(cb);
};

UserSchema.statics.singIn = function (user) {
  return User.findOne({ name: user.name })
    .then(existingUser => {
      return existingUser.comparePassword(user.password, res => {
        if (!res) {
          return null;
        }
        const newToken = jwt.sign(JSON.stringify(existingUser), constantVariables.secretTokenKey);
        return {
          user: {
            _id: existingUser._id,
            name: existingUser.name,
            role: existingUser.role,
            team: existingUser.team
          },
          token: newToken
        };
      });
    });
};

UserSchema.statics.singUp = function (user) {
  return User.create(user)
    .then(newUser => {
      const newToken = jwt.sign(JSON.stringify(newUser), constantVariables.secretTokenKey);
      return { user: newUser, token: newToken };
    });
};

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('user', UserSchema);

module.exports = User;
