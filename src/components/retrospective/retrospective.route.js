'use strict';
const express = require('express');
const RetrospectiveController = require('./retrospective.controller');
const retrospectiveSchema = require('./retrospective-schema');
const { validateSchema } = require('./../../middleware/schema-validation.middleware');
const { validateModeratorUser } = require('./../../middleware/moderator-user-validation.middleware');
const messageBroadcast = require('./../../middleware/message-broadcast.middleware');

const router = express.Router();

router.get('/:retrospectiveId', RetrospectiveController.getOneRetrospective);
router.post(
  '/',
  validateSchema(retrospectiveSchema),
  validateModeratorUser(),
  RetrospectiveController.addNewRetrospective);
router.get('/', RetrospectiveController.getRetrospectives);
router.put('/:retrospectiveId', validateSchema(retrospectiveSchema), RetrospectiveController.updateRetrospective);
router.put('/:retrospectiveId/nextStep', validateModeratorUser(), RetrospectiveController.goForwardRetrospectiveStep);
router.get('/:teamId/next/retrospectiveName', validateModeratorUser(), RetrospectiveController.getNewNameOfRetrospective);
router.post('/:retrospectiveId/users', RetrospectiveController.addUserInToRetrospective);
router.post('/:retrospectiveId/messages', messageBroadcast.messageBroadcast);

module.exports = router;
