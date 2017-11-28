'use strict';
const User = require('./user.db');

class UserModel {

  static signInUser (user) {
    return User.singIn(user)
      .then(userFound => {
        if (!userFound) {
          const error = new Error('The user with that id does not exist');
          error.title = 'Log in Failed for user';
          error.status = 404;
          throw error;
        }
        return userFound;
      });
  }

  static signUpUser (user) {
    return User.singUp(user)
      .catch(() => {
        const error = new Error('Could not save User');
        error.title = 'Internal server error';
        error.status = 500;
        throw error;
      });
  }

  static updateUser (userId, body) {
    return User.findByIdAndUpdate(userId, { $set: body }, { new: true })
      .then(userUpdated => {
        if (!userUpdated) {
          const error = new Error('User could not be updated');
          error.title = 'User not found';
          error.status = 404;
          throw error;
        }
        return userUpdated;
      });
  }

}

module.exports = UserModel;
