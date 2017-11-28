'use strict';
const express = require('express');
const UserController = require('./user.controller');
const UserSchema = require('./user.schema');
var passport = require('passport');

const { validateSchema } = require('./../../middleware/schema-validation.middleware');
const { userValidator } = require('./../../middleware/user-validator.middleware');

const router = express.Router();

router.post('/', validateSchema(UserSchema), UserController.addNewUser);
router.post('/authenticate', validateSchema(UserSchema), UserController.authenticateUser);
router.put('/:userId', validateSchema(UserSchema), userValidator(), UserController.modifyUser);

module.exports = router;
