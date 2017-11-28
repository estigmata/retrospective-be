'use strict';

const jwt = require('jsonwebtoken');
const constantVariables = require('../helpers/constant-variables');

function userValidator () {
  return function (req, res, next) {
    const userToValidate = jwt.decode(req.get('token'), constantVariables.secretTokenKey);
    if (userToValidate._id !== req.params.userId) {
      return res.status(400).send({ error: 'Invalid Token for Operation' });
    }
    return next();
  };
}

exports.userValidator = userValidator;
