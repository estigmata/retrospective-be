'use strict';
const express = require('express');
const ActionItemController = require('./action-item.controller');
const actionItemSchema = require('./action-item-schema');
const { validateSchema } = require('./../../middleware/schema-validation.middleware');

const router = express.Router();

router.post('/', validateSchema(actionItemSchema), ActionItemController.addNewActionItem);
router.get('/', ActionItemController.getActionItems);
router.get('/:actionItemId', ActionItemController.getActionItem);
router.put('/:actionItemId', ActionItemController.updateActionItem);
router.delete('/:actionItemId', ActionItemController.deleteActionItem);

module.exports = router;
