'use strict';

const jwt = require('jsonwebtoken');
const constantVariables = require('../helpers/constant-variables');

function validateModeratorUser () {
  return function (req, res, next) {
    const userToValidate = jwt.decode(req.get('token'), constantVariables.secretTokenKey);
    if (!userToValidate || userToValidate.role !== constantVariables.userRoles[0]) {
      return res.status(400).send({ error: 'Invalid Token for Operation' });
    }
    return next();
  };
}

exports.validateModeratorUser = validateModeratorUser;
