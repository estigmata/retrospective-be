'use strict';
const express = require('express');
const ItemController = require('./../item/item.controller');
const RetrospectiveController = require('./retrospective.controller');
const itemSchema = require('./../item/item-schema');
const retrospectiveSchema = require('./retrospective-schema');

const { validateSchema } = require('./../../middleware/schema-validation.middleware');

const router = express.Router();

// TODO> OLD ROUTES, Delete this when the branch in FE is accepted
router.get('/:retrospectiveId', RetrospectiveController.getOneRetrospective);
router.post('/', validateSchema(retrospectiveSchema), RetrospectiveController.addNewRetrospective);
router.post('/:retrospectiveId/items', validateSchema(itemSchema), ItemController.addNewItem);
router.delete('/:retrospectiveId/items/:itemId', validateSchema(itemSchema), ItemController.deleteItem);
router.get('/', RetrospectiveController.getRetrospectives);
router.put('/:retrospectiveId', validateSchema(retrospectiveSchema), RetrospectiveController.updateRetrospective);
router.put('/:retrospectiveId/nextStep', RetrospectiveController.goForwardRetrospectiveStep);

// TODO> New ROUTES, Uncomment this when the branch in FE is accepted
/*
router.get('/:retrospectiveId', RetrospectiveController.getOneRetrospective);
router.post('/', validateSchema(retrospectiveSchema), RetrospectiveController.addNewRetrospective);
router.get('/', RetrospectiveController.getRetrospectives);
*/

module.exports = router;
