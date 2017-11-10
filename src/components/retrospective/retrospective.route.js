'use strict';
const express = require('express');
const RetrospectiveController = require('./retrospective.controller');
const retrospectiveSchema = require('./retrospective-schema');
const { validateSchema } = require('./../../middleware/schema-validation.middleware');

const router = express.Router();

router.get('/:retrospectiveId', RetrospectiveController.getOneRetrospective);
router.post('/', validateSchema(retrospectiveSchema), RetrospectiveController.addNewRetrospective);
router.get('/', RetrospectiveController.getRetrospectives);
router.put('/:retrospectiveId', validateSchema(retrospectiveSchema), RetrospectiveController.updateRetrospective);
router.put('/:retrospectiveId/nextStep', RetrospectiveController.goForwardRetrospectiveStep);
router.get('/next/retrospectiveName', RetrospectiveController.getNewNameOfRetrospective);

module.exports = router;
