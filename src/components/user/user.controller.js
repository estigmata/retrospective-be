'use strict';
const UserModel = require('./user.model');

class UserController {

  static addNewUser (req, res, next) {
    return UserModel.signUpUser(req.body)
      .then(user => {
        res.set({ token: user.token });
        res.send({ data: user.user }).status(200);
      })
      .catch(err => next(err));
  }

  static authenticateUser (req, res, next) {
    return UserModel.signInUser(req.body)
      .then(user => {
        res.set({ token: user.token });
        res.send({ data: user.user }).status(200);
      })
      .catch(err => next(err));
  }

  static modifyUser (req, res, next) {
    return UserModel.updateUser(req.params.userId, req.body)
      .then(user => res.send({ data: user }).status(200))
      .catch(err => next(err));
  }
}

module.exports = UserController;
